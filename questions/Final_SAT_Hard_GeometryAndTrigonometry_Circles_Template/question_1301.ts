import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1301
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle: 30°, radius: 18]
 * - Difficulty factors: [Isosceles triangle, central angle calculation, arc length]
 * - Distractor patterns: [Using wrong angle, forgetting to convert to arc length]
 * - Constraints: [Triangle with two radii]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Circle with triangle, arc]
 *
 * Intent: O is the center of a circle; A and B lie on the circle so OA and OB
 * are radii of length r. Triangle OAB is isosceles with base angles m∠OAB =
 * m∠OBA = baseAngle, so the central angle m∠AOB = 180 − 2·baseAngle. The length
 * of minor arc AB = 2πr · (centralAngle/360) = (centralAngle·r/180)·π.
 */

export const generator_1301 = {
  metadata: {
    id: "1301",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    // Format a coefficient of pi given as the fraction numTimes/180 (reduced).
    // e.g. (130*10, 180) -> "\\frac{65\\pi}{9}"; (90*12,180) -> "6\\pi".
    const piCoeff = (numTimes: number): string => {
      const g = gcd(Math.abs(numTimes), 180);
      const num = numTimes / g;
      const den = 180 / g;
      return den === 1 ? `${num}\\pi` : `\\frac{${num}\\pi}{${den}}`;
    };

    // STEP 1: base angle of the isosceles triangle, and radius.
    const baseAngle = getRandomElement([25, 30, 35, 40, 45]);
    const r = getRandomInt(10, 25);

    // STEP 2: central angle (isosceles triangle: base angles equal).
    const centralAngle = 180 - 2 * baseAngle;

    // STEP 3: exact arc-length coefficients of pi (numerator over 180).
    // Correct: minor arc uses the central angle.
    const correctText = piCoeff(centralAngle * r);
    // Distractor A: uses the base angle instead of the central angle.
    const distA = piCoeff(baseAngle * r);
    // Distractor C: uses 180 - baseAngle (wrong angle measure).
    const distC = piCoeff((180 - baseAngle) * r);
    // Distractor D: uses the major arc (360 - central angle).
    const distD = piCoeff((360 - centralAngle) * r);

    // These four exact rational coefficients are distinct for every draw in the
    // declared ranges (baseAngle in {25,30,35,40,45}, r in [10,25]) — verified
    // exhaustively. The Set guard below is a defensive assertion only.
    const optionTexts = [distA, correctText, distC, distD];
    if (new Set(optionTexts).size !== 4) {
      // Unreachable for the declared ranges; keeps the render safe if ranges change.
      return generator_1301.generate();
    }

    // STEP 4: figure — circle centered at O with radii OA and OB and minor arc AB.
    const R = r + 3;                     // view padding in data units
    const W = 440, H = 300, P = 45;
    const xmin = -R, xmax = R, ymin = -R, ymax = R;
    const mx = (x: number) => P + (x - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - ymin) / (ymax - ymin) * (H - 2 * P);
    const rPix = r / (xmax - xmin) * (W - 2 * P);   // circle radius in pixels

    const half = centralAngle / 2;
    const aAng = (90 + half) * Math.PI / 180;
    const bAng = (90 - half) * Math.PI / 180;
    const Ax = r * Math.cos(aAng), Ay = r * Math.sin(aAng);
    const Bx = r * Math.cos(bAng), By = r * Math.sin(bAng);
    // Minor arc from A to B (short way over the top): large-arc-flag 0, sweep 1.
    const arcPath = `M ${mx(Ax).toFixed(2)} ${my(Ay).toFixed(2)} A ${rPix.toFixed(2)} ${rPix.toFixed(2)} 0 0 1 ${mx(Bx).toFixed(2)} ${my(By).toFixed(2)}`;
    // Label offsets so text sits just outside the points.
    const AxL = mx(Ax) - 14, AyL = my(Ay);
    const BxL = mx(Bx) + 8,  ByL = my(By);

    const figureCode = `<div style="width:100%;max-width:440px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<circle cx="${mx(0).toFixed(2)}" cy="${my(0).toFixed(2)}" r="${rPix.toFixed(2)}" fill="none" stroke="currentColor" stroke-width="1.5"/>` +
      `<path d="${arcPath}" fill="none" stroke="#3b82f6" stroke-width="3"/>` +
      `<line x1="${mx(0).toFixed(2)}" y1="${my(0).toFixed(2)}" x2="${mx(Ax).toFixed(2)}" y2="${my(Ay).toFixed(2)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mx(0).toFixed(2)}" y1="${my(0).toFixed(2)}" x2="${mx(Bx).toFixed(2)}" y2="${my(By).toFixed(2)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<circle cx="${mx(0).toFixed(2)}" cy="${my(0).toFixed(2)}" r="3.5" fill="currentColor"/>` +
      `<circle cx="${mx(Ax).toFixed(2)}" cy="${my(Ay).toFixed(2)}" r="3.5" fill="#3b82f6"/>` +
      `<circle cx="${mx(Bx).toFixed(2)}" cy="${my(By).toFixed(2)}" r="3.5" fill="#3b82f6"/>` +
      `<text x="${mx(0).toFixed(2)}" y="${(my(0) + 18).toFixed(2)}" text-anchor="middle" font-size="14" fill="currentColor">O</text>` +
      `<text x="${AxL.toFixed(2)}" y="${(AyL - 6).toFixed(2)}" text-anchor="middle" font-size="14" fill="currentColor">A</text>` +
      `<text x="${BxL.toFixed(2)}" y="${(ByL - 6).toFixed(2)}" text-anchor="middle" font-size="14" fill="currentColor">B</text>` +
      `<text x="${((mx(0) + mx(Ax)) / 2 - 6).toFixed(2)}" y="${((my(0) + my(Ay)) / 2).toFixed(2)}" text-anchor="middle" font-size="12" fill="currentColor">${r}</text>` +
      `</svg></div>`;

    // STEP 5: assemble options, shuffle, derive letters after shuffle.
    const optionsData = [
      { text: distA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distC, isCorrect: false },
      { text: distD, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const letterOf = (text: string) => shuffledOptions.find(o => o.text === text)!.letter;

    return {
      questionText: `In the circle above, point $O$ is the center and points $A$ and $B$ lie on the circle. The measure of $\\angle OAB$ is ${baseAngle} degrees, and the length of $\\overline{OA}$ is ${r}. What is the length of minor arc $\\overset{\\frown}{AB}$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Because $\\overline{OA}$ and $\\overline{OB}$ are radii, triangle $OAB$ is isosceles, so its base angles are equal: $m\\angle OAB = m\\angle OBA = ${baseAngle}^{\\circ}$. The central angle is $m\\angle AOB = 180^{\\circ} - 2(${baseAngle}^{\\circ}) = ${centralAngle}^{\\circ}$. Minor arc $\\overset{\\frown}{AB}$ is that fraction of the circumference: $\\text{arc} = 2\\pi(${r}) \\times \\dfrac{${centralAngle}}{360} = ${correctText}$. Choice ${letterOf(distA)} is incorrect; it uses the base angle of ${baseAngle} degrees instead of the central angle. Choice ${letterOf(distC)} is incorrect; it uses ${180 - baseAngle} degrees for the central angle. Choice ${letterOf(distD)} is incorrect; it finds the major arc of ${360 - centralAngle} degrees instead of the minor arc.`
    };
  }
};
