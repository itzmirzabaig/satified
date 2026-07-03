import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 953
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total 300-400, probA 0.35-0.50, probB 0.20-0.30]
 * - Difficulty factors: [Probability complement rule, decimal to count conversion]
 * - Distractor patterns: [probC as an integer count, theater A count, theater B count]
 * - Constraints: [Probabilities must sum to 1, P(C) = 1 - P(A) - P(B)]
 * - Question type: [Word Problem->Multiple Choice Text]
 * - Figure generation: [No figure needed]
 */

export const generator_953 = {
  metadata: {
    id: "953",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters, retrying until the correct answer and all
    // three distractors are distinct values (bounded retry, HOUSE_STYLE rule 2).
    let totalCustomers = 0;
    let probA = 0, probB = 0, probC = 0;
    let countA = 0, countB = 0, countC = 0;
    let distractorProb = 0; // probC read as a raw count (e.g. 0.28 -> 28)

    let tries = 0;
    do {
      totalCustomers = getRandomInt(300, 400);
      probA = parseFloat((getRandomInt(35, 50) / 100).toFixed(2));
      probB = parseFloat((getRandomInt(20, 30) / 100).toFixed(2));
      probC = parseFloat((1 - probA - probB).toFixed(2));

      // Answer-first count construction so the three counts sum EXACTLY to total.
      countA = Math.round(totalCustomers * probA);
      countB = Math.round(totalCustomers * probB);
      countC = totalCustomers - countA - countB; // customers in theater C

      distractorProb = Math.round(probC * 100);
      tries++;
    } while (
      tries < 50 &&
      new Set([countC, distractorProb, countA, countB]).size !== 4
    );

    const correctAnswer = countC.toString();

    // STEP 2: Build options. Each distractor is a distinct, meaningful trap.
    const optionsData = [
      { text: countC.toString(), isCorrect: true },
      { text: distractorProb.toString(), isCorrect: false, reason: `uses the probability ${probC} as if it were the count of customers` },
      { text: countA.toString(), isCorrect: false, reason: "gives the number of customers in theater A" },
      { text: countB.toString(), isCorrect: false, reason: "gives the number of customers in theater B" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `At a movie theater, there are a total of ${totalCustomers} customers. Each customer is located in either theater A, theater B, or theater C. If one of these customers is selected at random, the probability of selecting a customer who is located in theater A is ${probA}, and the probability of selecting a customer who is located in theater B is ${probB}. How many customers are located in theater C?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctLetter} is correct. Since the probabilities must sum to 1, the probability of selecting a customer in theater C is $1 - ${probA} - ${probB} = ${probC}$. Therefore, the number of customers in theater C is $${probC} \\times ${totalCustomers} = ${countC}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
