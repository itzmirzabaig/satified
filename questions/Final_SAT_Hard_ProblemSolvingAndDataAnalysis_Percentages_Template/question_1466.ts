import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1466
 * 
 * ANALYSIS:
 * - Context: Chained Percentages.
 * - Given: 
 *   - a is X% of b.
 *   - b is Y% of c.
 * - Find: a is what percent of c?
 * - Logic: 
 *   a = (X/100) * b
 *   b = (Y/100) * c
 *   a = (X/100) * (Y/100) * c
 *   Percentage = (X*Y)/100.
 */

export const generator_1466 = {
  metadata: {
    id: "1466",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const pct1 = getRandomInt(120, 250); // e.g. 230%
    const pct2 = getRandomInt(20, 80);   // e.g. 60%
    
    // a = (pct1/100) * b
    // b = (pct2/100) * c
    // a = (pct1/100) * (pct2/100) * c = (pct1 * pct2 / 10000) * c
    // Percent = (pct1 * pct2) / 100
    
    const finalPct = (pct1 * pct2) / 100;
    
    // Distractors
    const d1 = pct1 + pct2; // Addition error
    const d2 = pct1 - pct2; // Subtraction error
    const d3 = Math.round(finalPct / 10); // Decimal error

    const optionsData = [
      { text: `${finalPct}%`, isCorrect: true },
      { text: `${d1}%`, isCorrect: false },
      { text: `${d2}%`, isCorrect: false },
      { text: `${d3}%`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `If $a$ is ${pct1}% of $b$, and $b$ is ${pct2}% of $c$, then $a$ is what percent of $c$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1. **Translate statements to equations:**
   $a = \\frac{${pct1}}{100} b = ${pct1/100} b$
   $b = \\frac{${pct2}}{100} c = ${pct2/100} c$

2. **Substitute $b$ into the first equation:**
   $a = ${pct1/100} (${pct2/100} c)$
   $a = (${pct1/100} \\times ${pct2/100}) c$
   $a = ${(pct1 * pct2) / 10000} c$

3. **Convert to percentage:**
   To express as a percentage, multiply by 100:
   ${(pct1 * pct2) / 10000} \\times 100 = ${finalPct}%
   
   Therefore, $a$ is ${finalPct}% of $c$.`
    };
  }
};
