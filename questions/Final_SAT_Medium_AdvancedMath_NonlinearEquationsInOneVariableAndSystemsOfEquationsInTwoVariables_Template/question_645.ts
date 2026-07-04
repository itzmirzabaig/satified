import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 645
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, -12, 27]
* - Difficulty factors: [Discriminant calculation, determining number of real solutions]
* - Distractor patterns: [B: discriminant=0, C: discriminant<0, D: infinitely many]
* - Constraints: [Discriminant must be > 0 for exactly two solutions]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_645 = {
 metadata: {
   id: "645",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate quadratic with positive discriminant (2 real solutions)
   // Factorable form: (x - r1)(x - r2) = x² - (r1+r2)x + r1*r2
   // Discriminant = sum² - 4*product = (r1+r2)² - 4r1r2 = (r1-r2)² > 0 ONLY when r1 ≠ r2,
   // so we must force distinct roots or the equation becomes a perfect square (ONE solution).
   const r1 = getRandomInt(2, 8);
   let r2 = getRandomInt(2, 8);
   let guard = 0;
   while (r2 === r1 && guard++ < 50) {
     r2 = getRandomInt(2, 8);
   }
   // Deterministic fallback: guarantee distinct roots even in the (astronomically
   // unlikely) event the bounded retry loop never landed on a different value.
   if (r2 === r1) {
     r2 = r1 === 8 ? 2 : r1 + 1;
   }
   const sum = r1 + r2;
   const product = r1 * r2;
   
   // STEP 2: Create options
   const optionsData = [
     { text: "Exactly two", isCorrect: true },
     { text: "Exactly one", isCorrect: false },
     { text: "Zero", isCorrect: false },
     { text: "Infinitely many", isCorrect: false }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   // STEP 3: Build explanation
   const disc = sum * sum - 4 * product;
   // Map each distractor's REASON to its option TEXT (not to a shuffled position),
   // so the reason is always mathematically correct for whichever letter it lands on.
   const reasonByText: Record<string, string> = {
     "Exactly one": "would require $\\Delta=0$ (a repeated root), but here $\\Delta>0$",
     "Zero": "would require $\\Delta<0$ (no real roots), but here $\\Delta>0$",
     "Infinitely many": "is impossible, since a quadratic equation has at most two real solutions"
   };
   const distractorText = incorrectOptions
     .map(o => `${o.letter} is incorrect (${reasonByText[o.text]})`)
     .join(', ');

   const explanation = `To determine the number of distinct real solutions, use the discriminant: $\\Delta = b^2 - 4ac$. Here, $a=1$, $b=-${sum}$, $c=${product}$. $\\Delta = (-${sum})^2 - 4(1)(${product}) = ${disc} > 0$, so there are exactly two distinct real solutions. Factoring: $(x-${r1})(x-${r2})=0$ gives $x=${r1}$ and $x=${r2}$. Choice ${correctLetter} is correct. ${distractorText}.`;
   
   // Format signs properly
   const bTerm = sum >= 0 ? `-${sum}x` : `+${-sum}x`;
   const cTerm = product >= 0 ? `+${product}` : `-${-product}`;
   
   return {
     questionText: `$$x^{2}${bTerm}${cTerm}=0$$\nHow many distinct real solutions does the given equation have?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: "Exactly two",
     explanation: explanation
   };
 }
};
