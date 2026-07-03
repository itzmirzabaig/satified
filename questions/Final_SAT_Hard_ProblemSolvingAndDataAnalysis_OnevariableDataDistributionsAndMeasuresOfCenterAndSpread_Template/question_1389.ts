import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1389
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [count employees, one-decimal mean, slightly lower new mean]
 * - Difficulty factors: [Working backwards from means to find individual value, careful with employee count]
 * - Distractor patterns: [change in mean, same-count assumption, off-by-a-few-years]
 * - Constraints: [Original total = count × mean, New total = (count-1) × newMean, difference is answer]
 * - Question type: [Text→Multiple Choice Text]
 */

export const generator_1389 = {
  metadata: {
    id: "1389",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // All arithmetic is done in integer tenths of a year so nothing ever
    // produces a floating-point artifact (e.g. 6.1000000000000005). Values are
    // divided by 10 only for display.
    const fmt = (tenths: number): string => {
      const whole = Math.trunc(tenths / 10);
      const frac = Math.abs(tenths % 10);
      return frac === 0 ? String(whole) : `${whole}.${frac}`;
    };

    let count = 20;
    let originalMean10 = 67;   // 6.7 years
    let newMean10 = 63;        // 6.3 years
    let years10 = 0;           // years worked by the employee who left (tenths)
    let dA10 = 0, dB10 = 0, dC10 = 0;

    let tries = 0;
    let ready = false;
    while (!ready && tries++ < 50) {
      count = getRandomInt(15, 25);
      originalMean10 = getRandomInt(50, 100);        // 5.0 – 10.0 years
      const drop10 = getRandomInt(2, 5);             // mean falls by 0.2 – 0.5
      newMean10 = originalMean10 - drop10;

      const originalTotal10 = originalMean10 * count;            // integer tenths
      const newTotal10 = newMean10 * (count - 1);                // integer tenths
      years10 = originalTotal10 - newTotal10;                    // integer tenths

      // Distractors (integer tenths):
      dA10 = drop10;                                             // just the change in mean
      dB10 = drop10 * count;                                     // used original count for the reduced group
      dC10 = years10 + getRandomInt(1, 5) * 10;                 // a few whole years too high

      const vals = [years10, dA10, dB10, dC10];
      const distinct = new Set(vals).size === 4;
      const positive = years10 > 0 && dA10 > 0 && dB10 > 0 && dC10 > 0;
      if (distinct && positive) ready = true;
    }

    if (!ready) {
      count = 20; originalMean10 = 67; newMean10 = 63;
      years10 = originalMean10 * count - newMean10 * (count - 1); // 152 -> 15.2
      dA10 = 4;                                                   // 0.4
      dB10 = 4 * count;                                           // 8.0
      dC10 = years10 + 30;                                        // 18.2
    }

    const originalTotal10 = originalMean10 * count;
    const newTotal10 = newMean10 * (count - 1);

    const answerText = fmt(years10);
    const optionsData = [
      { text: fmt(dA10), isCorrect: false, reason: "this is only the change in the mean, not the years worked by the employee who left" },
      { text: fmt(dB10), isCorrect: false, reason: "this assumes there were still the original number of employees after one left" },
      { text: fmt(dC10), isCorrect: false, reason: "this also comes from using the wrong employee count in the subtraction" },
      { text: answerText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The mean amount of time that the ${count} employees of a construction company have worked for the company is ${fmt(originalMean10)} years. After one of the employees leaves the company, the mean amount of time that the remaining employees have worked for the company is reduced to ${fmt(newMean10)} years. How many years did the employee who left the company work for the company?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: answerText,
      explanation: `Choice ${correctLetter} is correct. The total years worked by all ${count} employees is ${fmt(originalMean10)} × ${count} = ${fmt(originalTotal10)} years. After the employee left, the remaining ${count - 1} employees have worked ${fmt(newMean10)} × ${count - 1} = ${fmt(newTotal10)} years in total. Therefore, the employee who left had worked ${fmt(originalTotal10)} − ${fmt(newTotal10)} = ${answerText} years. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
