import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 6e06a0a7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, distributing to (a+3)]
 * - Difficulty factors: [Multiplying monomial by binomial, handling exponents]
 * - Distractor patterns: [A,B: combining wrong, C: not distributing to constant]
 * - Constraints: [Exponent rules]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_6e06a0a7 = {
  metadata: {
    // id: "6e06a0a7",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const c = getRandomInt(2, 4);
    const b = getRandomInt(2, 5);

    const correctText = `$${c}a^{3}+${c * b}a^{2}$`;

    const optionsData = [
      { text: `$${c + 2}a^{3}$`, isCorrect: false },
      { text: `$${(c + 2) * b}a^{5}$`, isCorrect: false },
      { text: `$${c}a^{3}+${b}$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which of the following expressions is equivalent to $${c}a^2(a+${b})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Distribute $${c}a^2$: $${c}a^2 \\cdot a + ${c}a^2 \\cdot ${b} = ${c}a^{3}+${c * b}a^{2}$.`
    };
  }
};

/**
 * Question ID: 290cdc2c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: 14]
 * - Difficulty factors: [Converting rational exponent to radical]
 * - Distractor patterns: [A: coefficient 1/14 multiplied, C: multiplied by 14, D: reciprocal exponent]
 * - Constraints: [Exponent is 1/n meaning nth root]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */