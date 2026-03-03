import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b2fe7ab6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [g(1)=54, g(2)=51, g(3)=48, g(4)=45, slope=-3, intercept=57]
 * - Difficulty factors: [Finding y-intercept from table with negative slope]
 * - Distractor patterns: [A = slope, B = wrong calculation, C = first value]
 * - Constraints: [Table must show consistent linear decrease]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_b2fe7ab6 = {
  metadata: {
    // id: "b2fe7ab6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope (negative): -2 to -5
    const m = -getRandomInt(2, 5);
    // Starting x: 1
    const xStart = 1;
    // g(xStart): 40-60
    const gStart = getRandomInt(40, 60);
    // Number of rows
    const rows = 4;
    
    // STEP 2: Generate table values
    const tableData = [];
    for (let i = 0; i < rows; i++) {
      const x = xStart + i;
      const g = gStart + m * i;
      tableData.push({ x, g });
    }
    
    // Calculate intercept: g = m*x + b → b = g - m*x
    const b = tableData[0].g - m * tableData[0].x;
    
    // STEP 3: Build table
    let tableRows = '';
    for (const row of tableData) {
      tableRows += `<tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${row.x}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${row.g}</td></tr>`;
    }
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">g(x)</th></tr></thead><tbody>${tableRows}</tbody></table>`;
    
    // STEP 4: Create options
    const optionsData = [
      { text: Math.abs(m).toString(), isCorrect: false, reason: "gives the slope instead of the y-intercept" },
      { text: (b - 30).toString(), isCorrect: false, reason: "results from miscalculation" },
      { text: gStart.toString(), isCorrect: false, reason: "gives g(1) instead of the y-intercept" },
      { text: b.toString(), isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 6: Return question data
    return {
      questionText: `For the linear function $g$, the table shows four values of $x$ and their corresponding values of $g(x)$. The function can be written as $g(x) = mx + b$, where $m$ and $b$ are constants. What is the value of $b$? ${tableCode}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: b.toString(),
      explanation: `Choice ${correctLetter} is correct. The slope is $\\frac{${tableData[1].g} - ${tableData[0].g}}{${tableData[1].x} - ${tableData[0].x}} = \\frac{${m}}{1} = ${m}$. Using point (${tableData[0].x}, ${tableData[0].g}): ${tableData[0].g} = ${m}(${tableData[0].x}) + b, so $b = ${tableData[0].g} - (${m * tableData[0].x}) = ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 1bc11c4e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [g(m) = -0.05m + 12.1, find rate per mile]
 * - Difficulty factors: [Interpreting slope in context with decimals]
 * - Distractor patterns: [B = initial amount, C = mpg calculation, D = total range]
 * - Constraints: [None - straightforward interpretation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */