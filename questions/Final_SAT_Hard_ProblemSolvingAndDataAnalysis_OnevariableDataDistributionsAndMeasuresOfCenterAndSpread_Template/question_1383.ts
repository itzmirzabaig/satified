import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1383
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [count players, integer mean, lower mean after removing highest]
 * - Difficulty factors: [Working backwards from means to find total, then finding individual value]
 * - Distractor patterns: [difference in means, same-count assumption, mean-based miscalculation]
 * - Constraints: [Total = mean × count, highest = original total - new total]
 * - Question type: [Text→Multiple Choice Text]
 */

export const generator_1383 = {
  metadata: {
    id: "1383",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Integer means keep every derived quantity an exact integer (no float
    // artifacts). Guard the three distractors against colliding with the
    // answer or each other. Bounded retry (<=50).
    let originalCount = 8;
    let originalMean = 15;
    let newMean = 12;
    let highestScore = 0;
    let d1 = 0, d2 = 0, d3 = 0;

    let tries = 0;
    let ready = false;
    while (!ready && tries++ < 50) {
      originalCount = getRandomInt(6, 10);
      originalMean = getRandomInt(12, 20);
      newMean = getRandomInt(8, originalMean - 2);

      const originalTotal = originalMean * originalCount;      // integer
      const newTotal = newMean * (originalCount - 1);          // integer
      highestScore = originalTotal - newTotal;                 // integer

      // The highest score must exceed the reduced mean and stay realistic.
      if (highestScore <= newMean || highestScore > 50) continue;

      // Distractors (all integers):
      d1 = originalMean - newMean;                             // difference in means
      d2 = originalCount * (originalMean - newMean);           // used original count for reduced group
      d3 = highestScore - (originalMean - newMean);            // forgot to add back the mean shift

      // All four values must be mutually distinct.
      const vals = [highestScore, d1, d2, d3];
      const distinct = new Set(vals).size === 4;
      const positive = d1 > 0 && d2 > 0 && d3 > 0;
      if (distinct && positive) ready = true;
    }

    if (!ready) {
      // Deterministic fallback with distinct integer options.
      originalCount = 8; originalMean = 15; newMean = 12;
      const originalTotal = originalMean * originalCount; // 120
      const newTotal = newMean * (originalCount - 1);     // 84
      highestScore = originalTotal - newTotal;            // 36
      d1 = originalMean - newMean;                        // 3
      d2 = originalCount * (originalMean - newMean);      // 24
      d3 = highestScore - (originalMean - newMean);       // 33
    }

    const originalTotal = originalMean * originalCount;
    const newTotal = newMean * (originalCount - 1);

    const optionsData = [
      { text: String(d1), isCorrect: false, reason: "this is only the difference between the two means, not the removed score" },
      { text: String(d2), isCorrect: false, reason: "this uses the original number of players for the reduced group instead of one fewer" },
      { text: String(highestScore), isCorrect: true },
      { text: String(d3), isCorrect: false, reason: "this leaves out the points needed to raise the reduced group back to the original mean" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The mean score of ${originalCount} players in a basketball game was ${originalMean} points. If the highest individual score is removed, the mean score of the remaining ${originalCount - 1} players becomes ${newMean} points. What was the highest score?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: String(highestScore),
      explanation: `Choice ${correctLetter} is correct. The total points scored by all ${originalCount} players is ${originalMean} × ${originalCount} = ${originalTotal}. After removing the highest score, the remaining ${originalCount - 1} players scored ${newMean} × ${originalCount - 1} = ${newTotal} points in total. Therefore, the highest score was ${originalTotal} − ${newTotal} = ${highestScore} points. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
