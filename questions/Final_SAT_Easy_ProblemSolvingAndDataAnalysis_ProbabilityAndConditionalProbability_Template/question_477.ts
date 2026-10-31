import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 477
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [die sides: 14, target number: single value]
 * - Difficulty factors: [Basic probability formula, single favorable outcome]
 * - Distractor patterns: [B: confuses value with count, C: wrong complementary, D: full complementary]
 * - Constraints: [Die must have distinct faces 1-N, only 1 favorable outcome for specific number]
 * - Question type: [No figure/table → Text Options]
 * - Figure generation: [None]
 */

export const generator_477 = {
  metadata: {
    id: "477",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numSides = getRandomInt(10, 20);
    // Keep targetNumber in [2, numSides - 3] so the "value as numerator"
    // distractor (target/numSides) can never coincide with the correct answer
    // (1/numSides, requires target = 1) nor with the complementary distractors
    // (N-2)/N and (N-1)/N (require target = N-2 or N-1). Range is non-empty
    // because numSides >= 10.
    // Also skip target * target = numSides (e.g. 4 on a 16 face die), where
    // the 1/target choice would equal target/numSides.
    let targetNumber = getRandomInt(2, numSides - 3);
    while (targetNumber * targetNumber === numSides) targetNumber = getRandomInt(2, numSides - 3);

    // "an 8", "an 11", "an 18", otherwise "a".
    const aN = (n: number) => (/^(8|11|18)$/.test(String(n)) ? `an ${n}` : `a ${n}`);
    const correctText = `\\frac{1}{${numSides}}`;

    // Distractors, all provably distinct from 1/numSides and from each other
    // for numSides in [10,20] and targetNumber in [2, numSides-3]:
    //  - target/numSides : confuses the face value with a count of outcomes
    //  - (N-1)/numSides  : the complement, P(not rolling the target)
    // 1/target replaced (N-2)/N, which was explained only as "a
    // miscalculation." target is at least 2 and less than N, so 1/target
    // differs from every other choice.
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: `\\frac{${targetNumber}}{${numSides}}`, isCorrect: false, reason: `$\\frac{${targetNumber}}{${numSides}}$ is the probability of rolling a number from 1 through ${targetNumber}; it uses the number ${targetNumber} as the count of favorable outcomes, but only one face shows ${targetNumber}` },
      { text: `\\frac{1}{${targetNumber}}`, isCorrect: false, reason: `$\\frac{1}{${targetNumber}}$ treats ${targetNumber}, the number to be rolled, as the number of possible outcomes; the die has ${numSides} possible outcomes` },
      { text: `\\frac{${numSides - 1}}{${numSides}}`, isCorrect: false, reason: `$\\frac{${numSides - 1}}{${numSides}}$ is the probability of not rolling ${aN(targetNumber)}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The die has ${numSides} faces in total, labeled 1 through ${numSides}, so there are ${numSides} equally likely outcomes when it is rolled. Only one face is labeled ${targetNumber}, so there is exactly one favorable outcome. The probability is $P = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}} = \\frac{1}{${numSides}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A fair die has ${numSides} faces. Each face is labeled with a number from 1 through ${numSides}, with a different number appearing on each face. If the die is rolled one time, what is the probability of rolling ${aN(targetNumber)}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
