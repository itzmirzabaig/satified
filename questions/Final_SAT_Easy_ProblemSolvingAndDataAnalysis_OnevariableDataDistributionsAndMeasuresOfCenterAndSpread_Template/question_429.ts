import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 429
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [frequencies: 20-80]
 * - Difficulty factors: [Adding frequencies from table]
 * - Distractor patterns: [single category, sum of wrong pair]
 * - Constraints: [Two specific categories to sum]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_429 = {
  metadata: {
    id: "429",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate random frequencies, re-rolling until the four answer-choice
    // values (each frequency and each pair's sum) are pairwise
    // distinct so no distractor can collide with another or with the key.
    let never = 0, almostNever = 0, sometimes = 0, often = 0;
    let tries = 0;
    do {
      never = getRandomInt(20, 40);
      almostNever = getRandomInt(40, 60);
      sometimes = getRandomInt(60, 80);
      often = getRandomInt(30, 50);
    } while (
      new Set([never, almostNever, sometimes, often, never + almostNever, sometimes + often]).size < 6 &&
      tries++ < 50
    );
    const total = never + almostNever + sometimes + often;

    const tableCode = `
      <table>
        <tr><th>Response</th><th>Frequency</th></tr>
        <tr><td>Never</td><td>${never}</td></tr>
        <tr><td>Almost never</td><td>${almostNever}</td></tr>
        <tr><td>Sometimes</td><td>${sometimes}</td></tr>
        <tr><td>Often</td><td>${often}</td></tr>
        <tr><td>Total</td><td>${total}</td></tr>
      </table>
    `;

    // Ask about either the two lowest responses or the two highest, so the
    // answer is not always the same pair. The wrong choices are each single
    // frequency in the pair and the sum of the other pair.
    const askLow = getRandomInt(0, 1) === 0;
    const pair = askLow
      ? [{ name: 'never', f: never }, { name: 'almost never', f: almostNever }]
      : [{ name: 'sometimes', f: sometimes }, { name: 'often', f: often }];
    const other = askLow
      ? { names: '"sometimes" or "often"', f: sometimes + often }
      : { names: '"never" or "almost never"', f: never + almostNever };
    const answer = pair[0].f + pair[1].f;
    const optionsData = [
      { text: `${answer}`, isCorrect: true, reason: '' },
      { text: `${pair[0].f}`, isCorrect: false, reason: `${pair[0].f} is only the number of people who responded "${pair[0].name}"; the ${pair[1].f} people who responded "${pair[1].name}" must be added` },
      { text: `${pair[1].f}`, isCorrect: false, reason: `${pair[1].f} is only the number of people who responded "${pair[1].name}"; the ${pair[0].f} people who responded "${pair[0].name}" must be added` },
      { text: `${other.f}`, isCorrect: false, reason: `${other.f} is the number of people who responded ${other.names}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A group of ${total} people were asked how often they exercise in the morning. The table summarizes their responses. How many people responded either "${pair[0].name}" or "${pair[1].name}"?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${answer}`,
      explanation: `Choice ${correctOption.letter} is correct. The table shows that ${pair[0].f} people responded "${pair[0].name}" and ${pair[1].f} people responded "${pair[1].name}". So $${pair[0].f} + ${pair[1].f} = ${answer}$ people responded either "${pair[0].name}" or "${pair[1].name}". ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
