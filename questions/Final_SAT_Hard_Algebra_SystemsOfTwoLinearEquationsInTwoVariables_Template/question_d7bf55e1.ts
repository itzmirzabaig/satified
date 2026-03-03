import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d7bf55e1
 * Skill: Systems Of Two Linear Equations In Two Variables
 * Difficulty: Hard
 * 
 * Description: Word problem finding total cost of a specific ticket type.
 * Fixes:
 * - Removed SVG and answer-revealing table.
 * - Used reverse engineering to ensure integer solutions.
 * - Escaped currency symbols.
 */
export const generator_d7bf55e1 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. REVERSE ENGINEER VALUES
    // ----------------------------------------------------------------------
    // Pick the quantities first (the hidden variables)
    const adultTickets = getRandomInt(10, 20);
    const childTickets = getRandomInt(10, 20);
    const totalTickets = adultTickets + childTickets;

    // Pick the prices
    const adultPrice = getRandomInt(11, 15);
    const childPrice = getRandomInt(6, 9); // Ensure distinct prices

    // Calculate the totals provided in the question
    const totalRevenue = (adultPrice * adultTickets) + (childPrice * childTickets);

    // The question asks for: Total spent on ADULT tickets
    const answer = adultPrice * adultTickets;

    // ----------------------------------------------------------------------
    // 2. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `A movie theater sells two types of tickets: adult tickets for \\$${adultPrice} and child tickets for \\$${childPrice}. If the theater sold ${totalTickets} tickets in total for a total revenue of \\$${totalRevenue}, how much, in dollars, was spent on adult tickets? (Disregard the \\$ sign when entering your answer.)`,
      figureCode: null, // No graph needed for this word problem
      options: null, // Fill-in-the-blank
      correctAnswer: answer.toString(),
      explanation: `
        The correct answer is ${answer}.
        <br/><br/>
        1. <b>Define Variables:</b>
        Let $a$ be the number of adult tickets.
        Let $c$ be the number of child tickets.
        <br/>
        2. <b>Set up the System:</b>
        Quantity equation: $a + c = ${totalTickets}$
        Revenue equation: $${adultPrice}a + ${childPrice}c = ${totalRevenue}$
        <br/>
        3. <b>Solve for $a$:</b>
        From the first equation, $c = ${totalTickets} - a$.
        Substitute into the second equation:
        $$ ${adultPrice}a + ${childPrice}(${totalTickets} - a) = ${totalRevenue} $$
        $$ ${adultPrice}a + ${childPrice * totalTickets} - ${childPrice}a = ${totalRevenue} $$
        Combine $a$ terms ($${adultPrice} - ${childPrice} = ${adultPrice - childPrice}$):
        $$ ${adultPrice - childPrice}a = ${totalRevenue} - ${childPrice * totalTickets} $$
        $$ ${adultPrice - childPrice}a = ${totalRevenue - (childPrice * totalTickets)} $$
        $$ a = ${adultTickets} $$
        <br/>
        4. <b>Calculate Total Spent on Adult Tickets:</b>
        The question asks for the total amount spent on adult tickets, which is $${adultPrice} \\times a$.
        $$ ${adultPrice} \\times ${adultTickets} = ${answer} $$
      `
    };
  }
};