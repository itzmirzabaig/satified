import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 8490cc45
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 2, coefficient: -8, constant: 22]
 * - Difficulty factors: [Exponential function, y-intercept evaluation]
 * - Distractor patterns: [A: (0,14) correct, B: (0,2) sign error, C: (0,22) forgot coefficient, D: (0,-8) just coefficient]
 * - Constraints: [Clean integer result]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_8490cc45 = {
  metadata: {
    // id: "8490cc45",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // f(x) = a · b^x + c
    // f(0) = a + c
    
    const a = getRandomInt(-10, -3);
    const b = getRandomInt(2, 4);
    const c = getRandomInt(15, 30);
    
    const yIntercept = a + c;
    
    // Distractors
    const distractor1 = yIntercept;
    const distractor2 = -a + c;
    const distractor3 = c;
    const distractor4 = a;
    
    const optionsData = [
      { text: `$(0, ${distractor1})$`, isCorrect: true },
      { text: `$(0, ${distractor2})$`, isCorrect: false },
      { text: `$(0, ${distractor3})$`, isCorrect: false },
      { text: `$(0, ${distractor4})$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The function $f$ is defined by $f(x) = (${a})(${b})^x + ${c}$. What is the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$(0, ${yIntercept})$`,
      explanation: `Choice ${correctLetter} is correct. The y-intercept occurs at $x=0$: $f(0)=(${a})(${b})^0+${c}=${a}+${c}=${yIntercept}$.`
    };
  }
};

/**
 * Question ID: 20113
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [capacity: 1800, base price: $4, decrease: 100 per $1 increase]
 * - Difficulty factors: [Quadratic modeling, vertex of parabola, word problem to equation]
 * - Distractor patterns: [A: 4 (current price), B: 7 (correct), C: 14 (2×7), D: 18 (max decrease before zero sales)]
 * - Constraints: [Quadratic revenue model, find vertex x-coordinate]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */