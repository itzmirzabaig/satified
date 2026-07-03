import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 833
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates specific, radius: 3]
 * - Difficulty factors: [Geometric figure analysis, finding center/radius from points, circumference formula]
 * - Distractor patterns: [A: r, C: diameter+1, D: r²]
 * - Constraints: [Points must define a valid circle]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs: Circle with 3 points, center marked]
 */

export const generator_833 = {
  metadata: {
    id: "833",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate figure parameters.
    // r in [3,6] guarantees the four options {2r, r, 2r+1, r^2} are pairwise
    // distinct for every draw: 2r is even; r < 2r (r>0); 2r+1 is odd (never 2r);
    // r^2 = 2r only at r=2 and r^2 = 2r+1 has no integer solution, so both are
    // excluded on [3,6]. Center kept small-positive so the plotted grid is clean.
    const centerX = getRandomInt(3, 8);
    const centerY = getRandomInt(4, 9);
    const radius = getRandomInt(3, 6);

    // STEP 2: Three points on the circle (bottom, top, left).
    const point1X = centerX, point1Y = centerY - radius; // bottom
    const point2X = centerX, point2Y = centerY + radius; // top
    const point3X = centerX - radius, point3Y = centerY; // left

    // STEP 3: Circumference constant. C = 2*pi*r = k*pi, so k = 2r.
    const circumferenceK = 2 * radius;

    // STEP 4: Options.
    const correctText = circumferenceK.toString();
    const distractorA = radius.toString();          // used r (radius) instead of 2r
    const distractorC = (2 * radius + 1).toString(); // added 1 to the diameter
    const distractorD = (radius * radius).toString(); // used r^2 (the area coefficient)

    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];

    // STEP 5: Shuffle and assign letters (letters only meaningful post-shuffle).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const byText = (t: string) => incorrectOptions.find(o => o.text === t)!.letter;

    // STEP 6: Figure — plain SVG coordinate grid with the circle and 3 points.
    const xmin = centerX - radius - 1, xmax = centerX + radius + 1;
    const ymin = centerY - radius - 1, ymax = centerY + radius + 1;
    const W = 360, H = 340, P = 34;
    const mx = (x: number) => P + ((x - xmin) / (xmax - xmin)) * (W - 2 * P);
    const my = (y: number) => (H - P) - ((y - ymin) / (ymax - ymin)) * (H - 2 * P);
    const rPx = mx(centerX + radius) - mx(centerX); // circle radius in pixels

    let grid = '';
    for (let x = xmin; x <= xmax; x++) {
      grid += `<line x1="${mx(x).toFixed(1)}" y1="${my(ymin).toFixed(1)}" x2="${mx(x).toFixed(1)}" y2="${my(ymax).toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
    }
    for (let y = ymin; y <= ymax; y++) {
      grid += `<line x1="${mx(xmin).toFixed(1)}" y1="${my(y).toFixed(1)}" x2="${mx(xmax).toFixed(1)}" y2="${my(y).toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
    }

    // Axis tick labels (only where an axis is inside the visible window).
    let ticks = '';
    const showXAxis = ymin <= 0 && ymax >= 0;
    const showYAxis = xmin <= 0 && xmax >= 0;
    const axisY = showXAxis ? my(0) : my(ymin);
    const axisX = showYAxis ? mx(0) : mx(xmin);
    for (let x = xmin; x <= xmax; x += 2) {
      ticks += `<text x="${mx(x).toFixed(1)}" y="${(axisY + 14).toFixed(1)}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
    }
    for (let y = ymin; y <= ymax; y += 2) {
      ticks += `<text x="${(axisX - 8).toFixed(1)}" y="${(my(y) + 3.5).toFixed(1)}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
    }

    const axes =
      `<line x1="${mx(xmin).toFixed(1)}" y1="${axisY.toFixed(1)}" x2="${mx(xmax).toFixed(1)}" y2="${axisY.toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${axisX.toFixed(1)}" y1="${my(ymax).toFixed(1)}" x2="${axisX.toFixed(1)}" y2="${my(ymin).toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>`;

    const circle = `<circle cx="${mx(centerX).toFixed(1)}" cy="${my(centerY).toFixed(1)}" r="${rPx.toFixed(1)}" fill="none" stroke="#3b82f6" stroke-width="2"/>`;

    const pts = [
      { x: point1X, y: point1Y },
      { x: point2X, y: point2Y },
      { x: point3X, y: point3Y }
    ].map(pt =>
      `<circle cx="${mx(pt.x).toFixed(1)}" cy="${my(pt.y).toFixed(1)}" r="4" fill="#3b82f6"/>` +
      `<text x="${(mx(pt.x) + 7).toFixed(1)}" y="${(my(pt.y) - 6).toFixed(1)}" font-size="10" fill="currentColor">(${pt.x}, ${pt.y})</text>`
    ).join('');

    const center =
      `<circle cx="${mx(centerX).toFixed(1)}" cy="${my(centerY).toFixed(1)}" r="3" fill="currentColor"/>` +
      `<text x="${(mx(centerX) + 7).toFixed(1)}" y="${(my(centerY) - 6).toFixed(1)}" font-size="11" fill="currentColor">O</text>`;

    const figureCode = `<div style="width:100%;max-width:360px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${grid}${axes}${ticks}${circle}${pts}${center}</svg></div>`;

    // STEP 7: Explanation — numbers from the same live variables; letters from shuffle.
    const explanation = `Choice ${correctLetter} is correct. The center $O$ is the point equidistant from the three given points; here it is $(${centerX}, ${centerY})$. The distance from $O$ to the point $(${point1X}, ${point1Y})$ is ${radius}, so the radius is ${radius}. The circumference is $C = 2\\pi r = 2\\pi(${radius}) = ${circumferenceK}\\pi$, so $k = ${circumferenceK}$. Choice ${byText(distractorA)} is incorrect; it uses the radius ${radius} instead of $k = 2r$. Choice ${byText(distractorC)} is incorrect; it adds 1 to the diameter with no geometric basis. Choice ${byText(distractorD)} is incorrect; ${radius * radius} is $r^{2}$, the coefficient in the area $\\pi r^{2}$, not $k = 2r$.`;

    return {
      questionText: `The three points shown define a circle. The circumference of this circle is $k\\pi$, where $k$ is a constant. What is the value of $k$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
