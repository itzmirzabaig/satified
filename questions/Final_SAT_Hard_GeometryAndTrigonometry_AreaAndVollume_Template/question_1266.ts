import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1266
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (-6,4) to (3,10), area: 36√13]
 * - Difficulty factors: [Distance formula, right triangle area with one leg given]
 * - Distractor patterns: [A: leg2/2, B: leg2 (correct), C: given-leg length, D: wrong multiple]
 * - Constraints: [Must work out to clean answer; given leg is an irrational radical]
 * - Question type: [Multiple choice text]
 * - Figure generation: [Line segment SVG]
 */

export const generator_1266 = {
  metadata: {
    id: "1266",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Simplify a square root: sqrt(n) = coeff * sqrt(remain).
    const simplifyRadical = (n: number): [number, number] => {
      let coeff = 1;
      let remaining = n;
      for (let i = 2; i * i <= remaining; i++) {
        while (remaining % (i * i) === 0) {
          coeff *= i;
          remaining /= i * i;
        }
      }
      return [coeff, remaining];
    };

    // Canonical radical string: drops \sqrt{1}, drops coefficient 1.
    const radStr = (coeff: number, remain: number): string => {
      if (remain === 1) return coeff.toString();      // perfect square -> integer
      if (coeff === 1) return `\\sqrt{${remain}}`;     // no coefficient
      return `${coeff}\\sqrt{${remain}}`;
    };

    // ---- Generate a segment whose length is an IRRATIONAL radical (remain > 1)
    // so the given-leg length is a radical distinct from the integer options,
    // and choose an even other-leg so the area coefficient is an integer.
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    let dx = 0, dy = 0, distanceSquared = 0, distCoeff = 1, distRemain = 1;
    let leg2 = 0, areaCoeff = 0;
    let distractorA = "", distractorC = "", distractorD = "", correctText = "";

    let tries = 0;
    let ok = false;
    while (!ok && tries++ < 200) {
      x1 = getRandomInt(-8, -4);
      y1 = getRandomInt(2, 6);
      x2 = getRandomInt(2, 6);
      y2 = getRandomInt(7, 12);

      dx = x2 - x1;
      dy = y2 - y1;
      distanceSquared = dx * dx + dy * dy;

      [distCoeff, distRemain] = simplifyRadical(distanceSquared);

      // Require an irrational leg length (remain > 1) -> given leg is a radical,
      // never colliding with the integer answer options.
      if (distRemain === 1) continue;

      leg2 = getRandomInt(12, 36) * 2;   // even -> areaCoeff integer
      areaCoeff = leg2 / 2;

      // Options as they will render.
      correctText = leg2.toString();                        // the other leg (integer)
      distractorA = (leg2 / 2).toString();                  // forgot the factor of 2
      distractorC = radStr(distCoeff, distRemain);          // length of the GIVEN leg (radical)
      distractorD = radStr(areaCoeff, distRemain);          // used area coefficient as a length (radical)

      // No collisions (compare as rendered strings; radicals vs integers can
      // never be equal here because distRemain > 1 keeps C and D radicals).
      const opts = [correctText, distractorA, distractorC, distractorD];
      if (new Set(opts).size !== 4) continue;

      ok = true;
    }

    // areaString: area = (leg2/2) * distCoeff * sqrt(distRemain) = (areaCoeff*distCoeff) sqrt(remain)
    const areaString = radStr(areaCoeff * distCoeff, distRemain);
    const legString = radStr(distCoeff, distRemain);
    // Show the "= c√r" simplification step only when it actually simplifies
    // (distCoeff > 1). When distCoeff === 1, sqrt(d) is already in simplest form.
    const legDerivation = distCoeff > 1
      ? `\\sqrt{${distanceSquared}} = ${legString}`
      : `${legString}`;

    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // ---- Figure: plot window includes y = 0 so the x-axis is always on-screen
    // (the segment's y-values are all >= 2, so y = 0 sits at the plot bottom).
    const xmin = x1 - 1;
    const xmax = x2 + 1;
    const ymin = 0;
    const ymax = y2 + 1;
    const W = 400, H = 320, P = 45;
    const mx = (x: number) => P + (x - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - ymin) / (ymax - ymin) * (H - 2 * P);

    let inner = '';
    // Axes.
    inner += `<line x1="${P}" y1="${my(0)}" x2="${W - P}" y2="${my(0)}" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>`;
    inner += `<line x1="${mx(0)}" y1="${P}" x2="${mx(0)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>`;
    // X ticks.
    const xstep = Math.max(1, Math.ceil((xmax - xmin) / 8));
    for (let x = Math.ceil(xmin / xstep) * xstep; x <= xmax; x += xstep) {
      if (x === 0) continue;
      inner += `<text x="${mx(x)}" y="${my(0) + 14}" text-anchor="middle" font-size="9" fill="currentColor">${x}</text>`;
    }
    // Y ticks.
    const ystep = Math.max(1, Math.ceil((ymax - ymin) / 6));
    for (let y = Math.ceil(ymin / ystep) * ystep; y <= ymax; y += ystep) {
      if (y === 0) continue;
      inner += `<text x="${mx(0) - 8}" y="${my(y) + 3}" text-anchor="end" font-size="9" fill="currentColor">${y}</text>`;
    }
    // Segment.
    inner += `<line x1="${mx(x1)}" y1="${my(y1)}" x2="${mx(x2)}" y2="${my(y2)}" stroke="#3b82f6" stroke-width="2.5"/>`;
    inner += `<circle cx="${mx(x1)}" cy="${my(y1)}" r="3" fill="#3b82f6"/>`;
    inner += `<circle cx="${mx(x2)}" cy="${my(y2)}" r="3" fill="#3b82f6"/>`;
    // Endpoint labels (properly interpolated). Offset so they clear the axis/segment.
    inner += `<text x="${mx(x1)}" y="${my(y1) + 16}" text-anchor="middle" font-size="11" fill="currentColor">(${x1}, ${y1})</text>`;
    inner += `<text x="${mx(x2)}" y="${my(y2) - 8}" text-anchor="middle" font-size="11" fill="currentColor">(${x2}, ${y2})</text>`;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${inner}</svg></div>`;

    return {
      questionText: `The line segment shown in the $xy$-plane represents one of the legs of a right triangle. The area of this triangle is $${areaString}$ square units. What is the length, in units, of the other leg of this triangle?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The given leg is the segment from $(${x1}, ${y1})$ to $(${x2}, ${y2})$, so its length is $\\sqrt{(${x2}-(${x1}))^2 + (${y2}-${y1})^2} = \\sqrt{${dx * dx} + ${dy * dy}} = ${legDerivation}$. For a right triangle, $A = \\frac{1}{2}(\\text{leg}_1)(\\text{leg}_2)$. Substituting the area and this leg: $${areaString} = \\frac{1}{2}(${legString})x$, which gives $x = \\frac{2 \\cdot ${areaString}}{${legString}} = ${leg2}$. Choice ${incorrectOptions[0].letter} ($${incorrectOptions[0].text}$) is incorrect; it omits the factor of $2$ from the area formula. Choice ${incorrectOptions[1].letter} ($${incorrectOptions[1].text}$) is incorrect; it is the length of the given leg, not the other leg. Choice ${incorrectOptions[2].letter} ($${incorrectOptions[2].text}$) is incorrect; it results from an error in applying the area formula.`
    };
  }
};
