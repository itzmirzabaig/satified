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
    const xInput = getRandomInt(2, 10);

    // shift must not be 0 (opposite-shift distractor would equal the answer)
    // and must not be -xInput (result would be 0, colliding with its negation).
    let shift = getRandomInt(-20, 20);
    let tries = 0;
    while ((shift === 0 || shift === -xInput) && tries++ < 50) {
      shift = getRandomInt(-20, 20);
    }
    if (shift === 0 || shift === -xInput) shift = xInput + 1;

    const sum = xInput + shift;
    const result = Math.abs(sum); // always >= 1 because sum !== 0

    // Distractors, guaranteed distinct from the answer and each other:
    // negResult < 0 < result; oppositeResult = |x - shift| !== result since shift !== 0 and x >= 2.
    const negResult = -result;
    const oppositeResult = Math.abs(xInput - shift);

    let delta = getRandomInt(2, 6);
    let deltaTries = 0;
    while (result + delta === oppositeResult && deltaTries++ < 50) {
      delta = getRandomInt(2, 6);
    }
    if (result + delta === oppositeResult) delta += 1;
    const offsetResult = result + delta;

    const optionsData = [
      { text: `${result}`, isCorrect: true, key: 'correct' },
      { text: `${negResult}`, isCorrect: false, key: 'neg' },
      { text: `${oppositeResult}`, isCorrect: false, key: 'opp' },
      { text: `${offsetResult}`, isCorrect: false, key: 'off' }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const letterOf = (key: string) => shuffled.find(o => o.key === key)!.letter;

    const signStr = shift > 0 ? `+ ${shift}` : `- ${Math.abs(shift)}`;
    const oppSignStr = shift > 0 ? `- ${shift}` : `+ ${Math.abs(shift)}`;

    return {
      questionText: `The function $g$ is defined by $g(x) = |x ${signStr}|$. What is the value of $g(${xInput})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting $x = ${xInput}$ into the function gives $g(${xInput}) = |${xInput} ${signStr}| = |${sum}| = ${result}$. The absolute value of a number is its distance from zero, so it is never negative. Choice ${letterOf('neg')} is incorrect; it is the negation of the correct value, but an absolute value cannot be negative. Choice ${letterOf('opp')} is incorrect; it results from reversing the sign of the constant and evaluating $|${xInput} ${oppSignStr}|$ instead. Choice ${letterOf('off')} is incorrect; it does not result from correctly evaluating the function.`
    };
  }
};
