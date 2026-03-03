import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
 * Question ID: f2495de4
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle numerator: 565 (triple-digit), denominator: 6 (single-digit), coefficient: 565/6 = 94 remainder 1]
 * - Difficulty factors: [Trigonometric angle reduction, coterminal angles, reference angles, unit circle values]
 * - Distractor patterns: [A: 1/2 (wrong reference angle, cos(π/3)), B: 1 (cos(0), didn't reduce), C: √3/2 (correct, cos(π/6)), D: √3 (confused with tan)]
 * - Constraints: [Must result in standard unit circle angle after reduction, coefficient must be large enough to require multiple full rotations]
 * - Question type: [Conceptual (no figure)→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f2495de4 = {
  metadata: {
    // id: "f2495de4",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters for angle reduction
    const standardAngles = [
      { num: 1, den: 6, cos: "\\frac{\\sqrt{3}}{2}" },
      { num: 1, den: 4, cos: "\\frac{\\sqrt{2}}{2}" },
      { num: 1, den: 3, cos: "\\frac{1}{2}" },
      { num: 1, den: 2, cos: "0" },
      { num: 2, den: 3, cos: "-\\frac{1}{2}" },
      { num: 3, den: 4, cos: "-\\frac{\\sqrt{2}}{2}" },
      { num: 5, den: 6, cos: "-\\frac{\\sqrt{3}}{2}" }
    ];

    const targetAngle = getRandomElement(standardAngles);
    const denominator = targetAngle.den;
    const fullRotations = getRandomInt(47, 95);
    const numerator = fullRotations * denominator * 2 + targetAngle.num;

    // STEP 2: Determine correct answer and distractors
    const correctCos = targetAngle.cos;
    const distractors = [
      targetAngle.num === 1 && targetAngle.den === 6 ? "\\frac{1}{2}" : "\\frac{\\sqrt{3}}{2}",
      "1",
      targetAngle.num === 1 && targetAngle.den === 6 ? "\\sqrt{3}" : targetAngle.num === 1 && targetAngle.den === 3 ? "\\frac{\\sqrt{3}}{3}" : "\\sqrt{3}"
    ];

    // STEP 3: Create options with tracking
    const optionsData = [
      { text: `\\(${correctCos}\\)`, isCorrect: true },
      { text: `\\(${distractors}\\)`, isCorrect: false, reason: "confuses with wrong reference angle" },
      { text: `\\(${distractors}\\)`, isCorrect: false, reason: "fails to reduce angle, uses cos(0)" },
      { text: `\\(${distractors}\\)`, isCorrect: false, reason: "confuses cosine with tangent" }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 5: Build explanation
    const explanation = `Choice ${correctLetter} is correct. To evaluate $\\cos \\frac{${numerator}\\pi}{${denominator}}$, simplify the angle by finding a coterminal angle within $[0, 2\\pi)$. Dividing ${numerator} by ${denominator}: $\\frac{${numerator}}{${denominator}} = ${fullRotations * 2}\\pi + \\frac{${targetAngle.num}\\pi}{${targetAngle.den}}$. Since ${fullRotations * 2}π represents ${fullRotations} full rotations, the angle is coterminal with $\\frac{${targetAngle.num}\\pi}{${targetAngle.den}}$. Therefore, $\\cos \\frac{${numerator}\\pi}{${denominator}} = \\cos \\frac{${targetAngle.num}\\pi}{${targetAngle.den}} = ${correctCos}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 6: Return question data
    return {
      questionText: `What is the value of $\\cos \\frac{${numerator}\\pi}{${denominator}}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `\\(${correctCos}\\)`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 23c5fcce
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [circumference: 36 (double-digit), arc angle: 90° (perpendicular radii)]
 * - Difficulty factors: [Circle geometry, arc length formula, central angles, proportion reasoning]
 * - Distractor patterns: [A: 9 (correct, 90/360 × 36), B: 12 (120°/360°, wrong angle), C: 18 (180°/360°, semicircle), D: 36 (360°/360°, full circumference)]
 * - Constraints: [Central angle must be clean divisor of 360 for clean arc length, circumference must be divisible by (360/angle)]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Circle with perpendicular radii, center O, points A and C on axes]
 */
