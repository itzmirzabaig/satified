import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 1b1deebe
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: ax+by=72, 6x+2by=56, intersection at (4,y)]
 * - Difficulty factors: [System with parameters, elimination with constraint]
 * - Distractor patterns: [Calculation errors, wrong substitution]
 * - Constraints: [x=4 must satisfy both equations after finding a]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_1b1deebe = {
  metadata: {
    // id: "1b1deebe",
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
      
      result = {
        questionText: `In the given system of equations, $a$ and $b$ are constants. The graphs of these equations in the $xy$-plane intersect at the point $(${x_val}, y)$. What is the value of $a$? $$${correctA}x + ${b}y = ${c1}$$ $$6x + ${2*b}y = ${c2}$$`,
        figureCode: null,
        options: shuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: correctA.toString(),
        explanation: `Choice ${correctLetter} is correct. Multiplying the first equation by -2 yields $-${2 * correctA}x - ${2 * b}y = ${-2 * c1}$. Adding this to the second equation gives $(-${2 * correctA} + 6)x = ${-2 * c1 + c2}$, or $${-2 * correctA + 6}x = ${rhs}$. Since the intersection has x-coordinate ${x_val}, substituting gives $(-${2 * correctA + 6})(${x_val}) = ${rhs}$, so $-${2 * correctA + 6} = ${rhs / x_val}$. Solving yields $a = ${correctA}$. Choice ${incorrectOptions[0].letter} is incorrect and may result from conceptual or calculation errors. Choice ${incorrectOptions[1].letter} is incorrect and may result from conceptual or calculation errors. Choice ${incorrectOptions[2].letter} is incorrect and may result from conceptual or calculation errors.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: 571174f3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 2/5, 7/5, 2/7, 5/2]
 * - Difficulty factors: [Infinitely many solutions condition, ratio of parameters]
 * - Distractor patterns: [None - fill in blank, but need fraction format]
 * - Constraints: [Coefficients must be proportional: A1/A2 = B1/B2 = C1/C2]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */