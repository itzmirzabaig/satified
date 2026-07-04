import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 185
 *
 * ORIGINAL ANALYSIS: [Graph to equation negative slope]
 * - Number ranges: [slope: -4 to -1, intercept: 2-8]
 * - Difficulty factors: [Identifying equation from graph]
 * - Constraints: [Simple integers for Easy]
 */

export const generator_185 = {
  metadata: {
    id: "185",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (-4 to -2). Excluding -1 keeps the reciprocal
    // distractors (1/|m|) genuine fractions that can never collapse to an
    // integer slope, so no option can collide with the correct answer.
    const m = -getRandomInt(2, 4);
    const absM = Math.abs(m);
    // Randomize y-intercept (2-8)
    const b = getRandomInt(2, 8);

    const mafsCode = `<Mafs viewBox={{ x: [-2, 4], y: [-5, 10] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${m} * x + ${b}} color="#2563eb" />
</Mafs>`;

    const correctText = `$y = ${m}x + ${b}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$y = ${absM}x - ${b}$`, isCorrect: false, reason: "uses the opposite sign for both the slope and the intercept" },
      { text: `$y = \\frac{1}{${absM}}x - ${b}$`, isCorrect: false, reason: "uses the reciprocal of the slope and the wrong intercept sign" },
      { text: `$y = -\\frac{1}{${absM}}x + ${b}$`, isCorrect: false, reason: "uses the reciprocal of the slope instead of the slope itself" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;
    const wrongSign = shuffled.find(o => o.reason === "uses the opposite sign for both the slope and the intercept")!;

    return {
      questionText: `What is the equation of the line shown in the graph?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The line crosses the y-axis at $b = ${b}$ and falls ${absM} unit${absM === 1 ? "" : "s"} for every unit to the right, so the slope is $m = ${m}$, giving $y = ${m}x + ${b}$. Choice ${wrongSign.letter} is incorrect; it ${wrongSign.reason}. The remaining choices use $\\frac{1}{${absM}}$ (the reciprocal of the slope) rather than the actual slope of $${m}$.`
    };
  }
};
