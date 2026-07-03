import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 576
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [K = 0.5mv², m=4, K=18, v=3]
 * - Difficulty factors: [Kinetic energy formula, solving for velocity]
 * - Distractor patterns: [K/m (forgot the 2 and the root), v² (forgot the root), 2K = mv²]
 * - Constraints: [v = sqrt(2K/m); v and m drawn EVEN so K, m/2, v²/2 and 2K/m
 *   are all exact integers — no float artifacts, no floor() corrections]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - formula application]
 */

export const generator_576 = {
  metadata: {
    id: "576",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values.
    // v even (4, 6, or 8) keeps v²/2 an integer; m even (2, 4, 6, or 8) keeps
    // K = m·v²/2 an integer, so 2K/m === v² exactly for every draw.
    const v = 2 * getRandomInt(2, 4); // speed: 4, 6, or 8 m/s
    const m = 2 * getRandomInt(1, 4); // mass: 2, 4, 6, or 8 kg
    const K = (m * v * v) / 2;        // kinetic energy, exact integer

    // STEP 2: Build question text
    const questionText = `An object's kinetic energy, in joules, is equal to the product of one-half the object's mass, in kilograms, and the square of the object's speed, in meters per second. What is the speed, in meters per second, of an object with a mass of ${m} kilograms and a kinetic energy of ${K} joules?`;

    // STEP 3: Create options with tracking.
    // Collision-free by construction for v >= 4 and m >= 2:
    //   v < v²/2 < v² < m·v² = 2K, so all four values are always distinct.
    const optionsData = [
      { text: `${v}`, isCorrect: true, reason: "" },
      { text: `${(v * v) / 2}`, isCorrect: false, reason: `this is $\\frac{K}{m} = ${(v * v) / 2}$, the result of dividing by the mass without first multiplying by 2 and without taking the square root` },
      { text: `${v * v}`, isCorrect: false, reason: `this is $v^2 = ${v * v}$; the square root was not taken` },
      { text: `${2 * K}`, isCorrect: false, reason: `this is $mv^2 = ${2 * K}$, which is twice the kinetic energy, not the speed` }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${v}`;

    // STEP 5: Build explanation with dynamic letters and live values
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Kinetic energy is given by $K = \\frac{1}{2}mv^2$, where $m$ is the mass in kilograms and $v$ is the speed in meters per second. Substituting $K = ${K}$ and $m = ${m}$ gives $\\frac{1}{2}(${m})v^2 = ${K}$. Multiplying both sides by 2 and dividing by ${m} gives $v^2 = \\frac{2(${K})}{${m}} = ${v * v}$. Taking the positive square root gives $v = ${v}$ meters per second. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    // STEP 6: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
