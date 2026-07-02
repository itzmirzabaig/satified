import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1477
 * 
 * ANALYSIS:
 * - Context: Interpreting Linear Models (e.g., Score Calculation).
 * - Equation: Total = Ax + By.
 * - Variables: x, y are counts of items (e.g., successful attempts).
 * - Coefficients: A, B are values/points per item.
 * - Task: Interpret difference (A - B) or just coefficients.
 */
export const generator_1477 = {
  metadata: {
    id: "1477",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const valA = getRandomInt(70, 90); // e.g. 80
    const valB = getRandomInt(80, 100); // e.g. 90
    // Ensure they are distinct
    if (valA === valB) return generator_1477.generate();
    
    const diff = Math.abs(valB - valA);
    const total = getRandomInt(1000, 1200);
    
    // Context: A test or game with two types of tasks.
    
    // Question: How many more points is a Type B task worth than a Type A task?
    // Answer: |valB - valA|.
    
    // 2. Options
    const optionsData = [
      { text: diff.toString(), isCorrect: true },
      { text: valA.toString(), isCorrect: false },
      { text: valB.toString(), isCorrect: false },
      { text: (valA + valB).toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `In a certain competition, a participant earns ${valA} points for each successful Type A task and ${valB} points for each successful Type B task. The total score, $S$, is given by the equation $S = ${valA}x + ${valB}y$, where $x$ is the number of successful Type A tasks and $y$ is the number of successful Type B tasks. How many more points is a successful Type B task worth than a successful Type A task?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
The coefficient of $x$ (${valA}) represents the points awarded per Type A task.
The coefficient of $y$ (${valB}) represents the points awarded per Type B task.

To find how many more points a Type B task is worth, subtract the value of Type A from Type B:
$${valB} - ${valA} = ${diff}$.`
    };
  }
};
