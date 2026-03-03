import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1ce51655
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 20, rate: 1oz/4days, remaining: 9]
 * - Difficulty factors: [Rate problem, working backwards]
 * - Distractor patterns: [A is random, B is remaining amount, C uses remaining oz × 4]
 * - Constraints: [(Initial - Remaining) / Rate = Time]
 * - Question type: [Multiple Choice Text]
 */

export const generator_1ce51655 = {
  metadata: {
    // id: "1ce51655",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    const initial = getRandomInt(15, 30);
    const rateNum = 1;
    const rateDen = getRandomInt(3, 6);
    const remaining = getRandomInt(5, Math.floor(initial / 2));
    
    const evaporated = initial - remaining;
    const days = evaporated * rateDen;
    
    // Distractors
    const distractorA = Math.floor(days / 10);
    const distractorB = remaining;
    const distractorC = remaining * rateDen;
    
    const correctText = `${days}`;
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${days}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    return {
      questionText: `A bowl contains $${initial}$ ounces of water. When the bowl is uncovered, the amount of water in the bowl decreases by $${rateNum}$ ounce every $${rateDen}$ days. If $${remaining}$ ounces of water remain in this bowl, for how many days has it been uncovered?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The bowl started with ${initial} ounces and has ${remaining} ounces remaining, so ${evaporated} ounces have evaporated. Since water evaporates at ${rateNum} ounce per ${rateDen} days, the number of days is ${evaporated} × ${rateDen} = ${days} days.`
    };
  }
};

/**
 * Question ID: 5a7ab8e8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 66]
 * - Difficulty factors: [Understanding identity equations]
 * - Distractor patterns: [A thinks linear equations have one solution, B confuses with quadratic, D thinks it's a contradiction]
 * - Constraints: [ax = ax is true for all x]
 * - Question type: [Multiple Choice Text]
 */