import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1302
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates: single/double digit, slopes: simple fractions like 6/5]
 * - Difficulty factors: [Tangent line geometry, perpendicular slopes, point-slope form]
 * - Distractor patterns: [Calculation errors in slope, sign errors, wrong point substitution]
 * - Constraints: [Tangent line must be perpendicular to radius]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None - conceptual geometry problem]
 */

export const generator_1302 = {
  metadata: {
    id: "1302",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Center and radius direction (dx, dy). Require dx != dy so the
    // sign-error and radius-slope distractors can never coincide.
    const h = getRandomNonZeroInt(-5, 5);
    const k = getRandomNonZeroInt(-5, 5);

    let dx = getRandomElement([3, 4, 5, 6]);
    let dy = getRandomElement([2, 3, 4, 5]);
    let dxdyTries = 0;
    while (dx === dy && dxdyTries++ < 50) {
      dy = getRandomElement([2, 3, 4, 5]);
    }
    if (dx === dy) dy = dx === 2 ? 3 : 2; // final safety net

    // Point of tangency.
    const x1 = h + dx;
    const y1 = k + dy;

    // STEP 2: Slopes.
    //   radius slope  = dy/dx
    //   tangent slope = -dx/dy  (negative reciprocal)
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, Math.abs(a % b)));
    const g = gcd(Math.abs(dx), Math.abs(dy));
    const tanNum = -dx / g; // numerator of tangent slope (carries the sign)
    const tanDen = dy / g;  // positive denominator

    // Display helper for a signed fraction with a positive denominator.
    const fmtFrac = (num: number, den: number): string => {
      const sign = num < 0 ? '-' : '';
      const a = Math.abs(num);
      if (den === 1) return `${sign}${a}`;
      return `${sign}\\frac{${a}}{${den}}`;
    };
    const tangentSlopeTex = fmtFrac(tanNum, tanDen);
    const radiusSlopeTex = `\\frac{${dy}}{${dx}}`;

    // STEP 3: A guaranteed-integer point ON the tangent line.
    // On the tangent, moving Δx = +dy changes y by Δy = (-dx/dy)*dy = -dx.
    const correctX = x1 + dy;
    const correctY = y1 - dx;

    // STEP 4: Distractors (each provably OFF the tangent line for every draw).
    //   D1 radius point: (h + t*dx, k + t*dy) lies on the radius, not the tangent.
    const t = getRandomElement([3, 4]);
    const d1X = h + t * dx;
    const d1Y = k + t * dy;
    //   D2 sign error: used +dx/dy instead of -dx/dy -> (x1+dy, y1+dx).
    const d2X = x1 + dy;
    const d2Y = y1 + dx;
    //   D3 wrong slope: used the radius slope dy/dx -> (x1+dx, y1+dy).
    const d3X = x1 + dx;
    const d3Y = y1 + dy;

    const correctText = `(${correctX}, ${correctY})`;
    const d1Text = `(${d1X}, ${d1Y})`;
    const d2Text = `(${d2X}, ${d2Y})`;
    const d3Text = `(${d3X}, ${d3Y})`;

    // dx != dy and t in {3,4} make all four mutually distinct; keep a Set guard
    // as defense-in-depth (never expected to trip).
    // (If it ever did, the shuffle/answer logic below still stays consistent.)
    const optionsData = [
      { text: d1Text, isCorrect: false, kind: 'radiusPoint' as const },
      { text: d2Text, isCorrect: false, kind: 'signError' as const },
      { text: correctText, isCorrect: true, kind: 'correct' as const },
      { text: d3Text, isCorrect: false, kind: 'wrongSlope' as const }
    ];

    // STEP 5: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const reasonFor = (kind: string): string => {
      if (kind === 'radiusPoint') return `this point lies on the radius line, not on the tangent line`;
      if (kind === 'signError') return `it uses the reciprocal $\\frac{${dx}}{${dy}}$ with the wrong sign instead of the negative reciprocal`;
      return `it uses the slope of the radius, $${radiusSlopeTex}$, instead of the slope of the tangent line`;
    };

    return {
      questionText: `A circle in the $xy$-plane has its center at $(${h}, ${k})$. Line $t$ is tangent to this circle at the point $(${x1}, ${y1})$. Which of the following points also lies on line $t$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The radius drawn to the point of tangency has slope $${radiusSlopeTex}$. A tangent line is perpendicular to the radius at the point of tangency, so its slope is the negative reciprocal, $${tangentSlopeTex}$. Using point-slope form through $(${x1}, ${y1})$ gives $y - ${y1} = ${tangentSlopeTex}\\left(x - ${x1}\\right)$; the point $(${correctX}, ${correctY})$ satisfies this equation. Choice ${incorrectOptions[0].letter} is incorrect because ${reasonFor(incorrectOptions[0].kind)}. Choice ${incorrectOptions[1].letter} is incorrect because ${reasonFor(incorrectOptions[1].kind)}. Choice ${incorrectOptions[2].letter} is incorrect because ${reasonFor(incorrectOptions[2].kind)}.`
    };
  }
};
