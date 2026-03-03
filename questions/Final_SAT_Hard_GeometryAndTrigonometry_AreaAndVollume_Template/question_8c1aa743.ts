import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8c1aa743
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 6, area ABCD: 54]
 * - Difficulty factors: [Similar rectangles, large scale factor makes numbers big]
 * - Distractor patterns: [A: 9 (dividing), B: 36 (just scale factor squared), C: 324 (linear scaling), D: 1944 (correct)]
 * - Constraints: [Area calculation with large numbers]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_8c1aa743 = {
  metadata: {
    // id: "8c1aa743",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate scale factor (original used 6 for larger numbers)
    const scaleFactor = getRandomInt(4, 8);
    const baseArea = getRandomInt(30, 80);
    
    // STEP 2: Calculate scaled area
    const scaledArea = baseArea * scaleFactor * scaleFactor;
    
    // STEP 3: Create distractors
    const distractorA = Math.round(baseArea / scaleFactor); // Dividing instead of multiplying
    const distractorB = scaleFactor * scaleFactor; // Just the scale factor squared
    const distractorC = baseArea * scaleFactor; // Linear scaling
    
    const correctText = scaledArea.toLocaleString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false },
      { text: distractorB.toString(), isCorrect: false },
      { text: distractorC.toLocaleString(), isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Rectangles $ABCD$ and $EFGH$ are similar. The length of each side of $EFGH$ is $${scaleFactor}$ times the length of the corresponding side of $ABCD$. The area of $ABCD$ is $${baseArea}$ square units. What is the area, in square units, of $EFGH$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The area ratio is the square of the linear scale factor: $${scaleFactor}^2 = ${scaleFactor * scaleFactor}$. The area of $EFGH$ is $${baseArea} \\times ${scaleFactor * scaleFactor} = ${scaledArea.toLocaleString()}$ square units. Choice ${incorrectOptions[0].letter} is incorrect because it divides instead of multiplying. Choice ${incorrectOptions[1].letter} is incorrect because it only gives the scale factor squared without multiplying by the base area. Choice ${incorrectOptions[2].letter} is incorrect because it uses linear scaling instead of area scaling.`
    };
  }
};

/**
 * Question ID: 9f934297
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length: 28, width: 15, height: 16]
 * - Difficulty factors: [Surface area of rectangular prism, 6 faces calculation]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must calculate all 3 pairs of faces]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */