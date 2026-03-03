import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: ff2c1431
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 7, 5]
* - Difficulty factors: [Literal equation, distribution, isolation]
* - Distractor patterns: [A: divides by 7m, C: multiplies instead of divides, D: subtracts 5 instead of dividing]
* - Constraints: [All positive numbers]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_ff2c1431 = {
 metadata: {
   // id: "ff2c1431",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate coefficients
   const coeff1 = getRandomInt(3, 9); // Like 7
   const coeff2 = getRandomInt(2, 6); // Like 5
   
   // STEP 2: Create options with proper formatting
   const correctText = `$n = \\frac{${coeff1}m}{${coeff2}} - p$`;
   
   const optionsData = [
     { text: `$n = \\frac{${coeff2}p}{${coeff1}m}$`, isCorrect: false, reason: "incorrectly divides by the coefficient and multiplies by the wrong variable" },
     { text: correctText, isCorrect: true, reason: "correctly divides and subtracts" },
     { text: `$n = ${coeff2}(${coeff1}m) + p$`, isCorrect: false, reason: "incorrectly multiplies instead of dividing" },
     { text: `$n = ${coeff1}m - ${coeff2} - p$`, isCorrect: false, reason: "incorrectly subtracts the constant instead of dividing by it" }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   const explanation = `To solve for $n$ in terms of $m$ and $p$, start with $${coeff1}m = ${coeff2}(n + p)$. Divide both sides by $${coeff2}$: $\\frac{${coeff1}m}{${coeff2}} = n + p$. Subtract $p$ from both sides: $n = \\frac{${coeff1}m}{${coeff2}} - p$. Option ${correctLetter} matches this. Option ${incorrectOptions[0].letter} ${incorrectOptions[0].reason}. Option ${incorrectOptions[1].letter} ${incorrectOptions[1].reason}. Option ${incorrectOptions[2].letter} ${incorrectOptions[2].reason}.`;
   
   return {
     questionText: `$$${coeff1}m = ${coeff2}(n + p)$$\nThe given equation relates the positive numbers $m$, $n$, and $p$. Which equation correctly gives $n$ in terms of $m$ and $p$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};

/**
* Question ID: 6bdcac03
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: -841 (negative, perfect square)]
* - Difficulty factors: [Understanding x² cannot be negative for real x]
* - Distractor patterns: [A: x²=0, B: x²=positive, C: infinitely many]
* - Constraints: [Right side must be negative]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/