import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 65833256
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 6, -7, -1, 16, 36]
 * - Difficulty factors: [Substitution with negative numbers]
 * - Distractor patterns: [(-4, -8), (-20/13, -80/13), (4, 40), (20, 136)]
 * - Constraints: [Integer solution with negatives]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_65833256 = {
  metadata: {
    // id: "65833256",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const m = getRandomInt(4, 8);
    const b = getRandomInt(10, 25);
    const a2 = -1 * getRandomInt(5, 10);
    
    const xValue = -4;
    const yValue = m * xValue + b;
    const adjustedC2 = a2 * xValue - yValue;
    
    // STEP 2: Build question text
    const questionText = `What is the solution $(x, y)$ to the given system of equations?\n\n$$y = ${m}x+${b}$$\n$$${a2}x - y = ${adjustedC2}$$`;
    
    // STEP 3: Create options
    const optionA = `(${xValue}, ${yValue})`;
    const optionB = `\\( \\left(-\\frac{20}{13},-\\frac{80}{13}\\right) \\)`;
    const optionC = `(${Math.abs(xValue)}, ${Math.abs(yValue) * 5})`;
    const optionD = `(${Math.abs(xValue) * 5}, ${Math.abs(yValue) * 17})`;
    
    const optionsData = [
      { text: optionA, isCorrect: true },
      { text: optionB, isCorrect: false },
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
      correctAnswer: optionA,
      explanation: `Choice ${correctLetter} is correct. The given system of linear equations can be solved by the substitution method. The first equation in the given system of equations defines \\( y \\) as \\( ${m} x+${b} \\). Substituting \\( ${m} x+${b} \\) for \\( y \\) in the second equation of the given system of equations yields \\( ${a2} x-(${m}x+${b})=${adjustedC2} \\). Applying the distributive property on the left-hand side of this equation yields \\( ${a2} x-${m} x-${b}=${adjustedC2} \\), or \\( ${a2 - m}x-${b}=${adjustedC2} \\). Adding ${b} to both sides of this equation yields \\( ${a2 - m}x=${adjustedC2 + b} \\). Dividing both sides of this equation by ${a2 - m} yields \\( x=${xValue} \\). Substituting ${xValue} for \\( x \\) in the first equation of the given system of equations, \\( y=${m} x+${b} \\), yields \\( y=${m}(${xValue})+${b} \\), or \\( y=${yValue} \\). Therefore, the solution \\( (x, y) \\) to the given system of equations is \\( (${xValue},${yValue}) \\). Choice B is incorrect and may result from conceptual or calculation errors. Choice C is incorrect and may result from conceptual or calculation errors. Choice D is incorrect and may result from conceptual or calculation errors.`
    };
  }
};

/**
 * Question ID: e53688cb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, 3, 0, 3, results: 29, 11]
 * - Difficulty factors: [Simple substitution, solve for x]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Integer answer 18]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */