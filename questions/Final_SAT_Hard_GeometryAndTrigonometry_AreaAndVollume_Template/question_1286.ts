import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1286
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [three integer lattice points forming a triangle]
 * - Difficulty factors: [Triangle area from coordinates via the shoelace formula]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [non-degenerate triangle; area is a clean multiple of 0.5]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [Triangle drawn on labelled axes, plain SVG]
 */

export const generator_1286 = {
  metadata: {
    id: "1286",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Three integer lattice points. Any triangle with integer vertices has an
    // area that is an exact multiple of 1/2 (the shoelace determinant 2*Area is
    // always an integer), so no float artifacts can arise. We only need the
    // triangle to be non-degenerate (positive area).
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0;
    let twiceArea = 0;
    let tries = 0;
    do {
      x1 = getRandomInt(-6, -2); y1 = getRandomInt(2, 6);
      x2 = getRandomInt(4, 8);   y2 = getRandomInt(2, 6);
      x3 = getRandomInt(3, 7);   y3 = getRandomInt(-5, -1);
      // Shoelace determinant (an integer); 2 * Area = |det|.
      twiceArea = Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
      tries++;
    } while (twiceArea === 0 && tries < 50);

    // Deterministic fallback in the (astronomically unlikely) event that every
    // draw was collinear: a fixed non-degenerate triangle with a clean area.
    if (twiceArea === 0) {
      x1 = -3; y1 = 4; x2 = 5; y2 = 3; x3 = 4; y3 = -3;
      twiceArea = Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
    }

    // Area is exactly twiceArea/2 -> integer or half-integer, never a float mess.
    const area = twiceArea / 2;
    const areaStr = area.toString(); // e.g. "24" or "24.5"

    // ── Signed-term helpers so the explanation never prints "+ -" runs. ──
    const term1 = x1 * (y2 - y3);
    const term2 = x2 * (y3 - y1);
    const term3 = x3 * (y1 - y2);
    // Render " + n" or " - |n|" for a following term.
    const addTerm = (n: number) => (n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`);
    // Render a signed factor like "(y2 - y3)" numerically, e.g. "(3 - (-1))".
    const num = (n: number) => (n < 0 ? `(${n})` : `${n}`);
    const sumInside = `${term1} ${addTerm(term2)} ${addTerm(term3)}`;

    // ── Figure: draw the triangle on labelled axes (all values live). ──
    const xs = [x1, x2, x3], ys = [y1, y2, y3];
    const dataMinX = Math.min(...xs) - 1, dataMaxX = Math.max(...xs) + 1;
    const dataMinY = Math.min(...ys) - 1, dataMaxY = Math.max(...ys) + 1;

    const W = 450, Hpx = 320, P = 34;
    const sx = (x: number) => P + ((x - dataMinX) / (dataMaxX - dataMinX)) * (W - 2 * P);
    const sy = (y: number) => (Hpx - P) - ((y - dataMinY) / (dataMaxY - dataMinY)) * (Hpx - 2 * P);
    const r2 = (n: number) => Math.round(n * 100) / 100;

    // Axis ticks at every integer within the data window.
    let ticks = '';
    for (let x = Math.ceil(dataMinX); x <= Math.floor(dataMaxX); x++) {
      if (x === 0) continue;
      ticks += `<text x="${r2(sx(x))}" y="${r2(sy(0) + 13)}" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.7">${x}</text>`;
    }
    for (let y = Math.ceil(dataMinY); y <= Math.floor(dataMaxY); y++) {
      if (y === 0) continue;
      ticks += `<text x="${r2(sx(0) - 7)}" y="${r2(sy(y) + 3)}" text-anchor="end" font-size="9" fill="currentColor" opacity="0.7">${y}</text>`;
    }

    const poly = `${r2(sx(x1))},${r2(sy(y1))} ${r2(sx(x2))},${r2(sy(y2))} ${r2(sx(x3))},${r2(sy(y3))}`;
    const vertex = (x: number, y: number) => `<circle cx="${r2(sx(x))}" cy="${r2(sy(y))}" r="3.5" fill="#3b82f6"/>`;
    const label = (x: number, y: number, dx: number, dy: number) =>
      `<text x="${r2(sx(x) + dx)}" y="${r2(sy(y) + dy)}" text-anchor="middle" font-size="12" fill="currentColor">(${x}, ${y})</text>`;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${Hpx}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<line x1="${P}" y1="${r2(sy(0))}" x2="${W - P}" y2="${r2(sy(0))}" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>` +
      `<line x1="${r2(sx(0))}" y1="${P}" x2="${r2(sx(0))}" y2="${Hpx - P}" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>` +
      ticks +
      `<polygon points="${poly}" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2"/>` +
      vertex(x1, y1) + vertex(x2, y2) + vertex(x3, y3) +
      label(x1, y1, -6, -8) + label(x2, y2, 22, -6) + label(x3, y3, 22, 6) +
      `</svg></div>`;

    return {
      questionText: `In the $xy$-plane, a triangle has vertices at $(${x1}, ${y1})$, $(${x2}, ${y2})$, and $(${x3}, ${y3})$, as shown. What is the area, in square units, of the triangle? (If your answer is not a whole number, enter it as a decimal.)`,
      figureCode,
      options: [],
      correctAnswer: areaStr,
      explanation: `The area of a triangle with vertices $(x_1, y_1)$, $(x_2, y_2)$, and $(x_3, y_3)$ is $\\frac{1}{2}\\left|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\\right|$. Substituting the coordinates gives $\\frac{1}{2}\\left|${x1}\\,(${num(y2)} - ${num(y3)}) + ${x2}\\,(${num(y3)} - ${num(y1)}) + ${x3}\\,(${num(y1)} - ${num(y2)})\\right| = \\frac{1}{2}\\left|${sumInside}\\right| = \\frac{1}{2}(${twiceArea}) = ${areaStr}$ square units.`
    };
  }
};
