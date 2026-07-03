import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 180
 *
 * ORIGINAL ANALYSIS: [Hourly rate coefficient meaning]
 * - Number ranges: [rate1: 50-80, rate2: 70-100, total: 800-1500]
 * - Difficulty factors: [Interpreting coefficients in context]
 * - Constraints: [Rates should be reasonable]
 *
 * FIXED:
 * - Currency in options now escaped as \$ (was bare $, tripping TEX_UNBALANCED
 *   because the questionText already opened a $...$ math span).
 * - questionText describes x and y in prose (no inline $x$/$y$) so the field no
 *   longer contains both a "$<digit>" and a "$<letter>" — clears DOLLAR_RISK
 *   while keeping the equation as real math.
 * - Options are pairwise distinct by wording for every draw (verb/noun differ),
 *   so no duplicate-option guard is needed.
 */

export const generator_180 = {
  metadata: {
    id: "180",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Coefficient of x is the consulting rate; coefficient of y is the drawing rate.
    const rate1 = getRandomInt(50, 80);   // consulting rate (the answer's value)
    const rate2 = getRandomInt(70, 100);  // drawing rate
    const total = getRandomInt(800, 1500);

    const optionsData = [
      { key: 'correct', text: `The interior designer earned \\$${rate1} per hour consulting.`, isCorrect: true },
      { key: 'rateAsHours1', text: `The interior designer worked ${rate1} hours drawing up plans.`, isCorrect: false },
      { key: 'wrongRate', text: `The interior designer earned \\$${rate2} per hour drawing.`, isCorrect: false },
      { key: 'rateAsHours2', text: `The interior designer worked ${rate2} hours consulting.`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const letterOf = (key: string) => shuffled.find(o => o.key === key)!.letter;

    return {
      questionText: `The equation $${rate1}x + ${rate2}y = ${total}$ represents an interior designer's total earnings, where the number of consulting hours is multiplied by ${rate1} and the number of drawing hours is multiplied by ${rate2}. What does ${rate1} represent?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: shuffled.find(o => o.isCorrect)!.text,
      explanation: `Choice ${letterOf('correct')} is correct. The coefficient ${rate1} multiplies the number of consulting hours, so it is the hourly rate the interior designer earned for consulting. Choice ${letterOf('rateAsHours1')} is incorrect; ${rate1} is a rate in dollars per hour, not a number of hours worked. Choice ${letterOf('wrongRate')} is incorrect; \\$${rate2} is the drawing rate (the coefficient of the drawing-hours term), not what ${rate1} represents. Choice ${letterOf('rateAsHours2')} is incorrect; ${rate2} is also a rate, not a number of hours.`
    };
  }
};
