import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1112
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 9, length: x, width: x-7]
 * - Difficulty factors: [Volume formula, dimension relationships]
 * - Distractor patterns: [A: x(x+9)(x+7), B: x(x+9)(x-7), C: x(x+11)(x-1), D: 9x(x-7)]
 * - Constraints: [V = 9 × x × (x-7)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1112 = {
  metadata: {
    id: "1112",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const height = getRandomInt(6, 15);
    const diff = getRandomInt(4, 10);
    
    // Previously one choice used made up numbers, x(x+h+d)(x-(d-3)), and the stem never defined V.
    // Each wrong choice is now a real slip with its own reason.
    const optionsData = [
      { text: `$V(x)=${height}x(x+${diff})$`, isCorrect: false, reason: `$V(x)=${height}x(x+${diff})$ uses $x+${diff}$ for the width, which makes the width greater than the length instead of less` },
      { text: `$V(x)=x(x+${height})(x-${diff})$`, isCorrect: false, reason: `$V(x)=x(x+${height})(x-${diff})$ multiplies by $x+${height}$ instead of by the height, ${height}` },
      { text: `$V(x)=${height}(2x-${diff})$`, isCorrect: false, reason: `$V(x)=${height}(2x-${diff})$ adds the length and width, $x+(x-${diff})$, instead of multiplying them` },
      { text: `$V(x)=${height}x(x-${diff})$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A right rectangular prism has a height of ${height} units. The length of its base is $x$ units, which is ${diff} units more than the width of its base. Which function $V$ gives the volume of the prism, in cubic units, in terms of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$V(x)=${height}x(x-${diff})$`,
      explanation: `Choice ${correctLetter} is correct. The length is ${diff} units more than the width, so the width is $x-${diff}$ units. The volume of a right rectangular prism is the product of its length, width, and height, so $V(x)=x(x-${diff})(${height})=${height}x(x-${diff})$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};