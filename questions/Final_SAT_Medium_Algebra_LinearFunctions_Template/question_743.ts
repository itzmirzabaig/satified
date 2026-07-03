import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 743
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (0,3) and (7,31), slope: 4, intercept: 3]
 * - Difficulty factors: [Finding slope from two points, identifying y-intercept]
 * - Distractor patterns: [A = wrong slope + wrong intercept, B = wrong slope + wrong intercept, D = x-coord as slope]
 * - Constraints: [Points must give integer slope]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_743 = {
  metadata: {
    id: "743",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // y-intercept point: (0, b) where b is single digit (2-6)
    // Second point: (x2, y2) where x2 is single digit (5-9), and slope is a clean integer.
    // The distractor "distD" uses x2 as its slope; guard against x2 === slope so that
    // distD never collides with the correct equation (both would then read `${slope}x + ${b}`).
    let b = getRandomInt(2, 6);
    let x2 = getRandomInt(5, 9);
    let slope = getRandomInt(2, 5); // slope between 2-5
    let tries = 0;
    while (x2 === slope && tries++ < 50) {
      x2 = getRandomInt(5, 9);
      slope = getRandomInt(2, 5);
    }
    const y2 = b + slope * x2; // ensure linear relationship

    // STEP 2: Build distractor equations
    // Correct: f(x) = slope*x + b
    const correctEq = `f(x) = ${slope}x + ${b}`;
    // Distractor A: wrong slope (slope+2), wrong intercept (b+x2)
    const distA = `f(x) = ${slope + 2}x + ${b + x2}`;
    // Distractor B: wrong slope (slope-1, always >=1), wrong intercept (b+y2)
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
      questionText: `In the $xy$-plane, the graph of the linear function $f$ contains the points $(0, ${b})$ and $(${x2}, ${y2})$. Which equation defines $f$, where $y = f(x)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The slope is $m = \\frac{${y2} - ${b}}{${x2} - 0} = \\frac{${y2 - b}}{${x2}} = ${slope}$. The y-intercept is ${b} from the point $(0, ${b})$. Thus $f(x) = ${slope}x + ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
