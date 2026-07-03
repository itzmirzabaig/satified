import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 934
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: $800, depreciation: 20% per year, years: 2, result: $512]
 * - Difficulty factors: [Compound depreciation over multiple years, successive percentage decrease]
 * - Distractor patterns: [A: $480 (linear depreciation), C: $556 (random), D: $640 (after 1 year only)]
 * - Constraints: [value = initial * (1 - rate)^years]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_934 = {
  metadata: {
    id: "934",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: $800, 20%, 2 years -> $512
    const initialValue = getRandomInt(6, 12) * 100; // $600-$1200
    const depreciationRate = getRandomInt(15, 30);  // 15% to 30%
    const years = getRandomInt(2, 3);               // 2 or 3 years

    // Retention factor. Keep an exact 2-decimal display string (depreciationRate
    // is an integer, so (100 - rate)/100 has at most 2 decimals) and avoid
    // printing the raw float, which would show artifacts like 0.8200000000000001.
    const retentionRate = (100 - depreciationRate) / 100;
    const retentionStr = retentionRate.toFixed(2); // e.g. "0.82"

    // STEP 2: Calculate correct answer (compound depreciation).
    // Round each year's value the way a student would, so the printed
    // step-by-step chain matches the final answer exactly.
    const afterYear1 = Math.round(initialValue * retentionRate);
    const afterYear2 = Math.round(afterYear1 * retentionRate);
    const afterYear3 = Math.round(afterYear2 * retentionRate);
    const finalValue = years === 2 ? afterYear2 : afterYear3;

    // STEP 3: Create distractors (all verified distinct and positive across the
    // full range 600..1200 x 15..30 x {2,3} by exhaustive check).
    // A: Linear depreciation (flat amount per year).
    const yearlyDepreciation = Math.round(initialValue * (depreciationRate / 100));
    const distractorA = initialValue - yearlyDepreciation * years;
    // D: Value after just 1 year.
    const distractorD = afterYear1;
    // C: Halfway between the linear result and the correct compound result.
    const distractorC = Math.round((distractorA + finalValue) / 2);

    const money = (n: number) => `\\$${n.toLocaleString()}`;
    const correctText = money(finalValue);

    const optionsData = [
      { text: money(distractorA), isCorrect: false, reason: `results from linear depreciation (a flat ${money(yearlyDepreciation)} per year) rather than a percentage of the remaining value` },
      { text: money(finalValue), isCorrect: true },
      { text: money(distractorC), isCorrect: false, reason: "does not correctly apply the depreciation for every year" },
      { text: money(distractorD), isCorrect: false, reason: "is the value after only 1 year" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Build the year-by-year explanation chain from the same live values.
    let chain = `After the first year, the value is ${money(initialValue)} \\times ${retentionStr} = ${money(afterYear1)}. After the second year, ${money(afterYear1)} \\times ${retentionStr} = ${money(afterYear2)}`;
    if (years === 3) {
      chain += `. After the third year, ${money(afterYear2)} \\times ${retentionStr} = ${money(afterYear3)}`;
    }

    // STEP 4: Return question data
    return {
      questionText: `A restaurant owner installed a new stove. At the time of installation, the stove had a value of ${money(initialValue)}. The owner estimates that each year the value of the stove will depreciate by ${depreciationRate}\\% of the previous year's estimated value. What is the estimated value of the stove exactly ${years} years after it was installed?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Because the stove keeps ${100 - depreciationRate}\\% of its value each year, its value is multiplied by ${retentionStr} annually. ${chain}. So the value after ${years} years is ${money(finalValue)}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
