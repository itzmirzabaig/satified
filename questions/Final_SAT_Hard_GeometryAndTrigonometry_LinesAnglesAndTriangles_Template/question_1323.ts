import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1323
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle: 100-150°, sides PS/WZ are extraneous]
 * - Difficulty factors: [Similar polygons, corresponding angles, extraneous information]
 * - Distractor patterns: [supplement 180-angle, angle/scale, angle*scale]
 * - Constraints: [Corresponding angles in similar quadrilaterals are congruent]
 * - Question type: [Figure→Multiple Choice]
 *
 * Intent: Quadrilaterals PQRS ~ WXYZ with P,Q,R corresponding to W,X,Y, so S
 * corresponds to Z. Corresponding angles of similar polygons are congruent, so
 * m∠Z = m∠S. The side lengths PS and WZ are extraneous. Answer = angleS.
 */

export const generator_1323 = {
  metadata: {
    id: "1323",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate the angle (the answer) plus extraneous, clean side
    // lengths. Bounded retry guarantees the four option VALUES are all
    // distinct for the emitted draw (only collision is supplement vs angle/k).
    let angleS = 0, k = 2, WZ = 0, PS = 0;
    let d1 = 0, d2 = 0, d3 = 0;
    let tries = 0;
    do {
      angleS = getRandomInt(100, 150);           // obtuse angle, the answer
      k = getRandomElement([2, 3]);              // integer similarity ratio
      WZ = getRandomInt(10, 20);                 // side of WXYZ (extraneous)
      PS = k * WZ;                               // side of PQRS (extraneous), clean ratio
      d1 = 180 - angleS;                         // supplement confusion (30-80)
      d2 = Math.round(angleS / k);               // divides angle by ratio
      d3 = angleS * k;                           // multiplies angle by ratio
    } while (
      tries++ < 50 &&
      new Set([angleS, d1, d2, d3]).size !== 4
    );

    // STEP 2: Build options (all integer angle measures, no float artifacts)
    const optionsData = [
      {
        text: `$${angleS}^\\circ$`,
        isCorrect: true,
        reason: "corresponding angles in similar polygons are congruent, so $m\\angle Z = m\\angle S$"
      },
      {
        text: `$${d2}^\\circ$`,
        isCorrect: false,
        reason: "results from dividing the angle by the ratio of the side lengths, but angle measures do not scale between similar figures"
      },
      {
        text: `$${d3}^\\circ$`,
        isCorrect: false,
        reason: "results from multiplying the angle by the ratio of the side lengths, but corresponding angles are congruent, not scaled"
      },
      {
        text: `$${d1}^\\circ$`,
        isCorrect: false,
        reason: "is the supplement of $\\angle S$ rather than an angle congruent to it"
      }
    ];

    // STEP 3: Shuffle and assign letters (letters known only after shuffle)
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 4: Figure — two similar quadrilaterals as plain SVG. The numeric
    // labels (angleS, PS, WZ) shown in the figure match the question's numbers.
    const W = 450, H = 250;
    // PQRS (left, larger). Vertices ordered P, Q, R, S.
    const P = { x: 55, y: 60 }, Q = { x: 175, y: 45 }, R = { x: 195, y: 175 }, S = { x: 70, y: 200 };
    // WXYZ (right, smaller scaled copy). Vertices ordered W, X, Y, Z.
    const Wp = { x: 300, y: 95 }, Xp = { x: 375, y: 85 }, Yp = { x: 388, y: 168 }, Zp = { x: 310, y: 183 };
    const poly = (pts: { x: number; y: number }[]) =>
      pts.map(p => `${p.x},${p.y}`).join(' ');
    const vlabel = (p: { x: number; y: number }, t: string, dx: number, dy: number) =>
      `<text x="${p.x + dx}" y="${p.y + dy}" text-anchor="middle" font-size="13" font-weight="bold" fill="currentColor">${t}</text>`;
    const mid = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
    const psMid = mid(P, S), wzMid = mid(Wp, Zp);

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${poly([P, Q, R, S])}" fill="none" stroke="#3b82f6" stroke-width="2"/>` +
      `<polygon points="${poly([Wp, Xp, Yp, Zp])}" fill="none" stroke="#3b82f6" stroke-width="2"/>` +
      vlabel(P, 'P', -10, -4) + vlabel(Q, 'Q', 8, -6) + vlabel(R, 'R', 12, 6) + vlabel(S, 'S', -10, 14) +
      vlabel(Wp, 'W', -10, -4) + vlabel(Xp, 'X', 8, -6) + vlabel(Yp, 'Y', 12, 8) + vlabel(Zp, 'Z', -10, 14) +
      // angle mark at S
      `<text x="${S.x + 16}" y="${S.y - 12}" text-anchor="middle" font-size="12" fill="currentColor">${angleS}°</text>` +
      // side length labels
      `<text x="${psMid.x - 18}" y="${psMid.y}" text-anchor="middle" font-size="12" fill="currentColor">${PS}</text>` +
      `<text x="${wzMid.x - 16}" y="${wzMid.y}" text-anchor="middle" font-size="12" fill="currentColor">${WZ}</text>` +
      `</svg></div>`;

    return {
      questionText: `Quadrilaterals $PQRS$ and $WXYZ$ are similar, where $P$, $Q$, and $R$ correspond to $W$, $X$, and $Y$, respectively. The measure of $\\angle S$ is ${angleS} degrees, and the side lengths are $PS=${PS}$ and $WZ=${WZ}$. What is the measure of $\\angle Z$, in degrees?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Since quadrilaterals $PQRS$ and $WXYZ$ are similar and $P$, $Q$, $R$ correspond to $W$, $X$, $Y$, vertex $S$ corresponds to vertex $Z$. Corresponding angles of similar polygons are congruent, so $m\\angle Z = m\\angle S = ${angleS}^\\circ$. The side lengths $PS=${PS}$ and $WZ=${WZ}$ are extraneous information. Thus Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
