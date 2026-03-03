import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 856372ca
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center coordinates: -8 and 6, radius: 5]
 * - Difficulty factors: [Circle equation standard form, sign handling]
 * - Distractor patterns: [A=wrong center signs, B=correct, C=wrong center signs and radius not squared, D=correct center but radius not squared]
 * - Constraints: [Equation form: (x-h)² + (y-k)² = r², radius must be squared]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_856372ca = {
  metadata: {
    // id: "856372ca",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center coordinates (similar magnitude: -10 to 10, non-zero)
    const h = getRandomInt(-10, 10, [0]); // x-coordinate of center
    const k = getRandomInt(-10, 10, [0]); // y-coordinate of center
    
    // STEP 2: Generate radius (single digit for clean numbers, like original 5)
    const r = getRandomInt(3, 9);
    const rSquared = r * r;
    
    // STEP 3: Create distractor options
    // Format: (x - h)² + (y - k)² = r²
    
    // Helper to format center value in equation
    const formatCenter = (val: number): string => {
      if (val >= 0) return `-${val}`;
      return `+${Math.abs(val)}`;
    };
    
    const formatCenterWrong = (val: number): string => {
      if (val >= 0) return `+${val}`;
      return `-${Math.abs(val)}`;
    };
    
    // Choice A: wrong center signs (opposite of correct)
    const optionA = `$(x${formatCenterWrong(h)})^2+(y${formatCenterWrong(k)})^2=${rSquared}$`;
    
    // Choice B: correct
    const optionB = `$(x${formatCenter(h)})^2+(y${formatCenter(k)})^2=${rSquared}$`;
    
    // Choice C: wrong center signs AND radius not squared
    const optionC = `$(x${formatCenterWrong(h)})^2+(y${formatCenterWrong(k)})^2=${r}$`;
    
    // Choice D: correct center but radius not squared
    const optionD = `$(x${formatCenter(h)})^2+(y${formatCenter(k)})^2=${r}$`;
    
    const optionsData = [
      { text: optionA, isCorrect: false, reason: `This is an equation of a circle with center (${-h}, ${-k})` },
      { text: optionB, isCorrect: true },
      { text: optionC, isCorrect: false, reason: `This is an equation of a circle with center (${-h}, ${-k}) and radius $\\sqrt{${r}}$` },
      { text: optionD, isCorrect: false, reason: `This is an equation of a circle with radius $\\sqrt{${r}}$` }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `In the xy-plane, a circle with radius ${r} has center \\( (${h}, ${k}) \\). Which of the following is an equation of the circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: optionB,
      explanation: `Choice ${correctLetter} is correct. An equation of a circle is \\( (x-h)^{2}+(y-k)^{2}=r^{2} \\), where the center is \\( (h, k) \\) and the radius is r. Substituting the center (${h}, ${k}) and radius ${r} gives \\( (x-(${h}))^{2}+(y-${k})^{2}=${r}^{2} \\), or \\( (x${formatCenter(h)})^2+(y${formatCenter(k)})^2=${rSquared} \\). Choice ${incorrectOptions[0].letter} is incorrect. ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect. ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect. ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 95ba2d09
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 30° each (clean numbers), result: 120° → 2π/3]
 * - Difficulty factors: [Geometric reasoning (straight line), degree to radian conversion]
 * - Distractor patterns: [A=150°→5π/6, B=135°→3π/4, C=correct 120°→2π/3, D=60°→π/3]
 * - Constraints: [Points on x-axis form straight line (180°), vertical angles or supplementary]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs: Circle with center O, points P, Q, R, T on circle, diameters/lines]
 */

// File: generators/Circles/95ba2d09.ts