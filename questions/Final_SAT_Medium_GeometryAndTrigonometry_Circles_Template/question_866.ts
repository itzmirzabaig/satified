import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 866
 *
 * ANALYSIS:
 * - Skill: Circle Geometry (Angles, Radians)
 * - Intent:
 *   - Points T, O, P lie on a straight line (a diameter through center O).
 *   - Angles POQ and ROT are given and equal (symmetric about the perpendicular).
 *   - Angle QOR = 180 - (POQ + ROT) = 180 - 2*side.
 *   - Convert QOR to radians.
 * - Repair notes:
 *   - Old distractors collided with the correct answer for two scenarios
 *     (side=45 gave 2*side=90=qor; side=60 gave side=60=qor), producing
 *     DUP_OPTIONS and, downstream, a LETTER_MISMATCH (the duplicated correct
 *     option shifted which index the grader resolved to).
 *   - Rebuilt distractors from a fixed pool of standard radian measures with the
 *     correct answer removed, then shuffled — guaranteeing 4 distinct options
 *     with the correct one unique for every scenario.
 */

// Helper to simplify fractions
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

// Render a whole-degree angle as a reduced radian fraction in LaTeX (no $ wrapper).
const toRadianTex = (deg: number): string => {
  const g = gcd(deg, 180);
  const num = deg / g;
  const den = 180 / g;
  if (den === 1) return num === 1 ? `\\pi` : `${num}\\pi`;
  return num === 1 ? `\\frac{\\pi}{${den}}` : `\\frac{${num}\\pi}{${den}}`;
};

export const generator_866 = {
  metadata: {
    id: "866",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Pick a scenario. side is the shared measure of POQ and ROT; the
    // middle angle QOR = 180 - 2*side. Every listed pair yields a clean radian.
    const possibleScenarios = [
      { qor: 120, side: 30 }, // 2pi/3
      { qor: 90, side: 45 },  // pi/2
      { qor: 150, side: 15 }, // 5pi/6
      { qor: 60, side: 60 }   // pi/3
    ];
    const scenario = possibleScenarios[getRandomInt(0, possibleScenarios.length - 1)];
    const angleSide = scenario.side; // POQ and ROT
    const angleMid = scenario.qor;   // QOR (the answer angle)

    // STEP 2: Correct answer in radians.
    const correctTex = toRadianTex(angleMid);

    // STEP 3: Build distractors from a pool of standard radian measures, each
    // tagged with the degree measure it represents so the explanation can name
    // exactly what mistake each choice corresponds to. Remove any pool entry
    // numerically equal to the correct answer, shuffle, and take three. This
    // guarantees four pairwise-distinct options with a unique correct one for
    // every scenario.
    const pool = [30, 45, 60, 90, 120, 135, 150, 180]
      .filter(deg => deg !== angleMid)
      .map(deg => ({ deg, tex: toRadianTex(deg) }));
    // Guard against any accidental textual duplicate of the correct answer.
    const distractorSource = pool.filter(p => p.tex !== correctTex);
    const chosenDistractors = shuffle(distractorSource).slice(0, 3);

    const reasonFor = (deg: number): string => {
      if (deg === angleSide) {
        return `this is the radian measure of $\\angle POQ = ${angleSide}^\\circ$ (or $\\angle ROT$) rather than of $\\angle QOR$`;
      }
      if (deg === angleSide * 2) {
        return `this is the radian measure of ${angleSide * 2} degrees, the total that is subtracted from ${180} degrees, not the remaining angle $\\angle QOR$`;
      }
      if (deg === 180) {
        return `this is the radian measure of the full straight angle of ${180} degrees, not of $\\angle QOR$`;
      }
      return `this is the radian measure of ${deg} degrees, which is not the measure of $\\angle QOR$`;
    };

    const optionsData = [
      { text: `$${correctTex}$`, isCorrect: true, reason: '' },
      ...chosenDistractors.map(d => ({
        text: `$${d.tex}$`,
        isCorrect: false,
        reason: reasonFor(d.deg)
      }))
    ];

    // STEP 4: Shuffle and assign letters (letters known only after shuffling).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 5: Build the figure. P at 0 deg, Q at side, R at side+qor (= 180-side),
    // T at 180 deg. TOP is the horizontal diameter; OQ and OR are drawn radii.
    const width = 300;
    const height = 300;
    const cx = 150;
    const cy = 150;
    const r = 100;

    const degToRad = (d: number) => (d * Math.PI) / 180;
    const getX = (d: number) => cx + r * Math.cos(degToRad(d));
    const getY = (d: number) => cy - r * Math.sin(degToRad(d)); // screen Y is inverted

    const px = getX(0), py = getY(0);
    const qx = getX(angleSide), qy = getY(angleSide);
    const rx = getX(angleSide + angleMid), ry = getY(angleSide + angleMid);
    const tx = getX(180), ty = getY(180);

    const fmt = (n: number) => n.toFixed(1);

    const svgContent = `
<div style="width: 100%; max-width: 300px; margin: 0 auto;">
  <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit; font-family: sans-serif;">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="2"/>
    <line x1="${fmt(tx)}" y1="${fmt(ty)}" x2="${fmt(px)}" y2="${fmt(py)}" stroke="currentColor" stroke-width="2"/>
    <line x1="${cx}" y1="${cy}" x2="${fmt(qx)}" y2="${fmt(qy)}" stroke="currentColor" stroke-width="2"/>
    <line x1="${cx}" y1="${cy}" x2="${fmt(rx)}" y2="${fmt(ry)}" stroke="currentColor" stroke-width="2"/>
    <circle cx="${fmt(px)}" cy="${fmt(py)}" r="4" fill="#3b82f6"/>
    <circle cx="${fmt(qx)}" cy="${fmt(qy)}" r="4" fill="#3b82f6"/>
    <circle cx="${fmt(rx)}" cy="${fmt(ry)}" r="4" fill="#3b82f6"/>
    <circle cx="${fmt(tx)}" cy="${fmt(ty)}" r="4" fill="#3b82f6"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="currentColor"/>
    <text x="${fmt(px + 15)}" y="${fmt(py + 5)}" text-anchor="middle" font-size="16" fill="currentColor">P</text>
    <text x="${fmt(qx + 10)}" y="${fmt(qy - 10)}" text-anchor="middle" font-size="16" fill="currentColor">Q</text>
    <text x="${fmt(rx - 10)}" y="${fmt(ry - 10)}" text-anchor="middle" font-size="16" fill="currentColor">R</text>
    <text x="${fmt(tx - 15)}" y="${fmt(ty + 5)}" text-anchor="middle" font-size="16" fill="currentColor">T</text>
    <text x="${cx + 6}" y="${cy + 18}" text-anchor="middle" font-size="16" fill="currentColor">O</text>
  </svg>
</div>
`;

    // STEP 6: Explanation — computed from the same live variables, letters from
    // the shuffled array.
    const explanation = `Choice ${correctOption.letter} is correct. Points $P$, $O$, and $T$ lie on a straight line, so $m\\angle POQ + m\\angle QOR + m\\angle ROT = 180^\\circ$. Since $m\\angle POQ = ${angleSide}^\\circ$ and $m\\angle ROT = ${angleSide}^\\circ$, it follows that $m\\angle QOR = 180^\\circ - ${angleSide}^\\circ - ${angleSide}^\\circ = ${angleMid}^\\circ$. Converting to radians by multiplying by $\\frac{\\pi}{180}$ gives $\\frac{${angleMid}\\pi}{180} = ${correctTex}$. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`;

    return {
      questionText: `In the xy-plane above, points $P$, $Q$, $R$, and $T$ lie on the circle with center $O$, and $P$, $O$, and $T$ lie on a straight line. The degree measures satisfy $m\\angle POQ = ${angleSide}^\\circ$ and $m\\angle ROT = ${angleSide}^\\circ$. What is the radian measure of $\\angle QOR$?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
