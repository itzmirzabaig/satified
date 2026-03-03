import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a775af14
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (0,2) and (8,34), slope: 4, intercept: 2]
 * - Difficulty factors: [Finding equation from two points]
 * - Distractor patterns: [A = wrong slope/intercept, B = wrong slope/intercept, D = x-coord as slope]
 * - Constraints: [Points must give integer slope]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_a775af14 = {
  metadata: {
    // id: "a775af14",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // y-intercept: 2-5
    const b = getRandomInt(2, 5);
    // x2: 6-10
    const x2 = getRandomInt(6, 10);
    // slope: 3-6
    const m = getRandomInt(3, 6);
    // Calculate y2
    const y2 = b + m * x2;
    
    // STEP 2: Build equations
    const correctEq = `f(x) = ${m}x + ${b}`;
    const distA = `f(x) = ${m - 2}x + ${b + x2}`;
    const distB = `f(x) = ${m + 2}x + ${b + y2}`;
    const distD = `f(x) = ${x2}x + ${b}`;
    
    // STEP 3: Create options
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
      questionText: `In the $xy$-plane, the graph of the linear function $f$ contains the points $(0, ${b})$ and (${x2}, ${y2})$. Which equation defines $f$, where $y = f(x)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The slope is $m = \\frac{${y2} - ${b}}{${x2} - 0} = \\frac{${y2 - b}}{${x2}} = ${m}$. The y-intercept is ${b}. Thus $f(x) = ${m}x + ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 9551cd91
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cars: 3,5,10, passengers: 174,284,559, slope ~55, intercept ~9]
 * - Difficulty factors: [Finding linear equation from table, rearranging to standard form]
 * - Distractor patterns: [B = sign error, C = swapped variables, D = swapped variables and sign error]
 * - Constraints: [Table data must be consistent with linear model]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */