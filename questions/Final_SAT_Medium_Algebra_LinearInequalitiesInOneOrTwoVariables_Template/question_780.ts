import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 780
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [formula: H=120p+60, p range: 0.5-0.85]
 * - Difficulty factors: [Formula evaluation with range, heart rate calculation]
 * - Distractor patterns: [B=wrong p range, C=partial range, D=wrong range]
 * - Constraints: [H(0.5) = 120, H(0.85) = 162]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_780 = {
  metadata: {
    id: "780",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Karvonen-style linear model: H = m*p + b, increasing in p.
    // Work in integer tenths for p so every H value is an exact integer
    // (multiplier is a multiple of 10, so multiplier * (k/10) is an integer).
    const tens = getRandomInt(10, 15);      // 10..15
    const multiplier = tens * 10;           // 100..150 (matches original 120)
    const perTenth = tens;                  // multiplier / 10, integer
    const baseRate = getRandomInt(50, 80);  // 60 in original

    // p range in integer tenths: minP10 in [4,6], span in [2,3], maxP10 <= 9.
    const minP10 = getRandomInt(4, 6);              // 0.4..0.6
    const span10 = getRandomInt(2, 3);              // 0.2..0.3
    const maxP10 = minP10 + span10;                 // <= 0.9

    const minPStr = (minP10 / 10).toFixed(1);
    const maxPStr = (maxP10 / 10).toFixed(1);

    // Correct H range (integer arithmetic).
    const minH = perTenth * minP10 + baseRate;
    const maxH = perTenth * maxP10 + baseRate;

    // Distractor lower p-endpoints (all in integer tenths), each producing a
    // range that differs from the correct one. We build candidates then dedupe.
    // B: shifted-down window [minP10-2, minP10] (a lower intensity band).
    const bLow10 = Math.max(0, minP10 - 2);
    const bHigh10 = minP10;
    const bLow = perTenth * bLow10 + baseRate;
    const bHigh = perTenth * bHigh10 + baseRate;

    // C: full band from resting (p=0) up to maxP.
    const cLow = baseRate;              // p = 0
    const cHigh = maxH;

    // D: resting up to just the lower endpoint (p=0 .. minP).
    const dLow = baseRate;              // p = 0
    const dHigh = minH;

    const fmt = (lo: number, hi: number) => `$${lo} \\le H \\le ${hi}$`;

    const correctText = fmt(minH, maxH);
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: fmt(bLow, bHigh), isCorrect: false },
      { text: fmt(cLow, cHigh), isCorrect: false },
      { text: fmt(dLow, dHigh), isCorrect: false }
    ];

    // Guard: if any distractor collides with another option, nudge its lower
    // endpoint to a distinct resting offset so all four strings are unique.
    const seen = new Set<string>();
    let bumped = 0;
    for (const opt of optionsData) {
      let t = opt.text;
      let guard = 0;
      while (seen.has(t) && guard++ < 50) {
        // Shift this incorrect option's lower bound down by one perTenth step.
        bumped += 1;
        const lo = baseRate - perTenth * bumped;
        const hi = opt === optionsData[1] ? bHigh
                 : opt === optionsData[2] ? cHigh
                 : dHigh;
        t = fmt(lo, hi);
      }
      seen.add(t);
      opt.text = t;
    }

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The target heart rate $H$ increases with the intensity $p$, so its smallest value occurs at $p=${minPStr}$ and its largest at $p=${maxPStr}$. At $p=${minPStr}$, $H=${multiplier}(${minPStr})+${baseRate}=${minH}$. At $p=${maxPStr}$, $H=${multiplier}(${maxPStr})+${baseRate}=${maxH}$. Therefore the target training heart rate satisfies ${correctText}. Choice ${incorrectOptions[0].letter} is incorrect; it uses the wrong interval of intensity values. Choice ${incorrectOptions[1].letter} is incorrect; it uses the wrong interval of intensity values. Choice ${incorrectOptions[2].letter} is incorrect; it uses the wrong interval of intensity values.`;

    return {
      questionText: `The Karvonen formula $H=${multiplier}p+${baseRate}$ models the relationship between a runner's target heart rate $H$, in beats per minute, and the intensity level $p$ of an activity, where an intensity of $p=0$ corresponds to the resting heart rate and $p=1$ corresponds to the maximum heart rate. For training, it is recommended that the intensity level stay between $${minPStr}$ and $${maxPStr}$. Which inequality describes the runner's target training heart rate $H$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
