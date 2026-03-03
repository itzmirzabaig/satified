import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e86f0651
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: 43 (double-digit)]
 * - Difficulty factors: [Circle area formula, squaring double-digit numbers]
 * - Distractor patterns: [A: r/2, B: r, C: 2r (circumference)]
 * - Constraints: [Radius should be such that r² is clean]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_e86f0651 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const radius = getRandomInt(30, 50); // Double-digit like 43
    
    // STEP 2: Calculate derived values
    const areaCoeff = radius * radius;
    
    // STEP 3: Create options with tracking
    // FIXED: Changed \\\\pi to \\pi
    const correctText = `${areaCoeff}\\pi`;
    
    // Distractors
    // FIXED: Changed \\\\frac to \\frac and \\\\pi to \\pi
    const distractorA = `\\frac{${radius}\\pi}{2}`;
    // FIXED: Changed \\\\pi to \\pi
    const distractorB = `${radius}\\pi`;
    // FIXED: Changed \\\\pi to \\pi
    const distractorC = `${2 * radius}\\pi`; // Circumference
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: correctText, isCorrect: true }
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
    // FIXED: Changed all \\\\pi to \\pi
    const explanation = `Choice ${correctLetter} is correct. The area of a circle is $A = \\pi r^2$. With radius ${radius}, the area is $\\pi(${radius})^2 = ${areaCoeff}\\pi$ square meters. Choice ${incorrectOptions[0].letter} is incorrect; this appears to confuse radius with diameter or uses an incorrect formula. Choice ${incorrectOptions[1].letter} is incorrect; this would be the result if the formula were $\\pi r$ instead of $\\pi r^2$. Choice ${incorrectOptions[2].letter} is incorrect; this is the circumference of the circle ($2\\pi r$), not the area.`;
    
    return {
      questionText: `A circle has a radius of $${radius}$ meters. What is the area, in square meters, of the circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};