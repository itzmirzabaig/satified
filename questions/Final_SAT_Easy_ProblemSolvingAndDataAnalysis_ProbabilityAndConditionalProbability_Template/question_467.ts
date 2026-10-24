import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 467
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [igneous, metamorphic, sedimentary; total = sum]
 * - Difficulty factors: [Frequency table, basic probability with trick distractors]
 * - Distractor patterns: [ig/sed, ig/met, ig/(met+sed) instead of ig/total]
 * - Constraints: [Frequency table, calculate P(igneous) = igneous/total]
 * - Question type: [Frequency Table -> HTML Table]
 * - Figure generation: [Rock classification frequency table]
 */

export const generator_467 = {
  metadata: {
    id: "467",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // The asked-about classification is chosen at random (it was always
    // igneous). All four choices have that count as the numerator; the
    // denominators are the total (correct), each other count, and the number
    // of rocks not in the class. Redraw until the four denominators differ.
    const names = ['igneous', 'metamorphic', 'sedimentary'];
    let counts: number[] = [];
    let t = 0, totalRocks = 0;
    let dens: number[] = [];
    do {
      counts = [getRandomInt(8, 15), getRandomInt(25, 40), getRandomInt(20, 35)];
      totalRocks = counts[0] + counts[1] + counts[2];
      t = getRandomInt(0, 2);
      const o = [0, 1, 2].filter(i => i !== t);
      dens = [totalRocks, counts[o[0]], counts[o[1]], totalRocks - counts[t]];
    } while (new Set(dens).size < 4 || counts[t] === dens[1] || counts[t] === dens[2]);

    const tableCode = `<table><thead><tr><th>Classification</th><th>Frequency</th></tr></thead><tbody>${names.map((n, i) => `<tr><td>${n}</td><td>${counts[i]}</td></tr>`).join('')}</tbody></table>`;

    const name = names[t];
    const k = counts[t];
    const others = [0, 1, 2].filter(i => i !== t);
    const article = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
    const f = (d: number) => `\\frac{${k}}{${d}}`;
    const correctText = f(totalRocks);

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      ...others.map(i => ({ text: f(counts[i]), isCorrect: false, reason: `$${f(counts[i])}$ is the number of ${name} rocks divided by the number of ${names[i]} rocks, not by the total number of rocks` })),
      { text: f(totalRocks - k), isCorrect: false, reason: `$${f(totalRocks - k)}$ is the number of ${name} rocks divided by the number of rocks that are not ${name}, not by the total number of rocks` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The probability of selecting ${article(name)} ${name} rock is the number of ${name} rocks divided by the total number of rocks. From the table, there are ${k} ${name} rocks and ${totalRocks} rocks in all, so the probability is $${correctText}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The table shows the classification of every rock in a collection. If one of these rocks is selected at random, what is the probability of selecting a rock that is ${name}?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
