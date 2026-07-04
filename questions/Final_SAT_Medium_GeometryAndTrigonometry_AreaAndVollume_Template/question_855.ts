import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 855
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge: 41 (double-digit)]
 * - Difficulty factors: [Cube volume, cubing double-digit numbers]
 * - Distractor patterns: [A: 4×edge, B: edge², C: 6×edge² (surface area)]
 * - Constraints: [Edge length such that edge³ is manageable]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_855 = {
  metadata: {
    id: "855",
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
    // Each distractor carries its OWN rationale so the explanation stays
    // correct after shuffling (reason is bound to the value, not to a letter).
    const correctText = volume.toLocaleString();

    // Distractors
    const distractorA = (4 * edge).toString(); // Perimeter of face
    const distractorB = faceArea.toLocaleString(); // Face area
    const distractorC = surfaceArea.toLocaleString(); // Surface area

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `this is the perimeter of one face ($4 \\times ${edge} = ${4 * edge}$), not the volume` },
      { text: distractorB, isCorrect: false, reason: `this is the area of one face ($${edge}^2 = ${faceArea}$), not the volume` },
      { text: distractorC, isCorrect: false, reason: `this is the total surface area of the cube ($6 \\times ${edge}^2 = ${surfaceArea}$), not the volume` },
      { text: correctText, isCorrect: true, reason: '' }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 5: Build explanation — pull each distractor's reason from the
    // shuffled option itself so every letter matches its actual value.
    const distractorExplanations = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect; ${o.reason}.`)
      .join(' ');
    const explanation = `Choice ${correctLetter} is correct. The volume of a cube with edge length $s$ is $V = s^3$. With edge length ${edge}, the volume is $${edge}^3 = ${volume}$ cubic inches. ${distractorExplanations}`;
    
    return {
      questionText: `A cube has an edge length of ${edge} inches. What is the volume, in cubic inches, of the cube?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
