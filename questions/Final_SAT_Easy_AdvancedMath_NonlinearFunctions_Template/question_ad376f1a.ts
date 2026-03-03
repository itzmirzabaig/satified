import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ad376f1a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yInt: 2-5, k: 6-12]
 * - Difficulty factors: [Identifying f(0) from a graph]
 * - Distractor patterns: [Origin, negative intercept, vertical asymptote constant]
 * - Constraints: [Graph must have a clear y-intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Rational function plot]
 */

export const generator_ad376f1a = {
  metadata: {
    // id: "ad376f1a",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yInt = getRandomInt(2, 5);
    const k = yInt * getRandomInt(3, 6);
    const denomConst = k / yInt;
    
    const xMin = -denomConst - 4;
    const xMax = denomConst + 2;
    const yMin = -Math.max(8, k);
    const yMax = Math.max(10, k + 2);

    // Extend domains well beyond viewBox so curves appear infinite
    // but stop before the asymptote to avoid connecting the branches
    const leftDomainEnd = -denomConst - 0.001; // Just left of asymptote
    const rightDomainStart = -denomConst + 0.001; // Just right of asymptote

    const mafsCode = `<Mafs viewBox={{ x: [${xMin.toFixed(1)}, ${xMax.toFixed(1)}], y: [${yMin}, ${yMax}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${k} / (x + ${denomConst.toFixed(2)})} color="var(--mafs-blue)" domain={[${(xMin - 10).toFixed(1)}, ${leftDomainEnd.toFixed(3)}]} />
  <Plot.OfX y={(x) => ${k} / (x + ${denomConst.toFixed(2)})} color="var(--mafs-blue)" domain={[${rightDomainStart.toFixed(3)}, ${(xMax + 10).toFixed(1)}]} />
</Mafs>`;

    const optionsData = [
      { text: `${yInt}`, isCorrect: true },
      { text: `0`, isCorrect: false },
      { text: `-${yInt}`, isCorrect: false },
      { text: `${Math.round(denomConst)}`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The graph of $y=f(x)$ is shown in the $xy$-plane. What is the value of $f(0)$?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. $f(0)$ is the y-value of the graph when $x=0$. Looking at the y-axis, the graph intersects at $y=${yInt}$.`
    };
  }
};