import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 43744269
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [altitude: 9500 to 5000, rate: 400 ft/min constant]
 * - Difficulty factors: [Recognizing constant rate = linear, decreasing = negative slope]
 * - Distractor patterns: [Exponential options (A,C), wrong direction (C,D)]
 * - Constraints: [Constant rate means linear, descending means decreasing]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

export const generator_43744269 = {

  metadata: {
    // id: "43744269",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const startAlt = getRandomInt(8000, 10000);
    const endAlt = getRandomInt(4000, 6000);
    const rate = getRandomInt(300, 500);

    const optionsData = [
      { text: "Decreasing exponential", isCorrect: false },
      { text: "Decreasing linear", isCorrect: true },
      { text: "Increasing exponential", isCorrect: false },
      { text: "Increasing linear", isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `An airplane descends from an altitude of $${startAlt}$ feet to $${endAlt}$ feet at a constant rate of $${rate}$ feet per minute. What type of function best models the relationship between the descending airplane's altitude and time?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "Decreasing linear",
      explanation: `Choice ${correctLetter} is correct. Since the airplane descends at a constant rate of ${rate} feet per minute, the relationship between altitude and time is linear. Since the airplane descends from ${startAlt} feet to ${endAlt} feet, the altitude is decreasing with time. Thus, the relationship is best modeled by a decreasing linear function. Choice ${incorrectOptions[0].letter} is incorrect because a constant rate of change indicates linear, not exponential. Choice ${incorrectOptions[1].letter} is incorrect because the altitude is decreasing, not increasing. Choice ${incorrectOptions[2].letter} is incorrect because the altitude is decreasing, not increasing, and the rate is constant (linear), not exponential.`
    };

  }

};

/**
 * Question ID: 9296553d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1, intercept: 6]
 * - Difficulty factors: [Identifying negative slope from scatterplot trend]
 * - Distractor patterns: [Wrong intercept sign (B), wrong slope magnitude and sign (C,D)]
 * - Constraints: [Negative slope, positive intercept around 6]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative trend and line of best fit]
 */