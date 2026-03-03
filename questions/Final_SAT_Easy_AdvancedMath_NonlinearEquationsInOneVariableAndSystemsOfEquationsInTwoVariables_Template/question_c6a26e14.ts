import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c6a26e14
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [|x + 45| = 48, positive solution = 3]
 * - Difficulty factors: [Absolute value case splitting, solving for x]
 */

export const generator_c6a26e14 = {
  metadata: {
    // id: "c6a26e14",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(30, 55);
    const b = a + getRandomInt(3, 10);
    const posSol = b - a;
    const negSol = -b - a;

    const optionsData = [
      { text: `${posSol}`, isCorrect: true, reason: "" },
      { text: `${b}`, isCorrect: false, reason: "is the value on the right side of the equation, not the solution for $x$" },
      { text: `${Math.abs(negSol)}`, isCorrect: false, reason: "is the absolute value of the negative solution" },
      { text: `${a + b}`, isCorrect: false, reason: "incorrectly added the values without considering the subtraction needed" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `$$|x + ${a}| = ${b}$$ \n\n What is the positive solution to the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${posSol}`,
      explanation: `Choice ${correctOption.letter} is correct. The absolute value equation $|x + ${a}| = ${b}$ splits into two cases:

1. $x + ${a} = ${b} \\rightarrow x = ${b} - ${a} = ${posSol}$

2. $x + ${a} = -${b} \\rightarrow x = -${b} - ${a} = ${negSol}$

The question asks for the positive solution, which is $${posSol}$.

Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: ad03127d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [6r = 7s + t]
 * - Difficulty factors: [Isolating a variable, literal equations]
 */