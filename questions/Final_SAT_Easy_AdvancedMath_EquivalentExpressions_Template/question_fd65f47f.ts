import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: fd65f47f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 1, 1, 6]
 * - Difficulty factors: [Subtracting polynomials carefully]
 * - Distractor patterns: [A: keeps 2x^2 only, B: wrong middle term sign, C: wrong constant]
 * - Constraints: [Sign handling]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_fd65f47f = {
  metadata: {
    // id: "fd65f47f",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a1 = getRandomInt(2, 4);
    const b1 = getRandomInt(1, 3);
    const c1 = -getRandomInt(7, 10);
    const a2 = 1;
    const b2 = getRandomInt(5, 8);
    const c2 = getRandomInt(1, 4);

    const aSum = a1 + a2;
    const bSum = b1 + b2;
    const cSum = c1 + c2;

    const correctText = `$${aSum}x^2+${bSum}x${cSum >= 0 ? '+' : ''}${cSum}$`;

    const optionsData = [
      { text: `$${a1}x^2+${bSum}x+${cSum + getRandomInt(2,4)}$`, isCorrect: false },
      { text: `$${aSum}x^2+${b2}x${cSum >= 0 ? '+' : ''}${cSum}$`, isCorrect: false },
      { text: `$${aSum}x^2+${bSum}x${-cSum >= 0 ? '+' : ''}${-cSum}$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $\\left(${a1}x^2 + ${b1}x ${c1}\\right) + \\left(x^2 + ${b2}x + ${c2}\\right)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Combine like terms: $(${a1}+1)x^2 + (${b1}+${b2})x + (${c1}+${c2}) = ${correctText.replace(/\$/g, '')}$.`
    };
  }
};

/**
 * Question ID: df0ef054
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2-5, constant: -5 to -2]
 * - Difficulty factors: [Polynomial multiplication, FOIL method]
 * - Distractor patterns: [N/A - Grid-in question]
 */