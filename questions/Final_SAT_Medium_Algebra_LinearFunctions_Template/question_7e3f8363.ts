import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 7e3f8363
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (0,3) and (7,31), slope: 4, intercept: 3]
 * - Difficulty factors: [Finding slope from two points, identifying y-intercept]
 * - Distractor patterns: [A = wrong slope + wrong intercept, B = wrong slope + wrong intercept, D = x-coord as slope]
 * - Constraints: [Points must give integer slope]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_7e3f8363 = {
  metadata: {
    // id: "7e3f8363",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // y-intercept point: (0, b) where b is single digit (2-6)
    const b = getRandomInt(2, 6);
    // Second point: (x2, y2) where x2 is single digit (5-9), and slope is clean integer
    const x2 = getRandomInt(5, 9);
    const slope = getRandomInt(2, 5); // slope between 2-5
    const y2 = b + slope * x2; // ensure linear relationship
    
    // STEP 2: Build distractor equations
    // Correct: f(x) = slope*x + b
    const correctEq = `f(x) = ${slope}x + ${b}`;
    // Distractor A: wrong slope (slope+2), wrong intercept (b+x2)
    const distA = `f(x) = ${slope + 2}x + ${b + x2}`;
    // Distractor B: wrong slope (slope-1 or 1), wrong intercept (b+y2)
    const distB = `f(x) = ${slope - 1}x + ${b + y2}`;
    // Distractor D: x2 as slope, correct intercept
    const distD = `f(x) = ${x2}x + ${b}`;
    
    // STEP 3: Create options with tracking
    const optionsData = [
      { text: distA, isCorrect: false, reason: "has the wrong slope and y-intercept" },
      { text: distB, isCorrect: false, reason: "has the wrong slope and y-intercept" },
      { text: correctEq, isCorrect: true },
      { text: distD, isCorrect: false, reason: "has the correct y-intercept but the wrong slope" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `In the $xy$-plane, the graph of the linear function $f$ contains the points (0, ${b})$ and (${x2}, ${y2}). Which equation defines f, where y = f(x)?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The slope is $m = \\frac{${y2} - ${b}}{${x2} - 0} = \\frac{${y2 - b}}{${x2}} = ${slope}$. The y-intercept is ${b} from the point $(0, ${b})$. Thus $f(x) = ${slope}x + ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: c1bd5301
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial weight: 241 (triple digit), rate: 3 (single digit)]
 * - Difficulty factors: [Interpreting linear model parameters in context]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward identification]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */