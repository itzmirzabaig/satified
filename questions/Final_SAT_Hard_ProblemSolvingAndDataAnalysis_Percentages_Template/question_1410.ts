import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1410
 * 
 * ANALYSIS:
 * - Logic Check: Validated.
 *   a = k1(b+c), b = k2(c).
 *   c = b/k2.
 *   a = k1(b + b/k2) = k1*b(1 + 1/k2) = b * k1 * (k2+1)/k2.
 *   a/b = k1 * (k2+1)/k2.
 *   This formula is implemented correctly.
 */
export const generator_1410 = {
  metadata: {
    id: "1410",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate percentages
    const P1 = getRandomInt(1500, 2500); // e.g., 2000%
    const P2 = getRandomInt(50, 90);     // e.g., 80%
    
    // STEP 2: Calculate Ratio
    // Formula derived: Percent = P1 * (P2 + 100) / P2
    const exactVal = P1 * ((P2 + 100) / P2);
    const percentageResult = Math.round(exactVal);

    // STEP 3: Distractors
    const distractor1 = Math.round(exactVal / 100); // Forgot to convert ratio to percent
    const distractor2 = Math.round(P1 * P2 / 100); // Naive multiplication
    const distractor3 = Math.round(P1 + P2); // Naive addition

    const optionsData = [
      { text: `${percentageResult}\\%`, isCorrect: true },
      { text: `${distractor1}\\%`, isCorrect: false },
      { text: `${distractor2}\\%`, isCorrect: false },
      { text: `${distractor3}\\%`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    
    return {
      questionText: `The positive number $a$ is ${P1}\\% of the sum of the positive numbers $b$ and $c$, and $b$ is ${P2}\\% of $c$. What percent of $b$ is $a$? (Round to the nearest whole number if necessary.)`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Set up equations:**
    $a = \\frac{${P1}}{100}(b + c)$
    $b = \\frac{${P2}}{100}c$

2.  **Solve for $c$ in terms of $b$:**
    $c = \\frac{100b}{${P2}}$

3.  **Substitute $c$ into the first equation:**
    $a = \\frac{${P1}}{100} \\left( b + \\frac{100b}{${P2}} \\right)$
    
4.  **Factor out $b$:**
    $a = \\frac{${P1}}{100} \\cdot b \\left( 1 + \\frac{100}{${P2}} \\right)$
    $a = \\frac{${P1}}{100} \\cdot b \\left( \\frac{${P2} + 100}{${P2}} \\right)$

5.  **Calculate the percentage:**
    $\\frac{a}{b} = \\frac{${P1}}{100} \\cdot \\frac{${P2 + 100}}{${P2}} \\approx ${percentageResult / 100}$
    
    To convert to a percentage, multiply by 100:
    $${percentageResult}\\%$`
    };
  }
};
