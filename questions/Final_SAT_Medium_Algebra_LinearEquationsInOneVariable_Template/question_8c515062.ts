import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8c515062
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 17, rate: 1oz/4hrs, remaining: 6, answer: 44]
 * - Difficulty factors: [Rate problem, units conversion]
 * - Distractor patterns: [A is division error, B is remaining amount, C uses remaining instead of evaporated]
 * - Constraints: [(Initial - Remaining) × Rate = Time]
 * - Question type: [Multiple Choice Text]
 */

export const generator_8c515062 = {
  metadata: {
    // id: "8c515062",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    const initial = getRandomInt(12, 25);
    const rateNum = 1;
    const rateDen = getRandomInt(3, 6);
    const remaining = getRandomInt(3, Math.floor(initial / 2));
    
    const burned = initial - remaining;
    const hours = burned * rateDen;
    
    // Distractors
    const distractorA = Math.floor(burned / 4);
    const distractorB = remaining;
    const distractorC = remaining * rateDen;
    
    const correctText = `${hours}`;
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${hours}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    return {
      questionText: `A candle is made of $${initial}$ ounces of wax. When the candle is burning, the amount of wax in the candle decreases by $${rateNum}$ ounce every $${rateDen}$ hours. If $${remaining}$ ounces of wax remain in this candle, for how many hours has it been burning?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The candle started with ${initial} ounces and has ${remaining} ounces remaining, so ${burned} ounces have burned. Since wax burns at ${rateNum} ounce per ${rateDen} hours, the number of hours is ${burned} × ${rateDen} = ${hours} hours.`
    };
  }
};