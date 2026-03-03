import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 66f03086
 *
 * ORIGINAL ANALYSIS: [Finding median of 9 ordered values]
 * - Number ranges: [data values: 60-95 range, Easy difficulty]
 * - Difficulty factors: [Finding median of odd number of ordered values]
 * - Constraints: [9 values, strictly increasing, median is the 5th value]
 * - Question type: [Raw Data → Multiple Choice Text]
 */

export const generator_66f03086 = {
  metadata: {
    // id: "66f03086",
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

    // Distractors: values near the median
    const distractor1 = values[0]; // minimum
    const distractor2 = values[5]; // one above median
    const distractor3 = values[6]; // two above median

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false },
      { text: median.toString(), isCorrect: true },
      { text: distractor2.toString(), isCorrect: false },
      { text: distractor3.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `What is the median of the data shown?\n\n${values.join(', ')}`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: median.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The median of 9 ordered values is the 5th value, which is ${median}.`
    };
  }
};

