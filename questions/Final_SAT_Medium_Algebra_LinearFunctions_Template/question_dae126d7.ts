import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: dae126d7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 212, rate: 1/550 decrease]
 * - Difficulty factors: [Building linear model from description, rate as fraction]
 * - Distractor patterns: [A/B = wrong starting value, C = wrong direction (increasing)]
 * - Constraints: [None - model building]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_dae126d7 = {
  metadata: {
    // id: "dae126d7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Initial temperature: 200-220
    const initial = getRandomInt(200, 220);
    // Rate of decrease: 1 per 400-700 feet
    const rateDenom = getRandomInt(400, 700);
    
    // STEP 2: Create options
    const correctEq = `B=${initial}-\\frac{x}{${rateDenom}}`;
    const distA = `B=${rateDenom}+\\frac{x}{${initial}}`;
    const distB = `B=${rateDenom}-\\frac{x}{${initial}}`;
    const distC = `B=${initial}+\\frac{x}{${rateDenom}}`;
    
    const optionsData = [
      { text: distA, isCorrect: false, reason: "starts with the wrong value and has incorrect operations" },
      { text: distB, isCorrect: false, reason: "starts with the wrong value" },
      { text: distC, isCorrect: false, reason: "adds the decrease instead of subtracting it" },
      { text: correctEq, isCorrect: true }
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
      questionText: `The boiling point of water at sea level is ${initial} degrees Fahrenheit. For every ${rateDenom} feet above sea level, the boiling point of water is lowered by about 1°F. Which of the following equations can be used to find the boiling point $B$ of water, in °F, $x$ feet above sea level?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. At sea level ($x=0$), $B = ${initial}$. For every ${rateDenom} feet, $B$ decreases by 1, so the rate is $\\frac{1}{${rateDenom}}$ per foot. Since it decreases: $B = ${initial} - \\frac{x}{${rateDenom}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 271f7e3f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [function: f(x) = (x+7)/4, calculate f(9) - f(1)]
 * - Difficulty factors: [Function evaluation, subtraction]
 * - Distractor patterns: [A = off by calculation error, C = 1/4 (just slope), D = 9/4 (random)]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */