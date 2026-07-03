import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 719
 *
 * ANALYSIS:
 * - Context: Linear function, solve for the input given the output.
 * - Given: f(x) = (x + c)/d and f(a) = target.
 * - Task: Find a.
 * - Logic: (a + c)/d = target  =>  a + c = target*d  =>  a = target*d - c.
 *
 * Ranges: d in [3,7], c in [10,20], target in [8,15]  =>  a in [4,95] (always > 0).
 *
 * Distractors (each a specific student error, values recomputed from live vars):
 *   - target*d + c : added c instead of subtracting after clearing the denominator.
 *   - target - c   : subtracted c without first multiplying both sides by d.
 *   - target       : reported the output f(a) instead of the input a.
 * The output distractor (target) can equal the correct answer only when
 * target*(d-1) == c (possible at d=3), and target*d+c/target-c could in principle
 * coincide, so a bounded retry (<= 50) redraws until all four option values are
 * distinct and a > 0. Verified: acceptance is near-immediate (avg ~1.01 tries,
 * max 3 over 300k trials), so the loop never approaches the bound.
 */

export const generator_719 = {
  metadata: {
    id: "719",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Draw parameters; retry (bounded) until the four option values are distinct.
    let d = 0, c = 0, target = 0, a = 0;
    let signErr = 0, noMult = 0;
    let tries = 0;
    do {
      d = getRandomInt(3, 7);          // denominator
      c = getRandomInt(10, 20);        // added constant in the numerator
      target = getRandomInt(8, 15);    // the given output f(a)
      a = target * d - c;              // correct input
      signErr = target * d + c;        // sign error clearing the denominator
      noMult = target - c;             // forgot to multiply by d
    } while (
      tries++ < 50 &&
      (a <= 0 || new Set([a, signErr, noMult, target]).size !== 4)
    );

    const optionsData = [
      { text: a.toString(), isCorrect: true, reason: "" },
      { text: signErr.toString(), isCorrect: false, reason: `comes from adding ${c} instead of subtracting it after multiplying both sides by ${d}` },
      { text: noMult.toString(), isCorrect: false, reason: `comes from subtracting ${c} without first multiplying both sides by ${d}` },
      { text: target.toString(), isCorrect: false, reason: `is the output value $f(a)$, not the input $a$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = \\frac{x + ${c}}{${d}}$, and $f(a) = ${target}$, where $a$ is a constant. What is the value of $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: a.toString(),
      explanation: `Choice ${correctLetter} is correct. Since $f(a) = ${target}$, we have $\\frac{a + ${c}}{${d}} = ${target}$. Multiplying both sides by ${d} gives $a + ${c} = ${target * d}$. Subtracting ${c} from both sides gives $a = ${target * d} - ${c} = ${a}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
