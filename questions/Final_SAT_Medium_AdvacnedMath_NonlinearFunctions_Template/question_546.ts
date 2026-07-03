import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 546
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 3000, decay rate: 2%, f(x) = 3000(0.98)^x]
 * - Difficulty factors: [Exponential decay setup, percentage to decay factor]
 * - Distractor patterns: [A/B: swapped/wrong structure, C: rate as base (extreme decay)]
 * - Constraints: [Decay factor = 1 - 0.02 = 0.98]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_546 = {
  metadata: {
    id: "546",
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
    const questionText = `A certain college had ${initial.toLocaleString()} students enrolled in 2015. The college predicts that after 2015, the number of students enrolled each year will be ${rate}% less than the number of students enrolled the year before. Which of the following functions models the relationship between the number of students enrolled, $f(x)$, and the number of years after 2015, $x$?`;

    // STEP 4: Create options with tracking
    // rateDecimal (0.02..0.05) and decayFactor (0.95..0.98) can never be
    // equal, so all four option strings are distinct for every draw.
    const rateDecimal = (rate / 100).toFixed(2);
    const decayStr = decayFactor.toFixed(2);

    const optionsData = [
      { text: `$f(x) = ${rateDecimal}(${initial})^{x}$`, isCorrect: false, reason: `uses the rate written as a decimal, ${rateDecimal}, as the coefficient and the initial enrollment as the base; the initial enrollment must be the coefficient and the yearly decay factor must be the base` },
      { text: `$f(x) = ${decayStr}(${initial})^{x}$`, isCorrect: false, reason: `swaps the two values: the initial enrollment, ${initial.toLocaleString()}, must be the coefficient, and the decay factor, ${decayStr}, must be the base that is raised to the power $x$` },
      { text: `$f(x) = ${initial}(${rateDecimal})^{x}$`, isCorrect: false, reason: `uses the rate written as a decimal, ${rateDecimal}, as the base; this would model enrollment falling to ${rate}% of the previous year's value each year (a ${100 - rate}% decrease), not decreasing by ${rate}% each year` },
      { text: `$f(x) = ${initial}(${decayStr})^{x}$`, isCorrect: true, reason: "" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$f(x) = ${initial}(${decayStr})^{x}$`;

    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. Because enrollment decreases by the same percentage each year, the situation is modeled by an exponential decay function of the form $f(x) = a(b)^{x}$, where $a$ is the initial value and $b$ is the yearly decay factor. The initial enrollment is ${initial.toLocaleString()}, so $a = ${initial}$. A ${rate}% decrease each year means ${100 - rate}% of the enrollment remains from one year to the next, so the decay factor is $b = \\frac{100 - ${rate}}{100} = ${decayStr}$. Therefore, $f(x) = ${initial}(${decayStr})^{x}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
