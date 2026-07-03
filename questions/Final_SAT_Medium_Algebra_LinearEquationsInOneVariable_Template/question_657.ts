import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 657
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [regular hours: 8, overtime multiplier: 1.5, total hours: 10, earnings: 137.50]
 * - Difficulty factors: [Piecewise pay calculation, setting up equation]
 * - Distractor patterns: [A, C, D don't satisfy the earnings equation]
 * - Constraints: [Total = 8p + 1.5p*(total-8)]
 * - Question type: [Multiple Choice Text]
 */

export const generator_657 = {
  metadata: {
    id: "657",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // An employee earns p dollars/hour for the first `regularHours` hours and
    // 1.5*p for each overtime hour. Total earnings = (regularHours + 1.5*OT)*p.
    // Pick p (integer) first so the regular hourly wage is a clean value; the
    // earnings total is then an exact 2-decimal number.
    const regularHours = 8;
    const overtimeMult = 1.5;
    const totalHours = getRandomInt(10, 14);
    const overtimeHours = totalHours - regularHours;                 // 2..6

    // Coefficient on p. Half-integer when overtimeHours is odd (e.g. 12.5),
    // integer when even (e.g. 11, 14). Either way the product with an integer
    // p is an exact multiple of 0.5, so toFixed(2) has no float artifact.
    const totalCoeff = regularHours + overtimeMult * overtimeHours;
    const hourlyRate = getRandomInt(10, 18);                         // integer p
    const earnings = totalCoeff * hourlyRate;

    const earningsFormatted = earnings.toFixed(2);
    const correctRate = hourlyRate.toFixed(2);

    // 1.5*overtimeHours as a display value (clean: multiple of 0.5).
    const overtimeCoeff = overtimeMult * overtimeHours;

    // Near-miss distractors (each fails the earnings equation). Offsets keep
    // them clean 2-decimal values, all distinct from p and from one another.
    const distractorA = (hourlyRate - 0.75).toFixed(2);
    const distractorC = (hourlyRate + 0.75).toFixed(2);
    const distractorD = (hourlyRate + 1.25).toFixed(2);

    const correctText = `$${correctRate}$`;
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${correctRate}$`, isCorrect: true },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${distractorD}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    return {
      questionText: `An employee's regular wage is $p$ dollars per hour for the first ${regularHours} hours of work in a day, plus ${overtimeMult} times the regular hourly wage for any work in excess of ${regularHours} hours that day. On a given day, the employee worked for ${totalHours} hours, and the total earnings for that day were \\$${earningsFormatted}. What is the employee's regular hourly wage, in dollars per hour?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The employee worked ${regularHours} regular hours and ${overtimeHours} overtime hours. The regular-hours earnings are $${regularHours}p$ dollars, and the overtime rate is $${overtimeMult}p$ dollars per hour, so the overtime earnings are $${overtimeHours} \\times ${overtimeMult}p = ${overtimeCoeff}p$ dollars. Setting the total equal to the day's earnings gives $${regularHours}p + ${overtimeCoeff}p = ${totalCoeff}p = ${earningsFormatted}$. Dividing both sides by $${totalCoeff}$ gives a regular hourly wage of \\$${correctRate} per hour.`
    };
  }
};
