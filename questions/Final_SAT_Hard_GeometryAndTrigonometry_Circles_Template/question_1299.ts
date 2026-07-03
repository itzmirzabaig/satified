import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1299
 * Skill: Circles (tangent line perpendicular to radius)
 * Difficulty: Hard
 *
 * ORIGINAL ANALYSIS:
 * - Difficulty factors: perpendicular slopes, negative reciprocals
 * - Distractor patterns: sign errors, using the radius slope directly,
 *   reciprocal without the negative sign
 * - Constraints: tangent perpendicular to radius
 * - Question type: conceptual, multiple choice
 * - Figure generation: none
 *
 * REBUILD NOTES:
 * The prior version produced duplicate options (radius slope, its reciprocal
 * and the correct slope collided whenever dx == dy) and a letter mismatch in a
 * dead fallback branch. Rebuilt with an answer-first construction: the offset
 * from the center to the point of tangency is (sx*a, sy*1) with a in {2,3,4}.
 * That forces the radius slope to be s/a and the tangent slope (negative
 * reciprocal) to be the integer -s*a, and makes all four options provably
 * distinct for every draw, so no retry guard is needed.
 */
export const generator_1299 = {
  metadata: {
    id: "1299",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: center
    const h = getRandomInt(-8, -2);
    const k = getRandomInt(-8, -2);

    // STEP 2: offset from center to the point of tangency.
    // Magnitude a in {2,3,4} along x, magnitude 1 along y, with random signs.
    const a = getRandomElement([2, 3, 4]);
    const sx = getRandomElement([1, -1]);
    const sy = getRandomElement([1, -1]);
    const ox = sx * a;   // = x1 - h
    const oy = sy * 1;   // = y1 - k
    const s = sx * sy;   // sign of the radius slope (s/a)

    const x1 = h + ox;
    const y1 = k + oy;

    // STEP 3: slopes.
    // Radius slope = oy/ox = s/a. Tangent slope = -ox/oy = -s*a (an integer).
    const tangentSlope = -s * a;

    // ----- display helpers -----
    const intTex = (v: number) => `$${v}$`;                       // e.g. $-3$
    const fracTex = (sign: number, num: number, den: number) =>   // e.g. $-\frac{1}{3}$
      `$${sign < 0 ? '-' : ''}\\frac{${num}}{${den}}$`;

    const correctText = intTex(tangentSlope);        // -s*a   (correct)
    const radiusSlopeOpt = fracTex(s, 1, a);         // s/a    (used radius slope)
    const reciprocalOpt = intTex(s * a);             // +s*a   (forgot the negative)
    const negRadiusOpt = fracTex(-s, 1, a);          // -s/a   (negated radius slope)

    // STEP 4: options (all four values are distinct for every a, s).
    const optionsData = [
      { text: correctText, isCorrect: true, role: 'correct' as const },
      { text: radiusSlopeOpt, isCorrect: false, role: 'radius' as const },
      { text: reciprocalOpt, isCorrect: false, role: 'reciprocal' as const },
      { text: negRadiusOpt, isCorrect: false, role: 'negRadius' as const }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const letterOf = (role: string) => shuffledOptions.find(o => o.role === role)!.letter;
    const correctLetter = letterOf('correct');
    const radiusLetter = letterOf('radius');
    const reciprocalLetter = letterOf('reciprocal');
    const negRadiusLetter = letterOf('negRadius');

    // ----- explanation math (computed from the same live values) -----
    // Radius slope from the difference quotient, keeping signs explicit.
    const kTex = k < 0 ? `(${k})` : `${k}`;
    const hTex = h < 0 ? `(${h})` : `${h}`;
    const diffQuotient = `\\frac{${y1} - ${kTex}}{${x1} - ${hTex}}`;
    const rawFrac = `\\frac{${oy}}{${ox}}`;
    const radiusFracSimplified = `${s < 0 ? '-' : ''}\\frac{1}{${a}}`;

    return {
      questionText: `A circle in the $xy$-plane has its center at $(${h}, ${k})$. Line $k$ is tangent to this circle at the point $(${x1}, ${y1})$. What is the slope of line $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The radius drawn to the point of tangency has slope $m_r = ${diffQuotient} = ${rawFrac} = ${radiusFracSimplified}$. A tangent line is perpendicular to the radius at the point of tangency, so line $k$ has the negative reciprocal slope, $m_k = ${tangentSlope}$. Choice ${radiusLetter} is incorrect; it is the slope of the radius itself, not its negative reciprocal. Choice ${reciprocalLetter} is incorrect; it is the reciprocal of the radius slope but keeps the wrong sign. Choice ${negRadiusLetter} is incorrect; it only negates the radius slope instead of taking the negative reciprocal.`
    };
  }
};
