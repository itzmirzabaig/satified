import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 99ea3715
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation: 27x + 33y = 297, shift: 5]
 * - Difficulty factors: [Finding y-intercept, understanding vertical shift]
 * - Distractor patterns: [B: shift up instead of down, C/D: calculation errors]
 * - Constraints: [Original y-intercept must be integer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_99ea3715 = {
  metadata: {
    // id: "99ea3715",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters ensuring clean y-intercept
    // 27x + 33y = 297 → y = -27/33x + 9, y-int = 9
    const coefX = getRandomInt(10, 40);
    const coefY = getRandomInt(10, 40);
    const yInt = getRandomInt(5, 15);
    const shift = getRandomInt(2, 8);
    const C = coefY * yInt;
    
    const newYInt = yInt - shift;
    
    const optionsData = [
      { text: `$(0, ${newYInt})$`, isCorrect: true, reason: "" },
      { text: `$(0, ${yInt + shift})$`, isCorrect: false, reason: "shifted up instead of down" },
      { text: `$(0, ${newYInt + getRandomInt(2, 5)})$`, isCorrect: false, reason: "incorrect calculation" },
      { text: `$(0, ${yInt * 2})$`, isCorrect: false, reason: "unrelated calculation" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `If the graph of $${coefX}x+${coefY}y=${C}$ is shifted down $${shift}$ units in the $xy$-plane, what is the $y$-intercept of the resulting graph?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. To find the $y$-intercept of the original graph, we set $x=0$ in the equation $${coefX}x+${coefY}y=${C}$: $${coefY}y=${C}$, so $y=${yInt}$. The $y$-intercept of the original graph is $(0, ${yInt})$. The problem states that the graph is shifted down $${shift}$ units. The new $y$-intercept will be at $y=${yInt}-${shift}=${newYInt}$. Therefore, the $y$-intercept of the resulting graph is $(0, ${newYInt})$.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-51568fb9.ts
/**
 * Question ID: 51568fb9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 10, -5, constant: -12]
 * - Difficulty factors: [Converting standard form to slope-intercept]
 * - Distractor patterns: [A: sign error, B/C: unrelated fractions, D: correct]
 * - Constraints: [Clean integer slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
