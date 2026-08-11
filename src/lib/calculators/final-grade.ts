import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

export const finalGradePlanner: CalculatorMath = {
  slug: 'final-grade-planner',
  fields: [
    { id: 'currentGrade', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'finalWeight', type: 'number', required: true, min: 1, max: 100, step: 'any' },
    { id: 'targetGrade', type: 'number', required: true, min: 0, max: 100, step: 'any' },
  ],
  example: { currentGrade: '80', finalWeight: '30', targetGrade: '85' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['currentGrade', 0, 100],
      ['finalWeight', 1, 100],
      ['targetGrade', 0, 100],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const current = numeric(input, 'currentGrade');
    const w = numeric(input, 'finalWeight') / 100;
    const target = numeric(input, 'targetGrade');
    const currentContribution = current * (1 - w);
    const maxAchievable = currentContribution + 100 * w;
    const needed = (target - currentContribution) / w;
    const requiredFinal = Math.min(100, Math.max(0, needed));
    return {
      results: [
        { key: 'requiredFinal', value: requiredFinal, kind: 'number', hero: true },
        { key: 'currentContribution', value: currentContribution, kind: 'number' },
        { key: 'maxAchievable', value: maxAchievable, kind: 'number' },
      ],
    };
  },
};

export default finalGradePlanner;
