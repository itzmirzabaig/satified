import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1236
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: ax+by=72, 6x+2by=56, intersection at (4,y)]
 * - Difficulty factors: [System with parameters, elimination with constraint]
 * - Distractor patterns: [Calculation errors, wrong substitution]
 * - Constraints: [x=4 must satisfy both equations after finding a]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_1236 = {
  metadata: {
    id: "1236",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;
    
    while (attempts < maxAttempts && !result) {
      attempts++;
      
      const x_val = getRandomInt(2, 6);
      const b = getRandomInt(2, 5);
      const c1 = getRandomInt(60, 100);
      const c2 = getRandomInt(40, 80);
      
      const rhs = -2 * c1 + c2;
      const a_coeff = (rhs / x_val - 6) / -2;
      
      if (a_coeff !== Math.floor(a_coeff) || a_coeff <= 0) {
        continue;
      }
      
      const y_val = (c1 - a_coeff * x_val) / b;
      const check = 6 * x_val + 2 * b * y_val;
      
      if (Math.abs(check - c2) > 0.001) {
        continue;
      }
      
      const correctA = Math.round(a_coeff);
      const distractors = [
        correctA - 11,
        correctA - 10,
        correctA - 8,
      ].filter(d => d > 0 && d !== correctA);
      
      const optionsData = [
        { text: distractors[0]?.toString() || (correctA - 5).toString(), isCorrect: false },
        { text: distractors[1]?.toString() || (correctA - 3).toString(), isCorrect: false },
        { text: distractors[2]?.toString() || (correctA + 2).toString(), isCorrect: false },
        { text: correctA.toString(), isCorrect: true }
      ];
      
      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));
      
      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;
      const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
      
      // Value of (6 - 2a) once x = x_val. Always an integer for accepted draws.
      const rhsOverX = rhs / x_val;

      result = {
        questionText: `In the given system of equations, $a$ and $b$ are constants. The graphs of these equations in the $xy$-plane intersect at the point $(${x_val}, y)$. What is the value of $a$? $$ax + by = ${c1}$$ $$6x + 2by = ${c2}$$`,
        figureCode: null,
        options: shuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: correctA.toString(),
        explanation: `Choice ${correctLetter} is correct. Multiply the first equation by $-2$ to get $-2ax - 2by = ${-2 * c1}$. Adding this to the second equation eliminates the $y$-term (the $-2by$ and $2by$ cancel): $(6 - 2a)x = ${rhs}$. Because the graphs intersect where $x = ${x_val}$, substitute $x = ${x_val}$: $(6 - 2a)(${x_val}) = ${rhs}$, so $6 - 2a = ${rhsOverX}$. Then $-2a = ${rhsOverX - 6}$, which gives $a = ${correctA}$. Choice ${incorrectOptions[0].letter} is incorrect and may result from an arithmetic or sign error while eliminating $y$. Choice ${incorrectOptions[1].letter} is incorrect and may result from an arithmetic or sign error while eliminating $y$. Choice ${incorrectOptions[2].letter} is incorrect and may result from an arithmetic or sign error while eliminating $y$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};
