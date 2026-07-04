import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1315
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [arc length: symbolic multiple of π, angle x in degrees]
 * - Difficulty factors: [Arc length proportion, circumference calculation]
 * - Distractor patterns: [Returning the given arc, using whole circumference, arithmetic slip]
 * - Constraints: [Angle < 360°, radius and both arc multiples are clean integers]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Circle with center O, points A/B/C/D and central angle x°]
 *
 * FIXED:
 * - Removed the broken 4th "distractor" `\frac{round(m*2)}{2}\pi`, which equalled
 *   the correct answer exactly on every draw (Math.round(m*2)/2 === m). Distractors
 *   are now three provably distinct integer multiples of π that never collide with
 *   the correct answer or each other.
 * - Collapsed the fragile two code paths (integer vs. non-integer radius) into a
 *   single clean path: pick x° and an integer radius with (x°·r) divisible by 180,
 *   so the given arc multiplier m = x°·r/180 and the answer 2r − m are both integers.
 * - Distractor explanation reasons are now tied to each option's actual identity
 *   (given arc / whole circumference / arithmetic slip), not to shuffled position.
 * - Added a real SVG figure encoding the central angle x° and the labelled arcs.
 */

export const generator_1315 = {
  metadata: {
    id: "1315",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Central angle x (degrees) for the MINOR arc ADC. Nice values only.
    const xDegrees = getRandomElement([60, 72, 90, 100, 120, 135, 150]);

    // STEP 2: Pick an integer radius so that the arc-ADC multiplier is an integer.
    //   arc ADC length = (x/360)·2πr = (x·r/180)π. For an integer multiple of π we
    //   need (x·r) divisible by 180. The major arc ABC = (2r − m)π is then also an
    //   integer multiple of π automatically.
    let radius = 0;
    let arcMultiplier = 0; // multiplier of the given minor arc ADC
    let tries = 0;
    while (tries++ < 60) {
      const r = getRandomInt(3, 30);
      if ((xDegrees * r) % 180 !== 0) continue;
      const m = (xDegrees * r) / 180;
      if (m < 2) continue;               // keep the given arc a "nice" size (≥ 2π)
      if (2 * r - m < 1) continue;       // major arc must be positive
      radius = r;
      arcMultiplier = m;
      break;
    }
    if (radius === 0) {
      // Deterministic fallback: the smallest r making (x·r) divisible by 180 is
      // step = 180/gcd(x,180); take 2·step so the given arc multiple is ≥ 2.
      const step = 180 / gcd(xDegrees, 180);
      radius = 2 * step;
      arcMultiplier = (xDegrees * radius) / 180;
    }

    // STEP 3: Derived clean quantities (all integer multiples of π).
    const circumferenceMult = 2 * radius;                 // full circumference / π
    const remainingDegrees = 360 - xDegrees;              // central angle of major arc ABC
    const arcABCMultiplier = circumferenceMult - arcMultiplier; // answer, major arc ABC / π

    const correctText = `${arcABCMultiplier}\\\\pi`;

    // STEP 4: Distractors — three DISTINCT integer multiples of π, each a real trap.
    //   d1: returns the given minor arc ADC (used the wrong arc).
    //   d2: the whole circumference (forgot to subtract the minor arc).
    //   d3: an arithmetic slip near the correct value.
    const dGivenArc = arcMultiplier;
    const dCircumference = circumferenceMult;
    const used = new Set([arcABCMultiplier, dGivenArc, dCircumference]);
    let dSlip = arcABCMultiplier + 2;
    let delta = 2;
    while (used.has(dSlip) && delta < 25) { delta++; dSlip = arcABCMultiplier + delta; }

    const optionsData = [
      { text: `${dGivenArc}\\\\pi`, isCorrect: false, kind: 'givenArc' as const },
      { text: correctText, isCorrect: true, kind: 'correct' as const },
      { text: `${dCircumference}\\\\pi`, isCorrect: false, kind: 'circumference' as const },
      { text: `${dSlip}\\\\pi`, isCorrect: false, kind: 'slip' as const }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const letterOf = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    // STEP 5: Figure — circle with center O, points A, B, C, D and central angle x°.
    const figureCode = buildCircleArcFigure(xDegrees);

    return {
      questionText: `In the circle above with center $O$, the length of arc $\\widehat{ADC}$ is $${arcMultiplier}\\\\pi$ and $x=${xDegrees}$. What is the length of arc $\\widehat{ABC}$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The arc length formula is $\\frac{\\theta}{360} \\times 2\\pi r$. From arc $\\widehat{ADC}$: $${arcMultiplier}\\\\pi = \\frac{${xDegrees}}{360} \\times 2\\pi r$, so $r = ${radius}$ and the circumference is $2\\pi(${radius}) = ${circumferenceMult}\\\\pi$. Arc $\\widehat{ABC}$ is the major arc, spanning $360° - ${xDegrees}° = ${remainingDegrees}°$, so its length is $\\frac{${remainingDegrees}}{360} \\times ${circumferenceMult}\\\\pi = ${arcABCMultiplier}\\\\pi$. Choice ${letterOf('givenArc')} is incorrect; it is the length of the given minor arc $\\widehat{ADC}$, not $\\widehat{ABC}$. Choice ${letterOf('circumference')} is incorrect; it is the full circumference and forgets to subtract arc $\\widehat{ADC}$. Choice ${letterOf('slip')} is incorrect; it results from an arithmetic error.`
    };
  }
};

// Greatest common divisor for the divisibility fallback.
function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}

// Build a self-contained SVG of a circle with center O, points A, B, C on the
// circle, D on the minor arc and B on the major arc, and the central angle x°
// marked at O between OA and OC. The angle drawn equals xDegrees, so the figure
// encodes the question's number.
function buildCircleArcFigure(xDegrees: number): string {
  const W = 320, H = 300, cx = 160, cy = 150, R = 96;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  // Place the minor arc ADC symmetrically about the positive x-axis direction so
  // the angle marker reads cleanly. A at +x/2, C at -x/2 (measured from +x axis).
  const half = xDegrees / 2;
  const angA = half;            // point A angle (degrees, standard position)
  const angC = -half;           // point C angle
  const angD = 0;               // D on minor arc, midway between A and C
  const angB = 180;             // B on major arc, opposite side
  // SVG y grows downward, so negate the y component.
  const pt = (deg: number, rad: number) => ({
    x: cx + rad * Math.cos(toRad(deg)),
    y: cy - rad * Math.sin(toRad(deg))
  });
  const A = pt(angA, R), C = pt(angC, R), D = pt(angD, R), B = pt(angB, R);
  const lA = pt(angA, R + 16), lC = pt(angC, R + 16), lD = pt(angD, R + 16), lB = pt(angB, R + 16);

  // Central angle arc marker between OA and OC (small radius near O).
  const mR = 30;
  const mStart = pt(angC, mR), mEnd = pt(angA, mR);
  const largeArc = xDegrees > 180 ? 1 : 0;
  // sweep from C (lower) to A (upper) going counter-clockwise in math => in SVG
  // (y flipped) that is a sweep-flag of 0.
  const anglePath = `M ${mStart.x.toFixed(1)} ${mStart.y.toFixed(1)} A ${mR} ${mR} 0 ${largeArc} 0 ${mEnd.x.toFixed(1)} ${mEnd.y.toFixed(1)}`;
  // Label position for x°, just outside the marker along angle 0 (the bisector).
  const xLabel = pt(0, mR + 16);

  return `<div style="width:100%;max-width:320px;margin:0 auto;">` +
    `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:sans-serif;user-select:none;" xmlns="http://www.w3.org/2000/svg">` +
    // circle
    `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="currentColor" stroke-width="2"/>` +
    // radii OA and OC
    `<line x1="${cx}" y1="${cy}" x2="${A.x.toFixed(1)}" y2="${A.y.toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>` +
    `<line x1="${cx}" y1="${cy}" x2="${C.x.toFixed(1)}" y2="${C.y.toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>` +
    // central angle marker
    `<path d="${anglePath}" fill="none" stroke="#3b82f6" stroke-width="1.5"/>` +
    `<text x="${xLabel.x.toFixed(1)}" y="${xLabel.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="14" fill="#3b82f6">x°</text>` +
    // center point + label
    `<circle cx="${cx}" cy="${cy}" r="3" fill="currentColor"/>` +
    `<text x="${(cx - 12).toFixed(1)}" y="${(cy + 4).toFixed(1)}" text-anchor="middle" font-size="14" fill="currentColor">O</text>` +
    // points on circle
    `<circle cx="${A.x.toFixed(1)}" cy="${A.y.toFixed(1)}" r="3.5" fill="#3b82f6"/>` +
    `<circle cx="${B.x.toFixed(1)}" cy="${B.y.toFixed(1)}" r="3.5" fill="#3b82f6"/>` +
    `<circle cx="${C.x.toFixed(1)}" cy="${C.y.toFixed(1)}" r="3.5" fill="#3b82f6"/>` +
    `<circle cx="${D.x.toFixed(1)}" cy="${D.y.toFixed(1)}" r="3.5" fill="#3b82f6"/>` +
    // labels
    `<text x="${lA.x.toFixed(1)}" y="${lA.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="14" fill="currentColor">A</text>` +
    `<text x="${lB.x.toFixed(1)}" y="${lB.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="14" fill="currentColor">B</text>` +
    `<text x="${lC.x.toFixed(1)}" y="${lC.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="14" fill="currentColor">C</text>` +
    `<text x="${lD.x.toFixed(1)}" y="${lD.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="14" fill="currentColor">D</text>` +
    `</svg></div>`;
}
