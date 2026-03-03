import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 58dcc59f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 104, length = width + 5]
 * - Difficulty factors: [Quadratic word problem, rectangle dimensions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield positive integer solution]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */

export const generator_58dcc59f = {
  metadata: {
    // id: "58dcc59f",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // width × (width + diff) = area
    const w = getRandomInt(6, 15);
    const diff = getRandomInt(3, 8);
    const area = w * (w + diff);
    const length = w + diff;
    
    return {
      questionText: `A landscaper is designing a rectangular garden. The length is to be ${diff} feet longer than the width. If the area will be ${area} square feet, what will be the length, in feet?`,
      figureCode: null,
      options: null,
      correctAnswer: length.toString(),
      explanation: `Let width be $w$. Then $w(w+${diff})=${area}$, so $w^2+${diff}w-${area}=0$. Factoring: $(w-${w})(w+${w+diff})=0$, so $w=${w}$. The length is ${w}+${diff}=${length}$ feet.`
    };
  }
};

/**
 * Question ID: 2d1614a1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [P(t) = 290(1.04)^(4t/6)]
 * - Difficulty factors: [Exponential growth rate interpretation]
 * - Distractor patterns: [A: 0.38, B: 1.04, C: 4, D: 6]
 * - Constraints: [18 months = 1.5 years, growth factor over 18 months is 1.04]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */