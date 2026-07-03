import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1317
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (0, k), radius: r, shift: down]
 * - Difficulty factors: [Vertical translation in standard form]
 * - Distractor patterns: [Wrong sign, shifting wrong direction]
 * - Constraints: [Downward shift: subtract from y-coordinate]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two circles vertically aligned]
 *
 * FIXED:
 * - Rebuilt corrupted nested-IIFE figure (local `const r` referenced the
 *   outer `r` in its own initializer → "Cannot access 'r' before
 *   initialization" THROWS). New figure is a single-scope SVG template with a
 *   uniform scale so both circles are true circles and both fit the viewBox,
 *   drawn with the LIVE center/radius that match the question numbers.
 * - Handled the newK === 0 draw so the correct answer renders as
 *   $x^{2}+y^{2}=r^2$ instead of the ugly $x^{2}+(y-0)^{2}=r^2$.
 * - Explanation numbers and choice letters come from the SAME live variables
 *   and the SHUFFLED array.
 */

export const generator_1317 = {
  metadata: {
    id: "1317",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters.
    //   h = 0 (all circles centered on the y-axis)
    //   k ∈ [2,5]  radius r ∈ [4,8]  shift ∈ [3,6]
    //   ⇒ newK = k - shift ∈ [-4, 2]
    const h = 0;
    const k = getRandomInt(2, 5);
    const r = getRandomInt(4, 8);
    const shift = getRandomInt(3, 6);

    // STEP 2: Calculate new center (shift down subtracts from the y-coordinate).
    const newK = k - shift;

    // Helper: render (y - c)^2 with the correct sign, collapsing c === 0 to y.
    const yTerm = (c: number): string => {
      if (c === 0) return `y^{2}`;
      return `(y${c > 0 ? '-' : '+'}${Math.abs(c)})^{2}`;
    };

    // STEP 3: Build the figure (two vertically-aligned circles of radius r,
    // centered at (0, k) and (0, newK)). Single scope, uniform scale.
    const W = 400, H = 350, P = 34;
    // Data extent (pad by 2 units so labels/circles are not clipped).
    const xmin = -(r + 2), xmax = r + 2;
    const ymin = Math.min(newK - r, -1) - 2;
    const ymax = k + r + 2;
    // Uniform units-per-pixel so circles stay round and everything fits.
    const scale = Math.min((W - 2 * P) / (xmax - xmin), (H - 2 * P) / (ymax - ymin));
    // Center the drawing inside the viewBox.
    const cx = W / 2 - ((xmin + xmax) / 2) * scale;
    const cy = H / 2 + ((ymin + ymax) / 2) * scale;
    const mx = (x: number) => cx + x * scale;
    const my = (y: number) => cy - y * scale;
    const pr = r * scale; // pixel radius (same for both circles)

    // Axis tick labels along the visible axes.
    const xstep = Math.max(1, Math.ceil((xmax - xmin) / 8));
    let xTicks = '';
    for (let x = Math.ceil(xmin / xstep) * xstep; x <= xmax; x += xstep) {
      if (x === 0) continue;
      xTicks += `<text x="${mx(x)}" y="${my(0) + 13}" text-anchor="middle" font-size="9" fill="currentColor">${x}</text>`;
    }
    const ystep = Math.max(1, Math.ceil((ymax - ymin) / 8));
    let yTicks = '';
    for (let y = Math.ceil(ymin / ystep) * ystep; y <= ymax; y += ystep) {
      if (y === 0) continue;
      yTicks += `<text x="${mx(0) - 6}" y="${my(y) + 3}" text-anchor="end" font-size="9" fill="currentColor">${y}</text>`;
    }

    const figureCode = `<div style="width:100%;max-width:400px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">`
      + `<line x1="${P}" y1="${my(0)}" x2="${W - P}" y2="${my(0)}" stroke="currentColor" stroke-width="1.5"/>`
      + `<line x1="${mx(0)}" y1="${P}" x2="${mx(0)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`
      + xTicks + yTicks
      // Circle A (original) in blue, Circle B (shifted) in blue dashed.
      + `<circle cx="${mx(h)}" cy="${my(k)}" r="${pr}" fill="none" stroke="#3b82f6" stroke-width="2"/>`
      + `<circle cx="${mx(h)}" cy="${my(k)}" r="2.5" fill="#3b82f6"/>`
      + `<text x="${mx(h) + pr + 4}" y="${my(k) + 3}" font-size="11" fill="#3b82f6">A</text>`
      + `<circle cx="${mx(h)}" cy="${my(newK)}" r="${pr}" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5 4"/>`
      + `<circle cx="${mx(h)}" cy="${my(newK)}" r="2.5" fill="#3b82f6"/>`
      + `<text x="${mx(h) + pr + 4}" y="${my(newK) + 3}" font-size="11" fill="#3b82f6">B</text>`
      + `</svg></div>`;

    // STEP 4: Generate options.
    const correctText = `x^{2}+${yTerm(newK)}=${r * r}`;
    const distractorB = `x^{2}+${yTerm(k + shift)}=${r * r}`;        // shifted UP instead of down
    const distractorC = `(x-${shift})^{2}+(y-${k})^{2}=${r * r}`;    // shifted RIGHT
    const distractorD = `(x+${shift})^{2}+(y-${k})^{2}=${r * r}`;    // shifted LEFT

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const letterOf = (t: string) => shuffledOptions.find(o => o.text === t)!.letter;

    return {
      questionText: `The equation $x^{2}+(y-${k})^{2}=${r * r}$ represents circle A. Circle B is obtained by shifting circle A down ${shift} units in the $xy$-plane. Which of the following equations represents circle B?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Circle A has center $(${h}, ${k})$ and radius $r=${r}$. Shifting a graph down ${shift} units subtracts ${shift} from the $y$-coordinate of the center, leaving the radius unchanged: the new center is $(${h}, ${k}-${shift})=(${h}, ${newK})$. Substituting into the standard form $x^{2}+(y-k)^{2}=r^{2}$ gives $${correctText}$. `
        + `Choice ${letterOf(distractorB)} is incorrect; it shifts circle A up ${shift} units (adding to the $y$-coordinate) instead of down. `
        + `Choice ${letterOf(distractorC)} is incorrect; it shifts circle A right ${shift} units, changing the $x$-coordinate instead of the $y$-coordinate. `
        + `Choice ${letterOf(distractorD)} is incorrect; it shifts circle A left ${shift} units, again changing the $x$-coordinate instead of the $y$-coordinate.`
    };
  }
};
