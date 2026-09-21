import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1336
 *
 * FIXED (was FIGURE_MISMATCH — the angle math and the answers were already
 * correct; only the figure was broken):
 * - The old figure never drew segment SX (it drew U->S instead) and placed W
 *   at a made-up midpoint that lay on none of the drawn segments, and showed
 *   none of the given angle values.
 * - The figure is now built by a faithful trig construction: Q, R, S, T sit on
 *   the base line and X and U are placed so the drawn angles literally equal the
 *   given values; W is computed as the TRUE intersection of RU and SX. Segments
 *   QX, SX (through W to X), RU (through W to U), and TU are all drawn, and the
 *   four given angle measures are labelled at their vertices. The angle-chase
 *   and answer are unchanged.
 *
 * FIXED (figure cramped and hard to read — question logic, stem, and answer
 * are untouched):
 * - Uniform aspect: the old mapper stretched the y-axis ~1.8x versus the
 *   x-axis, so every drawn angle rendered much steeper than its label (a 48
 *   degree label on a visually ~65 degree wedge). One uniform scale now, so
 *   every arc on screen actually measures its label.
 * - Adaptive window and height: the old fixed window wasted up to half the
 *   canvas; the figure now fits its actual geometry (canvas widened to 560,
 *   height hugs the content). Fonts grew: values 11 -> 13, letters 14 -> 15.
 * - Arcs and safe label spots: each given angle gets a small arc, and its
 *   value is placed in a verified-clear part of its wedge (the old fixed
 *   pixel offsets dropped numbers straight onto the segments). The 85-degree
 *   value leans toward the S side of its wedge, away from U, and the W letter
 *   sits in the empty wedge between W->X and W->R.
 * - Figure-validity gates added to the EXISTING retry loop (figure code, not
 *   question logic): (a) W must lie ON segment RU (tU > aW with margin) — for
 *   steep-RU draws such as 60/90/95/170 the old construction put W past U,
 *   so the drawn segment RU never reached W, contradicting the stem; (b) W is
 *   kept high enough that the SWU value fits above the base line. The angle
 *   ranges, angle chase, answer, stem, and explanation are unchanged, and the
 *   fixed fallback instance passes both gates.
 */

export const generator_1336 = {
  metadata: {
    id: "1336",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const DEG = Math.PI / 180;

    // Base points on the line, data-space x. Q, R, S, T are unchanged from the
    // original construction; P and V are the segment's endpoints (tightened
    // slightly so the base line doesn't waste canvas width).
    const Qx = 0, Rx = 3, Sx = 6, Tx = 10;
    const Px = Qx - 0.9, Vx = Tx + 0.9;

    // Geometry from the given angles — the SAME construction the figure has
    // always used, hoisted out so the retry loop can validate it before drawing.
    // Triangle QSX: X = intersection of the ray from Q (angleSQX above +x) and
    // the ray from S (180 - angleQSX, up and to the left). U = intersection of
    // the ray from R (angleWRS above +x) and the ray from T (180 - angleSTU,
    // up-left). W = intersection of RU with SX.
    const computeGeometry = (
      angleSQX: number, angleQSX: number, angleWRS: number, angleSTU: number
    ) => {
      const mQ = Math.tan(angleSQX * DEG);
      const mS = Math.tan((180 - angleQSX) * DEG);
      const Xx = (mS * Sx - mQ * Qx) / (mS - mQ);
      const Xy = mQ * (Xx - Qx);

      const dirRU = angleWRS * DEG;
      const dirTU = (180 - angleSTU) * DEG;
      const c1 = Math.cos(dirRU), s1 = Math.sin(dirRU);
      const c2 = Math.cos(dirTU), s2 = Math.sin(dirTU);
      const tU = (Tx - Rx) / (c1 - (s1 * c2) / s2);
      const Ux = Rx + tU * c1, Uy = tU * s1;

      const sxdx = Xx - Sx, sxdy = Xy - 0;
      const aW = (Sx - Rx) / (c1 - (s1 * sxdx) / sxdy);
      const Wx = Rx + aW * c1, Wy = aW * s1;

      return { Xx, Xy, Ux, Uy, Wx, Wy, tU, aW };
    };

    // The figure. Uniform scale (angles render true), window fitted to the
    // actual geometry, arcs on the four given angles with their values placed
    // in verified-clear spots (all positions are data-space and were checked
    // against every segment across the full angle ranges).
    const buildFigure = (
      geo: { Xx: number; Xy: number; Ux: number; Uy: number; Wx: number; Wy: number },
      angleSQX: number, angleQSX: number, angleSWU: number, angleWRS: number, angleSTU: number
    ): string => {
      const { Xx, Xy, Ux, Uy, Wx, Wy } = geo;

      const W = 560, PT = 26, PB = 22, PL = 28, PR = 28;
      const xmin = Px - 0.35, xmax = Vx + 0.35;
      const ymin = -0.75;
      const ymax = Math.max(Xy, Uy) + 0.6;
      const sc = (W - PL - PR) / (xmax - xmin);
      const H = Math.round(PT + (ymax - ymin) * sc + PB);
      const mx = (x: number) => PL + (x - xmin) * sc;
      const my = (y: number) => PT + (ymax - y) * sc;

      const seg = (x1: number, y1: number, x2: number, y2: number) =>
        `<line x1="${mx(x1).toFixed(1)}" y1="${my(y1).toFixed(1)}" x2="${mx(x2).toFixed(1)}" y2="${my(y2).toFixed(1)}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;
      const dot = (x: number, y: number) =>
        `<circle cx="${mx(x).toFixed(1)}" cy="${my(y).toFixed(1)}" r="3" fill="currentColor"/>`;
      // CCW arc of radius r around (cx, cy), from direction a1 to a2 (degrees).
      const arc = (cx: number, cy: number, a1: number, a2: number, r: number) => {
        const span = (((a2 - a1) % 360) + 360) % 360;
        let d = "";
        for (let i = 0; i <= 16; i++) {
          const t = (a1 + (span * i) / 16) * DEG;
          d += `${i === 0 ? "M" : "L"}${mx(cx + r * Math.cos(t)).toFixed(1)} ${my(cy + r * Math.sin(t)).toFixed(1)} `;
        }
        return `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
      };
      const txt = (x: number, y: number, t: string, size: number) =>
        `<text x="${mx(x).toFixed(1)}" y="${(my(y) + 4.5).toFixed(1)}" text-anchor="middle" font-size="${size}" fill="currentColor">${t}</text>`;
      // Text at distance d from a vertex, in direction dir (degrees).
      const at = (cx: number, cy: number, dir: number, d: number, t: string, size: number) =>
        txt(cx + d * Math.cos(dir * DEG), cy + d * Math.sin(dir * DEG), t, size);

      const angleSXQ = 180 - angleSQX - angleQSX;
      const angleVTU = 180 - angleSTU;

      // Label positions, in data units so they scale with the figure:
      //  - Q value: bisector of the SQX wedge; X value: bisector of the SXQ
      //    wedge (both interior, far from the sides).
      //  - W value: S-side of the SWU wedge (keeps it clear of U, which sits
      //    close to W on the WU ray); W letter: the empty left wedge.
      //  - T value: bisector of the wide VTU wedge (above T, right of TU).
      const qValDir = angleSQX / 2;
      const xValDir = 270 + (angleSQX - angleQSX) / 2;
      const wValDir = (360 - angleQSX) + 0.45 * angleSWU;
      const tValDir = (180 - angleSTU) / 2;
      const wLetDir = 180 + (angleWRS - angleQSX) / 2;

      return `<div style="width:100%;max-width:560px;margin:0 auto;">` +
        `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
        // base segment P .. V (through Q, R, S, T)
        seg(Px, 0, Vx, 0) +
        // triangle QSX legs and the rest of SX up to X (through W)
        seg(Qx, 0, Xx, Xy) +
        seg(Sx, 0, Xx, Xy) +
        // RU (through W to U) and TU
        seg(Rx, 0, Ux, Uy) +
        seg(Tx, 0, Ux, Uy) +
        // arcs on the four given angles
        arc(Qx, 0, 0, angleSQX, 0.32) +
        arc(Xx, Xy, 180 + angleSQX, 360 - angleQSX, 0.32) +
        arc(Wx, Wy, 360 - angleQSX, angleWRS, 0.20) +
        arc(Tx, 0, 0, 180 - angleSTU, 0.36) +
        // vertices
        dot(Qx, 0) + dot(Rx, 0) + dot(Sx, 0) + dot(Tx, 0) +
        dot(Xx, Xy) + dot(Ux, Uy) + dot(Wx, Wy) +
        // point labels
        txt(Px, -0.45, 'P', 15) + txt(Qx, -0.45, 'Q', 15) + txt(Rx, -0.45, 'R', 15) +
        txt(Sx, -0.45, 'S', 15) + txt(Tx, -0.45, 'T', 15) + txt(Vx, -0.45, 'V', 15) +
        txt(Xx, Xy + 0.35, 'X', 15) +
        txt(Ux, Uy + 0.32, 'U', 15) +
        at(Wx, Wy, wLetDir, 0.38, 'W', 15) +
        // given angle measures, just outside their arcs
        at(Qx, 0, qValDir, 0.85, `${angleSQX}\u00B0`, 13) +
        at(Xx, Xy, xValDir, 0.55, `${angleSXQ}\u00B0`, 13) +
        at(Wx, Wy, wValDir, 0.55, `${angleSWU}\u00B0`, 13) +
        at(Tx, 0, tValDir, 0.8, `${angleVTU}\u00B0`, 13) +
        `</svg></div>`;
    };

    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      attempts++;

      // STEP 1: Generate angles ensuring triangle angle sums work
      const angleSQX = getRandomInt(40, 60);
      const angleSXQ = getRandomInt(70, 90);
      const angleQSX = 180 - angleSQX - angleSXQ;

      const angleSWU = getRandomInt(75, 95);
      const angleSWR = 180 - angleSWU;

      const angleVTU = getRandomInt(150, 170);
      const angleSTU = 180 - angleVTU;

      // STEP 2: Calculate derived angles
      const angleWRS = 180 - angleQSX - angleSWR;
      const angleTUR = 180 - angleWRS - angleSTU;

      if (angleTUR > 0 && angleTUR < 180 && Number.isInteger(angleTUR)) {
        const geo = computeGeometry(angleSQX, angleQSX, angleWRS, angleSTU);
        // Figure-validity gates (figure code, not question logic):
        //  (a) W must lie ON segment RU (tU > aW with margin) — otherwise the
        //      drawn segment RU ends before reaching W and contradicts the
        //      stem's "line segment RU intersects line segment SX at W";
        //  (b) W high enough that the SWU value fits above the base line.
        if (geo.tU - geo.aW >= 0.35 && geo.Wy >= 0.55) {
          const figureCode = buildFigure(geo, angleSQX, angleQSX, angleSWU, angleWRS, angleSTU);

          return {
            questionText: `In the figure shown, points $Q, R, S$, and $T$ lie on line segment $PV$, and line segment $RU$ intersects line segment $SX$ at point $W$. The measure of $\\angle SQX$ is $${angleSQX}^\\circ$, the measure of $\\angle SXQ$ is $${angleSXQ}^\\circ$, the measure of $\\angle SWU$ is $${angleSWU}^\\circ$, and the measure of $\\angle VTU$ is $${angleVTU}^\\circ$. What is the measure, in degrees, of $\\angle TUR$?`,
            figureCode,
            options: [],
            correctAnswer: Math.round(angleTUR).toString(),
            explanation: `In $\\triangle QSX$, $\\angle QSX = 180 - ${angleSQX} - ${angleSXQ} = ${angleQSX}^\\circ$. Since $\\angle SWU = ${angleSWU}^\\circ$, its supplement $\\angle SWR = ${angleSWR}^\\circ$. In $\\triangle RSW$, $\\angle WRS = 180 - ${angleQSX} - ${angleSWR} = ${angleWRS}^\\circ$. Given $\\angle VTU = ${angleVTU}^\\circ$, its supplement $\\angle STU = ${angleSTU}^\\circ$. In $\\triangle RTU$, $\\angle TUR = 180 - ${angleWRS} - ${angleSTU} = ${Math.round(angleTUR)}^\\circ$.`
          };
        }
        // Figure cannot be drawn truthfully for this draw — retry.
      }
    }

    // Fallback (fixed valid instance)
    const angleSQX = 48;
    const angleSXQ = 86;
    const angleQSX = 46;
    const angleSWU = 85;
    const angleSWR = 95;
    const angleVTU = 162;
    const angleSTU = 18;
    const angleWRS = 39;
    const angleTUR = 123;

    const figureCode = buildFigure(
      computeGeometry(angleSQX, angleQSX, angleWRS, angleSTU),
      angleSQX, angleQSX, angleSWU, angleWRS, angleSTU
    );

    return {
      questionText: `In the figure shown, points $Q, R, S$, and $T$ lie on line segment $PV$, and line segment $RU$ intersects line segment $SX$ at point $W$. The measure of $\\angle SQX$ is $${angleSQX}^\\circ$, the measure of $\\angle SXQ$ is $${angleSXQ}^\\circ$, the measure of $\\angle SWU$ is $${angleSWU}^\\circ$, and the measure of $\\angle VTU$ is $${angleVTU}^\\circ$. What is the measure, in degrees, of $\\angle TUR$?`,
      figureCode,
      options: [],
      correctAnswer: angleTUR.toString(),
      explanation: `In $\\triangle QSX$, $\\angle QSX = 180 - ${angleSQX} - ${angleSXQ} = ${angleQSX}^\\circ$. Since $\\angle SWU = ${angleSWU}^\\circ$, its supplement $\\angle SWR = ${angleSWR}^\\circ$. In $\\triangle RSW$, $\\angle WRS = 180 - ${angleQSX} - ${angleSWR} = ${angleWRS}^\\circ$. Given $\\angle VTU = ${angleVTU}^\\circ$, its supplement $\\angle STU = ${angleSTU}^\\circ$. In $\\triangle RTU$, $\\angle TUR = 180 - ${angleWRS} - ${angleSTU} = ${angleTUR}^\\circ$.`
    };
  }
};