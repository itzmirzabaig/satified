import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8368afd1
 *
 * ORIGINAL ANALYSIS: [Reading value from Mafs graph]
 */

export const generator_8368afd1 = {
  metadata: {
    // id: "8368afd1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = -getRandomInt(1, 3);
    const b = getRandomInt(15, 25);
    const x = getRandomInt(2, 5);
    const y = m * x + b;
    
    // More gridlines by using smaller step (divide by 8 instead of 5 for ~8 gridlines)
    const yGridStep = 1;

    const mafsCode = `<Mafs data-y-lines="${yGridStep}" viewBox={{ x: [0, ${x + 2}], y: [0, ${b + 5}] }}>
  <Coordinates.Cartesian 
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) && n >= 0 ? n : "" }}
    yAxis={{ lines: ${yGridStep}, labels: (n) => n % ${yGridStep} === 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => ${m} * x + ${b}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: y.toString(), isCorrect: true },
      { text: (y + 2).toString(), isCorrect: false, reason: "calculation error" },
      { text: x.toString(), isCorrect: false, reason: "uses x-coordinate" },
      { text: b.toString(), isCorrect: false, reason: "uses y-intercept" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The graph shows combinations of tangerines ($x$) and lemons ($y$) costing $${b}$. If Melvin bought ${x} lbs of tangerines, how many lbs of lemons did he buy?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: y.toString(),
      explanation: `Choice ${correctLetter} is correct. For $x=${x}$, the graph shows $y=${y}$.`
    };
  }
};

/**
 * Question ID: 8adf1335
 *
 * ORIGINAL ANALYSIS: [Budget subtraction relationship]
 */