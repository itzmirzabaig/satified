import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1e003284
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x = 49 (7^2), constant = 9]
 * - Difficulty factors: [Substitution, evaluating radical expressions]
 */

export const generator_1e003284 = {
  metadata: {
    // id: "1e003284",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(4, 10);
    const xValue = base * base;
    const constant = getRandomInt(5, 15);
    const yValue = base + constant;

    const optionsData = [
      { text: `${yValue}`, isCorrect: true, reason: "" },
      { text: `${xValue - constant}`, isCorrect: false, reason: "subtracted the constant instead of adding it" },
      { text: `${base * constant}`, isCorrect: false, reason: "multiplied the values instead of adding them" },
      { text: `${xValue + constant}`, isCorrect: false, reason: "forgot to take the square root of $x$" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `$$x = ${xValue}$$ $$y = \\sqrt{x} + ${constant}$$ \n\n The graphs of the given equations intersect at the point $(x, y)$ in the $xy$-plane. What is the value of $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${yValue}`,
      explanation: `Choice ${correctOption.letter} is correct. To find the value of $y$, substitute the given value of $x$ into the second equation:

$y = \\sqrt{${xValue}} + ${constant}$

Since $\\sqrt{${xValue}} = ${base}$, the equation becomes:

$y = ${base} + ${constant} = ${yValue}$

Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: c6a26e14
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [|x + 45| = 48, positive solution = 3]
 * - Difficulty factors: [Absolute value case splitting, solving for x]
 */