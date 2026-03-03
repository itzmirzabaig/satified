import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: d0a7871e
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1 (simple)]
* - Difficulty factors: [System of linear and quadratic, substitution method, checking solutions]
* - Distractor patterns: [B: x=0 (y-intercept confusion), C/D: values that don't satisfy both equations]
* - Constraints: [Must have solution x=-1 in options, others must not satisfy system]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_d0a7871e = {
 metadata: {
   // id: "d0a7871e",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate system with specific solutions
   // y = x + b, y = x² + x
   // Intersection: x + b = x² + x => b = x² => x = ±sqrt(b)
   // We want integer solutions, so b should be perfect square
   const b = getRandomInt(1, 3); // 1, 2, or 3 (b=1 gives x=±1)
   const bSquared = b * b; // Perfect square
   
   // Solutions are x = b and x = -b
   const sol1 = b;
   const sol2 = -b;
   
   // Generate distractors that don't satisfy
   const distractor1 = 0; // Common error
   const distractor2 = b + 2; // Random wrong
   const distractor3 = -b - 2; // Random wrong
   
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
   const correctValue = sol2; // The negative solution
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   // STEP 3: Build explanation
   const explanation = `Choice ${correctLetter} is correct. Set $x + ${b} = x^2 + x$. Subtract $x$ from both sides: $${b} = x^2$. So $x = ${sol1}$ or $x = ${sol2}$. Of these, only $${sol2}$ is among the choices. Choice ${incorrectOptions[0].letter}: $x=${distractor1}$ gives $y=${b}$ and $y=0$, not equal. Choice ${incorrectOptions[1].letter}: $x=${distractor2}$ gives $y=${distractor2 + b}$ and $y=${distractor2 * distractor2 + distractor2}$, not equal. Choice ${incorrectOptions[2].letter}: $x=${distractor3}$ gives $y=${distractor3 + b}$ and $y=${distractor3 * distractor3 + distractor3}$, not equal.`;
   
   return {
     questionText: `If $(x,y)$ is a solution to the system of equations below, which of the following could be the value of $x$?\n\n$y = x + ${b}$\n$y = x^2 + x$`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctValue.toString(),
     explanation: explanation
   };
 }
};

/**
* Question ID: 7f81d0c3
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, -1, -1 (simple)]
* - Difficulty factors: [Quadratic formula application, radical simplification]
* - Distractor patterns: [A: wrong factors, B: incorrect formula use, D: sign error in quadratic formula]
* - Constraints: [Discriminant = 5, requires exact quadratic formula application]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/