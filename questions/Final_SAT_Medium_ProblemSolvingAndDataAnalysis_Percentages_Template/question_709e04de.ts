import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_709e04de = {
  metadata: {
    // id: "709e04de",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 1.13 times 100, find percent greater
    // Generate multipliers 1.05 to 1.35 (5% to 35% increase)
    const percentIncrease = getRandomInt(5, 35);
    const multiplier = 1 + percentIncrease / 100;
    const base = 100; // Keep base at 100 for clean calculation
    
    // STEP 2: Calculate options
    const z = base * multiplier;
    const correctAnswer = percentIncrease;
    
    const correctText = correctAnswer.toString();
    
    const optionsData = [
      { text: (multiplier - 1).toFixed(3).replace(/\.?0+$/, '').substring(1), isCorrect: false, reason: `confuses the decimal ${(multiplier-1).toFixed(3)} with ${percentIncrease}%` },
      { text: correctText, isCorrect: true },
      { text: (percentIncrease * 10).toString(), isCorrect: false, reason: "incorrect calculation" },
      { text: (100 + percentIncrease).toString(), isCorrect: false, reason: "incorrectly adds 100 to the percentage" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 3: Return question data
    return {
      questionText: `The value of $z$ is ${multiplier} times ${base}. The value of $z$ is what percent greater than ${100}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. If $z = ${multiplier} \\times ${base}$, then $z = ${z}$. The percent increase from ${base} to ${z} is $\\frac{${z - base}}{${base}} \\times 100 = ${correctAnswer}%. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: ba61d95f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [increase: 7%, multiplier: 1.07]
 * - Difficulty factors: [Identical to 121dc44f - converting percent increase to multiplier]
 * - Distractor patterns: [Same as 121dc44f: A=0.07, B=0.7, D=1.7]
 * - Constraints: [k = 1.07]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
