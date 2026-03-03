import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 94726
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: (1/3)π, height: 9]
 * - Difficulty factors: [Solving cone volume for radius, algebraic manipulation]
 * - Distractor patterns: [A: 1/3 (correct), B: 1/√3 (wrong algebra), C: √3 (confused), D: 3 (solving for height)]
 * - Constraints: [Clean fractional answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_94726 = {
  metadata: {
    // id: "94726",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values for clean answer
    // V = (1/3)πr²h, want r to be nice fraction
    // If V = (1/3)π and h = 9, then r² = 1/9, r = 1/3
    
    const height = getRandomInt(4, 16);
    // Choose r² to be 1/perfect square for clean answer
    const rDenominator = getRandomInt(2, 5);
    const rSquared = 1 / (rDenominator * rDenominator);
    
    // Volume = (1/3)π * r² * h = (1/3)π * (1/d²) * h = h/(3d²) * π
    // For original: h=9, d=3, so V = 9/(3*9) = 9/27 = 1/3 ✓
    const volumeNumerator = height;
    const volumeDenominator = 3 * rDenominator * rDenominator;
    
    // Simplify fraction
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(volumeNumerator, volumeDenominator);
    const simplifiedNum = volumeNumerator / commonDivisor;
    const simplifiedDen = volumeDenominator / commonDivisor;
    
    const volumeString = simplifiedDen === 1 
      ? (simplifiedNum === 1 ? "" : simplifiedNum.toString())
      : `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    
    // STEP 2: Create distractors
    const correctText = `\\frac{1}{${rDenominator}}`;
    const distractorB = `\\frac{1}{\\sqrt{${rDenominator}}}`;
    const distractorC = `\\sqrt{${rDenominator}}`;
    const distractorD = (Math.sqrt(height)).toFixed(2); // Wrong: treating as height answer
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `A right circular cone has a volume of $${volumeString}\\pi$ cubic feet and a height of $${height}$ feet. What is the radius, in feet, of the base of the cone?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Using $V = \\frac{1}{3}\\pi r^2 h$: $${volumeString}\\pi = \\frac{1}{3}\\pi r^2(${height})$. Dividing by $\\pi$: $${volumeString} = \\frac{${height}}{3}r^2 = ${height/3}r^2$. So $r^2 = \\frac{1}{${rDenominator*rDenominator}}$ and $r = \\frac{1}{${rDenominator}}$. Choice ${incorrectOptions[0].letter} is incorrect due to algebraic error. Choice ${incorrectOptions[1].letter} is incorrect because it confuses the radius with its square root. Choice ${incorrectOptions[2].letter} is incorrect because it solves for the height instead of the radius.`
    };
  }
};

/**
 * Question ID: 1be8b6b2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 71148π, base area: 5929π]
 * - Difficulty factors: [Cone slant height, multi-step: find h from V and base, find r from base, then l = √(r²+h²)]
 * - Distractor patterns: [A: 12 (random), B: 36 (height), C: 77 (radius), D: 85 (correct)]
 * - Constraints: [Numbers must work out to Pythagorean triple or similar]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */