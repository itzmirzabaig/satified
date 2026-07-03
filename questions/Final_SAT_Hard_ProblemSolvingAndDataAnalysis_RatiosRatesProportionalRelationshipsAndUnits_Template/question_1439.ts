import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1439
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 353 kg/m³, mass: 345 kg, answer: ~0.99 (decimal < 1)]
 * - Difficulty factors: [Inverse density formula, cube root calculation, working backwards]
 * - Distractor patterns: [0.98: calculation error, 1.01/1.02: overestimates]
 * - Constraints: [Mass < Density ensures volume < 1, so edge < 1]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_1439 = {
  metadata: {
    id: "1439",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values.
    // Density: 300-400 range (as in 353).
    const density = getRandomInt(300, 400);
    // Mass slightly less than density so volume < 1, hence edge < 1.
    const mass = getRandomInt(Math.floor(density * 0.9), density - 1);

    // STEP 2: Calculate volume and edge length (answer is edge to nearest hundredth).
    const volume = mass / density;
    const edgeLength = Math.cbrt(volume);
    const edgeRounded = Math.round(edgeLength * 100) / 100; // nearest hundredth
    const correctText = edgeRounded.toFixed(2);
    // Volume displayed at three decimals -> never 5+ decimals, so no float artifact.
    const volumeShown = (Math.round(volume * 1000) / 1000).toFixed(3);

    // STEP 3: Distractors as rounded hundredths near the answer. Offsets -0.01,
    // +0.02, +0.03 are always three distinct values and never equal the answer.
    const seen = new Set<string>([correctText]);
    const candidates = [
      { v: Math.max(0.01, edgeRounded - 0.01), reason: "results from underestimating the cube root" },
      { v: edgeRounded + 0.02, reason: "results from overestimating the cube root" },
      { v: edgeRounded + 0.03, reason: "results from a larger overestimation of the cube root" }
    ];
    const distractors: { text: string; reason: string }[] = [];
    for (const c of candidates) {
      const t = c.v.toFixed(2);
      if (!seen.has(t)) { seen.add(t); distractors.push({ text: t, reason: c.reason }); }
    }
    // Deterministic top-up if any collision removed a candidate (keeps 3 distractors).
    let step = 4;
    while (distractors.length < 3) {
      const t = (edgeRounded + step * 0.01).toFixed(2);
      if (!seen.has(t)) { seen.add(t); distractors.push({ text: t, reason: "results from overestimating the cube root" }); }
      step++;
    }

    // STEP 4: Create and shuffle options.
    const optionsData = [
      { text: distractors[0].text, isCorrect: false, reason: distractors[0].reason },
      { text: correctText, isCorrect: true, reason: "" },
      { text: distractors[1].text, isCorrect: false, reason: distractors[1].reason },
      { text: distractors[2].text, isCorrect: false, reason: distractors[2].reason }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Every math segment starts with a backslash command (no bare "$<digit>"),
    // so the explanation avoids the DOLLAR_RISK currency heuristic.
    const explanation = `Choice ${correctLetter} is correct. Volume equals mass divided by density, so the volume is $\\frac{${mass}}{${density}} \\approx ${volumeShown}$ cubic meters. The edge length is the cube root of the volume, so the edge length is $\\sqrt[3]{${volumeShown}} \\approx ${correctText}$ meters. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The density of a certain type of wood is $${density}$ kilograms per cubic meter. A sample of this wood is in the shape of a cube and has a mass of $${mass}$ kilograms. To the nearest hundredth of a meter, what is the length of one edge of this sample?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
