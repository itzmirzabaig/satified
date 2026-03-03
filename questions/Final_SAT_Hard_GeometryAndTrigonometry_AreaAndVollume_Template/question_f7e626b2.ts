import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f7e626b2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [dimensions: 4, 5, 6]
 * - Difficulty factors: [Surface area of rectangular prism]
 * - Distractor patterns: [A: 30 (one face), B: 74 (sum without ×2), C: 120 (volume), D: 148 (correct)]
 * - Constraints: [Standard SA formula application]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_f7e626b2 = {
  metadata: {
    // id: "f7e626b2",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate dimensions
    const l = getRandomInt(3, 8);
    const w = getRandomInt(3, 8);
    const h = getRandomInt(4, 10);
    
    // STEP 2: Calculate surface area and distractors
    const face1 = l * w;
    const face2 = l * h;
    const face3 = w * h;
    const sumFaces = face1 + face2 + face3;
    const surfaceArea = 2 * sumFaces;
    const volume = l * w * h;
    
    // STEP 3: Create distractors
    const distractorA = face1; // Just one face
    const distractorB = sumFaces; // Sum without doubling
    const distractorC = volume; // Volume instead
    
    const correctText = surfaceArea.toString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false },
      { text: distractorB.toString(), isCorrect: false },
      { text: distractorC.toString(), isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The dimensions of a right rectangular prism are $${l}$ inches by $${w}$ inches by $${h}$ inches. What is the surface area, in square inches, of the prism?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The surface area is $2(lw + lh + wh) = 2((${l})(${w}) + (${l})(${h}) + (${w})(${h})) = 2(${face1} + ${face2} + ${face3}) = 2(${sumFaces}) = ${surfaceArea}$ square inches. Choice ${incorrectOptions[0].letter} is incorrect because it only calculates one face. Choice ${incorrectOptions[1].letter} is incorrect because it sums the face areas without doubling (a prism has 6 faces, not 3). Choice ${incorrectOptions[2].letter} is incorrect because it calculates volume instead of surface area.`
    };
  }
};

/**
 * Question ID: c984f1a5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: 27]
 * - Difficulty factors: [Hemisphere volume formula, approximation]
 * - Distractor patterns: [A: 1500 (way off), B: 6100 (wrong formula), C: 30900 (full sphere), D: 41200 (correct)]
 * - Constraints: [Must use V = (2/3)πr³ for hemisphere]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */