import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e1391dd6
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth (Moore's Law)
 * - Number ranges: [startYear: 1980-1990, initialTransistors: 200000-300000]
 * - Difficulty: Medium - requires understanding doubling time
 */

export const generator_e1391dd6 = {
  metadata: {
    // id: "e1391dd6",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const startYear = getRandomInt(1980, 1990);
    const initialTransistors = getRandomInt(200, 300) * 1000;
    const doublingPeriod = 2;
    const doublingsNeeded = getRandomInt(2, 4);
    const targetTransistors = initialTransistors * Math.pow(2, doublingsNeeded);
    const yearsNeeded = doublingsNeeded * doublingPeriod;
    const targetYear = startYear + yearsNeeded;

    const questionText = `According to Moore's law, the number of transistors included on microprocessors doubles every ${doublingPeriod} years. In $${startYear}$, a microprocessor was introduced that had $${initialTransistors.toLocaleString()}$ transistors. Based on this information, in which of the following years does Moore's law estimate the number of transistors to reach $${(targetTransistors / 1000000).toFixed(1)}$ million?`;

    const correctAnswer = targetYear.toString();

    const optionsData = [
      { text: (targetYear - doublingPeriod).toString(), isCorrect: false, reason: "only accounts for one fewer doubling period" },
      { text: targetYear.toString(), isCorrect: true },
      { text: (targetYear + doublingPeriod).toString(), isCorrect: false, reason: "adds an extra doubling period" },
      { text: (targetYear + 5).toString(), isCorrect: false, reason: "miscalculates the number of years needed" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer,
      explanation: `Choice ${correctLetter} is correct. Starting with $${initialTransistors.toLocaleString()}$ transistors in $${startYear}$: After ${doublingsNeeded} doubling periods (${yearsNeeded} years), the count doubles ${doublingsNeeded} times to reach $${targetTransistors.toLocaleString()}$ in $${targetYear}$.`
    };
  }
};

/**
 * Question ID: 802549ac
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 2-4, b: 3-5, c: 8-15]
 * - Difficulty factors: [Expanding binomials, simplifying, linear solution]
 */
