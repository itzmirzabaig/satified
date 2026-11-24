import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1093
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (1.84)^(x/4)]
 * - Difficulty factors: [Rewriting exponential, percent change]
 * - Distractor patterns: [A: 16, B: 21, C: 46, D: 96]
 * - Constraints: [(1.84)^(1/4) ≈ 1.16, so p ≈ 16]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1093 = {
  metadata: {
    id: "1093",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Before: one choice was the answer + 5, another was base * 25 whatever the
    // exponent, the explanation claimed a rounded value equaled 1 + p/100, and
    // no choice had a reason. Wrong choices are now real slips, and draws where
    // p sits near a half are skipped so the closest whole number is clear.
    let hundredths = 184;
    let denom = 4;
    let newBase = 1;
    let exactP = 0;
    let p = 0;
    let splitPct = 0;
    let baseSplit = 0;
    let pctIncrease = 0;
    do {
      hundredths = getRandomInt(160, 199);
      denom = getRandomInt(3, 6);
      newBase = Math.pow(hundredths / 100, 1 / denom);
      exactP = (newBase - 1) * 100;
      p = Math.round(exactP);
      pctIncrease = hundredths - 100;
      splitPct = Math.round(pctIncrease / denom);
      baseSplit = Math.round(hundredths / denom);
    } while (
      hundredths % 10 === 0 ||
      Math.abs(exactP - p) > 0.4 ||
      new Set([p, splitPct, baseSplit, pctIncrease]).size < 4
    );

    const base = (hundredths / 100).toFixed(2);
    const rootName = ({ 3: 'cube', 4: 'fourth', 5: 'fifth', 6: 'sixth' } as Record<number, string>)[denom];
    const rootValue = newBase.toFixed(4);
    const pValue = ((Number(rootValue) - 1) * 100).toFixed(2);
    const relation = (num: number, result: number) => num % denom === 0 ? `=${result}` : `\\approx ${result}`;

    const optionsData = [
      { text: `$${p}$`, isCorrect: true, reason: '' },
      { text: `$${splitPct}$`, isCorrect: false, reason: `$${splitPct}$ comes from $\\frac{${pctIncrease}}{${denom}}${relation(pctIncrease, splitPct)}$, which divides the percent increase by ${denom} instead of taking the ${rootName} root of the base` },
      { text: `$${baseSplit}$`, isCorrect: false, reason: `$${baseSplit}$ comes from $\\frac{${hundredths}}{${denom}}${relation(hundredths, baseSplit)}$, which divides the base, written as a percent, by ${denom} instead of taking its ${rootName} root` },
      { text: `$${pctIncrease}$`, isCorrect: false, reason: `$${pctIncrease}$ is the percent increase in $f(x)$ when $x$ increases by ${denom}, not when $x$ increases by 1` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=(${base})^{\\frac{x}{${denom}}}$. This function can also be written as $f(x)=\\left(1+\\frac{p}{100}\\right)^x$, where $p$ is a constant. Which of the following is closest to the value of $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${p}$`,
      explanation: `Choice ${correctOption.letter} is correct. By the power of a power rule, $(${base})^{\\frac{x}{${denom}}}=\\left((${base})^{\\frac{1}{${denom}}}\\right)^x$. Matching the bases gives $1+\\frac{p}{100}=(${base})^{\\frac{1}{${denom}}}\\approx ${rootValue}$. Subtracting $1$ from both sides and multiplying by $100$ gives $p\\approx ${pValue}$, which is closest to $${p}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
