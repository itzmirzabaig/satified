import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 651
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 3, -4, +5]
* - Difficulty factors: [Zero product property with three factors]
* - Distractor patterns: [A: -4 (wrong sign), C: 3 (coefficient), D: 5 (wrong sign)]
* - Constraints: [Solutions are 0, 4, -5]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_651 = {
 metadata: {
   id: "651",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },

 generate: (): QuestionData => {
   // STEP 1: Generate three factors of  a*x*(x - b)*(x + c) = 0.
   // Roots are {0, b, -c}. Distractors are the values -b, a, c.
   // Draw a, b, c PAIRWISE DISTINCT so that:
   //   - the three distractor values -b, a, c are all different from each other
   //     (a != c; -b is negative so it never equals the positive a or c), and
   //   - no distractor value accidentally equals a real root of the equation:
   //       a != b  => a is not the root b
   //       b != c  => -b is not the root -c, and c is not the root b
   //   - every distractor differs from the correct answer 0 (all are nonzero).
   let a: number, b: number, c: number;
   let tries = 0;
   do {
     a = getRandomInt(2, 5);
     b = getRandomInt(2, 6);
     c = getRandomInt(2, 6);
   } while ((a === b || a === c || b === c) && tries++ < 50);

   // Offered correct solution (one of the three roots).
   const correctValue = 0;

   // STEP 2: Create options (one correct root, three value distractors).
   const correctText = `$${correctValue}$`;
   const optionsData = [
     { text: `$-${b}$`, isCorrect: false, reason: `uses $x = -${b}$ from the factor $(x - ${b})$, flipping the sign; that factor gives $x = ${b}$` },
     { text: correctText, isCorrect: true, reason: "" },
     { text: `$${a}$`, isCorrect: false, reason: `is the leading coefficient ${a}, which is never zero and so does not produce a solution` },
     { text: `$${c}$`, isCorrect: false, reason: `uses $x = ${c}$ from the factor $(x + ${c})$, flipping the sign; that factor gives $x = -${c}$` }
   ];

   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));

   const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

   // STEP 3: Explanation — every math span begins with a letter (never a digit
   // right after $) so no bare-currency ambiguity, and letters come from the
   // shuffled array.
   const explanation = `Choice ${correctLetter} is correct. By the zero product property, a product equals zero when any factor equals zero. Setting each factor of the given equation to zero gives the roots $x = 0$, $x = ${b}$, and $x = -${c}$. The value $x = 0$ appears among the choices, so it is a valid solution. Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`;

   return {
     questionText: `$$${a}x(x - ${b})(x + ${c}) = 0$$\nWhat is one of the solutions to the given equation?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};
