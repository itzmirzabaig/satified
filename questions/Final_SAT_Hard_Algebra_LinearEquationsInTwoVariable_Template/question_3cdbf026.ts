import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3cdbf026
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (-2,-6) and (0,-3), coefficients: integers]
 * - Difficulty factors: [Finding k using two points on line, substitution]
 * - Distractor patterns: [A=-2 (correct), B=-1 (sign error), C=2 (sign error), D=3 (value of a, not k)]
 * - Constraints: [First point (0,-3) isolates k directly]
 * - Question type: [Text → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_3cdbf026 = {
  metadata: {
    // id: "3cdbf026",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: ax + ky = 6, points (-2,-6) and (0,-3)
    // Strategy: Generate k first, then find a
    const k = getRandomInt(-5, 5, [0]); // Non-zero
    const point2 = { x: 0, y: getRandomInt(-8, -2) }; // y-intercept point
    
    // From point2: a(0) + k*y = 6 => k*y = 6 => k = 6/y
    // So we need y to divide 6 evenly for integer k
    const validYs = [-6, -3, -2, -1, 1, 2, 3, 6];
    const y2 = getRandomElement(validYs);
    const kVal = Math.round(6 / y2);
    
    // Now find a using another point
    const x1 = getRandomInt(-5, 5, [0]); // Non-zero x
    const y1 = getRandomInt(-8, 8);
    
    // a*x1 + k*y1 = 6 => a = (6 - k*y1)/x1
    // Ensure this divides evenly
    const numerator = 6 - kVal * y1;
    // Adjust y1 if needed to make numerator divisible by x1
    const aVal = Math.round(numerator / x1);
    const adjustedY1 = (6 - aVal * x1) / kVal;
    
    // STEP 2: Create options with tracking
    const distractor1 = -1; // Sign error
    const distractor2 = 2; // Common mistake
    const distractor3 = aVal; // Value of a instead of k
    
    const optionsData = [
      { text: `${kVal}`, isCorrect: true },
      { text: `${distractor1}`, isCorrect: false, reason: "results from calculation error" },
      { text: `${distractor2}`, isCorrect: false, reason: "results from sign confusion" },
      { text: `${distractor3}`, isCorrect: false, reason: "this is the value of a, not k" }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption.letter;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The graph of the equation \\( ${aVal}x+${kVal === 1 ? '' : kVal}y=6 \\) is a line in the \\( xy \\)-plane, where \\( a \\) and \\( k \\) are constants. If the line contains the points \\((${x1},${Math.round(adjustedY1)})\\) and \\((0,${y2})\\), what is the value of \\( k \\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: `${o.letter}. ${o.text}` })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. Substituting the point \\((0,${y2})\\) into the equation: $${aVal}(0)+k(${y2})=6$, which gives $k(${y2})=6$, so $k=\\frac{6}{${y2}}=${kVal}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 00723d16
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3 and 12 in equation]
 * - Difficulty factors: [Finding perpendicular slope from standard form]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Slope must be negative reciprocal]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */