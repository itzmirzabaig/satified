import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: ef926848
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [square P side x, square Q perimeter 176 more]
 * - Difficulty factors: [Perimeter/area relationships, function modeling]
 * - Distractor patterns: [A: (x+44)², B: (x+176)², C/D: incorrect]
 * - Constraints: [Side of Q is x + 44, area is (x+44)²]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_ef926848 = {
  metadata: {
    // id: "ef926848",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const diff = getRandomInt(3, 8) * 4;
    const extra = diff * 4;
    
    const optionsData = [
      { text: `$(x+${diff})^2$`, isCorrect: true },
      { text: `$(x+${extra})^2$`, isCorrect: false },
      { text: `$(${extra}x+${diff})^2$`, isCorrect: false },
      { text: `$(${extra}x+${extra})^2$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `Square P has side length $x$ inches. Square Q has perimeter ${extra} inches greater than P's perimeter. Which function $f$ gives Q's area?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$(x+${diff})^2$`,
      explanation: `Choice ${correctLetter} is correct. P's perimeter is $4x$. Q's perimeter is $4x+${extra}$, so Q's side is $\\frac{4x+${extra}}{4}=x+${diff}$. The area is $(x+${diff})^2$.`
    };
  }
};

/**
 * Question ID: 635f54ee
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [surface area 6(a/4)²]
 * - Difficulty factors: [Surface area formula, solving for side, perimeter]
 * - Distractor patterns: [A: a/4, B: a, C: 4a, D: 6a]
 * - Constraints: [Side = a/4, face perimeter = 4 × a/4 = a]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */