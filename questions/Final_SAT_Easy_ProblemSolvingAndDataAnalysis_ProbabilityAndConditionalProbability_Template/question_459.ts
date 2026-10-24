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

    // The asked-about voice type is chosen at random (it was always
    // baritone), and the stem asks for the nearest hundredth, since the
    // probabilities are rounded (15/31 is about 0.4839, not exactly 0.48).
    const types = [
      { one: 'countertenor', many: 'countertenors', n: countertenor },
      { one: 'tenor', many: 'tenors', n: tenor },
      { one: 'baritone', many: 'baritones', n: baritone },
      { one: 'bass', many: 'basses', n: bass }
    ];
    const target = types[getRandomInt(0, 3)];
    const article = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
    const correctText = asProb(target.n, totalSingers);
    // "=" when the hundredths value is exact, "≈" when it is rounded.
    const rel = (n: number) => ((n * 100) % totalSingers === 0 ? '=' : '\\approx');

    const optionsData = types.map(t => ({
      text: asProb(t.n, totalSingers),
      isCorrect: t === target,
      reason: t === target ? '' : `${asProb(t.n, totalSingers)} is the probability that the singer selected is ${article(t.one)} ${t.one}, since $\\frac{${t.n}}{${totalSingers}} ${rel(t.n)} ${asProb(t.n, totalSingers)}$`
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The probability is the number of ${target.many} divided by the total number of men registered for singing lessons. There are ${target.n} ${target.many} out of ${totalSingers} singers, so the probability is $\\frac{${target.n}}{${totalSingers}} ${rel(target.n)} ${correctText}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A total of ${totalSingers} men registered for singing lessons. The frequency table shows how many of these singers have certain voice types. If one of these singers is selected at random, what is the probability, to the nearest hundredth, that he is ${article(target.one)} ${target.one}?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
