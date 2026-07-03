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
    let bonus = getRandomInt(800, 1200);
    let hourlyRate = getRandomInt(15, 25);
    let hours = getRandomInt(30, 40);

    // The three distractors reuse these numbers, so certain draws can make a
    // distractor equal the correct answer (hours) or equal each other — e.g.
    // floor(bonus/hourlyRate) lands in [32, 80] and can coincide with hours in
    // [30, 40]. Re-draw (bounded) until all four option values are distinct.
    const optionValues = () => [
      Math.floor(hours / 2),
      hours,
      Math.floor(bonus / hourlyRate),
      Math.floor((bonus + hourlyRate * hours) / hourlyRate),
    ];
    let tries = 0;
    while (new Set(optionValues()).size !== 4 && tries++ < 50) {
      bonus = getRandomInt(800, 1200);
      hourlyRate = getRandomInt(15, 25);
      hours = getRandomInt(30, 40);
    }

    const totalPay = bonus + hourlyRate * hours;

    const optionsData = [
      { text: Math.floor(hours / 2).toString(), isCorrect: false, reason: "is approximately half the correct number of hours" },
      { text: hours.toString(), isCorrect: true },
      { text: Math.floor(bonus / hourlyRate).toString(), isCorrect: false, reason: "divides the bonus by the hourly rate" },
      { text: Math.floor(totalPay / hourlyRate).toString(), isCorrect: false, reason: "divides total pay by hourly rate without subtracting the bonus" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the equation $T = ${bonus} + ${hourlyRate}h$, $T$ represents an employee's total take-home pay, in dollars, for her first week of work, where $h$ represents the number of hours she worked that week and \\$${bonus} represents a sign-on bonus. If the employee's total take-home pay was \\$${totalPay}, for how many hours was the employee paid for her first week of work?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: hours.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting the total pay for $T$ gives the equation $T = ${bonus} + ${hourlyRate}h$ with $T = ${totalPay}$. Subtract the sign-on bonus and divide by the hourly rate to solve for $h$: $h = \\frac{${totalPay} - ${bonus}}{${hourlyRate}} = ${hours}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
