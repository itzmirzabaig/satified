import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 274
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4-12, answer: 5-15]
 * - Difficulty factors: [Solving linear equation for input given output]
 * - Distractor patterns: [subtracted, evaluated f at the target, added]
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
    const coefficient = getRandomInt(4, 12);
    const answer = getRandomInt(5, 15);
    const result = coefficient * answer;
    const fmt = (n: number) => n.toLocaleString('en-US');

    // Every wrong choice is a real solving slip. The old choices included the
    // coefficient squared and the coefficient itself. The four values are
    // always distinct: answer <= 15 < result - coefficient < result + coefficient
    // < coefficient * result.
    const optionsData = [
      { text: fmt(result - coefficient), isCorrect: false, reason: `it results from subtracting ${coefficient} from ${result} instead of dividing ${result} by ${coefficient}` },
      { text: answer.toString(), isCorrect: true, reason: '' },
      { text: fmt(coefficient * result), isCorrect: false, reason: `it is the value of $f(${result})$, not the value of $x$ for which $f(x) = ${result}$` },
      { text: fmt(result + coefficient), isCorrect: false, reason: `it results from adding ${coefficient} to ${result} instead of dividing ${result} by ${coefficient}` }
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
      explanation: `Choice ${correctOption.letter} is correct. To find the value of $x$ for which $f(x) = ${result}$, substitute ${result} for $f(x)$ in the given function, which yields $${result} = ${coefficient}x$. Dividing both sides of this equation by ${coefficient} yields $x = ${answer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
