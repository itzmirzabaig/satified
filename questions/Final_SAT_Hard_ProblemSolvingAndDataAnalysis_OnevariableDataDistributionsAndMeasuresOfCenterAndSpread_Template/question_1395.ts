import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1395
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values 70, 80, 90, 100 with varying frequencies]
 * - Difficulty factors: [Recognizing symmetry vs skew in frequency tables, calculating weighted means mentally]
 * - Distractor patterns: [Student may calculate all four means instead of recognizing symmetry pattern]
 * - Constraints: [Tables B, C, D are symmetric with mean 85; Table A is skewed right with higher mean]
 * - Question type: [Table→Multiple Choice Text]
 */

export const generator_1395 = {
  metadata: {
    id: "1395",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base values (evenly spaced)
    const startValue = getRandomInt(60, 80);
    const step = getRandomInt(8, 12);
    const values = [0, 1, 2, 3].map(i => startValue + i * step);
    const middle = (values[0] + values[3]) / 2; // The "center" value (85 in original)

    // STEP 2: Generate THREE distinct SYMMETRIC frequency distributions for
    // tables B, C, D. Pattern [a, b, b, a] is exactly symmetric about the
    // center, so for evenly spaced values every such table has mean = middle.
    // Distinct (a, b) pairs keep the three tables visibly different while
    // sharing the same mean.
    const makeSymmetric = () => {
      const a = getRandomInt(4, 8);
      const b = getRandomInt(4, 8);
      return [a, b, b, a];
    };
    const symKey = (f: number[]) => `${f[0]}-${f[1]}`;
    const symmetricSets: number[][] = [];
    let symTries = 0;
    while (symmetricSets.length < 3 && symTries++ < 50) {
      const cand = makeSymmetric();
      if (!symmetricSets.some(s => symKey(s) === symKey(cand))) {
        symmetricSets.push(cand);
      }
    }
    // Fallback (only if unlucky): fill any remaining slots deterministically.
    const symFallbacks = [[4, 6, 6, 4], [5, 7, 7, 5], [6, 8, 8, 6], [7, 5, 5, 7]];
    for (const fb of symFallbacks) {
      if (symmetricSets.length >= 3) break;
      if (!symmetricSets.some(s => symKey(s) === symKey(fb))) symmetricSets.push(fb);
    }
    const [freqsB, freqsC, freqsD] = symmetricSets;

    // STEP 3: Table A skews toward higher values (higher frequencies for the
    // two larger values), so its mean is strictly greater than the middle.
    // Guard the strict inequality with a bounded retry.
    const calcMean = (freqs: number[]) => {
      const sum = values.reduce((acc, val, i) => acc + val * freqs[i], 0);
      const count = freqs.reduce((a, b) => a + b, 0);
      return sum / count;
    };
    let skewedFreqs = [
      getRandomInt(3, 6),
      getRandomInt(4, 7),
      getRandomInt(6, 9),
      getRandomInt(7, 11)
    ];
    let skewTries = 0;
    while (calcMean(skewedFreqs) <= middle && skewTries++ < 50) {
      skewedFreqs = [
        getRandomInt(3, 6),
        getRandomInt(4, 7),
        getRandomInt(6, 9),
        getRandomInt(7, 11)
      ];
    }

    const meanA = calcMean(skewedFreqs);
    // Tables B, C, D are all symmetric, so each has mean exactly = middle.
    const meanBCD = middle;

    // STEP 4: Build table HTML (showing all four tables)
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Table A</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Table B</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Table C</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Table D</th>
    </tr>
  </thead>
  <tbody>
    ${values.map((v, i) => `
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${v}: ${skewedFreqs[i]}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${v}: ${freqsB[i]}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${v}: ${freqsC[i]}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${v}: ${freqsD[i]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;

    // STEP 5: Determine the correct answer from the LIVE means (Table A is the
    // strict maximum by construction, but compute it rather than hardcode).
    const tables = [
      { text: "Table A", mean: meanA },
      { text: "Table B", mean: calcMean(freqsB) },
      { text: "Table C", mean: calcMean(freqsC) },
      { text: "Table D", mean: calcMean(freqsD) }
    ];
    const correctText = tables.reduce((best, t) => (t.mean > best.mean ? t : best)).text;

    const optionsData = tables.map(t => ({ text: t.text, isCorrect: t.text === correctText }));

    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 7: Return question data
    return {
      questionText: "Each of the following frequency tables represents a data set. Which data set has the greatest mean?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Tables B, C, and D each have a symmetric frequency distribution (the frequencies mirror around the center), so their mean equals the center value, ${meanBCD}. Table A is skewed toward the higher values (greater frequencies for ${values[2]} and ${values[3]}), which pulls its mean up to ${meanA.toFixed(1)}, greater than ${meanBCD}. Therefore ${correctText} has the greatest mean.`
    };
  }
};
