import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e4b4e9ea
 * 
 * ANALYSIS:
 * - Skill: Volume of a Square Prism (V = s²h)
 * - Issue Fixed: "sqrt" was rendering as text. Fixed by using `\\sqrt` and wrapping in `$`.
 * - Logic Update: Replaced hardcoded static distractors with dynamic ones based on the random inputs.
 */

export const generator_e4b4e9ea = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const edge = getRandomInt(4, 8); // s
    const height = getRandomInt(15, 30); // h (reduced range for cleaner mental math)
    
    // Calculate Volume V = s^2 * h
    const volume = edge * edge * height;
    
    // STEP 2: Calculate Derived Values
    const baseArea = edge * edge;
    
    // STEP 3: Create Options
    // Correct Answer: h
    const correctText = `$${height}$`;
    
    // Distractor 1: Base Area (s^2)
    // Common mistake: confusing base area with height or just picking an intermediate number
    const distractorBaseArea = `$${baseArea}$`;
    
    // Distractor 2: V / s (Forgot to square the edge)
    // = (s^2 * h) / s = s * h
    const distractorLinearDiv = `$${edge * height}$`;
    
    // Distractor 3: Perimeter of base (4s) or just a random convincing number
    // Let's use perimeter 4s
    const distractorPerimeter = `$${4 * edge}$`;
    
    // Distractor Alternate: If we want to keep a square root distractor to test the renderer (as per original intent?),
    // we can generate a "nonsense" distractor that looks mathy.
    // e.g., s * sqrt(h) formatted correctly
    const distractorRoot = `$${edge}\\sqrt{${height}}$`;

    // Select distractors. We ensure they are unique.
    const uniqueOptions = new Set<string>();
    uniqueOptions.add(correctText);
    uniqueOptions.add(distractorBaseArea);
    uniqueOptions.add(distractorLinearDiv);
    
    // Fill remaining spots
    if (uniqueOptions.size < 4) uniqueOptions.add(distractorPerimeter);
    if (uniqueOptions.size < 4) uniqueOptions.add(distractorRoot);
    
    const optionsData = Array.from(uniqueOptions).map(text => ({
      text,
      isCorrect: text === correctText
    }));

    // STEP 4: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 5: Build explanation
    const explanation = `
      Choice ${correctLetter} is correct. The volume $V$ of a right square prism is calculated by the formula $V = s^2h$, where $s$ is the length of the base edge and $h$ is the height.
      
      Given:
      Edge length $s = ${edge}$ units.
      Volume $V = ${volume.toLocaleString()}$ cubic units.
      
      Substitute these values into the volume formula:
      $$${volume} = (${edge})^2 h$$
      $$${volume} = ${baseArea} h$$
      
      Divide both sides by ${baseArea} to solve for $h$:
      $$h = \\frac{${volume}}{${baseArea}}$$
      $$h = ${height}$$
      
      The height of the prism is ${height} units.
    `.trim();
    
    return {
      questionText: `The length of the edge of the base of a right square prism is $${edge}$ units. The volume of the prism is $${volume.toLocaleString()}$ cubic units. What is the height, in units, of the prism?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};