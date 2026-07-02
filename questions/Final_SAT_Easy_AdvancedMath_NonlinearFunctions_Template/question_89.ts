import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 89
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shift: -20 to 20, xInput: 2-10]
 * - Difficulty factors: [Substitution and evaluation of an absolute value function]
 * - Distractor patterns: [Negative result, result before abs, result from opposite shift]
 * - Constraints: [Calculation must follow absolute value rule]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_89 = {
  metadata: {
    id: "89",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const shift = getRandomInt(-20, 20);

    const xInput = getRandomInt(2, 10);

    const result = Math.abs(xInput + shift);

    const optionsData = [
      { text: `${result}`, isCorrect: true },
      { text: `${xInput + shift < 0 ? xInput + shift : result + 5}`, isCorrect: false },
      { text: `${-result}`, isCorrect: false },
      { text: `${Math.abs(xInput - shift)}`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    const signStr = shift >= 0 ? `+ ${shift}` : `- ${Math.abs(shift)}`;

    return {
      questionText: `The function $g$ is defined by $g(x) = |x ${signStr}|$. What is the value of $g(${xInput})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting $${xInput}$ for $x$ in the equation: $g(${xInput}) = |${xInput} ${signStr}| = |${xInput + shift}| = ${result}$.`
    };
  }
};
