import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0451d754
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 17/7, y-intercept: 4]
 * - Difficulty factors: [Parallel lines have equal slopes]
 * - Distractor patterns: [A: reciprocal, B: correct, C: y-intercept, D: numerator only]
 * - Constraints: [Simple fraction slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_0451d754 = {
  metadata: {
    // id: "0451d754",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate slope parameters
    const num = getRandomInt(5, 25);
    const den = getRandomInt(2, 10);
    const yInt = getRandomInt(1, 9);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$\\frac{${den}}{${num}}$`, isCorrect: false, reason: "This is the reciprocal of the slope, not the slope itself. It might be confused with the slope of a perpendicular line." },
      { text: `$\\frac{${num}}{${den}}$`, isCorrect: true, reason: "" },
      { text: `$${yInt}$`, isCorrect: false, reason: "This is the $y$-intercept of line $k$, not the slope." },
      { text: `$${num}$`, isCorrect: false, reason: "This is just the numerator of the slope." }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `Line $k$ is defined by $y = \\frac{${num}}{${den}}x + ${yInt}$. Line $j$ is parallel to line $k$ in the $xy$-plane. What is the slope of line $j$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `The correct answer is **${correctLetter}**.\n\n1. Identify the slope of line $k$:\nThe equation for line $k$ is given in slope-intercept form, $y = mx + b$, where $m$ is the slope and $b$ is the $y$-intercept.\nComparing $y = \\frac{${num}}{${den}}x + ${yInt}$ to the standard form, we can see that the slope ($m$) of line $k$ is $\\frac{${num}}{${den}}$.\n\n2. Determine the slope of line $j$:\nThe problem states that line $j$ is parallel to line $k$. Parallel lines in the $xy$-plane have equal slopes.\nSince the slope of line $k$ is $\\frac{${num}}{${den}}$, the slope of line $j$ must also be $\\frac{${num}}{${den}}$.\n\nWhy other options are incorrect:\n${incorrectOptions.map(opt => `* **${opt.letter}:** ${opt.reason}`).join('\n')}`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-1087f6c4.ts
/**
 * Question ID: 1087f6c4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 24.5, 24.75, total: 641]
 * - Difficulty factors: [Interpreting coefficients as unit prices, subtraction]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Price difference should be small and positive]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */
