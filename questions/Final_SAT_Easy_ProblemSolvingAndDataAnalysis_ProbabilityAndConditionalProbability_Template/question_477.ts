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
    const targetNumber = getRandomInt(2, numSides - 3);

    const correctText = `\\frac{1}{${numSides}}`;

    // Distractors, all provably distinct from 1/numSides and from each other
    // for numSides in [10,20] and targetNumber in [2, numSides-3]:
    //  - target/numSides : confuses the face value with a count of outcomes
    //  - (N-2)/numSides  : mistaken "not the target and not 1" complement
    //  - (N-1)/numSides  : the complement, P(not rolling the target)
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `\\frac{${targetNumber}}{${numSides}}`, isCorrect: false, reason: "confuses the value showing on the face with the number of favorable outcomes" },
      { text: `\\frac{${numSides - 2}}{${numSides}}`, isCorrect: false, reason: "represents the probability of not rolling the target or a 1, which is a miscalculation" },
      { text: `\\frac{${numSides - 1}}{${numSides}}`, isCorrect: false, reason: "represents the probability of not rolling the target number" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The die has ${numSides} faces in total, labeled 1 through ${numSides}, so there are ${numSides} equally likely outcomes when it is rolled. Only one face is labeled ${targetNumber}, so there is exactly one favorable outcome. The probability is $P = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}} = \\frac{1}{${numSides}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Each face of a fair $${numSides}$-sided die is labeled with a number from $1$ through $${numSides}$, with a different number appearing on each face. If the die is rolled one time, what is the probability of rolling a $${targetNumber}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
