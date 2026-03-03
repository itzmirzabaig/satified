import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: daad7c32
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [unstretched length: 30 (double-digit), rate: 2 (single-digit)]
 * - Difficulty factors: [Interpreting slope in real-world context]
 * - Distractor patterns: [A: intercept interpretation, B: wrong variable, C: inverse relationship]
 * - Constraints: [l = 30 + 2w, interpret 2 as stretch per unit weight]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_daad7c32 = {
  metadata: {
    // id: "daad7c32",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const unstretchedLength = getRandomInt(20, 40); // 20-40 cm
    const stretchRate = getRandomInt(2, 5); // 2-5 cm per newton
    
    // STEP 2: Create options
    const correctText = `The increase in the length, in centimeters, of the spring for each one-newton increase in the weight of the object`;
    
    const optionsData = [
      { text: `The length, in centimeters, of the spring with no weight attached`, isCorrect: false, reason: `describes the value ${unstretchedLength}, not ${stretchRate}` },
      { text: `The weight, in newtons, of an object that will stretch the spring ${unstretchedLength} centimeters`, isCorrect: false, reason: `${unstretchedLength} represents the unstretched length, not a stretch distance` },
      { text: `The increase in the weight, in newtons, of the object for each one-centimeter increase in the length of the spring`, isCorrect: false, reason: `describes the inverse relationship $\\\\frac{1}{${stretchRate}}$, not the coefficient ${stretchRate}` },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `An object hangs from a spring. The formula $\\\\ell=${unstretchedLength}+${stretchRate} w$ relates the length $\\\\ell$, in centimeters, of the spring to the weight $w$, in newtons, of the object. Which of the following describes the meaning of the ${stretchRate} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The value ${stretchRate} is multiplied by $w$, the weight. When weight increases by 1 newton, length increases by ${stretchRate} centimeters. This is the rate of change of length with respect to weight. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 0bd33265
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Fahrenheit: 467.33 (decimal), coefficients: 9/5, constants: 273.15, 32]
 * - Difficulty factors: [Inverse temperature conversion, solving for Kelvin given Fahrenheit]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Reverse of standard conversion formula]
 * - Question type: [Word problem → Fill in the blank]
 * - Figure generation: [None]
 */

// File: generators/linear-functions/0bd33265.ts