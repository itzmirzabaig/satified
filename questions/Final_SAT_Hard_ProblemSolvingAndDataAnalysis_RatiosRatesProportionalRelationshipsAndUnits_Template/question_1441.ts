import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1441
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: ~800 kg/m³ (triple-digit), edge length: 0.90 (decimal < 1)]
 * - Difficulty factors: [Unit conversion, cube volume calculation, density formula manipulation]
 * - Distractor patterns: [Multiplying by edge instead of edge³, dividing instead of multiplying, wrong operation order]
 * - Constraints: [Edge length must be < 1 to make volume smaller than edge, density × volume should give reasonable mass]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_1441 = {
  metadata: {
    id: "1441",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Density (triple-digit) and a sub-unit edge length (0.50-0.99), matching the
    // original ranges. Mass = density × edge³; the SAT answer is that mass rounded
    // to the nearest whole number, so the reported answer is always an integer.
    const density = getRandomInt(800, 900);
    const edgeLength = parseFloat((getRandomInt(50, 99) / 100).toFixed(2)); // 0.50 to 0.99

    const volume = Math.pow(edgeLength, 3);          // 0 < volume < 1 since edge < 1
    const mass = density * volume;
    const massRounded = Math.round(mass);            // the correct answer (integer)

    // Distractors from classic SAT error patterns. Each value keeps its own reason
    // bound to it so filtering/reordering can never mislabel a distractor.
    const candidates = [
      { value: Math.round(density * edgeLength), reason: "results from multiplying the density by the edge length instead of the edge length cubed" },
      { value: Math.round(density / edgeLength), reason: "results from dividing the density by the edge length instead of multiplying by the volume" },
      { value: Math.round(density / volume),     reason: "results from dividing the density by the volume instead of multiplying by it" },
    ];

    // Keep only distractors that differ from the correct answer and from each
    // other (rounding can occasionally collapse two of them when edge ≈ 1).
    const used = new Set<number>([massRounded]);
    const distractors: { value: number; reason: string }[] = [];
    for (const c of candidates) {
      if (!used.has(c.value)) {
        used.add(c.value);
        distractors.push(c);
      }
    }

    // Top up to exactly 3 distinct distractors with nearby wrong values if any
    // collision removed one. Bounded loop (never hangs).
    let tries = 0;
    while (distractors.length < 3 && tries++ < 50) {
      const offset = getRandomInt(1, 60) * (getRandomInt(0, 1) === 0 ? 1 : -1);
      const value = massRounded + offset;
      if (value > 0 && !used.has(value)) {
        used.add(value);
        distractors.push({ value, reason: "results from an incorrect application of the density formula" });
      }
    }
    // Deterministic fallback (in the vanishingly unlikely event the loop stalls).
    let step = 1;
    while (distractors.length < 3) {
      const value = massRounded + step;
      if (value > 0 && !used.has(value)) {
        used.add(value);
        distractors.push({ value, reason: "results from an incorrect application of the density formula" });
      }
      step++;
    }

    // Build options, shuffle, then assign letters (letters are only meaningful
    // after the shuffle).
    const correctText = massRounded.toString();
    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      { text: distractors[0].value.toString(), isCorrect: false, reason: distractors[0].reason },
      { text: distractors[1].value.toString(), isCorrect: false, reason: distractors[1].reason },
      { text: distractors[2].value.toString(), isCorrect: false, reason: distractors[2].reason },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(opt => opt.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Explanation numbers computed from the same live variables; volume rounded to
    // 4 decimals so no float artifact leaks into user-visible text.
    const explanation = `Choice ${correctLetter} is correct. The volume of a cube with edge length ${edgeLength} meters is $(${edgeLength})^3=${parseFloat(volume.toFixed(4))}$ cubic meters. Using Mass = Density × Volume, the mass is $${density}\\times${parseFloat(volume.toFixed(4))}=${parseFloat(mass.toFixed(2))}$ kilograms, which rounds to ${massRounded} kilograms. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A sample of oak has a density of $${density}$ kilograms per cubic meter. The sample is in the shape of a cube, where each edge has a length of $${edgeLength}$ meters. To the nearest whole number, what is the mass, in kilograms, of this sample?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
