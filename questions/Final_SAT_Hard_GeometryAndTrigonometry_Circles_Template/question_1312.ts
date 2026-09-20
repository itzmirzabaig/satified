import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1312
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (h in [-6,-2], k in [-2,4]), radius r in [4,8]]
 * - Difficulty factors: [Testing interior vs exterior, distance formula]
 * - Distractor patterns: [Choosing an interior point / the center instead of the exterior point]
 * - Constraints: [A point is NOT in the interior when its distance from the center is >= radius]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [None — SVG circle figure removed per review]
 *
 * FIXED:
 * - Removed the SVG figure entirely: the stem states the full circle
 *   equation, so the question remains fully answerable. This also removed an
 *   answer leak — the old figure drew the exterior point (the correct answer)
 *   in blue with its coordinates labeled.
 * - Correct sign handling for BOTH h and k in the circle equation (k could be
 *   negative, which previously produced "(y--2)").
 * - Guarded the interior point so it can never coincide with the center (or any
 *   other option) via a bounded retry.
 * - Explanation numbers come from the live variables; choice letters come from
 *   the shuffled array.
 */

export const generator_1312 = {
  metadata: {
    id: "1312",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Circle parameters. Center (h, k), radius r.
    const h = getRandomInt(-6, -2);
    const k = getRandomInt(-2, 4);
    const r = getRandomInt(4, 8);

    // STEP 2: Candidate points.
    // The correct answer: clearly OUTSIDE. dx = r + [2..5] >= r + 2, so the
    // distance from the center is always > r regardless of the small dy.
    const outsideX = h + r + getRandomInt(2, 5);
    const outsideY = k + getRandomInt(1, 3);

    // Center itself (interior distractor).
    const centerX = h;
    const centerY = k;

    // A point strictly inside: offsets in [-2,2], so distance <= sqrt(8) < 4 <= r.
    // Guard so it never equals the center (offsets not both 0) and stays distinct.
    let insideX = h;
    let insideY = k;
    let tries = 0;
    while (
      tries++ < 50 &&
      (insideX === centerX && insideY === centerY)
    ) {
      insideX = h + getRandomInt(-2, 2);
      insideY = k + getRandomInt(-2, 2);
    }
    // Fallback (should never trigger): nudge one coordinate.
    if (insideX === centerX && insideY === centerY) insideX = h + 1;

    // A point strictly inside on the horizontal radius: distance = r - 1 < r.
    // With r >= 4 this x (h + r - 1 >= h + 3) can't collide with the inside point
    // (x <= h + 2) or the center.
    const edgeX = h + r - 1;
    const edgeY = k;

    const correctText = `(${outsideX}, ${outsideY})`;

    // STEP 3: Distance for the correct answer (explanation only, approximate).
    const distSq = (outsideX - h) ** 2 + (outsideY - k) ** 2;
    const dist = Math.sqrt(distSq);

    // Sign-aware equation pieces: (x - h)^2 + (y - k)^2 = r^2.
    const xTerm = h >= 0 ? `(x-${h})^{2}` : `(x+${Math.abs(h)})^{2}`;
    const yTerm = k >= 0 ? `(y-${k})^{2}` : `(y+${Math.abs(k)})^{2}`;

    const optionsData = [
      { text: `(${insideX}, ${insideY})`, isCorrect: false },
      { text: `(${centerX}, ${centerY})`, isCorrect: false },
      { text: `(${edgeX}, ${edgeY})`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    // Map each incorrect option to a reason keyed by its text.
    const reasonFor = (text: string): string => {
      if (text === `(${centerX}, ${centerY})`) return 'this is the center of the circle, which lies in the interior';
      return 'this point is inside the circle (its distance from the center is less than the radius)';
    };

    return {
      questionText: `A circle in the $xy$-plane has equation $${xTerm}+${yTerm}=${r * r}$. Which of the following points does NOT lie in the interior of the circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. A point lies in the interior of the circle only when its distance from the center $(${h}, ${k})$ is less than the radius (here the radius is ${r}, since $r^{2}=${r * r}$). For the point $(${outsideX}, ${outsideY})$, the distance from the center is $\\sqrt{(${outsideX}-(${h}))^{2}+(${outsideY}-(${k}))^{2}}=\\sqrt{${distSq}}\\approx ${dist.toFixed(1)} > ${r}$, so this point lies outside the interior. Choice ${incorrectOptions[0].letter} is incorrect; ${reasonFor(incorrectOptions[0].text)}. Choice ${incorrectOptions[1].letter} is incorrect; ${reasonFor(incorrectOptions[1].text)}. Choice ${incorrectOptions[2].letter} is incorrect; ${reasonFor(incorrectOptions[2].text)}.`
    };
  }
};