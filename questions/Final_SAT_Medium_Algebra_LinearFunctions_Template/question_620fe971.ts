import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 620fe971 (620fe971_part2 for the actual question)
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 120, rate: 25, equation y = 120 - 25x]
 * - Difficulty factors: [Interpreting x-intercept in context]
 * - Distractor patterns: [B = rate misinterpretation, C = rate value, D = y-intercept]
 * - Constraints: [None - conceptual interpretation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_620fe971 = {
  metadata: {
    // id: "620fe971",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Initial amount: 100-150
    const initial = getRandomInt(100, 150);
    // Rate: 15-30 (must divide initial for clean x-intercept)
    let rate = getRandomInt(15, 30);
    // Adjust to ensure x-intercept is clean (2-6 hours)
    while (initial % rate !== 0 || initial / rate > 10) {
      rate = getRandomInt(15, 30);
    }
    const xIntercept = initial / rate;
    
    // STEP 2: Create options
    const correctText = `The team will have moved all the cargo in about ${xIntercept} hours.`;
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `The team has been moving about ${xIntercept} tons of cargo per hour.`, isCorrect: false, reason: "describes a rate, which would be the slope, not an intercept" },
      { text: `The team has been moving about ${rate} tons of cargo per hour.`, isCorrect: false, reason: "describes the rate from the equation" },
      { text: `The team started with ${initial} tons of cargo to move.`, isCorrect: false, reason: "describes the starting amount, which is the y-intercept" }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `A team of workers has been moving cargo off of a ship. The equation $y = ${initial} - ${rate}x$ models the approximate number of tons of cargo, $y$, that remains to be moved $x$ hours after the team started working. The graph of this equation in the $xy$-plane is a line. What is the best interpretation of the $x$-intercept in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The $x$-intercept occurs when $y = 0$, meaning 0 tons of cargo remain. This represents the time when all cargo has been moved. Setting $0 = ${initial} - ${rate}x$ gives $x = ${xIntercept}$ hours. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 1c29bfd1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 14.70, rate: 0.44, depth: 105]
 * - Difficulty factors: [Decimal arithmetic, rate application]
 * - Distractor patterns: [B = just water pressure, C = initial only, D = rate only]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */