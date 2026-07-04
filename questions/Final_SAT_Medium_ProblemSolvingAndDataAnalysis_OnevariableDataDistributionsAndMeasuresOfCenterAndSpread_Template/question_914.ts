import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 914
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [units sold: represented in histograms]
 * - Difficulty factors: [Comparing standard deviation from histogram shape]
 * - Distractor patterns: [Confusing center with spread, thinking wider range = higher std dev]
 * - Constraints: [Tighter cluster = lower std dev regardless of position]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs Histogram]
 */

export const generator_914 = {
  metadata: {
    id: "914",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate histogram frequency data over a shared value axis.
    // Both companies use the same 5 unit-sold intervals (bins). Company A is
    // concentrated in the center bins (small spread); Company B pushes mass to
    // the outer bins (large spread). We compute the ACTUAL standard deviation
    // of each frequency distribution and only accept draws where A's spread is
    // clearly smaller than B's, so the marked answer holds for every draw.
    const binLabels = ['0-10', '10-20', '20-30', '30-40', '40-50'];
    const binMids = [5, 15, 25, 35, 45];

    // Standard deviation of a frequency distribution over binMids.
    const freqStdDev = (freqs: number[]): number => {
      const n = freqs.reduce((a, b) => a + b, 0);
      const mean = freqs.reduce((s, f, i) => s + f * binMids[i], 0) / n;
      const variance =
        freqs.reduce((s, f, i) => s + f * (binMids[i] - mean) ** 2, 0) / n;
      return Math.sqrt(variance);
    };

    let freqsA: number[] = [];
    let freqsB: number[] = [];
    let sdA = 0;
    let sdB = 0;
    let tries = 0;
    do {
      // Company A: tall in the middle, short at the edges -> tight cluster.
      freqsA = [
        getRandomInt(1, 3),
        getRandomInt(6, 9),
        getRandomInt(12, 16),
        getRandomInt(6, 9),
        getRandomInt(1, 3)
      ];
      // Company B: taller at the edges than the middle -> wide spread.
      freqsB = [
        getRandomInt(10, 14),
        getRandomInt(6, 9),
        getRandomInt(2, 4),
        getRandomInt(6, 9),
        getRandomInt(10, 14)
      ];
      sdA = freqStdDev(freqsA);
      sdB = freqStdDev(freqsB);
    } while (sdB - sdA < 3 && tries++ < 50);

    // Guaranteed-safe fallback: fixed shapes with a large spread gap.
    if (sdB - sdA < 3) {
      freqsA = [1, 7, 14, 7, 1];
      freqsB = [12, 7, 3, 7, 12];
      sdA = freqStdDev(freqsA);
      sdB = freqStdDev(freqsB);
    }

    // STEP 2: Build two side-by-side histograms as plain SVG bars.
    const maxFreq = Math.max(...freqsA, ...freqsB);

    const histogram = (freqs: number[], title: string): string => {
      const W = 210, H = 250, P = 34;
      const plotW = W - P - 8;
      const plotH = H - P - 26;
      const barW = plotW / freqs.length;
      const bx = (i: number) => P + i * barW;
      const by = (f: number) => (P - 4) + plotH - (f / maxFreq) * plotH;
      const axisY = (P - 4) + plotH;
      let s = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:sans-serif;user-select:none;" xmlns="http://www.w3.org/2000/svg">`;
      // Title
      s += `<text x="${W / 2}" y="18" text-anchor="middle" font-size="13" font-weight="bold" fill="currentColor">${title}</text>`;
      // Bars
      for (let i = 0; i < freqs.length; i++) {
        const h = axisY - by(freqs[i]);
        s += `<rect x="${(bx(i) + 2).toFixed(1)}" y="${by(freqs[i]).toFixed(1)}" width="${(barW - 4).toFixed(1)}" height="${h.toFixed(1)}" fill="#3b82f6" stroke="currentColor" stroke-width="0.8"/>`;
      }
      // Axes
      s += `<line x1="${P}" y1="${axisY}" x2="${W - 8}" y2="${axisY}" stroke="currentColor" stroke-width="1.2"/>`;
      s += `<line x1="${P}" y1="${(P - 4).toFixed(1)}" x2="${P}" y2="${axisY}" stroke="currentColor" stroke-width="1.2"/>`;
      // Y grid labels (0 and maxFreq)
      s += `<text x="${P - 5}" y="${axisY + 4}" text-anchor="end" font-size="10" fill="currentColor">0</text>`;
      s += `<text x="${P - 5}" y="${(P - 4 + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="currentColor">${maxFreq}</text>`;
      // X labels (bin ranges)
      for (let i = 0; i < freqs.length; i++) {
        s += `<text x="${(bx(i) + barW / 2).toFixed(1)}" y="${axisY + 13}" text-anchor="middle" font-size="8" fill="currentColor">${binLabels[i]}</text>`;
      }
      // Axis titles
      s += `<text x="${W / 2}" y="${H - 3}" text-anchor="middle" font-size="9" fill="currentColor">Units sold (thousands)</text>`;
      s += `</svg>`;
      return s;
    };

    const mafsCode = `<div style="width:100%;max-width:480px;margin:0 auto;display:flex;gap:8px;">` +
      `<div style="flex:1;">${histogram(freqsA, 'Company A')}</div>` +
      `<div style="flex:1;">${histogram(freqsB, 'Company B')}</div>` +
      `</div>`;

    // STEP 3: Create options
    const optionsData = [
      { text: `The standard deviation of number of units sold for company A is less than the standard deviation of number of units sold for company B.`, isCorrect: true },
      { text: `The standard deviation of number of units sold for company A is greater than the standard deviation of number of units sold for company B.`, isCorrect: false },
      { text: `The standard deviation of number of units sold for company A is equal to the standard deviation of number of units sold for company B.`, isCorrect: false },
      { text: `There is not enough information to compare the standard deviations.`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The histograms summarize the distributions of number of units sold, in thousands, for company A and company B. Which statement best compares the standard deviations of number of units sold for these companies?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Standard deviation measures how far values are from the mean. Company A's histogram shows most values clustered tightly around the center, while Company B's histogram shows more values further from the center. Therefore, Company A has a smaller standard deviation. Choice ${incorrectOptions[0].letter} is incorrect because Company A's distribution is tighter, not wider. Choice ${incorrectOptions[1].letter} is incorrect because the distributions clearly have different spreads. Choice ${incorrectOptions[2].letter} is incorrect because the shape of the histograms provides sufficient information to compare standard deviations.`
    };
  }
};