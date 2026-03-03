import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 23dedddd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(0)=8, f(1)=12, slope=4, intercept=8]
 * - Difficulty factors: [Finding equation from two function values]
 * - Distractor patterns: [A = wrong slope/intercept, B = intercept=0, C = wrong intercept]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_23dedddd = {
  metadata: {
    // id: "23dedddd",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // f(0): 5-15
    const f0 = getRandomInt(5, 15);
    // f(1): f0 + 3 to f0 + 8
    const f1 = f0 + getRandomInt(3, 8);
    // Slope = f1 - f0
    const m = f1 - f0;
    // Intercept = f0
    
    // STEP 2: Create options
    const correctEq = `f(x) = ${m}x + ${f0}`;
    const distA = `f(x) = ${f1}x + ${f0}`;
    const distB = `f(x) = ${m}x`;
    const distC = `f(x) = ${m}x + ${f1}`;
    
    const optionsData = [
      { text: distA, isCorrect: false, reason: "uses f(1) as the slope" },
      { text: distB, isCorrect: false, reason: "has correct slope but y-intercept of 0" },
      { text: distC, isCorrect: false, reason: "uses f(1) as the y-intercept" },
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
      questionText: `In the linear function $f$, $f(0) = ${f0}$ and $f(1) = ${f1}$. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The y-intercept is $f(0) = ${f0}$. The slope is $\\frac{f(1) - f(0)}{1 - 0} = \\frac{${f1} - ${f0}}{1} = ${m}$. Thus $f(x) = ${m}x + ${f0}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: c8fb6bcb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 2x + 244, find width]
 * - Difficulty factors: [Connecting linear function to geometric formula]
 * - Distractor patterns: [A = coefficient, C = full perimeter term, D = doubled]
 * - Constraints: [None - formula recognition]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */