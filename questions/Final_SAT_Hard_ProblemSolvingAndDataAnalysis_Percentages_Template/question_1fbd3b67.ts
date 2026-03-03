import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 1fbd3b67
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [190%, 80%, 24 (single/two-digit)]
 * - Difficulty factors: ["Percent greater than" vs "percent of", chained calculations]
 * - Distractor patterns: [Forgetting to add original amount, sign errors]
 * - Constraints: [190% greater means multiply by 2.9, 80% less means multiply by 0.2]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1fbd3b67 = {
  metadata: {
    // id: "1fbd3b67",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random parameters
    const P1 = getRandomInt(150, 250); // a is P1% greater than b
    const P2 = getRandomInt(60, 90);   // b is P2% less than base
    const baseValue = getRandomInt(15, 35); // Base number for b calculation
    
    // STEP 2: Calculate values
    // b is P2% less than baseValue: b = baseValue * (1 - P2/100)
    const bValue = baseValue * (1 - P2 / 100);
    // a is P1% greater than b: a = b * (1 + P1/100)
    const aMultiplier = 1 + P1 / 100;
    const aValue = Math.round(bValue * aMultiplier * 100) / 100;
    
    // STEP 3: Create distractors
    const forgotAddBase = Math.round(bValue * (P1 / 100) * 100) / 100; // Forgot "greater than"
    const wrongBSign = Math.round(baseValue * (P2 / 100) * aMultiplier * 100) / 100; // Wrong b calculation
    const swapped = Math.round(baseValue * aMultiplier * (1 - P2 / 100) * 100) / 100; // Swapped operations
    
    const optionsData = [
      { text: forgotAddBase.toString(), isCorrect: false, reason: "results from calculating P1% of b instead of P1% greater than b" },
      { text: aValue.toString(), isCorrect: true, reason: "" },
      { text: wrongBSign.toString(), isCorrect: false, reason: "results from incorrect calculation of b" },
      { text: swapped.toString(), isCorrect: false, reason: "results from swapping the operations" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'B';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The number $a$ is ${P1}% greater than the number $b$. The number $b$ is ${P2}% less than ${baseValue}. What is the value of $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: aValue.toString(),
      explanation: `Choice ${correctLetter} is correct. First, $b = ${baseValue} - ${P2/100}(${baseValue}) = ${baseValue}(${1 - P2/100}) = ${bValue}$. Then, $a = b + ${P1/100}b = b(1 + ${P1/100}) = ${bValue}(${aMultiplier}) = ${aValue}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: e635aede
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [14%, 4% (small percentages)]
 * - Difficulty factors: [Compound percentage growth, multiplicative vs additive thinking]
 * - Distractor patterns: [Adding percentages, multiplying percentages incorrectly]
 * - Constraints: [Must compound correctly: 1.14 * 1.04]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - compound percentage problem]
 */