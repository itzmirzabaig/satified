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
    //
    // Each wrong choice names the value it actually is: the sine or tangent of
    // the angle, the cosine of a different standard angle, or the cosine of the
    // reference angle with the sign dropped. The old reasons said only "wrong
    // reference angle", even for the sine.
    // fr(1, 6) is the TeX for pi/6 (not "1pi/6").
    const fr = (n: number, d: number) => `\\frac{${n === 1 ? '' : n}\\pi}{${d}}`;
    const is = (fn: string, n: number, d: number) => (an: number, ad: number) =>
      `it is $\\${fn} ${fr(n, d)}$, not $\\cos ${fr(an, ad)}$`;
    const sign = (rn: number, rd: number) => (an: number, ad: number) =>
      `it is the cosine of the reference angle, $\\cos ${fr(rn, rd)}$; since $${fr(an, ad)}$ is in the second quadrant, its cosine is negative`;
    const standardAngles = [
      {
        num: 1, den: 6, cos: "\\frac{\\sqrt{3}}{2}",
        distractors: [
          { text: "\\frac{1}{2}", why: is('sin', 1, 6) },
          { text: "\\frac{\\sqrt{2}}{2}", why: is('cos', 1, 4) },
          { text: "\\frac{\\sqrt{3}}{3}", why: is('tan', 1, 6) }
        ]
      },
      {
        num: 1, den: 4, cos: "\\frac{\\sqrt{2}}{2}",
        distractors: [
          { text: "\\frac{\\sqrt{3}}{2}", why: is('cos', 1, 6) },
          { text: "\\frac{1}{2}", why: is('cos', 1, 3) },
          { text: "1", why: is('tan', 1, 4) }
        ]
      },
      {
        num: 1, den: 3, cos: "\\frac{1}{2}",
        distractors: [
          { text: "\\frac{\\sqrt{3}}{2}", why: is('sin', 1, 3) },
          { text: "\\frac{\\sqrt{2}}{2}", why: is('cos', 1, 4) },
          { text: "\\sqrt{3}", why: is('tan', 1, 3) }
        ]
      },
      {
        num: 1, den: 2, cos: "0",
        distractors: [
          { text: "1", why: is('sin', 1, 2) },
          { text: "\\frac{\\sqrt{3}}{2}", why: is('cos', 1, 6) },
          { text: "\\frac{1}{2}", why: is('cos', 1, 3) }
        ]
      },
      {
        num: 2, den: 3, cos: "-\\frac{1}{2}",
        distractors: [
          { text: "\\frac{1}{2}", why: sign(1, 3) },
          { text: "-\\frac{\\sqrt{3}}{2}", why: is('cos', 5, 6) },
          { text: "-\\sqrt{3}", why: is('tan', 2, 3) }
        ]
      },
      {
        num: 3, den: 4, cos: "-\\frac{\\sqrt{2}}{2}",
        distractors: [
          { text: "\\frac{\\sqrt{2}}{2}", why: sign(1, 4) },
          { text: "-\\frac{1}{2}", why: is('cos', 2, 3) },
          { text: "-1", why: is('tan', 3, 4) }
        ]
      },
      {
        num: 5, den: 6, cos: "-\\frac{\\sqrt{3}}{2}",
        distractors: [
          { text: "-\\frac{1}{2}", why: is('cos', 2, 3) },
          { text: "\\frac{\\sqrt{3}}{2}", why: sign(1, 6) },
          { text: "-\\frac{\\sqrt{3}}{3}", why: is('tan', 5, 6) }
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
      { text: `\\(${correctCos}\\)`, isCorrect: true, reason: '' },
      ...targetAngle.distractors.map(d => ({ text: `\\(${d.text}\\)`, isCorrect: false, reason: d.why(targetAngle.num, targetAngle.den) }))
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
    const target = fr(targetAngle.num, targetAngle.den);
    const explanation = `Choice ${correctLetter} is correct. To evaluate $\\cos \\frac{${numerator}\\pi}{${denominator}}$, find an angle between $0$ and $2\\pi$ that is coterminal with it. Since $${numerator} = ${fullRotations * 2}(${denominator}) + ${targetAngle.num}$, the angle can be rewritten as $\\frac{${numerator}\\pi}{${denominator}} = ${fullRotations * 2}\\pi + ${target}$. Since $${fullRotations * 2}\\pi$ is ${fullRotations} full rotations of $2\\pi$, the angle is coterminal with $${target}$. Therefore, $\\cos \\frac{${numerator}\\pi}{${denominator}} = \\cos ${target} = ${correctCos}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

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
