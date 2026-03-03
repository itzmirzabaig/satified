import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f67e4efc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 45π, height: 5 (single-digit)]
 * - Difficulty factors: [Cylinder volume formula manipulation, solving for radius]
 * - Distractor patterns: [B: 45/5/2=4.5 (division chain), C: 9 (r² value), D: 40 (45-5 subtraction)]
 * - Constraints: [Volume must be divisible by height for clean integer radius]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f67e4efc = {
  metadata: {
    // id: "f67e4efc",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Generate radius first, then calculate volume to ensure clean numbers
    const radius = getRandomInt(2, 6);
    const height = getRandomInt(3, 8);
    const volume = Math.PI * radius * radius * height; // V = πr²h
    // For display: volume coefficient
    const volumeCoeff = radius * radius * height;
    
    // STEP 2: Calculate derived values
    const rSquared = radius * radius;
    
    // STEP 3: Create options with tracking
    // Distractor B: volume/height/2 = r²/2 (wrong operation)
    const distractorB = (volumeCoeff / height / 2).toString();
    // Distractor C: r² value (forgot square root)
    const distractorC = rSquared.toString();
    // Distractor D: volumeCoeff - height (subtraction error)
    const distractorD = (volumeCoeff - height).toString();
    
    const correctText = radius.toString();
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
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
    
    // STEP 5: Build explanation with dynamic letters
    const explanation = `Choice ${correctLetter} is correct. The volume of a cylinder is $V = \\\\pi r^2 h$. Substituting $V = ${volumeCoeff}\\\\pi$ and $h = ${height}$ gives ${volumeCoeff}\\\\pi = \\\\pi r^2 (${height})$. Dividing by $\\\\pi$ and then by ${height} yields $r^2 = ${rSquared}$, so $r = ${radius}$. Choice ${incorrectOptions[0].letter} is incorrect; it results from dividing by 2 instead of taking the square root. Choice ${incorrectOptions[1].letter} is incorrect; it is the value of $r^2$ before taking the square root. Choice ${incorrectOptions[2].letter} is incorrect; it results from subtracting ${height} from ${volumeCoeff} rather than using the correct formula.`;
    
    return {
      questionText: `A right circular cylinder has a volume of $${volumeCoeff}\\\\pi$. If the height of the cylinder is $${height}$, what is the radius of the cylinder?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

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