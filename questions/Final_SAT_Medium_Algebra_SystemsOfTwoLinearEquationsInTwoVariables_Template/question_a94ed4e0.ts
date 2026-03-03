import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a94ed4e0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3, 4, -3, 9, results: 17, -23]
 * - Difficulty factors: [Addition method, asks for 39x]
 * - Distractor patterns: [-18, -6, 6, 18]
 * - Constraints: [Clean addition eliminates y]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_a94ed4e0 = {
  metadata: {
    // id: "a94ed4e0",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const yCoeff1 = getRandomInt(2, 6);
    const yCoeff2 = -yCoeff1; // To eliminate y
    const xCoeff1 = getRandomInt(2, 5);
    const xCoeff2 = getRandomInt(5, 12);
    
    // Work backwards from x = 6/13 to get 39x = 18
    const xValue = getRandomInt(1, 10);
    const multiplier = getRandomInt(3, 8);
    const answer = multiplier * xValue;
    
    const right1 = getRandomInt(10, 30);
    const right2 = right1 - (xCoeff1 + xCoeff2) * xValue;
    
    // STEP 2: Build question text
    const signStr = right2 >= 0 ? '+' : '';
    const questionText = `$$\\begin{cases} ${yCoeff1}y = ${xCoeff1}x + ${right1} \\\\ ${yCoeff2}y = ${xCoeff2}x ${signStr}${right2} \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $${multiplier * (xCoeff1 + xCoeff2)}x$?`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: (-answer).toString(), isCorrect: false },
      { text: Math.floor(-answer/3).toString(), isCorrect: false },
      { text: Math.floor(answer/3).toString(), isCorrect: false },
      { text: answer.toString(), isCorrect: true }
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
      correctAnswer: answer.toString(),
      explanation: `Add equations: $0 = ${xCoeff1 + xCoeff2}x ${right1 >= 0 ? '+' : ''}${right1} ${right2 >= 0 ? '+' : ''}${right2} \\implies ${xCoeff1 + xCoeff2}x = ${right1 + right2} \\implies x = ${xValue}$. Then $${multiplier * (xCoeff1 + xCoeff2)}x = ${multiplier * (xCoeff1 + xCoeff2)}(${xValue}) = ${multiplier}(${xValue * (xCoeff1 + xCoeff2)/multiplier}) = ${answer}$.`
    };
  }
};

/**
 * Question ID: 686b7cad
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [votes: 15,000 difference, ratio: 3:1]
 * - Difficulty factors: [Word problem, system from ratios]
 * - Distractor patterns: [7500, 15000, 22500, 45000]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */