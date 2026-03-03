import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: fad2f98c
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 3, -4, +5]
* - Difficulty factors: [Zero product property with three factors]
* - Distractor patterns: [A: -4 (wrong sign), C: 3 (coefficient), D: 5 (wrong sign)]
* - Constraints: [Solutions are 0, 4, -5]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_fad2f98c = {
 metadata: {
   // id: "fad2f98c",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate three factors
   // a*x*(x-b)*(x+c) = 0
   const a = getRandomInt(2, 5);
   const b = getRandomInt(2, 6);
   const c = getRandomInt(2, 6);
   
   // Solutions: 0, b, -c
   const sol1 = 0;
   const sol2 = b;
   const sol3 = -c;
   
   // STEP 2: Create options (one correct, others wrong)
   const optionsData = [
     { text: `$-${b}$`, isCorrect: false }, // Sign error on b
     { text: `$${sol1}$`, isCorrect: true },
     { text: `$${a}$`, isCorrect: false }, // Coefficient
     { text: `$${c}$`, isCorrect: false } // Wrong sign on c
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   
   const explanation = `Set each factor to zero: $${a}x=0\\Rightarrow x=0$, $x-${b}=0\\Rightarrow x=${b}$, $x+${c}=0\\Rightarrow x=-${c}$. Only $0$ is among the options. Choice ${correctLetter} is correct.`;
   
   return {
     questionText: `$$${a}x(x - ${b})(x + ${c}) = 0$$\nWhat is one of the solutions to the given equation?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: sol1.toString(),
     explanation: explanation
   };
 }
};

/**
* Question ID: a267bd29
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficients: 1, 12, -40]
* - Difficulty factors: [Quadratic formula with simplification, radical form]
* - Distractor patterns: [A: 6-2√19 (wrong sign), B: 2√19 (incomplete), C: √19 (simplified wrong)]
* - Constraints: [Discriminant must not be perfect square, requires simplification]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/