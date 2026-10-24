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
    // and each pair's sum) are pairwise distinct, so no distractor can
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
        warehouse + department,
        department + supermarket,
      ]).size < 6 &&
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

    // Compare a random pair of store types (it was always warehouse stores
    // and supermarkets). Wrong choices are the other two differences and the
    // sum of the pair.
    const stores = [
      { one: 'warehouse store', many: 'warehouse stores', v: warehouse },
      { one: 'department store', many: 'department stores', v: department },
      { one: 'supermarket', many: 'supermarkets', v: supermarket }
    ];
    const pairs = [[0, 1], [0, 2], [1, 2]];
    const pick = getRandomInt(0, 2);
    const [hi, lo] = pairs[pick].map(i => stores[i]);
    const difference = hi.v - lo.v;
    const optionsData = [
      { text: `${difference}`, isCorrect: true, reason: '' },
      { text: `${hi.v + lo.v}`, isCorrect: false, reason: `${hi.v + lo.v} is the sum of the averages for ${hi.many} and ${lo.many}, not their difference` },
      ...pairs.filter((_, i) => i !== pick).map(([a, b]) => ({
        text: `${stores[a].v - stores[b].v}`,
        isCorrect: false,
        reason: `${stores[a].v - stores[b].v} is how much greater the average for ${stores[a].many} is than the average for ${stores[b].many}`
      }))
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `For a certain region, the table shows the average number of store employees in ${year} by type of store. Based on the table, how much greater was the average number of store employees in ${hi.many} than in ${lo.many}?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${difference}`,
      explanation: `Choice ${correctOption.letter} is correct. The table shows that the average number of employees was ${hi.v} in ${hi.many} and ${lo.v} in ${lo.many}. The difference is $${hi.v} - ${lo.v} = ${difference}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
