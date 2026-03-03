import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a9647302
 *
 * ORIGINAL ANALYSIS: [Calculating mean from bar graph - defective lightbulbs]
 * - Number ranges: [defective bulbs per trial: 1-8, 5 trials, Easy difficulty]
 * - Difficulty factors: [Calculating mean from a bar graph with 5 bars]
 * - Constraints: [Easy - small integers, mean has 1 decimal place]
 * - Question type: [Bar Graph → Multiple Choice Text]
 * - Figure generation: [Mafs bar chart]
 */

export const generator_a9647302 = {
  metadata: {
    // id: "a9647302",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate 5 random defect counts; ensure sum is not divisible by 5 for non-integer mean
    let defects: number[];
    let sum: number;
    do {
      defects = [
        getRandomInt(2, 6), getRandomInt(2, 6), getRandomInt(2, 6),
        getRandomInt(2, 6), getRandomInt(2, 6)
      ];
      sum = defects.reduce((a, b) => a + b, 0);
    } while (sum % 5 === 0); // Avoid whole-number mean to make it non-trivial

    const mean = sum / 5;
    const meanStr = mean.toFixed(1);

    const mafsCode = `
      <Coordinates.Cartesian
        xAxis={{ labels: (n) => n > 0 && n < 6 ? n : "" }}
        yAxis={{ lines: 1 }}
      />
      ${defects.map((d, i) => `<Line.Segment point1={[${i + 1}, 0]} point2={[${i + 1}, ${d}]} weight={40} />`).join('\n      ')}
    `;

    // Distractors: nearby plausible values
    const wrongLow = (Math.floor(mean * 10 - 2) / 10).toFixed(1);
    const wrongHigh1 = (Math.ceil(mean * 10 + 2) / 10).toFixed(1);
    const wrongHigh2 = (Math.ceil(mean * 10 + 4) / 10).toFixed(1);

    const optionsData = [
      { text: wrongLow, isCorrect: false },
      { text: meanStr, isCorrect: true },
      { text: wrongHigh1, isCorrect: false },
      { text: wrongHigh2, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "What is the mean number of defective lightbulbs for the five trials?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: meanStr,
      explanation: `Choice ${correctOption.letter} is correct. The values are ${defects.join(', ')}. The sum is ${sum}. Dividing by 5 trials gives ${meanStr}.`
    };
  }
};

