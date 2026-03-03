import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b5c43226
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 2-3, shift: 1-3]
 * - Difficulty factors: [Calculating y-intercept of an exponential growth function]
 * - Distractor patterns: [Origin, swapped coordinates, shift value]
 * - Constraints: [Result is an integer]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Exponential growth plot]
 */

export const generator_b5c43226 = {
  metadata: {
    // id: "b5c43226",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(2, 3);
    const shift = getRandomInt(1, 3);
    const yInt = Math.pow(base, shift);

    // Keep viewBox tight around y-intercept area
    // x: [-3, 2] shows left side well and stops before curve gets too tall
    // y: [0, yInt + 3] keeps y-intercept clearly visible in upper portion
    const xMin = -3;
    const xMax = 1.5;

    const mafsCode = `<Mafs viewBox={{ x: [${xMin}, ${xMax}], y: [0, ${yInt + 3}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => Math.pow(${base}, x + ${shift})} color="var(--mafs-blue)" domain={[${xMin}, ${xMax}]} />
</Mafs>`;

    const optionsData = [
      { text: `$(0, ${yInt})$`, isCorrect: true },
      { text: `$(0, 0)$`, isCorrect: false },
      { text: `$(${yInt}, 0)$`, isCorrect: false },
      { text: `$(${shift}, 0)$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `What is the $y$-intercept of the graph shown?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The y-intercept is the point where $x=0$. Substituting $x=0$ into the equation $y = ${base}^{x+${shift}}$ gives $y = ${base}^{0+${shift}} = ${base}^{${shift}} = ${yInt}$. Thus, the intercept is $(0, ${yInt})$.`
    };
  }
};