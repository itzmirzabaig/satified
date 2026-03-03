import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 53487897
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 8, point: (2,18), y = 8x + 2]
 * - Difficulty factors: [Finding equation from slope and point]
 * - Distractor patterns: [A = swapped values, B = wrong intercept, D = wrong calculation]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_53487897 = {
  metadata: {
    // id: "53487897",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: 4-12
    const m = getRandomInt(4, 12);
    // Point (x, y): x=2-4, y calculated to give reasonable intercept
    const x = getRandomInt(2, 4);
    const b = getRandomInt(1, 5); // target intercept
    const y = m * x + b;
    
    // STEP 2: Create options
    const correctEq = `y = ${m}x + ${b}`;
    const distA = `y = ${x}x + ${y}`;
    const distB = `y = ${x}x + ${m}`;
    const distD = `y = ${m + 5}x + ${b + 10}`;
    
    const optionsData = [
      { text: distA, isCorrect: false, reason: "swaps the slope and y values" },
      { text: distB, isCorrect: false, reason: "swaps the x and slope values" },
      { text: correctEq, isCorrect: true },
      { text: distD, isCorrect: false, reason: "has incorrect slope and y-intercept" }
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
      questionText: `The relationship between two variables, $x$ and $y$, is linear. For every increase in the value of $x$ by $1$, the value of $y$ increases by $${m}$. When the value of $x$ is $${x}$, the value of $y$ is $${y}$. Which equation represents this relationship?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The slope is $${m}$ (rate of change) and using point (${x}, ${y}): ${y} = ${m}(${x}) + b, so $b = ${y} - ${m * x} = ${b}$. Thus $y = ${m}x + ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 94749372
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 2x + 3, parallel line has same slope 2]
 * - Difficulty factors: [Understanding parallel lines have equal slopes]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward concept]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */