import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: aee9fd2d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [6, 3, 13 (small integers)]
 * - Difficulty factors: [Recognizing x+6=0 is the only solution, value is 0]
 * - Distractor patterns: [B contains 0, others don't]
 * - Constraints: [x+6 must equal 0]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_aee9fd2d = {
  metadata: {
    // id: "aee9fd2d",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation of form (x+a)/b = (x+a)/c where b ≠ c
    // This forces x+a = 0, so x = -a
    
    let valid = false;
    let a: number, b: number, c: number;
    
    while (!valid) {
      a = getRandomInt(3, 10);
      b = getRandomInt(2, 5);
      c = getRandomInt(6, 15);
      
      // Ensure b ≠ c
      if (b !== c) {
        valid = true;
      }
    }
    
    // Value of x+a is 0, which is in range (-2, 2) i.e., option B
    // Generate ranges for options
    const range1Low = -a - 3;
    const range1High = -a - 1;
    const range3Low = 2;
    const range3High = 7;
    const range4Low = 8;
    const range4High = 13;
    
    const optionsData = [
      { text: `$${range1Low}$ and $${range1High}$`, isCorrect: false },
      { text: `$-2$ and $2$`, isCorrect: true },
      { text: `$${range3Low}$ and $${range3High}$`, isCorrect: false },
      { text: `$${range4Low}$ and $${range4High}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // Fixed: Changed \\\\frac to \\frac for proper LaTeX rendering
    const explanation = `To solve the given equation $\\frac{x+${a}}{${b}} = \\frac{x+${a}}{${c}}$, let's consider the term $x+${a}$ as a single entity, say $y$. So, the equation becomes $\\frac{y}{${b}} = \\frac{y}{${c}}$.

Multiply both sides by the least common multiple of the denominators, which is ${b * c}:
$${c}y = ${b}y$

Subtract $${b}y$ from both sides:
$${c - b}y = 0$

Divide by ${c - b}:
$y = 0$

Substituting back $x+${a}$ for $y$, we find that the value of $x+${a}$ is $0$.

Now we check which interval $0$ falls into:
A. $${range1Low}$ and $${range1High}$: $0$ is not in this range.
B. $-2$ and $2$: $0$ is between $-2$ and $2$.
C. $${range3Low}$ and $${range3High}$: $0$ is not in this range.
D. $${range4Low}$ and $${range4High}$: $0$ is not in this range.

Therefore, the correct option is ${correctLetter}.`;
    
    return {
      // Fixed: Changed \\\\frac to \\frac
      questionText: `If $\\frac{x+${a}}{${b}} = \\frac{x+${a}}{${c}}$, the value of $x+${a}$ is between which of the following pairs of values?`,
      figureCode: null,
      // Fixed: Return string array instead of object array
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "-2 and 2",
      explanation: explanation
    };
  }
};

/**
 * Question ID: 0393ba15
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-49, -98 (coefficients)]
 * - Difficulty factors: [Simplifying to find exactly one solution]
 * - Distractor patterns: [A: zero (if contradictory), C: exactly two (quadratic confusion), D: infinitely many (if identity)]
 * - Constraints: [Must simplify to x = 0]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */