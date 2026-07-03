import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 862
 *
 * ORIGINAL ANALYSIS:
 * - Intent: convert a whole-degree angle to its radian measure (a Circles skill).
 * - Question type: Text -> Multiple Choice Text.
 * - Figure generation: None.
 *
 * REPAIR NOTES:
 * - Old distractors were built as degrees/2 and min(degrees*2, 180). For 45/135
 *   this produced non-integer degrees fed through a gcd() that assumes integers
 *   (float artifacts), and for 90/120/135/150 the "double" distractor clamped to
 *   180 and collided with the hardcoded pi distractor -> DUP_OPTIONS.
 * - Rebuilt distractors from a fixed pool of standard radian measures with the
 *   correct answer removed, then shuffled, guaranteeing 4 distinct options with a
 *   unique correct one for every draw. All answers are exact reduced fractions of
 *   pi, so there are no float artifacts.
 */

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

// Render a whole-degree angle as a reduced radian fraction in LaTeX (no $ wrapper).
const toRadianTex = (deg: number): string => {
  const g = gcd(deg, 180);
  const num = deg / g;
  const den = 180 / g;
  if (den === 1) return num === 1 ? `\\pi` : `${num}\\pi`;
  return num === 1 ? `\\frac{\\pi}{${den}}` : `\\frac{${num}\\pi}{${den}}`;
};

export const generator_862 = {
  metadata: {
    id: "862",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Pick a whole-degree angle that has a clean radian measure.
    const cleanAngles = [30, 45, 60, 90, 120, 135, 150];
    const degrees = getRandomElement(cleanAngles);

    // STEP 2: Correct answer in radians (exact reduced fraction of pi).
    const correctTex = toRadianTex(degrees);

    // STEP 3: Distractors from a pool of standard radian measures, each tagged
    // with the degree measure it represents. Remove the correct angle (and any
    // pool entry that reduces to the same radian string), shuffle, take three.
    // This guarantees four pairwise-distinct options with a unique correct one.
    const pool = [30, 45, 60, 90, 120, 135, 150, 180]
      .filter(deg => deg !== degrees)
      .map(deg => ({ deg, tex: toRadianTex(deg) }))
      .filter(p => p.tex !== correctTex);
    const chosenDistractors = shuffle(pool).slice(0, 3);

    const optionsData = [
      { text: `$${correctTex}$`, isCorrect: true, deg: degrees },
      ...chosenDistractors.map(d => ({ text: `$${d.tex}$`, isCorrect: false, deg: d.deg }))
    ];

    // STEP 4: Shuffle and assign letters (letters known only after shuffling).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const reasonFor = (deg: number): string =>
      `this is the radian measure of ${deg} degrees, not ${degrees} degrees`;

    return {
      questionText: `The measure of angle $Z$ is ${degrees} degrees. What is the measure, in radians, of angle $Z$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To convert a degree measure to radians, multiply by $\\frac{\\pi}{180}$. Here $\\frac{${degrees}\\pi}{180} = ${correctTex}$. Choice ${incorrectOptions[0].letter} is incorrect because ${reasonFor(incorrectOptions[0].deg)}. Choice ${incorrectOptions[1].letter} is incorrect because ${reasonFor(incorrectOptions[1].deg)}. Choice ${incorrectOptions[2].letter} is incorrect because ${reasonFor(incorrectOptions[2].deg)}.`
    };
  }
};
