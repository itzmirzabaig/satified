import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1162
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [12, 3, 3, 12 (small integers)]
 * - Difficulty factors: [Exactly one solution identification]
 * - Distractor patterns: [B: exactly two (quadratic confusion), C: infinitely many, D: zero]
 * - Constraints: [Equation must have unique solution]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1162 = {
  metadata: {
    id: "1162",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Form: a(x - b) = -c(x + d).  Distributing and collecting x gives
    //   (a + c)x = ab - cd   =>   x = (ab - cd)/(a + c).
    // Since a >= 5 and c >= 3, (a + c) is always positive, so the equation
    // ALWAYS has exactly one solution — the correct answer never changes.
    //
    // We build the coefficients ANSWER-FIRST so the solution x is a clean
    // integer (no float artifact in the worked explanation), with a guarantee
    // rather than a probabilistic retry:
    //   pick integer solution x, coefficient a, and coefficient c;
    //   choose d so that (x + d) is a multiple of a  =>  a | c(x + d),
    //   which makes b = ((a + c)x + c*d) / a an integer for ANY c.
    // A small range-only retry keeps b in a natural, positive range.
    let a = 0, b = 0, c = 0, d = 0, solution = 0;
    let tries = 0;
    do {
      solution = getRandomInt(-6, 6);           // the single solution x
      a = getRandomInt(5, 15);
      c = getRandomInt(3, 10);
      // smallest d >= 8 with d ≡ -x (mod a); window [8, 8+a-1] ⊆ [8, 22]
      const base = ((-solution - 8) % a + a) % a;
      d = 8 + base;
      // b forced by the target solution; guaranteed integer by the d choice
      b = ((a + c) * solution + c * d) / a;
      tries++;
    } while ((b < 2 || b > 40 || !Number.isInteger(b)) && tries < 50);
    
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
