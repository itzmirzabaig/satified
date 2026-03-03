import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 45cfb9de
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [walk time: 20 (double-digit), bus ride: 5 (single-digit), wait time: 0-30 (0 to double-digit)]
 * - Difficulty factors: [Word problem interpretation, inequality setup, "faster" comparison logic]
 * - Distractor patterns: [A/B use subtraction instead of addition for bus time, C reverses the inequality direction]
 * - Constraints: [Wait time must be 0-30, bus total time = wait + ride]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_45cfb9de = {
  metadata: {
    // id: "45cfb9de",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: walk=20min, bus ride=5min, wait=0-30min
    // Generate similar magnitudes: walk time 15-25 min, bus ride 3-8 min, wait range 0-30 or similar
    const walkTime = getRandomInt(15, 25);
    const busRideTime = getRandomInt(3, 8);
    const maxWaitTime = getRandomInt(25, 35); // Bus runs once every maxWaitTime minutes
    
    // STEP 2: Calculate the threshold where walking is faster
    // Walking is faster when: walkTime < waitTime + busRideTime
    // Therefore: waitTime > walkTime - busRideTime
    const thresholdWait = walkTime - busRideTime;
    
    // STEP 3: Create options with tracking
    // Correct: w + busRideTime > walkTime  →  w > walkTime - busRideTime
    // Distractor A: w - busRideTime < walkTime (subtracts ride time, wrong operation)
    // Distractor B: w - busRideTime > walkTime (subtracts ride time, wrong operation)
    // Distractor C: w + busRideTime < walkTime (reversed inequality - means bus is faster)
    
    const correctInequality = `w + ${busRideTime} > ${walkTime}`;
    
    const optionsData = [
      { text: `$w - ${busRideTime} < ${walkTime}$`, isCorrect: false, reason: "subtracts ride time from wait time instead of adding" },
      { text: `$w - ${busRideTime} > ${walkTime}$`, isCorrect: false, reason: "subtracts ride time instead of adding to get total bus time" },
      { text: `$w + ${busRideTime} < ${walkTime}$`, isCorrect: false, reason: "reverses the inequality, representing when bus is faster instead of walk" },
      { text: `$w + ${busRideTime} > ${walkTime}$`, isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `Adam's school is a $${walkTime}$-minute walk or a $${busRideTime}$-minute bus ride away from his house. The bus runs once every $${maxWaitTime}$ minutes, and the number of minutes, $w$, that Adam waits for the bus varies between $0$ and $${maxWaitTime}$. Which of the following inequalities gives the values of $w$ for which it would be faster for Adam to walk to school?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctInequality,
      explanation: `Choice ${correctLetter} is correct. To determine when walking is faster, compare the total time for each method. Walking takes $${walkTime}$ minutes. The bus takes $w$ minutes waiting plus $${busRideTime}$ minutes riding, for a total of $w + ${busRideTime}$ minutes. Walking is faster when the bus time exceeds walking time: $w + ${busRideTime} > ${walkTime}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: ee2f611f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [monthly pass: 95 (double-digit), ticket prices: 1.50, 2.50, 3.50 (decimals), target: 3-4x base]
 * - Difficulty factors: [Optimization, inequality setup, rounding up for whole trips]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must use maximum ticket price for minimum trips calculation, n must be integer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */