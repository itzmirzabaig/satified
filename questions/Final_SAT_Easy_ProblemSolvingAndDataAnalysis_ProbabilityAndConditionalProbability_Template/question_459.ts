import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 459
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [4, 6, 10, 5 - small integers]
 * - Difficulty factors: [Frequency table reading, basic probability calculation]
 * - Distractor patterns: [A: 0.10 (impossible count), C: 0.60 (wrong count), D: 0.67 (impossible count)]
 * - Constraints: [4 categories, total sums to reasonable number, decimal answers]
 * - Question type: [Frequency Table → HTML Table with decimal options]
 * - Figure generation: [Generate voice type distribution]
 */

export const generator_459 = {
  metadata: {
    id: "459",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The four options are P(baritone) [correct] and the "picked the wrong
    // voice type" probabilities P(countertenor), P(tenor), P(bass). Each rounds
    // to 2 decimals, so a collision can only come from two counts rounding to
    // the same value. Redraw (bounded) until the four rounded strings are all
    // distinct — this guarantees no DUP_OPTIONS for any draw.
    let countertenor = getRandomInt(2, 8);
    let tenor = getRandomInt(4, 10);
    let baritone = getRandomInt(8, 15);
    let bass = getRandomInt(3, 8);
    let totalSingers = countertenor + tenor + baritone + bass;

    const asProb = (n: number, total: number) => (n / total).toFixed(2);
    let tries = 0;
    while (tries++ < 50) {
      totalSingers = countertenor + tenor + baritone + bass;
      const probs = [
        asProb(baritone, totalSingers),
        asProb(countertenor, totalSingers),
        asProb(tenor, totalSingers),
        asProb(bass, totalSingers),
      ];
      if (new Set(probs).size === 4) break;
      countertenor = getRandomInt(2, 8);
      tenor = getRandomInt(4, 10);
      baritone = getRandomInt(8, 15);
      bass = getRandomInt(3, 8);
    }
    totalSingers = countertenor + tenor + baritone + bass;

    const tableCode = `<table><thead><tr><th>Voice type</th><th>Number of singers</th></tr></thead><tbody><tr><td>Countertenor</td><td>${countertenor}</td></tr><tr><td>Tenor</td><td>${tenor}</td></tr><tr><td>Baritone</td><td>${baritone}</td></tr><tr><td>Bass</td><td>${bass}</td></tr></tbody></table>`;

    const correctText = asProb(baritone, totalSingers);

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: asProb(countertenor, totalSingers), isCorrect: false, reason: "uses the number of countertenors instead of the number of baritones" },
      { text: asProb(tenor, totalSingers), isCorrect: false, reason: "uses the number of tenors instead of the number of baritones" },
      { text: asProb(bass, totalSingers), isCorrect: false, reason: "uses the number of basses instead of the number of baritones" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The probability is found by dividing the number of baritone singers by the total number of men registered for singing lessons. There are ${baritone} baritones out of ${totalSingers} total singers, so the probability is $\\frac{${baritone}}{${totalSingers}} = ${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A total of ${totalSingers} men registered for singing lessons. The frequency table shows how many of these singers have certain voice types. If one of these singers is selected at random, what is the probability he is a baritone?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
