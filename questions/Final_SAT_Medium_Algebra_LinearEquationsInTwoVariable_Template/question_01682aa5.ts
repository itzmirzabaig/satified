import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 01682aa5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 18, 9 (small integers)]
 * - Difficulty factors: [Converting standard form to slope-intercept, finding perpendicular slope]
 * - Distractor patterns: [A: original slope, B: reciprocal without negative, C: correct answer, D: negative of original slope]
 * - Constraints: [Ensure clean integer division for slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_01682aa5 = {
  metadata: {
    // id: "01682aa5",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation parameters
    // Original: 2y + 18x = 9 → y = -9x + 4.5, slope = -9
    // Generate similar: ay + bx = c where b/a is a clean integer
    const a = getRandomInt(1, 5);
    const slope = getRandomInt(2, 12);
    const b = a * slope; // Ensures clean division
    const c = getRandomInt(1, 20);
    
    // Calculate perpendicular slope (negative reciprocal)
    const perpSlopeNum = 1;
    const perpSlopeDen = slope;
    
    // Generate distractors
    const distractorA = -slope; // Original slope
    const distractorBNum = 1;
    const distractorBDen = slope; // Reciprocal without negative
    
    // STEP 2: Create options with tracking
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: "This is the slope of line \\( p \\), not the perpendicular slope." },
      { text: `$-\\frac{${distractorBNum}}{${distractorBDen}}$`, isCorrect: false, reason: "This is the reciprocal of the slope of line \\( p \\), but not the negative reciprocal." },
      { text: `$\\frac{${perpSlopeNum}}{${perpSlopeDen}}$`, isCorrect: true, reason: "" },
      { text: `$${slope}$`, isCorrect: false, reason: "This is the negative of the slope of line \\( p \\), but not the reciprocal." }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build explanation with dynamic letters
    const explanation = `Choice ${correctLetter} is correct. First, we need to find the slope of line \\( p \\). The equation of line \\( p \\) is given as \\( ${a}y+${b}x=${c} \\). We can rewrite this equation in slope-intercept form, which is \\( y=mx+b \\), where \\( m \\) is the slope and \\( b \\) is the \\( y \\)-intercept. Subtract \\( ${b}x \\) from both sides: \\( ${a}y=-${b}x+${c} \\). Divide every term by \\( ${a} \\): \\( y=-${slope}x+\\frac{${c}}{${a}} \\). The slope of line \\( p \\) is \\(-${slope}\\). Since line \\( r \\) is perpendicular to line \\( p \\), the slope of line \\( r \\) must be the negative reciprocal of the slope of line \\( p \\). The negative reciprocal of \\(-${slope}\\) is \\( -\\frac{1}{-${slope}}=\\frac{${perpSlopeNum}}{${perpSlopeDen}} \\). Therefore, the slope of line \\( r \\) is \\( \\frac{${perpSlopeNum}}{${perpSlopeDen}} \\). Why other options are incorrect: ${incorrectOptions.map(opt => `Choice ${opt.letter} is incorrect; it ${opt.reason}`).join('. ')}.`;
    
    return {
      questionText: `Line \\( p \\) is defined by \\( ${a}y+${b}x=${c} \\). Line \\( r \\) is perpendicular to line \\( p \\) in the \\( xy \\)-plane. What is the slope of line \\( r \\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-9b0a4eae.ts
/**
 * Question ID: 9b0a4eae
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter: 36, point coordinates: (8,10)]
 * - Difficulty factors: [Interpreting coordinates in context, perimeter formula]
 * - Distractor patterns: [Swapping x and y, confusing with perimeter subtraction]
 * - Constraints: [x + y = 18 for rectangle with perimeter 36]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Line plot with point marker using Mafs]
 */
