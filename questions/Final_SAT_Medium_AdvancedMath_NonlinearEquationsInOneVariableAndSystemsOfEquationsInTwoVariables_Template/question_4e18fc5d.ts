import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 4e18fc5d
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 150 (triple-digit)]
* - Difficulty factors: [Literal equation with negative sign, isolating variable in denominator]
* - Distractor patterns: [B: divides instead of multiplies, C: swaps variables, D: treats as linear]
* - Constraints: [Distinct positive numbers ensures no zero/negative issues]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_4e18fc5d = {
 metadata: {
   // id: "4e18fc5d",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate random coefficient (triple-digit like 150)
   const coeff = getRandomInt(100, 300);
   
   // STEP 2: Create options with tracking
   const correctText = `$w=-${coeff}vx$`;
   
   const optionsData = [
     { text: correctText, isCorrect: true, reason: "correctly multiplies both sides by the coefficient and x" },
     { text: `$w=-\\frac{${coeff}v}{x}$`, isCorrect: false, reason: "results from $v = -\\frac{wx}{${coeff}}$ (incorrect variable placement)" },
     { text: `$w=-\\frac{x}{${coeff}v}$`, isCorrect: false, reason: "results from $v = -\\frac{x}{${coeff}w}$ (swapping variables)" },
     { text: `$w=v+${coeff}x$`, isCorrect: false, reason: "results from treating the equation as linear $v = w - ${coeff}x$" }
   ];
   
   // STEP 3: Shuffle and assign letters
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   // STEP 4: Build explanation
   const explanation = `Choice ${correctLetter} is correct. Multiplying both sides of the given equation by $-${coeff}x$ yields $-${coeff}xv = w$, or $w = -${coeff}vx$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
   
   return {
     questionText: `$$v=-\\frac{w}{${coeff}x}$$\nThe given equation relates the distinct positive numbers $v, w$, and $x$. Which equation correctly expresses $w$ in terms of $v$ and $x$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};

/**
* Question ID: a5663025
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [quadratic coefficient: 1, linear slope: 1, intercept: 2, viewBox: x[-3,4], y[-2,10]]
* - Difficulty factors: [System of equations, counting intersections, graph interpretation]
* - Distractor patterns: [A: 0 (thinks no intersection), B: 1 (finds only one), D: 3 (impossible for quadratic+linear)]
* - Constraints: [Discriminant > 0 for 2 real solutions, intersections must be visible in viewBox]
* - Question type: [Figure → Multiple Choice Text]
* - Figure generation: [Mafs: Quadratic + Linear with 2 intersection points]
*/