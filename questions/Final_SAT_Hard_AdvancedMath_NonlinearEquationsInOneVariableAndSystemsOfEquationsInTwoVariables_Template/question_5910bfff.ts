import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5910bfff
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 7-15, denominator: 20-30]
 * - Difficulty factors: [Literal equation, multiple steps, distribute negative]
 * - Distractor patterns: [sign error, wrong sign on T, multiple errors]
 * - Constraints: [Algebraic manipulation, isolate H]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_5910bfff = {
  metadata: {
    // id: "5910bfff",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Generate random values for the formula D = T - (num/den)(100-H)
    const num = getRandomInt(7, 15);
    const den = getRandomInt(20, 30);

    // Correct answer: H = 100 + (den/num)(D-T)
    const correctAnswer = `\\frac{${den}}{${num}}(D-T)+100`;

    // Create distractors with common errors
    const distractorB = `\\frac{${den}}{${num}}(D-T)-100`; // Sign error on 100
    const distractorC = `\\frac{${den}}{${num}}(D+T)+100`; // Wrong sign on T
    const distractorD = `\\frac{${den}}{${num}}(D+T)-100`; // Both errors

    const optionsData = [
      { text: `$${correctAnswer}$`, isCorrect: true },
      { text: `$${distractorB}$`, isCorrect: false, reason: "has a sign error when isolating the term with H" },
      { text: `$${distractorC}$`, isCorrect: false, reason: "incorrectly changes the sign between D and T" },
      { text: `$${distractorD}$`, isCorrect: false, reason: "makes multiple sign errors" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `The dew point D, in degrees Fahrenheit, is given by the equation $D=T-\\frac{${num}}{${den}}(100-H)$, where T is the temperature and H is the relative humidity. Which equation correctly expresses H in terms of D and T?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctAnswer}$`,
      explanation: `Choice ${correctLetter} is correct. Subtracting $T$: $D-T=-\\frac{${num}}{${den}}(100-H)$. Multiplying by $-\\frac{${den}}{${num}}$: $-\\frac{${den}}{${num}}(D-T)=100-H$. Rearranging: $H=100+\\frac{${den}}{${num}}(D-T)$.`
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
