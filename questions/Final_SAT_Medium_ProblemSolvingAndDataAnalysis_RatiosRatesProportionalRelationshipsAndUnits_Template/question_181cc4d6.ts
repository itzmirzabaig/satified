import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 181cc4d6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Rect A: 15×w, Rect B: 20×?, same ratio]
 * - Difficulty factors: [Proportion with geometric dimensions, algebraic manipulation]
 * - Distractor patterns: [B: w+5 (additive), C: 3/4 w (inverted ratio), D: w-5 (subtractive)]
 * - Constraints: [Must maintain aspect ratio]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_181cc4d6 = {
  metadata: {
    // id: "181cc4d6",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: A=15×w, B=20×?, ratio preserved
    // 15/w = 20/x → x = 20w/15 = 4w/3
    const lengthA = getRandomInt(10, 20);
    const lengthB = getRandomInt(lengthA + 1, 30); // longer than A
    
    // Calculate ratio
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const ratioNum = lengthB;
    const ratioDen = lengthA;
    const divisor = gcd(ratioNum, ratioDen);
    const simplifiedNum = ratioNum / divisor;
    const simplifiedDen = ratioDen / divisor;
    
    // STEP 2: Correct answer
    const correctAnswer = `\\frac{${simplifiedNum}}{${simplifiedDen}}w`;
    const invertedAnswer = `\\frac{${simplifiedDen}}{${simplifiedNum}}w`;
    
    // STEP 3: Create distractors
    const diff = Math.abs(lengthB - lengthA);
    const optionsData = [
      { text: correctAnswer, isCorrect: true },
      { text: `w+${diff}`, isCorrect: false, reason: "incorrectly assumes an additive relationship rather than a multiplicative (proportional) one" },
      { text: invertedAnswer, isCorrect: false, reason: "flips the ratio, which would be the result if one solved for the width of rectangle A in terms of rectangle B's width" },
      { text: `w-${diff}`, isCorrect: false, reason: "incorrectly assumes a subtractive relationship based on the difference in lengths" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `Rectangle $A$ has length $${lengthA}$ and width $w$. Rectangle $B$ has length $${lengthB}$ and the same length-to-width ratio as rectangle $A$. What is the width of rectangle $B$ in terms of $w$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctLetter} is correct. To find the width of rectangle $B$, we set up a proportion based on the information that both rectangles have the same length-to-width ratio. The length-to-width ratio of rectangle A is $\\frac{${lengthA}}{w}$. Let the width of rectangle B be $x$. The length-to-width ratio of rectangle B is $\\frac{${lengthB}}{x}$. Setting these equal: $\\frac{${lengthA}}{w} = \\frac{${lengthB}}{x}$. Cross-multiplying: $${lengthA}x = ${lengthB}w$. Dividing by $${lengthA}$: $x = \\frac{${lengthB}w}{${lengthA}} = \\frac{${simplifiedNum}w}{${simplifiedDen}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 1b403590
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [mass: 168g, volume: 24cm³]
 * - Difficulty factors: [Density formula application]
 * - Distractor patterns: [B: subtraction, C: addition, D: multiplication]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/1b403590.ts