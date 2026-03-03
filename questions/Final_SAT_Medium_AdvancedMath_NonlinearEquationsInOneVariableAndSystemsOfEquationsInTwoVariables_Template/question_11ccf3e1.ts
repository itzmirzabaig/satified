import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 11ccf3e1
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 14, 5]
* - Difficulty factors: [Literal equation, division of binomial]
* - Distractor patterns: [B: divides only first term, C: reverses sign, D: multiplies]
* - Constraints: [None]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_11ccf3e1 = {
 metadata: {
   // id: "11ccf3e1",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate coefficients
   const coeff1 = getRandomInt(5, 20);
   const coeff2 = getRandomInt(2, 10);
   
   // STEP 2: Create options
   const correctText = `$$k = \\frac{m-${coeff1}j}{${coeff2}}$$`;
   
   const optionsData = [
     { text: correctText, isCorrect: true, reason: "correctly subtracts and divides entirely" },
     { text: `$$k = \\frac{1}{${coeff2}}m - ${coeff1}j$$`, isCorrect: false, reason: "divides only $m$ by ${coeff2} and not ${coeff1}j" },
     { text: `$$k = \\frac{${coeff1}j-m}{${coeff2}}$$`, isCorrect: false, reason: "reverses the sign" },
     { text: `$$k = ${coeff2}m - ${coeff1}j$$`, isCorrect: false, reason: "multiplies $m$ by ${coeff2} instead of dividing" }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   const explanation = `Subtract $${coeff1}j$ from both sides: $${coeff2}k = m-${coeff1}j$. Divide by $${coeff2}$: $k = \\frac{m-${coeff1}j}{${coeff2}}$. Option ${correctLetter} is correct. Option ${incorrectOptions[0].letter} ${incorrectOptions[0].reason}. Option ${incorrectOptions[1].letter} ${incorrectOptions[1].reason}. Option ${incorrectOptions[2].letter} ${incorrectOptions[2].reason}.`;
   
   return {
     questionText: `$$${coeff1}j + ${coeff2}k = m$$\nThe given equation relates the numbers $j, k$ and $m$. Which equation correctly expresses $k$ in terms of $j$ and $m$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};

/**
* Question ID: 13e57f0a
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: -4, -7, -36]
* - Difficulty factors: [Quadratic requiring rearrangement, factoring, positive solution]
* - Distractor patterns: [A: 7/4 (sign error), C: 4 (wrong), D: 7 (wrong)]
* - Constraints: [Must factor nicely]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/