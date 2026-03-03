import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 263f9937
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Day 1: 2.5×10^5, Day 2: 5.0×10^5, doubling each day]
 * - Difficulty factors: [Exponential growth, scientific notation]
 * - Distractor patterns: [A: Day 5, B: Day 9, C: Day 11, D: Day 12]
 * - Constraints: [Doubling daily, solve 2.5×10^5 × 2^(d-1) = 5.12×10^8]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table required]
 */

export const generator_263f9937 = {
  metadata: {
    // id: "263f9937",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const startExp = getRandomInt(4, 6);
    const startCoeff = getRandomInt(2, 5);
    const start = (startCoeff / 2) * Math.pow(10, startExp);
    
    const daysToReach = getRandomInt(8, 14);
    const target = start * Math.pow(2, daysToReach - 1);
    
    const targetSci = target.toExponential(2).replace('e+', ' \\times 10^{') + '}';
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr>
          <th style="border: 1px solid #ccc; padding: 12px;">Day</th>
          <th style="border: 1px solid #ccc; padding: 12px;">Bacteria per mL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">1</td>
          <td style="border: 1px solid #ccc; padding: 12px;">$${startCoeff/2} \\times 10^{${startExp+3}}$</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">2</td>
          <td style="border: 1px solid #ccc; padding: 12px;">$${startCoeff} \\times 10^{${startExp+3}}$</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 12px;">3</td>
          <td style="border: 1px solid #ccc; padding: 12px;">$${startCoeff*2} \\times 10^{${startExp+3}}$</td>
        </tr>
      </tbody>
    </table>`;
    
    const distractors = [
      daysToReach - 7,
      daysToReach - 3,
      daysToReach - 1,
      daysToReach
    ];
    
    const optionsData = distractors.map((d, i) => ({
      text: `Day $${d}$`,
      isCorrect: i === 3
    }));
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `A culture of bacteria is growing at an exponential rate, as shown in the table. At this rate, on which day would the number of bacteria per milliliter reach $${targetSci}$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Day $${daysToReach}$`,
      explanation: `Choice ${correctLetter} is correct. The bacteria double each day. If Day 1 has $${startCoeff/2} \\times 10^{${startExp+3}}$, then Day $n$ has $${startCoeff/2} \\times 10^{${startExp+3}} \\cdot 2^{n-1}$. Setting equal to $${targetSci}$ gives $2^{n-1}=${Math.pow(2, daysToReach-1)}$, so $n-1=${daysToReach-1}$ and $n=${daysToReach}$.`
    };
  }
};

/**
 * Question ID: 4dd4efcf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: positive, vertex with k<0, f(-9)=f(3)]
 * - Difficulty factors: [Quadratic properties, vertex analysis, statement evaluation]
 * - Distractor patterns: [A: I only, B: II only, C: I and II, D: Neither]
 * - Constraints: [Must determine which statements MUST be true]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */