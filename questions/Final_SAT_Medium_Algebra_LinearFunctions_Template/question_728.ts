import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 728
 *
 * Linear model from a two-point table (decreasing population).
 * Intent: given population at two years, model P as a function of t = years
 * after the start year. P(t) = startPop + slope * t, slope = (midPop - startPop)/years.
 *
 * Construction keeps the slope a clean negative integer by choosing the slope
 * magnitude first, then deriving the population drop, so every option is a tidy
 * linear expression and all four choices are distinct by construction.
 */
export const generator_728 = {
  metadata: {
    id: "728",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math setup — pick the slope magnitude first for a clean integer rate.
    const startYear = getRandomInt(1995, 2005);
    const yearsLater = getRandomInt(8, 12);          // >= 8, so popDrop > slopeMag
    const midYear = startYear + yearsLater;

    const slopeMag = getRandomInt(2, 8);             // decrease per year (positive)
    const popDrop = slopeMag * yearsLater;           // total drop over the period
    const startPop = getRandomInt(800, 900);
    const midPop = startPop - popDrop;               // < startPop (decreasing)

    // Correct model: P(t) = startPop - slopeMag * t
    const correctEq = `P(t) = ${startPop} - ${slopeMag}t`;

    // Distractors — all distinct from the answer and from each other:
    //  D1: wrong sign (increasing instead of decreasing).
    const d1 = `P(t) = ${startPop} + ${slopeMag}t`;
    //  D2: uses the total drop as the per-year rate (forgot to divide by years).
    //      popDrop = slopeMag * yearsLater > slopeMag, so slope differs.
    const d2 = `P(t) = ${startPop} - ${popDrop}t`;
    //  D3: uses the later population as the initial value (midPop < startPop),
    //      correct slope. Intercept differs from every other option.
    const d3 = `P(t) = ${midPop} - ${slopeMag}t`;

    const optionsData = [
      { text: `$${correctEq}$`, isCorrect: true },
      { text: `$${d1}$`, isCorrect: false },
      { text: `$${d2}$`, isCorrect: false },
      { text: `$${d3}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // Table HTML with proper styling
    const tableHTML = `
      <table style="border-collapse: collapse; margin: 20px auto; border: 1px solid currentColor; font-family: sans-serif; min-width:200px; background: transparent;">
        <thead>
          <tr>
            <th style="border: 1px solid currentColor; padding: 8px; background: transparent;">Year</th>
            <th style="border: 1px solid currentColor; padding: 8px; background: transparent;">Population</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${startYear}</td>
            <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${startPop}</td>
          </tr>
          <tr>
            <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${midYear}</td>
            <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${midPop}</td>
          </tr>
        </tbody>
      </table>
    `;

    return {
      questionText: `The table above shows the population of a small town for the years ${startYear} and ${midYear}. If the relationship between population and year is linear, which of the following functions $P$ models the population of the town $t$ years after ${startYear}?

${tableHTML}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.

1.  **Identify Points:**
    $t$ is the number of years after ${startYear}.
    At $t = 0$, the population is ${startPop} (the initial value).
    At $t = ${yearsLater}$ (that is, ${midYear} - ${startYear}), the population is ${midPop}.

2.  **Calculate the Slope:**
    $m = \\dfrac{\\text{change in population}}{\\text{change in time}} = \\dfrac{${midPop} - ${startPop}}{${yearsLater}} = \\dfrac{-${popDrop}}{${yearsLater}} = -${slopeMag}$.

3.  **Form the Equation:**
    Using $P(t) = \\text{initial value} + \\text{slope} \\cdot t$ gives
    $P(t) = ${startPop} - ${slopeMag}t$.`
    };
  }
};
