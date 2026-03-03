import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 1e11190a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: $5.50, $3.00, $6.50, $8.00, totals: $37, $66, answer: 5]
 * - Difficulty factors: [Word problem, two stores, system of two equations]
 * - Distractor patterns: [Raspberry quantity instead of blackberry, total pints]
 * - Constraints: [System must have integer solution]
 * - Question type: [Figure+Table→Multiple Choice Text]
 * - Figure generation: [Two lines intersecting]
 */

export const generator_1e11190a = {
  metadata: {
    // id: "1e11190a",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;
    
    while (attempts < maxAttempts && !result) {
      attempts++;
      
      const r1 = getRandomInt(4, 7) + 0.5;
      const b1 = getRandomInt(2, 4);
      const r2 = r1 + getRandomInt(1, 3);
      const b2 = b1 + getRandomInt(4, 6);
      
      const total1 = getRandomInt(30, 45);
      const total2 = total1 + getRandomInt(20, 35);
      
      const b_num = r2 * total1 - r1 * total2;
      const b_den = r2 * b1 - r1 * b2;
      
      if (b_den === 0) continue;
      
      const b_val = b_num / b_den;
      const r_val = (total1 - b1 * b_val) / r1;
      
      if (b_val !== Math.floor(b_val) || r_val !== Math.floor(r_val) || b_val <= 0 || r_val <= 0) {
        continue;
      }
      
      // Calculate viewBox
      const xMin = Math.floor(r_val / 2);
      const xMax = Math.ceil(r_val * 2);
      const yMin = Math.floor(b_val / 2);
      const yMax = Math.ceil(b_val * 2);
      
      
      const distA = r_val;
      const distB = b_val;
      const distC = r_val + b_val;
      const distD = 2 * b_val;
      
      const optionsData = [
        { text: distA.toString(), isCorrect: false },
        { text: distB.toString(), isCorrect: true },
        { text: distC.toString(), isCorrect: false },
        { text: distD.toString(), isCorrect: false }
      ];
      
      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));
      
      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;
      
      result = {
        questionText: `Store A sells raspberries for $\\\$${r1.toFixed(2)}$ per pint and blackberries for $\\\$${b1.toFixed(2)}$ per pint. Store B sells raspberries for $\\\$${r2.toFixed(2)}$ per pint and blackberries for $\\\$${b2.toFixed(2)}$ per pint. A certain purchase of raspberries and blackberries would cost $\\\$${total1.toFixed(2)}$ at Store A or $\\\$${total2.toFixed(2)}$ at Store B. How many pints of blackberries are in this purchase?`,
        figureCode: null,
        options: shuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: distB.toString(),
        explanation: `Choice ${correctLetter} is correct. The system $${r1}r + ${b1}b = ${total1}$ and $${r2}r + ${b2}b = ${total2}$ yields $r = ${r_val}$ and $b = ${b_val}$. Therefore, there are ${b_val} pints of blackberries.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: fb5e7f59
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: -1, -w, 2, -w, constants: -337, 47, y=19, answer: 11]
 * - Difficulty factors: [Substitution with given point, solving for parameter w]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [q must be consistent, w must be integer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */