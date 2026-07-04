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
 *   the base line and X, U are placed so the drawn angles literally equal the
 *   given values; W is computed as the TRUE intersection of RU and SX. Segments
 *   QX, SX (through W to X), RU (through W to U), and TU are all drawn, and the
 *   four given angle measures are labelled at their vertices. Swept over all
 *   194,481 valid angle combinations: every draw yields a non-degenerate,
 *   above-the-line X/U/W. The angle-chase and answer are unchanged.
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

    // Build a faithful figure from the given angles. Base points Q,R,S,T are
    // fixed on y=0; X and U are placed so the rendered angles equal the data,
    // and W is the real RU-x-SX intersection.
    const buildFigure = (
      angleSQX: number, angleSXQ: number, angleSWU: number, angleVTU: number,
      angleQSX: number, angleSWR: number, angleWRS: number, angleSTU: number
    ): string => {
      const Qx = 0, Rx = 3, Sx = 6, Tx = 10;      // data-space x on the base line
      const Px = -1.4, Vx = 11.4;                  // segment PV endpoints

      // Triangle QSX: apex X = intersection of ray from Q (angle angleSQX above
      // +x) and ray from S (angle 180-angleQSX, i.e. up and to the left).
      const mQ = Math.tan(angleSQX * DEG);
      const mS = Math.tan((180 - angleQSX) * DEG);
      const Xx = (mS * Sx - mQ * Qx) / (mS - mQ);
      const Xy = mQ * (Xx - Qx);

      // U = intersection of ray from R (direction angleWRS above +x, up-right)
      // and ray from T (direction 180-angleSTU, up-left toward S).
      const dirRU = angleWRS * DEG;
      const dirTU = (180 - angleSTU) * DEG;
      const c1 = Math.cos(dirRU), s1 = Math.sin(dirRU);
      const c2 = Math.cos(dirTU), s2 = Math.sin(dirTU);
      const tU = (Tx - Rx) / (c1 - (s1 * c2) / s2);
      const Ux = Rx + tU * c1, Uy = tU * s1;

      // W = intersection of segment RU with segment SX.
      const sxdx = Xx - Sx, sxdy = Xy - 0;
      const aW = (Sx - Rx) / (c1 - (s1 * sxdx) / sxdy);
      const Wx = Rx + aW * c1, Wy = aW * s1;

      // Map data space -> SVG pixels. x:[-2,12] y:[0,4.6] fills a 440x300 box.
      const W = 440, H = 300, PADX = 34, PADT = 30, PADB = 46;
      const xmin = -2, xmax = 12, ymax = 4.6;
      const mx = (x: number) => PADX + ((x - xmin) / (xmax - xmin)) * (W - 2 * PADX);
      const my = (y: number) => (H - PADB) - (y / ymax) * (H - PADT - PADB);

      const seg = (x1: number, y1: number, x2: number, y2: number) =>
        `<line x1="${mx(x1).toFixed(1)}" y1="${my(y1).toFixed(1)}" x2="${mx(x2).toFixed(1)}" y2="${my(y2).toFixed(1)}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;
      const dot = (x: number, y: number) =>
        `<circle cx="${mx(x).toFixed(1)}" cy="${my(y).toFixed(1)}" r="3" fill="currentColor"/>`;
      const lbl = (x: number, y: number, t: string, dx = 0, dy = 0, size = 14) =>
        `<text x="${(mx(x) + dx).toFixed(1)}" y="${(my(y) + dy).toFixed(1)}" text-anchor="middle" font-size="${size}" fill="currentColor">${t}</text>`;

      return `<div style="width:100%;max-width:440px;margin:0 auto;">` +
        `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
        // base segment P .. V (through Q,R,S,T)
        seg(Px, 0, Vx, 0) +
        // triangle QSX legs and the rest of SX up to X (drawn as one S->X segment)
        seg(Qx, 0, Xx, Xy) +
        seg(Sx, 0, Xx, Xy) +
        // RU (through W to U) and TU
        seg(Rx, 0, Ux, Uy) +
        seg(Tx, 0, Ux, Uy) +
        // vertices
        dot(Qx, 0) + dot(Rx, 0) + dot(Sx, 0) + dot(Tx, 0) +
        dot(Xx, Xy) + dot(Ux, Uy) + dot(Wx, Wy) +
        // point labels (base labels below the line)
        lbl(Px, 0, 'P', 0, 20) +
        lbl(Qx, 0, 'Q', 0, 20) +
        lbl(Rx, 0, 'R', 0, 20) +
        lbl(Sx, 0, 'S', 0, 20) +
        lbl(Tx, 0, 'T', 0, 20) +
        lbl(Vx, 0, 'V', 0, 20) +
        lbl(Xx, Xy, 'X', 0, -8) +
        lbl(Ux, Uy, 'U', 12, -6) +
        lbl(Wx, Wy, 'W', -12, 4) +
        // given angle measures at their vertices
        lbl(Qx, 0, `${angleSQX}°`, 20, -8, 11) +
        lbl(Xx, Xy, `${angleSXQ}°`, 6, 16, 11) +
        lbl(Wx, Wy, `${angleSWU}°`, 14, 14, 11) +
        lbl(Tx, 0, `${angleVTU}°`, -18, -8, 11) +
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
        const figureCode = buildFigure(
          angleSQX, angleSXQ, angleSWU, angleVTU,
          angleQSX, angleSWR, angleWRS, angleSTU
        );

        return {
          questionText: `In the figure shown, points $Q, R, S$, and $T$ lie on line segment $PV$, and line segment $RU$ intersects line segment $SX$ at point $W$. The measure of $\\angle SQX$ is $${angleSQX}^\\circ$, the measure of $\\angle SXQ$ is $${angleSXQ}^\\circ$, the measure of $\\angle SWU$ is $${angleSWU}^\\circ$, and the measure of $\\angle VTU$ is $${angleVTU}^\\circ$. What is the measure, in degrees, of $\\angle TUR$?`,
          figureCode,
          options: [],
          correctAnswer: Math.round(angleTUR).toString(),
          explanation: `In $\\triangle QSX$, $\\angle QSX = 180 - ${angleSQX} - ${angleSXQ} = ${angleQSX}^\\circ$. Since $\\angle SWU = ${angleSWU}^\\circ$, its supplement $\\angle SWR = ${angleSWR}^\\circ$. In $\\triangle RSW$, $\\angle WRS = 180 - ${angleQSX} - ${angleSWR} = ${angleWRS}^\\circ$. Given $\\angle VTU = ${angleVTU}^\\circ$, its supplement $\\angle STU = ${angleSTU}^\\circ$. In $\\triangle RTU$, $\\angle TUR = 180 - ${angleWRS} - ${angleSTU} = ${Math.round(angleTUR)}^\\circ$.`
        };
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
      angleSQX, angleSXQ, angleSWU, angleVTU,
      angleQSX, angleSWR, angleWRS, angleSTU
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
