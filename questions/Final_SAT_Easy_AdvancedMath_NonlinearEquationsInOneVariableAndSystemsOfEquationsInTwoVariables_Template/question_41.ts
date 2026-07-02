import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 41
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Roots 2 and 3, Scale 3]
 * - Difficulty factors: [Factoring, discriminant analysis]
 * - Distractor patterns: [Zero solutions, one solution, infinite solutions]
 */

export const generator_41 = {
  metadata: {
    id: "41",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const root1 = getRandomInt(1, 4);
    let root2 = getRandomInt(1, 5);
    while (root2 === root1) {
      root2 = getRandomInt(1, 5);
    }
    const scale = getRandomInt(2, 4);

    const a = scale;
    const b = -scale * (root1 + root2);
    const c = scale * (root1 * root2);

    const discriminant = (b * b) - (4 * a * c);
    const bSign = b >= 0 ? "+" : "-";
    const bAbs = Math.abs(b);
    const cSign = c >= 0 ? "+" : "-";
    const cAbs = Math.abs(c);

    const optionsData = [
      { text: "Exactly one", isCorrect: false },
      { text: "Exactly two", isCorrect: true },
      { text: "Infinitely many", isCorrect: false },
      { text: "Zero", isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `$${a}x^2 ${bSign} ${bAbs}x ${cSign} ${cAbs} = 0$ \n\n How many distinct real solutions are there to the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "Exactly two",
      explanation: `Choice ${correctOption.letter} is correct. Dividing the equation $${a}x^2 ${bSign} ${bAbs}x ${cSign} ${cAbs} = 0$ by $${scale}$ yields $x^2 - ${root1 + root2}x + ${root1 * root2} = 0$, which factors as $(x - ${root1})(x - ${root2}) = 0$. The solutions are $x = ${root1}$ and $x = ${root2}$. Since there are two distinct real values, there are exactly two solutions. Alternatively, the discriminant $b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${discriminant}$. Since the discriminant is positive, the equation has exactly two distinct real solutions.`
    };
  }
};
