import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 642
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, 12, -40]
* - Difficulty factors: [Quadratic formula with simplification, radical form]
* - Distractor patterns: [A: wrong sign on -b, B: dropped -b term, C: unsimplified radical]
* - Constraints: [Discriminant not a perfect square; radical must genuinely simplify]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_642 = {
 metadata: {
   id: "642",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },

 generate: (): QuestionData => {
   // Quadratic in the form  w^2 + (2b)w - c = 0.
   //   A = 1, B = 2b, C = -c
   //   Discriminant D = (2b)^2 - 4(1)(-c) = 4b^2 + 4c = 4(b^2 + c)
   //   sqrt(D) = 2*sqrt(b^2 + c)
   //   w = (-2b +/- 2*sqrt(b^2+c)) / 2 = -b +/- sqrt(b^2 + c)
   //
   // ANSWER-FIRST CONSTRUCTION: we choose the simplified radical form
   // sqrt(b^2 + c) = kRad * sqrt(mRad) with mRad square-free and kRad >= 2,
   // so the radical genuinely simplifies (mirrors the original -6 + 2*sqrt(19),
   // where sqrt(76) = 2*sqrt(19)).  Setting inside = kRad^2 * mRad guarantees:
   //   - inside is never a perfect square (mRad square-free, mRad > 1),
   //   - c = inside - b^2 is a clean positive integer.
   const squareFree = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];

   let b = 0, kRad = 0, mRad = 0, inside = 0, c = 0;
   let tries = 0;
   do {
     b = getRandomInt(4, 9);          // middle coefficient is 2b (8..18)
     kRad = getRandomInt(2, 3);       // radical coefficient, >= 2 so it simplifies
     mRad = getRandomElement(squareFree);
     inside = kRad * kRad * mRad;     // = b^2 + c  (never a perfect square)
     c = inside - b * b;              // constant term (subtracted in the equation)
   } while (c < 5 && tries++ < 50);

   // Safety fallback if the bounded loop never found c >= 5 (keeps render finite).
   if (c < 5) {
     b = 5; kRad = 2; mRad = 15; inside = kRad * kRad * mRad; c = inside - b * b; // 60 - 25 = 35
   }

   const twoB = 2 * b;
   const disc = 4 * inside;           // = (2b)^2 + 4c

   // Correct simplified solution: -b + kRad*sqrt(mRad)
   const correctText = `$-${b}+${kRad}\\sqrt{${mRad}}$`;

   const optionsData = [
     // Wrong sign on the -b term: +b + kRad*sqrt(mRad)
     { text: `$${b}+${kRad}\\sqrt{${mRad}}$`, isCorrect: false },
     // Dropped the -b term entirely: kRad*sqrt(mRad)
     { text: `$${kRad}\\sqrt{${mRad}}$`, isCorrect: false },
     // Forgot to keep the coefficient when simplifying: -b + sqrt(mRad)
     { text: `$-${b}+\\sqrt{${mRad}}$`, isCorrect: false },
     // Correct
     { text: correctText, isCorrect: true }
   ];

   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));

   const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
   const correctLetter = correctOption.letter;
   const wrongSign = shuffledOptions.find(o => o.text === `$${b}+${kRad}\\sqrt{${mRad}}$`)!.letter;
   const droppedB = shuffledOptions.find(o => o.text === `$${kRad}\\sqrt{${mRad}}$`)!.letter;
   const notSimplified = shuffledOptions.find(o => o.text === `$-${b}+\\sqrt{${mRad}}$`)!.letter;

   const explanation = `Use the quadratic formula on $w^2+${twoB}w-${c}=0$ with $a=1$, $b=${twoB}$, $c=-${c}$: ` +
     `$w=\\frac{-${twoB}\\pm\\sqrt{${twoB}^2-4(1)(-${c})}}{2}=\\frac{-${twoB}\\pm\\sqrt{${disc}}}{2}$. ` +
     `Factor the discriminant: $\\sqrt{${disc}}=\\sqrt{4\\cdot${inside}}=2\\sqrt{${inside}}$, and $\\sqrt{${inside}}=\\sqrt{${kRad * kRad}\\cdot${mRad}}=${kRad}\\sqrt{${mRad}}$. ` +
     `So $w=\\frac{-${twoB}\\pm 2\\cdot${kRad}\\sqrt{${mRad}}}{2}=-${b}\\pm${kRad}\\sqrt{${mRad}}$. ` +
     `Choice ${correctLetter} gives $-${b}+${kRad}\\sqrt{${mRad}}$, which is one of these solutions, so Choice ${correctLetter} is correct. ` +
     `Choice ${wrongSign} has the wrong sign on the $-${b}$ term. ` +
     `Choice ${droppedB} drops the $-${b}$ entirely. ` +
     `Choice ${notSimplified} fails to carry the factor of ${kRad} out of the radical.`;

   return {
     questionText: `$$w^2+${twoB}w-${c}=0$$\nWhich of the following is a solution to the given equation?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};
