import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_0393ba15 = {
  metadata: {
    // id: "0393ba15",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation of form ax = bx where a ≠ b but solution is x = 0
    // Actually -49x = -98x → 49x = 0 → x = 0, exactly one solution
    
    const factor = getRandomInt(20, 80);
    const a = -factor;
    const b = -2 * factor;
    
    const optionsData = [
      { text: "Zero", isCorrect: false, reason: "this would be correct if the equation resulted in a contradiction, such as $5 = 0$" },
      { text: "Exactly one", isCorrect: true },
      { text: "Exactly two", isCorrect: false, reason: "linear equations of the form $ax + b = cx + d$ (where $a \\\\neq c$) will always have exactly one solution; they cannot have two solutions" },
      { text: "Infinitely many", isCorrect: false, reason: "this would be correct if the equation simplified to an identity, such as $5x = 5x$ or $0 = 0$" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `To find the number of solutions for the equation $${a}x = ${b}x$, we need to solve for $x$.

1. **Set up the equation:**
   $${a}x = ${b}x$

2. **Move all terms involving $x$ to one side.** We can add $${-b}x$ to both sides of the equation:
   $${a}x + ${-b}x = ${b}x + ${-b}x$
   $${a - b}x = 0$

3. **Solve for $x$.** Divide both sides by $${a - b}$:
   $x = \\\\frac{0}{${a - b}}$
   $x = 0$

Since we found a single, specific value for $x$ ($x = 0$) that satisfies the equation, there is exactly one solution.

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$${a}x = ${b}x$\nHow many solutions does the given equation have?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Exactly one",
      explanation: explanation
    };
  }
};

/**
 * Question ID: 4771a64a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5, 7, 2, 4, 16, 8 (small integers)]
 * - Difficulty factors: [Substitution method for repeated expression]
 * - Distractor patterns: [N/A - fill-in-blank]
 * - Constraints: [Answer must be integer]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 */

// File: generators/linear-equations-in-one-variable/4771a64a.ts