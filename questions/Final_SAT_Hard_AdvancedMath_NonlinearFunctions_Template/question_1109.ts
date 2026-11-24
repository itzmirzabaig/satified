import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1109
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 11, length: x, width: x-1]
 * - Difficulty factors: [Volume formula, algebraic modeling]
 * - Distractor patterns: [A: 11x(x-1), B: 11x(x+1), C/D: incorrect dimension placement]
 * - Constraints: [V = height × length × width]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1109 = {
  metadata: {
    id: "1109",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const height = getRandomInt(8, 15);
    const moreThan = getRandomInt(1, 4);
    
    // Previously the stem said "2 inch more" and the wrong choices had no reasons.
    const inchWord = moreThan === 1 ? 'inch' : 'inches';
    const optionsData = [
      { text: `$V(x)=${height}x(x-${moreThan})$`, isCorrect: true, reason: '' },
      { text: `$V(x)=${height}x(x+${moreThan})$`, isCorrect: false, reason: `$V(x)=${height}x(x+${moreThan})$ uses $x+${moreThan}$ for the width, which makes the width greater than the length instead of less` },
      { text: `$V(x)=x(x+${height})(x-${moreThan})$`, isCorrect: false, reason: `$V(x)=x(x+${height})(x-${moreThan})$ multiplies by $x+${height}$ instead of by the height, ${height}` },
      { text: `$V(x)=x(x+${height})(x+${moreThan})$`, isCorrect: false, reason: `$V(x)=x(x+${height})(x+${moreThan})$ multiplies by $x+${height}$ instead of by the height, ${height}, and also uses $x+${moreThan}$ for the width` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A park ranger hung squirrel houses, each in the shape of a right rectangular prism. Each house has a height of $${height}$ inches. The length of each house's base is $x$ inches, which is ${moreThan} ${inchWord} more than the width of the house's base. Which function $V$ gives the volume of each house, in cubic inches, in terms of the length of the house's base?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$V(x)=${height}x(x-${moreThan})$`,
      explanation: `Choice ${correctLetter} is correct. The length is ${moreThan} ${inchWord} more than the width, so the width is $x-${moreThan}$ inches. The volume of a right rectangular prism is the product of its length, width, and height, so $V(x)=x(x-${moreThan})(${height})=${height}x(x-${moreThan})$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
