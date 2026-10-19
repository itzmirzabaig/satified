import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 259
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio: 0.2, 0.4, 0.5, 0.8, 1.25 or 2.5; areas: multiples of 100]
 * - Difficulty factors: [Determining proportional relationship]
 * - Distractor patterns: [reciprocal ratio, additive rule fitting one row, change in water used as the rate]
 * - Constraints: [Ensure proportional through origin; every table value exact]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_259 = {
  metadata: {
    id: "259",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The table used Math.round(1.7 * area), so the water values did not fit
    // the answer exactly (1.7 * 2,772 = 4,712.4, shown as 4,712). The ratio now
    // has a terminating reciprocal and every area is a multiple of 100, so all
    // table values and the reciprocal choice are exact.
    const [ratio, reciprocal] = ([[0.2, 5], [0.4, 2.5], [0.5, 2], [0.8, 1.25], [1.25, 0.8], [2.5, 0.4]] as const)[getRandomInt(0, 5)];
    const step = getRandomInt(5, 15) * 100;
    const firstArea = getRandomInt(10, 30) * 100;
    const areas = [firstArea, firstArea + step, firstArea + 2 * step];
    const waters = areas.map(a => Math.round(a * ratio * 100) / 100);
    const waterStep = waters[1] - waters[0];
    const shift = waters[0] - areas[0];

    const fmt = (n: number) => n.toLocaleString('en-US');
    const cell = 'border: 1px solid #ccc; padding: 8px 16px; text-align: center;';
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto;"><tr><td style="${cell} font-weight: bold;">$x$</td><td style="${cell} font-weight: bold;">$f(x)$</td></tr>${areas.map((a, i) => `<tr><td style="${cell}">${fmt(a)}</td><td style="${cell}">${fmt(waters[i])}</td></tr>`).join('')}</table>`;

    const correctEquation = `$f(x) = ${ratio}x$`;
    const shiftText = shift < 0 ? `x - ${fmt(-shift)}` : `x + ${fmt(shift)}`;

    const optionsData = [
      { text: correctEquation, isCorrect: true, reason: '' },
      { text: `$f(x) = ${reciprocal}x$`, isCorrect: false, reason: `${reciprocal} is the area divided by the amount of water, $\\frac{${fmt(areas[0])}}{${fmt(waters[0])}}$; the coefficient of $x$ is the amount of water divided by the area` },
      { text: `$f(x) = ${shiftText}$`, isCorrect: false, reason: `this equation fits only the first row of the table; for example, it gives $f(${fmt(areas[1])}) = ${fmt(areas[1] + shift)}$, not ${fmt(waters[1])}` },
      { text: `$f(x) = ${fmt(waterStep)}x$`, isCorrect: false, reason: `${fmt(waterStep)} is the increase in the amount of water from one row to the next, which is the increase for ${fmt(step)} square feet, not for 1 square foot` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The table shows the relationship between the area $x$, in square feet, of a roof and the amount of water $f(x)$, in gallons, drained from the roof. Which equation could define $f$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. In each row of the table, the amount of water is ${ratio} times the area: $${ratio}(${fmt(areas[0])}) = ${fmt(waters[0])}$, $${ratio}(${fmt(areas[1])}) = ${fmt(waters[1])}$, and $${ratio}(${fmt(areas[2])}) = ${fmt(waters[2])}$. Therefore, $f(x) = ${ratio}x$ could define $f$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
