import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 433184f1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerators: single digit, denominators: linear expressions]
 * - Difficulty factors: [Rational expression subtraction, common denominators, distribution with negatives]
 * - Distractor patterns: [Sign errors, forgetting to distribute negative, wrong common denominator]
 * - Constraints: [None specific]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_433184f1 = {
  metadata: {
    // id: "433184f1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const a = getRandomInt(3, 6);
    const b = getRandomInt(2, 5);
    const c = getRandomInt(2, 6);
    const d = getRandomInt(1, 4);
    
    // Calculate result
    // a/(bx-c) - 1/(x+d) = [a(x+d) - (bx-c)] / [(bx-c)(x+d)]
    // = [ax + ad - bx + c] / [(bx-c)(x+d)]
    // = [(a-b)x + (ad+c)] / [(bx-c)(x+d)]
    
    const numCoeff = a - b;
    const numConst = a * d + c;
    
    // STEP 2: Build the correct answer expression
    let numerator: string;
    if (numCoeff === 0) {
      numerator = numConst.toString();
    } else if (numCoeff === 1) {
      numerator = numConst >= 0 ? `x+${numConst}` : `x-${Math.abs(numConst)}`;
    } else if (numCoeff === -1) {
      numerator = numConst >= 0 ? `-x+${numConst}` : `-x-${Math.abs(numConst)}`;
    } else {
      const sign = numConst >= 0 ? '+' : '-';
      numerator = `${numCoeff}x${sign}${Math.abs(numConst)}`;
    }
    
    const correctAnswerText = `\\frac{${numerator}}{(x+${d})(${b}x-${c})}`;
    
    // STEP 3: Create distractors
    const distractorA = `\\frac{1}{(x+${d})(${b}x-${c})}`;
    
    const distractorB = `\\frac{${a-1}}{${b-1}x-${c+d}}`;
    
    const wrongNumConst = a * d - c;
    let wrongNumerator: string;
    if (numCoeff === 0) {
      wrongNumerator = wrongNumConst.toString();
    } else if (numCoeff === 1) {
      wrongNumerator = wrongNumConst >= 0 ? `x+${wrongNumConst}` : `x-${Math.abs(wrongNumConst)}`;
    } else {
      const sign = wrongNumConst >= 0 ? '+' : '-';
      wrongNumerator = `${numCoeff}x${sign}${Math.abs(wrongNumConst)}`;
    }
    const distractorC = `\\frac{${wrongNumerator}}{(x+${d})(${b}x-${c})}`;
    
    const distractorD = `\\frac{${a + 1}x+${Math.abs(a - c)}}{(x+${d})(${b}x-${c})}`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from using only the common denominator without proper numerator" },
      { text: distractorB, isCorrect: false, reason: "results from incorrectly subtracting numerators and denominators separately" },
      { text: distractorC, isCorrect: false, reason: "results from a sign error when distributing the negative" },
      { text: correctAnswerText, isCorrect: true }
    ];
    
    // STEP 4: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Question text
    const questionText = `Which expression is equivalent to $\\frac{${a}}{${b}x-${c}} - \\frac{1}{x+${d}}$?`;
    
    // STEP 6: Explanation
    const explanation = `Choice ${correctLetter} is correct. To subtract these fractions, rewrite them with a common denominator of $(x+${d})(${b}x-${c})$.

The first term: $\\frac{${a}}{${b}x-${c}} \\cdot \\frac{x+${d}}{x+${d}} = \\frac{${a}(x+${d})}{(x+${d})(${b}x-${c})} = \\frac{${a}x+${a*d}}{(x+${d})(${b}x-${c})}$

The second term: $\\frac{1}{x+${d}} \\cdot \\frac{${b}x-${c}}{${b}x-${c}} = \\frac{${b}x-${c}}{(x+${d})(${b}x-${c})}$

Subtracting: $\\frac{${a}x+${a*d}}{(x+${d})(${b}x-${c})} - \\frac{${b}x-${c}}{(x+${d})(${b}x-${c})} = \\frac{(${a}x+${a*d}) - (${b}x-${c})}{(x+${d})(${b}x-${c})}$

Simplifying the numerator: $${a}x+${a*d}-${b}x+${c} = ${numCoeff !== 0 ? numCoeff + 'x' : ''}${numCoeff !== 0 ? (numConst >= 0 ? '+' : '-') : ''}${Math.abs(numConst)}$

This gives $\\frac{${numerator}}{(x+${d})(${b}x-${c})}$.

Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. 
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswerText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: c81b6c57
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: small integers, constants: varied]
 * - Difficulty factors: [Distribution, combining like terms, setting up equation from coefficient comparison]
 * - Distractor patterns: [Calculation errors, wrong distribution, sign errors]
 * - Constraints: [Must expand and compare all coefficients]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */