import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 363
*
* ORIGINAL ANALYSIS:
* - Number ranges: [exteriorAngle: 100-130, not 120]
* - Difficulty factors: [Isosceles triangle, exterior angle, linear pair]
* - Distractor patterns: [Exterior angle, one base angle, sum of base angles]
* - Constraints: [Base angles equal, x = 180 - 2*baseAngle]
* - Question type: [Figure→Multiple Choice Text]
*
* Intent: triangle ABC with AB = CB (so base angles A and C are equal). Side
* AC is extended to D, forming exterior angle BCD = exteriorAngle at C. The
* interior base angle BCA is its linear-pair supplement (180 - exteriorAngle),
* angle BAC equals it, and the apex angle x = 180 - 2*baseAngle.
*/

export const generator_363 = {
  metadata: {
    id: "363",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 120 is skipped: it makes the apex angle equal a base angle (60) and the
    // exterior angle equal the sum of the base angles (120).
    let exteriorAngle = 120;
    while (exteriorAngle === 120) exteriorAngle = getRandomInt(100, 130);
    const baseAngle = 180 - exteriorAngle;   // interior base angle at A and C (50-80)
    const vertexAngle = 180 - 2 * baseAngle; // apex angle x (20-80)
    const correctAnswer = vertexAngle.toString();

    // --- Figure: isosceles triangle ABC with base AC extended to D (plain SVG) ---
    // The triangle used to be a fixed shape (base angles near 51 degrees
    // whatever the draw). It is now built in units with AC = 2 and base
    // angles of baseAngle, then scaled to fit the box.
    const width = 450, height = 250, PAD = 28;
    const rad = (d: number) => (d * Math.PI) / 180;
    const apexH = Math.tan(rad(baseAngle));
    const U = { A: [0, 0], C: [2, 0], B: [1, apexH], D: [3.1, 0] };
    const sc = Math.min((width - 2 * PAD) / 3.1, (height - 2 * PAD) / apexH);
    const ox = (width - 3.1 * sc) / 2, oy = height - PAD;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const P = (p: number[]) => [r1(ox + p[0] * sc), r1(oy - p[1] * sc)];
    const [Ax, Ay] = P(U.A), [Cx, Cy] = P(U.C), [Bx, By] = P(U.B), [Dx, Dy] = P(U.D);
    const at = (x: number, y: number, deg: number, d: number) => [r1(x + d * Math.cos(rad(deg))), r1(y - d * Math.sin(rad(deg)))];
    // Apex label goes straight down, farther when the apex angle is narrow.
    const [xlx, xly] = at(Bx, By, 270, Math.max(30, 14 / Math.sin(rad(vertexAngle / 2))));
    const [elx, ely] = at(Cx, Cy, exteriorAngle / 2, 30);                // bisector of angle BCD
    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:serif; user-select:none;">
          <line x1="${Ax}" y1="${Ay}" x2="${Bx}" y2="${By}" stroke="currentColor" stroke-width="2"/>
          <line x1="${Cx}" y1="${Cy}" x2="${Bx}" y2="${By}" stroke="currentColor" stroke-width="2"/>
          <line x1="${Ax}" y1="${Ay}" x2="${Dx}" y2="${Dy}" stroke="currentColor" stroke-width="2"/>
          <text x="${Ax - 14}" y="${Ay + 6}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">A</text>
          <text x="${Cx}" y="${Cy + 20}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">C</text>
          <text x="${Bx}" y="${By - 8}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">B</text>
          <text x="${Dx + 14}" y="${Dy + 6}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">D</text>
          <text x="${elx}" y="${ely + 5}" text-anchor="middle" font-size="15" fill="currentColor">${exteriorAngle}&#176;</text>
          <text x="${xlx}" y="${xly + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">x&#176;</text>
        </svg>
      </div>
    `;

    // Each wrong choice is a real slip; the old ones included half a base
    // angle (rounded) and the answer plus 10 or minus 5. With 120 skipped,
    // x, the exterior angle, a base angle, and twice a base angle never collide.
    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: "" },
      { text: exteriorAngle.toString(), isCorrect: false, reason: `${exteriorAngle} is the measure of exterior angle $BCD$, not of angle $ABC$` },
      { text: baseAngle.toString(), isCorrect: false, reason: `${baseAngle} is the measure of each base angle, $BAC$ and $BCA$, not of angle $ABC$` },
      { text: (2 * baseAngle).toString(), isCorrect: false, reason: `${2 * baseAngle} is the sum of the measures of the two base angles, $2(${baseAngle})$; this sum must be subtracted from 180` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the given figure, $\\overline{AC}$ extends to point $D$. If the measure of $\\angle BAC$ is equal to the measure of $\\angle BCA$, what is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Angles $BCA$ and $BCD$ form a linear pair, so the measure of angle $BCA$ is $180^{\\circ} - ${exteriorAngle}^{\\circ} = ${baseAngle}^{\\circ}$. Since the measure of angle $BAC$ is equal to the measure of angle $BCA$, angle $BAC$ also measures ${baseAngle}°. The sum of the measures of the angles of a triangle is $180^{\\circ}$, so $x = 180 - ${baseAngle} - ${baseAngle} = ${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
