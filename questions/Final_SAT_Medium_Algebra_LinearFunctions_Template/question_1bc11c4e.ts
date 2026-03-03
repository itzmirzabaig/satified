import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1bc11c4e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [g(m) = -0.05m + 12.1, find rate per mile]
 * - Difficulty factors: [Interpreting slope in context with decimals]
 * - Distractor patterns: [B = initial amount, C = mpg calculation, D = total range]
 * - Constraints: [None - straightforward interpretation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1bc11c4e = {
  metadata: {
    // id: "1bc11c4e",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Rate: -0.03 to -0.08
    const rate = -Math.round((Math.random() * 0.05 + 0.03) * 100) / 100;
    // Initial: 10-15
    const initial = Math.round((Math.random() * 5 + 10) * 10) / 10;
    
    // STEP 2: Create options
    const correctText = Math.abs(rate).toFixed(2);
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: initial.toFixed(1), isCorrect: false, reason: "gives the initial amount in the tank" },
      { text: (1/Math.abs(rate)).toFixed(1), isCorrect: false, reason: "calculates miles per gallon instead of gallons per mile" },
      { text: (initial/Math.abs(rate)).toFixed(1), isCorrect: false, reason: "calculates total range instead of rate per mile" }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `The given function $g$ models the number of gallons of gasoline that remains from a full gas tank in a car after driving $m$ miles. The function is defined by $g(m) = ${rate.toFixed(2)}m + ${initial.toFixed(1)}$. According to the model, about how many gallons of gasoline are used to drive each mile?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The slope is ${rate.toFixed(2)}, meaning the tank loses ${Math.abs(rate).toFixed(2)} gallons per mile driven. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 113b938e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation context: speed y, time x after brakes]
 * - Difficulty factors: [Interpreting x-intercept in context]
 * - Distractor patterns: [A = y-intercept interpretation, B = slope interpretation, D = distance confusion]
 * - Constraints: [None - conceptual interpretation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */