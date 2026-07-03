import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 624
*
* ORIGINAL ANALYSIS:
* - Number ranges: [m: 2-6, n: 1-5, p: 5-10 building (mx + n)(x - p) = 0]
* - Difficulty factors: [Factoring quadratic, positive solution]
* - Distractor patterns: [other (negative) root -n/m, its numerator n,
*   magnitude of the x-coefficient m*p - n]
* - Constraints: [Must factor to integers; gcd(m, n) = 1 so the fraction is
*   reduced; n != p, m*p - n != p, m*p - n != n so all options are distinct]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_624 = {
 metadata: {
   id: "624",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },

 generate: (): QuestionData => {
   const gcd = (u: number, v: number): number => (v === 0 ? u : gcd(v, u % v));

   // STEP 1: Build a factorable quadratic (mx + n)(x - p) = 0
   //   = mx^2 + (n - mp)x - np, with roots x = -n/m (negative) and x = p (positive).
   // Bounded redraw until:
   //   gcd(m, n) = 1  -> -n/m fully reduced (and m != n, so root != -1 shown oddly)
   //   n != p         -> distractor n never equals the correct answer p
   //   mp - n != p, n -> coefficient distractor never collides with p or n
   let m = 2, n = 3, p = 7;
   let ok = false;
   let tries = 0;
   while (!ok && tries++ < 50) {
     m = getRandomInt(2, 6);
     n = getRandomInt(1, 5);
     p = getRandomInt(5, 10);
     const coefMag = m * p - n;
     ok = gcd(m, n) === 1 && n !== p && coefMag !== p && coefMag !== n;
   }
   if (!ok) { m = 2; n = 3; p = 7; } // deterministic safe fallback

   const bMag = m * p - n; // |coefficient of x| (b = n - mp is always negative here)
   const cMag = n * p;     // |constant term|   (c = -np is always negative here)

   // STEP 2: Create options (plain strings so the correct answer matches exactly).
   const optionsData = [
     {
       text: `-${n}/${m}`,
       isCorrect: false,
       reason: `it is the other solution of the equation, $x = -\\frac{${n}}{${m}}$, but the question asks for the positive solution`
     },
     {
       text: String(n),
       isCorrect: false,
       reason: `it uses only the numerator of the negative solution $x = -\\frac{${n}}{${m}}$ and is not a solution of the equation`
     },
     {
       text: String(p),
       isCorrect: true,
       reason: ''
     },
     {
       text: String(bMag),
       isCorrect: false,
       reason: `it is the magnitude of the coefficient of $x$ in the equation, not a solution`
     }
   ];

   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));

   const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
   const correctLetter = correctOption.letter;

   const wrongParts = shuffledOptions
     .filter(opt => !opt.isCorrect)
     .map(opt => `Choice ${opt.letter} is incorrect: ${opt.reason}.`)
     .join(' ');

   const explanation = `Choice ${correctLetter} is correct. The equation $\\,${m}x^2 - ${bMag}x - ${cMag} = 0$ factors as $(${m}x + ${n})(x - ${p}) = 0$. Setting each factor equal to zero gives $x = -\\frac{${n}}{${m}}$ or $x = ${p}$. The positive solution is $x = ${p}$. ${wrongParts}`;

   return {
     questionText: `$$\\,${m}x^2 - ${bMag}x - ${cMag} = 0$$\nWhat is the positive solution to the given equation?`,
     figureCode: null,
     options: shuffledOptions.map(o => o.text),
     correctAnswer: correctOption.text,
     explanation: explanation
   };
 }
};
