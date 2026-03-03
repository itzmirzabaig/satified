import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 27f5fff3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table values, third equation x+4y=-16, answer: A (zero)]
 * - Difficulty factors: [Three equations, checking consistency]
 * - Distractor patterns: [One solution, two solutions, infinite]
 * - Constraints: [First two must intersect at point not on third line]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_27f5fff3 = {
  metadata: {
    // id: "27f5fff3",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;
    
    while (attempts < maxAttempts && !result) {
      attempts++;
      
      const slope_num = getRandomInt(-3, -1);
      const slope_den = 2;
      const intercept = getRandomInt(3, 6);
      
      const x_vals = [-10, -8, -4, 0, 4, 8, 10];
      const y_vals = x_vals.map(x => slope_num * x / slope_den + intercept);
      
      const c_third = getRandomInt(-20, 20);
      const check = 4 * intercept;
      
      if (Math.abs(check - c_third) < 1) {
        continue;
      }
      
      const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">x</th>
      <th style="border: 1px solid currentColor; padding: 8px;">y</th>
    </tr>
  </thead>
  <tbody>
    ${x_vals.map((x, i) => `
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y_vals[i].toFixed(1)}</td>
    </tr>`).join('')}
  </tbody>
</table>`;
      
      const thirdEq = `x + 4y = ${c_third}`;
      
      const optionsData = [
        { text: "Zero", isCorrect: true },
        { text: "Exactly one", isCorrect: false, reason: "would require all three lines to intersect at a single point" },
        { text: "Exactly two", isCorrect: false, reason: "is impossible for a system of linear equations" },
        { text: "Infinitely many", isCorrect: false, reason: "would require all three equations to represent the same line" }
      ];
      
      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));
      
      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;
      const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
      
      result = {
        questionText: `If a new graph of three linear equations is created using the system of equations shown and the equation $${thirdEq}$, how many solutions $(x,y)$ will the resulting system of three equations have?`,
        figureCode: tableCode,
        options: shuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: "Zero",
        explanation: `Choice ${correctLetter} is correct. The table represents a line with equation $y = \\frac{${slope_num}}{${slope_den}}x + ${intercept}$. This line intersects the third equation at a specific point, but since the table represents only one line (not two distinct lines), the system of three equations has no common solution. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: 73b3b7d8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients from figure, target: 30x, answer: 20]
 * - Difficulty factors: [Reading from graph, solving system, scaling answer]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [x must be fraction that gives integer when multiplied by 30]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two lines intersecting, point marked]
 */