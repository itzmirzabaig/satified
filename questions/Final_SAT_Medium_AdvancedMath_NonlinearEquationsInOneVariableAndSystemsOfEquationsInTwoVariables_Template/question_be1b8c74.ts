import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: be1b8c74
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 8 (single-digit)]
* - Difficulty factors: [Literal equation solving, isolating variable with division]
* - Distractor patterns: [A: subtraction instead of division, C: reciprocal/swap, D: multiplication instead of division]
* - Constraints: [All variables positive ensures no division by zero issues]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_be1b8c74 = {
 metadata: {
   // id: "be1b8c74",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate random values
   const coeff = getRandomInt(2, 12); // Coefficient like 8
   
   // STEP 2: Create correct answer and distractors
   const correctText = `$$a = \\frac{x}{${coeff}(b+9)}$$`;
   
   const distractors = [
     { text: `$$a = \\frac{x}{${coeff}} - (b + 9)$$`, reason: "incorrectly subtracts instead of dividing by the binomial" },
     { text: `$$a = \\frac{${coeff}(b+9)}{x}$$`, reason: "takes the reciprocal of the correct expression" },
     { text: `$$a = ${coeff}x(b + 9)$$`, reason: "incorrectly multiplies instead of dividing" }
   ];
   
   // STEP 3: Create options array with tracking
   const optionsData = [
     { text: distractors[0].text, isCorrect: false, reason: distractors[0].reason },
     { text: correctText, isCorrect: true, reason: "correctly isolates a by dividing both sides by the coefficient and binomial" },
     { text: distractors[1].text, isCorrect: false, reason: distractors[1].reason },
     { text: distractors[2].text, isCorrect: false, reason: distractors[2].reason }
   ];
   
   // STEP 4: Shuffle and assign letters
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   // STEP 5: Build explanation
   const explanation = `Choice ${correctLetter} is correct. To express $a$ in terms of $b$ and $x$, isolate $a$ in the given equation: $x = ${coeff}a(b + 9)$. Divide both sides by $${coeff}(b + 9)$$: $a = \\frac{x}{${coeff}(b+9)}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
   
   return {
     questionText: `$$x = ${coeff}a(b + 9)$$\nThe given equation relates the positive numbers $a$, $b$, and $x$. Which equation correctly expresses $a$ in terms of $b$ and $x$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};

/**
* Question ID: 4e18fc5d
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 150 (triple-digit)]
* - Difficulty factors: [Literal equation with negative sign, isolating variable in denominator]
* - Distractor patterns: [B: divides instead of multiplies, C: swaps variables, D: treats as linear]
* - Constraints: [Distinct positive numbers ensures no zero/negative issues]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/