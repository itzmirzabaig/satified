import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e5b5fbdd
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [8 planets, 4 rocky]
 * - Difficulty factors: [Simple probability, but distractors test understanding]
 * - Distractor patterns: [A: 1/8 (1 rocky), B: 1/4 (2 rocky), D: 2 (flipped fraction)]
 * - Constraints: [Simple fraction reduction]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */

export const generator_e5b5fbdd = {
  metadata: {
    // id: "e5b5fbdd",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const ratio = getRandomInt(2, 5);
    const rockyCount = getRandomInt(2, 6);
    const totalCount = rockyCount * ratio;

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(rockyCount, totalCount);
    const simplifiedNum = rockyCount / divisor;
    const simplifiedDen = totalCount / divisor;
    const correctText = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;

    const optionsData = [
      { text: `\\frac{1}{${totalCount}}`, isCorrect: false, reason: "represents the probability if only 1 of the items had the target property" },
      { text: `\\frac{1}{${Math.floor(totalCount/2)}}`, isCorrect: false, reason: "represents the probability if 2 of the items had the target property" },
      { text: correctText, isCorrect: true },
      { text: ratio.toString(), isCorrect: false, reason: "results from dividing the total by the target group instead of the other way around" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. If one of these items is selected at random, the probability is calculated by dividing the number with the target property by the total number. There are ${rockyCount} with the property out of ${totalCount} total, giving $\\frac{${rockyCount}}{${totalCount}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Of the $${totalCount}$ items in a group, $${rockyCount}$ have a certain characteristic. If one item is selected at random from the group, what is the probability of selecting an item with that characteristic?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 2905ded0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table with values 11-89, total 135]
 * - Difficulty factors: [Two-way table, marginal probability for age group]
 * - Distractor patterns: [A: P(<40), B: P(east), C: P(west)]
 * - Constraints: [Age vs location two-way table]
 * - Question type: [Two-way Table → HTML Table]
 * - Figure generation: [Generate age/location distribution]
 */