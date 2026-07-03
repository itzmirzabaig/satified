import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 773
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max bushes: 164, ratio: 3]
 * - Difficulty factors: [System setup from word problem, constraint translation]
 * - Distractor patterns: [wrong inequality sign on total, reversed ratio]
 * - Constraints: [a + b <= maxTotal, a <= ratio*b]
 * - Question type: [Word Problem -> Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_773 = {
  metadata: {
    id: "773",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES).
    const maxTotal = getRandomInt(100, 200);
    const ratio = getRandomInt(2, 5); // "at most ratio times"

    const bush1 = "azaleas";
    const bush2 = "boxwoods";

    // STEP 2: Build the four systems. The correct one is a + b <= maxTotal
    // and a <= ratio*b. Distractors flip the total's inequality sign and/or
    // reverse the ratio (written as b <= ratio*a so no "$<digit>" appears).
    // Each option carries its own reason so the explanation is shuffle-safe.
    const totalLE = `$a + b \\leq ${maxTotal}$`;
    const totalGE = `$a + b \\geq ${maxTotal}$`;
    const ratioOK = `$a \\leq ${ratio}b$`;      // azaleas at most ratio times boxwoods
    const ratioBad = `$b \\leq ${ratio}a$`;     // reversed relationship

    const optionsData = [
      { text: `${totalGE}\n${ratioBad}`, isCorrect: false,
        reason: `uses $\\geq$ for the total, meaning at least ${maxTotal} bushes, and reverses the ratio` },
      { text: `${totalGE}\n${ratioOK}`, isCorrect: false,
        reason: `uses $\\geq$ for the total, meaning at least ${maxTotal} bushes, rather than no more than ${maxTotal}` },
      { text: `${totalLE}\n${ratioBad}`, isCorrect: false,
        reason: `reverses the ratio, making the number of boxwoods at most ${ratio} times the number of azaleas` },
      { text: `${totalLE}\n${ratioOK}`, isCorrect: true, reason: '' },
    ];

    // STEP 3: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctText = correctOption.text;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 4: Build explanation from live variables and per-option reasons.
    const distractorSentences = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`)
      .join(' ');

    const explanation = `Choice ${correctOption.letter} is correct. There will be no more than ${maxTotal} total bushes, which is $a + b \\leq ${maxTotal}$. The number of ${bush1} will be at most ${ratio} times the number of ${bush2}, which is $a \\leq ${ratio}b$. ${distractorSentences}`;

    // STEP 5: Return question data.
    return {
      questionText: `A city employee will plant two types of bushes, ${bush1} and ${bush2}, in a park. There will be no more than ${maxTotal} total bushes planted, and the number of ${bush1} planted will be at most ${ratio} times the number of ${bush2} planted. Which of the following systems of inequalities best represents this situation, where $a$ is the number of ${bush1} that will be planted and $b$ is the number of ${bush2} that will be planted?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
