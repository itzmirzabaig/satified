import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1dcea480
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [60 marbles, 0.35 probability]
 * - Difficulty factors: [Reverse probability - find count from probability]
 * - Distractor patterns: [B: wrong calc, C: confuses prob with %, D: wrong calc]
 * - Constraints: [Must result in integer count]
 * - Question type: [No figure → Integer options]
 * - Figure generation: [None]
 */

export const generator_1dcea480 = {
  metadata: {
    // id: "1dcea480",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const totalMarbles = getRandomInt(40, 80);
    const probabilityOptions = [0.25, 0.3, 0.35, 0.4, 0.45, 0.5];
    const selectedProb = probabilityOptions[getRandomInt(0, probabilityOptions.length - 1)];
    const blueMarbles = Math.round(totalMarbles * selectedProb);

    const correctText = blueMarbles.toString();

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: (blueMarbles + getRandomInt(3, 8)).toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: Math.round(selectedProb * 100).toString(), isCorrect: false, reason: "confuses the probability with a percentage of 100" },
      { text: (totalMarbles - blueMarbles).toString(), isCorrect: false, reason: "results from finding the non-blue marbles instead" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Using the formula $P = \\frac{\\text{count}}{\\text{total}}$, we have $${selectedProb} = \\frac{x}{${totalMarbles}}$. Solving: $x = ${selectedProb} \\times ${totalMarbles} = ${blueMarbles}$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A bag contains a total of $${totalMarbles}$ marbles. A marble is to be chosen at random from the bag. If the probability that a blue marble will be chosen is $${selectedProb}$, how many marbles in the bag are blue?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: c943acba
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [7 houses, 2 blue]
 * - Difficulty factors: [Simple probability from text]
 * - Distractor patterns: [A: 1/7 (1 blue), C: 5/7 (not blue), D: 1 (all blue)]
 * - Constraints: [Simple fraction]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */