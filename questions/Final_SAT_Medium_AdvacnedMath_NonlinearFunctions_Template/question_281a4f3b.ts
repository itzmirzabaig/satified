import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 281a4f3b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 3000, decay rate: 2%, f(x) = 3000(0.98)^x]
 * - Difficulty factors: [Exponential decay setup, percentage to decay factor]
 * - Distractor patterns: [A/B: swapped/wrong structure, C: rate as base (extreme decay)]
 * - Constraints: [Decay factor = 1 - 0.02 = 0.98]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_281a4f3b = {
  metadata: {
    // id: "281a4f3b",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 3000 students, 2% decrease
    // Randomize: initial (2000-5000), decay rate (2-5%)
    const initial = getRandomInt(20, 50) * 100; // 2000 to 5000
    const rate = getRandomInt(2, 5); // 2% to 5%
    const decayFactor = (100 - rate) / 100;
    
    // STEP 2: Calculate derived values
    
    // STEP 3: Build question text
    const questionText = `A certain college had $${initial.toLocaleString()}$ students enrolled in 2015. The college predicts that after 2015, the number of students enrolled each year will be ${rate}\\% less than the number of students enrolled the year before. Which of the following functions models the relationship between the number of students enrolled, $f(x)$, and the number of years after 2015, $x$?`;
    
    // STEP 4: Create options with tracking
    const rateDecimal = (rate / 100).toFixed(2).replace(/^0\./, '0.');
    
    const optionsData = [
      { text: `$f(x) = ${rateDecimal}(${initial})^{x}$`, isCorrect: false, reason: "swaps the initial amount and decay factor, and uses rate as base" },
      { text: `$f(x) = ${decayFactor.toFixed(2)}(${initial})^{x}$`, isCorrect: false, reason: "swaps the initial amount and decay factor" },
      { text: `$f(x) = ${initial}(${rateDecimal})^{x}$`, isCorrect: false, reason: "uses the rate as the base, representing extreme decay (population drops to ${rate}% each year)" },
      { text: `$f(x) = ${initial}(${decayFactor.toFixed(2)})^{x}$`, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$f(x) = ${initial}(${decayFactor.toFixed(2)})^{x}$`;
    
    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The initial enrollment is $${initial.toLocaleString()}$, so this is the coefficient. A ${rate}\\% decrease means the decay factor is $1 - \\\\frac{${rate}}{100} = ${decayFactor.toFixed(2)}$. Therefore, $f(x) = ${initial}(${decayFactor.toFixed(2)})^{x}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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