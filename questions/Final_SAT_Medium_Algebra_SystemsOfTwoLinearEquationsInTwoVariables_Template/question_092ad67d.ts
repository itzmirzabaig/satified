import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 092ad67d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, 2, 1, -2, results: 6, 4]
 * - Difficulty factors: [Elimination by addition, solve for x]
 * - Distractor patterns: [2.5, 5, 6, 10]
 * - Constraints: [Clean elimination of y]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_092ad67d = {
  metadata: {
    // id: "092ad67d",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const yCoeff1 = getRandomInt(1, 4);
    const yCoeff2 = -yCoeff1; // Negative to eliminate
    const result1 = getRandomInt(5, 15);
    const result2 = getRandomInt(3, 12);
    const xValue = (result1 + result2) / 2;
    
    // STEP 2: Build question text
    const signStr = yCoeff2 >= 0 ? '+' : '';
    const questionText = `$$\\begin{cases} x + ${yCoeff1}y = ${result1} \\\\ x ${signStr}${yCoeff2}y = ${result2} \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $x$?`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: (xValue / 2).toString(), isCorrect: false },
      { text: xValue.toString(), isCorrect: true },
      { text: result1.toString(), isCorrect: false },
      { text: (xValue * 2).toString(), isCorrect: false }
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
      correctAnswer: xValue.toString(),
      explanation: `Adding the two equations eliminates $y$: $(x + ${yCoeff1}y) + (x ${signStr}${yCoeff2}y) = ${result1} + ${result2} \\implies 2x = ${result1 + result2}$. Thus, $x = ${xValue}$.`
    };
  }
};

/**
 * Question ID: d909cd31
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: -15, 25, 65 (double-digit)]
 * - Difficulty factors: [Infinitely many solutions = equivalent equations]
 * - Distractor patterns: [Various sign combinations]
 * - Constraints: [Must be scalar multiple]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */