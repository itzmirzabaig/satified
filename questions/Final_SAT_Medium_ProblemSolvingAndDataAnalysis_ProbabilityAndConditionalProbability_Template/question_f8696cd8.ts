import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f8696cd8
 *
 * FIXES:
 * - Changed \\\\frac to \\frac
 * - Updated table styling
 * - Added local gcd function
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const generator_f8696cd8 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values
    const hrBachelors = getRandomInt(3, 6);
    const hrMasters = getRandomInt(2, 4);
    const acctBachelors = getRandomInt(2, 5);
    const acctMasters = getRandomInt(4, 8);

    const hrTotal = hrBachelors + hrMasters;
    const acctTotal = acctBachelors + acctMasters;
    const totalPeople = hrTotal + acctTotal;
    const totalMasters = hrMasters + acctMasters;

    // STEP 2: Calculate conditional probability
    const numerator = hrMasters;
    const denominator = hrTotal;
    const g = gcd(numerator, denominator);
    const simplifiedNum = numerator / g;
    const simplifiedDen = denominator / g;

    // STEP 3: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 400px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Level of Education</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Human Resources</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Accounting</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Bachelor's degree</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${hrBachelors}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${acctBachelors}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Master's degree</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${hrMasters}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${acctMasters}</td>
    </tr>
  </tbody>
</table>`;

    // STEP 4: Create options
    const g2 = gcd(hrMasters, totalPeople);
    const g3 = gcd(hrMasters, totalMasters);
    const g4 = gcd(hrTotal, totalPeople);

    const optionsData = [
      { text: `$\\frac{${hrMasters / g2}}{${totalPeople / g2}}$`, isCorrect: false },
      { text: `$\\frac{${simplifiedNum}}{${simplifiedDen}}$`, isCorrect: true },
      { text: `$\\frac{${hrMasters / g3}}{${totalMasters / g3}}$`, isCorrect: false },
      { text: `$\\frac{${hrTotal / g4}}{${totalPeople / g4}}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: "The table above shows the number of people who work in the Human Resources and Accounting departments of a company and the highest level of education they have completed. A person from one of these departments is to be chosen at random. If the person chosen works in the Human Resources department, what is the probability that the highest level of education the person completed is a master's degree?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `\\frac{${simplifiedNum}}{${simplifiedDen}}`,
      explanation: `Choice ${correctLetter} is correct. There are ${hrTotal} people in Human Resources. Of those, ${hrMasters} have a master's degree. Therefore, the probability is $\\frac{${hrMasters}}{${hrTotal}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.`
    };
  }
};