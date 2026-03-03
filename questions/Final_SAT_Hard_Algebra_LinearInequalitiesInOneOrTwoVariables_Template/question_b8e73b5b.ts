import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b8e73b5b
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Calculates the minimum hours required to meet a savings goal given a piecewise income rate.
 * Fixes:
 * - Escaped currency symbols (\$) to prevent them from being parsed as LaTeX math delimiters.
 * - Engineered numbers to ensure integer solutions.
 */
export const generator_b8e73b5b = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. REVERSE-ENGINEER FOR CLEAN INTEGERS
    // ----------------------------------------------------------------------
    // We want the answer (additional hours) to be an integer.
    // Let x = additional hours.
    // Total Earnings = (FirstHours * FirstRate) + (x * SecondRate)
    // Savings = Total Earnings * (SavingsPercent / 100)
    // We set the Target Savings exactly to this value so the math checks out perfectly.

    const savingsPercent = getRandomElement([80, 90]); // 80% or 90% for clean decimals
    const savingsDecimal = savingsPercent / 100;

    const firstHours = getRandomElement([5, 8, 10, 12]);
    const firstRate = getRandomInt(8, 12);
    const firstEarnings = firstHours * firstRate;

    const secondRate = firstRate + getRandomInt(2, 5); // Must be higher than first rate
    
    // Choose a target answer (additional hours)
    const targetAdditionalHours = getRandomInt(15, 25);
    const secondEarnings = targetAdditionalHours * secondRate;

    const totalEarnings = firstEarnings + secondEarnings;

    // Calculate the target savings goal
    // To ensure this is an integer (for the problem text), we might need to adjust parameters
    // But SAT problems usually have integer dollar amounts.
    // If 90%, totalEarnings must be multiple of 10. If 80%, multiple of 5.
    // We will just round the target savings down slightly to ensure the inequality holds
    // for the target integer, but not for target-1.
    
    // Actually, simpler: just calculate exact savings. If it's a decimal, standard formatting applies.
    // Let's force integer savings by rounding, then checking the math.
    let exactSavings = totalEarnings * savingsDecimal;
    
    // If we floor the savings goal, does the answer change?
    // Example: exact = 250.5. If we set goal = 250, x is still the answer.
    // If we set goal = 251, x is insufficient. 
    // So we set goal = floor(exactSavings).
    const targetSavings = Math.floor(exactSavings);

    // Recalculate minimum hours needed for this integer target to verify
    // x >= (Target/Rate - FirstEarnings) / SecondRate
    // We need to ensure the calculated x rounds UP to our targetAdditionalHours.
    const requiredTotalEarnings = targetSavings / savingsDecimal;
    const requiredSecondEarnings = requiredTotalEarnings - firstEarnings;
    const calculatedHours = requiredSecondEarnings / secondRate;
    const finalAnswer = Math.ceil(calculatedHours);

    // ----------------------------------------------------------------------
    // 2. DISTRACTORS
    // ----------------------------------------------------------------------
    // D1: Too high (adds random buffer)
    const distractorA = finalAnswer + getRandomInt(5, 10);
    // D2: Too low (subtracts buffer)
    const distractorB = Math.max(1, finalAnswer - getRandomInt(5, 10));
    // D3: Calculation error (e.g., forgets to subtract first earnings)
    // (Target / Savings / SecondRate) approx
    const distractorC = Math.round((targetSavings / savingsDecimal) / secondRate);

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

    const correctLetter = shuffledOptions.find(o => o.isCorrect)?.letter;

    // ----------------------------------------------------------------------
    // 3. FORMATTING & RETURN
    // ----------------------------------------------------------------------
    return {
      // Use \$ for currency to distinguish from LaTeX math delimiters ($)
      questionText: `Ken is working this summer as part of a crew on a farm. He earned \\$${firstRate} per hour for the first ${firstHours} hours he worked this week. Because of his performance, his crew leader raised his salary to \\$${secondRate} per hour for the rest of the week. Ken saves ${savingsPercent}\\% of his earnings from each week. What is the least number of hours he must work the rest of the week to save at least \\$${targetSavings} for the week?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: finalAnswer.toString(),
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        1. <b>Calculate earnings from the first part of the week:</b>
        $$ \\text{First Earnings} = ${firstHours} \\times ${firstRate} = ${firstEarnings} $$
        <br/>
        2. <b>Set up the inequality for the total savings:</b>
        Let $x$ be the number of additional hours Ken works.
        Total earnings = $${firstEarnings} + ${secondRate}x$.
        He saves ${savingsPercent}\\% (or ${savingsDecimal}) of his total earnings.
        $$ ${savingsDecimal}(${firstEarnings} + ${secondRate}x) \\ge ${targetSavings} $$
        <br/>
        3. <b>Solve for $x$:</b>
        Divide by ${savingsDecimal}:
        $$ ${firstEarnings} + ${secondRate}x \\ge \\frac{${targetSavings}}{${savingsDecimal}} $$
        $$ ${firstEarnings} + ${secondRate}x \\ge ${requiredTotalEarnings.toFixed(2)} $$
        <br/>
        Subtract ${firstEarnings} (first earnings):
        $$ ${secondRate}x \\ge ${(requiredTotalEarnings - firstEarnings).toFixed(2)} $$
        <br/>
        Divide by ${secondRate} (second rate):
        $$ x \\ge \\frac{${(requiredTotalEarnings - firstEarnings).toFixed(2)}}{${secondRate}} $$
        $$ x \\ge ${calculatedHours.toFixed(2)} $$
        <br/>
        Since he must work a whole number of hours (or simply the least amount exceeding this), we round up to the nearest whole number (if applicable) or identifying the integer threshold. The least number of hours is ${finalAnswer}.
      `
    };
  }
};