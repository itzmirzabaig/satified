import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 652054da
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 3/2]
* - Difficulty factors: [Solving for inverse relationship, reciprocal]
* - Distractor patterns: [B: multiplies by 3/2 instead of 2/3, C/D: use addition]
* - Constraints: [Simple linear relationship]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_652054da = {
 metadata: {
   // id: "652054da",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate coefficient
   const num = getRandomInt(2, 5);
   const den = getRandomInt(2, 5);
   
   // STEP 2: Create options
   const correctText = `$p = \\frac{${den}}{${num}}s$`;
   
   const optionsData = [
     { text: correctText, isCorrect: true },
     { text: `$p = \\frac{${num}}{${den}}s$`, isCorrect: false },
     { text: `$p = \\frac{${den}}{${num}} + s$`, isCorrect: false },
     { text: `$p = \\frac{${num}}{${den}} + s$`, isCorrect: false }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   const explanation = `To solve $s = \\frac{${num}}{${den}}p$ for $p$, multiply both sides by $\\frac{${den}}{${num}}$: $\\frac{${den}}{${num}}s = p$. Thus, $p = \\frac{${den}}{${num}}s$. Option ${correctLetter} is correct. Option ${incorrectOptions[0].letter} multiplies by $\\frac{${num}}{${den}}$ instead of the reciprocal. Options ${incorrectOptions[1].letter} and ${incorrectOptions[2].letter} incorrectly use addition instead of multiplication.`;
   
   return {
     questionText: `An oceanographer uses the equation $s = \\frac{${num}}{${den}}p$ to model the speed $s$, in knots, of an ocean wave, where $p$ represents the period of the wave, in seconds. Which of the following represents the period of the wave in terms of the speed of the wave?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};

/**
* Question ID: 6e02cd78
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, -1, 2, -3]
* - Difficulty factors: [System with quadratic, substitution, perfect square trinomial]
* - Distractor patterns: [Not applicable - fill in blank]
* - Constraints: [Must result in perfect square for clean answer]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/