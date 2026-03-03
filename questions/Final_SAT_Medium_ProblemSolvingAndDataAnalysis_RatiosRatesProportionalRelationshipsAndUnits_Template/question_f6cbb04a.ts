import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f6cbb04a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [d=55t, 9k hours vs 3k hours]
 * - Difficulty factors: [Proportional reasoning with constants]
 * - Distractor patterns: [B: 6 (difference 9k-3k), C: 3k, D: 6k (includes k)]
 * - Constraints: [k cancels out, answer is pure number]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f6cbb04a = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const speed = getRandomInt(30, 80);
    const multiplier1 = getRandomInt(4, 9);
    const multiplier2 = getRandomInt(2, multiplier1 - 1); // smaller than multiplier1
    
    // STEP 2: Calculate ratio
    const ratio = multiplier1 / multiplier2;
    
    // NEW: Format ratio as fraction if not a whole number
    const formatRatio = (num: number, den: number): string => {
      if (num % den === 0) {
        return (num / den).toString();
      }
      // Simplify fraction
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const divisor = gcd(num, den);
      const simplifiedNum = num / divisor;
      const simplifiedDen = den / divisor;
      return `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    };
    
    const ratioText = formatRatio(multiplier1, multiplier2);
    const diff = multiplier1 - multiplier2;
    
    // STEP 3: Create distractors
    const optionsData = [
      { text: ratioText, isCorrect: true },
      { text: diff.toString(), isCorrect: false, reason: `results from finding the difference $(${multiplier1}k - ${multiplier2}k = ${diff}k)$ instead of the ratio` },
      { text: `${ratioText}k`, isCorrect: false, reason: "incorrectly includes the constant $k$ in the answer when $k$ cancels out" },
      { text: `${diff}k`, isCorrect: false, reason: "incorrectly includes the constant $k$ and uses the difference instead of the ratio" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The equation $d = ${speed}t$ can be used to calculate the distance $d$, in miles, traveled by a car moving at a speed of $${speed}$ miles per hour over a period of $t$ hours. For any positive constant $k$, the distance the car would have traveled after $${multiplier1}k$ hours is how many times the distance the car would have traveled after $${multiplier2}k$ hours?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: ratioText,
      // FIXED: Use ratioText instead of ratio.toString() in explanation
      explanation: `Choice ${correctLetter} is correct. After $${multiplier1}k$ hours: $d_1 = ${speed}(${multiplier1}k)$. After $${multiplier2}k$ hours: $d_2 = ${speed}(${multiplier2}k)$. The ratio is: $\\frac{d_1}{d_2} = \\frac{${speed}(${multiplier1}k)}{${speed}(${multiplier2}k)} = \\frac{${multiplier1}}{${multiplier2}} = ${ratioText}$. The $k$ and speed cancel out. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};