import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 79201024
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [45 members, 11 saxophone]
 * - Difficulty factors: [Basic probability from text description]
 * - Distractor patterns: [A: 1/total, C: complementary, D: 1]
 * - Constraints: [Simple fraction, no reduction issues]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */

export const generator_79201024 = {
  metadata: {
    // id: "79201024",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const totalMembers = getRandomInt(30, 60);
    const saxPlayers = getRandomInt(5, Math.floor(totalMembers / 2));

    const correctText = `\\frac{${saxPlayers}}{${totalMembers}}`;

    const optionsData = [
      { text: `\\frac{1}{${totalMembers}}`, isCorrect: false, reason: "may result from conceptual or calculation errors" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{${totalMembers - saxPlayers}}{${totalMembers}}`, isCorrect: false, reason: "probability of selecting a member who does not play saxophone" },
      { text: `\\frac{${totalMembers}}{${totalMembers}}`, isCorrect: false, reason: "may result from conceptual or calculation errors" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The probability is the ratio of favorable outcomes to total outcomes. With ${saxPlayers} saxophone players out of ${totalMembers} total members, the probability is $\\frac{${saxPlayers}}{${totalMembers}}$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A band with $${totalMembers}$ members has $${saxPlayers}$ members who play saxophone. If one band member is selected at random, what is the probability of selecting a band member who plays saxophone?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 12dbe3de
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1000 players, 4 defective]
 * - Difficulty factors: [Decimal probability, small fraction to decimal conversion]
 * - Distractor patterns: [B: 4/100, C: 4/10, D: 4 (the count itself)]
 * - Constraints: [Must result in 0.004]
 * - Question type: [No figure → Decimal options]
 * - Figure generation: [None]
 */