import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: b4acba95
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, -12, 27]
* - Difficulty factors: [Discriminant calculation, determining number of real solutions]
* - Distractor patterns: [B: discriminant=0, C: discriminant<0, D: infinitely many]
* - Constraints: [Discriminant must be > 0 for exactly two solutions]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_b4acba95 = {
 metadata: {
   // id: "b4acba95",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate quadratic with positive discriminant (2 real solutions)
   // Factorable form: (x - r1)(x - r2) = x² - (r1+r2)x + r1*r2
   const r1 = getRandomInt(2, 8);
   const r2 = getRandomInt(2, 8);
   const sum = r1 + r2;
   const product = r1 * r2;
   
   // Ensure discriminant is positive and not zero (distinct roots)
   // Discriminant = sum² - 4*product = (r1+r2)² - 4r1r2 = (r1-r2)² > 0 when r1 ≠ r2
   
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
   
   const explanation = `To determine the number of distinct real solutions, use the discriminant: $\\Delta = b^2 - 4ac$. Here, $a=1$, $b=-${sum}$, $c=${product}$. $\\Delta = (-${sum})^2 - 4(1)(${product}) = ${disc} > 0$, so there are exactly two distinct real solutions. Factoring: $(x-${r1})(x-${r2})=0$ gives $x=${r1}$ and $x=${r2}$. ${incorrectOptions[0].letter} is incorrect (would require $\\Delta=0$), ${incorrectOptions[1].letter} is incorrect ($\\Delta<0$ would be needed), ${incorrectOptions[2].letter} is incorrect (quadratics never have infinitely many real solutions).`;
   
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

/**
* Question ID: ff2c1431
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 7, 5]
* - Difficulty factors: [Literal equation, distribution, isolation]
* - Distractor patterns: [A: divides by 7m, C: multiplies instead of divides, D: subtracts 5 instead of dividing]
* - Constraints: [All positive numbers]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/