import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 79cf8505
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 115, part1: 47, equal parts: 34 each]
 * - Difficulty factors: [Word problem, setting up linear equation]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [(Total - Part1) / 2 = Answer]
 * - Question type: [Fill-in-the-blank]
 */

export const generator_79cf8505 = {
  metadata: {
    // id: "79cf8505",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    const total = getRandomInt(80, 150);
    const part1 = getRandomInt(20, Math.floor(total / 2));
    // Ensure (total - part1) is even for clean answer
    let remaining = total - part1;
    if (remaining % 2 !== 0) {
      remaining += 1;
    }
    const adjustedTotal = part1 + remaining;
    const answer = remaining / 2;
    
    const correctAnswer = answer.toString();
    
    return {
      questionText: `A line segment that has a length of ${adjustedTotal} centimeters (cm) is divided into three parts. One part is ${part1} cm long. The other two parts have lengths that are equal to each other. What is the length, in cm, of one of the other two parts of equal length?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. If $x$ represents the length, in cm, of each of the two parts of equal length, then the equation $${part1}+x+x=${adjustedTotal}$, or $${part1}+2x=${adjustedTotal}$$ represents this situation. Subtracting ${part1} from each side of this equation yields $2x=${remaining}$. Dividing each side of this equation by 2 yields $x=${correctAnswer}$. Therefore, the length, in cm, of one of the two parts of equal length is ${correctAnswer}.`
    };
  }
};

/**
 * Question ID: 620abf36
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, 4, 29, constant: 29]
 * - Difficulty factors: [Solving for expression (x+4) rather than x]
 * - Distractor patterns: [A is x value, B is wrong calculation, D is x+4+4]
 * - Constraints: [Let u = x+4, solve 5u = 4u + 29]
 * - Question type: [Multiple Choice Text]
 */