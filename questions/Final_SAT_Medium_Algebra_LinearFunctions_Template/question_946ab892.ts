import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 946ab892
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2, point: (1,14), intercept: 12]
 * - Difficulty factors: [Finding equation given slope and point]
 * - Distractor patterns: [A = no intercept, B = wrong intercept, D = y-value as intercept]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_946ab892 = {
  metadata: {
    // id: "946ab892",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: 2-6
    const m = getRandomInt(2, 6);
    // Point (x1, y1): x1=1-3, y1=10-20
    const x1 = getRandomInt(1, 3);
    const y1 = getRandomInt(10, 20);
    // Calculate intercept: y1 = m*x1 + b → b = y1 - m*x1
    const b = y1 - m * x1;
    
    // STEP 2: Create options
    const correctEq = `g(x)=${m}x+${b}`;
    const distA = `g(x)=${m}x`;
    const distB = `g(x)=${m}x+${b - 10}`;
    const distD = `g(x)=${m}x+${y1}`;
    
    const optionsData = [
      { text: distA, isCorrect: false, reason: "has no y-intercept term" },
      { text: distB, isCorrect: false, reason: "has incorrect y-intercept" },
      { text: correctEq, isCorrect: true },
      { text: distD, isCorrect: false, reason: "uses the y-coordinate as the y-intercept" }
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
      questionText: `For the linear function $g$, the graph of $y=g(x)$ in the $xy$-plane has a slope of $${m}$ and passes through the point $(${x1}, ${y1})$. Which equation defines $g$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. Using point-slope form with slope ${m} and point (${x1}, ${y1}): $y - ${y1} = ${m}(x - ${x1})$. Solving for y: $y = ${m}x - ${m * x1} + ${y1} = ${m}x + ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 0cadb20e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x+15)/5, f(a) = 10, a = 35]
 * - Difficulty factors: [Solving for input given output]
 * - Distractor patterns: [A = result of f(5), B = just the output value, D = wrong calculation]
 * - Constraints: [None - straightforward solving]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */