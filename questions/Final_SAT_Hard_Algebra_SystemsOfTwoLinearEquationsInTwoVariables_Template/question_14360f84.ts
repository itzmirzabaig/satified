import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 14360f84
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, -18, -4, h, constants: 5, 2, answer: 18]
 * - Difficulty factors: [No solution, identifying h for parallel lines]
 * - Distractor patterns: [Sign errors, calculation errors]
 * - Constraints: [h must make y-coefficients proportional with x-coefficients]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_14360f84 = {
  metadata: {
    // id: "14360f84",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a1 = getRandomInt(3, 6);
    const b1_actual = a1 * getRandomInt(3, 5);
    const h_actual = 2 * b1_actual;
    const c1 = getRandomInt(3, 8);
    const c2 = getRandomInt(1, 5);
    
    const eq1 = `${a1}x = ${b1_actual}y + ${c1}`;
    const eq2 = `-${a1}x + hy = ${c2}`;
    
    const distA = -h_actual;
    const distB = 0;
    const distC = b1_actual;
    const distD = h_actual;
    
    const optionsData = [
      { text: distA.toString(), isCorrect: false },
      { text: distB.toString(), isCorrect: false },
      { text: distC.toString(), isCorrect: false },
      { text: distD.toString(), isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `In the given system of equations, $h$ is a constant. If the system has no solution, what is the value of $h$? $$${eq1}$$ $$${eq2}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: h_actual.toString(),
      explanation: `Choice ${correctLetter} is correct. Rewriting in standard form: ${a1}x - ${b1_actual}y = ${c1} and -${a1}x + hy = ${c2}. For parallel lines, the ratio of x-coefficients equals the ratio of y-coefficients: $\\frac{${a1}}{-${a1}} = \\frac{-${b1_actual}}{h}$. This gives $-1 = \\frac{-${b1_actual}}{h}$, so $h = ${h_actual}$. Choice ${incorrectOptions[0].letter} is incorrect. If $h = ${distA}$, the system would have one solution. Choice ${incorrectOptions[1].letter} is incorrect. If $h = ${distB}$, the system would have one solution. Choice ${incorrectOptions[2].letter} is incorrect. If $h = ${distC}$, the system would have infinitely many solutions.`
    };
  }
};

/**
 * Question ID: a71b1bc1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 32, x = 3y + 4, answer: 25]
 * - Difficulty factors: [Word problem, substitution]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Answer must be integer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */