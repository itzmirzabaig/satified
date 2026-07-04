import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 648
*
* ORIGINAL ANALYSIS:
* - Number ranges: [integer root s = 1..3, so constant b = s^2 is a perfect square]
* - Difficulty factors: [System of linear and quadratic, substitution method, checking solutions]
* - Distractor patterns: [B: x=0 (y-intercept confusion), C/D: values that don't satisfy both equations]
* - Constraints: [Negative solution -s in options, others must not satisfy system]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_648 = {
 metadata: {
   id: "648",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },

 generate: (): QuestionData => {
   // STEP 1: Generate system with integer solutions.
   //   y = x + b, y = x^2 + x
   //   Intersection: x + b = x^2 + x  =>  b = x^2  =>  x = ±sqrt(b)
   // For integer solutions we must make b a PERFECT SQUARE. Pick the positive
   // root s first, then derive b = s^2. The two solutions are x = s and x = -s.
   const s = getRandomInt(1, 3); // positive root: 1, 2, or 3
   const b = s * s;              // constant term is a perfect square (1, 4, or 9)

   // Solutions are x = s and x = -s
   const sol1 = s;
   const sol2 = -s;

   // We mark the negative solution as the answer, so the positive root s must
   // NOT appear as a distractor (else two options would satisfy the system).
   const distractor1 = 0;      // Common error (y-intercept confusion)
   const distractor2 = s + 2;  // Never equals ±s for s >= 1
   const distractor3 = -s - 2; // Never equals ±s for s >= 1

   // STEP 2: Create options
   const optionsData = [
     { text: `$${sol2}$`, isCorrect: true }, // Negative solution
     { text: `$${distractor1}$`, isCorrect: false },
     { text: `$${distractor2}$`, isCorrect: false },
     { text: `$${distractor3}$`, isCorrect: false }
   ];

   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));

   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

   // STEP 3: Build explanation (all numbers derived from the live draw).
   const explanation = `Choice ${correctLetter} is correct. Set $x + ${b} = x^2 + x$. Subtract $x$ from both sides: $${b} = x^2$. So $x^2 = ${b}$, which gives $x = ${sol1}$ or $x = ${sol2}$. Of these, only $${sol2}$ is among the choices. Choice ${incorrectOptions[0].letter}: $x=${distractor1}$ gives $y=${distractor1 + b}$ and $y=${distractor1 * distractor1 + distractor1}$, not equal. Choice ${incorrectOptions[1].letter}: $x=${distractor2}$ gives $y=${distractor2 + b}$ and $y=${distractor2 * distractor2 + distractor2}$, not equal. Choice ${incorrectOptions[2].letter}: $x=${distractor3}$ gives $y=${distractor3 + b}$ and $y=${distractor3 * distractor3 + distractor3}$, not equal.`;

   return {
     questionText: `If $(x,y)$ is a solution to the system of equations below, which of the following could be the value of $x$?\n\n$y = x + ${b}$\n$y = x^2 + x$`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctOption.text,
     explanation: explanation
   };
 }
};
