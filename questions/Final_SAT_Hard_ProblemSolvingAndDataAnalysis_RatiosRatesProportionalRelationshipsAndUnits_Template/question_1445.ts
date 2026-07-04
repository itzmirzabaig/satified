import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1445
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [acceleration: 7.3 (single decimal), conversion: 1 mile = 1609m]
 * - Difficulty factors: [Complex unit conversion with squared time units, dimensional analysis]
 * - Distractor patterns: [0.3: dividing by 60 instead of 60², 195.8/220.4: calculation errors]
 * - Constraints: [Must convert m/s² to mi/min² using squared conversion factor]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_1445 = {
  metadata: {
    id: "1445",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate acceleration value (single decimal as in 7.3).
    // Lower bound 1.5 keeps every distractor strictly positive after rounding.
    const acceleration = getRandomInt(15, 100) / 10; // 1.5 to 10.0

    // STEP 2: Conversion factors
    const metersPerMile = 1609;
    const secondsPerMinute = 60;

    const r1 = (x: number) => Math.round(x * 10) / 10; // round to nearest tenth

    // STEP 3: Calculate correct conversion
    // m/s² × (1 mi/1609 m) × (60 s/1 min)² = m/s² × (3600/1609) mi/min²
    const conversionFactor = (secondsPerMinute * secondsPerMinute) / metersPerMile; // 3600/1609
    const resultRounded = r1(acceleration * conversionFactor);

    // STEP 4: Build three distractors, each from a DISTINCT misconception, so the
    // stated reason is always the value that misconception actually produces.
    // These three formulas live at different scales (≈0.037a, ≈0.447a, 2a) and are
    // verified collision-free vs. each other and the correct answer for acc∈[1.5,10.0].
    const dForgetSquare = r1(acceleration * secondsPerMinute / metersPerMile); // uses 60, not 60²
    const dInvertMile = r1(acceleration * metersPerMile / (secondsPerMinute * secondsPerMinute)); // 1609 in numerator
    const dApproxFactor = r1(acceleration * 2); // rounds the conversion factor to 2 instead of ≈2.237

    // STEP 5: Create options (reason travels WITH each distractor value).
    const correctText = resultRounded.toFixed(1);
    const optionsData = [
      { text: dForgetSquare.toFixed(1), isCorrect: false, reason: "results from forgetting to square the time conversion (using 60 instead of 60²)" },
      { text: correctText, isCorrect: true },
      { text: dInvertMile.toFixed(1), isCorrect: false, reason: "results from inverting the mile-meter conversion (multiplying by 1,609 instead of dividing)" },
      { text: dApproxFactor.toFixed(1), isCorrect: false, reason: "results from using an approximate conversion factor of 2 instead of about 2.237" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. To convert ${acceleration} m/s² to mi/min², multiply by (1 mile / ${metersPerMile} meters) and by (${secondsPerMinute}²), since the time unit is squared. This gives ${acceleration} × (3600/${metersPerMile}) = ${acceleration} × ${conversionFactor.toFixed(4)} = ${resultRounded} mi/min². Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The speed of a vehicle is increasing at a rate of $${acceleration}$ meters per second squared. What is this rate, in **miles per minute squared**, rounded to the nearest tenth? (Use $1 \\text{ mile} = 1,609 \\text{ meters}$.)`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
