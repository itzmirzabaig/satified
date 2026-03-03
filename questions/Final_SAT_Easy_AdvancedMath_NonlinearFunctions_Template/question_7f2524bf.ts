import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

export const generator_7f2524bf = {
  metadata: {
    // id: "7f2524bf",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initialValue = getRandomInt(180, 280);
    const decayRate = (getRandomInt(40, 90) / 1000);

    // Show just first 12 months with cleaner y-axis ticks
    const mafsCode = `<Mafs viewBox={{ x: [-2, 12], y: [${initialValue - 40}, ${initialValue + 20}] }}>
  <Coordinates.Cartesian 
    xAxis={{ lines: 2, labels: (n) => n >= 0 ? n : '' }}
    yAxis={{ lines: 20, labels: (n) => n % 20 === 0 ? n : '' }}
  />
  <Plot.OfX y={(x) => ${initialValue} * Math.exp(-${decayRate} * x)} color="var(--mafs-blue)" />
  <Point x={0} y={${initialValue}} color="var(--mafs-red)" />
</Mafs>`;

    const optionsData = [
      { text: `The estimated value of the tablet was $${initialValue} when it was purchased.`, isCorrect: true },
      { text: `The estimated value of the tablet was $${initialValue} after 24 months.`, isCorrect: false },
      { text: `The estimated value of the tablet decreased by $${initialValue} every month.`, isCorrect: false },
      { text: `The estimated value of the tablet decreased by approximately ${Math.round(decayRate * 100)}% each month.`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The graph shown gives the estimated value, in dollars, of a tablet as a function of the number of months since it was purchased. What is the best interpretation of the y-intercept of the graph in this context?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The y-intercept of a graph is the point at which the graph intersects the y-axis, occurring when the independent variable $x$ is $0$. In this context, $x=0$ represents $0$ months since the tablet was purchased. Substituting $x=0$ into the function gives $y = ${initialValue}e^0 = ${initialValue}$. Therefore, the best interpretation is that the tablet was worth $${initialValue} at the time of purchase. Choice ${incorrectOptions[0].letter}, ${incorrectOptions[1].letter}, and ${incorrectOptions[2].letter} are incorrect because they misinterpret the meaning of the y-intercept or the units of time provided.`
    };
  }
};

/**
 * Question ID: e9aed539
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h: 1-3, k: -3 to -1, shift: 4]
 * - Difficulty factors: [Vertical translation of a parabola]
 * - Distractor patterns: [Down shift, Left shift, Right shift]
 * - Constraints: [New vertex must be clearly distinguishable]
 * - Question type: [Figure→Multiple Choice Figure]
 * - Figure generation: [Parabola with vertex (h, k)]
 */