import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 70e29454
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 2-4, b: 5-10]
 * - Difficulty factors: [Two-parameter infinite solutions condition]
 * - Distractor patterns: [Right a but wrong b, wrong sign for a]
 * - Constraints: [For infinite solutions: coefficients must match AND constants must match]
 * - Question type: [Multiple Choice Text]
 */

export const generator_70e29454 = {
  metadata: {
    // id: "70e29454",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Generate equation of form a(c-x) - b = d - ex
    // For infinite solutions: -a = -e (so a = e) and ac - b = d
    const a = getRandomInt(2, 4);
    const c = getRandomInt(2, 4);
    const d = -getRandomInt(1, 3);
    const b = a * c - d;

    // Distractor generation
    const distractorA_a = a, distractorA_b = b - 3;
    const distractorC_a = -a, distractorC_b = b - 2;
    const distractorD_a = -a, distractorD_b = -b;

    const correctText = `$a=${a}$ and $b=${b}$`;
    const optionsData = [
      { text: `$a=${distractorA_a}$ and $b=${distractorA_b}$`, isCorrect: false },
      { text: `$a=${a}$ and $b=${b}$`, isCorrect: true },
      { text: `$a=${distractorC_a}$ and $b=${distractorC_b}$`, isCorrect: false },
      { text: `$a=${distractorD_a}$ and $b=${distractorD_b}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    return {
      questionText: `$a(${c}-x)-b=${d}-${a}x$

In the equation above, $a$ and $b$ are constants. If the equation has infinitely many solutions, what are the values of $a$ and $b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. For a linear equation to have infinitely many solutions, it must be an identity. Expanding: $${a*c}-ax-b=${d}-${a}x$. Comparing coefficients: $-${a}=-${a}$ ✓. Comparing constants: $${a*c}-b=${d}$, so $b=${b}$.`
    };
  }
};

/**
 * Question ID: 9e2bf782
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tank counts fixed]
 * - Difficulty factors: [Finding possible median given grouped constraints]
 */
