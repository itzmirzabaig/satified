import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 2289657
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [deposit: 20-35, initial: 90-120]
 * - Difficulty factors: [Interpreting rate of change]
 * - Distractor patterns: [intercept as rate, total after one deposit, count of deposits]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_2289657 = {
  metadata: {
    // id: "2289657",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const deposit = getRandomInt(20, 35);

    const initial = getRandomInt(90, 120);

    const optionA = `With each monthly deposit, the amount in Hana's bank account increased by $${deposit}.`;

    const optionsData = [
      { text: optionA, isCorrect: true },
      { text: `Before Hana made any monthly deposits, the amount in her bank account was $${deposit}.`, isCorrect: false, reason: "confuses the deposit amount with the initial amount" },
      { text: `After 1 monthly deposit, the amount in Hana's bank account was $${deposit}.`, isCorrect: false, reason: "confuses the deposit amount with the total after one deposit" },
      { text: `Hana made a total of $${deposit} monthly deposits.`, isCorrect: false, reason: "confuses the deposit amount with a count of deposits" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Hana deposited a fixed amount into her bank account each month. The function $f(t) = ${initial} + ${deposit}t$ gives the amount, in dollars, in Hana's bank account after $t$ monthly deposits. What is the best interpretation of $${deposit}$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: optionA,
      explanation: `Choice ${correctOption.letter} is correct. In $f(t) = ${initial} + ${deposit}t$, the coefficient ${deposit} represents the rate of change—the amount added each month. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 73b5f330
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4-8, intercept: 5-12, result: calculated]
 * - Difficulty factors: [Solving for input given output]
 * - Distractor patterns: [calculation error, subtracting slope]
 * - Constraints: [Ensure clean result]
 * - Question type: [Solve for x→Multiple Choice Text]
 * - Figure generation: null
 */

