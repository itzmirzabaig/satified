import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 533
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 0-3, f(x): 3-6]
 * - Difficulty factors: [Identifying linear function from table and pattern]
 * - Distractor patterns: [Decreasing options (A,C), exponential (D)]
 * - Constraints: [Constant rate of change = linear]
 * - Question type: [Figure/Table→Multiple Choice Text]
 * - Figure generation: [Points plotted from table data]
 *
 * FIXED (review):
 * - The answer was always "Increasing linear"; now the table is drawn from one
 *   of the four kinds (increasing or decreasing, linear or exponential).
 * - The stem never said the table describes f; it does now.
 * - Wrong choices had no reasons, and the explanation could print "1x".
 * - Table borders were black (invisible in dark mode); they use currentColor.
 */

type Kind = 'incLin' | 'decLin' | 'incExp' | 'decExp';

export const generator_533 = {

  metadata: {
    id: "533",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const kind: Kind = getRandomElement(['incLin', 'decLin', 'incExp', 'decExp'] as Kind[]);
    const xValues = [0, 1, 2, 3];
    let yValues: number[] = [];
    let step = 0;   // constant difference (linear) or constant factor (exponential)

    if (kind === 'incLin') {
      step = getRandomInt(2, 5);
      const b = getRandomInt(1, 6);
      yValues = xValues.map(x => b + step * x);
    } else if (kind === 'decLin') {
      step = getRandomInt(2, 5);
      const b = 3 * step + getRandomInt(2, 8);
      yValues = xValues.map(x => b - step * x);
    } else if (kind === 'incExp') {
      step = getRandomElement([2, 3]);
      const a = getRandomInt(1, 4);
      yValues = xValues.map(x => a * step ** x);
    } else {
      step = getRandomElement([2, 3]);
      const k = step === 2 ? getRandomInt(1, 3) : 1;
      const a = k * step ** 3;
      yValues = xValues.map(x => a / step ** x);
    }

    const diffs = [yValues[1] - yValues[0], yValues[2] - yValues[1], yValues[3] - yValues[2]];
    const increasing = kind === 'incLin' || kind === 'incExp';
    const linear = kind === 'incLin' || kind === 'decLin';

    const cell = 'border: 1px solid currentColor; padding: 8px 12px; text-align: center;';
    const tableCode = `
      <table style="border-collapse: collapse; margin: 0 auto;">
        <tr><th style="${cell}">$x$</th><th style="${cell}">$f(x)$</th></tr>
        ${xValues.map((x, i) => `<tr><td style="${cell}">$${x}$</td><td style="${cell}">$${yValues[i]}$</td></tr>`).join('')}
      </table>
    `;

    const valuesText = `$${yValues.join('$, $')}$`;
    const dirFact = increasing
      ? `the values of $f(x)$ increase as $x$ increases (${valuesText})`
      : `the values of $f(x)$ decrease as $x$ increases (${valuesText})`;
    const typeFact = linear
      ? `each time $x$ increases by $1$, $f(x)$ ${increasing ? 'increases' : 'decreases'} by the same amount, $${step}$, which is a constant rate of change`
      : `each time $x$ increases by $1$, $f(x)$ is ${increasing ? `multiplied by $${step}$` : `divided by $${step}$`}, a constant factor, and the differences $${diffs.map(d => Math.abs(d)).join('$, $')}$ are not constant`;

    const label = (inc: boolean, lin: boolean) => `${inc ? 'Increasing' : 'Decreasing'} ${lin ? 'linear' : 'exponential'}`;
    const wrongDir = increasing ? 'decreasing' : 'increasing';
    const wrongType = linear ? 'exponential' : 'linear';
    const typeSlip = linear
      ? `an exponential function changes by a constant factor, but $f(x)$ changes by the constant amount $${step}$`
      : `a linear function changes by a constant amount, but the differences $${diffs.map(d => Math.abs(d)).join('$, $')}$ are not constant`;
    const dirSlip = `${dirFact}, so $f$ is not ${wrongDir}`;

    const optionsData = [
      { text: label(increasing, linear), isCorrect: true, reason: '' },
      { text: label(!increasing, linear), isCorrect: false, reason: dirSlip },
      { text: label(increasing, !linear), isCorrect: false, reason: `${typeSlip}, so $f$ is not ${wrongType}` },
      { text: label(!increasing, !linear), isCorrect: false, reason: `$f$ is neither ${wrongDir} nor ${wrongType}: ${dirFact}, and ${typeSlip}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "The table shows four values of $x$ and their corresponding values of $f(x)$ for the function $f$. Which of the following best describes the function $f$?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In the table, ${dirFact}, so $f$ is ${increasing ? 'increasing' : 'decreasing'}. Also, ${typeFact}, so $f$ is ${linear ? 'linear' : 'exponential'}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };

  }

};
