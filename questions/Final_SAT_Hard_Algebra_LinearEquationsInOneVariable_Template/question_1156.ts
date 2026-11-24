import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1156
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [~20,000-30,000 initial bushels, rate in hundreds, single-digit hours]
 * - Difficulty factors: [Rate calculation, total vs additional time distinction]
 * - Constraints: [Rate constant, all quantities positive, integer hours]
 * - Question type: [Word Problem -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH: A bin starts at `initialAmount` bushels; an auger removes `rate`
 * bushels per hour. After `hoursPassed` hours, `remainingAfter` remain. The
 * total time when `targetRemaining` remain is
 *   totalHours = (initialAmount - targetRemaining) / rate.
 * initialAmount is a multiple of rate, so every choice is a whole number.
 *
 * Previously the wrong choices were a halved value and answer plus or minus an
 * offset with the reason "a miscount". Each one is now a real slip, and commas
 * inside math use {,} so they do not add a space.
 */

export const generator_1156 = {
  metadata: {
    id: "1156",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const fmt = (n: number): string => n.toLocaleString('en-US').replace(/,/g, '{,}');

    // STEP 1: Draw a scenario with whole hours and four different choices.
    let initialAmount = 0, rate = 0, hoursPassed = 0, totalHours = 0, hoursToEmpty = 0;
    let additionalHours = 0, targetOverRate = 0;
    do {
      initialAmount = getRandomInt(20, 30) * 1000;
      rate = getRandomInt(5, 15) * 100;
      hoursPassed = getRandomInt(3, 6);
      totalHours = getRandomInt(hoursPassed + 2, hoursPassed + 10);
      hoursToEmpty = initialAmount / rate;
      additionalHours = totalHours - hoursPassed;
      targetOverRate = hoursToEmpty - totalHours;
    } while (
      !Number.isInteger(hoursToEmpty) ||
      targetOverRate <= 0 ||
      new Set([totalHours, additionalHours, targetOverRate, hoursToEmpty]).size < 4
    );

    const remainingAfter = initialAmount - rate * hoursPassed;
    const targetRemaining = initialAmount - rate * totalHours;
    const removedFirst = rate * hoursPassed;
    const totalRemoved = rate * totalHours;

    // STEP 2: Each wrong choice is a specific slip.
    const optionsData = [
      { text: totalHours.toString(), isCorrect: true, reason: '' },
      {
        text: additionalHours.toString(),
        isCorrect: false,
        reason: `$${additionalHours}$ is the number of additional hours needed after the first $${hoursPassed}$ hours, not the total number of hours`
      },
      {
        text: targetOverRate.toString(),
        isCorrect: false,
        reason: `$${targetOverRate}$ comes from dividing the $${fmt(targetRemaining)}$ bushels that remain by the rate, which is the time it would take to remove that remaining corn`
      },
      {
        text: hoursToEmpty.toString(),
        isCorrect: false,
        reason: `$${hoursToEmpty}$ comes from dividing the original $${fmt(initialAmount)}$ bushels by the rate, which is the time it would take to empty the bin completely`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. During the first $${hoursPassed}$ hours, the auger removed $${fmt(initialAmount)} - ${fmt(remainingAfter)} = ${fmt(removedFirst)}$ bushels, so its rate is $\\frac{${fmt(removedFirst)}}{${hoursPassed}} = ${fmt(rate)}$ bushels per hour. For $${fmt(targetRemaining)}$ bushels to remain, the auger must remove a total of $${fmt(initialAmount)} - ${fmt(targetRemaining)} = ${fmt(totalRemoved)}$ bushels. At $${fmt(rate)}$ bushels per hour, this takes $\\frac{${fmt(totalRemoved)}}{${fmt(rate)}} = ${totalHours}$ hours in total. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A worker used a tool called an auger to remove corn from a storage bin at a constant rate. The bin contained $${fmt(initialAmount)}$ bushels of corn when the worker began using the auger. After $${hoursPassed}$ hours of using the auger, $${fmt(remainingAfter)}$ bushels of corn remained in the bin. If the auger continues to remove corn at this rate, what is the total number of hours the worker will have been using the auger when $${fmt(targetRemaining)}$ bushels of corn remain in the bin?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: totalHours.toString(),
      explanation: explanation
    };
  }
};
