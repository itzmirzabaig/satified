import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 40049d49
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [m: 3-6, n: 10-20, p: 2-5, k: 2-3]
 * - Difficulty factors: [Infinite solutions condition with fractions]
 * - Distractor patterns: [0, p, n]
 * - Constraints: [For infinite solutions: m = a/k and n = ap/k]
 * - Question type: [Multiple Choice Text]
 */

export const generator_40049d49 = {
  metadata: {
    // id: "40049d49",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Equation form: mx + n = a(x+p)/k
    // For infinite solutions: m = a/k and n = ap/k
    const m = getRandomInt(3, 6);
    const n = getRandomInt(10, 20);
    const p = getRandomInt(2, 5);
    const k = getRandomInt(2, 3);
    const a = m * k;

    // Distractors
    const distractorA = 0;
    const distractorB = p;
    const distractorD = n;

    const correctText = `$${a}$`;
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${a}$`, isCorrect: true },
      { text: `$${distractorD}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    return {
      questionText: `$$${m}x + ${n} = \\frac{a(x+${p})}{${k}}$$ In the given equation, $a$ is a constant. If the equation has infinitely many solutions, what is the value of $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. For infinitely many solutions, both sides must be identical. Distributing on the right: $$${m}x + ${n} = \\frac{a}{${k}}x + \\frac{${p}a}{${k}}$$. Comparing coefficients of $x$: $$${m} = \\frac{a}{${k}}$$, so $a = ${m * k} = ${a}$.`
    };
  }
};

/**
 * Question ID: 5ad9eff0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [width: w, length difference: 6]
 * - Difficulty factors: [Perimeter equation setup]
 */
