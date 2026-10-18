import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 188
 *
 * ORIGINAL ANALYSIS: [Substitution into decimal linear model]
 *
 * FIX NOTES:
 * The answer was Math.round(rate * time), so y = 0.2(46) was given as 9 (it
 * is 9.2), and the explanation stated 0.2 x 46 = 9. Rates and times are now
 * chosen so every value is exact, the "result - 1" distractor (labeled
 * "calculation error") is now the misplaced decimal error, and the stem is a
 * full question.
 */

export const generator_188 = {
  metadata: {
    id: "188",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // rate in {0.2, 0.4, 0.5} and time a multiple of 10, so rate * time and
    // time / rate are whole numbers (the old version rounded 0.2 * 46 to 9).
    // Choices are distinct: rate * t < t < 10 * rate * t, and t / rate
    // (5t, 2.5t or 2t) never equals 10 * rate * t (2t, 4t or 5t) for the same rate.
    const tenths = getRandomElement([2, 4, 5]);
    const rate = tenths / 10;
    const time = getRandomInt(2, 6) * 10;
    const result = (tenths * time) / 10;

    const optionsData = [
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: ((10 * time) / tenths).toString(), isCorrect: false, reason: `it results from dividing ${time} by ${rate} instead of multiplying` },
      { text: time.toString(), isCorrect: false, reason: `it is the number of minutes, $x$, not the number of pieces, $y$` },
      { text: (tenths * time).toString(), isCorrect: false, reason: `it results from multiplying ${time} by ${tenths} instead of by ${rate}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The equation $y = ${rate}x$ models the number of pieces of music, $y$, a student practices in $x$ minutes. According to the model, how many pieces of music does the student practice in ${time} minutes?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. Substituting ${time} for $x$ in the given equation yields $y = ${rate}(${time})$, or $y = ${result}$. ${shuffledOptions.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
