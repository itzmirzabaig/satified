import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c651cc56
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table: (0,-2), (2,4), (6,16), slope: 3, f(3) = 7]
 * - Difficulty factors: [Finding slope from table, extending to find missing value]
 * - Distractor patterns: [A = linear step, C = wrong calculation, D = wrong calculation]
 * - Constraints: [Table must show consistent linear pattern]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_c651cc56 = {
  metadata: {
    // id: "c651cc56",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: 2-5
    const m = getRandomInt(2, 5);
    // Intercept: -5 to 5
    const b = getRandomInt(-5, 5);
    // x values in table: 0, step, 3*step
    const step = 2;
    const x1 = 0;
    const x2 = step;
    const x3 = 3 * step;
    // Target x for question
    const targetX = step + 1; // Between x2 and x3
    
    // STEP 2: Calculate table values
    const y1 = m * x1 + b;
    const y2 = m * x2 + b;
    const y3 = m * x3 + b;
    const targetY = m * targetX + b;
    
    // STEP 3: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">f(x)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${y3}</td></tr></tbody></table>`;
    
    // STEP 4: Create options
    const optionsData = [
      { text: (targetY - 1).toString(), isCorrect: false, reason: "off by one error" },
      { text: targetY.toString(), isCorrect: true },
      { text: (targetY + 1).toString(), isCorrect: false, reason: "computation error" },
      { text: (targetY + 2).toString(), isCorrect: false, reason: "computation error" }
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
      questionText: `Some values of the linear function $f$ are shown in the table above. What is the value of $f(${targetX})$? ${tableCode}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: targetY.toString(),
      explanation: `Choice ${correctLetter} is correct. The slope is $\\frac{${y2} - (${y1})}{${x2} - ${x1}} = \\frac{${y2 - y1}}{${step}} = ${m}$. The y-intercept is ${y1}. So $f(x) = ${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}$. Thus $f(${targetX}) = ${m}(${targetX}) ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${targetY}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: c22b5f25
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (-2,3) and (4,-5), slope: -4/3, intercept: 1/3]
 * - Difficulty factors: [Finding equation from two points with negative slope]
 * - Distractor patterns: [A = wrong slope, B = wrong slope, D = wrong slope]
 * - Constraints: [Points must give clean fractional slope]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */