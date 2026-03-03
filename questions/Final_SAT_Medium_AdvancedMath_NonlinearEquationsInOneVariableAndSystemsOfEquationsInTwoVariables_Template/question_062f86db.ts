import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 062f86db
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 5, -37, -24]
* - Difficulty factors: [Factoring quadratic, positive solution]
* - Distractor patterns: [A: 3/5 (wrong factor), B: 3 (other root), D: 37 (coefficient)]
* - Constraints: [Must factor to integers]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_062f86db = {
 metadata: {
   // id: "062f86db",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate factorable quadratic ax² + bx + c = 0
   // (mx + n)(x - p) = mx² - mpx + nx - np = mx² + (n-mp)x - np
   // Want positive solution x = p
   const m = getRandomInt(2, 6);
   const n = getRandomInt(1, 5);
   const p = getRandomInt(5, 10);
   
   const a = m;
   const b = n - m * p; // Will be negative
   const c = -n * p; // Will be negative
   
   // Solutions: x = -n/m (negative) and x = p (positive)
   const negSol = `-\\frac{${n}}{${m}}`;
   
   // STEP 2: Create options
   const optionsData = [
     { text: `$${negSol}$`, isCorrect: false },
     { text: `$${n}$`, isCorrect: false },
     { text: `$${p}$`, isCorrect: true },
     { text: `$${-b}$`, isCorrect: false }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   
   const explanation = `Factor: $${a}x^2${b >= 0 ? '+' : ''}${b}x${c >= 0 ? '+' : ''}${c}=0$ as $(${m}x+${n})(x-${p})=0$. Solutions: $x=${negSol}$ and $x=${p}$. The positive solution is $${p}$. Other options do not satisfy the equation.`;
   
   return {
     questionText: `$$${a}x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = 0$$\nWhat is the positive solution to the given equation?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: p.toString(),
     explanation: explanation
   };
 }
};

/**
* Question ID: 717a1964
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, 10, -24]
* - Difficulty factors: [Factoring, one of two solutions]
* - Distractor patterns: [Not applicable - multi-accept fill in]
* - Constraints: [Must factor nicely]
* - Question type: [Fill-in-the-blank, Multi-accept]
* - Figure generation: [None]
*/