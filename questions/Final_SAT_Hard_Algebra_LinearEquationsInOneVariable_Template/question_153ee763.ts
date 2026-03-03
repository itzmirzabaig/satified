import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 153ee763
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-3, 21, 84 (coefficients)]
 * - Difficulty factors: [No solution condition with parameter p]
 * - Distractor patterns: [A: 0 (makes solvable), C: 4/3, D: 4 (both give unique solutions)]
 * - Constraints: [Coefficient of x must be 0, constant must be non-zero]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_153ee763 = {
  metadata: {
    // id: "153ee763",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation of form: ax + bpx = c where a + bp = 0 for no solution
    // Actually: -3x + 21px = 84 → x(-3 + 21p) = 84
    // For no solution: -3 + 21p = 0, so p = 3/21 = 1/7
    
    const a = getRandomInt(-8, -2); // Negative coefficient
    const b = getRandomInt(10, 30); // Coefficient with p
    const c = getRandomInt(40, 100); // Non-zero constant
    
    // p must equal -a/b
    const pNum = -a;
    const pDenom = b;
    
    // Simplify
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const divisor = gcd(pNum, pDenom);
    const finalPNum = pNum / divisor;
    const finalPDenom = pDenom / divisor;
    
    // Generate distractor values
    const distractorA = 0;
    const distractorCNum = getRandomInt(3, 8);
    const distractorCDenom = getRandomInt(2, 5);
    const distractorD = getRandomInt(3, 8);
    
    const correctP = finalPDenom === 1 ? finalPNum.toString() : `\\\\frac{${finalPNum}}{${finalPDenom}}`;
    const distractorC = `\\\\frac{${distractorCNum}}{${distractorCDenom}}`;
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "if $p = 0$, the equation becomes $${a}x = ${c}$, which gives $x = ${c/a}$, a unique solution" },
      { text: correctP, isCorrect: true },
      { text: distractorC, isCorrect: false, reason: "this gives a non-zero coefficient for $x$, resulting in a unique solution" },
      { text: distractorD.toString(), isCorrect: false, reason: "this gives a non-zero coefficient for $x$, resulting in a unique solution" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `To determine for what value of $p$ the equation has no solution, we first need to simplify the given equation by factoring out $x$. The given equation is:
$$${a}x + ${b}px = ${c}$$

Factor out $x$ on the left side:
$$x(${a} + ${b}p) = ${c}$$

A linear equation of the form $ax = b$ has:
- A unique solution if $a \\\\neq 0$.
- No solution if $a = 0$ and $b \\\\neq 0$.
- Infinitely many solutions if $a = 0$ and $b = 0$.

Here, our coefficient $a$ is $(${a} + ${b}p)$ and our constant $b$ is ${c}. Since ${c} \\\\neq 0$, the equation will have no solution if and only if the coefficient of $x$ is equal to zero. So, we set the coefficient equal to zero:
$$${a} + ${b}p = 0$$

Add $${Math.abs(a)}$ to both sides:
$$${b}p = ${-a}$$

Divide both sides by ${b}:
$$p = \\\\frac{${-a}}{${b}} = ${correctP}$$

Therefore, if $p = ${correctP}$, the equation becomes $0 \\\\cdot x = ${c}$, or $0 = ${c}$, which is a false statement. This means the equation has no solution.

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$$${a}x + ${b}px = ${c}$$ In the given equation, $p$ is a constant. The equation has no solution. What is the value of $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: finalPDenom === 1 ? finalPNum.toString() : `${finalPNum}/${finalPDenom}`,
      explanation: explanation
    };
  }
};

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

// File: generators/linear-equations-in-one-variable/aee9fd2d.ts