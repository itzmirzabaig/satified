import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1235
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, -18, -4, h, constants: 5, 2, answer: 18]
 * - Difficulty factors: [No solution, identifying h for parallel lines]
 * - Distractor patterns: [Sign errors, calculation errors]
 * - Constraints: [h must make y-coefficients proportional with x-coefficients]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_1235 = {
  metadata: {
    id: "1235",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a1 = getRandomInt(3, 6);
    const b1_actual = a1 * getRandomInt(3, 5);
    // For no solution the lines must be parallel: a1/(-a1) = -b1/h => h = b1.
    // Adding the two equations then gives 0 = c1 + c2, a contradiction (both
    // positive), so the system is inconsistent (no solution).
    const h_actual = b1_actual;
    const c1 = getRandomInt(3, 8);
    const c2 = getRandomInt(1, 5);

    const eq1 = `${a1}x = ${b1_actual}y + ${c1}`;
    const eq2 = `-${a1}x + hy = ${c2}`;

    // Distractors: every value below yields a UNIQUE solution (determinant
    // a1*(h - b1) != 0), so none is the correct no-solution value h = b1.
    const distA = -b1_actual;   // sign error
    const distB = 0;            // dropped the y-term
    const distC = 2 * b1_actual; // doubled the coefficient

    const optionsData = [
      { text: distA.toString(), isCorrect: false },
      { text: distB.toString(), isCorrect: false },
      { text: distC.toString(), isCorrect: false },
      { text: h_actual.toString(), isCorrect: true }
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
      explanation: `Choice ${correctLetter} is correct. Rewriting in standard form: $${a1}x - ${b1_actual}y = ${c1}$ and $-${a1}x + hy = ${c2}$. A system has no solution when the two lines are parallel and distinct, which requires the ratio of the x-coefficients to equal the ratio of the y-coefficients: $\\frac{${a1}}{-${a1}} = \\frac{-${b1_actual}}{h}$. This gives $-1 = \\frac{-${b1_actual}}{h}$, so $h = ${h_actual}$. With this value, adding the two equations eliminates both variables and leaves $0 = ${c1 + c2}$, a contradiction, confirming there is no solution. For any other value of $h$ the lines intersect at exactly one point. Choice ${incorrectOptions[0].letter} is incorrect. If $h = ${incorrectOptions[0].text}$, the determinant is nonzero and the system has one solution. Choice ${incorrectOptions[1].letter} is incorrect. If $h = ${incorrectOptions[1].text}$, the system has one solution. Choice ${incorrectOptions[2].letter} is incorrect. If $h = ${incorrectOptions[2].text}$, the system has one solution.`
    };
  }
};
