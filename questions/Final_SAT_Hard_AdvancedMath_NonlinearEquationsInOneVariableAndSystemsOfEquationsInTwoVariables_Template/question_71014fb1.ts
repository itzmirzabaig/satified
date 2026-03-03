import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 71014fb1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [(x-1)²=-4]
 * - Difficulty factors: [Square of real number cannot be negative]
 * - Distractor patterns: [A: one solution, B: two solutions, C: infinite, D: zero/correct]
 * - Constraints: [No real solutions since left side ≥ 0, right side < 0]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_71014fb1 = {
  metadata: {
    // id: "71014fb1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: (x-h)² = -k where k > 0
    
    const h = getRandomInt(1, 5);
    const k = getRandomInt(2, 10);
    
    // STEP 2: Create options (D is correct - zero solutions)
    const optionsData = [
      { text: `Exactly one`, isCorrect: false, reason: "is incorrect; this would require the discriminant to equal 0" },
      { text: `Exactly two`, isCorrect: false, reason: "is incorrect; this would require a positive number on the right side" },
      { text: `Infinitely many`, isCorrect: false, reason: "is incorrect; this equation is not an identity" },
      { text: `Zero`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The expression $(x-${h})^2$ represents the square of a real number, which must be non-negative (greater than or equal to zero) for all real values of $x$. However, the equation states that $(x-${h})^2=-${k}$, and $-${k}$ is negative. Since a non-negative number cannot equal a negative number, there are no real values of $x$ that satisfy this equation.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `How many distinct real solutions does the given equation have?\n\n$(x-${h})^2=-${k}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 4dc5c6f9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [line y=18, parabola y=-3(x-18)²+15, vertex at y=15]
 * - Difficulty factors: [Visual/graphical analysis, horizontal line above vertex]
 * - Distractor patterns: [A: one, B: two, C: infinite, D: zero/correct]
 * - Constraints: [Line above parabola maximum means no intersection]
 * - Question type: [Multiple choice text with figure]
 * - Figure generation: [Mafs graph showing line above parabola]
 */

// File: generators/hard/advanced_math/4dc5c6f9.ts