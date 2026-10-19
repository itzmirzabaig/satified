import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 351
*
* ORIGINAL ANALYSIS:
* - Number ranges: [x: 50-80, y: 60-90, z at least 20]
* - Difficulty factors: [Angles on a straight line sum to 180]
* - Distractor patterns: [Adds x and y, subtracts from 360, subtracts only x]
* - Constraints: [x + y + z = 180]
* - Question type: [Figure→Multiple Choice Text]
*/

export const generator_351 = {
  metadata: {
    id: "351",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Each wrong choice is a real slip; two of the old ones were z plus or
    // minus a random amount. z is kept at least 20 so its angle is wide
    // enough to label, and the draw is redone until the four values differ
    // (x + y equals 180 - x when 2x + y = 180).
    let xValue = 50, yValue = 60, zValue = 70;
    do {
      xValue = getRandomInt(50, 80);
      yValue = getRandomInt(60, 90);
      zValue = 180 - xValue - yValue;
    } while (zValue < 20 || new Set([zValue, xValue + yValue, 360 - xValue - yValue, 180 - xValue]).size < 4);

    // The figure used to be a fixed Mafs sketch on a black box whose angles
    // did not match the numbers (x = 71 drew as about 35 degrees). This SVG
    // draws each ray at its true angle, with each label on its angle's
    // bisector, farther out when the angle is narrow.
    const ox = 180, oy = 160, len = 135;
    const at = (deg: number, d: number) => {
      const t = (deg * Math.PI) / 180;
      return [+(ox + d * Math.cos(t)).toFixed(1), +(oy - d * Math.sin(t)).toFixed(1)];
    };
    const [p1x, p1y] = at(180 - xValue, len);
    const [p2x, p2y] = at(zValue, len);
    const labelAt = (mid: number, size: number) => at(mid, Math.max(46, 15 / Math.sin((size * Math.PI) / 360)));
    const [xlx, xly] = labelAt(180 - xValue / 2, xValue);
    const [ylx, yly] = labelAt(zValue + yValue / 2, yValue);
    const [zlx, zly] = labelAt(zValue / 2, zValue);
    const figureCode = `<div style="width:100%;max-width:380px;margin:0 auto;"><svg viewBox="0 0 360 180" style="width:100%;height:auto;display:block;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="${oy}" x2="340" y2="${oy}" stroke="currentColor" stroke-width="2"/>
  <line x1="${ox}" y1="${oy}" x2="${p1x}" y2="${p1y}" stroke="currentColor" stroke-width="2"/>
  <line x1="${ox}" y1="${oy}" x2="${p2x}" y2="${p2y}" stroke="currentColor" stroke-width="2"/>
  <circle cx="${ox}" cy="${oy}" r="3" fill="currentColor"/>
  <text x="${xlx}" y="${xly + 6}" text-anchor="middle" font-size="17" font-style="italic" fill="currentColor">x°</text>
  <text x="${ylx}" y="${yly + 6}" text-anchor="middle" font-size="17" font-style="italic" fill="currentColor">y°</text>
  <text x="${zlx}" y="${zly + 6}" text-anchor="middle" font-size="17" font-style="italic" fill="currentColor">z°</text>
</svg></div>`;

    const correctAnswer = zValue.toString();

    const optionsData = [
      { text: (xValue + yValue).toString(), isCorrect: false, reason: `it is the sum of the two given measures, $${xValue} + ${yValue}$; this sum must be subtracted from 180` },
      { text: (360 - xValue - yValue).toString(), isCorrect: false, reason: `it results from subtracting the two given measures from 360 instead of 180; the angles lie along a straight line, so their measures add to 180, not 360` },
      { text: correctAnswer, isCorrect: true, reason: '' },
      { text: (180 - xValue).toString(), isCorrect: false, reason: `it results from subtracting only $x$ from 180; this is the value of $y + z$, so $y$ must also be subtracted` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure, two rays extend from a point on a line. The letters $x$, $y$, and $z$ represent the measures of the three angles formed, in degrees. If $x = ${xValue}$ and $y = ${yValue}$, what is the value of $z$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. The three angles lie on one side of a line, so their measures add to 180 degrees: $${xValue} + ${yValue} + z = 180$. Subtracting the two known measures from 180 gives $z = 180 - ${xValue} - ${yValue} = ${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
