import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 45
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [6r = 7s + t]
 * - Difficulty factors: [Isolating a variable, literal equations]
 */

export const generator_45 = {
  metadata: {
    id: "45",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rCoeff = getRandomInt(4, 9);
    const sCoeff = getRandomInt(3, 8);
    const correctText = `$s = \\frac{${rCoeff}r - t}{${sCoeff}}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$s = ${rCoeff * sCoeff}r - t$`, isCorrect: false },
      { text: `$s = \\frac{${rCoeff}}{${sCoeff}}r - t$`, isCorrect: false },
      { text: `$s = ${sCoeff}(${rCoeff}r - t)$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, i) => ({
      ...opt,
      letter: String.fromCharCode(65 + i)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `$$${rCoeff}r = ${sCoeff}s + t$$ \n\n The given equation relates the variables $r, s,$ and $t$. Which equation correctly expresses $s$ in terms of $r$ and $t$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. To isolate $s$, subtract $t$ from both sides:

$${rCoeff}r - t = ${sCoeff}s$

Then, divide both sides by $${sCoeff}$ to solve for $s$:

$s = \\frac{${rCoeff}r - t}{${sCoeff}}$`
    };
  }
};
