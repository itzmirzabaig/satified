import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1229
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 *
 * Description: Least number of additional hours needed to reach a savings goal given a
 *   two-rate weekly wage. Earn firstRate/hr for firstHours, then secondRate/hr for the
 *   rest; save savingsPercent% of total earnings.
 *   Inequality: savingsDecimal*(firstEarnings + secondRate*x) >= targetSavings
 *   -> x >= (targetSavings/savingsDecimal - firstEarnings)/secondRate ; answer = ceil.
 * Fixes (repair pass):
 *   - Distractors "too high" (finalAnswer + 5..10) and "forgot to subtract first earnings"
 *     collided frequently (43/300 draws -> DUP_OPTIONS, smoke draws 2, 17). Rebuilt the
 *     distractor set as distinct integers with a bounded uniqueness retry.
 *   - Replaced the personal name ("Ken", "he/his") with a generic role ("a student",
 *     "they/their") per house style.
 *   - Rewrote the muddled closing line of the explanation into a clean round-up step and
 *     added the reason for each distractor.
 *   - Currency stays escaped as \\$ (no bare $ that MathJax could pair).
 */
export const generator_1229 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. RANDOM VALUES (answer-first construction for a clean integer target)
    // ----------------------------------------------------------------------
    const savingsPercent = getRandomElement([80, 90]); // clean decimals: 0.8 / 0.9
    const savingsDecimal = savingsPercent / 100;

    const firstHours = getRandomElement([5, 8, 10, 12]);
    const firstRate = getRandomInt(8, 12);
    const firstEarnings = firstHours * firstRate;

    const secondRate = firstRate + getRandomInt(2, 5); // higher than the first rate

    // Pick the intended answer, build a total, then set an integer savings goal so that
    // this answer is exactly the LEAST integer number of hours that reaches the goal.
    const targetAdditionalHours = getRandomInt(15, 25);
    const totalEarnings = firstEarnings + targetAdditionalHours * secondRate;
    const targetSavings = Math.floor(totalEarnings * savingsDecimal);

    // Recompute the least hours from the integer goal (verified against the inequality below).
    const requiredTotalEarnings = targetSavings / savingsDecimal;
    const requiredSecondEarnings = requiredTotalEarnings - firstEarnings;
    const calculatedHours = requiredSecondEarnings / secondRate;
    const finalAnswer = Math.ceil(calculatedHours);

    // ----------------------------------------------------------------------
    // 2. DISTRACTORS (distinct integers, each a real student error)
    // ----------------------------------------------------------------------
    // C: forgot to subtract the first-part earnings before dividing by the second rate.
    //    firstEarnings >= 40 and secondRate <= 17, so this is always at least 2 above
    //    the correct answer -> never equal to finalAnswer.
    const distractorC = Math.ceil(requiredTotalEarnings / secondRate);

    // A (too high) and B (too low) via offsets, guarded so all four options are distinct.
    let distractorA = finalAnswer + getRandomInt(5, 10);
    let distractorB = Math.max(1, finalAnswer - getRandomInt(5, 10));
    let tries = 0;
    while (
      tries < 50 &&
      new Set([finalAnswer, distractorA, distractorB, distractorC]).size !== 4
    ) {
      distractorA = finalAnswer + getRandomInt(5, 12);
      distractorB = Math.max(1, finalAnswer - getRandomInt(4, 10));
      tries++;
    }

    const optionsData = [
      { text: finalAnswer.toString(), isCorrect: true },
      { text: distractorA.toString(), isCorrect: false },
      { text: distractorB.toString(), isCorrect: false },
      { text: distractorC.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // ----------------------------------------------------------------------
    // 3. FORMATTING & RETURN  (currency escaped as \$)
    // ----------------------------------------------------------------------
    return {
      questionText: `A student is working this summer as part of a crew on a farm. They earned \\$${firstRate} per hour for the first ${firstHours} hours they worked this week. Because of their performance, their crew leader raised their pay to \\$${secondRate} per hour for the rest of the week. The student saves ${savingsPercent}\\% of their earnings from each week. What is the least number of hours they must work the rest of the week to save at least \\$${targetSavings} for the week?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: finalAnswer.toString(),
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        1. <b>Earnings from the first part of the week:</b>
        $$ ${firstHours} \\times ${firstRate} = ${firstEarnings} $$
        <br/>
        2. <b>Set up the savings inequality.</b> Let $x$ be the number of additional hours worked at the higher rate. The total earnings are $${firstEarnings} + ${secondRate}x$, and the student saves ${savingsPercent}\\% (that is, ${savingsDecimal}) of them:
        $$ ${savingsDecimal}(${firstEarnings} + ${secondRate}x) \\ge ${targetSavings} $$
        <br/>
        3. <b>Solve for $x$.</b> Divide both sides by ${savingsDecimal}:
        $$ ${firstEarnings} + ${secondRate}x \\ge ${requiredTotalEarnings.toFixed(2)} $$
        <br/>
        Subtract ${firstEarnings}:
        $$ ${secondRate}x \\ge ${requiredSecondEarnings.toFixed(2)} $$
        <br/>
        Divide by ${secondRate}:
        $$ x \\ge ${calculatedHours.toFixed(2)} $$
        <br/>
        4. <b>Round up.</b> Because $x$ must be a whole number of hours and it must be at least ${calculatedHours.toFixed(2)}, the least value is ${finalAnswer}.
        <br/><br/>
        The value ${distractorC} comes from dividing the required earnings by the second rate without first subtracting the ${firstEarnings} earned at the lower rate. The values ${distractorA} and ${distractorB} are too high and too low, respectively, to be the least number of hours that reaches the goal.
      `
    };
  }
};
