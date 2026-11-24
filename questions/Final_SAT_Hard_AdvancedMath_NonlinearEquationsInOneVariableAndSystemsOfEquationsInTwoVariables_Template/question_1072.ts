import { getRandomInt, getRandomNonZeroInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1072
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system y=x²+bx+c and y=mx+d, find y₁+y₂]
 * - Difficulty factors: [System with parabola and line, substitution, sum of y-values]
 * - Distractor patterns: [sum of x values, constant counted once, roots read with wrong signs, correct]
 * - Constraints: [Built answer-first from integer intersection x-values r1, r2 and an
 *   integer line y = mx + d, so both intersection points are exact integers;
 *   b = m - (r1+r2), c = d + r1*r2. Guards keep all four options distinct.]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1072 = {
  metadata: {
    id: "1072",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Build the system answer-first.
    // Choose intersection x values r1 > r2 and a line y = mx + d, then derive
    // the parabola y = x^2 + bx + c so the intersections are exact:
    //   x^2 + bx + c = mx + d  <=>  x^2 + (b-m)x + (c-d) = (x-r1)(x-r2) = 0
    //   =>  b = m - (r1+r2),  c = d + r1*r2
    // Fix: before, the wrong choices included the answer plus an offset and the
    // answer with its sign flipped, explained only as "an arithmetic error" and
    // "a sign error"; the stem said "system of equations above"; and the reasons
    // were on separate lines. Each wrong choice is now a real slip:
    //  - sumX: added the x values instead of the y values
    //  - once: counted the constant d only once, m(r1+r2) + d
    //  - flipped: read the roots from the factors with the wrong signs, -m(r1+r2) + 2d
    // The draw is repeated until all four values differ, with d, r1, r2 and r1+r2 nonzero.
    let r1 = -1, r2 = -3, m = 1, d = -1; // valid fallback: -6, -4, -5, 2
    for (let tries = 0; tries < 200; tries++) {
      const cand1 = getRandomInt(-3, 1);
      const cand2 = cand1 - getRandomInt(1, 3);
      const candM = getRandomNonZeroInt(-2, 2);
      const candD = getRandomInt(-3, 3);
      const candSumX = cand1 + cand2;
      if (cand1 === 0 || cand2 === 0 || candD === 0 || candSumX === 0) continue;
      // A y value of 0 would print "+0" in the final sum.
      if (candM * cand1 + candD === 0 || candM * cand2 + candD === 0) continue;
      const candSumY = candM * candSumX + 2 * candD;
      const candOnce = candM * candSumX + candD;
      const candFlipped = -candM * candSumX + 2 * candD;
      if (new Set([candSumY, candSumX, candOnce, candFlipped]).size === 4) {
        r1 = cand1; r2 = cand2; m = candM; d = candD;
        break;
      }
    }

    const b = m - (r1 + r2);
    const c = d + r1 * r2;
    const y1 = m * r1 + d;
    const y2 = m * r2 + d;
    const sumY = y1 + y2;
    const sumX = r1 + r2;
    const once = m * sumX + d;
    const flipped = -m * sumX + 2 * d;

    // STEP 2: Formatting helpers (live values, clean signs)
    const fmtTerm = (coef: number, sym: string): string => {
      if (coef === 0) return '';
      const sign = coef < 0 ? ' - ' : ' + ';
      const mag = Math.abs(coef);
      const body = sym === '' ? `${mag}` : (mag === 1 ? sym : `${mag}${sym}`);
      return `${sign}${body}`;
    };
    const lineLead = m === 1 ? 'x' : m === -1 ? '-x' : `${m}x`;
    const quadExpr = `x^2${fmtTerm(b, 'x')}${fmtTerm(c, '')}`;
    const lineExpr = `${lineLead}${fmtTerm(d, '')}`;
    const stdExpr = `x^2${fmtTerm(b - m, 'x')}${fmtTerm(c - d, '')}`; // = x^2 - (r1+r2)x + r1*r2
    const fmtFactor = (r: number): string => (r < 0 ? `(x+${-r})` : `(x-${r})`);
    const factored = `${fmtFactor(r1)}${fmtFactor(r2)}`;
    const fmtEval = (x: number): string => {
      const lead = m === 1 ? `(${x})` : m === -1 ? `-(${x})` : `${m}(${x})`;
      return `${lead}${fmtTerm(d, '')}`;
    };
    const sumStep = `${y1}${y2 < 0 ? `+(${y2})` : `+${y2}`}`;

    const optionsData = [
      { text: `$${sumX}$`, isCorrect: false, reason: `$${sumX}$ is the sum of the $x$-coordinates, $x_1+x_2$, not the sum of the $y$-coordinates` },
      { text: `$${once}$`, isCorrect: false, reason: `$${once}$ results from including the constant $${d}$ of the linear equation only once when adding $y_1$ and $y_2$, instead of once for each $y$ value` },
      { text: `$${flipped}$`, isCorrect: false, reason: `$${flipped}$ results from reading the solutions from the factors with the wrong signs, using $x=${-r1}$ and $x=${-r2}$` },
      { text: `$${sumY}$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Setting the two expressions for $y$ equal to each other gives $${quadExpr}=${lineExpr}$. Rearranging gives $${stdExpr}=0$, which factors as $${factored}=0$. The $x$-coordinates of the solutions are $x_1=${r1}$ and $x_2=${r2}$. Substituting these into the linear equation gives $y_1=${fmtEval(r1)}=${y1}$ and $y_2=${fmtEval(r2)}=${y2}$. Therefore, $y_1+y_2=${sumStep}=${sumY}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `$y = ${quadExpr}$\n$y = ${lineExpr}$\n\nIf $(x_1, y_1)$ and $(x_2, y_2)$ are the two solutions to the given system of equations, what is the value of $y_1+y_2$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
