import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 350
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [large angle numerator (triple-digit), single-digit denominator; coefficient chosen so the angle is coterminal with a standard angle]
 * - Difficulty factors: [Trigonometric angle reduction, coterminal angles, reference angles, unit circle values]
 * - Distractor patterns: [wrong reference angle, sign error, cosine/tangent confusion]
 * - Constraints: [Must reduce to a standard unit-circle angle after subtracting full rotations; coefficient large enough to require multiple full rotations]
 * - Question type: [Conceptual (no figure)→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_350 = {
  metadata: {
    id: "350",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // STEP 1: Standard first/second-quadrant angles on [0, pi]. Each carries its
    // correct cosine plus three plausible distractors (wrong reference angle,
    // sign error, or cosine/tangent confusion). Within each entry all four
    // values (correct + 3 distractors) are distinct strings by construction, so
    // no option can ever collide for any draw.
    const standardAngles = [
      {
        num: 1, den: 6, cos: "\\frac{\\sqrt{3}}{2}",
        distractors: [
          { text: "\\frac{1}{2}", reason: "uses the cosine of the wrong reference angle" },
          { text: "\\frac{\\sqrt{2}}{2}", reason: "uses the cosine of the wrong reference angle" },
          { text: "\\frac{\\sqrt{3}}{3}", reason: "reports the tangent instead of the cosine" }
        ]
      },
      {
        num: 1, den: 4, cos: "\\frac{\\sqrt{2}}{2}",
        distractors: [
          { text: "\\frac{\\sqrt{3}}{2}", reason: "uses the cosine of the wrong reference angle" },
          { text: "\\frac{1}{2}", reason: "uses the cosine of the wrong reference angle" },
          { text: "1", reason: "reports the tangent instead of the cosine" }
        ]
      },
      {
        num: 1, den: 3, cos: "\\frac{1}{2}",
        distractors: [
          { text: "\\frac{\\sqrt{3}}{2}", reason: "uses the cosine of the wrong reference angle" },
          { text: "\\frac{\\sqrt{2}}{2}", reason: "uses the cosine of the wrong reference angle" },
          { text: "\\sqrt{3}", reason: "reports the tangent instead of the cosine" }
        ]
      },
      {
        num: 1, den: 2, cos: "0",
        distractors: [
          { text: "1", reason: "fails to reduce the angle and uses the cosine of 0" },
          { text: "\\frac{\\sqrt{3}}{2}", reason: "uses the cosine of the wrong reference angle" },
          { text: "\\frac{1}{2}", reason: "uses the cosine of the wrong reference angle" }
        ]
      },
      {
        num: 2, den: 3, cos: "-\\frac{1}{2}",
        distractors: [
          { text: "\\frac{1}{2}", reason: "drops the negative sign for a second-quadrant angle" },
          { text: "-\\frac{\\sqrt{3}}{2}", reason: "uses the cosine of the wrong reference angle" },
          { text: "-\\sqrt{3}", reason: "reports the tangent instead of the cosine" }
        ]
      },
      {
        num: 3, den: 4, cos: "-\\frac{\\sqrt{2}}{2}",
        distractors: [
          { text: "\\frac{\\sqrt{2}}{2}", reason: "drops the negative sign for a second-quadrant angle" },
          { text: "-\\frac{1}{2}", reason: "uses the cosine of the wrong reference angle" },
          { text: "-1", reason: "reports the tangent instead of the cosine" }
        ]
      },
      {
        num: 5, den: 6, cos: "-\\frac{\\sqrt{3}}{2}",
        distractors: [
          { text: "-\\frac{1}{2}", reason: "uses the cosine of the wrong reference angle" },
          { text: "\\frac{\\sqrt{3}}{2}", reason: "drops the negative sign for a second-quadrant angle" },
          { text: "-\\frac{\\sqrt{3}}{3}", reason: "reports the tangent instead of the cosine" }
        ]
      }
    ];

    const targetAngle = getRandomElement(standardAngles);
    const denominator = targetAngle.den;
    // Multiple full rotations so the numerator is a large (triple-digit) value.
    const fullRotations = getRandomInt(47, 95);
    const numerator = fullRotations * denominator * 2 + targetAngle.num;

    // STEP 2: Correct answer and distractors (all distinct within this angle).
    const correctCos = targetAngle.cos;

    // STEP 3: Create options with tracking. Options render math via \( ... \).
    const optionsData = [
      { text: `\\(${correctCos}\\)`, isCorrect: true },
      { text: `\\(${targetAngle.distractors[0].text}\\)`, isCorrect: false, reason: targetAngle.distractors[0].reason },
      { text: `\\(${targetAngle.distractors[1].text}\\)`, isCorrect: false, reason: targetAngle.distractors[1].reason },
      { text: `\\(${targetAngle.distractors[2].text}\\)`, isCorrect: false, reason: targetAngle.distractors[2].reason }
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 5: Build explanation with dynamic letters computed from live values.
    const explanation = `Choice ${correctLetter} is correct. To evaluate $\\cos \\frac{${numerator}\\pi}{${denominator}}$, simplify the angle by finding a coterminal angle within $[0, 2\\pi)$. Rewriting the angle, $\\frac{${numerator}\\pi}{${denominator}} = ${fullRotations * 2}\\pi + \\frac{${targetAngle.num}\\pi}{${targetAngle.den}}$. That whole-rotation term represents ${fullRotations} full rotations, so the angle is coterminal with $\\frac{${targetAngle.num}\\pi}{${targetAngle.den}}$. Therefore, $\\cos \\frac{${numerator}\\pi}{${denominator}} = \\cos \\frac{${targetAngle.num}\\pi}{${targetAngle.den}} = ${correctCos}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 6: Return question data.
    return {
      questionText: `What is the value of $\\cos \\frac{${numerator}\\pi}{${denominator}}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `\\(${correctCos}\\)`,
      explanation: explanation
    };
  }
};
