import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 772de699
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 23, 2, 9]
 * - Difficulty factors: [Factoring out x from all terms]
 * - Distractor patterns: [A: factors out 23x, B: factors out 9x, D: factors out 34]
 * - Constraints: [Must factor out common variable x]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_772de699 = {
  metadata: {
    // id: "772de699",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(20, 30);
    const b = getRandomInt(2, 5);
    const c = getRandomInt(5, 12);

    const correctText = `$x(${a}x^{2}+${b}x+${c})$`;

    const optionsData = [
      { text: `$${a}x(x^{2}+${b}x+${c})$`, isCorrect: false },
      { text: `$${c}x(${a}x^{3}+${b}x^{2}+1)$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${a + b + c}(x^{3}+x^{2}+x)$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x^{3}+${b}x^{2}+${c}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Factor out the common factor $x$ from each term: $x(${a}x^{2}+${b}x+${c})$.`
    };
  }
};

/**
 * Question ID: 02489d55
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 19, constant: 7]
 * - Difficulty factors: [Distributing multiplication over subtraction]
 * - Distractor patterns: [B: adds 19+7, C: forgets to distribute to second term, D: subtracts 19-7]
 * - Constraints: [Multiplication]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */