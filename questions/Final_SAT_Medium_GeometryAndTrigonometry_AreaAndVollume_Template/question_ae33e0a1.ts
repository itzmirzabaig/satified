import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ae33e0a1
 * 
 * ANALYSIS:
 * - Skill: Volume of a Cylinder
 * - Issue Fixed: Long decimals in distractors are now converted to LaTeX fractions. 
 * - Issue Fixed: Changed `\\\\pi` to `\\pi` to fix rendering issues where "pi" appeared as text.
 */

export const generator_ae33e0a1 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Ensure diameter is even so radius is an integer
    const radius = getRandomInt(4, 12); 
    const diameter = radius * 2;
    const height = getRandomInt(5, 12);
    
    // STEP 2: Calculate correct volume (V = pi * r^2 * h)
    const volumeVal = radius * radius * height;
    
    // STEP 3: Generate Distractor Values
    
    // A: pi * d * h (Incorrect formula: using diameter linear)
    const valA = diameter * height;
    
    // B: 2/3 of volume (Arithmetic error that often creates decimals)
    // We store numerator/denominator to format as fraction later
    const numB = volumeVal * 2;
    const denB = 3;
    
    // D: pi * d^2 * h (Incorrect formula: using diameter as radius)
    const valD = diameter * diameter * height;
    
    // Helper to format text with pi, handling fractions if needed
    const formatOption = (val: number, den: number = 1): string => {
        // If it divides evenly, return integer
        if (den === 1 || val % den === 0) {
            return `${val / den}\\pi`;
        }
        // Otherwise return fraction
        return `\\frac{${val}}{${den}}\\pi`;
    };

    const optionCorrect = formatOption(volumeVal);
    const optionA = formatOption(valA);
    const optionB = formatOption(numB, denB); // This handles the long decimal issue
    const optionD = formatOption(valD);
    
    const optionsData = [
      { text: optionA, isCorrect: false },
      { text: optionB, isCorrect: false },
      { text: optionCorrect, isCorrect: true },
      { text: optionD, isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 5: Build explanation
    const explanation = `
      Choice ${correctLetter} is correct. The volume $V$ of a right circular cylinder is calculated using the formula $V = \\pi r^2 h$, where $r$ is the radius of the base and $h$ is the height.
      
      Given:
      Diameter $d = ${diameter}$ cm.
      Height $h = ${height}$ cm.
      
      First, find the radius $r$:
      $$r = \\frac{d}{2} = \\frac{${diameter}}{2} = ${radius}$$
      
      Now, substitute $r$ and $h$ into the volume formula:
      $$V = \\pi (${radius})^2 (${height})$$
      $$V = \\pi (${radius * radius}) (${height})$$
      $$V = ${volumeVal}\\pi$$
      
      The volume of the cylinder is $${volumeVal}\\pi$ cubic centimeters.
    `.trim();
    
    return {
      questionText: `A right circular cylinder has a base diameter of $${diameter}$ centimeters and a height of $${height}$ centimeters. What is the volume, in cubic centimeters, of the cylinder?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};