import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_c943acba = {
  metadata: {
    // id: "c943acba",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const totalHouses = getRandomInt(5, 12);
    const blueHouses = getRandomInt(2, Math.floor(totalHouses / 2));
    const nonBlueHouses = totalHouses - blueHouses;

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(blueHouses, totalHouses);
    const simplifiedNum = blueHouses / divisor;
    const simplifiedDen = totalHouses / divisor;
    const correctText = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;

    const optionsData = [
      { text: `\\frac{1}{${totalHouses}}`, isCorrect: false, reason: "probability if there was only 1 blue house" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{${nonBlueHouses}}{${totalHouses}}`, isCorrect: false, reason: "probability of selecting a house that is not blue" },
      { text: `\\frac{${totalHouses}}{${totalHouses}}`, isCorrect: false, reason: "100% certainty, which would only be correct if all houses were blue" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. With ${blueHouses} blue houses out of ${totalHouses} total, the probability is $\\frac{${blueHouses}}{${totalHouses}} = \\frac{${simplifiedNum}}{${simplifiedDen}}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this is the ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this is the ${incorrectOptions[2].reason}.`;

    return {
      questionText: `On a street with $${totalHouses}$ houses, $${blueHouses}$ houses are blue. If a house from this street is selected at random, what is the probability of selecting a house that is blue?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 0a99e5bb
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [3 numbers: -13, and two positives]
 * - Difficulty factors: [Data set, probability of negative]
 * - Distractor patterns: [A: 0 (none), B: 1/3 (positive), C: 2/3 (but should be 1/3?), D: 1 (all)]
 * - Wait: Original says correct is B (1/3) for negative, but only -13 is negative... let me re-read
 * - Actually: If data set has -13 as ONLY negative, then P(negative) = 1/3. Correct!
 * - Constraints: [1 negative, 2 positives]
 * - Question type: [Data set described in text → No figure needed]
 * - Figure generation: [None - described in text]
 */