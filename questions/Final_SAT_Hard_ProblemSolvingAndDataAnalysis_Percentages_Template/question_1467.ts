import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1467
 * 
 * ANALYSIS:
 * - Context: Percent increase over years.
 * - Logic: 
 *   Year 2 increase = x%.
 *   Year 1 increase = 2x%.
 *   We work backwards to ensure integers.
 */
export const generator_1467 = {
  metadata: {
    id: "1467",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // Let r be the percentage increase from 2013 to 2014 (e.g., 5%, 10%, 20%)
    // The increase from 2012 to 2013 is double that: 2r.
    
    // Valid rates that keep numbers clean-ish
    // If r=5% (0.05), 2r=10% (0.10).
    // If r=10% (0.10), 2r=20% (0.20).
    const rates = [5, 10, 20];
    const r = rates[getRandomInt(0, rates.length - 1)];
    const r2 = 2 * r;
    
    // Generate Base Year (2012)
    // To ensure 2013 is an integer, Y2012 must be divisible by something that works with 2r.
    // To ensure 2014 is an integer, Y2013 must be divisible...
    // Actually, we can just start with a round number for 2012.
    const y2012 = getRandomInt(40, 60) * 100; // e.g., 5000
    
    const y2013 = Math.round(y2012 * (1 + r2 / 100));
    const y2014 = Math.round(y2013 * (1 + r / 100));
    
    // 2. HTML Table Generation
    const tableCode = `
      <div style="width: 100%; max-width: 300px; margin: 0 auto; font-family: sans-serif; border: 1px solid currentColor; border-radius: 4px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; text-align: center;">
          <thead style="background-color: rgba(0,0,0,0.05);">
            <tr>
              <th style="padding: 10px; border-bottom: 1px solid currentColor; border-right: 1px solid currentColor;">Year</th>
              <th style="padding: 10px; border-bottom: 1px solid currentColor;">Subscriptions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid currentColor; border-right: 1px solid currentColor;">2012</td>
              <td style="padding: 8px; border-bottom: 1px solid currentColor;">?</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid currentColor; border-right: 1px solid currentColor;">2013</td>
              <td style="padding: 8px; border-bottom: 1px solid currentColor;">${y2013}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-right: 1px solid currentColor;">2014</td>
              <td style="padding: 8px;">${y2014}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // 3. Options
    const optionsData = [
      { text: y2012.toString(), isCorrect: true },
      { text: Math.round(y2013 / (1 + r/100)).toString(), isCorrect: false }, // Using wrong rate (r instead of 2r)
      { text: Math.round(y2013 - (y2014 - y2013)).toString(), isCorrect: false }, // Linear subtraction error
      { text: Math.round(y2013 / (1 + (r2+5)/100)).toString(), isCorrect: false } // Random wrong rate
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The table above shows the number of subscriptions to a service for the years 2012 through 2014. The percent increase in the number of subscriptions from 2012 to 2013 was double the percent increase from 2013 to 2014. How many subscriptions were there in 2012?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Find the percent increase from 2013 to 2014:**
    Increase = $${y2014} - ${y2013} = ${y2014 - y2013}$.
    Percent Increase = $\\frac{${y2014 - y2013}}{${y2013}} = ${r / 100}$ or ${r}\\%$.

2.  **Determine percent increase from 2012 to 2013:**
    The problem states this increase was double the later one.
    $2 \\times ${r}\\% = ${r2}\\%$.

3.  **Calculate 2012 subscriptions:**
    Let $x$ be the number of subscriptions in 2012.
    $x(1 + ${r2 / 100}) = ${y2013}$
    $x(${1 + r2 / 100}) = ${y2013}$
    $x = \\frac{${y2013}}{${1 + r2 / 100}} = ${y2012}$.`
    };
  }
};
