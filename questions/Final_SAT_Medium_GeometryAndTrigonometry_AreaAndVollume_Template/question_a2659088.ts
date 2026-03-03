import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a2659088
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 8m, radius: 12m]
 * - Difficulty factors: [Cylinder volume, larger numbers]
 * - Distractor patterns: [A: πh, B: π(r+h), C: r×h²]
 * - Constraints: [Numbers should multiply cleanly]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_a2659088 = {
  metadata: {
    // id: "a2659088",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const height = getRandomInt(6, 12);
    const radius = getRandomInt(10, 15);
    
    // STEP 2: Calculate derived values
    const volume = radius * radius * height;
    
    // STEP 3: Create options with tracking
    const correctText = `${volume.toLocaleString()}\\\\pi`;
    
    // Distractors
    const distractorA = `${height}\\\\pi`; // Just height
    const distractorB = `${(radius + height)}\\\\pi`; // r + h
    const distractorC = `${(radius * height * height).toLocaleString()}\\\\pi`; // r×h²
    
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
    const explanation = `Choice ${correctLetter} is correct. The volume of a cylinder is $V = \\\\pi r^2 h$. With $r = ${radius}$ and $h = ${height}$, we get $V = \\\\pi(${radius})^2(${height}) = \\\\pi(${radius * radius})(${height}) = ${volume.toLocaleString()}\\\\pi$ cubic meters. Choice ${incorrectOptions[0].letter} is incorrect; this results from forgetting to include the radius entirely. Choice ${incorrectOptions[1].letter} is incorrect; this adds the radius and height instead of using the proper formula. Choice ${incorrectOptions[2].letter} is incorrect; this calculates $r \\\\times h^2$ instead of $r^2 \\\\times h$.`;
    
    return {
      questionText: `A right circular cylinder has a height of $${height}$ meters (m) and a base with a radius of $${radius}$ m. What is the volume, in m³, of the cylinder?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: e0874bc2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter TUV: 37, perimeter XYZ: 333, TU: 18]
 * - Difficulty factors: [Similar triangles, perimeter ratio = side ratio]
 * - Distractor patterns: [A: 2, B: 18, C: 55]
 * - Constraints: [Perimeters must have clean integer ratio]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */