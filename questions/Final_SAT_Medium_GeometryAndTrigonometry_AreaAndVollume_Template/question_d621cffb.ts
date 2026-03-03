import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d621cffb
 * 
 * ANALYSIS:
 * - Skill: Volume of a Sphere
 * - Issue Fixed: LaTeX rendering. `\\\\frac` and `\\\\pi` were rendering as raw text "frac" and "pi".
 *   Changed to `\\frac` and `\\pi`.
 * - Logic Update: Added fraction simplification (GCD) so the resulting volume doesn't look like an unreduced raw calculation.
 */

// Helper to simplify fractions
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const generator_d621cffb = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Radius r = num / den
    // Keep numbers small enough that cubing them is reasonable
    const num = getRandomInt(3, 7);
    const den = getRandomInt(2, 5); 
    
    // Ensure it's not an integer for the sake of the problem type
    if (num % den === 0) return generator_d621cffb.generate();

    // STEP 2: Calculate Derived Values
    // Volume V = (4/3) * pi * r^3
    // V = (4 * num^3) / (3 * den^3) * pi
    const numCubed = num * num * num;
    const denCubed = den * den * den;
    
    let volNum = 4 * numCubed;
    let volDen = 3 * denCubed;
    
    // Simplify the fraction
    const divisor = gcd(volNum, volDen);
    volNum /= divisor;
    volDen /= divisor;
    
    // STEP 3: Format Options
    // Correct Answer
    const correctText = `\\frac{${volNum}\\pi}{${volDen}}`;
    
    // Distractor A: Inverted fraction (den/num) * pi
    const distractorA = `\\frac{${den}\\pi}{${num}}`; 
    
    // Distractor B: Linear radius error -> (4/3)*pi*r (not cubed)
    // = (4 * num) / (3 * den)
    let bNum = 4 * num;
    let bDen = 3 * den;
    const bDiv = gcd(bNum, bDen);
    const distractorB = `\\frac{${bNum/bDiv}\\pi}{${bDen/bDiv}}`;
    
    // Distractor C: Square radius error -> (4/3)*pi*r^2
    // = (4 * num^2) / (3 * den^2)
    let cNum = 4 * num * num;
    let cDen = 3 * den * den;
    const cDiv = gcd(cNum, cDen);
    const distractorC = `\\frac{${cNum/cDiv}\\pi}{${cDen/cDiv}}`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    // STEP 4: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // STEP 5: Explanation
    const explanation = `
      Choice ${correctOption.letter} is correct. The volume of a sphere is given by the formula $V = \\frac{4}{3}\\pi r^3$.
      
      Given radius $r = \\frac{${num}}{${den}}$ feet.
      
      Substitute $r$ into the formula:
      $$V = \\frac{4}{3}\\pi \\left(\\frac{${num}}{${den}}\\right)^3$$
      
      $$V = \\frac{4}{3}\\pi \\left(\\frac{${numCubed}}{${denCubed}}\\right)$$
      
      $$V = \\frac{4 \\cdot ${numCubed}}{3 \\cdot ${denCubed}}\\pi$$
      
      $$V = \\frac{${4 * numCubed}}{${3 * denCubed}}\\pi$$
      
      Simplifying the fraction by dividing numerator and denominator by ${divisor}:
      $$V = \\frac{${volNum}\\pi}{${volDen}}$$
    `.trim();
    
    return {
      questionText: `A sphere has a radius of $\\frac{${num}}{${den}}$ feet. What is the volume, in cubic feet, of the sphere?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};