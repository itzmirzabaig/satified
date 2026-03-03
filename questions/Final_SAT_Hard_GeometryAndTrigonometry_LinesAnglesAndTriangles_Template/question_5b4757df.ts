import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5b4757df
 * 
 * FIXES:
 * - Changed double backslash `\\\\overline` to single escape `\\overline` so it renders as `\overline` in LaTeX.
 * - This ensures the line appears over the segment names (e.g., RS) instead of the word "overline".
 */
export const generator_5b4757df = {
  metadata: {
    id: "5b4757df",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values that give clean answers
    const ratio = getRandomInt(2, 4); // Scale factor
    const LK = getRandomInt(15, 35);
    const RT = LK * ratio;

    // ST must be divisible by ratio for clean KT answer
    const ST = getRandomInt(15, 30) * ratio;
    
    // Area of Right Triangle RST = 0.5 * leg1 * leg2
    // Assuming T is the right angle, legs are RT and ST.
    const area = 0.5 * RT * ST;

    // STEP 2: Calculate KT
    // Triangle RST ~ Triangle LSK (because LK || RT and T is right angle, S is common)
    // Ratio RT/LK = ratio.
    // So ST/SK = ratio => SK = ST / ratio.
    const SK = ST / ratio;
    const KT = ST - SK;

    // Format as fraction if needed (though with current logic it's often integer)
    let answer: string;
    if (Number.isInteger(KT)) {
      answer = KT.toString();
    } else {
      const num = ST * (ratio - 1);
      const den = ratio;
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const g = gcd(num, den);
      answer = `${num / g}/${den / g}`;
    }

    return {
      questionText: `In triangle $RST$, angle $T$ is a right angle, point $L$ lies on $\\overline{RS}$, point $K$ lies on $\\overline{ST}$, and $\\overline{LK}$ is parallel to $\\overline{RT}$. If the length of $\\overline{RT}$ is ${RT} units, the length of $\\overline{LK}$ is ${LK} units, and the area of triangle $RST$ is ${area} square units, what is the length of $\\overline{KT}$, in units?`,
      figureCode: null,
      options: [],
      correctAnswer: answer,
      explanation: `The area of right triangle $RST$ is given by $A = \\frac{1}{2} \\cdot RT \\cdot ST$. Substituting the given values:
$${area} = \\frac{1}{2} \\cdot ${RT} \\cdot ST$
$${area * 2} = ${RT} \\cdot ST$
$ST = ${ST}$

Since $\\overline{LK} \\parallel \\overline{RT}$, triangle $RST$ is similar to triangle $LSK$. The ratio of similarity is:
$\\frac{RT}{LK} = \\frac{${RT}}{${LK}} = ${ratio}$

This ratio applies to the corresponding sides $ST$ and $SK$:
$\\frac{ST}{SK} = ${ratio} \\Rightarrow SK = \\frac{${ST}}{${ratio}} = ${SK}$

Finally, the length of $\\overline{KT}$ is the difference between $ST$ and $SK$:
$KT = ST - SK = ${ST} - ${SK} = ${answer}$`
    };
  }
};

/**
 * Question ID: adae6543
 * 
 * ANALYSIS:
 * - Geometry: Intersecting lines (Hourglass/Bowtie shape).
 * - Concept: Similar Triangles (AA similarity due to parallel lines).
 * - Given: MR, LR, RP.
 * - Find: LQ = LR + RQ.
 * - Logic: MR/RP = LR/RQ => RQ = LR * (RP/MR).
 */
export const generator_adae6543 = {
  metadata: {
    id: "adae6543",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Generate integer values
    // Ensure MR and RP don't divide cleanly to force fraction arithmetic often seen in SAT
    const MR = getRandomInt(5, 8);
    const RP = getRandomInt(9, 13);
    const LR = getRandomInt(6, 9);
    
    // Calculate RQ based on similarity ratio k = RP/MR
    // RQ / LR = RP / MR  =>  RQ = LR * RP / MR
    const numRQ = LR * RP;
    const denRQ = MR;

    // Calculate total length LQ = LR + RQ
    // LQ = LR + (LR * RP / MR) = LR * (1 + RP/MR) = LR * (MR + RP) / MR
    const numerator = LR * (MR + RP);
    const denominator = MR;

    // Simplify fraction for the answer
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const common = gcd(numerator, denominator);
    const ansNum = numerator / common;
    const ansDen = denominator / common;
    
    const correctVal = `${ansNum}/${ansDen}`;

    // 2. Generate SVG Figure (Hourglass shape)
    const width = 300;
    const height = 200;
    const cx = width / 2;
    const cy = height / 2;
    
    // Define geometric points relative to center R
    // Triangle RLM (Left/Top) and Triangle RPQ (Right/Bottom)
    // Actually, visually usually L and M are on top, P and Q on bottom for parallel lines
    // Let's place horizontal lines LM (top) and PQ (bottom)
    
    const scale = 8;
    // R is at (cx, cy)
    // L is top-left, M is top-right? Or crossed?
    // "MP and LQ intersect at R". So M-R-P is a line. L-R-Q is a line.
    // If LM || PQ:
    // M (top left) -> R -> P (bottom right)
    // L (top right) -> R -> Q (bottom left)
    // Let's set coordinates
    const dyTop = 50;
    const dyBot = 50 * (RP/MR); // Scale vertical height by ratio
    
    // Coordinates
    const mx = cx - 40; 
    const my = cy - dyTop;
    const lx = cx + 40;
    const ly = cy - dyTop;
    
    const px = cx + 40 * (RP/MR); // P is on line MRP (extends from M through R)
    const py = cy + dyBot;
    
    const qx = cx - 40 * (RP/MR); // Q is on line LRQ (extends from L through R)
    const qy = cy + dyBot;

    // 3. SVG Template
    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" width="100%" height="250" preserveAspectRatio="xMidYMid meet" style="font-family: serif;">
        <!-- Lines -->
        <line x1="${mx}" y1="${my}" x2="${px}" y2="${py}" stroke="currentColor" stroke-width="2" />
        <line x1="${lx}" y1="${ly}" x2="${qx}" y2="${qy}" stroke="currentColor" stroke-width="2" />
        <line x1="${mx}" y1="${my}" x2="${lx}" y2="${ly}" stroke="currentColor" stroke-width="2" />
        <line x1="${qx}" y1="${qy}" x2="${px}" y2="${py}" stroke="currentColor" stroke-width="2" />

        <!-- Points Labels -->
        <text x="${mx-10}" y="${my}" fill="currentColor" font-size="16">M</text>
        <text x="${lx+5}" y="${my}" fill="currentColor" font-size="16">L</text>
        <text x="${cx}" y="${cy-10}" fill="currentColor" font-size="16" text-anchor="middle">R</text>
        <text x="${qx-10}" y="${qy+10}" fill="currentColor" font-size="16">Q</text>
        <text x="${px+5}" y="${py+10}" fill="currentColor" font-size="16">P</text>
      </svg>
    `;

    // 4. Options Generation
    // Distractors:
    // 1. Just RQ (not total LQ) -> numRQ / denRQ
    // 2. Calculation error: swap ratios
    // 3. Calculation error: subtract instead of add
    
    // Distractor 1: RQ
    const g1 = gcd(numRQ, denRQ);
    const d1 = `${numRQ/g1}/${denRQ/g1}`;
    
    // Distractor 2: Cross multiply error (LR * MR / RP) + LR
    const wrongNum = LR * (RP + MR); // Wait, this is correct numerator logic? 
    // Let's just make random plausible fractions close to answer
    const d2Num = ansNum + MR; 
    const d2 = `${d2Num}/${ansDen}`;

    const d3Num = Math.abs(ansNum - MR * 2);
    const d3 = `${d3Num}/${ansDen}`;

    const optionsData = [
      { text: correctVal, isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `In the figure above, $\\overline{MP}$ and $\\overline{LQ}$ intersect at point $R$, and $\\overline{LM}$ is parallel to $\\overline{PQ}$. If $MR = ${MR}$, $LR = ${LR}$, and $RP = ${RP}$, what is the length of $\\overline{LQ}$?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctVal,
      explanation: `Choice ${correctOption.letter} is correct. Since $\\overline{LM} \\parallel \\overline{PQ}$, the alternate interior angles are congruent ($\\angle LMR \\cong \\angle QPR$ and $\\angle MLR \\cong \\angle PQR$). Thus, triangle $LMR$ is similar to triangle $QPR$ by the Angle-Angle criterion.

Because the triangles are similar, the lengths of their corresponding sides are proportional:
$\\frac{RQ}{LR} = \\frac{RP}{MR}$

Substitute the given values:
$\\frac{RQ}{${LR}} = \\frac{${RP}}{${MR}}$

Solve for $RQ$:
$RQ = ${LR} \\cdot \\frac{${RP}}{${MR}} = \\frac{${numRQ}}{${denRQ}}$

The question asks for the length of segment $\\overline{LQ}$, which is the sum of $LR$ and $RQ$:
$LQ = LR + RQ = ${LR} + \\frac{${numRQ}}{${denRQ}}$
$LQ = \\frac{${LR * MR}}{${MR}} + \\frac{${numRQ}}{${denRQ}} = \\frac{${numerator}}{${denominator}}$

Simplifying the fraction gives ${correctVal}.`
    };
  }
};