import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 17d0e87d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [literal equation with square root, solve for w]
 * - Difficulty factors: [Multiple algebraic steps, isolate variable, simplify fraction]
 * - Distractor patterns: [A:sqrt(x/y)-19, B:wrong fraction simplification, C:squared instead of sqrt, D:double wrong]
 * - Constraints: [Two variables in equation, must isolate w through multiple steps]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_17d0e87d = {
  metadata: {
    // id: "17d0e87d",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: 28x/(14y) = 2√(w+19), solve for w
    // Pattern: ax/(by) = c√(w+d), solve for w
    
    const a = 2 * getRandomInt(10, 20); // Numerator coefficient
    const b = getRandomInt(5, 15); // Denominator coefficient
    const c = 2; // Coefficient of sqrt (keep simple)
    const d = getRandomInt(15, 25); // Constant inside sqrt
    
    // Simplify a/b = (2*something)/b, keep it clean
    
    // Equation: (a*x)/(b*y) = c*√(w+d)
    // Solve: √(w+d) = ax/(cby) = ax/(2by)
    // w+d = (ax/(2by))²
    // w = (ax/(2by))² - d
    
    // Wait original has 28x/(14y) = 2√(w+19)
    // √(w+19) = 14x/(14y) = x/y
    // w = (x/y)² - 19
    
    // So pattern: ax/(by) = c√(w+d) where a/b simplifies nicely
    
    const num = a / 2; // The simplified numerator
    const den = b; // Denominator
    
    // Correct answer: w = (num*x/(den*y))² - d = (num²*x²)/(den²*y²) - d
    // But that's not matching options... let me check original
    
    // Original options: C is w=(x/y)²-19, which matches my derivation
    
    // STEP 2: Create options
    // Need to make sure the simplification gives clean (x/y) form
    
    // Use a = 2b so that a/(2b) = 1
    const finalA = 2 * b; // So a/(2b) = 1
    
    const correctAnswer = `\\left(\\frac{x}{y}\\right)^2-${d}`;
    
    // Distractor A: sqrt(x/y) - d
    const distractorA = `\\sqrt{\\frac{x}{y}}-${d}`;
    // Distractor B: wrong coefficient
    const distractorB = `\\sqrt{\\frac{${finalA}x}{${2*b}y}}-${d}`;
    // Distractor D: double wrong with coefficient
    const distractorD = `\\left(\\frac{${finalA}x}{${2*b}y}\\right)^2-${d}`;
    
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: "incorrectly uses square root instead of squaring" },
      { text: `$${distractorB}$`, isCorrect: false, reason: "does not simplify the fraction inside the square root" },
      { text: `$${correctAnswer}$`, isCorrect: true },
      { text: `$${distractorD}$`, isCorrect: false, reason: "does not simplify the fraction before squaring" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Dividing by $${c}$: $\\frac{${finalA}x}{${2*b}y}=\\sqrt{w+${d}}$. Simplifying: $\\frac{x}{y}=\\sqrt{w+${d}}$. Squaring: $\\left(\\frac{x}{y}\\right)^2=w+${d}$. Thus $w=\\left(\\frac{x}{y}\\right)^2-${d}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$\\frac{${finalA}x}{${b}y} = ${c}\\sqrt{w+${d}}$\n\nThe given equation relates the distinct positive real numbers $w$, $x$, and $y$. Which equation correctly expresses $w$ in terms of $x$ and $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 66bce0c1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radical equation sqrt(2x+6)+4=x+3]
 * - Difficulty factors: [Isolate radical, square both sides, check extraneous solutions, set notation]
 * - Distractor patterns: [A: includes extraneous, B: only valid, C: includes both, D: includes extra wrong]
 * - Constraints: [Must check solutions in original equation, return as set]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/66bce0c1.ts