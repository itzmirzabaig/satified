import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: ba0e23b0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [140, 10]
 * - Difficulty factors: ["Percent greater than" formulation]
 * - Distractor patterns: [Confusing percentage with absolute difference]
 * - Constraints: [140 = (1 + p/100) * 10, so p = 1300]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_ba0e23b0 = {
  metadata: {
    // id: "ba0e23b0",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base and result
    const baseValue = getRandomInt(8, 25);
    const multiplier = getRandomInt(10, 25); // Large multiplier for "hard" feel
    
    const result = baseValue * multiplier;
    const percentGreater = (multiplier - 1) * 100;
    
    // STEP 2: Create distractors
    const absoluteDiff = result - baseValue; // Wrong: absolute difference
    const wrongPct = Math.round((baseValue / result) * 100); // Wrong: inverted
    const simpleMultiple = multiplier * 100; // Wrong: just the multiplier as pct
    
    const optionsData = [
      { text: (multiplier * 100).toString(), isCorrect: false, reason: "confuses multiplier with percentage" },
      { text: percentGreater.toString(), isCorrect: true, reason: "" },
      { text: (result - baseValue).toString(), isCorrect: false, reason: "confuses absolute difference with percentage" },
      { text: Math.round((baseValue / result) * 10000).toString(), isCorrect: false, reason: "inverts the ratio incorrectly" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'B';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `$${result}$ is $p% greater than $${baseValue}$. What is the value of $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: percentGreater.toString(),
      explanation: `Choice ${correctLetter} is correct. "$${result}$ is $p% greater than $${baseValue}$" means $${result} = (1 + \\frac{p}{100})(${baseValue})$. Dividing: $\\frac{${result}}{${baseValue}} = 1 + \\frac{p}{100}$, so ${multiplier} = 1 + \\frac{p}{100}$. Thus $\\frac{p}{100} = ${multiplier - 1}$ and $p = ${percentGreater}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 8c5dbd3e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [110%, 55%, 50]
 * - Difficulty factors: [Chained percentage calculations]
 * - Distractor patterns: [Same as similar problems]
 * - Constraints: [z = 0.45 * 50, w = 2.1 * z = 47.25]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */