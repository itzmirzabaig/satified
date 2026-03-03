import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 2875ba81
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 6, 7, 2, 2, results: 28, 10]
 * - Difficulty factors: [Substitution after simplification, solve for y]
 * - Distractor patterns: [-2, 7, 14, 18]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2875ba81 = {
  metadata: {
    // id: "2875ba81",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const a1 = getRandomInt(4, 8);
    const b1 = getRandomInt(5, 9);
    const a2 = getRandomInt(1, 3);
    const b2 = getRandomInt(1, 3);
    
    // Work backwards: y = -2, then calculate x and right sides
    const yValue = -2;
    const xValue = getRandomInt(3, 8);
    const right1 = a1 * xValue + b1 * yValue;
    const right2 = a2 * xValue + b2 * yValue;
    
    // STEP 2: Build question text
    const questionText = `$$\\begin{cases} ${a1}x + ${b1}y = ${right1} \\\\ ${a2}x + ${b2}y = ${right2} \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $y$?`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: yValue.toString(), isCorrect: true },
      { text: xValue.toString(), isCorrect: false },
      { text: (yValue * -7).toString(), isCorrect: false },
      { text: (yValue * -9).toString(), isCorrect: false }
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
      correctAnswer: yValue.toString(),
      explanation: `Divide the second equation by ${a2}: $x + ${b2/a2 === 1 ? '' : b2/a2}y = ${right2/a2} \\implies x = ${right2/a2} - ${b2/a2 === 1 ? '' : b2/a2}y$. Substitute into the first: ${a1}(${right2/a2} - ${b2/a2}y) + ${b1}y = ${right1} \\implies ${a1 * right2/a2} - ${a1 * b2/a2}y + ${b1}y = ${right1} \\implies y = ${yValue}$.`
    };
  }
};

/**
 * Question ID: 4e400635
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3, 4, 2, constants: 6, 4]
 * - Difficulty factors: [Subtraction method, solve for y]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Clean subtraction gives 2 = 2y]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */