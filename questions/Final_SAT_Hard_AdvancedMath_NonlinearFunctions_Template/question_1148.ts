import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1148
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [square P side x, square Q perimeter 176 more]
 * - Difficulty factors: [Perimeter/area relationships, function modeling]
 * - Distractor patterns: [A: (x+44)², B: (x+176)², C/D: incorrect]
 * - Constraints: [Side of Q is x + 44, area is (x+44)²]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1148 = {
  metadata: {
    id: "1148",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const diff = getRandomInt(3, 8) * 4;
    const extra = diff * 4;
    
    // Fixed: f was never defined in the stem, two choices such as (176x+44)^2 were
    // not real slips, and wrong choices had no reasons.
    const correctText = `$f(x)=(x+${diff})^2$`;
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: `$f(x)=(x+${extra})^2$`, isCorrect: false, reason: `$${extra}$ is the difference in the perimeters, but the side length of square Q is only $${diff}$ inches greater than $x$` },
      { text: `$f(x)=(4x+${extra})^2$`, isCorrect: false, reason: `$4x+${extra}$ is the perimeter of square Q, and this choice squares the perimeter instead of the side length` },
      { text: `$f(x)=x^2+${extra}$`, isCorrect: false, reason: `it adds the difference in the perimeters, $${extra}$, to the area of square P, but a difference in perimeter is not the same as a difference in area` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Square P has a side length of $x$ inches. Square Q has a perimeter that is ${extra} inches greater than the perimeter of square P. The function $f$ gives the area of square Q, in square inches. Which of the following defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The perimeter of square P is $4x$ inches, so the perimeter of square Q is $4x+${extra}$ inches. A square has four equal sides, so the side length of square Q is $\\frac{4x+${extra}}{4}=x+${diff}$ inches. The area of square Q is the square of its side length, so $f(x)=(x+${diff})^2$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
