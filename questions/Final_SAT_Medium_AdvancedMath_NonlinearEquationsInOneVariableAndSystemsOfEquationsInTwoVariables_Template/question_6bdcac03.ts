import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 6bdcac03
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: -841 (negative, perfect square)]
* - Difficulty factors: [Understanding x² cannot be negative for real x]
* - Distractor patterns: [A: x²=0, B: x²=positive, C: infinitely many]
* - Constraints: [Right side must be negative]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_6bdcac03 = {
 metadata: {
   // id: "6bdcac03",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate perfect square with negative sign
   const base = getRandomInt(15, 35); // Like 29 (since 29²=841)
   const negativeValue = -(base * base);
   
   // STEP 2: Create options
   const optionsData = [
     { text: "Exactly one", isCorrect: false },
     { text: "Exactly two", isCorrect: false },
     { text: "Infinitely many", isCorrect: false },
     { text: "Zero", isCorrect: true }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctOption = shuffledOptions.find(opt => opt.isCorrect);
   const correctLetter = correctOption.letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   const explanation = `The given equation is $x^2 = ${negativeValue}$. For any real number $x$, $x^2 \\ge 0$, so $x^2$ cannot be negative. Therefore, there are zero real solutions. Option ${incorrectOptions[0].letter} is incorrect (would be true for $x^2=0$), ${incorrectOptions[1].letter} is incorrect (would be true for $x^2=${-negativeValue}$), ${incorrectOptions[2].letter} is incorrect (quadratics never have infinitely many real solutions).`;
   
   return {
     questionText: `$$x^2 = ${negativeValue}$$\nHow many distinct real solutions does the given equation have?`,
     figureCode: null,
     options: shuffledOptions.map(o => ({ text: o.text })),
     correctAnswer: "Zero",
     explanation: explanation
   };
 }
};

/**
* Question ID: 3d7d7534
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [constant: 30 (double-digit), subtracted value: 7]
* - Difficulty factors: [Difference of squares pattern, zero product property]
* - Distractor patterns: [Not applicable - multi-accept fill in]
* - Constraints: [Must simplify to (d-30)(d+30)=0]
* - Question type: [Fill-in-the-blank, Multi-accept]
* - Figure generation: [None]
*/