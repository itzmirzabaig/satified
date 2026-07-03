import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 842
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: 2 (single-digit)]
 * - Difficulty factors: [Area equivalence, square root of π expression]
 * - Distractor patterns: [A: radius value, B: √(2π) wrong area, D: 2π (circumference confusion)]
 * - Constraints: [Circle area must be perfect square × π for clean radical answer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_842 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const radius = getRandomInt(2, 5);

    // STEP 2: Derived values. Circle area = pi*r^2. A square with the same area
    // has side s where s^2 = pi*r^2, so s = r*sqrt(pi). Since r is an integer in
    // [2,5], the correct side is r*sqrt(pi) — a clean radical.
    const circleAreaCoeff = radius * radius; // r^2

    // Option texts are raw LaTeX (the study renderer auto-wraps them in math).
    const correctText = `${radius}\\sqrt{\\pi}`;

    // STEP 3: Distractors, each carrying its own reason so the explanation
    // stays correct regardless of shuffle order.
    // A: uses the radius itself as the side.
    // B: sqrt(2*pi) — the side you get only if the area were 2*pi (constant).
    // D: r*pi — a circumference-style expression, not a side length.
    // These are all distinct from the correct answer and from each other for
    // every radius in [2,5]: the correct answer contains \sqrt while D does not,
    // B is a constant radical, and A is a bare integer.
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      {
        text: radius.toString(),
        isCorrect: false,
        reason: `this is the radius of the circle, not the side of the square`
      },
      {
        text: `\\sqrt{2\\pi}`,
        isCorrect: false,
        reason: `$\\sqrt{2\\pi}$ would be the side only if the area were $2\\pi$, but the area here is $${circleAreaCoeff}\\pi$`
      },
      {
        text: `${radius}\\pi`,
        isCorrect: false,
        reason: `this resembles a circumference expression such as $${radius}\\pi$, not the side length`
      }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const distractorNotes = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} is incorrect; ${o.reason}.`)
      .join(' ');

    // STEP 5: Build explanation from the same live variables.
    const explanation = `Choice ${correctOption.letter} is correct. The area of a circle with radius ${radius} is $\\pi(${radius})^2 = ${circleAreaCoeff}\\pi$. A square with the same area satisfies $s^2 = ${circleAreaCoeff}\\pi$, so $s = ${radius}\\sqrt{\\pi}$. ${distractorNotes}`;

    return {
      questionText: `What is the length of one side of a square that has the same area as a circle with radius $${radius}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
