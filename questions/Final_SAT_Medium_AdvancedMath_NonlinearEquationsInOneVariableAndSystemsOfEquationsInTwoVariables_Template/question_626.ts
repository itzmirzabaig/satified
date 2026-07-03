import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 626
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: -4, -7, -36]
* - Difficulty factors: [Quadratic requiring rearrangement, factoring, positive solution]
* - Distractor patterns: [A: 7/4 (sign error), C: 4 (wrong), D: 7 (wrong)]
* - Constraints: [Must factor nicely]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_626 = {
 metadata: {
   id: "626",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate factorable quadratic
   // Factor form: (dx - e)(x + f) = 0  =>  dx² + (df - e)x - ef = 0,
   // displayed as  -dx² - (df - e)x = -ef.
   // Solutions: x = e/d (positive) and x = -f (negative).
   // Guards (bounded retry, <= 50 tries):
   //   gcd(e, d) = 1        -> e/d is a reduced, NON-integer fraction, so it can
   //                           never numerically equal the integer distractors;
   //   gcd(|b|, d) = 1      -> b != 0 (no "+0x" term) and the sign-error
   //                           distractor |b|/d is also a reduced non-integer fraction;
   //   |b| != e             -> the sign-error distractor never equals the answer.
   const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));

   let d = 4, e = 9, f = 4; // safe fallback: b = 7, roots 9/4 and -4
   let tries = 0;
   while (tries++ < 50) {
     const dd = getRandomInt(2, 5);
     const ee = getRandomInt(3, 9);
     const ff = getRandomInt(1, 5);
     const bb = dd * ff - ee;
     if (gcd(ee, dd) === 1 && gcd(Math.abs(bb), dd) === 1 && Math.abs(bb) !== ee) {
       d = dd; e = ee; f = ff;
       break;
     }
   }

   const a = d;
   const b = d * f - e;   // x-coefficient of the rearranged quadratic ax² + bx + c = 0
   const c = -e * f;      // constant term (always negative here)
   const bAbs = Math.abs(b);
   const nb = -b;         // x-coefficient as displayed on the left side of -ax² + nb·x = c

   const posSol = `\\frac{${e}}{${d}}`;
   const correctText = `$${posSol}$`;

   // Signed x-term with the coefficient "1" suppressed (e.g. +x, -x, +7x, -3x)
   const signedX = (k: number) => `${k < 0 ? '-' : '+'}${Math.abs(k) === 1 ? '' : Math.abs(k)}x`;

   // STEP 2: Create options (positive solution + provably wrong distractors)
   const optionsData = [
     { text: `$\\frac{${bAbs}}{${a}}$`, isCorrect: false, kind: 'frac' }, // coefficient-ratio sign error
     { text: correctText, isCorrect: true, kind: 'correct' },
     { text: `$${f + 2}$`, isCorrect: false, kind: 'int' }, // integer non-solution
     { text: `$${e + f}$`, isCorrect: false, kind: 'int' }  // integer non-solution
   ];

   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));

   const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
   const correctLetter = correctOption.letter;
   const fracDistractor = shuffledOptions.find(opt => opt.kind === 'frac')!;
   const intDistractors = shuffledOptions.filter(opt => opt.kind === 'int');

   const explanation = `Add $${a}x^2${signedX(b)}$ to both sides so one side equals zero: $0=${a}x^2${signedX(b)}${c}$. Factor: $(${d}x-${e})(x+${f})=0$. By the zero product property, $${d}x-${e}=0$ gives $x=${posSol}$, and $x+${f}=0$ gives $x=-${f}$. The positive solution is $${posSol}$, so option ${correctLetter} is correct. Option ${fracDistractor.letter} mistakes the coefficient ratio $\\frac{${bAbs}}{${a}}$ from the rearranged equation for a solution. Option ${intDistractors[0].letter} (${intDistractors[0].text}) and option ${intDistractors[1].letter} (${intDistractors[1].text}) do not satisfy the equation.`;

   return {
     questionText: `What is the positive solution to the given equation?\n\n$-${a}x^2${signedX(nb)}=${c}$`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};
