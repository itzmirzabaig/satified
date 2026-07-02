import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1478
 * 
 * ANALYSIS:
 * - Context: Parallel Lines.
 * - Task: Identify slope of a line parallel to a given equation.
 * - Equation: y = mx + b or Ax + By = C.
 * - Logic: Parallel lines have equal slopes.
 */
export const generator_1478 = {
  metadata: {
    id: "1478",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const mNum = getRandomInt(2, 9);
    const mDen = getRandomInt(2, 9);
    // Ensure reduced fraction isn't always needed for this logic, but cleaner numbers help.
    // Let's just use raw ints for now.
    
    const intercept = getRandomInt(1, 10);
    
    // Equation: y = (num/den)x + b
    const equation = `y = \\frac{${mNum}}{${mDen}}x + ${intercept}`;
    const slopeStr = `\\frac{${mNum}}{${mDen}}`;
    
    // 2. Options
    const correctSlope = slopeStr;
    const d1 = `-\\frac{${mDen}}{${mNum}}`; // Perpendicular
    const d2 = `\\frac{${mDen}}{${mNum}}`; // Reciprocal
    const d3 = `-${slopeStr}`; // Negative slope

    const optionsData = [
      { text: correctSlope, isCorrect: true },
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
      questionText: `Which of the following is the slope of a line that is parallel to the line with equation $${equation}$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
Parallel lines have equal slopes.
The given equation is in slope-intercept form $y = mx + b$, where $m$ is the slope.
For the equation $${equation}$, the slope is $${slopeStr}$.
      
Therefore, any line parallel to this line must also have a slope of $${slopeStr}$.`
    };
  }
};
