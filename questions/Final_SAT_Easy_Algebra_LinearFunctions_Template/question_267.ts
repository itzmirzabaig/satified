import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 267
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 25-35]
 * - Difficulty factors: [Modeling from table]
 * - Distractor patterns: [f(0) and f(1) as coefficients, change over two steps as slope, f(1) and f(2) as coefficients]
 * - Constraints: [None]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_267 = {
  metadata: {
    id: "267",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);

    const intercept = getRandomInt(25, 35);

    const tableCode = `<table><thead><tr><th>$x$</th><th>$f(x)$</th></tr></thead><tbody><tr><td>0</td><td>${intercept}</td></tr><tr><td>1</td><td>${slope + intercept}</td></tr><tr><td>2</td><td>${2 * slope + intercept}</td></tr></tbody></table>`;

    const correctEquation = `$f(x) = ${slope}x + ${intercept}$`;

    const distractorB = `$f(x) = ${intercept}x + ${slope + intercept}$`;

    const distractorC = `$f(x) = ${2 * slope}x + ${intercept}$`;

    const distractorD = `$f(x) = ${slope + intercept}x + ${2 * slope + intercept}$`;

    const optionsData = [
      { text: correctEquation, isCorrect: true, reason: '' },
      { text: distractorB, isCorrect: false, reason: `it uses $f(0) = ${intercept}$ as the slope and $f(1) = ${slope + intercept}$ as the constant; this equation gives $f(0) = ${slope + intercept}$, not ${intercept}` },
      { text: distractorC, isCorrect: false, reason: `${2 * slope} is the increase in $f(x)$ from $x = 0$ to $x = 2$; dividing by the increase in $x$, 2, gives the slope, ${slope}` },
      { text: distractorD, isCorrect: false, reason: `it uses $f(1)$ and $f(2)$ from the table as the slope and the constant; this equation gives $f(0) = ${2 * slope + intercept}$, not ${intercept}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, the table shows three values of $x$ and their corresponding values of $f(x)$. Which equation defines $f(x)$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. A linear function can be written as $f(x) = mx + b$, where $m$ is the slope and $b = f(0)$. The table gives $f(0) = ${intercept}$, so $b = ${intercept}$. Each time $x$ increases by 1, $f(x)$ increases by ${slope}, so $m = ${slope}$. Therefore, $f(x) = ${slope}x + ${intercept}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
