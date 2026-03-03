import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_33e29881 = {
  metadata: {
    // id: "33e29881",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random radical values for sine
    // Use simple square roots that keep the value < 1
    const radicandOptions = [2, 3, 5, 6, 7, 10, 11, 13, 15];
    const denominator = getRandomInt(2, 5); // Small integers
    
    // Ensure the fraction is valid (< 1): sqrt(radicand)/denominator < 1
    // So radicand < denominator²
    const validRadicands = radicandOptions.filter(r => r < denominator * denominator);
    const validRadicand = getRandomElement(validRadicands);
    
    // STEP 2: The answer is the same as sin(R) due to cofunction identity
    const sinValue = `\\frac{\\sqrt{${validRadicand}}}{${denominator}}`;
    
    // STEP 3: Create options with tracking
    const correctText = sinValue;
    
    // Calculate some distractors
    const wrongRadicand = getRandomElement(validRadicands.filter(r => r !== validRadicand));
    
    const optionsData = [
      { text: `\\frac{\\sqrt{${validRadicand}}}{${validRadicand}}`, isCorrect: false, reason: "incorrectly rationalizes or uses wrong denominator" },
      { text: sinValue, isCorrect: true, reason: "" },
      { text: `\\frac{${denominator}\\sqrt{${validRadicand}}}{${validRadicand}}`, isCorrect: false, reason: "is the reciprocal (secant of complement or csc)" },
      { text: `\\sqrt{${validRadicand}}`, isCorrect: false, reason: "is greater than 1, which is impossible for cosine" }
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
    const explanation = `Choice ${correctLetter} is correct. In a right triangle, the acute angles $R$ and $S$ are complementary (sum to $90^{\\circ}$). By the cofunction identity, $\\sin(R) = \\cos(90^{\\circ} - R) = \\cos(S)$. Since $\\sin(R) = \\frac{\\sqrt{${validRadicand}}}{${denominator}}$, we have $\\cos(S) = \\frac{\\sqrt{${validRadicand}}}{${denominator}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 6: Return question data
    return {
      questionText: `In right triangle $RST$, the sum of the measures of angle $R$ and angle $S$ is $90$ degrees. The value of $\\sin(R)$ is $\\frac{\\sqrt{${validRadicand}}}{${denominator}}$. What is the value of $\\cos(S)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 659cb706
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Triangle coordinates: [0,0], [3,0], [0,3] roughly - simple single-digit]
 * - Difficulty factors: [Right triangle trigonometry, cofunction identity, visual recognition]
 * - Distractor patterns: [tan X (wrong ratio), tan Y (wrong angle), cos X (wrong cofunction)]
 * - Constraints: [Must show right triangle with right angle at Z, X and Y are acute angles]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Static right triangle with labeled vertices]
 */

// File: generators/RightTrianglesAndTrigonometry/659cb706.ts