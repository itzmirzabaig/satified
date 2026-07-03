import { getRandomInt, isPerfectSquare, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 637
*
* Solve x^2 + p x + q = 0 with the quadratic formula.
* Roots: (-p ± sqrt(disc)) / 2, where disc = p^2 - 4q.
* p, q are small negative integers; disc is forced to be a POSITIVE NON-SQUARE
* so the roots are genuinely irrational (the item tests exact use of the
* formula and radical simplification, not factoring).
*
* FIXES:
* - correctAnswer now exactly equals the correct option string (both wrapped
*   in $...$). Previously the answer lacked $ delimiters -> CORRECT_MISMATCH.
* - Distractors rebuilt so none can collide with the correct answer or each
*   other for any draw (structurally distinct + numerically distinct):
*     B forgets to divide by 2, C uses +b instead of -b, D guesses integers.
* - Forced non-square discriminant (bounded retry) so the radical never
*   reduces to an integer and the "integer factors" distractor stays distinct.
* - Explanation reasons are matched to each distractor and use post-shuffle
*   letters.
*/

export const generator_637 = {
 metadata: {
   id: "637",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },

 generate: (): QuestionData => {
   // STEP 1: pick p, q so disc = p^2 - 4q is positive and NOT a perfect square.
   let p = -1, q = -1, disc = 5;
   let tries = 0;
   do {
     p = getRandomInt(-3, -1); // negative coefficient of x
     q = getRandomInt(-3, -1); // negative constant => two real roots of opposite sign
     disc = p * p - 4 * q;     // q < 0 => disc = p^2 + 4|q| > 0
   } while (isPerfectSquare(disc) && tries++ < 50);

   const negP = -p; // 1..3, always != p

   // Render the x-term cleanly: -1 -> "-x", 1 -> "+x", else "+/-k x".
   const pTerm = p === -1 ? '-x' : p === 1 ? '+x' : `${p >= 0 ? '+' : ''}${p}x`;
   const qTerm = `${q >= 0 ? '+' : ''}${q}`;

   // STEP 2: options. Each is a compound "$x=..$ and $x=..$" string.
   const correctText = `$x=\\frac{${negP}+\\sqrt{${disc}}}{2}$ and $x=\\frac{${negP}-\\sqrt{${disc}}}{2}$`;

   // B: forgot to divide by 2 (dropped the denominator).
   const optNoDiv = `$x=${negP}+\\sqrt{${disc}}$ and $x=${negP}-\\sqrt{${disc}}$`;
   // C: sign error, used b instead of -b in the numerator.
   const optSignErr = `$x=\\frac{${p}+\\sqrt{${disc}}}{2}$ and $x=\\frac{${p}-\\sqrt{${disc}}}{2}$`;
   // D: tried to factor into two integers (the real roots are irrational).
   // d1 > 0 and d2 < 0 are always distinct.
   const d1 = getRandomInt(1, 4);
   const d2 = getRandomInt(-4, -1);
   const optIntGuess = `$x=${d1}$ and $x=${d2}$`;

   const optionsData = [
     { text: correctText, isCorrect: true, reason: '' },
     { text: optNoDiv, isCorrect: false, reason: 'results from forgetting to divide the entire numerator by 2' },
     { text: optSignErr, isCorrect: false, reason: 'results from using $+b$ instead of $-b$ in the numerator' },
     { text: optIntGuess, isCorrect: false, reason: 'results from trying to factor into integers, but the discriminant is not a perfect square, so the roots are irrational' }
   ];

   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));

   const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

   // STEP 3: explanation (numbers from live vars, letters post-shuffle).
   const distractorText = incorrectOptions
     .map(o => `Choice ${o.letter} is incorrect; it ${o.reason}.`)
     .join(' ');

   const explanation = `Choice ${correctLetter} is correct. Using the quadratic formula, $x = \\frac{-(${p}) \\pm \\sqrt{(${p})^2 - 4(1)(${q})}}{2(1)} = \\frac{${negP} \\pm \\sqrt{${disc}}}{2}$. Since ${disc} is not a perfect square, the two solutions are $\\frac{${negP}+\\sqrt{${disc}}}{2}$ and $\\frac{${negP}-\\sqrt{${disc}}}{2}$. ${distractorText}`;

   return {
     questionText: `What are the solutions to the equation $x^{2}${pTerm}${qTerm}=0$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};
