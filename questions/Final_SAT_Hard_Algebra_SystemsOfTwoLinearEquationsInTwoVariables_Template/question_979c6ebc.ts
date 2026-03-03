import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 979c6ebc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [same line system, parametric point form]
 * - Difficulty factors: [Equivalent equations recognition, parametric representation]
 * - Distractor patterns: [Swapped coordinates, wrong slope sign, wrong constant]
 * - Constraints: [Equations must be equivalent (one is multiple of other)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_979c6ebc = {
  metadata: {
    // id: "979c6ebc",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const mult = getRandomInt(2, 5);
    const A = getRandomInt(2, 5) * mult;
    const B = getRandomInt(2, 5) * mult;
    const C = getRandomInt(5, 20);
    
    const A2 = A / mult;
    const B2 = B / mult;
    const C2 = C / mult;
    
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const g = gcd(Math.abs(B), A);
    const numX = B / g;
    const denX = A / g;
    const numC = C / g;
    const denC = A / g;
    
    const correctX = -B / A;
    const correctC = C / A;
    
    const signX = correctX >= 0 ? '-' : '+';
    const signC = correctC >= 0 ? '+' : '-';
    
    const correctOpt = `\\left(${signX}\\frac{${Math.abs(numX)}r}{${denX}} ${signC} \\frac{${Math.abs(numC)}}{${denC}}, r\\right)`;
    
    const optB = `\\left(r, \\frac{${A}r}{${B}} + \\frac{${C}}{${B}}\\right)`;
    const optC = `\\left(\\frac{r}{${mult}} + ${C}, -\\frac{r}{${mult}} + ${A * mult}\\right)`;
    const optA_wrong = `\\left(r, -\\frac{${B}r}{${A}} + \\frac{${C}}{${A}}\\right)`;
    
    const optionsData = [
      { text: optA_wrong, isCorrect: false, reason: "swaps the coefficients of x and y" },
      { text: optB, isCorrect: false, reason: "uses an incorrect sign for the slope" },
      { text: optC, isCorrect: false, reason: "uses incorrect coefficients" },
      { text: correctOpt, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `For each real number $r$, which of the following points lies on the graph of each equation in the $xy$-plane for the given system? $$${A}x + ${B}y = ${C}$$ $$${A2}x + ${B2}y = ${C2}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOpt,
      explanation: `Choice ${correctLetter} is correct. The two equations are equivalent (the first divided by ${mult} gives the second), so they represent the same line. Substituting $y = r$ into the second equation and solving for $x$ yields $${A2}x = ${C2} - ${B2}r$, or $x = ${correctX >= 0 ? '' : '-'}\\frac{${Math.abs(numX)}r}{${denX}} ${correctC >= 0 ? '+' : '-'} \\frac{${Math.abs(numC)}}{${denC}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 797a81fb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 6/7, intercepts: 18/7 and -18/7]
 * - Difficulty factors: [Visual identification of parallel lines from graph]
 * - Distractor patterns: [One solution (intersecting), two solutions (impossible), infinite (same line)]
 * - Constraints: [Lines must be parallel and distinct]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two parallel lines with same slope, different intercepts]
 */