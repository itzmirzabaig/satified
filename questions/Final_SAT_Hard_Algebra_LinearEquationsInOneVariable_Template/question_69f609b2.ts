import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 69f609b2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [12, 3, 3, 12 (small integers)]
 * - Difficulty factors: [Exactly one solution identification]
 * - Distractor patterns: [B: exactly two (quadratic confusion), C: infinitely many, D: zero]
 * - Constraints: [Equation must have unique solution]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_69f609b2 = {
  metadata: {
    // id: "69f609b2",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation with exactly one solution
    // Form: a(x - b) = -c(x + d) where a ≠ c (coefficients differ after distribution)
    
    let valid = false;
    let a: number, c: number, b: number, d: number, solution: number;
    
    while (!valid) {
      a = getRandomInt(5, 15);
      c = getRandomInt(3, 10);
      b = getRandomInt(3, 12);
      d = getRandomInt(8, 15);
      
      // Ensure coefficients don't match: a ≠ c
      if (a !== c) {
        // Calculate solution for verification
        // a(x - b) = -c(x + d)
        // ax - ab = -cx - cd
        // ax + cx = ab - cd
        // x(a + c) = ab - cd
        // x = (ab - cd)/(a + c)
        solution = (a * b - c * d) / (a + c);
        valid = true;
      }
    }
    
    const optionsData = [
      { text: "Zero", isCorrect: false, reason: "this would occur when the equation simplifies to a contradiction like $0 = 5$" },
      { text: "Exactly one", isCorrect: true },
      { text: "Exactly two", isCorrect: false, reason: "linear equations cannot have exactly two solutions; this would require a quadratic equation" },
      { text: "Infinitely many", isCorrect: false, reason: "this would occur when the equation simplifies to an identity like $0 = 0$" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `To find the number of solutions, we can solve the equation for $x$.
$${a}(x - ${b}) = -${c}(x + ${d})$

First, distribute the constants on both sides:
$${a}x - ${a * b} = -${c}x - ${c * d}$

Next, add $${c}x$ to both sides to group the $x$ terms:
$${a + c}x - ${a * b} = -${c * d}$

Then, add $${a * b}$ to both sides:
$${a + c}x = ${a * b - c * d}$

Divide by $${a + c}$:
$x = ${solution}$

Since we found a single, distinct value for $x$, the equation has exactly one solution.

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `How many solutions does the equation $${a}(x - ${b}) = -${c}(x + ${d})$ have?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Exactly one",
      explanation: explanation
    };
  }
};

/**
 * Question ID: 0cb57740
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [30 sides, 8, 3, 5 (multiplier), 6 (constant) - mixed ranges]
 * - Difficulty factors: [Polygon side counting equation, same structure as frying pan problems]
 * - Distractor patterns: [A: forgets n for 3cm, B: correct, C: multiplies lengths, D: calculates perimeter]
 * - Constraints: [Total must be 30 sides]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/linear-equations-in-one-variable/0cb57740.ts