import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 5b8a8475
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-6]
 * - Difficulty factors: [Perpendicular lines have negative reciprocal slopes]
 * - Distractor patterns: [Using negative without reciprocal, using reciprocal without negative]
 * - Constraints: [Slope cannot be 0]
 * - Question type: [Conceptual → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_5b8a8475 = {
  metadata: {
    // id: "5b8a8475",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slopeK = getRandomInt(2, 6);
    const interceptK = getRandomInt(10, 30);

    const slopeJText = `-\\frac{1}{${slopeK}}`;
    const distractor1 = `-\\frac{1}{${slopeK * 4}}`;
    const distractor2 = `-\\frac{1}{${slopeK * 6}}`;
    const distractor3 = `-\\frac{1}{${slopeK * slopeK}}`;

    const optionsData = [
      { text: `$${slopeJText}$`, isCorrect: true },
      { text: `$${distractor1}$`, isCorrect: false, reason: "results from incorrect calculation of the reciprocal" },
      { text: `$${distractor2}$`, isCorrect: false, reason: "results from confusing the slope with the intercept" },
      { text: `$${distractor3}$`, isCorrect: false, reason: "results from using the square of the slope in the denominator" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Line $k$ is defined by $y = ${slopeK}x + ${interceptK}$. Line $j$ is perpendicular to line $k$ in the $xy$-plane. What is the slope of line $j$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${slopeJText}$`,
      explanation: `Choice ${correctLetter} is correct. Perpendicular lines have slopes that are negative reciprocals. Since line $k$ has slope ${slopeK}, line $j$ must have slope $-\\frac{1}{${slopeK}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: b52e5b6f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 100-300, vitamin D: 30-270]
 * - Difficulty factors: [Basic subtraction in context]
 * - Question type: [Word Problem → Multiple Choice Text]
 */