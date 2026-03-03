import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_ad1d6adb = {
  metadata: {
    // id: "ad1d6adb",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 9 to 90 = 900% increase
    // Generate small original, large new (10x to 15x increase)
    const original = getRandomInt(5, 15);
    const multiplier = getRandomInt(8, 15); // 8x to 15x
    const newValue = original * multiplier;
    
    // STEP 2: Calculate answer
    const increase = newValue - original;
    const percentIncrease = (increase / original) * 100;
    
    // STEP 3: Create distractors
    const distractorA = Math.round((original / newValue) * 100); // Ratio inverted
    const distractorB = increase; // Just the increase (81)
    const distractorC = newValue; // The final value (90)
    
    const correctText = `${percentIncrease}\\%`;
    
    const optionsData = [
      { text: `${distractorA}\\%`, isCorrect: false, reason: "results from calculating the ratio of original to new" },
      { text: `${distractorB}\\%`, isCorrect: false, reason: "represents the absolute increase without dividing by the original" },
      { text: `${distractorC}\\%`, isCorrect: false, reason: "confuses the final value with a percentage" },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `The number of coins in a collection increased from ${original} to ${newValue}. What was the percent increase in the number of coins in this collection?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The percent increase formula is $\\frac{\\text{New} - \\text{Original}}{\\text{Original}} \\times 100\\% = \\frac{${newValue} - ${original}}{${original}} \\times 100\\% = \\frac{${increase}}{${original}} \\times 100\\% = ${percentIncrease}%. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: d72a2b4d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [March: $15.50, April: $17.36, p: 112]
 * - Difficulty factors: [Finding percent p where April = p% of March, p > 100 means increase]
 * - Distractor patterns: [A: 12 (just the increase percent), B: 88 (decrease confusion), D: 188 (random)]
 * - Constraints: [p = (April/March) * 100]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
