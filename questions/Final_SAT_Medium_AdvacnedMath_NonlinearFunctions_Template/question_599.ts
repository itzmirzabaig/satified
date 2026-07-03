import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_599 = {
  metadata: {
    id: "599",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Construct width-first so every draw yields a valid rectangle:
    // width = x - diff >= 2, length x1 = width + diff, area > 0.
    const diff = getRandomInt(10, 20);
    const width = getRandomInt(2, 8);
    const x1 = width + diff; // 12..28
    const area = x1 * width; // 24..224, always positive

    const questionText = `A rectangle has a length of $x$ units and a width of $(x-${diff})$ units. If the rectangle has an area of ${area} square units, what is the value of $x$?`;

    // Distinctness across all draws (width 2..8, diff 10..20):
    // width < x1 < x1 + diff, area = x1*width >= 2*x1 > x1 + diff never
    // equals x1*width (x1*(width-2) = -width has no solution for width >= 2),
    // and area > width always. So the four options never collide.
    const optionsData = [
      { text: `$${width}$`, isCorrect: false, reason: `this is the width of the rectangle, $x-${diff}$, not the value of $x$` },
      { text: `$${x1}$`, isCorrect: true },
      { text: `$${x1 + diff}$`, isCorrect: false, reason: "it results from a sign error when solving the quadratic equation" },
      { text: `$${area}$`, isCorrect: false, reason: `this is the given area of the rectangle, not the value of $x$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$${x1}$`;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The area of a rectangle is its length times its width, so $x(x-${diff}) = ${area}$. Expanding gives $x^2 - ${diff}x = ${area}$, and rearranging gives $x^2 - ${diff}x - ${area} = 0$. This factors as $(x-${x1})(x+${width}) = 0$, so $x = ${x1}$ or $x = -${width}$. Because $x$ represents the length of the rectangle, $x$ must be positive, so $x = ${x1}$. (Check: when $x = ${x1}$, the width is $x - ${diff} = ${width}$, and $x(x - ${diff}) = ${area}$.) Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
