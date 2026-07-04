import { shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1443
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 4.36 square miles, conversion: 1760 yards/mile]
 * - Difficulty factors: [Square unit conversion, large number handling]
 * - Distractor patterns: [linear factor 1760, doubled factor 3520, half squared factor]
 * - Constraints: [Must square 1760 to get 3,097,600 conversion factor]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_1443 = {
  metadata: {
    id: "1443",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate area value (4.36 in original - two-decimal value)
    const areaSquareMiles = parseFloat((Math.random() * 5 + 2).toFixed(2)); // 2.00 to 7.00

    // STEP 2: Conversion. 1 square mile = (1760)² = 3,097,600 square yards.
    const yardsPerMile = 1760;
    const squareYardsPerSquareMile = yardsPerMile * yardsPerMile; // 3,097,600
    const areaSquareYards = Math.round(areaSquareMiles * squareYardsPerSquareMile);

    // STEP 3: Distractors — three distinct conversion misconceptions.
    // NOTE: the previous version used round(area × sqrt(1760²)), which is identical to
    // the linear-factor error because sqrt(1760²) = 1760 exactly, so it always collided
    // and its "square root of conversion factor" reason was attached to a random filler.
    // These three are provably distinct from each other and from the answer for every
    // draw in [2.00, 7.00], and each reason describes exactly the value it labels.
    // A) Linear conversion — multiplies by 1760 instead of 1760² (forgot to square).
    const linearFactorValue = Math.round(areaSquareMiles * yardsPerMile);
    // B) Doubled the conversion factor (×2·1760) instead of squaring it.
    const doubledFactorValue = Math.round(areaSquareMiles * 2 * yardsPerMile);
    // C) Used half of the squared conversion factor (×1760²/2).
    const halfSquaredValue = Math.round(areaSquareMiles * squareYardsPerSquareMile / 2);

    // STEP 4: Build options, carrying each distractor's reason with its value so the
    // justification always matches the number the student would actually compute.
    const optionsData = [
      { value: areaSquareYards, isCorrect: true, reason: "" },
      {
        value: linearFactorValue,
        isCorrect: false,
        reason: `results from multiplying by the linear factor ${yardsPerMile.toLocaleString()} instead of squaring it`
      },
      {
        value: doubledFactorValue,
        isCorrect: false,
        reason: `results from doubling the conversion factor instead of squaring it`
      },
      {
        value: halfSquaredValue,
        isCorrect: false,
        reason: `results from using half of the squared conversion factor`
      }
    ];

    // Safety guard (house style): the four values are constructed to be distinct for
    // every draw, but if any string collision ever appeared, nudge the offending
    // distractor to a nearby distinct value rather than emit a duplicate.
    const seen = new Set<number>([optionsData[0].value]);
    for (let i = 1; i < optionsData.length; i++) {
      let tries = 1;
      while (seen.has(optionsData[i].value) && tries <= 50) {
        optionsData[i] = { ...optionsData[i], value: optionsData[i].value + tries };
        tries++;
      }
      seen.add(optionsData[i].value);
    }

    const withText = optionsData.map(o => ({ ...o, text: o.value.toLocaleString() }));

    const shuffledOptions = shuffle(withText).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const correctText = correctOption.text;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Since 1 mile = ${yardsPerMile.toLocaleString()} yards, 1 square mile = ${yardsPerMile.toLocaleString()}² = ${squareYardsPerSquareMile.toLocaleString()} square yards. Therefore, ${areaSquareMiles} square miles = ${areaSquareMiles} × ${squareYardsPerSquareMile.toLocaleString()} = ${correctText} square yards. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A certain town has an area of $${areaSquareMiles}$ square miles. What is the area, in $\\underline{\\text{square yards}}$, of this town? $(1 \\text{ mile} = 1,760 \\text{ yards})$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
