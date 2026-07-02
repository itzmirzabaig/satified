import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1440
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [4a/b = 6.7 (decimal), a/(bn) = 26.8 (decimal)]
 * - Difficulty factors: [Complex fraction manipulation, substitution, solving for variable in denominator]
 * - Distractor patterns: [Fill-in-the-blank - no distractors needed]
 * - Constraints: [Values must align so that a/b from first equation substitutes cleanly into second]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */

export const generator_1440 = {
  metadata: {
    id: "1440",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base values
    // First equation: k × (a/b) = value1, where k is integer (4 in original)
    // Second equation: (a/b) × (1/n) = value2
    // From first: a/b = value1/k
    // Substitute: (value1/k) × (1/n) = value2, so n = value1/(k × value2)
    
    const k = getRandomInt(2, 6); // Coefficient like 4
    const value1 = parseFloat((Math.random() * 10 + 2).toFixed(1)); // 6.7 in original
    const multiplier = getRandomInt(2, 5); // Make value2 a multiple for clean division
    const value2 = parseFloat((value1 * multiplier / k).toFixed(4)); 
    
    // STEP 2: Calculate a/b ratio
    const ratioAB = value1 / k;
    
    // STEP 3: Solve for n
    // ratioAB × (1/n) = value2, so n = ratioAB / value2
    const n = ratioAB / value2;
    
    return {
      questionText: `If $\\frac{${k} a}{b}=${value1}$ and $\\frac{a}{bn}=${value2}$, what is the value of $n$?`,
      figureCode: null,
      options: null,
      correctAnswer: n.toFixed(4),
      explanation: `The correct answer is ${n.toFixed(4)}. From $\\frac{${k}a}{b}=${value1}$, we get $\\frac{a}{b}=${ratioAB}$. Substituting into $\\frac{a}{bn}=${value2}$ gives $\\frac{${ratioAB}}{n}=${value2}$. Solving: $n=\\frac{${ratioAB}}{${value2}}=${n.toFixed(4)}$.`
    };
  }
};
