import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1474
 * 
 * ANALYSIS:
 * - Context: Literal Equations.
 * - Task: Solve for variable x in P = ax + b.
 * - Logic: x = (P - b) / a.
 */
export const generator_1474 = {
  metadata: {
    id: "1474",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const a = getRandomInt(2, 9);
    const b = getRandomInt(2, 9);
    
    // Variable names (e.g., P = 14x + 5)
    const yVar = 'P';
    const xVar = 'n';
    
    // Equation: P = an + b
    const equation = `${yVar} = ${a}${xVar} + ${b}`;
    
    // Solution: n = (P - b) / a
    const correctSol = `\\frac{${yVar} - ${b}}{${a}}`;
    
    // Distractors
    const d1 = `\\frac{${yVar} + ${b}}{${a}}`; // Sign error
    const d2 = `\\frac{${yVar}}{${a}} - ${b}`; // Division error
    const d3 = `${a}${yVar} - ${b}`; // Wrong operation
    
    const optionsData = [
      { text: correctSol, isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The equation $${equation}$ gives the value of $${yVar}$ in terms of $${xVar}$. Which of the following gives the value of $${xVar}$ in terms of $${yVar}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
To solve for $${xVar}$, isolate it on one side of the equation:

1.  Start with the given equation:
    $${yVar} = ${a}${xVar} + ${b}$

2.  Subtract ${b} from both sides:
    $${yVar} - ${b} = ${a}${xVar}$

3.  Divide both sides by ${a}:
    $\\frac{${yVar} - ${b}}{${a}} = ${xVar}$

Therefore, $${xVar} = ${correctSol}$.`
    };
  }
};
