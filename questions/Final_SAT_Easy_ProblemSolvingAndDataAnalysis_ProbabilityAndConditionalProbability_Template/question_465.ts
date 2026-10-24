import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 465
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table values 2-9, totals 14-80]
 * - Difficulty factors: [Reading three-way table, marginal probability]
 * - Distractor patterns: [A: single-cell numerator, B: wrong margin (grade), D: other mascot]
 * - Constraints: [4 mascots × 3 grades, all totals must be consistent]
 * - Question type: [Three-way Table → HTML Table]
 * - Figure generation: [Generate mascot voting data]
 */

export const generator_465 = {
  metadata: {
    id: "465",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    // The asked-about mascot and the grade used in one wrong choice are
    // chosen at random (it was always the lion and the sixth grade). All four
    // choices share the denominator, the grand total; the correct one used to
    // be reduced while the others were not, which gave it away. Redraw until
    // the four numerators differ.
    const mascots = ['Badger', 'Lion', 'Longhorn', 'Tiger'];
    const grades = ['sixth', 'seventh', 'eighth'];
    let counts: number[][] = [];
    let t = 0, o = 0, g = 0;
    let rowTot: number[] = [], colTot: number[] = [];
    do {
      counts = mascots.map(() => grades.map(() => getRandomInt(2, 12)));
      rowTot = counts.map(r => r.reduce((a, b) => a + b, 0));
      colTot = grades.map((_, j) => counts.reduce((a, r) => a + r[j], 0));
      t = getRandomInt(0, 3);
      o = (t + getRandomInt(1, 3)) % 4;
      g = getRandomInt(0, 2);
    } while (new Set([rowTot[t], counts[t][g], colTot[g], rowTot[o]]).size !== 4);
    const grandTotal = rowTot.reduce((a, b) => a + b, 0);

    const tableCode = `<table><thead><tr><th>Mascot</th><th>Sixth grade</th><th>Seventh grade</th><th>Eighth grade</th><th>Total</th></tr></thead><tbody>${mascots.map((m, i) => `<tr><td>${m}</td>${counts[i].map(c => `<td>${c}</td>`).join('')}<td>${rowTot[i]}</td></tr>`).join('')}<tr><td>Total</td>${colTot.map(c => `<td>${c}</td>`).join('')}<td>${grandTotal}</td></tr></tbody></table>`;

    const name = mascots[t].toLowerCase();
    const other = mascots[o].toLowerCase();
    const grade = grades[g];
    const f = (k: number) => `\\frac{${k}}{${grandTotal}}`;
    const correctText = f(rowTot[t]);

    const optionsData = [
      { text: f(counts[t][g]), isCorrect: false, reason: `$${f(counts[t][g])}$ counts only the ${counts[t][g]} ${grade} grade votes for the ${name} instead of all ${rowTot[t]} votes for the ${name}` },
      { text: f(colTot[g]), isCorrect: false, reason: `$${f(colTot[g])}$ is the probability of selecting a ${grade} grader, not a student who voted for the ${name}` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: f(rowTot[o]), isCorrect: false, reason: `$${f(rowTot[o])}$ is the probability of selecting a student who voted for the ${other}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const divisor = gcd(rowTot[t], grandTotal);
    const reduction = divisor > 1 ? `, which is equivalent to $\\frac{${rowTot[t] / divisor}}{${grandTotal / divisor}}$` : ``;
    const explanation = `Choice ${correctOption.letter} is correct. If one of these students is selected at random, the probability of selecting a student who voted for the ${name} is the number of votes for the ${name} divided by the total number of votes. The table shows ${rowTot[t]} votes for the ${name} out of ${grandTotal} votes. Therefore, the probability is $${correctText}$${reduction}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The students in the sixth, seventh, and eighth grades at a school each voted for one of four choices for a new school mascot. The table shows the results. If one of these students is selected at random, what is the probability of selecting a student who voted for the ${name}?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
