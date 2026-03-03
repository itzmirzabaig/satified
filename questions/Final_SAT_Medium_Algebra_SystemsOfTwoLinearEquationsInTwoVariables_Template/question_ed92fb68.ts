import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ed92fb68
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, 5, 5, 4, results: 80, 82 (double-digit)]
 * - Difficulty factors: [Addition method, asks for x+y not individual variables]
 * - Distractor patterns: [0, 9, 18, 38 - various sums]
 * - Constraints: [Clean addition gives 9(x+y)]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_ed92fb68 = {
  metadata: {
    // id: "ed92fb68",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const a = getRandomInt(2, 6);
    let b = getRandomInt(2, 6);
    while (b === a) {
      b = getRandomInt(2, 6);
    }
    
    // Generate x and y values first
    const xValue = getRandomInt(5, 15);
    const yValue = getRandomInt(5, 15);
    const adjustedTotal1 = a * xValue + b * yValue;
    const adjustedTotal2 = b * xValue + a * yValue;
    
    // STEP 2: Build question text
    const questionText = `$$\\begin{cases} ${a}x + ${b}y = ${adjustedTotal1} \\\\ ${b}x + ${a}y = ${adjustedTotal2} \\end{cases}$$ \n\nIf the system of equations above has solution $(x, y)$, what is the value of $x + y$?`;
    
    // STEP 3: Calculate answer
    const sumTotals = adjustedTotal1 + adjustedTotal2;
    const answer = sumTotals / (a + b);
    
    // STEP 4: Create options
    const optionsData = [
      { text: "0", isCorrect: false },
      { text: Math.floor(answer / 2).toString(), isCorrect: false },
      { text: answer.toString(), isCorrect: true },
      { text: (answer + 20).toString(), isCorrect: false }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 6: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: answer.toString(),
      explanation: `Choice ${correctLetter} is correct. Adding the given equations yields $${a + b}x + ${a + b}y = ${sumTotals}$. Dividing each side by ${a + b} gives $x + y = ${answer}$.`
    };
  }
};

/**
 * Question ID: 6ba39da5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 8, 4, results: 198, 98 (triple-digit)]
 * - Difficulty factors: [Subtraction method, solve for b]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Clean subtraction gives 4b = 100]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */