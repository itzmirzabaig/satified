import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 707
 *
 * INTENT: Given a table of three (x, y) pairs on a line y = mx + b (m, b
 * positive integers), choose the equation of the line.
 *
 * MATH: slope m in [3,8], intercept b in [2,10], with the guard m != b. The
 * four options are y=mx+b (correct), y=mx+y0 (first table y used as intercept),
 * y=bx+m (slope/intercept swapped), and y=bx+y0. With m != b and m,b > 0 these
 * four strings are pairwise distinct for every draw (verified by enumeration),
 * so there are no duplicate options and the shuffled correct letter is
 * unambiguous. All math is written with \( ... \) delimiters (no bare $).
 */
export const generator_707 = {
  metadata: {
    id: "707",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math setup: y = mx + b, guaranteeing slope != intercept.
    const slope = getRandomInt(3, 8);        // positive integer slope
    let intercept = getRandomInt(2, 10);     // positive integer intercept
    let tries = 0;
    while (intercept === slope && tries++ < 50) {
      intercept = getRandomInt(2, 10);
    }
    if (intercept === slope) intercept = slope === 10 ? 9 : intercept + 1; // final safety

    const xVals = [1, 2, 3];
    const yVals = xVals.map(x => slope * x + intercept);
    const y0 = yVals[0]; // = slope + intercept

    // 2. Styled HTML table (borders via currentColor so it works in either theme).
    const tableStyle = `style="border-collapse: collapse; margin: 20px auto; font-family: sans-serif; min-width: 200px; border: 1px solid currentColor;"`;
    const cellStyle = `style="border: 1px solid currentColor; padding: 8px 15px; text-align: center;"`;

    const rows = xVals.map((x, i) => `
      <tr>
        <td ${cellStyle}>${x}</td>
        <td ${cellStyle}>${yVals[i]}</td>
      </tr>`).join('');

    const tableHTML = `
      <table ${tableStyle}>
        <thead>
          <tr>
            <th ${cellStyle}>\\( x \\)</th>
            <th ${cellStyle}>\\( y \\)</th>
          </tr>
        </thead>
        <tbody>${rows}
        </tbody>
      </table>`;

    // 3. Options — four provably-distinct equation strings (see header note).
    const optionsData = [
      { text: `y = ${slope}x + ${intercept}`, isCorrect: true,
        reason: "" },
      { text: `y = ${slope}x + ${y0}`, isCorrect: false,
        reason: "used the first table value of y as the y-intercept" },
      { text: `y = ${intercept}x + ${slope}`, isCorrect: false,
        reason: "swapped the slope and the y-intercept" },
      { text: `y = ${intercept}x + ${y0}`, isCorrect: false,
        reason: "used the intercept as the slope and the first y-value as the intercept" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `The table shows three values of \\( x \\) and their corresponding values of \\( y \\). Which equation represents the linear relationship between \\( x \\) and \\( y \\)?
${tableHTML}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. For a linear relationship \\( y = mx + b \\), the slope \\( m \\) is the change in \\( y \\) divided by the change in \\( x \\). Using the first two rows, \\( m = \\frac{${yVals[1]} - ${yVals[0]}}{${xVals[1]} - ${xVals[0]}} = \\frac{${slope}}{1} = ${slope} \\). To find \\( b \\), substitute the point \\( (1, ${yVals[0]}) \\) into \\( y = ${slope}x + b \\): \\( ${yVals[0]} = ${slope}(1) + b \\), so \\( b = ${yVals[0]} - ${slope} = ${intercept} \\). Therefore the relationship is \\( y = ${slope}x + ${intercept} \\), which is choice ${correctLetter}.`
    };
  }
};
