import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 75012ee7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equations: 2x+3y=7, equivalent multiple, parametric solutions]
 * - Difficulty factors: [Equivalent equations, parametric form identification]
 * - Distractor patterns: [Wrong coordinate order, wrong parameter placement]
 * - Constraints: [Equations must be equivalent]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_75012ee7 = {
  metadata: {
    // id: "75012ee7",
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
    
    const optA = `\\left(\\frac{r}{${mult}} + ${C}, -\\frac{r}{${mult}} + ${mult * C}\\right)`;
    const optB = `\\left(r, \\frac{${A}r}{${B}} + \\frac{${C}}{${B}}\\right)`;
    const optC = `\\left(r, -\\frac{${B}r}{${A}} + \\frac{${C}}{${A}}\\right)`;
    
    const optionsData = [
      { text: optA, isCorrect: false, reason: "uses incorrect coefficients" },
      { text: correct, isCorrect: true },
      { text: optC, isCorrect: false, reason: "swaps the x- and y-coordinates" },
      { text: optB, isCorrect: false, reason: "uses an incorrect sign and swapped coordinates" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `For each real number $r$, which of the following points lies on the graph of each equation in the $xy$-plane for the given system? $$${A}x + ${B}y = ${C}$$ $$${mult * A}x + ${mult * B}y = ${mult * C}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct,
      explanation: `Choice ${correctLetter} is correct. The equations are equivalent, so any solution to one is a solution to the other. Substituting $y = r$ into the first equation gives $${A}x + ${B}r = ${C}$, so $x = \\frac{${C} - ${B}r}{${A}} = ${signX}\\frac{${numX}r}{${denX}} ${signC} \\frac{${numC}}{${denC}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 5e08a055
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 6, intercepts: 18 and 22]
 * - Difficulty factors: [No solution from graph, identify second equation]
 * - Distractor patterns: [Same intercept, wrong slope, wrong form]
 * - Constraints: [Correct option must have same slope, different intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two parallel lines]
 */