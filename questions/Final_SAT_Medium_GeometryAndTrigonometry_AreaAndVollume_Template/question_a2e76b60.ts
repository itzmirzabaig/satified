import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a2e76b60
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base area: 75, height: 10, syrup: 110]
 * - Difficulty factors: [Volume subtraction, total vs partial volume]
 * - Distractor patterns: [A: base/10, B: syrup×something, D: total volume]
 * - Constraints: [Numbers should produce clean integer fruit volume]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_a2e76b60 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const baseArea = getRandomInt(60, 90);
    const height = getRandomInt(8, 12);
    const totalVolume = baseArea * height;
    const syrupVolume = getRandomInt(100, 150);
    const fruitVolume = totalVolume - syrupVolume;
    
    // STEP 2: Create options with tracking
    // FIXED: Changed \\\\text to \\text for proper LaTeX text command
    const correctText = `${fruitVolume}\\text{ cm}^3`;
    
    // Distractors
    const distractorA = `${(baseArea / 10).toFixed(1)}\\text{ cm}^3`; // Base/10
    const distractorB = `${(syrupVolume + baseArea)}\\text{ cm}^3`; // Syrup + base
    const distractorD = `${totalVolume}\\text{ cm}^3`; // Total volume
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorD, isCorrect: false }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Build explanation
    // FIXED: Changed all \\\\text to \\text, and \\\\times to \\times
    const explanation = `Choice ${correctLetter} is correct. The total volume of the can is $V = \\text{base area} \\times \\text{height} = ${baseArea} \\times ${height} = ${totalVolume}$ cm³. The volume of fruit is the total volume minus the syrup volume: $${totalVolume} - ${syrupVolume} = ${fruitVolume}$ cm³. Choice ${incorrectOptions[0].letter} is incorrect; this appears to divide the base area by 10 arbitrarily. Choice ${incorrectOptions[1].letter} is incorrect; this adds unrelated quantities. Choice ${incorrectOptions[2].letter} is incorrect; this is the total volume of the can, not just the fruit.`;
    
    return {
      // FIXED: Changed \\\\text to \\text in questionText
      questionText: `A cylindrical can containing pieces of fruit is filled to the top with syrup before being sealed. The base of the can has an area of $${baseArea}\\text{ cm}^2$, and the height of the can is $${height}\\text{ cm}$. If $${syrupVolume}\\text{ cm}^3$ of syrup is needed to fill the can to the top, which of the following is closest to the total volume of the pieces of fruit in the can?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};