import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 12e7faf8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic divided by linear, simplifying to linear]
 * - Difficulty factors: [Factoring numerator, canceling common factors, finding a+d]
 * - Distractor patterns: [Wrong factorization, not canceling, calculation errors in a+d]
 * - Constraints: [x ≠ -7, a and d are integers]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_12e7faf8 = {
  metadata: {
    // id: "12e7faf8",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate the rational expression
    const root = getRandomInt(3, 8);
    const otherRoot = getRandomInt(1, 5);
    
    // Quadratic: (x + root)(x - otherRoot) = x² + (root - otherRoot)x - root*otherRoot
    const linearCoeff = root - otherRoot;
    const constTerm = -root * otherRoot;
    
    // When divided by (x + root), we get (x - otherRoot)
    const a = 1;
    const d = -otherRoot;
    const correctSum = a + d;
    
    // STEP 2: Create options
    const optionsData = [
      { text: (correctSum - 6).toString(), isCorrect: false, reason: "may result from using d = -7 instead of the correct value" },
      { text: (-otherRoot).toString(), isCorrect: false, reason: "may result from finding only d and ignoring a" },
      { text: (correctSum).toString(), isCorrect: true },
      { text: "1", isCorrect: false, reason: "may result from an error in signs when factoring" }
    ];
    
    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Question text
    const questionText = `The equation $\\frac{x^{2}${linearCoeff >= 0 ? '+' : ''}${linearCoeff}x${constTerm}}{x+${root}}=ax+d$ is true for all $x \\neq -${root}$, where $a$ and $d$ are integers. What is the value of $a+d$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. Factor the numerator:
$$x^{2}${linearCoeff >= 0 ? '+' : ''}${linearCoeff}x${constTerm}$$

Find two numbers that multiply to ${constTerm} and add to ${linearCoeff}:
- The numbers are ${root} and ${-otherRoot}

So: $x^{2}${linearCoeff >= 0 ? '+' : ''}${linearCoeff}x${constTerm} = (x+${root})(x-${otherRoot})$

Simplify the rational expression (since $x \\neq -${root}$):
$$\\frac{(x+${root})(x-${otherRoot})}{x+${root}} = x-${otherRoot}$$

Therefore, $ax+d = x-${otherRoot}$, so $a = 1$ and $d = -${otherRoot}$.
$$a+d = 1 + (-${otherRoot}) = ${correctSum}$$

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctSum.toString(),
      explanation: explanation
    };
  }
};

/**
 * Question ID: 5240
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic divided by linear, polynomial long division]
 * - Difficulty factors: [Polynomial long division, remainder handling, formatting result]
 * - Distractor patterns: [Wrong quotient, wrong remainder, sign errors]
 * - Constraints: [Must perform division correctly]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */