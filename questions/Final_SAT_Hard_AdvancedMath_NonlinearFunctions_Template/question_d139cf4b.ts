import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: d139cf4b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(t) = 55t - 2t², g(t) = f(t) + 3]
 * - Difficulty factors: [Vertex of transformed quadratic, maximum value expression]
 * - Distractor patterns: [Various forms with 55/2, 55/4]
 * - Constraints: [Maximum at t = -b/(2a) = 55/4]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_d139cf4b = {
  metadata: {
    // id: "d139cf4b",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(1, 4);
    const b = getRandomInt(40, 80);
    const c = getRandomInt(1, 5);
    
    const vertexT = b / (2 * a);
    const maxVal = c + (b * b) / (4 * a);
    
    const optionsData = [
      { text: `$${c}+\\left(\\frac{${b}}{2}\\right)^2$`, isCorrect: false },
      { text: `$${c}+${2*a}\\left(\\frac{${b}}{${4*a}}\\right)^2$`, isCorrect: true },
      { text: `$${c}-${2*a}\\left(\\frac{${b}}{${4*a}}\\right)^2$`, isCorrect: false },
      { text: `$${c}-\\left(\\frac{${b}}{2}\\right)^2$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The function $f$ is defined by $f(t)=${b}t-${2*a}t^2$. The function $g$ is defined by $g(t)=f(t)+${c}$. Which expression represents the maximum value of $g(t)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${c}+${2*a}\\left(\\frac{${b}}{${4*a}}\\right)^2$`,
      explanation: `Choice ${correctLetter} is correct. The maximum of $f$ occurs at $t=\\frac{${b}}{${4*a}}$. The maximum value is $g(\\frac{${b}}{${4*a}})=${b}(\\frac{${b}}{${4*a}})-${2*a}(\\frac{${b}}{${4*a}})^2+${c}=${c}+${2*a}(\\frac{${b}}{${4*a}})^2$.`
    };
  }
};

/**
 * Question ID: 5208920
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponential decay model]
 * - Difficulty factors: [Decay rate interpretation, inequality for r]
 * - Distractor patterns: [A: r<-1, B: -1<r<0, C: 0<r<1, D: r>1]
 * - Constraints: [Decreasing population means 0 < 1+r < 1, so -1 < r < 0]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */