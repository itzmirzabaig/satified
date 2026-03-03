import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e336a1d2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge: 41 (double-digit)]
 * - Difficulty factors: [Cube volume, cubing double-digit numbers]
 * - Distractor patterns: [A: 4×edge, B: edge², C: 6×edge² (surface area)]
 * - Constraints: [Edge length such that edge³ is manageable]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_e336a1d2 = {
  metadata: {
    // id: "e336a1d2",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const edge = getRandomInt(30, 50); // Double-digit
    
    // STEP 2: Calculate derived values
    const volume = edge * edge * edge;
    const faceArea = edge * edge;
    const surfaceArea = 6 * faceArea;
    
    // STEP 3: Create options with tracking
    const correctText = volume.toLocaleString();
    
    // Distractors
    const distractorA = (4 * edge).toString(); // Perimeter of face
    const distractorB = faceArea.toLocaleString(); // Face area
    const distractorC = surfaceArea.toLocaleString(); // Surface area
    
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
    const explanation = `Choice ${correctLetter} is correct. The volume of a cube with edge length $s$ is $V = s^3$. With edge length ${edge}, the volume is ${edge}^3 = ${volume} cubic inches. Choice ${incorrectOptions[0].letter} is incorrect; this is the perimeter of one face ($4 \\\\times ${edge}$). Choice ${incorrectOptions[1].letter} is incorrect; this is the area of one face (${edge}^2 = ${faceArea}), not the volume. Choice ${incorrectOptions[2].letter} is incorrect; this is the total surface area of the cube ($6 \\\\times ${edge}^2 = ${surfaceArea}$).`;
    
    return {
      questionText: `A cube has an edge length of ${edge} inches. What is the volume, in cubic inches, of the cube?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: e4b4e9ea
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge: 6, volume: 2880]
 * - Difficulty factors: [Square prism volume, solving for height]
 * - Distractor patterns: [A: wrong volume, B: base area, C: wrong volume]
 * - Constraints: [Volume must be divisible by base area for integer height]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */