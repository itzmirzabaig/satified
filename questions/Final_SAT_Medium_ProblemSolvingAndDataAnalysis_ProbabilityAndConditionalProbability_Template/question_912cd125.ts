import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 912cd125
 *
 * FIXES:
 * - Changed \\\\frac to \\frac
 * - Updated table styling to use transparent background and currentColor
 * - Added local gcd function
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const generator_912cd125 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const weeks = 12;
    const weekdaysRain = getRandomInt(10, 15);
    const weekdaysNoRain = getRandomInt(45, 55);
    const weekendRain = getRandomInt(6, 10);
    const weekendNoRain = getRandomInt(14, 20);

    const weekdaysTotal = weekdaysRain + weekdaysNoRain;
    const weekendTotal = weekendRain + weekendNoRain;
    const totalDays = weekdaysTotal + weekendTotal;
    const totalRain = weekdaysRain + weekendRain;
    const totalNoRain = weekdaysNoRain + weekendNoRain;

    // STEP 2: Calculate conditional probability
    const numerator = weekendNoRain;
    const denominator = totalNoRain;
    const g = gcd(numerator, denominator);
    const simplifiedNum = numerator / g;
    const simplifiedDen = denominator / g;

    // STEP 3: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 400px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;"></th>
      <th style="border: 1px solid currentColor; padding: 8px;">Rain</th>
      <th style="border: 1px solid currentColor; padding: 8px;">No rain</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Number of weekdays</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekdaysRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekdaysNoRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekdaysTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Number of weekend days</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekendRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekendNoRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${weekendTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalNoRain}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalDays}</td>
    </tr>
  </tbody>
</table>`;

    // STEP 4: Create options
    const g2 = gcd(weekendTotal, totalDays);
    const g3 = gcd(totalNoRain, totalDays);
    const g4 = gcd(weekdaysNoRain, totalNoRain);

    const optionsData = [
      { text: `$\\frac{${weekendTotal / g2}}{${totalDays / g2}}$`, isCorrect: false },
      { text: `$\\frac{${simplifiedNum}}{${simplifiedDen}}$`, isCorrect: true },
      { text: `$\\frac{${totalNoRain / g3}}{${totalDays / g3}}$`, isCorrect: false },
      { text: `$\\frac{${weekdaysNoRain / g4}}{${totalNoRain / g4}}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `For a science project, Anka recorded whether it rained each weekday and weekend day for ${weeks} weeks. Her results are summarized in the table below. If one of the days on which there was no rain is selected at random, what is the probability the day was a weekend day?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `\\frac{${simplifiedNum}}{${simplifiedDen}}`,
      explanation: `Choice ${correctLetter} is correct. There were ${totalNoRain} days with no rain. Of those, ${weekendNoRain} were weekend days. Therefore, the probability is $\\frac{${weekendNoRain}}{${totalNoRain}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.`
    };
  }
};