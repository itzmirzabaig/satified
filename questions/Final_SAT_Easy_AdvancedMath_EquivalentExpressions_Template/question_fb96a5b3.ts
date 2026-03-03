import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: fb96a5b3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, inside: ab-3, add: 2]
 * - Difficulty factors: [Distribution then addition]
 * - Distractor patterns: [A: 2ab-1 (arithmetic error), C: 2ab-5, D: 2ab-8 (subtracts 2 instead of adding)]
 * - Constraints: [Must distribute to both terms]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_fb96a5b3 = {
  metadata: {
    // id: "fb96a5b3",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 4);
    const c = getRandomInt(2, 5);
    const add = getRandomInt(2, 5);
    const inner = a * c;
    const result = -inner + add;

    const correctText = `$${a}ab${result >= 0 ? '+' : ''}${result}$`;

    const optionsData = [
      { text: `$${a}ab${result + 3 >= 0 ? '+' : ''}${result + 3}$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${a}ab${result - 1 >= 0 ? '+' : ''}${result - 1}$`, isCorrect: false },
      { text: `$${a}ab-${inner + add}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which of the following expressions is equivalent to $${a}(ab-${c})+${add}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Distribute $${a}$: $${a}ab - ${inner} + ${add} = ${a}ab${result >= 0 ? '+' : ''}${result}$.`
    };
  }
};

/**
 * Question ID: df747160
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [17 is GCF outside, 100 is 10^2]
 * - Difficulty factors: [Difference of squares pattern inside GCF]
 * - Distractor patterns: [A,B: wrong factors of 100, C: perfect square trinomial]
 * - Constraints: [Must recognize x^2 - (10y)^2 pattern]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */