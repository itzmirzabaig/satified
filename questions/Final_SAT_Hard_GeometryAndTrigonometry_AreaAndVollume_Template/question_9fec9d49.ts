import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9fec9d49
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [actual area: 600, scale: 1/10]
 * - Difficulty factors: [Area scaling with linear scale factor, common misconception of linear area scaling]
 * - Distractor patterns: [A: 6 (correct), B: random, C: 60 (linear scaling error), D: 150 (600/4)]
 * - Constraints: [Scale factor squared for area]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_9fec9d49 = {
  metadata: {
    // id: "9fec9d49",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate scale factor (1/n where n is small integer)
    const scaleDenominator = getRandomInt(5, 15); // 1/5 to 1/15
    const actualArea = getRandomInt(300, 900); // Similar to original 600
    
    // STEP 2: Calculate model area
    // Area scales by (scale factor)²
    const modelArea = actualArea / (scaleDenominator * scaleDenominator);
    
    // STEP 3: Create distractors
    const distractorB = getRandomInt(10, 20); // Random small number
    const distractorC = actualArea / scaleDenominator; // Linear scaling error
    const distractorD = Math.round(actualArea / 4); // Arbitrary division
    
    const correctText = modelArea.toString();
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB.toString(), isCorrect: false },
      { text: distractorC.toString(), isCorrect: false },
      { text: distractorD.toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The floor of a ballroom has an area of $${actualArea}$ square meters. An architect creates a scale model of the floor of the ballroom, where the length of each side of the model is $\\frac{1}{${scaleDenominator}}$ times the length of the corresponding side of the actual floor of the ballroom. What is the area, in square meters, of the scale model?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. When linear dimensions are scaled by $\\frac{1}{${scaleDenominator}}$, the area scales by $\\left(\\frac{1}{${scaleDenominator}}\\right)^2 = \\frac{1}{${scaleDenominator * scaleDenominator}}$. Therefore, the model area is $\\frac{${actualArea}}{${scaleDenominator * scaleDenominator}} = ${modelArea}$ square meters. Choice ${incorrectOptions[0].letter} is incorrect as it is a random distractor. Choice ${incorrectOptions[1].letter} is incorrect because it applies linear scaling to area instead of squaring the scale factor. Choice ${incorrectOptions[2].letter} is incorrect due to an arbitrary calculation error.`
    };
  }
};

/**
 * Question ID: ba8ca563
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 474552 (large perfect cube)]
 * - Difficulty factors: [Cube root calculation, surface area from side length]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Volume must be perfect cube for integer side length]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */