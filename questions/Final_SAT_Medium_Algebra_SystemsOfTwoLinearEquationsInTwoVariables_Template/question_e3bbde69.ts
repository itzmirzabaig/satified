import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e3bbde69
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 8, 1, 9, 1, results: 5, 1]
 * - Difficulty factors: [Substitution with decimals/fractions result]
 * - Distractor patterns: [-6, 4/17, 6/17, 4]
 * - Constraints: [Fraction answer]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_e3bbde69 = {
  metadata: {
    // id: "e3bbde69",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const a1 = getRandomInt(5, 12);
    const b1 = getRandomInt(1, 3);
    const a2 = getRandomInt(a1 + 1, 15);
    const b2 = getRandomInt(1, 5);
    const c1 = getRandomInt(3, 10);
    
    // 8x + y = 5, y = 9x + 1
    // 8x + 9x + 1 = 5
    // 17x = 4
    // x = 4/17
    
    const xNum = c1 - b2;
    const xDen = a1 + a2;
    
    // STEP 2: Build question text
    const questionText = `$$\\begin{cases} ${a1}x + ${b1 === 1 ? '' : b1}y = ${c1} \\\\ y = ${a2}x + ${b2} \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $x$?`;
    
    // STEP 3: Create options
    const optionA = `-$${c1}$`;
    const optionB = `$${xNum}/${xDen}$`;
    const optionC = `$${Math.abs(xNum - 2)}/${xDen}$`;
    const optionD = `$${c1 - 1}$`;
    
    const optionsData = [
      { text: optionA, isCorrect: false },
      { text: optionB, isCorrect: true },
      { text: optionC, isCorrect: false },
      { text: optionD, isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: optionB,
      explanation: `Substitute $y$ from the second into the first: $${a1}x + (${a2}x + ${b2}) = ${c1} \\implies ${a1 + a2}x + ${b2} = ${c1} \\implies ${a1 + a2}x = ${c1 - b2} \\implies x = ${xNum}/${xDen}$.`
    };
  }
};

/**
 * Question ID: b544a348
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, 3, 1, 3, results: 38, 10]
 * - Difficulty factors: [Elimination, solve for x]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Integer answer 7]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */