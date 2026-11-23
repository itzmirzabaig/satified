import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1051
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 7-15, denominator: 20-30]
 * - Difficulty factors: [Literal equation, multiple steps, distribute negative]
 * - Distractor patterns: [sign error, wrong sign on T, multiple errors]
 * - Constraints: [Algebraic manipulation, isolate H]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1051 = {
  metadata: {
    id: "1051",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Before: the stem stated a random coefficient as the real dew point
    // formula, the fraction could be unreduced (15/21), the choices were bare
    // expressions for a question asking for an equation, the variables were
    // outside math, and wrong choices had vague reasons or none in the
    // explanation. Now it is a stated model with a reduced coefficient, and
    // each wrong choice is a named algebra slip.
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    let num = 0, den = 0;
    do {
      num = getRandomInt(7, 15);
      den = getRandomInt(20, 30);
    } while (gcd(num, den) !== 1);

    const frac = `\\frac{${num}}{${den}}`;
    const inv = `\\frac{${den}}{${num}}`;

    // Correct: H = (den/num)(D - T) + 100
    const correctAnswer = `H=${inv}(D-T)+100`;
    const wrong100 = `H=${inv}(D-T)-100`;      // subtracts 100 instead of adding it
    const droppedNeg = `H=${inv}(T-D)+100`;    // drops the negative sign on the fraction
    const notInverted = `H=${frac}(D-T)+100`;  // multiplies by the fraction, not its reciprocal

    const optionsData = [
      { text: `$${correctAnswer}$`, isCorrect: true, reason: '' },
      { text: `$${wrong100}$`, isCorrect: false, reason: `this equation results from subtracting 100 at the last step; $-${inv}(D-T)=100-H$ means $H=100+${inv}(D-T)$` },
      { text: `$${droppedNeg}$`, isCorrect: false, reason: `this equation results from dropping the negative sign in front of $${frac}$, which leads to $${inv}(D-T)=100-H$` },
      { text: `$${notInverted}$`, isCorrect: false, reason: `this equation results from using $${frac}$ instead of its reciprocal, $${inv}$, to clear the fraction` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In a simplified model, the dew point $D$, in degrees Fahrenheit, is given by the equation $D=T-${frac}(100-H)$, where $T$ is the temperature, in degrees Fahrenheit, and $H$ is the relative humidity, as a percent. Which equation correctly expresses $H$ in terms of $D$ and $T$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Subtracting $T$ from both sides gives $D-T=-${frac}(100-H)$. Multiplying both sides by $-${inv}$ gives $-${inv}(D-T)=100-H$. Adding $H$ to both sides and adding $${inv}(D-T)$ to both sides gives $H=100+${inv}(D-T)$, which is the same as $${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
