import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 856
 * 
 * ANALYSIS:
 * - Skill: Volume of a Square Prism (V = s²h)
 * - Issue Fixed: "sqrt" was rendering as text. Fixed by using `\\sqrt` and wrapping in `$`.
 * - Logic Update: Replaced hardcoded static distractors with dynamic ones based on the random inputs.
 */

export const generator_856 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const edge = getRandomInt(4, 8); // s
    let height = getRandomInt(15, 30); // h (reduced range for cleaner mental math)

    const baseArea = edge * edge; // s^2

    // The correct answer is h. Three distractors model real student errors:
    //   - base area s^2          (confusing the base area with the height)
    //   - V / s = s*h            (dividing the volume by the edge, not by s^2)
    //   - 2h                     (an off-by-a-factor slip on the final step)
    // s*h (>= 60) and 2h (<= 60) can never equal h, and s*h can never equal 2h
    // (that needs s=2, impossible) nor s^2 (that needs s=h, impossible since
    // s<=8<15<=h). The only reachable collision is s^2 vs h or s^2 vs 2h, so we
    // re-draw h a bounded number of times until all four values are distinct.
    let tries = 0;
    while (
      (baseArea === height || baseArea === 2 * height) &&
      tries++ < 50
    ) {
      height = getRandomInt(15, 30);
    }

    // Calculate Volume V = s^2 * h
    const volume = edge * edge * height;

    // STEP 2: Assemble the four numeric option values (guaranteed distinct)
    const correctValue = height;
    const optionValues = [correctValue, baseArea, edge * height, 2 * height];

    // STEP 3: Create Options
    const correctText = `$${correctValue}$`;
    const optionsData = optionValues.map(value => ({
      text: `$${value}$`,
      isCorrect: value === correctValue
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