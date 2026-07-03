import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 695
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 10, -5, constant: -12]
 * - Difficulty factors: [Converting standard form to slope-intercept]
 * - Distractor patterns: [A: sign error, B/C: unrelated fractions, D: correct]
 * - Constraints: [Clean integer slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_695 = {
  metadata: {
    id: "695",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters for a clean integer slope.
    // Equation is aVal*x - bVal*y = C  =>  y = (aVal/bVal)*x - C/bVal.
    // Choosing aVal = slope * bVal guarantees slope = aVal/bVal is an integer.
    const slope = getRandomInt(2, 6);
    const bVal = getRandomInt(2, 6);
    const aVal = slope * bVal;
    const C = getRandomInt(-20, 20);

    // Sign-safe rendering of the constant term inside slope-intercept work.
    // -aVal*x + C  ->  "-aVal x + C" when C >= 0, "-aVal x - |C|" when C < 0.
    const cTerm = C < 0 ? `- ${Math.abs(C)}` : `+ ${C}`;
    // C / bVal shown as -C/bVal in y = mx - (C/bVal); flip sign for display.
    const constFrac = C < 0
      ? `+ \\frac{${Math.abs(C)}}{${bVal}}`
      : `- \\frac{${C}}{${bVal}}`;

    // STEP 2: Build distractors that can never collide with the correct slope.
    // Correct answer is the integer `slope` (>= 2).
    //  - `-slope`  : classic sign error (<= -2, never equals slope).
    //  - one negative and one positive proper fraction in (-1.6, 1.6) minus 0:
    //    |value| <= 8/5 = 1.6 < 2, so neither can equal slope or -slope, and
    //    opposite signs mean they can never equal each other.
    const fracA = getRandomInt(3, 8);
    const fracB = getRandomInt(5, 10);
    const fracC = getRandomInt(3, 8);
    const fracD = getRandomInt(5, 10);

    const optionsData = [
      { text: `$-${slope}$`, isCorrect: false },
      { text: `$-\\frac{${fracA}}{${fracB}}$`, isCorrect: false },
      { text: `$\\frac{${fracC}}{${fracD}}$`, isCorrect: false },
      { text: `$${slope}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `What is the slope of the line with equation $${aVal}x - ${bVal}y = ${C}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The given equation is in standard form $Ax + By = C$ with $A = ${aVal}$ and $B = -${bVal}$. The slope of a line in this form is $m = -\\dfrac{A}{B} = -\\dfrac{${aVal}}{-${bVal}} = ${slope}$. Equivalently, solve for $y$: isolate the $y$-term to get $-${bVal}y = -${aVal}x ${cTerm}$, then divide both sides by $-${bVal}$ to get $y = ${slope}x ${constFrac}$. The coefficient of $x$ is the slope, ${slope}.`
    };
  }
};
