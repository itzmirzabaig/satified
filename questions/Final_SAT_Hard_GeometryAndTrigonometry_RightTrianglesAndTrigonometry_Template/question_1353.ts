import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1353
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan B = 3/4, BC = 5k, DA = 4·f]
 * - Difficulty factors: [Similar triangles, 3-4-5 triangle ratios, segment subtraction]
 * - Constraints: [Nested similar right triangles with scale factor relationship]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Nested similar right triangles]
 *
 * FIXED:
 * - Rebuilt corrupted figure IIFE as a plain SVG template literal (house style).
 * - Fixed import path to '../../study/types'; dropped unused getRandomElement.
 * - Fixed LaTeX: \\\\frac / \\\\times runs collapsed to \\frac / \\times.
 * - Removed the stray trailing comment block describing a different question.
 * - Verified DE is an integer for every draw; DB stays positive.
 */

export const generator_1353 = {
  metadata: {
    id: "1353",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Triangle ABC: right angle at A, B at origin, A on the x-axis, C directly above A.
    // tan B = opposite/adjacent = AC/AB = 3/4  ->  3-4-5 family with scale k.
    //   AB = 4k (adjacent to B), AC = 3k (opposite to B), BC = 5k (hypotenuse).
    const baseScale = getRandomInt(3, 6);        // k in [3, 6]
    const hypotenuseBC = 5 * baseScale;          // BC
    const adjacentAB = 4 * baseScale;            // AB
    const oppositeAC = 3 * baseScale;            // AC

    // D lies on segment BA (between B and A); E is directly above D so that
    // triangle DBE (right angle at D) is similar to triangle ABC.
    // DA is subtracted from AB to obtain DB:  DB = AB - DA.
    // DA = 4·f keeps DB a multiple of 4, so the small scale factor is an integer.
    const daFactor = getRandomInt(1, baseScale - 1); // f in [1, k-1]  =>  1 <= DB/4 <= k-1
    const da = 4 * daFactor;                         // DA
    const db = adjacentAB - da;                      // DB = 4(k - f) > 0

    const smallScale = db / 4;                       // integer scale of triangle DBE
    const de = 3 * smallScale;                        // DE = side opposite B in DBE (integer)

    // ----- Figure: nested similar right triangles, values match the numbers above -----
    const W = 450, H = 300, P = 40;
    const xmin = 0, xmax = adjacentAB + 2;
    const ymin = 0, ymax = oppositeAC + 2;
    const mx = (x: number) => P + ((x - xmin) / (xmax - xmin)) * (W - 2 * P);
    const my = (y: number) => H - P - ((y - ymin) / (ymax - ymin)) * (H - 2 * P);

    const Bx = mx(0), By = my(0);
    const Ax = mx(adjacentAB), Ay = my(0);
    const Cx = mx(adjacentAB), Cy = my(oppositeAC);
    const Dx = mx(db), Dy = my(0);
    const Ex = mx(db), Ey = my(de);

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:sans-serif;user-select:none;" xmlns="http://www.w3.org/2000/svg">
      <!-- Large triangle ABC -->
      <polygon points="${Bx},${By} ${Ax},${Ay} ${Cx},${Cy}" fill="#3b82f6" fill-opacity="0.08" stroke="currentColor" stroke-width="2"/>
      <!-- Segment DE of the smaller similar triangle DBE -->
      <line x1="${Dx}" y1="${Dy}" x2="${Ex}" y2="${Ey}" stroke="#3b82f6" stroke-width="2.5"/>
      <line x1="${Bx}" y1="${By}" x2="${Ex}" y2="${Ey}" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4 3"/>
      <!-- Right-angle marks at A and D -->
      <polyline points="${Ax - 10},${Ay} ${Ax - 10},${Ay - 10} ${Ax},${Ay - 10}" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <polyline points="${Dx - 9},${Dy} ${Dx - 9},${Dy - 9} ${Dx},${Dy - 9}" fill="none" stroke="#3b82f6" stroke-width="1.2"/>
      <!-- Vertex labels -->
      <text x="${Bx - 6}" y="${By + 16}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">B</text>
      <text x="${Ax + 12}" y="${Ay + 16}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">A</text>
      <text x="${Cx + 12}" y="${Cy + 4}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">C</text>
      <text x="${Dx}" y="${Dy + 18}" text-anchor="middle" font-size="14" font-style="italic" fill="#3b82f6">D</text>
      <text x="${Ex + 12}" y="${Ey + 4}" text-anchor="middle" font-size="14" font-style="italic" fill="#3b82f6">E</text>
    </svg></div>`;

    return {
      questionText: `In the figure above, $\\tan B = \\frac{3}{4}$. If $BC = ${hypotenuseBC}$ and $DA = ${da}$, what is the length of $\\overline{DE}$?`,
      figureCode: figureCode,
      options: [], // Fill in the blank
      correctAnswer: de.toString(),
      explanation: `Since $\\tan B = \\frac{3}{4}$, $\\triangle ABC$ and $\\triangle DBE$ are similar to 3-4-5 right triangles. For $\\triangle ABC$, the hypotenuse $BC = ${hypotenuseBC}$ gives scale factor ${baseScale}, so the adjacent side $AB = 4 \\times ${baseScale} = ${adjacentAB}$. Since $DA = ${da}$, $DB = AB - DA = ${adjacentAB} - ${da} = ${db}$. Triangle $DBE$ has scale factor $DB \\div 4 = ${smallScale}$, so the side opposite $B$ is $DE = 3 \\times ${smallScale} = ${de}$.`
    };
  }
};
