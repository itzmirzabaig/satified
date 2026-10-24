import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 439
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total surveyed, doctor %, Internet %]
 * - Difficulty factors: [Table reading, summing two percentages, applying to total]
 * - Distractor patterns: [doctor only, doctor+magazines, doctor+Internet+magazines]
 * - Constraints: [Must use table data; table sums to 100%]
 * - Question type: [Table -> Multiple Choice Text]
 * - Figure generation: [HTML Table]
 *
 * FIXED:
 * - Reasons were double-quoted strings, so ${...} leaked verbatim (TEMPLATE_LEFTOVER)
 *   and produced odd unescaped-$ counts (TEX_UNBALANCED). Rebuilt as template
 *   literals computed from live variables.
 * - Redesigned distractor percentages to {doctor, doctor+9, doctor+internet,
 *   doctor+internet+9}; these are pairwise distinct in percent for every draw,
 *   and with total >= 800 each 1% gap (>= 8) survives rounding, so no numeric
 *   DUP_OPTIONS is possible.
 * - Ranges narrowed so the table percentages sum to exactly 100.
 */

export const generator_439 = {
  metadata: {
    id: "439",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Ranges chosen so the table sums to exactly 100% and every distractor
    // percent stays <= 100. doctor in [52,60], internet in [10,16].
    // A multiple of 100, so every percent of it is a whole number. It used
    // to be any number from 800 to 1500, and the rounded answers were wrong
    // (67% of 1375 is 921.25, not 921).
    const totalSurveyed = 100 * getRandomInt(8, 15);
    const fmt = (n: number) => n.toLocaleString('en-US');
    const doctorPct = getRandomInt(52, 60);
    const internetPct = getRandomInt(10, 16);
    const magazinesPct = 9;
    const pharmacyPct = 6;
    const televisionPct = 2;
    // Balancer row keeps the whole table at 100%.
    const otherPct = 100 - doctorPct - internetPct - magazinesPct - pharmacyPct - televisionPct;

    const combinedPct = doctorPct + internetPct;
    const result = combinedPct * totalSurveyed / 100;

    const tableCode = `
<table>
  <thead>
    <tr>
      <th>Source</th>
      <th>Percent of those surveyed</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Doctor</td><td>${doctorPct}%</td></tr>
    <tr><td>Internet</td><td>${internetPct}%</td></tr>
    <tr><td>Magazines/brochures</td><td>${magazinesPct}%</td></tr>
    <tr><td>Pharmacy</td><td>${pharmacyPct}%</td></tr>
    <tr><td>Television</td><td>${televisionPct}%</td></tr>
    <tr><td>Other/none of the above</td><td>${otherPct}%</td></tr>
  </tbody>
</table>`;

    // Distractor percentages, all provably distinct from each other and from
    // combinedPct across the declared ranges (internet >= 10 forces every gap
    // to be at least 1 percentage point).
    const doctorOnlyPct = doctorPct;                          // forgot to add Internet
    const doctorMagsPct = doctorPct + magazinesPct;           // wrong pair (doctor OR magazines)
    const threeSourcePct = doctorPct + internetPct + magazinesPct; // added an extra source

    const doctorOnly = doctorOnlyPct * totalSurveyed / 100;
    const doctorMags = doctorMagsPct * totalSurveyed / 100;
    const threeSource = threeSourcePct * totalSurveyed / 100;

    const optionsData = [
      { text: fmt(doctorOnly), isCorrect: false, reason: `${fmt(doctorOnly)} is the number who get most of their medical information from a doctor only, ${doctorOnlyPct}% of ${fmt(totalSurveyed)}; the Internet group must be included` },
      { text: fmt(doctorMags), isCorrect: false, reason: `${fmt(doctorMags)} is the number who get most of their medical information from either a doctor or magazines/brochures, ${doctorMagsPct}% of ${fmt(totalSurveyed)}` },
      { text: fmt(result), isCorrect: true, reason: '' },
      { text: fmt(threeSource), isCorrect: false, reason: `${fmt(threeSource)} is the number who get most of their medical information from a doctor, the Internet, or magazines/brochures, ${threeSourcePct}% of ${fmt(totalSurveyed)}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The table shows a summary of ${fmt(totalSurveyed)} responses to a survey question. Based on the table, how many of those surveyed get most of their medical information from either a doctor or the Internet?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: fmt(result),
      explanation: `Choice ${correctOption.letter} is correct. According to the table, ${doctorPct}% of those surveyed get most of their medical information from a doctor and ${internetPct}% get it from the Internet. Together, that is ${doctorPct}% + ${internetPct}%, or ${combinedPct}%, of the ${fmt(totalSurveyed)} people surveyed, which is $${combinedPct / 100} \\times ${totalSurveyed} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
