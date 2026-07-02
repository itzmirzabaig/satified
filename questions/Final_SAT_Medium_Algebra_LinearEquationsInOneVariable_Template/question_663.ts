import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 663
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, 4, 29, constant: 29]
 * - Difficulty factors: [Solving for expression (x+4) rather than x]
 * - Distractor patterns: [A is x value, B is wrong calculation, D is x+4+4]
 * - Constraints: [Let u = x+4, solve 5u = 4u + 29]
 * - Question type: [Multiple Choice Text]
 */

export const generator_663 = {
  metadata: {
    id: "663",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation of form a(x+c) = b(x+c) + d
    const a = getRandomInt(3, 7);
    const b = getRandomInt(2, a - 1); // Ensure a > b for positive answer
    const c = getRandomInt(2, 8);
    const d = getRandomInt(15, 40);
    
    // Target: (a-b)(x+c) = d, so x+c = d/(a-b)
    const targetValue = d / (a - b);
    
    // Distractors
    const distractorA = -c;
    const distractorB = targetValue - c; // x value roughly
    const distractorD = targetValue + c;
    
    const correctText = `${targetValue}`;
    const optionsData = [
      { text: `\\(${distractorA}\\)`, isCorrect: false },
      { text: `\\(${Math.round(distractorB)}\\)`, isCorrect: false },
      { text: `\\(${targetValue}\\)`, isCorrect: true },
      { text: `\\(${distractorD}\\)`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    return {
      questionText: `If \\(5(x+${c})=4(x+${c})+${d}\\), what is the value of \\(x+${c}\\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. To find the value of \\(x+${c}\\), let \\(u = x+${c}\\). The given equation becomes \\(5u = 4u + ${d}\\). Subtracting \\(4u\\) from both sides yields \\(u = ${d}\\). Since \\(u = x+${c}\\), the value of \\(x+${c}\\) is ${targetValue}.`
    };
  }
};
