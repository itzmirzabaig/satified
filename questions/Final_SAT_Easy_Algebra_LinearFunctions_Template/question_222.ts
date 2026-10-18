import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 222
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-8, xValue: 3-10]
 * - Difficulty factors: [Finding y-intercept given function value]
 * - Distractor patterns: [arbitrary value, slope as b, xValue as b]
 * - Constraints: [b must be 0 for consistency with original SAT question]
 * - Question type: [Find parameter→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_222 = {
  metadata: {
    id: "222",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // b was always 0 (so the answer never changed) and one choice was 1, "an
    // arbitrary value". b is now random and every distractor is a real error.
    // Redraw until b differs from xValue; the other choices never collide
    // (-b < 0 < b < targetValue).
    const slope = getRandomInt(2, 8);
    let xValue = 3, b = 1;
    do {
      xValue = getRandomInt(3, 10);
      b = getRandomInt(1, 12);
    } while (b === xValue);

    const targetValue = slope * xValue + b;

    const optionsData = [
      { text: b.toString(), isCorrect: true, reason: '' },
      { text: (-b).toString(), isCorrect: false, reason: `results from subtracting ${targetValue} from ${slope * xValue} instead of subtracting ${slope * xValue} from ${targetValue}` },
      { text: xValue.toString(), isCorrect: false, reason: `is the input value, $x = ${xValue}$, not the value of $b$` },
      { text: targetValue.toString(), isCorrect: false, reason: `is the value of $f(${xValue})$, not the value of $b$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the linear function $f$, $f(x) = ${slope}x + b$, where $b$ is a constant and $f(${xValue}) = ${targetValue}$. What is the value of $b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: b.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xValue} for $x$ and ${targetValue} for $f(${xValue})$ in the given equation yields $${targetValue} = ${slope}(${xValue}) + b$, which simplifies to $${targetValue} = ${slope * xValue} + b$. Subtracting ${slope * xValue} from both sides yields $b = ${b}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
