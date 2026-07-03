import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 468
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total members, saxophone players (<= half)]
 * - Difficulty factors: [Basic probability from text description]
 * - Distractor patterns: [1/total, P(not saxophone), total/total = 1]
 * - Constraints: [Simple fraction P(saxophone) = sax/total]
 * - Question type: [No figure -> Text options]
 * - Figure generation: [None]
 */

export const generator_468 = {
  metadata: {
    id: "468",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // The four options are sax/total, 1/total, (total-sax)/total and total/total.
    // They share the denominator `total`, so two options are numerically equal
    // exactly when their numerators are equal. The only collision possible over
    // the declared ranges is sax === total - sax (i.e. 2*sax === total). Redraw
    // (bounded) until the four numerators are pairwise distinct.
    let totalMembers = 0, saxPlayers = 0;
    let tries = 0;
    do {
      totalMembers = getRandomInt(30, 60);
      saxPlayers = getRandomInt(5, Math.floor(totalMembers / 2));
      tries++;
    } while (
      tries < 50 &&
      (saxPlayers === 1 ||
        saxPlayers === totalMembers - saxPlayers ||
        saxPlayers === totalMembers ||
        totalMembers - saxPlayers === 1 ||
        totalMembers - saxPlayers === totalMembers)
    );

    const correctText = `\\frac{${saxPlayers}}{${totalMembers}}`;

    const optionsData = [
      { text: `\\frac{1}{${totalMembers}}`, isCorrect: false, reason: "the probability of selecting one particular member, rather than any of the saxophone players" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{${totalMembers - saxPlayers}}{${totalMembers}}`, isCorrect: false, reason: "the probability of selecting a member who does not play saxophone" },
      { text: `\\frac{${totalMembers}}{${totalMembers}}`, isCorrect: false, reason: "the result of treating every member as a saxophone player" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The probability is the number of favorable outcomes divided by the total number of outcomes. With ${saxPlayers} saxophone players out of ${totalMembers} total members, the probability of selecting a saxophone player is $\\frac{${saxPlayers}}{${totalMembers}}$. Choice ${incorrectOptions[0].letter} is incorrect; it is ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it is ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it is ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A band with $${totalMembers}$ members has $${saxPlayers}$ members who play saxophone. If one band member is selected at random, what is the probability of selecting a band member who plays saxophone?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
