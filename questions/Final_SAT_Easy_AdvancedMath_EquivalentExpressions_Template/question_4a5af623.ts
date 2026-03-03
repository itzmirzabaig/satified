import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4a5af623
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 38, 10, all divisible by 2]
 * - Difficulty factors: [Finding GCF of expression]
 * - Distractor patterns: [B: 5x (not factor of all), C: 38x (not factor of all), D: 2x^2 (not factor of last term)]
 * - Constraints: [Must identify that 2 is the only common factor of all coefficients, x is not in last term]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_4a5af623 = {
  metadata: {
    // id: "4a5af623",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const possibleGcfs = [2, 3, 5, 7];
    const gcf = getRandomElement(possibleGcfs);
    const a = gcf * getRandomInt(1, 4);
    const b = gcf * getRandomInt(10, 20);
    const c = gcf * getRandomInt(3, 8);

    const correctText = `$${gcf}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${getRandomInt(5, 8)}x$`, isCorrect: false },
      { text: `$${b}x$`, isCorrect: false },
      { text: `$${gcf}x^2$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is a factor of $${a}x^2 + ${b}x + ${c}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The greatest common factor of $${a}$, $${b}$, and $${c}$ is $${gcf}$. Since the last term has no $x$ variable, $x$ cannot be a common factor.`
    };
  }
};