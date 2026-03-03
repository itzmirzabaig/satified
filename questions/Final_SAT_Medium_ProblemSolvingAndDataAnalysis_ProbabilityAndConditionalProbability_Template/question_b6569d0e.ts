import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b6569d0e
 *
 * FIXES:
 * - Changed \\\\frac to \\frac
 * - Updated table styling
 * - Added local gcd function
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const generator_b6569d0e = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate frequency table values
    const range1 = getRandomInt(1, 4); // 40-44
    const range2 = getRandomInt(5, 9); // 45-49
    const range3 = getRandomInt(10, 16); // 50-54
    const range4 = getRandomInt(8, 14); // 55-59
    const range5 = getRandomInt(5, 10); // 60-64
    const range6 = getRandomInt(2, 5); // 65-69

    const totalPresidents = range1 + range2 + range3 + range4 + range5 + range6;
    const atLeast50 = range3 + range4 + range5 + range6;
    const atLeast60 = range5 + range6;

    // STEP 2: Calculate conditional probability
    const numerator = atLeast60;
    const denominator = atLeast50;
    const g = gcd(numerator, denominator);
    const simplifiedNum = numerator / g;
    const simplifiedDen = denominator / g;

    // STEP 3: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 300px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Ages</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Number</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">40–44</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range1}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">45–49</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range2}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">50–54</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range3}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">55–59</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range4}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">60–64</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range5}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">65–69</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${range6}</td>
    </tr>
  </tbody>
</table>`;

    // STEP 4: Create options
    const g2 = gcd(atLeast60, totalPresidents);
    const g3 = gcd(range3, atLeast50);
    const g4 = gcd(atLeast50, atLeast60);

    const optionsData = [
      { text: `$\\frac{${atLeast60 / g2}}{${totalPresidents / g2}}$`, isCorrect: false },
      { text: `$\\frac{${simplifiedNum}}{${simplifiedDen}}$`, isCorrect: true },
      { text: `$\\frac{${range3 / g3}}{${atLeast50 / g3}}$`, isCorrect: false },
      { text: `$\\frac{${atLeast50 / g4}}{${atLeast60 / g4}}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The table above gives the number of United States presidents from 1789 to 2015 whose age at the time they first took office is within the interval listed. Of those presidents who were at least 50 years old when they first took office, what fraction were at least 60 years old?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `\\frac{${simplifiedNum}}{${simplifiedDen}}`,
      explanation: `Choice ${correctLetter} is correct. The number of presidents who were at least 50 years old is $${range3} + ${range4} + ${range5} + ${range6} = ${atLeast50}$. Of those, the number who were at least 60 is $${range5} + ${range6} = ${atLeast60}$. Therefore, the fraction is $\\frac{${atLeast60}}{${atLeast50}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.`
    };
  }
};