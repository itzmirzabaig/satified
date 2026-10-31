import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 475
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [8 planets, 4 rocky]
 * - Difficulty factors: [Simple probability, but distractors test understanding]
 * - Distractor patterns: [A: 1/8 (1 rocky), B: 1/4 (2 rocky), D: 2 (flipped fraction)]
 * - Constraints: [Simple fraction reduction]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */

export const generator_475 = {
  metadata: {
    id: "475",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // The favorable group is targetCount out of totalCount, where
    // totalCount = targetCount * ratio, so the reduced probability is 1/ratio.
    const ratio = getRandomInt(2, 5);
    const targetCount = getRandomInt(2, 6);
    const totalCount = targetCount * ratio;

    // Correct probability targetCount/totalCount reduces to 1/ratio.
    const correctText = `\\frac{1}{${ratio}}`;

    // Distractors, all provably distinct from the correct answer and from
    // each other across ratio in [2,5], targetCount in [2,6]:
    //  - flipped ratio: an integer >= 2 (total / target)         -> never a unit fraction
    //  - 1/totalCount: only one favorable outcome                -> totalCount = target*ratio > ratio
    //  - with : without, target/(total - target) = 1/(ratio - 1)  -> differs from 1/ratio and 1/totalCount
    //    (it replaced 1/(ratio + 1), "a denominator one more than the
    //    correct value," which no likely slip produces)
    const without = totalCount - targetCount;
    const ratioText = ratio - 1 === 1 ? '1' : `\\frac{1}{${ratio - 1}}`;
    const optionsData = [
      { text: `\\frac{1}{${totalCount}}`, isCorrect: false, reason: `$\\frac{1}{${totalCount}}$ is the probability of selecting one particular item, not any of the ${targetCount} items with the characteristic` },
      { text: ratioText, isCorrect: false, reason: `$${ratioText}$ compares the ${targetCount} items with the characteristic to the ${without} items without it, $\\frac{${targetCount}}{${without}}$; the denominator must be all ${totalCount} items` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: ratio.toString(), isCorrect: false, reason: `${ratio} is the total number of items divided by the number with the characteristic, $\\frac{${totalCount}}{${targetCount}}$, which is the reverse of the probability` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. If one of these items is selected at random, the probability is the number with the characteristic divided by the total number. There are ${targetCount} with the characteristic out of ${totalCount} total, giving $\\frac{${targetCount}}{${totalCount}} = \\frac{1}{${ratio}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `Of the ${totalCount} items in a group, ${targetCount} have a certain characteristic. If one item is selected at random from the group, what is the probability of selecting an item with that characteristic?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
