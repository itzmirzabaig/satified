import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 868fc236
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [protein: 4.0 cal = 16.7 kJ, ratio ~4.175]
 * - Difficulty factors: [Finding proportional relationship from table]
 * - Distractor patterns: [A = inverted ratio, C = inverted variables, D = product relationship]
 * - Constraints: [Table data must be consistent]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_868fc236 = {
  metadata: {
    // id: "868fc236",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Conversion factor: 3.5-4.5
    const factor = Math.round((Math.random() * 1 + 3.5) * 10) / 10;
    
    // Create consistent table data
    const pCal = 4.0;
    const pKj = Math.round(pCal * factor * 10) / 10;
    const fCal = 9.0;
    const fKj = Math.round(fCal * factor * 10) / 10;
    const cCal = 4.0;
    const cKj = Math.round(cCal * factor * 10) / 10;
    
    // STEP 2: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">Macronutrient</th><th style="border: 1px solid currentColor; padding: 8px;">Food calories</th><th style="border: 1px solid currentColor; padding: 8px;">Kilojoules</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px;">Protein</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${pCal}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${pKj}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px;">Fat</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${fCal}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${fKj}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px;">Carbohydrate</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${cCal}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${cKj}</td></tr></tbody></table>`;
    
    // STEP 3: Create options
    const correctEq = `k=${factor}x`;
    const distA = `k=${(1/factor).toFixed(2)}x`;
    const distC = `x=${factor}k`;
    const distD = `xk=${factor}`;
    
    const optionsData = [
      { text: distA, isCorrect: false, reason: "inverts the conversion ratio" },
      { text: correctEq, isCorrect: true },
      { text: distC, isCorrect: false, reason: "incorrectly inverts the variables" },
      { text: distD, isCorrect: false, reason: "suggests an inverse relationship instead of direct proportion" }
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
      questionText: `The table above gives the typical amounts of energy per gram, expressed in both food calories and kilojoules, of the three macronutrients in food. If $x$ food calories is equivalent to $k$ kilojoules, of the following, which best represents the relationship between $x$ and $k$? ${tableCode}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The ratio of kilojoules to calories is approximately $\\frac{${pKj}}{${pCal}} \\approx ${factor}$. Thus $k = ${factor}x$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

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