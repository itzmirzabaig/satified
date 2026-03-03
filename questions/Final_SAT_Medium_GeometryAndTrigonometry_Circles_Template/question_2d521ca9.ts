import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_2d521ca9 = {
  metadata: {
    // id: "2d521ca9",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate angle that gives clean radian measure (divisors of 180)
    // Original used 60°, others: 30°, 45°, 90°, 120°, 135°, 150°
    const cleanAngles = [30, 45, 60, 90, 120, 135, 150];
    const degrees = getRandomElement(cleanAngles);
    
    // STEP 2: Convert to radians and simplify
    // degrees × (π/180) = (degrees/180)π = simplified
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(degrees, 180);
    const numerator = degrees / divisor;
    const denominator = 180 / divisor;
    
    // Format the radian answer
    let radianAnswer: string;
    if (numerator === 1) {
      radianAnswer = denominator === 1 ? `$\\pi$` : `$\\frac{1}{${denominator}}\\pi$`;
    } else {
      radianAnswer = denominator === 1 ? `$${numerator}\\pi$` : `$\\frac{${numerator}}{${denominator}}\\pi$`;
    }
    
    // STEP 3: Create distractors (common conversion errors)
    // A: half the correct value (e.g., 30° → π/6 instead of 60° → π/3)
    // B: correct
    // C: double the correct value (e.g., 120° → 2π/3)
    // D: π (180°)
    
    const distractorA = degrees / 2;
    const distractorC = degrees * 2;
    
    const formatRadian = (deg: number): string => {
      const div = gcd(deg, 180);
      const num = deg / div;
      const den = 180 / div;
      if (num === 1) return den === 1 ? `$1\\pi$` : `$\\frac{1}{${den}}\\pi$`;
      return den === 1 ? `$${num}\\pi$` : `$\\frac{${num}}{${den}}\\pi$`;
    };
    
    const optionsData = [
      { text: formatRadian(distractorA), isCorrect: false, description: `equal to $${distractorA}^{\\circ}$, not $${degrees}^{\\circ}$` },
      { text: radianAnswer, isCorrect: true },
      { text: formatRadian(Math.min(distractorC, 180)), isCorrect: false, description: `equal to $${Math.min(distractorC, 180)}^{\\circ}$` },
      { text: `$1\\pi$`, isCorrect: false, description: `equal to $180^{\\circ}$` }
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
      questionText: `The measure of angle $Z$ is $${degrees}^{\\circ}$. What is the measure, in radians, of angle $Z$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: radianAnswer,
      explanation: `Choice ${correctLetter} is correct. To convert from degrees to radians, multiply by $\\frac{\\pi}{180^{\\circ}}$. $$${degrees} \\cdot \\frac{\\pi}{180} = \\frac{${degrees}\\pi}{180} = \\frac{${numerator}\\pi}{${denominator}}$$ Choice ${incorrectOptions[0].letter} is incorrect because it is ${incorrectOptions[0].description}. Choice ${incorrectOptions[1].letter} is incorrect because it is ${incorrectOptions[1].description}. Choice ${incorrectOptions[2].letter} is incorrect because it is ${incorrectOptions[2].description}.`
    };
  }
};

/**
 * Question ID: 856372ca
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center coordinates: -8 and 6, radius: 5]
 * - Difficulty factors: [Circle equation standard form, sign handling]
 * - Distractor patterns: [A=wrong center signs, B=correct, C=wrong center signs and radius not squared, D=correct center but radius not squared]
 * - Constraints: [Equation form: (x-h)² + (y-k)² = r², radius must be squared]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/Circles/856372ca.ts