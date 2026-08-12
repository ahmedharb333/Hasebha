export interface TaxBracket {
  from: number;
  rate: number;
}

export function annualTax(brackets: TaxBracket[], annual: number): number {
  let tax = 0;
  for (let i = 0; i < brackets.length; i++) {
    const lower = brackets[i].from;
    const upper = i + 1 < brackets.length ? brackets[i + 1].from : Infinity;
    if (annual <= lower) break;
    tax += (Math.min(annual, upper) - lower) * brackets[i].rate / 100;
    if (annual <= upper) break;
  }
  return tax;
}
