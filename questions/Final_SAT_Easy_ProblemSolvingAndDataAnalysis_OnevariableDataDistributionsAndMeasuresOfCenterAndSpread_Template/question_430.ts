import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 430
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [employee counts: 100-400 range]
 * - Difficulty factors: [Reading table, subtraction]
 * - Distractor patterns: [83=wrong order, 152=difference, 235=correct, 495=sum]
 * - Constraints: [Warehouse > Supermarket]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_430 = {
  metadata: {
    id: "430",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Re-roll the employee counts until the four answer-choice values
    // (warehouse-department, department-supermarket, warehouse-supermarket,
    // warehouse+supermarket) are pairwise distinct, so no distractor can
    // collide with another or with the correct difference.
    let warehouse = 0, department = 0, supermarket = 0;
    let tries = 0;
    do {
      warehouse = getRandomInt(350, 400);
      department = getRandomInt(200, 250);
      supermarket = getRandomInt(120, 150);
    } while (
      new Set([
        warehouse - department,
        department - supermarket,
        warehouse - supermarket,
        warehouse + supermarket,
      ]).size < 4 &&
      tries++ < 50
    );
    const year = getRandomInt(2015, 2022);

    const tableCode = `
      <table>
        <tr><th>Type of store</th><th>Average number of employees</th></tr>
        <tr><td>Warehouse store</td><td>${warehouse}</td></tr>
        <tr><td>Department store</td><td>${department}</td></tr>
        <tr><td>Supermarket</td><td>${supermarket}</td></tr>
      </table>
    `;

    const difference = warehouse - supermarket;

    const optionsData = [
      { text: (warehouse - department).toString(), isCorrect: false },
      { text: (department - supermarket).toString(), isCorrect: false },
      { text: difference.toString(), isCorrect: true },
      { text: (warehouse + supermarket).toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `For a certain region, the table shows the average number of store employees in ${year} by type of store. Based on the table, how much greater was the average number of store employees in warehouse stores than in supermarkets?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: difference.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Subtracting the supermarket average (${supermarket}) from the warehouse store average (${warehouse}) yields ${difference}.`
    };
  }
};
