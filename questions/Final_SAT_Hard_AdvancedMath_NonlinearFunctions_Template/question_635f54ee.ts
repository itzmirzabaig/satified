import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 635f54ee
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: 3-6]
 * - Difficulty factors: [Surface area formula, solving for side, perimeter]
 * - Distractor patterns: [side, perimeter, multiples]
 * - Constraints: [Side = a/den, face perimeter = 4 × a/den = a when den=4]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_635f54ee = {
  metadata: {
    // id: "635f54ee",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Use den=4 to get perimeter = a
    const den = getRandomInt(3, 6);

    const optionsData = [
      { text: `$\\frac{a}{${den}}$`, isCorrect: false },
      { text: `$a$`, isCorrect: den === 4 },
      { text: `$${den}a$`, isCorrect: false },
      { text: `$${6}a$`, isCorrect: false }
    ];

    // If den != 4, make the correct answer be a different option
    if (den !== 4) {
      const perimeter = `\\frac{4a}{${den}}`;
      optionsData[1] = { text: `$${perimeter}$`, isCorrect: true };
    }

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The surface area of a cube is $6\\left(\\frac{a}{${den}}\\right)^{2}$. Which gives the perimeter of one face?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: den === 4 ? `$a$` : `$\\frac{4a}{${den}}$`,
      explanation: `Choice ${correctLetter} is correct. Surface area $6s^2=6(\\frac{a}{${den}})^2$, so side $s=\\frac{a}{${den}}$. Face perimeter $=4s=4(\\frac{a}{${den}})${den === 4 ? '=a' : `=\\frac{4a}{${den}}`}$.`
    };
  }
};

/**
 * Question ID: d41cf4d3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = a√(x+b), through (-24,0), f(24)<0]
 * - Difficulty factors: [Square root function, domain constraints, sign analysis]
 * - Distractor patterns: [A: f(0)=24, B: f(0)=-24, C: a>b, D: a<b]
 * - Constraints: [b=24, a<0]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */
