/**
 * Minimal plain-text prose renderer for content files.
 * Paragraphs are separated by blank lines; **bold** renders as <strong>.
 * Content is first-party authored (no user input), so no escaping needed.
 */
function inline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

export function proseHtml(body: string): string {
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${inline(p)}</p>`)
    .join('\n');
}

/** Strip ** markers for plain-text contexts (e.g. meta descriptions). */
export function stripMarkup(body: string): string {
  return body.replace(/\*\*/g, '');
}
