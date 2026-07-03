import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1347
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [adjacent leg: 11, hypotenuse: 28, cos(x°) = 11/28]
 * - Difficulty factors: [Basic cosine ratio, identifying adjacent side and hypotenuse]
 * - Constraints: [cos = adjacent/hypotenuse]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with sides labeled]
 */

// Greatest common divisor (Euclid) so the ratio can be reduced to lowest terms.
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export const generator_1347 = {
  metadata: {
    id: "1347",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // cos(x°) = adjacent / hypotenuse. Adjacent leg is strictly shorter than the
    // hypotenuse for every draw, so the ratio is a valid cosine in (0, 1).
    const hypotenuse = getRandomInt(15, 30);
    const adjacent = getRandomInt(5, hypotenuse - 5);

    // Length of the opposite leg (used only to shape the figure; never shown to
    // the student, so an irrational value here is fine).
    const opposite = Math.sqrt(hypotenuse * hypotenuse - adjacent * adjacent);

    // Reduce the cosine ratio to lowest terms for the canonical answer.
    const g = gcd(adjacent, hypotenuse);
    const reducedNum = adjacent / g;
    const reducedDen = hypotenuse / g;

    // ── Figure: right triangle with the right angle at the far end of the
    // adjacent leg. Angle x sits at the left vertex, between the adjacent leg
    // (horizontal) and the hypotenuse (slanted). The drawing is scaled from the
    // true side proportions so it always fits the viewBox. ────────────────────
    const W = 420, H = 300;
    const padX = 60, padTop = 40, padBottom = 55;
    const availW = W - 2 * padX;
    const availH = H - padTop - padBottom;
    // Scale so the wider of the two legs fills the available space.
    const scale = Math.min(availW / adjacent, availH / opposite);
    const baseLen = adjacent * scale;
    const riseLen = opposite * scale;

    // Vertices: A = angle x (bottom-left), B = right angle (bottom-right),
    // C = top (above B). Right angle is at B.
    const ax = padX;
    const ay = H - padBottom;
    const bx = ax + baseLen;
    const by = ay;
    const cx = bx;
    const cy = by - riseLen;

    // Small square marking the right angle at B.
    const sq = 12;
    const rightAngleMark =
      `<path d="M ${bx - sq} ${by} L ${bx - sq} ${by - sq} L ${bx} ${by - sq}" ` +
      `fill="none" stroke="currentColor" stroke-width="1.5"/>`;

    // Arc marking angle x at vertex A.
    const arcR = 26;
    const dirX = (cx - ax), dirY = (cy - ay);
    const dirLen = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
    const arcEndX = ax + (dirX / dirLen) * arcR;
    const arcEndY = ay + (dirY / dirLen) * arcR;
    const angleArc =
      `<path d="M ${ax + arcR} ${ay} A ${arcR} ${arcR} 0 0 0 ${arcEndX} ${arcEndY}" ` +
      `fill="none" stroke="currentColor" stroke-width="1.5"/>`;

    const figureCode =
      `<div style="width:100%;max-width:420px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" ` +
      `xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">` +
      // Triangle
      `<polygon points="${ax},${ay} ${bx},${by} ${cx},${cy}" ` +
      `fill="#3b82f6" fill-opacity="0.08" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>` +
      rightAngleMark +
      angleArc +
      // Angle label x°
      `<text x="${ax + arcR + 10}" y="${ay - 8}" font-size="18" fill="currentColor" stroke="none">x&#176;</text>` +
      // Adjacent leg label (below the base)
      `<text x="${(ax + bx) / 2}" y="${ay + 26}" text-anchor="middle" font-size="16" fill="currentColor" stroke="none">${adjacent}</text>` +
      // Hypotenuse label (near the midpoint of the slanted side, offset up-left)
      `<text x="${(ax + cx) / 2 - 14}" y="${(ay + cy) / 2 - 6}" text-anchor="end" font-size="16" fill="currentColor" stroke="none">${hypotenuse}</text>` +
      `</svg></div>`;

    return {
      questionText: `In the right triangle shown, what is the value of $\\cos x^\\circ$? (Enter your answer as a fraction or decimal.)`,
      figureCode,
      options: [], // Fill in the blank
      correctAnswer: `${reducedNum}/${reducedDen}`,
      explanation: `The cosine of an acute angle in a right triangle is the ratio of the length of the leg adjacent to the angle to the length of the hypotenuse. In the triangle shown, the leg adjacent to the angle measuring $x^\\circ$ has length ${adjacent} and the hypotenuse has length ${hypotenuse}. Therefore $\\cos x^\\circ = \\frac{${adjacent}}{${hypotenuse}} = \\frac{${reducedNum}}{${reducedDen}}$.`
    };
  }
};
