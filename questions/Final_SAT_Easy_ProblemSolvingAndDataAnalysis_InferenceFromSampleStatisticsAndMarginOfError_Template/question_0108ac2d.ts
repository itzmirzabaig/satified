import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 0108ac2d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [300 students, 38% percentage, 5.5% margin (decimal percentage)]
 * - Difficulty factors: [Margin of error interpretation, percentage interval calculation]
 * - Distractor patterns: A treats point estimate as exact, B claims greater than 38%, C is Correct interval, D confuses percentage with count
 * - Constraints: [Percentage must be exact, margin creates clean decimal bounds]
 * - Question type: [Margin of error interpretation→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

export const generator_0108ac2d = {
  metadata: {
    // id: "0108ac2d",
    assessment: "SAT",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sampleSize = getRandomInt(250, 350);
    const basePercent = getRandomInt(30, 45);
    const samplePercent = basePercent + 0.5;
    const marginWhole = getRandomInt(4, 7);
    const marginOfError = marginWhole + 0.5;
    const lowerBound = (samplePercent - marginOfError).toFixed(1);
    const upperBound = (samplePercent + marginOfError).toFixed(1);

    const institutionTypes = ["high school", "university", "college", "middle school"];
    const institution = getRandomElement(institutionTypes);
    const changeTypes = ["menu change", "schedule change", "policy change", "uniform policy"];
    const change = getRandomElement(changeTypes);
    const locationTypes = ["school cafeteria", "dining hall", "student center", "campus cafe"];
    const location = getRandomElement(locationTypes);

    const optionsData = [
      {
        text: `The percent of the students at the ${institution} who support a ${change} is ${samplePercent}%.`,
        isCorrect: false,
        reason: "treats the sample percentage as the exact population percentage"
      },
      {
        text: `The percent of the students at the ${institution} who support a ${change} is greater than ${samplePercent}%.`,
        isCorrect: false,
        reason: "incorrectly assumes the percentage must be greater than the estimate"
      },
      {
        text: `Plausible values of the percent of the students at the ${institution} who support a ${change} are between ${lowerBound}% and ${upperBound}%.`,
        isCorrect: true
      },
      {
        text: `Plausible values of the number of the students at the ${institution} who support a ${change} are between ${Math.round(sampleSize - 5)} and ${Math.round(sampleSize + 5)}.`,
        isCorrect: false,
        reason: "confuses the percentage interval with a count interval"
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. With an estimated ${samplePercent}% and margin of error of ${marginOfError}%, the plausible range is (${samplePercent} - ${marginOfError}) = ${lowerBound}% to (${samplePercent} + ${marginOfError}) = ${upperBound}%. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `At a large ${institution}, ${sampleSize} students were selected at random and were asked in a survey about a ${change} in the ${location}. All ${sampleSize} students completed the survey. It was estimated that ${samplePercent}% of the students were in support of a ${change}, with a margin of error of ${marginOfError}%. Which of the following is the best interpretation of the survey results?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 9691656
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [20 sample, 400 total, 16 successes (clean ratio 4/5)]
 * - Difficulty factors: [Proportion calculation with clean fraction]
 * - Distractor patterns: A is 4 (sample difference), B is Correct (400 × 4/5), C is 380 (total minus sample), D is 384 (total minus successes)
 * - Constraints: [Ratio should simplify to clean fraction for easy mental math]
 * - Question type: [Proportion→Multiple Choice Text]
 * - Figure generation: [None - calculation-based question]
 */