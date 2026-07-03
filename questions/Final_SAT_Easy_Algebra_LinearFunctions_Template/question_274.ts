import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 274
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4-12, answer: 5-15]
 * - Difficulty factors: [Solving linear equation for input given output]
 * - Distractor patterns: [coefficient, square of coefficient, addition error]
 * - Constraints: [Ensure clean division]
 * - Question type: [Solve for x→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_274 = {
  metadata: {
    id: "274",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw coefficient and answer, retrying until all four option values are
    // distinct. Collisions across the declared ranges (coefficient 4-12,
    // answer 5-15): coefficient can equal answer (5-12), and coefficient^2 can
    // equal result+coefficient when coefficient = answer+1. Bounded retry
    // (~85% of pairs are already clean, so this converges immediately).
    let coefficient = getRandomInt(4, 12);
    let answer = getRandomInt(5, 15);
    let tries = 0;
    while (
      new Set([
        coefficient,
        coefficient * coefficient,
        coefficient * answer + coefficient,
        answer
      ]).size !== 4 &&
      tries++ < 50
    ) {
      coefficient = getRandomInt(4, 12);
      answer = getRandomInt(5, 15);
    }

    const result = coefficient * answer;

    const distractor1 = coefficient;

    const distractor2 = coefficient * coefficient;

    const distractor3 = result + coefficient;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "is just the coefficient, not the solution" },
      { text: answer.toString(), isCorrect: true },
      { text: distractor2.toString(), isCorrect: false, reason: "results from squaring the coefficient instead of dividing" },
      { text: distractor3.toString(), isCorrect: false, reason: "results from adding instead of dividing" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = ${coefficient}x$. For what value of $x$ does $f(x) = ${result}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: answer.toString(),
      explanation: `Choice ${correctOption.letter} is correct. To find the value of $x$ for which $f(x) = ${result}$, set up the equation $f(x) = ${coefficient}x = ${result}$. Dividing both sides by ${coefficient} gives $x = ${answer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
