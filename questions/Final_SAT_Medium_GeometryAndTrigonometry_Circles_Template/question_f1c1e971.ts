import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f1c1e971
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle R: 2π/3, difference: 5π/12 (fractions with different denominators)]
 * - Difficulty factors: [Adding fractions with different denominators, converting to degrees]
 * - Distractor patterns: [A=just the difference in degrees, B=angle R in degrees only, C=correct, D=calculation error]
 * - Constraints: [Must find common denominator 12, convert final result to degrees]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f1c1e971 = {
  metadata: {
    // id: "f1c1e971",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base angle R (similar to 2π/3, i.e., 120°)
    // Use denominators that work well: 3, 4, 6, 12
    const angleRDenominators = [3, 4, 6];
    const denom1 = getRandomElement(angleRDenominators);
    const numer1 = getRandomInt(1, 2 * denom1 - 1); // Ensure reasonable angle
    
    // STEP 2: Generate difference angle (similar to 5π/12)
    const denom2 = 12; // Common denominator for SAT problems
    const numer2 = getRandomInt(1, 11); // Any reasonable numerator
    
    // STEP 3: Calculate angle T in radians (find common denominator)
    // T = R + difference = numer1/denom1 + numer2/12
    const lcd = 12; // Least common denominator
    const convertedNumer1 = numer1 * (lcd / denom1);
    const totalNumer = convertedNumer1 + numer2;
    
    // STEP 4: Convert to degrees
    const angleRDegrees = (numer1 * 180) / denom1;
    const differenceDegrees = (numer2 * 180) / 12;
    const totalDegrees = (totalNumer * 180) / lcd;
    
    // STEP 5: Create distractors
    const optionsData = [
      { text: differenceDegrees.toString(), isCorrect: false, reason: "This is the result if you converted only the difference to degrees but forgot to add it to angle R" },
      { text: angleRDegrees.toString(), isCorrect: false, reason: "This is the measure of angle R in degrees; the question asks for angle T, not R" },
      { text: totalDegrees.toString(), isCorrect: true },
      { text: (totalDegrees * 2).toString(), isCorrect: false, reason: "This results from a calculation error, possibly adding incorrectly" }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 7: Return question data
    return {
      questionText: `The measure of angle $R$ is $\\frac{${numer1}\\pi}{${denom1}}$ radians. The measure of angle $T$ is $\\frac{${numer2}\\pi}{${denom2}}$ radians greater than the measure of angle $R$. What is the measure of angle $T$, in degrees?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: totalDegrees.toString(),
      explanation: `Choice ${correctLetter} is correct. First, find the measure of angle T in radians: $T = \\frac{${numer1}\\pi}{${denom1}} + \\frac{${numer2}\\pi}{${denom2}}$. Converting to twelfths: $\\frac{${numer1}\\pi}{${denom1}} = \\frac{${convertedNumer1}\\pi}{12}$. Therefore, $T = \\frac{${convertedNumer1}\\pi}{12} + \\frac{${numer2}\\pi}{12} = \\frac{${totalNumer}\\pi}{12}$ radians. Converting to degrees: $\\frac{${totalNumer}\\pi}{12} \\times \\frac{180}{\\pi} = ${totalNumer} \\times 15 = ${totalDegrees}$ degrees. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 2d521ca9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle: 60° (simple, clean number)]
 * - Difficulty factors: [Degree to radian conversion, simplifying fractions]
 * - Distractor patterns: [A=30° equivalent, B=correct, C=120° equivalent, D=180° equivalent]
 * - Constraints: [Must reduce fraction 60/180 = 1/3]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/Circles/2d521ca9.ts