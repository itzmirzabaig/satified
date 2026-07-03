import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 704
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -p/q reduced, point (x1, y1)]
 * - Difficulty factors: [Point-slope form, solving for y-intercept]
 * - Distractor patterns: [wrong slope sign, y-coord as intercept, wrong-sign intercept]
 * - Constraints: [Clean integer intercept, fully-reduced slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 *
 * MATH: slope m = sign*num/den (reduced, 0<num<den so it stays a proper
 * fraction). x1 is a multiple of den (x1 = den*k), so m*x1 = sign*num*k is an
 * integer and b = y1 - m*x1 is an integer — no float artifacts. The three
 * same-slope options use the three distinct constants b, y1, b2=y1+sign*num*k
 * (pairwise distinct because sign*num*k != 0); the fourth flips the slope sign,
 * so all four option strings differ for every draw with no retry needed.
 */

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

export const generator_704 = {
  metadata: {
    id: "704",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate a fully-reduced proper-fraction slope.
    const slopeDen = getRandomInt(2, 6);
    let slopeNum = getRandomInt(1, slopeDen - 1);
    let guard = 0;
    while (gcd(slopeNum, slopeDen) !== 1 && guard++ < 50) {
      slopeNum = getRandomInt(1, slopeDen - 1);
    }
    // Fallback guarantees a coprime numerator if the loop never found one.
    if (gcd(slopeNum, slopeDen) !== 1) slopeNum = 1;

    const slopeSign = getRandomElement([-1, 1]);
    const k = getRandomInt(1, 4);
    const x1 = slopeDen * k;            // multiple of denominator → clean intercept
    const y1 = getRandomInt(5, 20);

    // m * x1 = slopeSign * slopeNum * k  (an integer)
    const mx1 = slopeSign * slopeNum * k;
    const b = y1 - mx1;                 // integer y-intercept (correct)
    const b2 = y1 + mx1;                // wrong-sign intercept (distractor)

    // STEP 2: Signed helpers so we never emit "+ -6".
    const slopeStr = slopeSign === -1
      ? `-\\frac{${slopeNum}}{${slopeDen}}`
      : `\\frac{${slopeNum}}{${slopeDen}}`;
    const slopeStrFlipped = slopeSign === -1
      ? `\\frac{${slopeNum}}{${slopeDen}}`
      : `-\\frac{${slopeNum}}{${slopeDen}}`;
    const constStr = (c: number) => (c < 0 ? `- ${Math.abs(c)}` : `+ ${c}`);

    const optionsData = [
      { text: `\\( y = ${slopeStr}x ${constStr(b)} \\)`, isCorrect: true,
        reason: "" },
      { text: `\\( y = ${slopeStrFlipped}x ${constStr(b)} \\)`, isCorrect: false,
        reason: "used the wrong sign for the slope" },
      { text: `\\( y = ${slopeStr}x ${constStr(y1)} \\)`, isCorrect: false,
        reason: "used the y-coordinate as the y-intercept without solving" },
      { text: `\\( y = ${slopeStr}x ${constStr(b2)} \\)`, isCorrect: false,
        reason: "added instead of subtracted when solving for the y-intercept" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    // Sign phrasing for the prose "b = y1 - (m*x1)" step.
    const mx1Str = mx1 < 0 ? `\\left(${mx1}\\right)` : `${mx1}`;

    return {
      questionText: `Line \\( t \\) in the \\( xy \\)-plane has a slope of \\( ${slopeStr} \\) and passes through the point \\( (${x1}, ${y1}) \\). Which equation defines line \\( t \\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The equation of line \\( t \\) can be written in slope-intercept form \\( y = mx + b \\), where \\( m \\) is the slope and \\( (0, b) \\) is the y-intercept. It is given that line \\( t \\) has slope \\( m = ${slopeStr} \\) and passes through \\( (${x1}, ${y1}) \\). Substituting \\( x = ${x1} \\) and \\( y = ${y1} \\) gives \\( ${y1} = ${slopeStr}\\left(${x1}\\right) + b = ${mx1Str} + b \\), so \\( b = ${y1} - ${mx1Str} = ${b} \\). Therefore line \\( t \\) is defined by \\( y = ${slopeStr}x ${constStr(b)} \\), which is choice ${correctLetter}.`
    };
  }
};
