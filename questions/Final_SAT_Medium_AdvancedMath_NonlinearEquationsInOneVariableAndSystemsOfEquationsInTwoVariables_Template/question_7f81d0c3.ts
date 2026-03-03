import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 7f81d0c3
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, -1, -1 (simple)]
* - Difficulty factors: [Quadratic formula application, radical simplification]
* - Distractor patterns: [A: wrong factors, B: incorrect formula use, D: sign error in quadratic formula]
* - Constraints: [Discriminant = 5, requires exact quadratic formula application]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_7f81d0c3 = {
 metadata: {
   // id: "7f81d0c3",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate quadratic x² + bx + c = 0 with nice discriminant
   // Original: x² - x - 1 = 0, solutions (1±√5)/2
   // Generalize: x² + px + q = 0
   const p = getRandomInt(-3, -1); // Negative coefficient for x
   const q = getRandomInt(-3, -1); // Negative constant (ensures real roots)
   
   // Calculate discriminant and solutions
   const disc = p * p - 4 * 1 * q;
   const sqrtDisc = Math.sqrt(disc);
   
   // Format for quadratic formula: (-p ± √disc)/2
   const negP = -p;
   const sol1 = `\\frac{${negP}+\\sqrt{${disc}}}{2}`;
   const sol2 = `\\frac{${negP}-\\sqrt{${disc}}}{2}`;
   
   // STEP 2: Create options
   // A: Wrong integer factors
   // B: Wrong formula application
   // C: Correct
   // D: Sign error (using -b where b is already negative)
   
   const optionsData = [
     { text: `$x=${getRandomInt(1, 3)}$ and $x=${getRandomInt(3, 5)}$`, isCorrect: false, type: "A" },
     { text: `$x=${p > 0 ? '' : '-'}\\frac{${Math.abs(p)}}{2}$ and $x=\\frac{${q}}{2}$`, isCorrect: false, type: "B" },
     { text: `$x=${sol1}$ and $x=${sol2}$`, isCorrect: true, type: "C" },
     { text: `$x=\\frac{${p}+\\sqrt{${disc}}}{2}$ and $x=\\frac{${p}-\\sqrt{${disc}}}{2}$`, isCorrect: false, type: "D" }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   // STEP 3: Build explanation
   const explanation = `Choice ${correctLetter} is correct. Using the quadratic formula: $x = \\frac{-(${p}) \\pm \\sqrt{(${p})^2 - 4(1)(${q})}}{2(1)} = \\frac{${negP} \\pm \\sqrt{${disc}}}{2}$. Choice ${incorrectOptions[0].letter} is incorrect due to incorrect factoring or formula use. Choice ${incorrectOptions[1].letter} is incorrect due to incorrect formula use. Choice ${incorrectOptions[2].letter} is incorrect due to a sign error.`;
   
   return {
     questionText: `What values satisfy the equation $x^{2}${p >= 0 ? '+' : ''}${p}x${q >= 0 ? '+' : ''}${q}=0$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: `x=${sol1} and x=${sol2}`,
     explanation: explanation
   };
 }
};

/**
* Question ID: b4acba95
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, -12, 27]
* - Difficulty factors: [Discriminant calculation, determining number of real solutions]
* - Distractor patterns: [B: discriminant=0, C: discriminant<0, D: infinitely many]
* - Constraints: [Discriminant must be > 0 for exactly two solutions]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/