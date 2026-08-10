/**
 * Generic, framework-free calculator controller.
 * Reads an embedded JSON payload (localized field config + UI strings),
 * loads the pure math engine for the page, and handles validation,
 * calculation, results rendering, copy/share and analytics events.
 */
import { getCurrency } from '../../config/currencies';
import { parseNumber, formatNumber, formatCurrency, formatPercent } from '../number';
import { debounce } from './debounce';
import type { CalcInput, CalcOutput, CalculatorMath } from '../calculators/types';
import type { Locale } from '../../config/site';
import {
  trackCalculatorView,
  trackCalculationStarted,
  trackCalculationCompleted,
  trackCalculationError,
  trackResultCopied,
  trackResultShared,
} from './analytics';

export interface CalcFieldPayload {
  id: string;
  type: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number | 'any';
  options?: { value: string; label: string }[];
  defaultValue?: string;
  isCurrency?: boolean;
  showIf?: { field: string; values: string[] };
}

export interface CalcPayload {
  slug: string;
  category: string;
  locale: Locale;
  currencyDefault: string;
  currencies: { code: string; label: string }[];
  fields: CalcFieldPayload[];
  errors: Record<string, string>;
  results: Record<string, { label: string; hint?: string }>;
  table?: { title: string; caption?: string; columns: Record<string, string>; strings?: Record<string, string> };
  ui: {
    resultTitle: string;
    copySuccess: string;
    copyFail: string;
    shareFail: string;
    ariaResult: string;
  };
  buttons: {
    calculate: string;
    reset: string;
    copy: string;
    copied: string;
    share: string;
    example: string;
  };
  currencyLabel: string;
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className = '',
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatValue(kind: string | undefined, value: number, currencyCode: string, locale: Locale): string {
  if (kind === 'currency') return formatCurrency(value, getCurrency(currencyCode), locale);
  if (kind === 'percent') return formatPercent(value, locale);
  if (kind === 'number') return formatNumber(value, locale, 2);
  return formatNumber(value, locale, 2);
}

export interface CalculatorAppHandle {
  destroy(): void;
}

export function initCalculator(
  root: HTMLElement,
  math: CalculatorMath,
  payload: CalcPayload,
): CalculatorAppHandle {
  const form = root.querySelector<HTMLFormElement>('.calc-form');
  const resultRegion = root.querySelector<HTMLElement>('.calc-result');
  if (!form || !resultRegion) throw new Error('calculator markup incomplete');
  const resultRegionEl: HTMLElement = resultRegion;

  const currencySelect = root.querySelector<HTMLSelectElement>('select[data-role="currency"]');
  const fieldEls = new Map<string, HTMLElement>();
  for (const field of payload.fields) {
    const node = root.querySelector<HTMLElement>(`[data-field="${field.id}"]`);
    if (node) fieldEls.set(field.id, node);
  }

  const errorEls = new Map<string, HTMLElement>();
  let currentCurrency = currencySelect?.value ?? payload.currencyDefault;
  let lastOutput: CalcOutput | null = null;

  function currentInput(): CalcInput {
    const input: CalcInput = {};
    for (const field of payload.fields) {
      const scope = root.querySelector<HTMLElement>(`[data-field="${field.id}"]`);
      if (!scope) continue;
      if (field.type === 'radio') {
        const checked = scope.querySelector<HTMLInputElement>('input[type="radio"]:checked');
        input[field.id] = checked?.value ?? '';
        continue;
      }
      const control = scope.querySelector<HTMLInputElement | HTMLSelectElement>('input, select');
      const raw = control ? control.value : '';
      if (field.type === 'number' && raw !== '') {
        const parsed = parseNumber(raw);
        input[field.id] = parsed === null ? raw : String(parsed);
      } else {
        input[field.id] = raw;
      }
    }
    return input;
  }

  function updateVisibility(): void {
    for (const field of payload.fields) {
      if (!field.showIf) continue;
      const node = fieldEls.get(field.id);
      if (!node) continue;
      const input = currentInput();
      const show = field.showIf.values.includes(input[field.showIf.field] ?? '');
      node.hidden = !show;
      node.classList.toggle('is-hidden', !show);
      if (!show) {
        const control = node.querySelector<HTMLInputElement>('input, select');
        if (control) control.value = '';
        const err = errorEls.get(field.id);
        if (err) err.textContent = '';
      }
    }
  }

  function showErrors(errors: Record<string, string>): void {
    for (const [id, message] of Object.entries(errors)) {
      const scope = fieldEls.get(id);
      if (!scope) continue;
      let errEl = errorEls.get(id);
      if (!errEl) {
        errEl = el('p', 'field__error');
        errEl.id = `error-${payload.slug}-${id}`;
        scope.appendChild(errEl);
        errorEls.set(id, errEl);
      }
      errEl.textContent = payload.errors[message] ?? message;
      scope.classList.add('field--invalid');
      const control = scope.querySelector<HTMLElement>('input, select');
      if (control) control.setAttribute('aria-invalid', 'true');
    }
    // Focus the first invalid field
    const firstId = Object.keys(errors)[0];
    const first = firstId ? fieldEls.get(firstId) : null;
    if (first) {
      const control = first.querySelector<HTMLElement>('input, select');
      control?.focus();
    }
  }

  function clearErrors(): void {
    for (const [id, errEl] of errorEls) {
      errEl.textContent = '';
      const scope = fieldEls.get(id);
      scope?.classList.remove('field--invalid');
      const control = scope?.querySelector<HTMLElement>('input, select');
      control?.removeAttribute('aria-invalid');
    }
  }

  function formatCell(kind: string | undefined, value: string | number): string {
    if (typeof value === 'number') return formatValue(kind, value, currentCurrency, payload.locale);
    if (kind === 'string') return payload.table?.strings?.[value] ?? value;
    return String(value);
  }

  function buildResultPanel(output: CalcOutput): HTMLElement {
    const panel = el('div', 'result-panel');
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-live', 'polite');
    panel.setAttribute('aria-label', payload.ui.ariaResult);

    panel.appendChild(el('h3', '', payload.ui.resultTitle));

    const heroItems = output.results.filter((r) => r.hero);
    const allItems = output.results;

    const primary = el('div', 'result-primary');
    for (const item of heroItems) {
      const box = el('div', 'result-primary__item');
      box.appendChild(el('span', 'result-primary__label', payload.results[item.key]?.label ?? item.key));
      box.appendChild(el('div', 'result-primary__value', formatValue(item.kind, item.value, currentCurrency, payload.locale)));
      const hint = payload.results[item.key]?.hint;
      if (hint) box.appendChild(el('span', 'field__hint', hint));
      primary.appendChild(box);
    }
    panel.appendChild(primary);

    const breakdown = el('table', 'result-table');
    const thead = el('thead');
    const headRow = el('tr');
    headRow.appendChild(el('th', '', payload.locale === 'ar' ? 'البند' : 'Item'));
    headRow.appendChild(el('th', '', payload.locale === 'ar' ? 'القيمة' : 'Value'));
    thead.appendChild(headRow);
    breakdown.appendChild(thead);
    const tbody = el('tbody');
    for (const item of allItems) {
      const row = el('tr');
      row.appendChild(el('td', '', payload.results[item.key]?.label ?? item.key));
      row.appendChild(el('td', '', formatValue(item.kind, item.value, currentCurrency, payload.locale)));
      tbody.appendChild(row);
    }
    breakdown.appendChild(tbody);
    panel.appendChild(breakdown);

    if (output.table) {
      const tableBox = el('div', 'table-block');
      tableBox.appendChild(el('h4', '', payload.table?.title ?? ''));
      const tableEl = el('table', 'result-table');
      const tHead = el('thead');
      const tHeadRow = el('tr');
      for (const col of output.table.columns) {
        tHeadRow.appendChild(el('th', '', payload.table?.columns?.[col] ?? col));
      }
      tHead.appendChild(tHeadRow);
      tableEl.appendChild(tHead);
      const tBody = el('tbody');
      const kinds = output.table.cellKinds;
      for (const row of output.table.rows) {
        const tr = el('tr');
        row.forEach((cell, i) => {
          tr.appendChild(el('td', '', formatCell(kinds[i], cell)));
        });
        tBody.appendChild(tr);
      }
      tableEl.appendChild(tBody);
      tableBox.appendChild(tableEl);
      panel.appendChild(tableBox);
    }

    const actions = el('div', 'result-actions');
    const copyBtn = el('button', 'btn btn--outline btn--sm', payload.buttons.copy);
    copyBtn.type = 'button';
    copyBtn.addEventListener('click', () => {
      void copyResult(copyBtn);
    });
    const shareBtn = el('button', 'btn btn--outline btn--sm', payload.buttons.share);
    shareBtn.type = 'button';
    shareBtn.addEventListener('click', () => {
      void shareResult(shareBtn);
    });
    actions.appendChild(copyBtn);
    actions.appendChild(shareBtn);
    panel.appendChild(actions);

    return panel;
  }

  function buildCopyText(output: CalcOutput): string {
    const lines: string[] = [];
    for (const item of output.results) {
      const label = payload.results[item.key]?.label ?? item.key;
      lines.push(`${label}: ${formatValue(item.kind, item.value, currentCurrency, payload.locale)}`);
    }
    if (output.table) {
      lines.push('');
      for (const row of output.table.rows) {
        const vals = row.map((cell, i) => formatCell(output.table!.cellKinds[i], cell));
        lines.push(vals.join(' — '));
      }
    }
    return lines.join('\n');
  }

  function flash(btn: HTMLElement, text: string): void {
    const original = btn.textContent ?? '';
    btn.textContent = text;
    window.setTimeout(() => {
      btn.textContent = original;
    }, 2000);
  }

  async function copyResult(btn: HTMLElement): Promise<void> {
    if (!lastOutput) return;
    const text = buildCopyText(lastOutput);
    try {
      await navigator.clipboard.writeText(text);
      trackResultCopied(payload.slug);
      flash(btn, payload.buttons.copied);
    } catch {
      flash(btn, payload.ui.copyFail);
    }
  }

  async function shareResult(btn: HTMLElement): Promise<void> {
    if (!lastOutput) return;
    const text = buildCopyText(lastOutput);
    const nav = navigator as Navigator & { share?: (data: { text: string }) => Promise<void> };
    if (nav.share) {
      try {
        await nav.share({ text });
        trackResultShared(payload.slug);
      } catch {
        /* user cancelled share — not an error */
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        trackResultShared(payload.slug);
        flash(btn, payload.buttons.copied);
      } catch {
        flash(btn, payload.ui.shareFail);
      }
    }
  }

  function render(output: CalcOutput): void {
    resultRegionEl.innerHTML = '';
    resultRegionEl.appendChild(buildResultPanel(output));
  }

  function clearResult(): void {
    resultRegionEl.innerHTML = '';
    lastOutput = null;
  }

  function run(opts?: { silent?: boolean }): void {
    const input = currentInput();
    if (!opts?.silent) trackCalculationStarted(payload.slug);
    clearErrors();
    const errors = math.validate(input);
    if (Object.keys(errors).length > 0) {
      clearResult();
      if (!opts?.silent) showErrors(errors);
      if (!opts?.silent) trackCalculationError(payload.slug);
      return;
    }
    let output: CalcOutput;
    try {
      output = math.calculate(input);
    } catch {
      clearResult();
      if (!opts?.silent) showErrors({ __generic: payload.errors.invalid ?? payload.errors.required ?? 'error' });
      if (!opts?.silent) trackCalculationError(payload.slug);
      return;
    }
    lastOutput = output;
    render(output);
    if (!opts?.silent) trackCalculationCompleted(payload.slug, currentCurrency);
  }

  function fillExample(): void {
    for (const field of payload.fields) {
      const scope = root.querySelector<HTMLElement>(`[data-field="${field.id}"]`);
      if (!scope) continue;
      const value = math.example[field.id] ?? '';
      if (field.type === 'radio') {
        const radio = scope.querySelector<HTMLInputElement>(`input[value="${value}"]`);
        if (radio) radio.checked = true;
      } else if (field.type === 'select' || field.type === 'currency') {
        const select = scope.querySelector<HTMLSelectElement>('select');
        if (select) select.value = value;
      } else {
        const control = scope.querySelector<HTMLInputElement>('input');
        if (control) control.value = value;
      }
    }
    updateVisibility();
    if (currencySelect) currentCurrency = currencySelect.value;
    run();
  }

  function reset(): void {
    for (const field of payload.fields) {
      const scope = root.querySelector<HTMLElement>(`[data-field="${field.id}"]`);
      if (!scope) continue;
      const def = field.defaultValue ?? '';
      if (field.type === 'radio') {
        const radio = scope.querySelector<HTMLInputElement>(`input[value="${def}"]`);
        if (radio) radio.checked = true;
        else {
          const first = scope.querySelector<HTMLInputElement>('input[type="radio"]');
          if (first) first.checked = true;
        }
      } else {
        const control = scope.querySelector<HTMLInputElement | HTMLSelectElement>('input, select');
        if (control) control.value = def;
      }
    }
    updateVisibility();
    clearErrors();
    clearResult();
  }

  const submitHandler = (event: Event): void => {
    event.preventDefault();
    run();
  };
  form.addEventListener('submit', submitHandler);
  const liveRun = debounce(() => run({ silent: true }), 200);
  form.addEventListener('input', liveRun);

  const exampleBtn = root.querySelector<HTMLButtonElement>('[data-action="example"]');
  exampleBtn?.addEventListener('click', () => {
    fillExample();
  });
  const resetBtn = root.querySelector<HTMLButtonElement>('[data-action="reset"]');
  resetBtn?.addEventListener('click', () => {
    reset();
  });

  for (const field of payload.fields) {
    if (!field.showIf) continue;
    const controller = fieldEls.get(field.showIf.field);
    if (!controller) continue;
    const radios = controller.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    for (const radio of radios) {
      radio.addEventListener('change', () => {
        updateVisibility();
        clearErrors();
      });
    }
  }

  currencySelect?.addEventListener('change', () => {
    currentCurrency = currencySelect.value;
    if (lastOutput) render(lastOutput);
  });

  updateVisibility();
  trackCalculatorView(payload.slug, payload.category);

  return {
    destroy() {
      form.removeEventListener('submit', submitHandler);
      form.removeEventListener('input', liveRun);
      liveRun.cancel();
    },
  };
}
