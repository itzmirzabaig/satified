import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 98c12e38
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius K: 4, area L: 100π]
 * - Difficulty factors: [Circle area, sum of areas]
 * - Distractor patterns: [A: sum of radii ×π, B: sum of diameters ×π, C: miscalculation]
 * - Constraints: [Should produce clean answer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_98c12e38 = {
  metadata: {
    // id: "98c12e38",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const radiusK = getRandomInt(3, 6);
    const radiusL = getRandomInt(8, 12);
    
    // STEP 2: Calculate derived values
    const areaK = radiusK * radiusK;
    const areaL = radiusL * radiusL;
    const totalArea = areaK + areaL;
    
    // STEP 3: Create options with tracking
    const correctText = `${totalArea}\\\\pi`;
    
    // Distractors
    const distractorA = `${(radiusK + radiusL)}\\\\pi`; // Sum of radii
    const distractorB = `${(2 * radiusK + 2 * radiusL)}\\\\pi`; // Sum of diameters
    const distractorC = `${(areaL - areaK)}\\\\pi`; // Difference
    
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
    const explanation = `Choice ${correctLetter} is correct. The area of circle K is $\\\\pi(${radiusK})^2 = ${areaK}\\\\pi$ mm². Circle L has area $${areaL}\\\\pi$ mm². The total area is ${areaK}\\\\pi + ${areaL}\\\\pi = ${totalArea}\\\\pi$ mm². Choice ${incorrectOptions[0].letter} is incorrect; this is the sum of the radii multiplied by $\\\\pi$, not the sum of the areas. Choice ${incorrectOptions[1].letter} is incorrect; this is the sum of the diameters multiplied by $\\\\pi$, not the sum of the areas. Choice ${incorrectOptions[2].letter} is incorrect; this appears to be the difference of the areas or another calculation error.`;
    
    return {
      questionText: `Circle $K$ has a radius of $${radiusK}$ millimeters (mm). Circle $L$ has an area of $${areaL}\\\\pi$ mm². What is the total area, in mm², of circles $K$ and $L$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 6ae1360d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: 2.1 inches]
 * - Difficulty factors: [Decimal radius, area = bπ format]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Decimal should square cleanly or reasonably]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */