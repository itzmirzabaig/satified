import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 256
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [monthly: 300-500, fixed: 800-1200, months: 24-48]
 * - Difficulty factors: [Function evaluation with large numbers]
 * - Distractor patterns: [subtracted fixed, forgot fixed, swapped parameters]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_256 = {
  metadata: {
    id: "256",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const monthlyPayment = getRandomInt(300, 500);

    const fixedCost = getRandomInt(800, 1200);

    const numMonths = getRandomInt(24, 48);

    const totalCost = (monthlyPayment * numMonths) + fixedCost;

    const distractor1 = (monthlyPayment * numMonths) - fixedCost;

    const distractor2 = monthlyPayment * numMonths;

    const distractor3 = (fixedCost * numMonths) + monthlyPayment;

    // Thousands commas: the choices used to read 13253 and 45623.
    const fmt = (n: number) => n.toLocaleString('en-US');

    const optionsData = [
      { text: fmt(distractor1), isCorrect: false, reason: `it results from subtracting ${fmt(fixedCost)} from ${fmt(distractor2)} instead of adding it` },
      { text: fmt(distractor2), isCorrect: false, reason: `it is the cost of the ${numMonths} monthly payments alone, $${numMonths}(${monthlyPayment})$; it leaves out the ${fmt(fixedCost)} dollars added in the function` },
      { text: fmt(totalCost), isCorrect: true, reason: '' },
      { text: fmt(distractor3), isCorrect: false, reason: `it results from substituting ${monthlyPayment} in the wrong place, which gives $${numMonths}(${fmt(fixedCost)}) + ${monthlyPayment}$ instead of $${numMonths}(${monthlyPayment}) + ${fmt(fixedCost)}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The total cost $f(x)$, in dollars, to lease a car for ${numMonths} months from a particular car dealership is given by $f(x) = ${numMonths}x + ${fmt(fixedCost)}$, where $x$ is the monthly payment, in dollars. What is the total cost to lease a car when the monthly payment is \\$${monthlyPayment}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: fmt(totalCost),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${monthlyPayment} for $x$ in the given function yields $f(${monthlyPayment}) = ${numMonths}(${monthlyPayment}) + ${fmt(fixedCost)}$, or $f(${monthlyPayment}) = ${fmt(distractor2)} + ${fmt(fixedCost)} = ${fmt(totalCost)}$. Therefore, the total cost to lease the car is \\$${fmt(totalCost)}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
