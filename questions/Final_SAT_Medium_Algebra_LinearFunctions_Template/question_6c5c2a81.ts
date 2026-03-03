import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6c5c2a81
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (7,21) and (9,25), slope: 2, intercept: 7]
 * - Difficulty factors: [Finding equation from two points]
 * - Distractor patterns: [A = wrong slope, C = using point as slope/intercept, D = using point as slope/intercept]
 * - Constraints: [Points must give clean integer slope and intercept]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_6c5c2a81 = {
  metadata: {
    // id: "6c5c2a81",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: 2-5
    const m = getRandomInt(2, 5);
    // x1: 4-8
    const x1 = getRandomInt(4, 8);
    // x2: x1+2 to x1+4
    const x2 = x1 + getRandomInt(2, 4);
    // y1: 15-30
    const y1 = getRandomInt(15, 30);
    // Calculate y2
    const y2 = y1 + m * (x2 - x1);
    // Calculate intercept
    const b = y1 - m * x1;
    
    // STEP 2: Build equations
    const correctEq = `h(x) = ${m}x + ${b}`;
    const distA = `h(x) = \\frac{1}{${m}}x + ${b > 0 ? '\\frac{' + b + '}{' + m + '}' : '-' + Math.abs(b) + '/' + m}`;
    const distC = `h(x) = ${x1}x + ${y1}`;
    const distD = `h(x) = ${x2}x + ${y2}`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: distA, isCorrect: false, reason: "has an incorrect slope" },
      { text: correctEq, isCorrect: true },
      { text: distC, isCorrect: false, reason: "incorrectly uses the first point's coordinates as slope and intercept" },
      { text: distD, isCorrect: false, reason: "incorrectly uses the second point's coordinates as slope and intercept" }
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
      questionText: `For the linear function $h$, the graph of $y = h(x)$ in the $xy$-plane passes through the points (${x1}, ${y1}) and (${x2}, ${y2}). Which equation defines $h$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The slope is $m = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${m}$. Using point (${x1}, ${y1}): ${y1} = ${m}(${x1}) + b, so $b = ${y1} - ${m * x1} = ${b}$. Thus $h(x) = ${m}x + ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

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