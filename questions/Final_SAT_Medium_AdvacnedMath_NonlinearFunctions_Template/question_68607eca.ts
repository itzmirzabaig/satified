import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 68607eca
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 233, growth: 70% every 2 days, base 1.70, exponent x/2]
 * - Difficulty factors: [Periodic growth rate, setting up exponent for time period]
 * - Distractor patterns: [A/B: wrong base (decay), D: wrong exponent (2x instead of x/2)]
 * - Constraints: [Growth over 2-day periods, so exponent is x/2]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_68607eca = {
  metadata: {
    // id: "68607eca",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 233 views, 70% every 2 days
    // Randomize: initial (150-400), growth rate (50-80%), period (2-4 days)
    const initial = getRandomInt(15, 40) * 10; // 150 to 400
    const rate = getRandomInt(50, 80); // 50% to 80%
    const growthFactor = 1 + rate/100;
    const period = getRandomInt(2, 4); // 2 to 4 days
    
    // STEP 2: Calculate derived values
    
    // STEP 3: Build question text
    const questionText = `On April 1, there were $${initial}$ views of an advertisement posted on a website. Every ${period} days after April 1, the number of views of the advertisement had increased by ${rate}\\% of the number of views ${period} days earlier. The function $f$ gives the predicted number of views $x$ days after April 1. Which equation defines $f$?`;
    
    // STEP 4: Create options with tracking
    const rateDecimal = (rate / 100).toFixed(2).replace(/^0\./, '0.');
    
    // Fixed: \\frac instead of \\\\frac
    const optionsData = [
      { text: `$f(x)=${initial}(${rateDecimal})^{\\frac{x}{${period}}}$`, isCorrect: false, reason: "uses the growth rate as the base, representing decay rather than growth" },
      { text: `$f(x)=${initial}(${rateDecimal})^{${period}x}$`, isCorrect: false, reason: "uses the wrong exponent structure" },
      { text: `$f(x)=${initial}(${growthFactor.toFixed(2)})^{\\frac{x}{${period}}}$`, isCorrect: true },
      { text: `$f(x)=${initial}(${growthFactor.toFixed(2)})^{${period}x}$`, isCorrect: false, reason: `uses exponent $${period}x$ which would mean growth happens ${period} times per day, not every ${period} days` }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    // Fixed: \\frac instead of \\\\frac
    const correctAnswer = `$f(x)=${initial}(${growthFactor.toFixed(2)})^{\\frac{x}{${period}}}$`;
    
    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    // Fixed: \\frac instead of \\\\frac throughout
    const explanation = `Choice ${correctLetter} is correct. The initial number of views is $${initial}$. The growth rate is ${rate}\\%, so the growth factor is $1 + \\frac{${rate}}{100} = ${growthFactor.toFixed(2)}$. Since the growth happens every ${period} days (not daily), the exponent must be $\\frac{x}{${period}}$ to count the number of ${period}-day periods. Therefore, $f(x) = ${initial}(${growthFactor.toFixed(2)})^{\\frac{x}{${period}}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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