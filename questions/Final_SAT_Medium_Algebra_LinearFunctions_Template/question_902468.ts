import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 902468
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [w(t) = 300 - 4t]
 * - Difficulty factors: [Interpreting rate in context]
 * - Distractor patterns: [A = initial value, B = calculation error, C = rate calculation error]
 * - Constraints: [None - straightforward interpretation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_902468 = {
  metadata: {
    // id: "902468",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Initial volume: 200-400
    const initial = getRandomInt(200, 400);
    // Rate: 2-8
    const rate = getRandomInt(2, 8);
    
    // STEP 2: Create options
    const correctText = rate.toString();
    const optionsData = [
      { text: initial.toString(), isCorrect: false, reason: "gives the initial volume, not the rate" },
      { text: (initial - rate).toString(), isCorrect: false, reason: "results from conceptual error" },
      { text: Math.floor(initial / rate).toString(), isCorrect: false, reason: "results from calculation error" },
      { text: correctText, isCorrect: true }
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
      questionText: `$w(t)=${initial}-${rate}t$ The function $w$ models the volume of liquid, in milliliters, in a container $t$ seconds after it begins draining from a hole at the bottom. According to the model, what is the predicted volume, in milliliters, draining from the container each second?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The function $w(t) = ${initial} - ${rate}t$ is in the form $y = mt + b$ where $m = -${rate}$ is the rate of change. The negative indicates decreasing volume, so ${rate} milliliters drain each second. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 9474921
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [j(x) = mx + 144, j(12) = 18, find j(10) = 39]
 * - Difficulty factors: [Two-step: find m, evaluate at new point]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [m must be negative for this pattern]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */