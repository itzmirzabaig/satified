import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 294db8ec
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, constant: 4]
 * - Difficulty factors: [Factoring out GCF from two terms]
 * - Distractor patterns: [A: factors out 4, B: factors out 4, C: factors out 2 but wrong inner term]
 * - Constraints: [GCF is 2]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_294db8ec = {
  metadata: {
    // id: "294db8ec",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcf = getRandomInt(2, 4);
    const a = gcf;
    const b = gcf * 2;

    const correctText = `$${gcf}(x^{3}+2)$`;

    const optionsData = [
      { text: `$${b}(x^{3}+${b})$`, isCorrect: false },
      { text: `$${b}(x^{3}+2)$`, isCorrect: false },
      { text: `$${gcf}(x^{3}+${b})$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which of the following is equivalent to $${a}x^{3}+${b}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Factor out the GCF $${gcf}$: $${gcf}(x^{3})+${gcf}(2) = ${gcf}(x^{3}+2)$.`
    };
  }
};

/**
 * Question ID: bdb0aa23
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, -6, 8]
 * - Difficulty factors: [Factoring out x^3]
 * - Distractor patterns: [A: factors out x^4, C: factors out 8, D: factors out 6]
 * - Constraints: [Must factor out lowest power x^3]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */