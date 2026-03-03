import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 2c5c22d0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system in table: y=x²+3x-7 and 5x-y=8]
 * - Difficulty factors: [System with table presentation, substitution, discriminant]
 * - Distractor patterns: [A: 4, B: 2, C: 1/correct, D: 0]
 * - Constraints: [Table format, substitution gives one solution (discriminant=0)]
 * - Question type: [Multiple choice text with table]
 * - Figure generation: [HTML table]
 */

export const generator_2c5c22d0 = {
  metadata: {
    // id: "2c5c22d0",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: y = x² + bx + c, dx - y = e, find number of solutions
    
    // We want exactly one solution, so discriminant = 0 after substitution
    
    const b = getRandomInt(2, 6);
    const d = getRandomInt(4, 8);
    const root = getRandomInt(1, 5); // The single solution x-value
    
    // From linear: y = dx - e
    // Substitute: dx - e = x² + bx + c
    // x² + (b-d)x + (c+e) = 0
    
    // For one solution: (b-d)² - 4(c+e) = 0
    // And x = (d-b)/2 = root, so d - b = 2*root
    
    const finalD = b + 2 * root;
    const cPlusE = ((b - finalD) * (b - finalD)) / 4;
    
    // Choose c, then e = cPlusE - c
    const c = getRandomInt(-10, -3);
    const e = cPlusE - c;
    
    // STEP 2: Create table code
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid #ccc; padding: 8px;">System of Equations</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">$y = x^2 + ${b}x ${c}$</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">$${finalD}x - y = ${e}$</td>
    </tr>
  </tbody>
</table>`;

    // STEP 3: Create options
    const optionsData = [
      { text: `There are exactly 4 solutions.`, isCorrect: false, reason: "is incorrect; a quadratic and linear equation cannot intersect more than twice" },
      { text: `There are exactly 2 solutions.`, isCorrect: false, reason: "is incorrect; this would require a positive discriminant" },
      { text: `There is exactly 1 solution.`, isCorrect: true },
      { text: `There are no solutions.`, isCorrect: false, reason: "is incorrect; this would require a negative discriminant" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. From the second equation, $y=${finalD}x-${e}$. Substituting: $${finalD}x-${e}=x^2+${b}x+${c}$, giving $x^2+${b-finalD}x+${c+e}=0$. The discriminant is $(${b-finalD})^2-4(${c+e})=0$, so there is exactly one solution.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `How many solutions are there to the system of equations above?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: fc3dfa26
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rational equation with denominators x²-9, solution x=1/2]
 * - Difficulty factors: [Combine fractions, factor denominator, check extraneous]
 * - Distractor patterns: [A: -3 (extraneous), B: -1/2, C: 1/2/correct, D: 3 (extraneous)]
 * - Constraints: [x²-9 = (x-3)(x+3), check for values making denominator zero]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/fc3dfa26.ts