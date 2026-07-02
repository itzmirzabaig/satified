import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 413
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [counts: 3-20]
 * - Difficulty factors: [Reading bar graph, subtraction]
 * - Distractor patterns: [vervet only, difference, mandrill only, difference of others]
 * - Constraints: [Two specific categories to compare]
 * - Question type: [Bar Graph→Multiple Choice Text]
 * - Figure generation: [Mafs bar chart]
 */

export const generator_413 = {
  metadata: {
    id: "413",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate random counts
    const mandrill = getRandomInt(3, 10);
    const vervet = mandrill + getRandomInt(3, 10);
    const diff = vervet - mandrill;

    const mafsCode = `
      <Coordinates.Cartesian
        xAxis={{ labels: (n) => ["", "Mandrill", "Vervet"][n] || "" }}
        yAxis={{ lines: 2 }}
      />
      <Line.Segment point1={[1, 0]} point2={[1, ${mandrill}]} weight={40} />
      <Line.Segment point1={[2, 0]} point2={[2, ${vervet}]} weight={40} />
    `;

    const optionsData = [
      { text: vervet.toString(), isCorrect: false },
      { text: diff.toString(), isCorrect: true },
      { text: mandrill.toString(), isCorrect: false },
      { text: (diff - 2).toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "How many more vervets are in this sanctuary than mandrills?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: diff.toString(),
      explanation: `Choice ${correctOption.letter} is correct. There are ${vervet} vervets and ${mandrill} mandrills. ${vervet} - ${mandrill} = ${diff}.`
    };
  }
};
