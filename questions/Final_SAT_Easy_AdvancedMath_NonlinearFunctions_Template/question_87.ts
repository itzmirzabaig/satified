import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 87
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 5-15, b: 10-40, c: -200 to -100]
 * - Difficulty factors: [Calculating f(0) for a quadratic polynomial]
 * - Distractor patterns: [Origin, leading coefficient, linear coefficient]
 * - Constraints: [Integer calculation]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_87 = {
  metadata: {
    id: "87",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(5, 15);

    const b = getRandomInt(10, 40);

    const c = -getRandomInt(100, 200);

    // c is always negative, so it is written as "- 168", never "+ -168".
    // Choices are typeset so a negative value gets a true minus sign.
    const optionsData = [
      { text: `$${c}$`, isCorrect: true },
      { text: `$0$`, isCorrect: false },
      { text: `$${a}$`, isCorrect: false },
      { text: `$${-b}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const letterOf = (i: number) => shuffled.find(o => o.text === optionsData[i].text)!.letter;

    return {
      questionText: `The function $f$ is defined by $f(x) = ${a}x^2 - ${b}x - ${-c}$. What is the value of $f(0)$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting $0$ for $x$ gives $f(0) = ${a}(0)^2 - ${b}(0) - ${-c} = 0 - 0 - ${-c} = ${c}$. Choice ${letterOf(1)} is incorrect; the constant term does not become 0 when $x=0$. Choice ${letterOf(2)} is incorrect; ${a} is the coefficient of $x^2$, not the value of $f(0)$. Choice ${letterOf(3)} is incorrect; $${-b}$ is the coefficient of $x$, not the value of $f(0)$.`
    };
  }
};
