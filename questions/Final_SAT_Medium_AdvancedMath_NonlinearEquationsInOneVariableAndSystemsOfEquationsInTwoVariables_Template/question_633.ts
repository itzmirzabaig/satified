import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 633
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: -841 (negative, perfect square)]
* - Difficulty factors: [Understanding x² cannot be negative for real x]
* - Distractor patterns: [A: x²=0, B: x²=positive, C: infinitely many]
* - Constraints: [Right side must be negative]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_633 = {
 metadata: {
   id: "633",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate perfect square with negative sign
   const base = getRandomInt(15, 35); // Like 29 (since 29²=841)
   const negativeValue = -(base * base);
   
   // STEP 2: Create options. Each distractor carries its OWN reason so the
   // explanation stays correct no matter how the options are shuffled.
   const optionsData = [
     { text: "Exactly one", isCorrect: false, reason: `would require $x^2=0$` },
     { text: "Exactly two", isCorrect: false, reason: `would require $x^2=${-negativeValue}$ (a positive value)` },
     { text: "Infinitely many", isCorrect: false, reason: `is impossible, since a quadratic equation never has infinitely many real solutions` },
     { text: "Zero", isCorrect: true, reason: '' }
   ];

   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));

   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

   const distractorSentences = incorrectOptions
     .map(opt => `Option ${opt.letter} ${opt.reason}.`)
     .join(' ');

   const explanation = `The given equation is $x^2 = ${negativeValue}$. For any real number $x$, $x^2 \\ge 0$, so $x^2$ cannot be negative. Therefore, there are zero real solutions, so Option ${correctLetter} is correct. ${distractorSentences}`;
   
   return {
     questionText: `$$x^2 = ${negativeValue}$$\nHow many distinct real solutions does the given equation have?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: "Zero",
     explanation: explanation
   };
 }
};
