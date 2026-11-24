import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1127
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 2, coefficient: -8, constant: 22]
 * - Difficulty factors: [Exponential function, y-intercept evaluation]
 * - Distractor patterns: [A: (0,14) correct, B: (0,2) sign error, C: (0,22) forgot coefficient, D: (0,-8) just coefficient]
 * - Constraints: [Clean integer result]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1127 = {
  metadata: {
    id: "1127",
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
    
    // Before: wrong choices had no reasons and the explanation skipped b^0 = 1.
    // Each wrong choice is a real slip when evaluating f(0).
    const optionsData = [
      { text: `$(0, ${distractor1})$`, isCorrect: true, reason: '' },
      { text: `$(0, ${distractor2})$`, isCorrect: false, reason: `$${distractor2}$ results from adding $${-a}$ to $${c}$ instead of adding $${a}$, which ignores the negative sign of the coefficient` },
      { text: `$(0, ${distractor3})$`, isCorrect: false, reason: `$${distractor3}$ is the constant term alone, which results from treating $(${b})^0$ as $0$ so that the first term vanishes` },
      { text: `$(0, ${distractor4})$`, isCorrect: false, reason: `$${distractor4}$ is the coefficient alone, which results from leaving out the added constant $${c}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${a}(${b})^x + ${c}$. What is the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$(0, ${yIntercept})$`,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept occurs where $x=0$. Since $(${b})^0=1$, $f(0)=${a}(${b})^0+${c}=${a}(1)+${c}=${yIntercept}$, so the $y$-intercept is $(0, ${yIntercept})$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
