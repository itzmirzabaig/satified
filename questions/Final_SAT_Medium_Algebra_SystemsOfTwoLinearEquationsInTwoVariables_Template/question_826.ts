import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 826
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [single/low double-digit coefficients]
 * - Difficulty factors: [Substitution producing a proper-fraction result]
 * - Distractor patterns: [sign error, forgot to subtract, added instead]
 * - Constraints: [Fraction answer in lowest terms]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * System:
 *   a1*x + y = c1
 *   y = a2*x + b2
 * Substituting the second into the first:
 *   a1*x + (a2*x + b2) = c1  ->  (a1 + a2)x = c1 - b2  ->  x = (c1 - b2)/(a1 + a2).
 * The y-coefficient in the first equation is fixed to 1 so the substitution is
 * exact. Ranges guarantee 1 <= (c1 - b2) < (a1 + a2), so x is always a proper
 * fraction in (0, 1) (never an integer).
 */

// Greatest common divisor (iterative, no global mutation).
function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) { const t = y; y = x % y; x = t; }
  return x || 1;
}

// Render num/den as a reduced \frac{}{} (sign out front). A whole number is
// rendered plainly (e.g. 1, not \frac{1}{1}) so distractors stay clean.
function fracTex(num: number, den: number): string {
  const sign = (num < 0) !== (den < 0) ? '-' : '';
  const n = Math.abs(num);
  const d = Math.abs(den);
  const g = gcd(n, d);
  const rn = n / g;
  const rd = d / g;
  return rd === 1 ? `${sign}${rn}` : `${sign}\\frac{${rn}}{${rd}}`;
}

export const generator_826 = {
  metadata: {
    id: "826",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values with 1 <= (c1 - b2) < (a1 + a2).
    const a1 = getRandomInt(5, 12);
    const a2 = getRandomInt(5, 12);
    const b2 = getRandomInt(1, 4);
    const c1 = getRandomInt(b2 + 1, 10);     // ensures c1 - b2 >= 1

    const xDen = a1 + a2;                     // 10..24
    const n0 = c1 - b2;                       // 1..9  (< xDen, so 0 < x < 1)

    // STEP 2: Build question text (all coefficients positive -> no sign glitch).
    const questionText = `$$\\begin{cases} ${a1}x + y = ${c1} \\\\ y = ${a2}x + ${b2} \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $x$?`;

    // STEP 3: Options, all as reduced fractions over the SAME denominator so the
    // four numeric VALUES are pairwise distinct (distinct numerators n0 < c1 <
    // c1+b2, plus one negative), guaranteeing no duplicate options.
    //   correct : n0/xDen              = (c1 - b2)/(a1 + a2)
    //   D1      : -n0/xDen             (sign error)
    //   D2      : c1/xDen              (forgot to subtract b2)
    //   D3      : (c1 + b2)/xDen       (added b2 instead of subtracting)
    const correctText = `$${fracTex(n0, xDen)}$`;
    const distD1 = `$${fracTex(-n0, xDen)}$`;
    const distD2 = `$${fracTex(c1, xDen)}$`;
    const distD3 = `$${fracTex(c1 + b2, xDen)}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distD1, isCorrect: false },
      { text: distD2, isCorrect: false },
      { text: distD3, isCorrect: false }
    ];

    // STEP 4: Shuffle and assign letters (letters known only after shuffle).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;

    // Show the reduction step only when the fraction is not already reduced.
    const reduced = fracTex(n0, xDen);
    const finalStep = reduced === `\\frac{${n0}}{${xDen}}`
      ? `x=\\frac{${n0}}{${xDen}}`
      : `x=\\frac{${n0}}{${xDen}}=${reduced}`;

    // STEP 5: Return question data. Entire derivation is a single $...$ block
    // (one opening '$' before a digit) so no currency/math dollar ambiguity.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption!.text,
      explanation: `Choice ${correctLetter} is correct. Substitute the expression for y from the second equation into the first: $${a1}x+(${a2}x+${b2})=${c1} \\implies ${xDen}x+${b2}=${c1} \\implies ${xDen}x=${n0} \\implies ${finalStep}$. The other choices come from a sign error, from using ${c1} in the numerator without subtracting ${b2}, or from adding ${b2} instead of subtracting it.`
    };
  }
};
