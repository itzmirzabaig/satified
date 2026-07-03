import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 665
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base cost, hourly rate, hours threshold, total]
 * - Difficulty factors: [Piecewise cost modeling, correct equation setup]
 * - Distractor patterns: [A multiplies base by (t-thr), B uses thr*t, D uses thr*t in wrong place]
 * - Constraints: [Total = Base + Rate*(t - thr) for t > thr]
 * - Question type: [Multiple Choice Text]
 */

export const generator_665 = {
  metadata: {
    id: "665",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values
    const baseCost = getRandomInt(500, 1200);
    const hourlyRate = getRandomInt(30, 80);
    const thresholdHours = getRandomInt(2, 4);
    const extraHours = getRandomInt(2, 6);
    const totalCost = baseCost + hourlyRate * extraHours;

    // Math expressions live inside $...$; every currency amount uses \$ so no
    // bare $ can pair with a math delimiter.
    const correctText = `$${baseCost} + ${hourlyRate}(t - ${thresholdHours}) = ${totalCost}$`;
    const optionsData = [
      { text: `$${baseCost}(t - ${thresholdHours}) + ${hourlyRate}t = ${totalCost}$`, isCorrect: false },
      { text: `$${baseCost}(${thresholdHours}t) + ${hourlyRate}t = ${totalCost}$`, isCorrect: false },
      { text: `$${baseCost} + ${hourlyRate}(t - ${thresholdHours}) = ${totalCost}$`, isCorrect: true },
      { text: `$${baseCost} + ${hourlyRate}(${thresholdHours}t) = ${totalCost}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    // Context
    const contexts = [
      ["fishing boat", "rent", "hour"],
      ["construction equipment", "rent", "hour"],
      ["party venue", "rent", "hour"]
    ];
    const [item, verb, timeUnit] = getRandomElement(contexts);
    const timeUnits = `${timeUnit}s`;

    return {
      questionText: `The cost to ${verb} a ${item} from a certain company is \\$${baseCost} for the first ${thresholdHours} ${timeUnits} and an additional \\$${hourlyRate} per ${timeUnit} for each ${timeUnit} after the first ${thresholdHours} ${timeUnits}. If the total cost to ${verb} the ${item} for \\(t\\) ${timeUnits}, where \\(t > ${thresholdHours}\\), is \\$${totalCost}, which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The cost consists of a flat fee of \\$${baseCost} for the first ${thresholdHours} ${timeUnits} plus \\$${hourlyRate} for each additional ${timeUnit}. If \\(t\\) represents the total number of ${timeUnits}, then \\(t - ${thresholdHours}\\) represents the number of additional ${timeUnits}. Multiplying the additional ${timeUnits} by the rate and adding the flat fee gives the total cost, so the equation is \\(${baseCost} + ${hourlyRate}(t - ${thresholdHours}) = ${totalCost}\\). The other choices misplace the base fee or multiply it by the time, which does not match the described pricing.`
    };
  }
};
