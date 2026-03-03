import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6708546e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2, area ABCD: 5]
 * - Difficulty factors: [Similar parallelograms, area scales as square of linear ratio]
 * - Distractor patterns: [A: 7 (adding), B: 10 (linear scaling), C: 20 (correct), D: 25 (squaring area)]
 * - Constraints: [Clean integer answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_6708546e = {
  metadata: {
    // id: "6708546e",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate scale factor and base area
    const scaleFactor = getRandomInt(2, 5);
    const baseArea = getRandomInt(3, 15);
    
    // STEP 2: Calculate scaled area
    const scaledArea = baseArea * scaleFactor * scaleFactor;
    
    // STEP 3: Create distractors
    const distractorA = baseArea + scaleFactor; // Adding
    const distractorB = baseArea * scaleFactor; // Linear scaling
    const distractorD = baseArea * baseArea; // Squaring the area itself
    
    const correctText = scaledArea.toString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false },
      { text: distractorB.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorD.toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Parallelogram $ABCD$ is similar to parallelogram $PQRS$. The length of each side of parallelogram $PQRS$ is $${scaleFactor}$ times the length of its corresponding side of parallelogram $ABCD$. The area of parallelogram $ABCD$ is $${baseArea}$ square centimeters. What is the area, in square centimeters, of parallelogram $PQRS$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. For similar figures, the ratio of areas equals the square of the ratio of corresponding side lengths. The linear scale factor is $${scaleFactor}$, so the area scale factor is $${scaleFactor}^2 = ${scaleFactor * scaleFactor}$. The area of $PQRS$ is $${baseArea} \\times ${scaleFactor * scaleFactor} = ${scaledArea}$ square centimeters. Choice ${incorrectOptions[0].letter} is incorrect because it adds the values instead of multiplying. Choice ${incorrectOptions[1].letter} is incorrect because it uses linear scaling instead of area scaling. Choice ${incorrectOptions[2].letter} is incorrect because it squares the area instead of using the scale factor.`
    };
  }
};

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