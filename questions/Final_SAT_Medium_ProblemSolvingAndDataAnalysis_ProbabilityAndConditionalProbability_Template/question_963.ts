import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 963
 *
 * Two-way table (department x education level). Given the person works in
 * Human Resources, P(master's) = hrMasters / hrTotal. Distractors are other
 * plausible ratios (over the whole company, over all master's-degree holders,
 * and the HR share of the company). All four option values are guaranteed
 * pairwise-distinct via a bounded retry so no two rendered fractions collide.
 */

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const generator_963 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values, redrawing until the four candidate option
    // fractions are all numerically distinct (bounded retry).
    let hrBachelors = 0, hrMasters = 0, acctBachelors = 0, acctMasters = 0;
    let hrTotal = 0, acctTotal = 0, totalPeople = 0, totalMasters = 0;

    let tries = 0;
    while (tries++ < 50) {
      hrBachelors = getRandomInt(3, 6);
      hrMasters = getRandomInt(2, 4);
      acctBachelors = getRandomInt(2, 5);
      acctMasters = getRandomInt(4, 8);

      hrTotal = hrBachelors + hrMasters;
      acctTotal = acctBachelors + acctMasters;
      totalPeople = hrTotal + acctTotal;
      totalMasters = hrMasters + acctMasters;

      // Candidate fraction values that will be rendered as options.
      const vals = [
        hrMasters / hrTotal,     // correct
        hrMasters / totalPeople, // distractor: over whole company
        hrMasters / totalMasters, // distractor: among all master's holders
        hrTotal / totalPeople    // distractor: HR share of company
      ];

      let distinct = true;
      for (let a = 0; a < vals.length && distinct; a++) {
        for (let b = a + 1; b < vals.length; b++) {
          if (Math.abs(vals[a] - vals[b]) < 1e-9) { distinct = false; break; }
        }
      }
      if (distinct) break;
    }

    // STEP 2: Correct answer (conditional probability), simplified.
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

    // STEP 4: Create options (each simplified for display).
    const g2 = gcd(hrMasters, totalPeople);
    const g3 = gcd(hrMasters, totalMasters);
    const g4 = gcd(hrTotal, totalPeople);

    const correctText = `$\\frac{${simplifiedNum}}{${simplifiedDen}}$`;

    const optionsData = [
      { text: `$\\frac{${hrMasters / g2}}{${totalPeople / g2}}$`, isCorrect: false },
      { text: correctText, isCorrect: true },
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
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. There are ${hrTotal} people in Human Resources. Of those, ${hrMasters} have a master's degree. Therefore, the probability is $\\frac{${hrMasters}}{${hrTotal}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$.`
    };
  }
};
