import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7e1bff94
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h=1,f(h)=155; h=3,f(h)=285, slope=65, intercept=90]
 * - Difficulty factors: [Finding equation from two points in table]
 * - Distractor patterns: [A = inverted, B = swapped slope/intercept, D = wrong values]
 * - Constraints: [Table data must be consistent]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_7e1bff94 = {
  metadata: {
    // id: "7e1bff94",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Hours: h1 small, h2 larger
    const h1 = getRandomInt(1, 3);
    const h2 = h1 + getRandomInt(1, 3);
    // Slope: 50-80
    const m = getRandomInt(50, 80);
    // Intercept: 60-120
    const b = getRandomInt(60, 120);
    // Calculate charges
    const f1 = m * h1 + b;
    const f2 = m * h2 + b;
    
    // STEP 2: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">h</th><th style="border: 1px solid currentColor; padding: 8px;">f(h)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${h1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${f1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${h2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${f2}</td></tr></tbody></table>`;
    
    // STEP 3: Create options
    const correctEq = `f(h) = ${m}h + ${b}`;
    const distA = `f(h) = ${Math.floor(m/3)}h + ${b + 50}`;
    const distB = `f(h) = ${b}h + ${m}`;
    const distD = `f(h) = ${Math.floor(b/2)}h + ${m + 10}`;
    
    const optionsData = [
      { text: distA, isCorrect: false, reason: "incorrect slope and intercept" },
      { text: distB, isCorrect: false, reason: "swaps the slope and intercept values" },
      { text: correctEq, isCorrect: true },
      { text: distD, isCorrect: false, reason: "incorrect values" }
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
      questionText: `The table gives the number of hours, $h$, of labor and a plumber's total charge $f(h)$, in dollars, for two different jobs. Which equation defines $f$? ${tableCode}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The slope is $\\frac{${f2} - ${f1}}{${h2} - ${h1}} = \\frac{${f2 - f1}}{${h2 - h1}} = ${m}$. Using $f(${h1}) = ${f1}$: ${f1} = ${m}(${h1}) + b, so $b = ${f1} - ${m * h1} = ${b}$. Thus $f(h) = ${m}h + ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 946ab892
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2, point: (1,14), intercept: 12]
 * - Difficulty factors: [Finding equation given slope and point]
 * - Distractor patterns: [A = no intercept, B = wrong intercept, D = y-value as intercept]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */