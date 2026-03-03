import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8e2e424e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 50, percent greater: 36%, multiplier: 1.36]
 * - Difficulty factors: [Finding multiplier r where k = 50 * r and k is 36% greater than 50]
 * - Distractor patterns: [A: 36 (raw percent), B: 3.6 (decimal error), D: 0.36 (just the increase portion)]
 * - Constraints: [r = 1 + percent/100 = 1.36]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_8e2e424e = {
  metadata: {
    // id: "8e2e424e",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 36% greater than 50
    // Use base values 40-100, percent 20-60
    const base = getRandomInt(4, 10) * 10; // 40, 50, 60, 70, 80, 90, 100
    const percent = getRandomInt(4, 7) * 5; // 20, 25, 30, 35
    
    // STEP 2: Calculate answer
    const multiplier = 1 + percent / 100;
    const k = base * multiplier;
    
    // Format options
    const multiplierFormatted = multiplier.toFixed(2).replace(/\.?0+$/, '');
    
    const correctText = multiplierFormatted;
    
    const optionsData = [
      { text: percent.toString(), isCorrect: false, reason: "mistakes the percentage value for the multiplier" },
      { text: (multiplier * 10).toString(), isCorrect: false, reason: "results from misplacing the decimal point" },
      { text: correctText, isCorrect: true },
      { text: (percent / 100).toString(), isCorrect: false, reason: `is the decimal equivalent of ${percent}%, which would be correct if k were ${percent}% of ${base}, not ${percent}% greater than ${base}` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 3: Return question data
    return {
      questionText: `The number $k$ is ${percent}% greater than ${base}. If $k$ is the product of ${base} and $r$, what is the value of $r$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Since $k$ is ${percent}\\% greater than ${base}, $k = ${base} + 0.${percent}(${base}) = ${base}(1 + 0.${percent}) = ${base}(${multiplierFormatted})$. Since $k = ${base}r$, it follows that $r = ${multiplierFormatted}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: 709e04de
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [multiplier: 1.13, base: 100, percent greater: 13%]
 * - Difficulty factors: [Given multiplier, find percent increase]
 * - Distractor patterns: [A: 11.3 (confusing with 0.113), C: 130 (using 1.3), D: 213 (random error)]
 * - Constraints: [Percent greater = (multiplier - 1) * 100]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
