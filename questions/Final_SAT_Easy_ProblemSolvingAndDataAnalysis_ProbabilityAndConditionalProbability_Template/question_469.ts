import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 469
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [119, 3, 35, total 157]
 * - Difficulty factors: [Frequency table, probability of rare category]
 * - Distractor patterns: [B: P(color Z), C: P(color X), D: P(not color Y)]
 * - Constraints: [One category much larger than others]
 * - Question type: [Frequency Table → HTML Table]
 * - Figure generation: [Generate gemstone color distribution]
 */

export const generator_469 = {
  metadata: {
    id: "469",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // The stem used to read "Each of gemstones can be classified as one of
    // three classifications," with the number missing. The asked-about color
    // is now chosen at random (it was always Y). Wrong choices: the other two
    // colors and "not the asked-about color." Redraw until the four
    // numerators differ.
    let counts: number[] = [];
    let totalGems = 0, t = 0;
    do {
      counts = [getRandomInt(100, 140), getRandomInt(2, 6), getRandomInt(25, 45)];
      totalGems = counts[0] + counts[1] + counts[2];
      t = getRandomInt(0, 2);
    } while (new Set([...counts, totalGems - counts[t]]).size < 4);

    const names = ['X', 'Y', 'Z'];
    const tableCode = `<table><thead><tr><th>Classification</th><th>Frequency</th></tr></thead><tbody>${names.map((n, i) => `<tr><td>color ${n}</td><td>${counts[i]}</td></tr>`).join('')}</tbody></table>`;

    const f = (k: number) => `\\frac{${k}}{${totalGems}}`;
    const target = names[t];
    const correctText = f(counts[t]);

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      ...[0, 1, 2].filter(i => i !== t).map(i => ({ text: f(counts[i]), isCorrect: false, reason: `$${f(counts[i])}$ is the probability of selecting a gemstone of color ${names[i]}` })),
      { text: f(totalGems - counts[t]), isCorrect: false, reason: `$${f(totalGems - counts[t])}$ is the probability of selecting a gemstone that is not color ${target}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The table shows ${counts[t]} gemstones of color ${target} out of ${totalGems} gemstones in all. So the probability of selecting a gemstone of color ${target} is $${correctText}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `Each of ${totalGems} gemstones is classified as one of three colors, as shown in the frequency table. If one of the gemstones is selected at random, what is the probability of selecting a gemstone of color ${target}?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
