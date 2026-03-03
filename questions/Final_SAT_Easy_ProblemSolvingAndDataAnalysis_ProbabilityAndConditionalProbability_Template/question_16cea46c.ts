import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 16cea46c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [4, 6, 10, 5 - small integers]
 * - Difficulty factors: [Frequency table reading, basic probability calculation]
 * - Distractor patterns: [A: 0.10 (impossible count), C: 0.60 (wrong count), D: 0.67 (impossible count)]
 * - Constraints: [4 categories, total sums to reasonable number, decimal answers]
 * - Question type: [Frequency Table → HTML Table with decimal options]
 * - Figure generation: [Generate voice type distribution]
 */

export const generator_16cea46c = {
  metadata: {
    // id: "16cea46c",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const countertenor = getRandomInt(2, 8);
    const tenor = getRandomInt(4, 10);
    const baritone = getRandomInt(8, 15);
    const bass = getRandomInt(3, 8);
    const totalSingers = countertenor + tenor + baritone + bass;

    const tableCode = `<table><thead><tr><th>Voice type</th><th>Number of singers</th></tr></thead><tbody><tr><td>Countertenor</td><td>${countertenor}</td></tr><tr><td>Tenor</td><td>${tenor}</td></tr><tr><td>Baritone</td><td>${baritone}</td></tr><tr><td>Bass</td><td>${bass}</td></tr></tbody></table>`;

    const probability = baritone / totalSingers;
    const correctText = probability.toFixed(2);

    const distractor1 = (countertenor / totalSingers).toFixed(2);
    const distractor2 = ((baritone + 5) / totalSingers).toFixed(2);
    const distractor3 = ((baritone * 1.67) / totalSingers).toFixed(2);

    const optionsData = [
      { text: distractor1, isCorrect: false, reason: "would correspond to an impossible fractional count of singers" },
      { text: correctText, isCorrect: true },
      { text: distractor2, isCorrect: false, reason: "would mean there are more baritones than actually exist" },
      { text: distractor3, isCorrect: false, reason: "would mean an impossible fractional number of baritones" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The probability is calculated by dividing the number of baritone singers by the total number of men registered for singing lessons. There are $${baritone}$ baritones out of $${totalSingers}$ total singers, so the probability is $\\frac{${baritone}}{${totalSingers}} = ${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A total of $${totalSingers}$ men registered for singing lessons. The frequency table shows how many of these singers have certain voice types. If one of these singers is selected at random, what is the probability he is a baritone?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: b680e76d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1000 total, values 200-300 range]
 * - Difficulty factors: [Two-way table completion, missing value calculation]
 * - Distractor patterns: [A: 109 (wrong calculation), C: 468 (adds instead of subtracts), D: 688 (double adds)]
 * - Constraints: [Must sum to total, realistic gender split]
 * - Question type: [Incomplete Two-way Table → HTML Table]
 * - Figure generation: [Generate complete consistent table, ask for missing value]
 */