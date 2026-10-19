import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 35
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [9, 6, 2, 3]
 * - Difficulty factors: [Combining multiple like terms x and y]
 * - Distractor patterns: [A: wrong x coefficient, B: wrong y coefficient, C: arbitrary addition]
 * - Constraints: [Two pairs of like terms]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_35 = {
  metadata: {
    id: "35",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let a1: number, a2: number;
    do {
      a1 = getRandomInt(5, 12);
      a2 = getRandomInt(4, 9);
      // a1 - a2 is a distractor coefficient, so keep it at 2 or more: a
      // 0, 1 or negative coefficient would read as a formatting slip.
    } while (a1 - a2 < 2);
    const b1 = getRandomInt(2, 5);
    const b2 = getRandomInt(3, 6);

    const sumA = a1 + a2;
    const sumB = b1 + b2;
    const total = sumA + sumB;

    const correctText = `$${sumA}x+${sumB}y$`;

    const optionsData = [
      { text: `$${a1 - a2}x+${sumB}y$`, isCorrect: false },
      { text: `$${sumA}x+${b1 * b2}y$`, isCorrect: false },
      { text: `$${total}xy$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const letterOf = (i: number) => shuffledOptions.find(o => o.text === optionsData[i].text)!.letter;

    return {
      questionText: `Which expression is equivalent to $${a1}x + ${a2}x + ${b1}y + ${b2}y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Combine the $x$ terms: $${a1}x+${a2}x=${sumA}x$. Combine the $y$ terms: $${b1}y+${b2}y=${sumB}y$. The result is $${sumA}x+${sumB}y$. Choice ${letterOf(0)} is incorrect because it subtracts the $x$ coefficients instead of adding them. Choice ${letterOf(1)} is incorrect because it multiplies the $y$ coefficients instead of adding them. Choice ${letterOf(2)} is incorrect; $x$ terms and $y$ terms are not like terms, so they cannot be combined into a single $xy$ term.`
    };
  }
};
