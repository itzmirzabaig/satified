import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5afbdc8e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: 2 (single-digit)]
 * - Difficulty factors: [Area equivalence, square root of π expression]
 * - Distractor patterns: [A: radius value, B: √(2π) wrong area, D: 2π (circumference confusion)]
 * - Constraints: [Circle area must be perfect square × π for clean radical answer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_5afbdc8e = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const radius = getRandomInt(2, 5);
    
    // STEP 2: Calculate derived values
    const circleAreaCoeff = radius * radius; // r²
    
    // FIXED: Changed \\\\ to \\ for LaTeX commands
    const sideExact = `${radius}\\sqrt{\\pi}`;
    
    // STEP 3: Create options with tracking
    const correctText = sideExact;
    
    // Distractor A: radius (confusing radius with side)
    const distractorA = radius.toString();
    // FIXED: Changed \\\\ to \\ for LaTeX commands
    const distractorB = `\\sqrt{2\\pi}`;
    // FIXED: Changed \\\\ to \\ for LaTeX commands
    const distractorD = radius === 2 ? `2\\pi` : `${radius}\\pi`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorD, isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Build explanation
    // FIXED: Changed all \\\\ to \\ for LaTeX commands
    const explanation = `Choice ${correctLetter} is correct. The area of a circle with radius ${radius} is $\\pi(${radius})^2 = ${circleAreaCoeff}\\pi$. Setting this equal to the area of a square $s^2$ gives $s^2 = ${circleAreaCoeff}\\pi$, so $s = ${radius}\\sqrt{\\pi}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the radius of the circle, not the side of the square. Choice ${incorrectOptions[1].letter} is incorrect; this would be the answer if the area were $2\\pi$ instead of ${circleAreaCoeff}\\pi$. Choice ${incorrectOptions[2].letter} is incorrect; this resembles the circumference formula $2\\pi r$ or $\\pi r$, not the side length.`;
    
    return {
      questionText: `What is the length of one side of a square that has the same area as a circle with radius $${radius}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};