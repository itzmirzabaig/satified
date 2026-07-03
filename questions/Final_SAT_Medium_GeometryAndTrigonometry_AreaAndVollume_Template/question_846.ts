import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 846
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 8m, radius: 12m]
 * - Difficulty factors: [Cylinder volume, larger numbers]
 * - Distractor patterns: [A: πh, B: π(r+h), C: r×h²]
 * - Constraints: [Numbers should multiply cleanly]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_846 = {
  metadata: {
    id: "846",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Random values. Ranges are DISJOINT (height <= 9 < 10 <= radius)
    // so height !== radius for every draw. This guarantees the distractor
    // r*h^2 can never equal the correct r^2*h (they are equal only when r = h),
    // and keeps all four coefficients pairwise distinct (proof below).
    const height = getRandomInt(6, 9);   // 6..9
    const radius = getRandomInt(10, 15); // 10..15

    // STEP 2: Correct coefficient of pi. V = pi * r^2 * h.
    const volume = radius * radius * height; // 600..2025

    // STEP 3: Distractor coefficients (each a common wrong formula).
    // A = h            : forgot the radius entirely        (6..9)
    // B = r + h        : added r and h instead of the formula (16..24)
    // C = r * h^2      : used r*h^2 instead of r^2*h        (360..1215)
    // Pairwise-distinct over the ranges above:
    //   A<B (r>0); A,B << C (C>=360 > B<=24); A,B << volume (volume>=600);
    //   C vs volume: r*h^2 = r^2*h  <=>  h = r, impossible since h<=9<10<=r.
    const cA = height;
    const cB = radius + height;
    const cC = radius * height * height;

    const correctText = `$${volume}\\pi$`;
    const distractorA = `$${cA}\\pi$`;
    const distractorB = `$${cB}\\pi$`;
    const distractorC = `$${cC}\\pi$`;

    const optionsData = [
      { text: distractorA, isCorrect: false, val: cA },
      { text: distractorB, isCorrect: false, val: cB },
      { text: distractorC, isCorrect: false, val: cC },
      { text: correctText, isCorrect: true, val: volume }
    ];

    // STEP 4: Shuffle and assign letters (letters meaningful only post-shuffle).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrect = shuffledOptions.filter(o => !o.isCorrect);
    const letterOf = (v: number) => incorrect.find(o => o.val === v)!.letter;

    // STEP 5: Explanation — numbers from the same live variables; letters from
    // the shuffle. Each $...$ segment opens with a letter or backslash so no
    // bare "$<digit>" appears.
    const explanation = `Choice ${correctLetter} is correct. The volume of a cylinder is $V = \\pi r^{2} h$. With $r = ${radius}$ and $h = ${height}$, $V = \\pi (${radius})^{2}(${height}) = \\pi \\cdot ${radius * radius} \\cdot ${height} = ${volume}\\pi$ cubic meters. Choice ${letterOf(cA)} is incorrect; it uses only the height, $\\pi h = ${cA}\\pi$, forgetting the radius entirely. Choice ${letterOf(cB)} is incorrect; it adds the radius and height, $\\pi (r + h) = ${cB}\\pi$, instead of using the volume formula. Choice ${letterOf(cC)} is incorrect; it computes $\\pi r h^{2} = ${cC}\\pi$ instead of $\\pi r^{2} h$.`;

    return {
      questionText: `A right circular cylinder has a height of $${height}$ meters (m) and a base with a radius of $${radius}$ m. What is the volume, in cubic meters, of the cylinder?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
