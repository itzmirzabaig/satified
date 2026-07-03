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
    const totalSurveyed = getRandomInt(800, 1500);
    const doctorPct = getRandomInt(52, 60);
    const internetPct = getRandomInt(10, 16);
    const magazinesPct = 9;
    const pharmacyPct = 6;
    const televisionPct = 2;
    // Balancer row keeps the whole table at 100%.
    const otherPct = 100 - doctorPct - internetPct - magazinesPct - pharmacyPct - televisionPct;

    const combinedPct = doctorPct + internetPct;
    const result = Math.round((combinedPct / 100) * totalSurveyed);

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

    const doctorOnly = Math.round((doctorOnlyPct / 100) * totalSurveyed);
    const doctorMags = Math.round((doctorMagsPct / 100) * totalSurveyed);
    const threeSource = Math.round((threeSourcePct / 100) * totalSurveyed);

    const optionsData = [
      { text: `${doctorOnly}`, isCorrect: false, reason: `is ${doctorOnlyPct}% of ${totalSurveyed} (only the doctor group), not ${combinedPct}%` },
      { text: `${doctorMags}`, isCorrect: false, reason: `is ${doctorMagsPct}% of ${totalSurveyed} (doctor or magazines/brochures), not doctor or the Internet` },
      { text: `${result}`, isCorrect: true },
      { text: `${threeSource}`, isCorrect: false, reason: `is ${threeSourcePct}% of ${totalSurveyed} (doctor, Internet, and magazines/brochures), one source too many` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The table above shows a summary of ${totalSurveyed} responses to a survey question. Based on the table, how many of those surveyed get most of their medical information from either a doctor or the Internet?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. According to the table, ${doctorPct}% of survey respondents get most of their medical information from a doctor and ${internetPct}% get most of their medical information from the Internet. Together that is ${doctorPct}% + ${internetPct}% = ${combinedPct}% of the ${totalSurveyed} respondents, and ${combinedPct}% of ${totalSurveyed} is ${result}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
