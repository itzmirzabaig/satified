import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 472
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [7 houses, 2 blue]
 * - Difficulty factors: [Simple probability from text]
 * - Distractor patterns: [A: 1/7 (1 blue), C: 5/7 (not blue), D: 1 (all blue)]
 * - Constraints: [Simple fraction]
 * - Question type: [No figure → Text options]
 * - Figure generation: [None]
 */

export const generator_472 = {
  metadata: {
    id: "472",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    // Every choice is in lowest terms; the correct one used to be the only
    // reduced fraction, which gave it away. Wrong choices: not blue, blue
    // compared with not blue, and 1 over the number of houses (the old
    // fourth choice was total/total). Redraw until the values differ.
    const frac = (p: number, q: number) => {
      const g = gcd(p, q);
      return q / g === 1 ? `${p / g}` : `\\frac{${p / g}}{${q / g}}`;
    };
    let totalHouses = 0, blueHouses = 0, nonBlueHouses = 0;
    do {
      totalHouses = getRandomInt(5, 12);
      blueHouses = getRandomInt(2, Math.ceil(totalHouses / 2) - 1);
      nonBlueHouses = totalHouses - blueHouses;
    } while (new Set([blueHouses / totalHouses, nonBlueHouses / totalHouses, blueHouses / nonBlueHouses, 1 / totalHouses].map(v => v.toFixed(9))).size < 4);

    const correctText = frac(blueHouses, totalHouses);
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: frac(nonBlueHouses, totalHouses), isCorrect: false, reason: `$${frac(nonBlueHouses, totalHouses)}$ is the probability of selecting a house that is not blue, since ${nonBlueHouses} of the ${totalHouses} houses are not blue` },
      { text: frac(blueHouses, nonBlueHouses), isCorrect: false, reason: `$${frac(blueHouses, nonBlueHouses)}$ compares the ${blueHouses} blue houses to the ${nonBlueHouses} houses that are not blue; the denominator must be all ${totalHouses} houses` },
      { text: frac(1, totalHouses), isCorrect: false, reason: `$${frac(1, totalHouses)}$ is the probability of selecting one particular house, not any of the ${blueHouses} blue houses` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const g = gcd(blueHouses, totalHouses);
    const explanation = `Choice ${correctOption.letter} is correct. There are ${blueHouses} blue houses out of ${totalHouses} houses, so the probability of selecting a blue house is $\\frac{${blueHouses}}{${totalHouses}}$${g > 1 ? `, which is equivalent to $${correctText}$` : ''}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `On a street with ${totalHouses} houses, ${blueHouses} houses are blue. If a house from this street is selected at random, what is the probability of selecting a house that is blue?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
