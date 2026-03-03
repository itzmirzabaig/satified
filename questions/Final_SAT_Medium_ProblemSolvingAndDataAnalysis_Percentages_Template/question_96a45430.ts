import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 96a45430
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [increase: 6%, result: 318, original: 300]
 * - Difficulty factors: [Working backwards from increased value to original]
 * - Distractor patterns: [A: 199 (wrong formula), B: 299 (off by 1), D: 337 (increased instead of decreased)]
 * - Constraints: [n = result / (1 + percent/100)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_96a45430 = {
  metadata: {
    // id: "96a45430",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 6% increase to 318, find original (300)
    // Generate original n first, then calculate result
    const percent = getRandomInt(2, 15); // 2% to 15%
    const original = getRandomInt(150, 400); // Nice round number for mental math
    
    // Calculate the increased result (must be integer for clean SAT question)
    const multiplier = 1 + percent / 100;
    const result = Math.round(original * multiplier);
    
    // Recalculate exact original from result for clean division
    const exactOriginal = Math.round(result / multiplier);
    
    // STEP 2: Create options
    const distractorA = Math.round(result * (1 - percent / 100)); // Wrong direction
    const distractorB = exactOriginal - 1; // Off by one
    const distractorD = Math.round(result * (1 + percent / 100)); // Increased instead
    
    const correctText = exactOriginal.toString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "incorrect calculation" },
      { text: distractorB.toString(), isCorrect: false, reason: "close but off by one" },
      { text: correctText, isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: `increases the result by ${percent}% instead of finding the original` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 3: Return question data
    return {
      questionText: `A number $n$ is increased by ${percent}%. If the result is ${result}, what is the value of $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. If $n$ is increased by ${percent}%, the result is $n(1 + \\frac{${percent}}{100}) = ${result}$. Solving for $n$: $n = \\frac{${result}}{${multiplier.toFixed(2).replace(/\.?0+$/, '')}} = ${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: b2f6f17d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [original: $75.74, new: $79.86, increase: $4.12, percent: 5.4%]
 * - Difficulty factors: [Percent increase with decimals, rounding to nearest tenth]
 * - Distractor patterns: [A: 4.1% (confusing dollar amount with percent), B: 5.1% (calculation error), C: 5.2% (rounding error)]
 * - Constraints: [(new - old) / old * 100, round to 1 decimal]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
