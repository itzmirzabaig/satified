import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b2845d88
 *
 * ORIGINAL ANALYSIS: [Equation from graph with negative fractional slope]
 */

export const generator_b2845d88 = {
  metadata: {
    // id: "b2845d88",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const den = getRandomInt(2, 5);
    const intercept = -getRandomInt(1, 3);
    
    const mafsCode = `<Mafs viewBox={{ x: [-5, 5], y: [-5, 5] }}>
  <Coordinates.Cartesian 
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
  />
  <Plot.OfX y={(x) => (-1/${den}) * x + ${intercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `$y = -\\frac{1}{${den}}x ${intercept}$`, isCorrect: true },
      { text: `$y = -${den}x ${intercept * den}$`, isCorrect: false, reason: "reciprocal slope error" },
      { text: `$y = -x - \\frac{1}{${den}}$`, isCorrect: false, reason: "slope of -1 error" },
      { text: `$y = -${den}x ${intercept}$`, isCorrect: false, reason: "integer slope error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Which is an equation for the graph shown?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: shuffledOptions.find(o => o.isCorrect)!.text,
      explanation: `Choice ${correctLetter} is correct. The line has y-intercept $(0, ${intercept})$ and slope $-1/${den}$.`
    };
  }
};

/**
 * Question ID: b450ab03
 *
 * ORIGINAL ANALYSIS: [Linear setup with decimals]
 */