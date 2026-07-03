import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 668
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 17, rate: 1oz/4hrs, remaining: 6, answer: 44]
 * - Difficulty factors: [Rate problem, units conversion]
 * - Distractor patterns: [A forgets to scale by the rate, B uses remaining instead
 *   of burned, C uses the starting amount instead of the amount burned]
 * - Constraints: [(Initial - Remaining) × hoursPerOunce = Time]
 * - Question type: [Multiple Choice Text]
 */

export const generator_668 = {
  metadata: {
    id: "668",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // The candle loses 1 ounce every `rateDen` hours.
    //   burned = initial - remaining  (ounces gone)
    //   hours  = burned * rateDen     (correct answer, always an integer)
    let initial = 0, rateDen = 0, remaining = 0, burned = 0, hours = 0;
    let d1 = 0, d2 = 0, d3 = 0;
    let tries = 0;
    do {
      initial = getRandomInt(14, 25);
      rateDen = getRandomInt(3, 6);
      remaining = getRandomInt(3, Math.floor(initial / 2));
      burned = initial - remaining;          // >= ceil(initial/2) >= 7
      hours = burned * rateDen;

      d1 = burned;                            // forgot to multiply by the rate
      d2 = remaining * rateDen;               // used remaining instead of burned
      d3 = initial * rateDen;                 // used the starting amount
      tries++;
    } while (
      // require all four values pairwise distinct
      new Set([hours, d1, d2, d3]).size !== 4 && tries < 50
    );

    // Deterministic fallback (all four distinct: 33, 5, 27, 44 style is not
    // needed because the loop above converges quickly, but guard anyway).
    if (new Set([hours, d1, d2, d3]).size !== 4) {
      initial = 20; rateDen = 4; remaining = 5;
      burned = initial - remaining; hours = burned * rateDen; // 60
      d1 = burned; d2 = remaining * rateDen; d3 = initial * rateDen; // 15, 20, 80
    }

    const correctText = `$${hours}$`;
    const optionsData = [
      { text: `$${d1}$`, isCorrect: false },
      { text: `$${d2}$`, isCorrect: false },
      { text: `$${d3}$`, isCorrect: false },
      { text: `$${hours}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    return {
      questionText: `A candle is made of $${initial}$ ounces of wax. When the candle is burning, the amount of wax in the candle decreases by $1$ ounce every $${rateDen}$ hours. If $${remaining}$ ounces of wax remain in this candle, for how many hours has it been burning?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The candle started with $${initial}$ ounces and $${remaining}$ ounces remain, so $${initial} - ${remaining} = ${burned}$ ounces have burned away. The wax decreases by $1$ ounce every $${rateDen}$ hours, so the candle has been burning for $${burned} \\times ${rateDen} = ${hours}$ hours.`
    };
  }
};
