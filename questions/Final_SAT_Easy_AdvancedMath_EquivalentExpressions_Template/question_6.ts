import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 13, 7]
 * - Difficulty factors: [Subtracting like terms]
 * - Distractor patterns: [A: multiplies, C: adds, D: arbitrary]
 * - Constraints: [Simple subtraction]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_6 = {
  metadata: {
    id: "6",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(10, 20);
    // Upper bound 8 keeps a - b at 2 or more, so the answer never reads 1x^2.
    const b = getRandomInt(4, 8);
    const diff = a - b;

    const correctText = `$${diff}x^2$`;

    const optionsData = [
      { text: `$-${a * b}x^2$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${a + b}x^2$`, isCorrect: false },
      { text: `$${a + b}x^{4}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const letterOf = (i: number) => shuffledOptions.find(o => o.text === optionsData[i].text)!.letter;

    return {
      questionText: `Which expression is equivalent to $${a}x^2 - ${b}x^2$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The terms are like terms, so subtract the coefficients and keep $x^2$ unchanged: $${a}x^2-${b}x^2=(${a}-${b})x^2=${diff}x^2$. Choice ${letterOf(0)} is incorrect; it multiplies the coefficients. Choice ${letterOf(2)} is incorrect; it adds the coefficients instead of subtracting them. Choice ${letterOf(3)} is incorrect; it adds the coefficients and also adds the exponents.`
    };
  }
};
