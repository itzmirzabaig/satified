import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: af711d1b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [distances: 0.32, 0.56, 0.68, times: 8, 14, 17]
 * - Difficulty factors: [Finding rate from table, verifying linearity]
 * - Distractor patterns: [A = inverted slope, B = inverted slope (fraction), D = inverted slope (different fraction)]
 * - Constraints: [Table data must show consistent rate]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table in question]
 */

export const generator_af711d1b = {
  metadata: {
    // id: "af711d1b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Rate: 20-30 (minutes per km or similar)
    const rate = getRandomInt(20, 30);
    // Base distance and time values
    const baseDist = Math.round((Math.random() * 0.2 + 0.2) * 100) / 100; // 0.2-0.4
    const baseTime = Math.round(rate * baseDist);
    
    // Generate table data with consistent rate
    const d1 = baseDist;
    const t1 = baseTime;
    const d2 = Math.round((d1 + 0.2) * 100) / 100;
    const t2 = Math.round(rate * d2);
    const d3 = Math.round((d2 + 0.15) * 100) / 100;
    const t3 = Math.round(rate * d3);
    
    // STEP 2: Build table HTML
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">Distance (kilometers)</th><th style="border: 1px solid currentColor; padding: 8px;">Average time (minutes)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${d1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${t1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${d2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${t2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${d3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${t3}</td></tr></tbody></table>`;
    
    // STEP 3: Create equation options
    // Correct: t = rate * d
    const correctEq = `t=${rate}d`;
    // Distractor A: t = d/rate (inverted)
    const distA = `t=\\frac{1}{${rate}}d`;
    // Distractor B: same as A but written differently
    // Actually let's make B: t = d/rate as fraction 1/rate simplified if possible
    // Distractor D: t = d/rate with wrong number
    
    const optionsData = [
      { text: `t=\\frac{1}{${rate + 5}}d`, isCorrect: false, reason: "inverts the relationship incorrectly" },
      { text: distA, isCorrect: false, reason: "inverts the rate relationship" },
      { text: correctEq, isCorrect: true },
      { text: `t=\\frac{1}{Math.max(1, Math.floor(rate/2))}d`, isCorrect: false, reason: "uses incorrect inverted rate" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `The table gives the average time $t$, in minutes, it takes Carly to travel a certain distance $d$, in kilometers. Which equation could represent this linear relationship? ${tableCode}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The table shows a constant rate. Using the first two points: slope = $\\frac{${t2} - ${t1}}{${d2} - ${d1}} = \\frac{${t2 - t1}}{${(d2 - d1).toFixed(2)}} = ${rate}$. Thus $t = ${rate}d$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: f7e39fe9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = mx - 28, x values: 10,15,20,25, f(x): 82,137,192,247]
 * - Difficulty factors: [Finding slope from table with given intercept]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Intercept -28 given, find m]
 * - Question type: [Table in Question→Fill in Blank]
 * - Figure generation: [HTML Table]
 */