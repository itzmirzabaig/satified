import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 84e5e36c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y = 76, y = x^2 - 5, roots ±9]
 */

export const generator_84e5e36c = {
  metadata: {
    // id: "84e5e36c",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(6, 12);
    const constant = getRandomInt(3, 8);
    const yValue = (base * base) - constant;

    const optionsData = [
      { text: `${base}`, isCorrect: true },
      { text: `${-base}`, isCorrect: true },
      { text: `${yValue}`, isCorrect: false },
      { text: `${constant}`, isCorrect: false }
    ].filter((v, i, a) => a.findIndex(t => t.text === v.text) === i);

    while (optionsData.length < 4) {
      optionsData.push({ text: `${getRandomInt(20, 50)}`, isCorrect: false });
    }

    const shuffledOptions = shuffle(optionsData).map((opt, i) => ({
      ...opt,
      letter: String.fromCharCode(65 + i)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `$$y = ${yValue}$$ $$y = x^2 - ${constant}$$ \n\n The graphs of the given equations in the $xy$-plane intersect at the point $(x, y)$. What is a possible value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Set the equations equal to each other:

$${yValue} = x^2 - ${constant}$

Add $${constant}$ to both sides:

$${yValue + constant} = x^2$

Taking the square root gives $x = \\pm ${base}$. Therefore, a possible value of $x$ is $${correctOption.text}$.`
    };
  }
};

/**
 * Question ID: 58443765
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y = 5x + 4, y = 5x^2 + 4, solutions (0,4) and (1,9)]
 */