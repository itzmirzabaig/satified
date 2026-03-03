import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c39dbbdf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, -9, 3]
 * - Difficulty factors: [Finding slope in standard form, parallel lines concept]
 * - Distractor patterns: [A: reciprocal, B: correct, C: sign error, D: wrong coefficient]
 * - Constraints: [Clean fraction slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_c39dbbdf = {
  metadata: {
    // id: "c39dbbdf",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters for clean slope A/B
    const A = getRandomInt(2, 12);
    const B = getRandomInt(2, 12);
    const C = getRandomInt(1, 20);
    const slope = A / B;
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$\\frac{${B}}{${A}}$`, isCorrect: false, reason: "This is the reciprocal." },
      { text: `$\\frac{${A}}{${B}}$`, isCorrect: true, reason: "" },
      { text: `$-${A}$`, isCorrect: false, reason: "This is -A, ignoring B." },
      { text: `-$${B}$`, isCorrect: false, reason: "This is -B, not the slope." }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `Line $r$ is defined by the equation $${A}x - ${B}y = ${C}$. Line $s$ is parallel to line $r$ in the $xy$-plane. What is the slope of line $s$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. Converting to slope-intercept form: $-${B}y = -${A}x + ${C}$, so $y = \\frac{${A}}{${B}}x - \\frac{${C}}{${B}}$. The slope is $\\frac{${A}}{${B}}$. Since line $s$ is parallel to line $r$, it has the same slope. ${incorrectOptions.map(opt => `${opt.letter} is incorrect because ${opt.reason}`).join('. ')}.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-ca452900.ts
/**
 * Question ID: ca452900
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 5/13, intercept: -23]
 * - Difficulty factors: [Identifying slope from slope-intercept form]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Clean fraction]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */
