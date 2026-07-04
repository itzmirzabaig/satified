import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 632
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 3/2]
* - Difficulty factors: [Solving for inverse relationship, reciprocal]
* - Distractor patterns: [B: multiplies by 3/2 instead of 2/3, C/D: use addition]
* - Constraints: [Simple linear relationship]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_632 = {
 metadata: {
   id: "632",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate coefficient num/den with num !== den and gcd(num, den) === 1,
   // so the fraction is never 1 (which would collapse all options into duplicates)
   // and is always in lowest terms.
   const coprimePairs: [number, number][] = [
     [2, 3], [2, 5], [3, 2], [3, 4], [3, 5],
     [4, 3], [4, 5], [5, 2], [5, 3], [5, 4]
   ];
   const [num, den] = getRandomElement(coprimePairs);
   
   // STEP 2: Create options. Each distractor carries its OWN reason so the
   // explanation stays correct no matter how the options are shuffled.
   const correctText = `$p = \\frac{${den}}{${num}}s$`;

   const optionsData = [
     { text: correctText, isCorrect: true, reason: '' },
     { text: `$p = \\frac{${num}}{${den}}s$`, isCorrect: false, reason: `multiplies by $\\frac{${num}}{${den}}$ instead of its reciprocal` },
     { text: `$p = \\frac{${den}}{${num}} + s$`, isCorrect: false, reason: 'adds instead of multiplying' },
     { text: `$p = \\frac{${num}}{${den}} + s$`, isCorrect: false, reason: 'adds instead of multiplying' }
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

   const explanation = `To solve $s = \\frac{${num}}{${den}}p$ for $p$, multiply both sides by $\\frac{${den}}{${num}}$: $\\frac{${den}}{${num}}s = p$. Thus, $p = \\frac{${den}}{${num}}s$. Option ${correctLetter} is correct. ${distractorSentences}`;
   
   return {
     questionText: `An oceanographer uses the equation $s = \\frac{${num}}{${den}}p$ to model the speed $s$, in knots, of an ocean wave, where $p$ represents the period of the wave, in seconds. Which of the following represents the period of the wave in terms of the speed of the wave?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: correctText,
     explanation: explanation
   };
 }
};
