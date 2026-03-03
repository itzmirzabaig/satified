import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 566759ef
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: $800, depreciation: 20% per year, years: 2, result: $512]
 * - Difficulty factors: [Compound depreciation over multiple years, successive percentage decrease]
 * - Distractor patterns: [A: $480 (linear depreciation), C: $556 (random), D: $640 (after 1 year only)]
 * - Constraints: [value = initial * (1 - rate)^years]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_566759ef = {
  metadata: {
    // id: "566759ef",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: $800, 20%, 2 years → $512
    const initialValue = getRandomInt(6, 12) * 100; // $600-$1200
    const depreciationRate = getRandomInt(15, 30); // 15% to 30%
    const years = getRandomInt(2, 3); // 2 or 3 years
    
    // STEP 2: Calculate correct answer (compound depreciation)
    const retentionRate = 1 - (depreciationRate / 100);
    const finalValue = Math.round(initialValue * Math.pow(retentionRate, years));
    
    // STEP 3: Create distractors
    // A: Linear depreciation (flat amount per year)
    const yearlyDepreciation = initialValue * (depreciationRate / 100);
    const distractorA = Math.round(initialValue - (yearlyDepreciation * years));
    
    // D: After just 1 year
    const distractorD = Math.round(initialValue * retentionRate);
    
    // C: Random calculation error (average of A and correct)
    const distractorC = Math.round((distractorA + finalValue) / 2);
    
    const correctText = `$${finalValue.toLocaleString()}`;
    
    const optionsData = [
      { text: `$${distractorA.toLocaleString()}`, isCorrect: false, reason: `results from linear depreciation (flat $${Math.round(yearlyDepreciation)} per year) rather than percentage of remaining value` },
      { text: `$${finalValue.toLocaleString()}`, isCorrect: true },
      { text: `$${distractorC.toLocaleString()}`, isCorrect: false, reason: "calculation error" },
      { text: `$${distractorD.toLocaleString()}`, isCorrect: false, reason: "value after only 1 year" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `Thomas installed a new stove in his restaurant. At the time of installation, the stove had a value of $${initialValue.toLocaleString()}. Thomas estimates that each year the value of the stove will depreciate by ${depreciationRate}% of the previous year's estimated value. What is the estimated value of the stove exactly ${years} years after Thomas installed it?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. After the first year, the value is $${initialValue} × ${retentionRate} = $${Math.round(initialValue * retentionRate)}. After the second year, $${Math.round(initialValue * retentionRate)} × ${retentionRate} = $${years === 2 ? finalValue : Math.round(initialValue * Math.pow(retentionRate, 2))}${years === 3 ? `. After the third year, $${Math.round(initialValue * Math.pow(retentionRate, 2))} × ${retentionRate} = $${finalValue}` : ''}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: ad1d6adb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [original: 9, new: 90, increase: 81, percent: 900%]
 * - Difficulty factors: [Large percent increase calculation, distinguishing from absolute increase]
 * - Distractor patterns: [A: 10% (ratio inverted), B: 81% (absolute increase only), C: 90% (final value confusion)]
 * - Constraints: [(new - old) / old * 100]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
