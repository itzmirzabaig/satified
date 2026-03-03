import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 77c0cced
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system y=2x²-21x+64 and y=3x+a, one intersection, find x]
 * - Difficulty factors: [System with parabola and line, discriminant=0, solve for x]
 * - Distractor patterns: [A: -8, B: -6, C: 6/correct, D: 8]
 * - Constraints: [Discriminant=0 gives condition on a, then solve for x]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_77c0cced = {
  metadata: {
    // id: "77c0cced",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: y = ax² + bx + c, y = dx + e, one intersection, find x
    
    // For one intersection, after substitution: ax² + (b-d)x + (c-e) = 0
    // Discriminant: (b-d)² - 4a(c-e) = 0
    
    const a = 2; // Fixed for simplicity
    const b = -1 * getRandomInt(15, 25); // Like -21
    const d = getRandomInt(2, 5); // Like 3
    
    // From discriminant = 0: (b-d)² = 4a(c-e)
    // Let e be the parameter, then c-e = (b-d)²/(4a)
    
    const diff = b - d; // Negative number
    const cMinusE = (diff * diff) / (4 * a);
    
    // Choose c, then e = c - cMinusE
    const c = getRandomInt(50, 80);
    const e = Math.round(c - cMinusE);
    
    // The x-value at intersection: x = (d-b)/(2a) = -(b-d)/(2a) = -diff/(2a)
    const xValue = -diff / (2 * a);
    
    // STEP 2: Create options
    const distractorA = -xValue - 2; // Approximately -8 when x=6
    const distractorB = -xValue; // Negative of correct
    const distractorD = xValue + 2; // Approximately 8
    
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: "results from a sign error in the quadratic formula" },
      { text: `$${distractorB}$`, isCorrect: false, reason: "results from using the wrong sign for the linear coefficient" },
      { text: `$${xValue}$`, isCorrect: true },
      { text: `$${distractorD}$`, isCorrect: false, reason: "results from an arithmetic error in completing the square" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Setting equal: $${a}x^2+${b}x+${c}=${d}x+a$, which gives $${a}x^2+${b-d}x+${c}-a=0$. For one solution, the discriminant is 0: $(${b-d})^2-4(${a})(${c}-a)=0$. The solution is $x=\\frac{${d-b}}{${2*a}}=${xValue}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$y = ${a}x^2 ${b}x + ${c}$\n$y = ${d}x + a$\n\nIn the given system of equations, $a$ is a constant. The graphs of the equations in the given system intersect at exactly one point, $(x, y)$, in the $xy$-plane. What is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: ff2e5c76
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic x²-40x-10=0, sum of solutions = 40]
 * - Difficulty factors: [Vieta's formula, sum = -b/a]
 * - Distractor patterns: [A: 0, B: 5, C: 10, D: 40/correct]
 * - Constraints: [Use sum of roots formula]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/ff2e5c76.ts