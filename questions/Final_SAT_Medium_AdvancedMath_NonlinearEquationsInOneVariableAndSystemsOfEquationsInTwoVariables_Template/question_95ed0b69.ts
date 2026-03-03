import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 95ed0b69
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [expression: 4j+9]
* - Difficulty factors: [Isolating complex expression, not just single variable]
* - Distractor patterns: [B: multiplication, C: subtraction, D: reciprocal]
* - Constraints: [Distinct positive numbers]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_95ed0b69 = {
 metadata: {
   // id: "95ed0b69",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate coefficients for expression
   const coeff = getRandomInt(2, 8); // For 4j+9 -> a*j + b
   const constTerm = getRandomInt(3, 12);
   
   // STEP 2: Create options
   // Original: p = k/(4j+9), solve for 4j+9 = k/p
   const correctText = `$$4j + 9 = \\frac{k}{p}$$`;
   
   const optionsData = [
     { text: correctText, isCorrect: true, reason: "correctly multiplies by the expression then divides by p" },
     { text: `$$4j + 9 = kp$$`, isCorrect: false, reason: "incorrectly multiplies by p instead of dividing" },
     { text: `$$4j + 9 = k - p$$`, isCorrect: false, reason: "incorrectly subtracts instead of dividing" },
     { text: `$$4j + 9 = \\frac{p}{k}$$`, isCorrect: false, reason: "takes the reciprocal of the correct answer" }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   const explanation = `Choice ${correctLetter} is correct. Multiply both sides of the original equation by $4j+9$ to get $p(4j+9)=k$. Divide both sides by $p$ to isolate $4j+9$: $4j+9=\\frac{k}{p}$. Other options result from incorrect rearrangements.`;
   
   return {
     questionText: `The given equation relates the distinct positive numbers $p, k,$ and $j$. Which equation correctly expresses $4j+9$ in terms of $p$ and $k$?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};

/**
* Question ID: 630897df
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [331.3, 0.606 (decimals)]
* - Difficulty factors: [Literal equation with decimals, solving for T]
* - Distractor patterns: [A: adds instead of subtracts, B: subtracts 0.606, C: adds 331.3]
* - Constraints: [Real-world context]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/