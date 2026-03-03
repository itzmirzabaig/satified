import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ee2f611f
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Optimization problem determining minimum trips for a pass to be cost-effective.
 * Fixes:
 * - Escaped currency symbols (\$) to prevent LaTeX parsing errors.
 * - Maintained fill-in-the-blank structure.
 */
export const generator_ee2f611f = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE VALUES
    // ----------------------------------------------------------------------
    const monthlyPass = getRandomInt(80, 110);
    
    // Generate ticket prices (e.g., 1.50, 2.50, 3.50)
    const basePrice = getRandomElement([1.50, 1.75, 2.00, 2.25]);
    const priceStep = getRandomElement([0.50, 0.75, 1.00]);
    
    const p1 = basePrice;
    const p2 = basePrice + priceStep;
    const p3 = basePrice + (priceStep * 2);
    
    // Max price is the one that makes the pass "worth it" with the fewest trips
    const maxTicketPrice = p3;

    // ----------------------------------------------------------------------
    // 2. MATHEMATICAL LOGIC
    // ----------------------------------------------------------------------
    // We want the Monthly Pass to cost STRICTLY LESS than individual tickets.
    // MonthlyPass < MaxTicketPrice * n
    // n > MonthlyPass / MaxTicketPrice
    
    const exactThreshold = monthlyPass / maxTicketPrice;
    
    // The minimum integer n must be strictly greater than the threshold.
    // If threshold is 20.0, n must be 21.
    // If threshold is 20.1, n must be 21.
    const minTrips = Math.floor(exactThreshold) + 1;

    // ----------------------------------------------------------------------
    // 3. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `A local transit company sells a monthly pass for \\$${monthlyPass} that allows an unlimited number of trips of any length. Tickets for individual trips cost \\$${p1.toFixed(2)}, \\$${p2.toFixed(2)}, or \\$${p3.toFixed(2)}, depending on the length of the trip. What is the minimum number of trips per month for which a monthly pass could cost less than purchasing individual tickets for trips?`,
      figureCode: null,
      options: null, // Fill-in-the-blank question
      correctAnswer: minTrips.toString(),
      explanation: `
        The correct answer is ${minTrips}.
        <br/><br/>
        To find the minimum number of trips where the pass <i>could</i> be cheaper, we assume the most expensive scenario for individual tickets. If the traveler takes the most expensive trips, they will reach the cost of the pass with the fewest number of rides.
        <br/><br/>
        1. <b>Identify the maximum ticket price:</b> \\$${maxTicketPrice.toFixed(2)}.
        <br/>
        2. <b>Set up the inequality:</b>
        We want the cost of the pass to be less than the cost of $n$ individual tickets:
        $$ ${monthlyPass} < ${maxTicketPrice.toFixed(2)}n $$
        <br/>
        3. <b>Solve for $n$:</b>
        Divide by ${maxTicketPrice.toFixed(2)}:
        $$ n > \\frac{${monthlyPass}}{${maxTicketPrice.toFixed(2)}} $$
        $$ n > ${exactThreshold.toFixed(2)} $$
        <br/>
        Since the number of trips must be a whole number, we round up to the next integer.
        $$ n = ${minTrips} $$
      `
    };
  }
};