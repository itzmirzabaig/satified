import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 416
 *
 * ORIGINAL ANALYSIS: [Finding median of 9 ordered values]
 * - Number ranges: [data values: 60-95 range, Easy difficulty]
 * - Difficulty factors: [Finding median of odd number of ordered values]
 * - Constraints: [9 values, strictly increasing, median is the 5th value]
 * - Question type: [Raw Data → Multiple Choice Text]
 */

export const generator_416 = {
  metadata: {
    id: "416",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate 9 strictly increasing integers in a reasonable range
    const base = getRandomInt(60, 75);
    const gaps = [
      getRandomInt(1, 3), getRandomInt(1, 3), getRandomInt(1, 3), getRandomInt(1, 3),
      getRandomInt(1, 3), getRandomInt(1, 3), getRandomInt(1, 3), getRandomInt(1, 3)
    ];
    
    const values: number[] = [base];
    for (const g of gaps) {
      values.push(values[values.length - 1] + g);
    }
    
    const median = values[4]; // 5th value (index 4) is the median of 9 sorted values

    // Each wrong choice is a real slip; two of the old ones were simply the
    // 6th and 7th values. The range (at most 24) never matches a data value
    // (at least 60), and the values are strictly increasing.
    const range = values[8] - values[0];
    const optionsData = [
      { text: values[0].toString(), isCorrect: false, reason: `${values[0]} is the least value in the data, not the middle value` },
      { text: median.toString(), isCorrect: true, reason: '' },
      { text: values[3].toString(), isCorrect: false, reason: `${values[3]} is the 4th value in the list; with 9 values, the middle value is the 5th, which has 4 values on each side` },
      { text: range.toString(), isCorrect: false, reason: `${range} is the range of the data, $${values[8]} - ${values[0]}$, not the median` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the median of the data shown?\n\n${values.join(', ')}`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: median.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The median of a data set with an odd number of values is the middle value when the values are listed in order. The 9 values are listed in order, so the median is the 5th value, ${median}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};

