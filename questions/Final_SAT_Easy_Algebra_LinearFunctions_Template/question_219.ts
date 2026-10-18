import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 219
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 1-5]
 * - Difficulty factors: [Finding linear equation from table]
 * - Distractor patterns: [sum of m and b as coeff, swapped m and b, wrong slope]
 * - Constraints: [None]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_219 = {
  metadata: {
    id: "219",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // intercept !== slope keeps the "change not divided" choice, 2s x + (i - s),
    // from matching the (s + i)x choice
    const slope = getRandomInt(2, 5);
    let intercept = getRandomInt(1, 5);
    while (intercept === slope) intercept = getRandomInt(1, 5);
    // Typeset "f(x) = mx + b" with a bare x when m = 1; a zero or negative b is
    // written as "f(x) = mx" or "f(x) = mx - |b|"
    const fx = (m: number, b: number) => `$f(x) = ${m === 1 ? '' : m}x${b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${-b}`}$`;

    const tableCode = `<table style="border-collapse: collapse; background: transparent;"><thead><tr><th style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">$x$</th><th style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">$f(x)$</th></tr></thead><tbody><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">1</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${slope + intercept}</td></tr><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">3</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${3 * slope + intercept}</td></tr><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">5</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; background: transparent;">${5 * slope + intercept}</td></tr></tbody></table>`;

    const correctEquation = fx(slope, intercept);
    const distractorA = fx(slope + intercept, 0);
    const distractorB = fx(intercept, slope + intercept);
    const distractorC = fx(2 * slope, intercept - slope);

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `it uses $f(1) = ${slope + intercept}$ as the slope and has no constant term; it gives $f(3) = ${3 * (slope + intercept)}$, not ${3 * slope + intercept}` },
      { text: distractorB, isCorrect: false, reason: `it uses the $y$-intercept, ${intercept}, as the slope and $f(1) = ${slope + intercept}$ as the $y$-intercept; it gives $f(1) = ${intercept + slope + intercept}$, not ${slope + intercept}` },
      { text: distractorC, isCorrect: false, reason: `it uses the change in $f(x)$ from $x = 1$ to $x = 3$, ${2 * slope}, as the slope without dividing by the change in $x$, 2` },
      { text: correctEquation, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Some values of the linear function $f$ are shown in the table above. Which of the following defines $f$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The slope is $m = \\frac{${3 * slope + intercept} - ${slope + intercept}}{3 - 1} = ${slope}$. Since $f(1) = ${slope + intercept}$, we have $m(1) + b = ${slope + intercept}$, so $b = ${slope + intercept} - ${slope} = ${intercept}$. Thus $f(x) = ${slope}x + ${intercept}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
