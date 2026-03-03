import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1515206
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [employees: 81, budget: 14000, tax: 7%]
 * - Difficulty factors: [Working backwards from total including tax, division]
 * - Distractor patterns: [A: wrong calculation with tax ~148, C: no tax ~172.84, D: adds tax instead of removing ~184.94]
 * - Constraints: [total = chairs * price * 1.07]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1515206 = {
  metadata: {
    // id: "1515206",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 81 employees, $14000, 7% tax
    // Generate: employees 70-90, budget 12000-16000, tax 5-10%
    
    const employees = getRandomInt(7, 9) * 10 + getRandomInt(0, 9); // 70-99
    const budget = getRandomInt(120, 160) * 100; // 12000-16000
    const taxRate = getRandomInt(5, 10); // 5-10%
    const taxMultiplier = 1 + (taxRate / 100);
    
    // STEP 2: Calculate max price per chair before tax
    // employees * price * taxMultiplier ≤ budget
    // price ≤ budget / (employees * taxMultiplier)
    const maxPrice = budget / (employees * taxMultiplier);
    
    // STEP 3: Create distractors
    const distractorA = (budget - (budget * taxRate / 100)) / employees;
    
    const distractorC = budget / employees;
    
    const distractorD = (budget * taxMultiplier) / employees;
    
    // Fixed: Use proper LaTeX formatting without double escaping
    const formatCurrency = (num: number) => `\\$${num.toFixed(2)}`;
    
    const optionsData = [
      { text: formatCurrency(distractorA), isCorrect: false },
      { text: formatCurrency(maxPrice), isCorrect: true },
      { text: formatCurrency(distractorC), isCorrect: false },
      { text: formatCurrency(distractorD), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `A business owner plans to purchase the same model of chair for each of the $${employees}$ employees. The total budget to spend on these chairs is \\$${budget.toLocaleString()}, which includes a $${taxRate}\\%$ sales tax. Which of the following is closest to the maximum possible price per chair, before sales tax, the business owner could pay based on this budget?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: shuffledOptions.find(o => o.isCorrect).text,
      explanation: `Choice ${correctLetter} is correct. Let $x$ be the price per chair before tax. The total cost for $${employees}$ chairs with $${taxRate}\\%$ tax is $${employees}x(${taxMultiplier.toFixed(2)}) = ${(employees * taxMultiplier).toFixed(2)}x$. Setting this $\\leq \\$${budget.toLocaleString()}$: $x \\leq \\frac{${budget}}{${(employees * taxMultiplier).toFixed(2)}} \\approx ${maxPrice.toFixed(2)}$.`
    };
  }
};