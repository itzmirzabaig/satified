import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1280
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [actual area derived from a clean model area and scale]
 * - Difficulty factors: [Area scaling by the SQUARE of the linear scale factor]
 * - Distractor patterns: [linear-scaling error, half-square error, unsquared model]
 * - Constraints: [answer-first construction => integer actualArea and clean modelArea]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1280 = {
  metadata: {
    id: "1280",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Answer-first construction so every value is a clean integer:
    // choose the model area and the scale denominator, then define the actual
    // area as modelArea * denom^2. Because area scales by (1/denom)^2, the model
    // area is exactly actualArea / denom^2.
    const scaleDenominator = getRandomInt(3, 12);           // linear scale = 1/denom
    const modelArea = getRandomInt(4, 20);                  // clean integer answer
    const actualArea = modelArea * scaleDenominator * scaleDenominator; // integer

    // Distractors (all integers, all real misconceptions):
    //   d1: linear scaling error  -> divide by denom once  = modelArea * denom
    //   d2: half of the linear error (common "divide by 2d") = modelArea * denom / 2 rounded
    //   d3: unsquared over-scale  -> multiply model by denom = actualArea / denom (same as d1)
    // d1 and d3 coincide, so instead use three genuinely distinct wrong values.
    const dLinear = actualArea / scaleDenominator;          // = modelArea * denom (integer)
    const dDoubleModel = modelArea * 2;                     // forgot area entirely, doubled
    const dQuarterActual = Math.round(actualArea / 4);      // arbitrary quartering

    // Guarantee the four displayed numbers are pairwise distinct. If any
    // distractor collides with the answer or another distractor, bump it to a
    // fresh, unused integer.
    const used = new Set<number>([modelArea]);
    const distractorReasons: [number, string][] = [
      [dLinear, "applies the linear scale factor $\\frac{1}{" + scaleDenominator + "}$ to the area instead of its square"],
      [dDoubleModel, "doubles the model area rather than accounting for the two-dimensional scaling"],
      [dQuarterActual, "results from an unrelated arithmetic shortcut rather than squaring the scale factor"],
    ];
    const distractors: { value: number; reason: string }[] = [];
    for (const [initial, reason] of distractorReasons) {
      let v = initial;
      let tries = 0;
      while (used.has(v) && tries++ < 50) {
        v = v + getRandomInt(1, 5);
      }
      used.add(v);
      distractors.push({ value: v, reason });
    }

    const correctText = modelArea.toString();

    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      ...distractors.map(d => ({ text: d.value.toString(), isCorrect: false, reason: d.reason })),
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The floor of a ballroom has an area of ${actualArea} square meters. An architect creates a scale model of the floor of the ballroom, where the length of each side of the model is $\\frac{1}{${scaleDenominator}}$ times the length of the corresponding side of the actual floor of the ballroom. What is the area, in square meters, of the scale model?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. When every linear dimension is scaled by a factor of $\\frac{1}{${scaleDenominator}}$, area scales by the square of that factor: $\\left(\\frac{1}{${scaleDenominator}}\\right)^2 = \\frac{1}{${scaleDenominator * scaleDenominator}}$. Therefore the model area is $\\frac{${actualArea}}{${scaleDenominator * scaleDenominator}} = ${modelArea}$ square meters. Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};
