import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 520
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [altitude: 9500 to 5000, rate: 400 ft/min constant]
 * - Difficulty factors: [Recognizing constant rate = linear, decreasing = negative slope]
 * - Distractor patterns: [Exponential options (A,C), wrong direction (C,D)]
 * - Constraints: [Constant rate means linear, descending means decreasing]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

export const generator_520 = {

  metadata: {
    id: "520",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    // Before: the wrong-choice reasons were assigned by shuffled position, so
    // "Decreasing exponential" could be rejected because "the altitude is
    // decreasing, not increasing" (false). Each choice now carries its own
    // reason. The airplane now either descends or climbs so the answer varies,
    // altitudes are round hundreds, and numbers of 1,000+ get commas.
    const climbing = getRandomInt(0, 1) === 1;
    const low = getRandomInt(40, 60) * 100;
    const high = getRandomInt(80, 100) * 100;
    const rate = getRandomInt(6, 10) * 50;
    const startAlt = climbing ? low : high;
    const endAlt = climbing ? high : low;
    const fmt = (n: number) => n.toLocaleString('en-US');
    const tex = (n: number) => fmt(n).replace(/,/g, '{,}');
    const verb = climbing ? 'climbs' : 'descends';
    const dir = climbing ? 'increasing' : 'decreasing';
    const otherDir = climbing ? 'decreasing' : 'increasing';

    const correctText = climbing ? 'Increasing linear' : 'Decreasing linear';
    const reasonFor = (text: string): string => {
      if (text === correctText) return '';
      const isLinear = text.endsWith('linear');
      const isIncreasing = text.startsWith('Increasing');
      const rightDir = isIncreasing === climbing;
      if (!isLinear && rightDir) {
        return `an exponential function changes by the same percent each minute, but the altitude changes by the same amount, ${fmt(rate)} feet, each minute, which is linear`;
      }
      if (isLinear && !rightDir) {
        return `the altitude is ${dir}, not ${otherDir}, as time passes because the airplane ${verb}`;
      }
      return `the altitude is ${dir}, not ${otherDir}, and it changes by a constant amount each minute, which is linear, not exponential`;
    };

    // Fixed SAT style order; the answer is B or D depending on the scenario.
    const optionsData = ['Decreasing exponential', 'Decreasing linear', 'Increasing exponential', 'Increasing linear']
      .map((text, index) => ({
        text,
        isCorrect: text === correctText,
        reason: reasonFor(text),
        letter: String.fromCharCode(65 + index)
      }));

    const correctOption = optionsData.find(o => o.isCorrect)!;
    const incorrectOptions = optionsData.filter(o => !o.isCorrect);

    return {
      questionText: `An airplane ${verb} from an altitude of $${tex(startAlt)}$ feet to $${tex(endAlt)}$ feet at a constant rate of $${rate}$ feet per minute. What type of function best models the relationship between the airplane's altitude and time?`,
      figureCode: null,
      options: optionsData.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The airplane ${verb} at a constant rate of ${rate} feet per minute, so its altitude changes by the same amount each minute. A constant rate of change means the relationship between altitude and time is linear. Since the altitude goes from ${fmt(startAlt)} feet to ${fmt(endAlt)} feet, the altitude is ${dir} as time passes. So the relationship is best modeled by ${climbing ? 'an increasing' : 'a decreasing'} linear function. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };

  }

};
