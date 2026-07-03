import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1300
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 14, -6, constant: 109]
 * - Difficulty factors: [Completing square with rearrangement]
 * - Distractor patterns: [Wrong constant after moving terms, calculation errors]
 * - Constraints: [Must move all terms correctly before completing square]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Circle]
 *
 * A circle is given in general form  x^2 + Bx + y^2 = Cy + D  (B = -2h > 0,
 * C = 2k > 0, D = r^2 - h^2 - k^2). Completing the square gives
 * (x - h)^2 + (y - k)^2 = D + h^2 + k^2 = r^2, so the radius is sqrt(r^2).
 */

export const generator_1300 = {
  metadata: {
    id: "1300",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Pick center (h, k) and radius r. h is negative so the printed
    // coefficient B = -2h is a positive integer; k > 0 so C = 2k is positive.
    // Retry (bounded) until the raw constant D = r^2 - h^2 - k^2 is a positive
    // integer AND the four radicands used in the options are all distinct.
    let h = -6, k = 3, r = 12;
    let D = 0;
    let radRaw = 0, radAll = 0, radDbl = 0, radCorrect = 0;
    let tries = 0;
    do {
      h = -getRandomInt(4, 10);   // h ∈ [-10, -4]
      k = getRandomInt(2, 6);     // k ∈ [2, 6]
      r = getRandomInt(8, 15);    // r ∈ [8, 15]

      D = r * r - h * h - k * k;  // raw constant after full rearrangement

      radCorrect = r * r;                 // correct radicand: (x-h)^2+(y-k)^2 = r^2
      radRaw = D;                         // trap: never added h^2 + k^2 back
      radAll = r * r + h * h + k * k;      // trap: added instead of subtracting
      radDbl = 2 * r * r;                 // trap: doubled the radius
    } while (
      (D < 1 ||
        new Set([radCorrect, radRaw, radAll, radDbl]).size !== 4)
      && ++tries < 50
    );

    // Printed coefficients (all positive for every valid draw above).
    const Bcoeff = -2 * h;   // coefficient of x on the left  (positive)
    const Ccoeff = 2 * k;    // coefficient of y on the right (positive)

    // STEP 2: Build the four options as sqrt of the radicands above. Each
    // carries its own reason so the explanation stays correct after shuffling.
    const optionsData = [
      { text: `\\sqrt{${radCorrect}}`, isCorrect: true,  reason: null as string | null },
      { text: `\\sqrt{${radRaw}}`,     isCorrect: false, reason: `this uses the raw constant $D=${D}$ without adding $h^{2}+k^{2}$ back after completing the square` },
      { text: `\\sqrt{${radAll}}`,     isCorrect: false, reason: `this adds $h^{2}+k^{2}$ to the right side instead of recognizing they were already subtracted, giving $r^{2}+h^{2}+k^{2}=${radAll}$ instead of $r^{2}=${radCorrect}$` },
      { text: `\\sqrt{${radDbl}}`,     isCorrect: false, reason: `this doubles the squared radius, using $r^{2}\\cdot 2=${radDbl}$ rather than $r^{2}=${radCorrect}$` },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const wrong = shuffledOptions.filter(o => !o.isCorrect);
    const correctText = correct.text;

    // STEP 3: Figure — a true circle centered at (h, k) with radius r on
    // labeled axes. Uses a single uniform scale for x and y so it is not
    // distorted, and the drawn values match h, k, r for every draw.
    const W = 400, H = 340, P = 34;
    const xmin = h - r - 2, xmax = h + r + 2;
    const ymin = k - r - 2, ymax = k + r + 2;
    const scale = Math.min((W - 2 * P) / (xmax - xmin), (H - 2 * P) / (ymax - ymin));
    const cxPix = W / 2, cyPix = H / 2;               // circle center in px
    const mx = (x: number) => cxPix + (x - h) * scale;
    const my = (y: number) => cyPix - (y - k) * scale;

    const axisTicks: string[] = [];
    const xstep = Math.max(2, Math.ceil((xmax - xmin) / 8));
    for (let x = Math.ceil(xmin / xstep) * xstep; x <= xmax; x += xstep) {
      if (x === 0) continue;
      axisTicks.push(`<text x="${mx(x).toFixed(1)}" y="${(my(0) + 14).toFixed(1)}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`);
    }
    const ystep = Math.max(2, Math.ceil((ymax - ymin) / 8));
    for (let y = Math.ceil(ymin / ystep) * ystep; y <= ymax; y += ystep) {
      if (y === 0) continue;
      axisTicks.push(`<text x="${(mx(0) - 8).toFixed(1)}" y="${(my(y) + 3.5).toFixed(1)}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`);
    }

    const figureCode = `<div style="width:100%;max-width:400px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<line x1="${P}" y1="${my(0).toFixed(1)}" x2="${W - P}" y2="${my(0).toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mx(0).toFixed(1)}" y1="${P}" x2="${mx(0).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>` +
      axisTicks.join('') +
      `<circle cx="${cxPix.toFixed(1)}" cy="${cyPix.toFixed(1)}" r="${(r * scale).toFixed(1)}" fill="none" stroke="#3b82f6" stroke-width="2"/>` +
      `<circle cx="${cxPix.toFixed(1)}" cy="${cyPix.toFixed(1)}" r="3" fill="#3b82f6"/>` +
      `<text x="${(cxPix + 6).toFixed(1)}" y="${(cyPix - 6).toFixed(1)}" font-size="10" fill="currentColor">(${h}, ${k})</text>` +
      `</svg></div>`;

    return {
      questionText: `In the $xy$-plane, the graph of the given equation is a circle. What is the length of the circle's radius? $$x^2 + ${Bcoeff}x + y^2 = ${Ccoeff}y + ${D}$$`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correct.letter} is correct. Move every term to the left: $x^{2}+${Bcoeff}x + y^{2}-${Ccoeff}y = ${D}$. Complete the square in $x$ and $y$, adding $h^{2}=${h * h}$ and $k^{2}=${k * k}$ to both sides: $(x+${-h})^{2} + (y-${k})^{2} = ${D} + ${h * h} + ${k * k} = ${radCorrect}$. So $r^{2}=${radCorrect}$ and the radius is $\\sqrt{${radCorrect}}=${r}$. Choice ${wrong[0].letter} is incorrect; ${wrong[0].reason}. Choice ${wrong[1].letter} is incorrect; ${wrong[1].reason}. Choice ${wrong[2].letter} is incorrect; ${wrong[2].reason}.`
    };
  }
};
