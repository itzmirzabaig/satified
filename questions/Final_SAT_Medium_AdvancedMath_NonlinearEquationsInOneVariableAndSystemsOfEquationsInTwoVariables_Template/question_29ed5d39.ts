import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 29ed5d39
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: 20, numerator: 16]
* - Difficulty factors: [Rational equation, isolating reciprocal]
* - Distractor patterns: [A: subtracts 20 from numerator, B/C: wrong operations]
* - Constraints: [n ≠ 0, p > 20 ensures denominator positive]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_29ed5d39 = {
 metadata: {
   // id: "29ed5d39",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate constants
   const base = getRandomInt(10, 30); // Like 20
   const numer = getRandomInt(5, 25); // Like 16
   
   // STEP 2: Create options
   const correctText = `$n=\\frac{${numer}}{p-${base}}$`;
   
   const optionsData = [
     { text: `$n=\\frac{p-${base}}{${numer}}$`, isCorrect: false },
     { text: `$n=\\frac{p}{${numer}}+${base}$`, isCorrect: false },
     { text: `$n=\\frac{p}{${numer}}-${base}$`, isCorrect: false },
     { text: correctText, isCorrect: true }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   
   const explanation = `Subtract $${base}$ from both sides: $p-${base}=\\frac{${numer}}{n}$. Multiply both sides by $n$: $n(p-${base})=${numer}$. Divide both sides by $p-${base}$: $n=\\frac{${numer}}{p-${base}}$. Option ${correctLetter} is correct. Other options result from incorrect algebraic manipulation.`;
   
   return {
     questionText: `$$p=${base}+\\frac{${numer}}{n}$$\nThe given equation relates the numbers $p$ and $n$, where $n$ is not equal to $0$ and $p>${base}$. Which equation correctly expresses $n$ in terms of $p$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};

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