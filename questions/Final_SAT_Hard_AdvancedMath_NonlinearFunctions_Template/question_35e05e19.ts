import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 35e05e19
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 11, length: x, width: x-1]
 * - Difficulty factors: [Volume formula, algebraic modeling]
 * - Distractor patterns: [A: 11x(x-1), B: 11x(x+1), C/D: incorrect dimension placement]
 * - Constraints: [V = height × length × width]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_35e05e19 = {
  metadata: {
    // id: "35e05e19",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const height = getRandomInt(8, 15);
    const moreThan = getRandomInt(1, 4);
    
    const optionsData = [
      { text: `$V(x)=${height}x(x-${moreThan})$`, isCorrect: true },
      { text: `$V(x)=${height}x(x+${moreThan})$`, isCorrect: false },
      { text: `$V(x)=x(x+${height})(x-${moreThan})$`, isCorrect: false },
      { text: `$V(x)=x(x+${height})(x+${moreThan})$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `A park ranger hung squirrel houses each in the shape of a right rectangular prism. Each house has a height of $${height}$ inches. The length of each house's base is $x$ inches, which is ${moreThan} inch more than the width of the house's base. Which function $V$ gives the volume of each house, in cubic inches, in terms of the length of the house's base?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$V(x)=${height}x(x-${moreThan})$`,
      explanation: `Choice ${correctLetter} is correct. The width is $x-${moreThan}$ inches. Volume $V = \\text{length} \\times \\text{width} \\times \\text{height} = x(x-${moreThan})(${height}) = ${height}x(x-${moreThan})$.`
    };
  }
};

/**
 * Question ID: a45ffacb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shift: 15, y-int: -99/7, product: 65/7]
 * - Difficulty factors: [Exponential with transformations, fraction arithmetic]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield integer a]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */