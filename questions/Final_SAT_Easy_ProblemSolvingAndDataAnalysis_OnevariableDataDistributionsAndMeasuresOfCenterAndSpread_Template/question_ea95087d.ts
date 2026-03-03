import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ea95087d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [employee counts: 100-400 range]
 * - Difficulty factors: [Reading table, subtraction]
 * - Distractor patterns: [83=wrong order, 152=difference, 235=correct, 495=sum]
 * - Constraints: [Warehouse > Supermarket]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_ea95087d = {
  metadata: {
    // id: "ea95087d",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const warehouse = getRandomInt(350, 400);
    const department = getRandomInt(200, 250);
    const supermarket = getRandomInt(120, 150);
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

/**
 * Question ID: 4b09f783
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: single digit to 20s]
 * - Difficulty factors: [Calculating mean of 10 values]
 * - Constraints: [Sum must be divisible by 10 for clean answer]
 * - Question type: [Raw Data→Fill in Blank]
 * - Figure generation: [No figure]
 */