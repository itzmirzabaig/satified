import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 228
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [bonus: 800-1200, hourlyRate: 15-25, hours: 30-40]
 * - Difficulty factors: [Solving linear equation from context]
 * - Distractor patterns: [half hours, bonus/rate, totalPay/rate]
 * - Constraints: [Ensure clean result]
 * - Question type: [Solve for x→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_228 = {
  metadata: {
    id: "228",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The bonus is a multiple of the hourly rate, so dividing the bonus or the
    // total pay by the rate gives a whole number (the old choices were floors
    // of inexact quotients, and one was "approximately half" the answer).
    // Redraw until the four choices differ.
    let hourlyRate = 15, hours = 30, k = 60;
    do {
      hourlyRate = getRandomInt(15, 25);
      hours = getRandomInt(30, 40);
      k = getRandomInt(Math.ceil(800 / hourlyRate), Math.floor(1200 / hourlyRate));
    } while (new Set([hours, k, k + hours, hourlyRate * hours]).size < 4);
    const bonus = hourlyRate * k;
    const totalPay = bonus + hourlyRate * hours;
    const fmt = (n: number) => n.toLocaleString('en-US');

    const optionsData = [
      { text: (hourlyRate * hours).toString(), isCorrect: false, reason: `is the amount, in dollars, the employee earned for the hours worked, $${fmt(totalPay)} - ${fmt(bonus)}$; it must still be divided by ${hourlyRate}` },
      { text: hours.toString(), isCorrect: true, reason: '' },
      { text: k.toString(), isCorrect: false, reason: `results from dividing the bonus, \\$${fmt(bonus)}, by ${hourlyRate}` },
      { text: (k + hours).toString(), isCorrect: false, reason: `results from dividing the total pay, \\$${fmt(totalPay)}, by ${hourlyRate} without first subtracting the bonus` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the equation $T = ${fmt(bonus)} + ${hourlyRate}h$, $T$ represents an employee's total take-home pay, in dollars, for her first week of work, where $h$ represents the number of hours she worked that week and \\$${fmt(bonus)} represents a sign-on bonus. If the employee's total take-home pay was \\$${fmt(totalPay)}, for how many hours was the employee paid for her first week of work?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: hours.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${fmt(totalPay)} for $T$ in the given equation yields $${fmt(totalPay)} = ${fmt(bonus)} + ${hourlyRate}h$. Subtracting ${fmt(bonus)} from both sides yields $${fmt(hourlyRate * hours)} = ${hourlyRate}h$, and dividing both sides by ${hourlyRate} yields $h = ${hours}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
