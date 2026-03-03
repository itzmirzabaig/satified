import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 94838634
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [constant value: 39 (double digit)]
 * - Difficulty factors: [Understanding constant functions]
 * - Distractor patterns: [A = all zeros, C = linear pattern, D = decreasing pattern]
 * - Constraints: [None - conceptual]
 * - Question type: [Text→Multiple Choice with Tables in options]
 * - Figure generation: [Tables in options only]
 */

export const generator_94838634 = {
  metadata: {
    // id: "94838634",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random constant value (double digit, 20-80 range)
    const constVal = getRandomInt(20, 80);
    
    // STEP 2: Create table options
    // Option A: All zeros (common misconception)
    const tableA = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">f(x)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px;">0</td><td style="border: 1px solid currentColor; padding: 8px;">0</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px;">1</td><td style="border: 1px solid currentColor; padding: 8px;">0</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px;">2</td><td style="border: 1px solid currentColor; padding: 8px;">0</td></tr></tbody></table>`;
    
    // Option B: Constant value (correct)
    const tableB = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">f(x)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px;">0</td><td style="border: 1px solid currentColor; padding: 8px;">${constVal}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px;">1</td><td style="border: 1px solid currentColor; padding: 8px;">${constVal}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px;">2</td><td style="border: 1px solid currentColor; padding: 8px;">${constVal}</td></tr></tbody></table>`;
    
    // Option C: Linear pattern (wrong - looks like f(x) = constVal * x)
    const tableC = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">f(x)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px;">0</td><td style="border: 1px solid currentColor; padding: 8px;">0</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px;">1</td><td style="border: 1px solid currentColor; padding: 8px;">${constVal}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px;">2</td><td style="border: 1px solid currentColor; padding: 8px;">${constVal * 2}</td></tr></tbody></table>`;
    
    // Option D: Decreasing pattern (wrong - looks like f(x) = constVal - constVal * x)
    const tableD = `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">f(x)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px;">0</td><td style="border: 1px solid currentColor; padding: 8px;">${constVal}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px;">1</td><td style="border: 1px solid currentColor; padding: 8px;">0</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px;">2</td><td style="border: 1px solid currentColor; padding: 8px;">-${constVal}</td></tr></tbody></table>`;
    
    // STEP 3: Create options with tracking
    const optionsData = [
      { text: tableA, isCorrect: false, reason: "this shows f(x) = 0, not a constant function" },
      { text: tableB, isCorrect: true },
      { text: tableC, isCorrect: false, reason: "this shows a linear relationship with slope, not constant" },
      { text: tableD, isCorrect: false, reason: "this shows a decreasing linear relationship" }
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
      questionText: `For the given linear function $f(x)=${constVal}$, which table gives three values of $x$ and their corresponding values of $f(x)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: tableB, // The correct table HTML
      explanation: `Choice ${correctLetter} is correct. The function $f(x) = ${constVal}$ is a constant function, meaning $f(x) = ${constVal}$ for all values of $x$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 7e3f8363
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (0,3) and (7,31), slope: 4, intercept: 3]
 * - Difficulty factors: [Finding slope from two points, identifying y-intercept]
 * - Distractor patterns: [A = wrong slope + wrong intercept, B = wrong slope + wrong intercept, D = x-coord as slope]
 * - Constraints: [Points must give integer slope]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */