import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 362
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [given obtuse angle: 130-160]
 * - Difficulty factors: [Vertical, corresponding, or alternate exterior angles]
 * - Distractor patterns: [Less than, greater than, cannot be determined]
 * - Question type: [Figure→Multiple Choice Text]
 *
 * FIXED:
 * - The old Mafs figure was a fixed sketch on a black box (the obtuse angle
 *   drew near 127 degrees whatever its label), and two choices had the same
 *   reason word for word.
 * - The figure is now an SVG with k at the true angle. The given angle is
 *   above m and right of k; x is drawn at random as its vertical angle at m,
 *   its corresponding angle at n, or its alternate exterior angle at n, and
 *   the explanation names the pair.
 */

export const generator_362 = {
  metadata: {
    id: "362",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(130, 160);
    const acute = 180 - givenAngle;

    // Where x sits: 'BL' is below the line and left of k, 'AR' above and right.
    const pos = getRandomElement([
      { line: 'm', wedge: 'BL', name: 'vertical angles', why: 'Vertical angles are congruent.', parallelNeeded: false },
      { line: 'n', wedge: 'AR', name: 'corresponding angles', why: 'Since lines $m$ and $n$ are parallel, corresponding angles are congruent.', parallelNeeded: true },
      { line: 'n', wedge: 'BL', name: 'alternate exterior angles', why: 'Since lines $m$ and $n$ are parallel, alternate exterior angles are congruent.', parallelNeeded: true }
    ]);

    // Pixel layout: m on top, n below; k falls to the right. Directions are in
    // degrees, counterclockwise with y up; k's upper ray points at 180 - acute.
    const width = 450, height = 260, yTop = 85, yBot = 180, ext = 60;
    const acuteRad = (acute * Math.PI) / 180;
    const dx = (yBot - yTop) / Math.tan(acuteRad);
    const xTop = 225 - dx / 2, xBot = 225 + dx / 2;
    const r1 = (v: number) => Math.round(v * 10) / 10;
    const pt = (x: number, y: number, deg: number, d: number) =>
      [r1(x + d * Math.cos((deg * Math.PI) / 180)), r1(y - d * Math.sin((deg * Math.PI) / 180))];
    const arcPath = (x: number, y: number, from: number, span: number, r: number) => {
      const [sx, sy] = pt(x, y, from, r);
      const [ex, ey] = pt(x, y, from + span, r);
      return `M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`;
    };
    const upDir = 180 - acute;
    const wedgeStart = (w: string) => (w === 'AR' ? 0 : 180); // each obtuse wedge spans givenAngle
    const [gx, gy] = pt(xTop, yTop, givenAngle / 2, 36);
    const xHit = pos.line === 'm' ? xTop : xBot;
    const yHit = pos.line === 'm' ? yTop : yBot;
    const [xx, xy] = pt(xHit, yHit, wedgeStart(pos.wedge) + givenAngle / 2, 34);
    const [k1x, k1y] = pt(xTop, yTop, upDir, ext);
    const [k2x, k2y] = pt(xBot, yBot, upDir + 180, ext);
    const [klx, kly] = pt(xTop, yTop, upDir, ext + 13);
    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:serif; user-select:none;">
          <line x1="40" y1="${yTop}" x2="410" y2="${yTop}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yTop + 5}" font-size="16" font-style="italic" fill="currentColor">m</text>
          <line x1="40" y1="${yBot}" x2="410" y2="${yBot}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yBot + 5}" font-size="16" font-style="italic" fill="currentColor">n</text>
          <line x1="${k1x}" y1="${k1y}" x2="${k2x}" y2="${k2y}" stroke="currentColor" stroke-width="2"/>
          <text x="${klx}" y="${kly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">k</text>
          <path d="${arcPath(xTop, yTop, 0, givenAngle, 16)}" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <text x="${gx}" y="${gy + 5}" text-anchor="middle" font-size="15" fill="currentColor">${givenAngle}&#176;</text>
          <path d="${arcPath(xHit, yHit, wedgeStart(pos.wedge), givenAngle, 16)}" fill="none" stroke="#3b82f6" stroke-width="1.4"/>
          <text x="${xx}" y="${xy + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="#3b82f6">x&#176;</text>
        </svg>
      </div>
    `;

    const correctAnswer = `The value of $x$ is equal to $${givenAngle}$.`;

    const optionsData = [
      { text: `The value of $x$ is less than $${givenAngle}$.`, isCorrect: false, reason: `the two marked angles are ${pos.name}, which are congruent, so $x$ is equal to ${givenAngle}, not less than ${givenAngle}` },
      { text: `The value of $x$ is greater than $${givenAngle}$.`, isCorrect: false, reason: `the two marked angles are ${pos.name}, which are congruent, so $x$ is equal to ${givenAngle}, not greater than ${givenAngle}` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: `The value of $x$ cannot be determined.`, isCorrect: false, reason: `the relationship between the two marked angles determines the value of $x$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const parallelNote = pos.parallelNeeded ? '' : ' The fact that lines $m$ and $n$ are parallel is not needed to answer the question.';
    return {
      questionText: `In the figure, line $m$ is parallel to line $n$, and line $k$ intersects both lines. Which of the following statements is true?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. In the figure, the angle with measure $x^{\\circ}$ and the angle with measure ${givenAngle}° are ${pos.name}. ${pos.why} Therefore, $x = ${givenAngle}$.${parallelNote} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
