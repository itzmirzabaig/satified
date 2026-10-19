import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 356
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle1: 60-80, angle2: 40-60]
* - Difficulty factors: [Triangle exterior angle theorem or sum of remote interior angles]
* - Distractor patterns: [Third interior angle, exterior angle at either base vertex]
* - Constraints: [x = angle1 + angle2]
* - Question type: [Figure→Multiple Choice Text]
*/

export const generator_356 = {
  metadata: {
    id: "356",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Each wrong choice is a real slip; the old ones were the answer plus or
    // minus 10 and the answer plus 20. Redraw until the four values differ
    // (for example, angles of 60 and 60 make 180 - 60 equal 60 + 60).
    let angle1 = 60, angle2 = 40;
    do {
      angle1 = getRandomInt(60, 80);
      angle2 = getRandomInt(40, 60);
    } while (new Set([angle1 + angle2, 180 - angle1 - angle2, 180 - angle1, 180 - angle2]).size < 4);
    const thirdAngle = 180 - angle1 - angle2;
    const exteriorAngle = angle1 + angle2;

    // The figure used to be a fixed Mafs sketch on a black box: an isosceles
    // triangle whatever the angles, with only one side extended. This SVG
    // draws the triangle with its true angles. Side BC is extended past the
    // top vertex C, and x is the exterior angle there; the base is extended
    // past B. Math coords, y up: A = (0, 0), B = (1, 0).
    const rad = (d: number) => (d * Math.PI) / 180;
    const t1 = Math.tan(rad(angle1)), t2 = Math.tan(rad(angle2));
    const C = { x: t2 / (t1 + t2), y: (t1 * t2) / (t1 + t2) };
    const bcLen = Math.hypot(C.x - 1, C.y);
    const E = { x: C.x + 0.42 * (C.x - 1) / bcLen, y: C.y + 0.42 * C.y / bcLen }; // end of BC extended
    const polar = (P: { x: number; y: number }, deg: number, r: number) => ({ x: P.x + r * Math.cos(rad(deg)), y: P.y + r * Math.sin(rad(deg)) });
    const l1 = polar({ x: 0, y: 0 }, angle1 / 2, 0.25);
    const l2 = polar({ x: 1, y: 0 }, 180 - angle2 / 2, 0.25);
    const lx = polar(C, 180 - angle2 + exteriorAngle / 2, 0.15);
    const W = 420, H = 270, PAD = 16;
    const xmin = Math.min(-0.08, E.x) - 0.05, xmax = 1.45, ymin = -0.08, ymax = E.y + 0.06;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => Math.round((ox + (v - xmin) * sc) * 10) / 10;
    const my = (v: number) => Math.round((H - (oy + (v - ymin) * sc)) * 10) / 10;
    const label = (P: { x: number; y: number }, s: string, italic = false) =>
      `<text x="${mx(P.x)}" y="${my(P.y) + 5}" text-anchor="middle" font-size="15" font-family="serif"${italic ? ' font-style="italic"' : ''} fill="currentColor">${s}</text>`;
    const figureCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${mx(0)},${my(0)} ${mx(1)},${my(0)} ${mx(C.x)},${my(C.y)}" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <line x1="${mx(1)}" y1="${my(0)}" x2="${mx(1.42)}" y2="${my(0)}" stroke="currentColor" stroke-width="2"/>
  <line x1="${mx(C.x)}" y1="${my(C.y)}" x2="${mx(E.x)}" y2="${my(E.y)}" stroke="currentColor" stroke-width="2"/>
  ${label(l1, `${angle1}°`)}
  ${label(l2, `${angle2}°`)}
  ${label(lx, 'x°', true)}
</svg></div>`;

    const correctAnswer = exteriorAngle.toString();

    const optionsData = [
      { text: thirdAngle.toString(), isCorrect: false, reason: `${thirdAngle} is the measure of the third interior angle of the triangle, $180 - ${angle1} - ${angle2}$; the angle with measure $x^{\\circ}$ is supplementary to this angle` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: (180 - angle1).toString(), isCorrect: false, reason: `${180 - angle1} is the measure of the exterior angle at the vertex with the ${angle1}° angle, not the exterior angle marked $x^{\\circ}$` },
      { text: (180 - angle2).toString(), isCorrect: false, reason: `${180 - angle2} is the measure of the exterior angle at the vertex with the ${angle2}° angle, not the exterior angle marked $x^{\\circ}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, two sides of a triangle are extended. What is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The measure of an exterior angle of a triangle is equal to the sum of the measures of the two interior angles that are not adjacent to it. The angle with measure $x^{\\circ}$ is an exterior angle, and the two nonadjacent interior angles have measures ${angle1}° and ${angle2}°. Therefore, $x = ${angle1} + ${angle2} = ${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};