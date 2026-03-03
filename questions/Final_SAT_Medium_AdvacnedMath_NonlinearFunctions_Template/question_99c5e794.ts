import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 99c5e794
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 15000, growth rate: 4%, p = 15000(1.04)^x]
 * - Difficulty factors: [Exponential growth, percentage to growth factor]
 * - Distractor patterns: [A/B: swapped structure, C: decay instead of growth]
 * - Constraints: [Growth factor = 1 + 0.04 = 1.04]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_99c5e794 = {
  metadata: {
    // id: "99c5e794",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 15000, 4% growth
    // Randomize: initial (10000-20000), growth rate (3-6%)
    const initial = getRandomInt(10, 20) * 1000; // 10000 to 20000
    const rate = getRandomInt(3, 6); // 3% to 6%
    const growthFactor = 1 + rate / 100;
    
    // STEP 2: Calculate derived values
    
    // STEP 3: Build question text
    const questionText = `A model predicts that the population of Bergen was $${initial.toLocaleString()}$ in 2005. The model also predicts that each year for the next 5 years, the population $p$ increased by ${rate}\\% of the previous year's population. Which equation best represents this model, where $x$ is the number of years after 2005, for $x \\\\leq 5$?`;
    
    // STEP 4: Create options with tracking
    const decayFactor = 1 - rate / 100;
    
    const optionsData = [
      { text: `$p = ${decayFactor.toFixed(2)}(${initial})^{x}$`, isCorrect: false, reason: "swaps the initial amount and growth factor, and uses decay factor" },
      { text: `$p = ${growthFactor.toFixed(2)}(${initial})^{x}$`, isCorrect: false, reason: "swaps the initial amount and growth factor" },
      { text: `$p = ${initial}(${decayFactor.toFixed(2)})^{x}$`, isCorrect: false, reason: "uses decay factor instead of growth factor (represents ${rate}\\% decrease, not increase)" },
      { text: `$p = ${initial}(${growthFactor.toFixed(2)})^{x}$`, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$p = ${initial}(${growthFactor.toFixed(2)})^{x}$`;
    
    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The initial population in 2005 is $${initial.toLocaleString()}$, so $P = ${initial}$. A ${rate}\\% increase means the growth factor is $1 + \\\\frac{${rate}}{100} = ${growthFactor.toFixed(2)}$. Therefore, $p = ${initial}(${growthFactor.toFixed(2)})^{x}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 100030d9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 20 feet, bounce to half height each time, height after 3rd bounce: 2.5]
 * - Difficulty factors: [Geometric sequence, bounce counting]
 * - Distractor patterns: [Various miscounts of bounces]
 * - Constraints: [After nth bounce, height = initial / 2^n]
 * - Question type: [No Figure→Fill in the Blank]
 * - Figure generation: [None - word problem]
 */