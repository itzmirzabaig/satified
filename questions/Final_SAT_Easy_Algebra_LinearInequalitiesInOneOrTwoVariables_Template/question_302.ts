import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 302
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates: nonzero integers from -15 to 15]
 * - Difficulty factors: [Basic coordinate plane understanding, quadrant identification]
 * - Distractor patterns: [the other three sign combinations]
 * - Constraints: [Neither coordinate is 0]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_302 = {
  metadata: {
    id: "302",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The point used to be in the first quadrant every time, so the answer
    // never changed, and each system was written as "$x > 0$ $y > 0$" on one
    // line, which rendered as "x > 0 y > 0". The systems are now stacked.
    const xPos = Math.random() < 0.5;
    const yPos = Math.random() < 0.5;
    const x = (xPos ? 1 : -1) * getRandomInt(1, 15);
    const y = (yPos ? 1 : -1) * getRandomInt(1, 15);

    const rel = (pos: boolean) => (pos ? '>' : '<');
    const word = (pos: boolean) => (pos ? 'positive' : 'negative');
    const system = (xp: boolean, yp: boolean) => `$\\begin{aligned} x &${rel(xp)} 0 \\\\ y &${rel(yp)} 0 \\end{aligned}$`;

    const reasonFor = (xp: boolean, yp: boolean): string => {
      const parts: string[] = [];
      if (xp !== xPos) parts.push(`it requires $x ${rel(xp)} 0$, but the $x$-coordinate, $${x}$, is ${word(xPos)}`);
      if (yp !== yPos) parts.push(`${parts.length ? 'and' : 'it'} requires $y ${rel(yp)} 0$, but the $y$-coordinate, $${y}$, is ${word(yPos)}`);
      return parts.join(', ');
    };

    const optionsData = [[true, true], [true, false], [false, true], [false, false]].map(([xp, yp]) => ({
      text: system(xp, yp),
      isCorrect: xp === xPos && yp === yPos,
      reason: reasonFor(xp, yp)
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The point $(${x}, ${y})$ has $x$-coordinate $${x}$, which is ${word(xPos)}, so $x ${rel(xPos)} 0$, and $y$-coordinate $${y}$, which is ${word(yPos)}, so $y ${rel(yPos)} 0$. Therefore, the point is a solution to the system with $x ${rel(xPos)} 0$ and $y ${rel(yPos)} 0$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The point $(${x}, ${y})$ in the $xy$-plane is a solution to which of the following systems of inequalities?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
