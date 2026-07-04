import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1293
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius²: 7, shift: 96 units]
 * - Difficulty factors: [Translation doesn't change radius]
 * - Distractor patterns: [Thinking radius changes with translation]
 * - Constraints: [Radius constant under translation]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two circles, original and translated - requires Mafs]
 */

export const generator_1293 = {
  metadata: {
    id: "1293",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate circle parameters
    const centerY = getRandomInt(4, 8);
    const rSquared = getRandomElement([5, 7, 10, 11, 13]);
    const radius = Math.sqrt(rSquared);
    
    // STEP 2: Translation
    const shift = getRandomInt(50, 120);
    
    // STEP 3: Build the figure for Circle A only (Circle B is "not shown").
    // Circle A: center (0, centerY), radius = sqrt(rSquared). Use ONE equal
    // x/y scale so the drawn circle actually encodes the true radius.
    const W = 450, H = 300, P = 40;
    const xmin = -5, xmax = 5;
    const ymin = -1, ymax = centerY + radius + 2;
    // Pick the tighter scale on each axis, then use it for both so the circle
    // is not distorted and stays fully on-screen.
    const sx = (W - 2 * P) / (xmax - xmin);
    const sy = (H - 2 * P) / (ymax - ymin);
    const s = Math.min(sx, sy);
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const cx0 = P + (0 - xmin) * s;
      const cy0 = H - P - (0 - ymin) * s;
      const mx = (x: number) => P + (x - xmin) * s;
      const my = (y: number) => H - P - (y - ymin) * s;
      let out = '';
      // Axes
      out += '<line x1="' + P + '" y1="' + cy0 + '" x2="' + (W - P) + '" y2="' + cy0 + '" stroke="currentColor" stroke-width="1.5"/>';
      out += '<line x1="' + cx0 + '" y1="' + P + '" x2="' + cx0 + '" y2="' + (H - P) + '" stroke="currentColor" stroke-width="1.5"/>';
      // x-axis ticks
      for (let x = Math.ceil(xmin); x <= Math.floor(xmax); x++) {
        if (x === 0) continue;
        out += '<text x="' + mx(x) + '" y="' + (cy0 + 14) + '" text-anchor="middle" font-size="10" fill="currentColor">' + x + '</text>';
      }
      // y-axis ticks
      for (let y = Math.ceil(ymin); y <= Math.floor(ymax); y++) {
        if (y === 0) continue;
        out += '<text x="' + (cx0 - 8) + '" y="' + (my(y) + 4) + '" text-anchor="end" font-size="10" fill="currentColor">' + y + '</text>';
      }
      // Circle A: center (0, centerY), radius sqrt(rSquared) in data units
      const pr = radius * s;
      out += '<circle cx="' + cx0 + '" cy="' + my(centerY) + '" r="' + pr.toFixed(2) + '" fill="none" stroke="#3b82f6" stroke-width="2"/>';
      // Center dot + label
      out += '<circle cx="' + cx0 + '" cy="' + my(centerY) + '" r="2.5" fill="#3b82f6"/>';
      out += '<text x="' + (cx0 + 8) + '" y="' + (my(centerY) - 6) + '" font-size="11" fill="currentColor">A</text>';
      return out;
    })()}</svg></div>`;

    const answer = 4 * rSquared;
    
    return {
      questionText: `Circle A shown is defined by the equation $x^{2}+(y-${centerY})^{2}=${rSquared}$. Circle B (not shown) has the same radius but is translated ${shift} units to the right. If the equation of circle B is $(x-h)^{2}+(y-k)^{2}=a$, where $h, k$, and $a$ are constants, what is the value of $4a$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: answer.toString(),
      explanation: `Circle A has radius $\\sqrt{${rSquared}}$. Since Circle B has the same radius, the value of $a$ (which equals the radius squared) is unchanged: $a = ${rSquared}$. Therefore, $4a = 4(${rSquared}) = ${answer}$. Note that the translation ${shift} units to the right affects the center coordinates $(h, k)$ but not the value of $a$.`
    };
  }
};
