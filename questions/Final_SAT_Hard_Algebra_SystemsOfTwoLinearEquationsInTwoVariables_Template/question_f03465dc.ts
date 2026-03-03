import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: f03465dc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 8, 7, 24, 21, constants: 9, 27]
 * - Difficulty factors: [Equivalent equations, parametric solution form]
 * - Distractor patterns: [Swapped coordinates, wrong slope]
 * - Constraints: [Equations must be equivalent (second = first * 3)]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_f03465dc = {
  metadata: {
    // id: "f03465dc",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const mult = getRandomInt(2, 5);
    const A = getRandomInt(2, 5);
    const B = getRandomInt(2, 5);
    const C = getRandomInt(5, 15);
    
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const g = gcd(Math.abs(B), A);
    
    const numX = B / g;
    const denX = A / g;
    const numC = C / g;
    const denC = A / g;
    
    const signX = (-B/A) >= 0 ? '-' : '+';
    const signC = (C/A) >= 0 ? '+' : '-';
    
    const correct = `\\left(${signX}\\frac{${numX}r}{${denX}} ${signC} \\frac{${numC}}{${denC}}, r\\right)`;
    
    const optA = `\\left(r, \\frac{${A}r}{${B}} + \\frac{${C}}{${B}}\\right)`;
    const optC = `\\left(\\frac{r}{${mult}} + ${C}, -\\frac{r}{${mult}} + ${mult * C}\\right)`;
    const optD = `\\left(\\frac{r}{${mult}} + ${C}, -\\frac{r}{${mult}} + ${mult * C}\\right)`;
    
    const optionsData = [
      { text: optA, isCorrect: false, reason: "swaps the coordinates" },
      { text: correct, isCorrect: true },
      { text: optC, isCorrect: false, reason: "uses incorrect coefficients" },
      { text: optD, isCorrect: false, reason: "uses incorrect coefficients" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Equation 1</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Equation 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${mult * A}x + ${mult * B}y = ${mult * C}$</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${A}x + ${B}y = ${C}$</td>
    </tr>
  </tbody>
</table>`;
    
    return {
      questionText: `For each real number $r$, which of the following points lies on the graph of each equation in the $xy$-plane for the given system?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct,
      explanation: `Choice ${correctLetter} is correct. The equations are equivalent, representing the same line. Substituting $x = r$ into the first equation and solving for $y$ yields $y = \\frac{${C} - ${A}r}{${B}} = ${signX}\\frac{${numX}r}{${denX}} ${signC} \\frac{${numC}}{${denC}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 1e0a46e4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 2/3, intercepts: 3 and -3]
 * - Difficulty factors: [Identifying no solution system from options]
 * - Distractor patterns: [One solution, infinite solutions, dependent system]
 * - Constraints: [Correct option must have same slope, different intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two parallel lines]
 */