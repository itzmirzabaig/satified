import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b3c7ca1d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 16, various intercepts]
 * - Difficulty factors: [Identify parallel lines]
 * - Distractor patterns: [A, B, C, D systems]
 * - Constraints: [Same slope = parallel = no solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_b3c7ca1d = {
  metadata: {
    // id: "b3c7ca1d",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const m = getRandomInt(10, 20);
    const b1 = getRandomInt(2, 8);
    const b2 = b1 + getRandomInt(10, 20);
    
    // STEP 2: Build question text
    const questionText = `Which of the following systems of linear equations has no solution?`;
    
    // STEP 3: Create options
    const optionA = `$x=${getRandomInt(2, 5)}$ $y=${getRandomInt(5, 15)}$`;
    const optionB = `$y=${getRandomInt(5, 10)}x+${getRandomInt(5, 10)}$ $y=${getRandomInt(2, 8)}x+${getRandomInt(5, 10)}$`;
    const optionC = `$y=${m}x+${b1}$ $y=${m}x+${b2}$`;
    const optionD = `$y=${getRandomInt(3, 8)}$ $y=${getRandomInt(5, 15)}x+${getRandomInt(5, 15)}$`;
    
    const optionsData = [
      { text: optionA, isCorrect: false },
      { text: optionB, isCorrect: false },
      { text: optionC, isCorrect: true },
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
      correctAnswer: optionC,
      explanation: `A system of linear equations has no solution if the lines are parallel, which means they have the same slope but different y-intercepts. Let's analyze each option:\n\nA. These represent a vertical line and a horizontal line. They intersect at one point.\n\nB. These lines have different slopes, so they intersect at one point.\n\nC. Both lines have slope ${m} but different y-intercepts (${b1} and ${b2}), so they are parallel and never intersect. This system has no solution.\n\nD. These have different slopes (0 vs non-zero), so they intersect at one point.\n\nTherefore, the correct option is ${correctLetter}.`
    };
  }
};

/**
 * Question ID: 5e422ff9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, 2, 3, 5, -3]
 * - Difficulty factors: [Substitution, solve for y]
 * - Distractor patterns: [-15, -9, 9, 15]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */