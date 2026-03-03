import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9a144a01
 * 
 * ANALYSIS:
 * - Skill: Exponential vs Linear Growth comparison.
 * - Logic: Compare f(x) = b^x and g(x) = mx + k.
 * - Constraint: They must intersect at a specific integer c > 0.
 * - Condition: For 0 < x < c, Exponential < Linear. For x > c, Exponential > Linear.
 * - Regeneratable: Selects from valid tuples of (base, slope, intercept, intersection) to ensure the math holds.
 */

export const generator_9a144a01 = {
  metadata: {
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // Define valid scenarios where b^x = mx + k at x = c
    // and k > 1 (so b^0 < m(0) + k implies 1 < k)
    const scenarios = [
      { b: 2, m: 2, k: 2, c: 3 }, // Original: 2^x = 2x + 2 at x=3
      { b: 2, m: 1, k: 5, c: 3 }, // 2^x = x + 5 at x=3 (8=8)
      { b: 2, m: 1, k: 2, c: 2 }, // 2^x = x + 2 at x=2 (4=4)
      { b: 2, m: 3, k: 4, c: 4 }, // 2^x = 3x + 4 at x=4 (16=16)
      { b: 2, m: 2, k: 8, c: 4 }, // 2^x = 2x + 8 at x=4 (16=16)
      { b: 3, m: 2, k: 5, c: 2 }, // 3^x = 2x + 5 at x=2 (9=9)
      { b: 3, m: 3, k: 3, c: 2 }, // 3^x = 3x + 3 at x=2 (9=9)
    ];

    const { b, m, k, c } = getRandomElement(scenarios);

    // Format expressions
    // Exponential: b^x
    const expStr = `${b}^x`;
    
    // Linear: mx + k (handle m=1 case)
    const linStr = m === 1 ? `x + ${k}` : `${m}x + ${k}`;

    // Generate Options
    // The logic is: starts with Exp < Lin, crosses at c, then Exp > Lin
    const optionsData = [
      { 
        text: `For all $x > 0$, it is true that $${expStr} < ${linStr}$.`, 
        isCorrect: false,
        reason: `is incorrect because $${expStr} > ${linStr}$ when $x > ${c}$`
      },
      { 
        text: `For all $x > 0$, it is true that $${expStr} > ${linStr}$.`, 
        isCorrect: false,
        reason: `is incorrect because $${expStr} < ${linStr}$ when $0 < x < ${c}$`
      },
      { 
        text: `There is a constant $c$ such that if $0 < x < c$, then $${expStr} < ${linStr}$, but if $x > c$, then $${expStr} > ${linStr}$.`, 
        isCorrect: true,
        reason: ""
      },
      { 
        text: `There is a constant $c$ such that if $0 < x < c$, then $${expStr} > ${linStr}$, but if $x > c$, then $${expStr} < ${linStr}$.`, 
        isCorrect: false,
        reason: `is incorrect because $${expStr} < ${linStr}$ when $0 < x < ${c}$ and $${expStr} > ${linStr}$ when $x > ${c}$`
      }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // Calculate values for explanation
    const yVal = Math.pow(b, c); // Intersection Y value
    const expZero = 1; // b^0
    const linZero = k; // m(0) + k
    
    return {
      questionText: `Which of the following is true about the values of $${expStr}$ and $${linStr}$ for $x > 0$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
      First, check the values at $x = 0$:
      The value of $${expStr}$ is $${b}^0 = 1$.
      The value of $${linStr}$ is $${m}(0) + ${k} = ${k}$.
      Since $1 < ${k}$, $${expStr} < ${linStr}$ for small positive values of $x$.
      
      As the value of $x$ increases, the exponential function $${expStr}$ eventually grows faster than the linear function $${linStr}$.
      
      Check the intersection point at $x = ${c}$:
      $${expStr} = ${b}^${c} = ${yVal}$.
      $${linStr} = ${m}(${c}) + ${k} = ${yVal}$.
      
      The two values are equal at $x = ${c}$.
      
      For $x > ${c}$, the exponential function exceeds the linear function.
      
      Thus, there is a constant, $${c}$, such that when $0 < x < ${c}$, then $${expStr} < ${linStr}$, but when $x > ${c}$, then $${expStr} > ${linStr}$.
      
      Choice ${incorrectOptions[0].letter} ${incorrectOptions[0].reason}. 
      Choice ${incorrectOptions[1].letter} ${incorrectOptions[1].reason}. 
      Choice ${incorrectOptions[2].letter} ${incorrectOptions[2].reason}.`
    };
  }
};