import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1322
 *
 * ORIGINAL ANALYSIS:
 * - Difficulty factors: [Parallel lines, triangle angle sum, exterior angle]
 * - Constraints: [g || t; angles a and b given; find w]
 * - Question type: [Figure -> Fill in the blank]
 *
 * REBUILT: the original figure drew four incoherent segments with NO labels for
 * a, b, w, g, t, r, or s (only coordinate-axis ticks) and no second parallel
 * line, so the item was unanswerable from the picture. Worse, the original
 * answer w = (180 - (b - a)) / 2 is only realizable by an ISOSCELES apex, which
 * requires a + b = 180 — false for most draws in the given ranges — so the stem
 * was mathematically inconsistent with any figure.
 *
 * This version draws a clean, correctly-labeled schematic (357 style): two
 * parallel lines g and t cut by two transversals r and s that meet at an apex,
 * forming a triangle. The angle a is the triangle's interior angle at the top
 * left, b is the (obtuse) exterior angle at the top right, and w is the apex
 * angle. Since g is a straight line, the interior angle at the top right is
 * 180 - b, so by the triangle angle sum w = 180 - a - (180 - b) = b - a — always
 * a positive integer for a in [35,55], b in [110,130]. Figure, answer, and
 * explanation are now mutually consistent.
 */

export const generator_1322 = {
  metadata: {
    id: "1322",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Given angles. a is acute (interior, top-left); b is obtuse
    // (exterior at top-right). Both integers -> w = b - a is an integer.
    const a = getRandomInt(35, 55);
    const b = getRandomInt(110, 130);

    // STEP 2: The apex (third) angle of the triangle.
    //   interior angle at top-right = 180 - b  (linear pair along line g)
    //   triangle sum: a + (180 - b) + w = 180  ->  w = b - a
    const interiorTopRight = 180 - b;
    const w = b - a;

    // STEP 3: Figure — fixed-layout schematic (not to scale). Two parallel
    // horizontal lines g (top) and t (bottom); transversals r and s meet at
    // apex P on line t, forming a triangle with base R–S on line g.
    const width = 450;
    const height = 260;
    const yG = 70;          // line g (top)
    const yT = 205;         // line t (bottom, parallel to g)
    const xR = 150;         // R: r crosses g (top-left base vertex)
    const xS = 320;         // S: s crosses g (top-right base vertex)
    const xP = 235;         // apex P on line t (r and s meet here)

    // Extend the transversals a little past the lines they cross so they read
    // as full lines, not just triangle edges.
    const ext = (x1: number, y1: number, x2: number, y2: number, k: number) => {
      const dx = x2 - x1, dy = y2 - y1;
      return { x: x2 + dx * k, y: y2 + dy * k };
    };
    // r goes S? no: r is the left transversal through R and P; s is the right
    // transversal through S and P.
    const rTop = ext(xP, yT, xR, yG, 0.25);   // above g on line r
    const rBot = ext(xR, yG, xP, yT, 0.30);   // below t on line r
    const sTop = ext(xP, yT, xS, yG, 0.25);   // above g on line s
    const sBot = ext(xS, yG, xP, yT, 0.30);   // below t on line s

    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:sans-serif; user-select:none;">
          <!-- Parallel line g (top) -->
          <line x1="35" y1="${yG}" x2="415" y2="${yG}" stroke="currentColor" stroke-width="2"/>
          <text x="422" y="${yG + 5}" font-size="16" font-style="italic" fill="currentColor">g</text>
          <!-- parallel mark on g -->
          <path d="M 60 ${yG} l 8 -4 M 60 ${yG} l 8 4" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <!-- Parallel line t (bottom) -->
          <line x1="35" y1="${yT}" x2="415" y2="${yT}" stroke="currentColor" stroke-width="2"/>
          <text x="422" y="${yT + 5}" font-size="16" font-style="italic" fill="currentColor">t</text>
          <!-- parallel mark on t -->
          <path d="M 60 ${yT} l 8 -4 M 60 ${yT} l 8 4" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <!-- Transversal r (through R and apex P) -->
          <line x1="${rTop.x}" y1="${rTop.y}" x2="${rBot.x}" y2="${rBot.y}" stroke="currentColor" stroke-width="2"/>
          <text x="${rTop.x - 14}" y="${rTop.y + 4}" font-size="16" font-style="italic" fill="currentColor">r</text>
          <!-- Transversal s (through S and apex P) -->
          <line x1="${sTop.x}" y1="${sTop.y}" x2="${sBot.x}" y2="${sBot.y}" stroke="currentColor" stroke-width="2"/>
          <text x="${sTop.x + 6}" y="${sTop.y + 4}" font-size="16" font-style="italic" fill="currentColor">s</text>
          <!-- Vertices -->
          <circle cx="${xR}" cy="${yG}" r="3" fill="#3b82f6"/>
          <circle cx="${xS}" cy="${yG}" r="3" fill="#3b82f6"/>
          <circle cx="${xP}" cy="${yT}" r="3" fill="#3b82f6"/>
          <!-- Angle a: interior at R (between line g toward S and transversal down to P) -->
          <text x="${xR + 16}" y="${yG + 22}" font-size="15" font-style="italic" fill="currentColor">a&#176;</text>
          <!-- Angle b: exterior at S (between line g going right and transversal down to P) -->
          <text x="${xS + 12}" y="${yG + 20}" font-size="15" font-style="italic" fill="currentColor">b&#176;</text>
          <!-- Angle w: apex at P (interior angle of the triangle) -->
          <text x="${xP - 8}" y="${yT - 12}" font-size="15" font-style="italic" fill="currentColor">w&#176;</text>
        </svg>
      </div>
    `;

    return {
      questionText: `In the figure, parallel lines $g$ and $t$ are intersected by transversals $r$ and $s$, which meet to form a triangle. If $a = ${a}$ and $b = ${b}$, what is the value of $w$?`,
      figureCode,
      options: [],
      correctAnswer: w.toString(),
      explanation: `The angle marked $b^{\\circ}$ and the triangle's interior angle at the same vertex form a straight angle along line $g$, so that interior angle measures $180 - b = 180 - ${b} = ${interiorTopRight}$ degrees. The three interior angles of the triangle are $a^{\\circ} = ${a}^{\\circ}$, $${interiorTopRight}^{\\circ}$, and $w^{\\circ}$, and they sum to $180^{\\circ}$. Therefore $w = 180 - ${a} - ${interiorTopRight} = ${w}$.`
    };
  }
};
