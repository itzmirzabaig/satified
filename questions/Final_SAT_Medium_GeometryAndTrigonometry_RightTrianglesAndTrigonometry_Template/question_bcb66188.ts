import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: bcb66188
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 308, denominator: 317 (double-digit magnitude, specific values forming Pythagorean-like triple)]
 * - Difficulty factors: [Similar triangles, trigonometric ratios, sine function]
 * - Distractor patterns: [cosine value (75/317), reciprocal (317/308), reciprocal of cosine (317/75)]
 * - Constraints: [Triangles must be similar with corresponding angles, use Pythagorean triple properties]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

export const generator_bcb66188 = {
  metadata: {
    // id: "bcb66188",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Pythagorean triple components
    // Original used 75-308-317 (scaled 3-4-5 variant: 75=3*25, 308≈4*77, but actually 75²+308²=317²)
    // Generate similar magnitude: base triple (3,4,5) scaled by 20-30 to get double-digit values
    const scale = getRandomInt(20, 30);
    const leg1 = 3 * scale; // 60-90
    const leg2 = 4 * scale; // 80-120
    const hypotenuse = 5 * scale; // 100-150
    
    // Randomly assign which leg is opposite the angle (for sine)
    const isLeg1Opposite = Math.random() < 0.5;
    const oppositeLeg = isLeg1Opposite ? leg1 : leg2;
    const adjacentLeg = isLeg1Opposite ? leg2 : leg1;
    
    // STEP 2: Calculate sine value (will be equal for both triangles due to similarity)
    const sinValue = `${oppositeLeg}/${hypotenuse}`;
    
    // STEP 3: Create options with tracking
    const correctText = sinValue;
    const optionsData = [
      { text: `${adjacentLeg}/${hypotenuse}`, isCorrect: false, reason: "gives cosine instead of sine" },
      { text: sinValue, isCorrect: true, reason: "" },
      { text: `${hypotenuse}/${oppositeLeg}`, isCorrect: false, reason: "is the reciprocal (cosecant)" },
      { text: `${hypotenuse}/${adjacentLeg}`, isCorrect: false, reason: "is the reciprocal of cosine (secant)" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctLetter} is correct. Triangle $FGH$ is similar to triangle $JKL$, and angle $F$ corresponds to angle $J$. In similar triangles, corresponding angles are congruent, so $m\\angle F = m\\angle J$. Therefore, $\\sin(F) = \\sin(J) = \\frac{${oppositeLeg}}{${hypotenuse}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 6: Return question data
    return {
      questionText: `Triangle $FGH$ is similar to triangle $JKL$, where angle $F$ corresponds to angle $J$ and angles $G$ and $K$ are right angles. If $\\sin(F) = \\frac{${oppositeLeg}}{${hypotenuse}}$, what is the value of $\\sin(J)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 33e29881
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: √15, denominator: 4 (simple radical form)]
 * - Difficulty factors: [Complementary angles, cofunction identity sin(θ) = cos(90°-θ)]
 * - Distractor patterns: [Rationalized form variant, reciprocal, value > 1 (impossible)]
 * - Constraints: [Must use valid trigonometric identity, answer must be ≤ 1]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

// File: generators/RightTrianglesAndTrigonometry/33e29881.ts