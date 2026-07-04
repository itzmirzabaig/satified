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
    // a = (pct1/100) * b
    // b = (pct2/100) * c
    // a = (pct1/100) * (pct2/100) * c = (pct1 * pct2 / 10000) * c
    // Percent = (pct1 * pct2) / 100
    //
    // The distractors are derived from pct1/pct2, so for some draws one of them can
    // land exactly on the correct value (e.g. pct1=150, pct2=60 gives finalPct = 90
    // and the subtraction distractor pct1 - pct2 = 90 — a duplicated option). Redraw
    // with a bounded loop until all four option values are numerically distinct.
    let pct1 = getRandomInt(120, 250); // e.g. 230%
    let pct2 = getRandomInt(20, 80);   // e.g. 60%
    let finalPct = (pct1 * pct2) / 100;
    let d1 = pct1 + pct2;              // Addition error
    let d2 = pct1 - pct2;             // Subtraction error
    let d3 = Math.round(finalPct / 10); // Decimal error

    const distinct = () => new Set([finalPct, d1, d2, d3]).size === 4;
    let guard = 0;
    while (!distinct() && guard++ < 50) {
      pct1 = getRandomInt(120, 250);
      pct2 = getRandomInt(20, 80);
      finalPct = (pct1 * pct2) / 100;
      d1 = pct1 + pct2;
      d2 = pct1 - pct2;
      d3 = Math.round(finalPct / 10);
    }

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
