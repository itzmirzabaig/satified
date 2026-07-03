import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1431
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 813 kg/m³, edge: 0.60 m, answer: 176 kg]
 * - Difficulty factors: [Density × cube volume, careful calculation]
 * - Distractor patterns: [176: correct, 488: density×edge, 1355: density/edge, 3764: density/volume]
 * - Constraints: [Edge < 1 ensures volume < 1, making mass < density]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_1431 = {
  metadata: {
    id: "1431",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values
    const density = getRandomInt(800, 900); // 813 in original
    // Edge in [0.50, 0.80] with two decimals, so volume = edge^3 < 1 and mass < density.
    const edgeLength = getRandomInt(50, 80) / 100; // 0.50 .. 0.80

    // STEP 2: Calculate (answer is the nearest whole number of mass)
    const volume = Math.pow(edgeLength, 3);
    const mass = density * volume;
    const massRounded = Math.round(mass);
    // Volume shown in the explanation at three decimals (never 5+ decimals -> no float artifact).
    const volumeShown = Math.round(volume * 1000) / 1000;

    // STEP 3: Distractors (each a common wrong operation), rounded to whole numbers.
    // B: Density × edge (forgetting to cube)
    const distractorB = Math.round(density * edgeLength);
    // C: Density / edge (wrong operation)
    const distractorC = Math.round(density / edgeLength);
    // D: Density / volume (inverted)
    const distractorD = Math.round(density / volume);

    // Ensure distractors are unique and never collide with the correct mass.
    const seen = new Set<number>([massRounded]);
    const uniqueDistractors: number[] = [];
    for (const d of [distractorB, distractorC, distractorD]) {
      if (d > 0 && !seen.has(d)) { seen.add(d); uniqueDistractors.push(d); }
    }
    let tries = 0;
    while (uniqueDistractors.length < 3 && tries++ < 50) {
      const cand = massRounded + getRandomInt(50, 200) * (Math.random() > 0.5 ? 1 : -1);
      if (cand > 0 && !seen.has(cand)) { seen.add(cand); uniqueDistractors.push(cand); }
    }
    // Deterministic fallback in the vanishingly unlikely event retries are exhausted.
    let filler = massRounded + 25;
    while (uniqueDistractors.length < 3) {
      if (filler > 0 && !seen.has(filler)) { seen.add(filler); uniqueDistractors.push(filler); }
      filler += 25;
    }

    // STEP 4: Create and shuffle options
    const correctText = massRounded.toString();
    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      { text: uniqueDistractors[0].toString(), isCorrect: false, reason: "results from multiplying the density by the edge length instead of by the volume" },
      { text: uniqueDistractors[1].toString(), isCorrect: false, reason: "results from dividing the density by the edge length" },
      { text: uniqueDistractors[2].toString(), isCorrect: false, reason: "results from dividing the density by the volume instead of multiplying" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The volume of the cube is $(${edgeLength})^3 \\approx ${volumeShown}$ cubic meters. Mass equals density times volume, so the mass is about $${density} \\times ${volumeShown} \\approx ${massRounded}$ kilograms. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The density of a certain solid substance is $${density}$ kilograms per cubic meter. A sample of this substance is in the shape of a cube, where each edge has a length of $${edgeLength}$ meters. To the nearest whole number, what is the mass, in kilograms, of this sample?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
