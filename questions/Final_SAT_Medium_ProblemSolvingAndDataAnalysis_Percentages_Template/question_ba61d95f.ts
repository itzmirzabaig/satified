import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_ba61d95f = {
  metadata: {
    // id: "ba61d95f",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (variation on 121dc44f)
    const percent = getRandomInt(2, 9) * 5; // 10, 15, 20, 25, 30, 35, 40, 45
    
    // STEP 2: Create options
    const rateDecimal = (percent / 100).toFixed(2).replace(/\.?0+$/, '');
    const multiplier = (1 + percent / 100).toFixed(2).replace(/\.?0+$/, '');
    
    const correctText = multiplier;
    
    const optionsData = [
      { text: rateDecimal, isCorrect: false, reason: `represents only the decimal equivalent of ${percent}%` },
      { text: (percent / 10).toFixed(1), isCorrect: false, reason: "misplaces the decimal point" },
      { text: correctText, isCorrect: true },
      { text: (1 + percent / 10).toFixed(1), isCorrect: false, reason: `treats ${percent} as ${percent}0%` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 3: Return question data
    return {
      questionText: `The population of Greenville increased by ${percent}\\% from 2015 to 2016. If the 2016 population is $k$ times the 2015 population, what is the value of $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The population increased by ${percent}\\%, so the new population is $100\\% + ${percent}\\% = ${100 + percent}% of the original. Converting to a decimal: $\\frac{${100 + percent}}{100} = ${multiplier}$. Therefore, $k = ${multiplier}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: 8cbf1415
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first percent: 40%, second percent: 30%, result: 12%]
 * - Difficulty factors: [Successive percentage of a percentage, compound percentage calculation]
 * - Distractor patterns: [A: 10% (subtraction), C: 70% (addition), D: 75% (division)]
 * - Constraints: [Must multiply percentages: 0.40 * 0.30 = 0.12 = 12%]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
