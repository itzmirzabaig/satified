import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 74473be4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [four quadratics, checking discriminants]
 * - Difficulty factors: [Discriminant analysis for all options, identifying negative discriminant]
 * - Distractor patterns: [A: discriminant>0, B: discriminant=0, C: discriminant>0, D: discriminant<0]
 * - Constraints: [Only one option has negative discriminant]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_74473be4 = {
  metadata: {
    // id: "74473be4",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Create four quadratics where only one has discriminant < 0
    
    // Option A: discriminant > 0 (two solutions)
    const a1 = 1;
    const b1 = getRandomInt(10, 20);
    const c1 = -1 * getRandomInt(40, 60); // Negative for positive discriminant
    
    // Option B: discriminant = 0 (one solution)
    const a2 = 1;
    const b2 = getRandomInt(10, 20) * 2; // Even for clean division
    const c2 = (b2 * b2) / 4; // Makes discriminant 0
    
    // Option C: discriminant > 0 (two solutions)
    const a3 = 5;
    const b3 = -1 * getRandomInt(10, 20);
    const c3 = -1 * getRandomInt(40, 60);
    
    // Option D: discriminant < 0 (no solutions) - THE CORRECT ANSWER
    const a4 = 5;
    const b4 = -1 * getRandomInt(10, 20);
    const c4 = getRandomInt(40, 60); // Positive c with negative b and positive a gives negative discriminant
    
    // Verify D has negative discriminant
    const discD = b4 * b4 - 4 * a4 * c4;
    
    // STEP 2: Create options (D is correct)
    const optionsData = [
      { text: `$x^2+${b1}x${c1}=0$`, isCorrect: false, reason: "has discriminant $${b1*b1 - 4*a1*c1}>0$, so it has two real solutions" },
      { text: `$x^2${b2 >= 0 ? '+' : ''}${b2}x+${c2}=0$`, isCorrect: false, reason: "has discriminant $0$, so it has exactly one real solution" },
      { text: `$${a3}x^2${b3}x${c3}=0$`, isCorrect: false, reason: "has discriminant $${b3*b3 - 4*a3*c3}>0$, so it has two real solutions" },
      { text: `$${a4}x^2${b4}x+${c4}=0$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. A quadratic has no real solutions when its discriminant $b^2-4ac<0$. For $${a4}x^2${b4}x+${c4}=0$, the discriminant is $(${b4})^2-4(${a4})(${c4})=${b4*b4}-${4*a4*c4}=${discD}<0$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `Which quadratic equation has no real solutions?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 7bd10ef3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [missing equation, likely 2x²-4x=t or similar, discriminant<0 condition]
 * - Difficulty factors: [Determining parameter range for no real solutions]
 * - Distractor patterns: [Only one option satisfies t < -2]
 * - Constraints: [Equation not shown, inferred from pattern]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/7bd10ef3.ts