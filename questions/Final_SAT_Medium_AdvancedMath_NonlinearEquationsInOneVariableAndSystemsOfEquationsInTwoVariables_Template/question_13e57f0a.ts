import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_13e57f0a = {
 metadata: {
   // id: "13e57f0a",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate factorable quadratic
   // Form: -ax² - bx = -c => ax² + bx - c = 0
   // Want (dx - e)(x + f) = dx² + (df - e)x - ef
   const d = getRandomInt(2, 5);
   const e = getRandomInt(3, 9);
   const f = getRandomInt(1, 5);
   
   // Quadratic: dx² + (df - e)x - ef = 0
   const a = d;
   const b = d * f - e; // Could be negative
   const c = -e * f;
   
   // Solutions: x = e/d (positive) and x = -f (negative)
   const posSol = `\\frac{${e}}{${d}}`;
   const posSolVal = e / d;
   
   // STEP 2: Create options (include positive solution and distractors)
   const optionsData = [
     { text: `$\\frac{${-b}}{${a}}$`, isCorrect: false }, // Sign error
     { text: `$${posSol}$`, isCorrect: true },
     { text: `$${f + 2}$`, isCorrect: false }, // Wrong
     { text: `$${e + f}$`, isCorrect: false } // Wrong
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   
   const explanation = `Add $${a}x^2${b >= 0 ? '+' : ''}${b}x$ to both sides: $0=${a}x^2${b >= 0 ? '+' : ''}${b}x${c >= 0 ? '+' : ''}${c}$. Factor: $(${d}x-${e})(x+${f})=0$. $${d}x-${e}=0$ gives $x=${posSol}$, $x+${f}=0$ gives $x=-${f}$. The positive solution is $${posSol}$. Other options do not satisfy the equation.`;
   
   return {
     questionText: `What is the positive solution to the given equation?\n\n$-${a}x^2${b >= 0 ? '+' : '-'}${Math.abs(b)}x=${c}$`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: posSolVal.toString(),
     explanation: explanation
   };
 }
};

/**
* Question ID: 802549ac
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constants: 2, 3, -2, -3, 10]
* - Difficulty factors: [Expanding binomials, simplifying, linear solution]
* - Distractor patterns: [B: 0, C: -2, D: -5 (random wrong)]
* - Constraints: [Must simplify to linear equation with integer solution]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/