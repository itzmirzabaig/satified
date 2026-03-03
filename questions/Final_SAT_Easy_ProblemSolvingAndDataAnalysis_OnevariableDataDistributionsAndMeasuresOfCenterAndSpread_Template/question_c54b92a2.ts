import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c54b92a2
 *
 * ORIGINAL ANALYSIS: [Calculating range from table - wheels per production period]
 * - Number ranges: [wheels per period: 15-35, 11 periods, Easy difficulty]
 * - Difficulty factors: [Identifying range (max - min) from a data table]
 * - Constraints: [Easy - small integer values, range is a whole number between 3-10]
 * - Question type: [Table → Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_c54b92a2 = {
  metadata: {
    // id: "c54b92a2",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate 11 wheel counts with a clear range
    const minWheels = getRandomInt(15, 25);
    const rangeVal = getRandomInt(4, 9);
    const maxWheels = minWheels + rangeVal;
    
    // Generate 11 values between min and max, ensuring min and max appear
    const wheels: number[] = [minWheels, maxWheels];
    for (let i = 0; i < 9; i++) {
      wheels.push(getRandomInt(minWheels, maxWheels));
    }
    // Shuffle the order for the table
    for (let i = wheels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wheels[i], wheels[j]] = [wheels[j], wheels[i]];
    }

    const range = Math.max(...wheels) - Math.min(...wheels);

    const tableCode = `
      <table>
        <tr><th>Period</th><th>Wheels</th></tr>
        ${wheels.map((w, i) => `<tr><td>${String.fromCharCode(65 + i)}</td><td>${w}</td></tr>`).join('')}
      </table>
    `;

    // Distractors near the range
    const wrong1 = (range + 1.5).toFixed(1);
    const wrong2 = (range - 1.5 > 0 ? range - 1.5 : range + 2.5).toFixed(1);
    const wrong3 = (range - 1).toFixed(1);

    const optionsData = [
      { text: wrong1, isCorrect: false },
      { text: range.toFixed(1), isCorrect: true },
      { text: wrong2, isCorrect: false },
      { text: wrong3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "What is the range of the number of wheels made for the 11 one-hour periods?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: range.toFixed(1),
      explanation: `Choice ${correctOption.letter} is correct. Range is max (${Math.max(...wheels)}) minus min (${Math.min(...wheels)}), which is ${range}.`
    };
  }
};

