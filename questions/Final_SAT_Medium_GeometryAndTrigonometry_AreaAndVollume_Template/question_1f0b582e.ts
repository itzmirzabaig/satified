import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1f0b582e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [side X: 12 (double-digit), ratio: 2]
 * - Difficulty factors: [Perimeter scaling, proportional reasoning]
 * - Distractor patterns: [A: 6 (halved), B: 10 (unrelated), C: 14 (added 2)]
 * - Constraints: [Ratio must be integer for clean answer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1f0b582e = {
  metadata: {
    // id: "1f0b582e",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const sideX = getRandomInt(10, 20); // Double-digit like 12
    const ratio = getRandomInt(2, 4); // Perimeter ratio
    
    // STEP 2: Calculate derived values
    const perimeterX = 4 * sideX;
    const perimeterY = ratio * perimeterX;
    const sideY = perimeterY / 4; // = ratio * sideX
    
    // STEP 3: Create options with tracking
    const correctText = sideY.toString();
    
    // Distractors
    const distractorA = (sideX / 2).toString(); // Halved
    const distractorB = (sideX - 2).toString(); // Unrelated
    const distractorC = (sideX + 2).toString(); // Added 2
    
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
    const explanation = `Choice ${correctLetter} is correct. The perimeter of square X is $4 \\\\times ${sideX} = ${perimeterX}$ cm. The perimeter of square Y is ${ratio} times this, or ${perimeterY} cm. Therefore, each side of square Y is ${perimeterY} / 4 = ${sideY}$ cm. Alternatively, since perimeter scales linearly, the side length also scales by ${ratio}, giving ${sideX} \\\\times ${ratio} = ${sideY}$. Choice ${incorrectOptions[0].letter} is incorrect; this results from halving the side length instead of scaling by ${ratio}. Choice ${incorrectOptions[1].letter} is incorrect; this number is not related to the calculation. Choice ${incorrectOptions[2].letter} is incorrect; this results from adding 2 to the side length rather than multiplying by ${ratio}.`;
    
    return {
      questionText: `Square X has a side length of $${sideX}$ centimeters. The perimeter of square Y is $${ratio}$ times the perimeter of square X. What is the length, in centimeters, of one side of square Y?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: e86f0651
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: 43 (double-digit)]
 * - Difficulty factors: [Circle area formula, squaring double-digit numbers]
 * - Distractor patterns: [A: r/2, B: r, C: 2r (circumference)]
 * - Constraints: [Radius should be such that r² is clean]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */