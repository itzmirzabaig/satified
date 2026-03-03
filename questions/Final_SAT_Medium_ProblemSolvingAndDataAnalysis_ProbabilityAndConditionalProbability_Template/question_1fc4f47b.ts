import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1fc4f47b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total 350, probabilities 0.24, 0.48]
 * - Difficulty factors: [Probability complement rule, decimal to count conversion]
 * - Distractor patterns: [28 = probability as integer, 40 = calculation error, 84 = theater B count]
 * - Constraints: [Probabilities must sum to 1, P(C) = 1 - P(A) - P(B)]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [No figure needed]
 */

export const generator_1fc4f47b = {
  metadata: {
    // id: "1fc4f47b",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const totalCustomers = getRandomInt(300, 400);
    const probA = parseFloat((getRandomInt(35, 50) / 100).toFixed(2));
    const probB = parseFloat((getRandomInt(20, 30) / 100).toFixed(2));
    const probC = parseFloat((1 - probA - probB).toFixed(2));

    // STEP 2: Calculate counts
    const countA = Math.round(totalCustomers * probA);
    const countB = Math.round(totalCustomers * probB);
    const countC = totalCustomers - countA - countB; // Ensure exact total

    const correctAnswer = countC.toString();

    // STEP 3: Create distractors
    const distractor1 = Math.round(probC * 100); // Probability as integer (e.g., 0.28 → 28)
    const distractor2 = getRandomInt(30, 50); // Random error
    const distractor3 = countB; // Theater B count

    const optionsData = [
      { text: countC.toString(), isCorrect: true },
      { text: distractor1.toString(), isCorrect: false, reason: "confuses probability (0.28) with actual count" },
      { text: distractor2.toString(), isCorrect: false, reason: "results from miscalculating the complement" },
      { text: countB.toString(), isCorrect: false, reason: "gives the number of customers in theater B instead of theater C" }
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
      explanation: `Choice ${correctLetter} is correct. Since the probabilities must sum to 1, the probability of selecting a customer in theater C is 1 - ${probA} - ${probB} = ${probC}. Therefore, the number of customers in theater C is ${probC} × ${totalCustomers} = ${countC}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 2df8f293
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [14-sided polygon, 1 letter out of 14]
 * - Difficulty factors: [Simple probability with geometry context, fill-in-blank]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Answer must be 1/14 or equivalent decimal]
 * - Question type: [Word Problem→Fill in the Blank]
 * - Figure generation: [No figure needed]
 */