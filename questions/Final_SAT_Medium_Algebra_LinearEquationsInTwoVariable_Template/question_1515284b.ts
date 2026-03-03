import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1515284b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 7, y-intercept: 1/8]
 * - Difficulty factors: [Finding perpendicular slope from fraction intercept]
 * - Distractor patterns: [A: negative reciprocal of intercept, B: correct, C: intercept, D: original slope]
 * - Constraints: [Clean negative reciprocal]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1515284b = {
  metadata: {
    // id: "1515284b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const slope = getRandomInt(2, 10);
    const interceptNum = 1;
    const interceptDen = getRandomInt(2, 10);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$-${interceptDen}$`, isCorrect: false, reason: "negative reciprocal of the y-intercept" },
      { text: `$-\\frac{1}{${slope}}$`, isCorrect: true, reason: "" },
      { text: `$\\frac{${interceptNum}}{${interceptDen}}$`, isCorrect: false, reason: "the y-intercept of line k" },
      { text: `$${slope}$`, isCorrect: false, reason: "the slope of line k (parallel lines would have this)" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `Line $k$ is defined by $y=${slope}x+\\frac{${interceptNum}}{${interceptDen}}$. Line $j$ is perpendicular to line $k$ in the $xy$-plane. What is the slope of line $j$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `The correct answer is ${correctLetter}.\n\nThe given equation for line $k$ is in slope-intercept form, $y=mx+b$, where $m$ is the slope and $b$ is the $y$-intercept. Comparing $y=${slope}x+\\frac{${interceptNum}}{${interceptDen}}$ to the slope-intercept form, we can see that the slope of line $k$ is ${slope}.\n\nWhen two lines are perpendicular in the $xy$-plane, the product of their slopes is $-1$. Let $m_k$ be the slope of line $k$ and $m_j$ be the slope of line $j$. We have $m_k \\cdot m_j = -1$. Substituting $m_k = ${slope}$, we get $${slope} \\cdot m_j = -1$, so $m_j = -\\frac{1}{${slope}}$.\n\n${incorrectOptions.map(opt => `${opt.letter} is incorrect because ${opt.reason}.`).join(' ')}`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-431c3038.ts
/**
 * Question ID: 431c3038
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hiking: 200/30min, biking: 150/30min, total: 1900]
 * - Difficulty factors: [Unit conversion, setting up linear equation]
 * - Distractor patterns: [A: solving for half-periods not hours, B: wrong period count, C: subtraction error, D: correct]
 * - Constraints: [Answer must be integer hours]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
