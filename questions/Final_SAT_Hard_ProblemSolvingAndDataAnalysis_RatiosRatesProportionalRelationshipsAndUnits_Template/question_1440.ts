import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1440
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [4a/b = 6.7 (decimal), a/(bn) = 26.8 (decimal)]
 * - Difficulty factors: [Complex fraction manipulation, substitution, solving for variable in denominator]
 * - Distractor patterns: [Fill-in-the-blank - no distractors needed]
 * - Constraints: [Values must align so that a/b from first equation substitutes cleanly into second]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */

export const generator_1440 = {
  metadata: {
    id: "1440",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Model: (k * a / b) = value1  and  a / (b * n) = value2  →  n = value1 / (k * value2).
    //
    // Answer-first construction so every displayed number is clean (<= 1 decimal
    // place) and the solved value of n is an exact integer for every draw:
    //   pick k (integer), n (integer answer), and value2 (nice half-integer).
    //   ratioAB = a/b = value2 * n           (<= 1 decimal, since value2 has <= 1 decimal)
    //   value1  = k * ratioAB                (<= 1 decimal)
    // Then n = value1 / (k * value2) = (k * value2 * n) / (k * value2) = n exactly.
    const k = getRandomInt(2, 6);                 // coefficient on a/b in the first equation
    const n = getRandomInt(2, 9);                 // the answer (kept an exact integer)
    const value2 = getRandomElement([1, 1.5, 2, 2.5, 3, 3.5, 4]); // a/(bn), a nice decimal

    const ratioAB = value2 * n;                   // a/b, at most 1 decimal place
    const value1 = k * ratioAB;                   // (k a)/b, at most 1 decimal place

    // Display helper: trims a trailing ".0" so integers render as integers and
    // half-integers keep their single decimal digit. Never produces >1 decimal.
    const num = (x: number): string =>
      Number.isInteger(x) ? String(x) : x.toFixed(1);

    return {
      questionText: `If $\\frac{${k}a}{b}=${num(value1)}$ and $\\frac{a}{bn}=${num(value2)}$, what is the value of $n$?`,
      figureCode: null,
      options: [],
      correctAnswer: String(n),
      explanation: `The correct answer is ${n}. From $\\frac{${k}a}{b}=${num(value1)}$, divide both sides by ${k} to get $\\frac{a}{b}=${num(ratioAB)}$. Substituting into $\\frac{a}{bn}=${num(value2)}$ gives $\\frac{1}{n}\\cdot\\frac{a}{b}=${num(value2)}$, so $\\frac{${num(ratioAB)}}{n}=${num(value2)}$. Solving for $n$: $n=\\frac{${num(ratioAB)}}{${num(value2)}}=${n}$.`
    };
  }
};
