import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 022e9894
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 1,250 (mid-large), first filter: 72%, second filter: 36%]
 * - Difficulty factors: [Sequential percentage application, multi-step calculation]
 * - Distractor patterns: [N/A - fill in blank, but common: stop at first step, add instead of multiply]
 * - Constraints: [Must apply percentages sequentially, not add them]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */

export const generator_022e9894 = {
  metadata: {
    // id: "022e9894",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original uses 1,250 initial, 72% then 36%
    // Generate "nice" percentages that work well together
    const percent1 = getRandomInt(6, 8) * 10 + getRandomInt(0, 1) * 5; // 60, 65, 70, 75, 80, 85
    const percent2 = getRandomInt(3, 5) * 10 + getRandomInt(0, 1) * 5; // 30, 35, 40, 45, 50, 55
    
    // Generate initial attendance (round number that works well with percent1)
    const baseAttendees = getRandomInt(800, 1500);
    // Adjust to ensure clean multiplication
    const initialAttendees = Math.round(baseAttendees / 100) * 100; // Round to nearest 100
    
    // STEP 2: Calculate sequential percentages
    // First session → Second session
    const afterFirstFilter = Math.round((percent1 / 100) * initialAttendees);
    // Second session → Third session  
    const afterSecondFilter = Math.round((percent2 / 100) * afterFirstFilter);
    
    const correctAnswer = afterSecondFilter.toString();
    
    // STEP 3: Return question data
    return {
      questionText: `An insurance company offers a series of three information sessions. ${initialAttendees.toLocaleString()} people attended the first information session. ${percent1}% of the people who attended the first information session attended the second information session, and ${percent2}% of the people who attended the first and second information sessions attended the third information session. How many people attended all three information sessions?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. It's given that ${initialAttendees.toLocaleString()} people attended the first information session, and that ${percent1}% of the people who attended the first information session attended the second information session. Therefore, the number of people who attended the first and second information sessions can be found by calculating ${percent1}% of ${initialAttendees.toLocaleString()}, which is equal to ${initialAttendees.toLocaleString()}(${percent1}/100), or ${afterFirstFilter.toLocaleString()}. It's also given that ${percent2}% of the people who attended the first and second information sessions attended the third information session. Since ${afterFirstFilter.toLocaleString()} people attended the first and second information sessions, the number of people who attended the first, second, and third information sessions can be found by calculating ${percent2}% of ${afterFirstFilter.toLocaleString()}, which is equal to ${afterFirstFilter.toLocaleString()}(${percent2}/100), or ${correctAnswer}. Therefore, ${correctAnswer} people attended all three information sessions.`
    };
  }
};
/**
 * Question ID: 63573fea
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [monthly sales: 1,300,000 (large number), return rate: 15%, period: 6 months]
 * - Difficulty factors: [Large number handling, percentage of large number, multi-month calculation]
 * - Distractor patterns: [A: single month only, B: 5 months only (forgets first month), D: magnitude error]
 * - Constraints: [Must multiply single month returns by 6 total months]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
