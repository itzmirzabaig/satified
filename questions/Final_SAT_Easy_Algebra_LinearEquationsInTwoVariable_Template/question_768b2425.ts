import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 768b2425
 *
 * ORIGINAL ANALYSIS: [Hourly rate coefficient meaning]
 * - Number ranges: [rate1: 50-80, rate2: 70-100, total: 800-1500]
 * - Difficulty factors: [Interpreting coefficients in context]
 * - Constraints: [Rates should be reasonable]
 */

export const generator_768b2425 = {
  metadata: {
    // id: "768b2425",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize rates
    const rate1 = getRandomInt(50, 80);
    const rate2 = getRandomInt(70, 100);
    // Randomize total earnings
    const total = getRandomInt(800, 1500);

    const optionsData = [
      { text: `The interior designer earned $${rate1} per hour consulting last week.`, isCorrect: true },
      { text: `The interior designer worked ${rate1} hours drawing up plans.`, isCorrect: false, reason: "confuses rate with hours" },
      { text: `The interior designer earned $${rate2} per hour drawing.`, isCorrect: false, reason: "identifies wrong rate" },
      { text: `The interior designer worked ${rate2} hours consulting.`, isCorrect: false, reason: "confuses rate with hours" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `$${rate1}x + ${rate2}y = ${total}$ represents earnings from $x$ consulting hours and $y$ drawing hours. What does ${rate1} represent?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: shuffled.find(o => o.isCorrect)!.text,
      explanation: `Choice ${correctLetter} is correct. In the equation $${rate1}x + ${rate2}y = ${total}$, the coefficient ${rate1} represents the hourly rate for consulting (the $x$ variable).`
    };
  }
};

/**
 * Question ID: 8b2a2a63
 *
 * ORIGINAL ANALYSIS: [Y-intercept value extraction]
 */
