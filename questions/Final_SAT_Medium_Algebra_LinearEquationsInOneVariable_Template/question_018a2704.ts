import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 018a2704
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 46, constant: 16, result: 30]
 * - Difficulty factors: [Solving for expression rather than variable, direct isolation]
 * - Distractor patterns: [A is the constant term, B is value of x, D is miscalculation]
 * - Constraints: [Equation asks for value of expression 2(x-8), not x itself]
 * - Question type: [Multiple Choice Text]
 */

export const generator_018a2704 = {
  metadata: {
    // id: "018a2704",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation of form A = B + C(x - D)
    // Where we want to find C(x - D)
    const A = getRandomInt(30, 60);
    const B = getRandomInt(10, 25);
    const C = getRandomInt(2, 5);
    const D = getRandomInt(4, 12);
    
    // Target value = A - B
    const targetValue = A - B;
    
    // Distractors
    const distractorA = B;
    const distractorB = D + (targetValue / C); // approximate x value
    const distractorD = A - B + 8; // miscalculation
    
    const correctText = targetValue.toString();
    const optionsData = [
      { text: `${distractorA}`, isCorrect: false },
      { text: `${Math.round(distractorB)}`, isCorrect: false },
      { text: `${targetValue}`, isCorrect: true },
      { text: `${distractorD}`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    return {
      questionText: `If $${A} = ${B} + ${C}(x - ${D})$, what is the value of $${C}(x - ${D})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. To find the value of $${C}(x - ${D})$, subtract $${B}$ from both sides of the given equation: $${A} - ${B} = ${C}(x - ${D})$, which gives $${targetValue} = ${C}(x - ${D})$. Therefore, the value of $${C}(x - ${D})$ is ${targetValue}.`
    };
  }
};

/**
 * Question ID: 70e29454
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: a=2, b=7, constants: -1]
 * - Difficulty factors: [Two-parameter infinite solutions condition]
 * - Distractor patterns: [A has right a but wrong b, C/D have wrong sign for a]
 * - Constraints: [For infinite solutions: coefficients must match AND constants must match]
 * - Question type: [Multiple Choice Text]
 */