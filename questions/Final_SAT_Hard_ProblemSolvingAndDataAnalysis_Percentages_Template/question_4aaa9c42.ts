import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4aaa9c42
 * 
 * ANALYSIS:
 * - Logic Check: Validated.
 *   a = k1(b+c), b = k2(c).
 *   c = b/k2.
 *   a = k1(b + b/k2) = k1*b(1 + 1/k2) = b * k1 * (k2+1)/k2.
 *   a/b = k1 * (k2+1)/k2.
 *   This formula is implemented correctly.
 */
export const generator_4aaa9c42 = {
  metadata: {
    id: "4aaa9c42",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate percentages
    const P1 = getRandomInt(1500, 2500); // e.g., 2000%
    const P2 = getRandomInt(50, 90);     // e.g., 80%
    
    // STEP 2: Calculate Ratio
    // Formula derived: Percent = P1 * (P2 + 100) / P2
    const exactVal = P1 * ((P2 + 100) / P2);
    const percentageResult = Math.round(exactVal);

    // STEP 3: Distractors
    const distractor1 = Math.round(exactVal / 100); // Forgot to convert ratio to percent
    const distractor2 = Math.round(P1 * P2 / 100); // Naive multiplication
    const distractor3 = Math.round(P1 + P2); // Naive addition

    const optionsData = [
      { text: `${percentageResult}\\%`, isCorrect: true },
      { text: `${distractor1}\\%`, isCorrect: false },
      { text: `${distractor2}\\%`, isCorrect: false },
      { text: `${distractor3}\\%`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    
    return {
      questionText: `The positive number $a$ is ${P1}\\% of the sum of the positive numbers $b$ and $c$, and $b$ is ${P2}\\% of $c$. What percent of $b$ is $a$? (Round to the nearest whole number if necessary.)`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Set up equations:**
    $a = \\frac{${P1}}{100}(b + c)$
    $b = \\frac{${P2}}{100}c$

2.  **Solve for $c$ in terms of $b$:**
    $c = \\frac{100b}{${P2}}$

3.  **Substitute $c$ into the first equation:**
    $a = \\frac{${P1}}{100} \\left( b + \\frac{100b}{${P2}} \\right)$
    
4.  **Factor out $b$:**
    $a = \\frac{${P1}}{100} \\cdot b \\left( 1 + \\frac{100}{${P2}} \\right)$
    $a = \\frac{${P1}}{100} \\cdot b \\left( \\frac{${P2} + 100}{${P2}} \\right)$

5.  **Calculate the percentage:**
    $\\frac{a}{b} = \\frac{${P1}}{100} \\cdot \\frac{${P2 + 100}}{${P2}} \\approx ${percentageResult / 100}$
    
    To convert to a percentage, multiply by 100:
    $${percentageResult}\\%$`
    };
  }
};

/**
 * Question ID: 0ea56bb2
 * 
 * ANALYSIS:
 * - Context: Percent increase over years.
 * - Logic: 
 *   Year 2 increase = x%.
 *   Year 1 increase = 2x%.
 *   We work backwards to ensure integers.
 */
export const generator_0ea56bb2 = {
  metadata: {
    id: "0ea56bb2",
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