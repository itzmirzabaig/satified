import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 570b5a5d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 7, 6, 5, 6, constants: 25, 23, target: 17x+18y]
 * - Difficulty factors: [Clever combination without solving, 17=7+10, 18=6+12]
 * - Distractor patterns: [Individual solving, wrong combination]
 * - Constraints: [Combination must give integer answer]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: null (table only)
 */

export const generator_570b5a5d = {
  metadata: {
    // id: "570b5a5d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a1 = getRandomInt(5, 10);
    const b1 = getRandomInt(4, 8);
    const a2 = getRandomInt(3, 7);
    const b2 = b1; // Same y-coefficient for nice elimination
    
    const c1 = getRandomInt(20, 40);
    const c2 = getRandomInt(15, 35);
    
    // Target: (a1 + 2*a2)x + (b1 + 2*b2)y = c1 + 2*c2
    const targetCoeff = a1 + 2 * a2;
    const targetY = b1 + 2 * b2;
    const answer = c1 + 2 * c2;
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">System of Equations</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${a1}x + ${b1}y = ${c1}$</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${a2}x + ${b2}y = ${c2}$</td>
    </tr>
  </tbody>
</table>`;
    
    const distA = 2;
    const distB = 3;
    const distC = c1 - c2;
    const distD = answer;
    
    const optionsData = [
      { text: distA.toString(), isCorrect: false },
      { text: distB.toString(), isCorrect: false },
      { text: distC.toString(), isCorrect: false },
      { text: distD.toString(), isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `The solution to the given system of equations is $(x, y)$. What is the value of $${targetCoeff}x + ${targetY}y$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: answer.toString(),
      explanation: `Choice ${correctLetter} is correct. Adding the first equation to twice the second equation gives $(${a1}x + ${b1}y) + 2(${a2}x + ${b2}y) = ${c1} + 2(${c2})$, which simplifies to $${targetCoeff}x + ${targetY}y = ${answer}$.`
    };
  }
};

/**
 * Question ID: e2e3942f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2, intercepts: 1 and -8, answer: 2]
 * - Difficulty factors: [No solution from graph, identifying parameter]
 * - Distractor patterns: [Sign errors, wrong slope identification]
 * - Constraints: [a must equal slope]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two parallel lines]
 */