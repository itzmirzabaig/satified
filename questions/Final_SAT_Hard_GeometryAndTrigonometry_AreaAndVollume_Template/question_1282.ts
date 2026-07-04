import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1282
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates: (6,2), (6,10), (2,6)]
 * - Difficulty factors: [Finding circle from 3 points, circumcenter = intersection of perpendicular bisectors]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Points must form valid circle, center is equidistant from all 3]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [Circle with 3 points Mafs]
 */

export const generator_1282 = {
  metadata: {
    id: "1282",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate circle center and radius
    // Original had center at (6,6) with points at (6,2), (6,10), (2,6)
    // Structure: vertical chord and horizontal point, forming right angle pattern
    const centerX = getRandomInt(2, 8);
    const centerY = getRandomInt(3, 8);
    const radius = getRandomInt(2, 5);
    
    // STEP 2: Calculate 3 points on the circle
    // Point 1: directly below center (vertical)
    const p1x = centerX;
    const p1y = centerY - radius;
    
    // Point 2: directly above center (vertical diameter)
    const p2x = centerX;
    const p2y = centerY + radius;
    
    // Point 3: to the left (horizontal)
    const p3x = centerX - radius;
    const p3y = centerY;
    
    // STEP 3: Calculate circumference factor k
    const k = 2 * radius; // C = kπ, so k = 2r

    // STEP 4: Build the figure as a self-contained SVG.
    // A single coordinate mapping with an EQUAL x/y pixel scale keeps the
    // circle circular; the window is centered on the circle center so the
    // whole circle plus the three points fit inside the viewBox.
    const points = [
      { x: p1x, y: p1y },
      { x: p2x, y: p2y },
      { x: p3x, y: p3y }
    ];

    const W = 400, H = 350, P = 36;
    // Data-unit half-spans needed so the circle + a 1-unit margin are visible.
    const halfSpan = radius + 1.5;
    const plotW = W - 2 * P;
    const plotH = H - 2 * P;
    // pixels per data unit, equal on both axes (min so both fit)
    const scale = Math.min(plotW, plotH) / (2 * halfSpan);
    const cxPix = W / 2;
    const cyPix = H / 2;
    // map data (x,y) -> pixel; y grows upward in data, downward in pixels
    const mx = (x: number) => cxPix + (x - centerX) * scale;
    const my = (y: number) => cyPix - (y - centerY) * scale;

    // Integer grid range currently visible
    const xLo = Math.ceil(centerX - halfSpan);
    const xHi = Math.floor(centerX + halfSpan);
    const yLo = Math.ceil(centerY - halfSpan);
    const yHi = Math.floor(centerY + halfSpan);

    let grid = '';
    for (let x = xLo; x <= xHi; x++) {
      grid += `<line x1="${mx(x)}" y1="${P}" x2="${mx(x)}" y2="${H - P}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
    }
    for (let y = yLo; y <= yHi; y++) {
      grid += `<line x1="${P}" y1="${my(y)}" x2="${W - P}" y2="${my(y)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
    }

    // Axes: draw the zero lines only when they fall inside the window.
    let axes = '';
    if (centerX - halfSpan <= 0 && 0 <= centerX + halfSpan) {
      axes += `<line x1="${mx(0)}" y1="${P}" x2="${mx(0)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`;
    }
    if (centerY - halfSpan <= 0 && 0 <= centerY + halfSpan) {
      axes += `<line x1="${P}" y1="${my(0)}" x2="${W - P}" y2="${my(0)}" stroke="currentColor" stroke-width="1.5"/>`;
    }

    // Tick labels along the bottom (x) and left (y) edges.
    let ticks = '';
    for (let x = xLo; x <= xHi; x++) {
      if (x === 0) continue;
      ticks += `<text x="${mx(x)}" y="${H - P + 14}" text-anchor="middle" font-size="9" fill="currentColor">${x}</text>`;
    }
    for (let y = yLo; y <= yHi; y++) {
      if (y === 0) continue;
      ticks += `<text x="${P - 8}" y="${my(y) + 3}" text-anchor="end" font-size="9" fill="currentColor">${y}</text>`;
    }

    // The circle, with a true pixel radius derived from the actual radius.
    const circle = `<circle cx="${mx(centerX)}" cy="${my(centerY)}" r="${radius * scale}" fill="none" stroke="#3b82f6" stroke-width="2"/>`;

    // The three defining points as labeled markers.
    const markers = points.map(pt =>
      `<circle cx="${mx(pt.x)}" cy="${my(pt.y)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5"/>` +
      `<text x="${mx(pt.x) + 7}" y="${my(pt.y) - 6}" font-size="10" fill="currentColor">(${pt.x}, ${pt.y})</text>`
    ).join('');

    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${grid}${axes}${ticks}${circle}${markers}</svg></div>`;

    return {
      questionText: `The three points shown define a circle. The circumference of this circle is $k\\pi$, where $k$ is a constant. What is the value of $k$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: k.toString(),
      explanation: `The center of the circle must be equidistant from all three points. The point $(${centerX}, ${centerY})$ is equidistant (distance ${radius}) from $(${p1x}, ${p1y})$, $(${p2x}, ${p2y})$, and $(${p3x}, ${p3y})$, making it the center with radius $${radius}$. The circumference is $2\\pi r = 2\\pi(${radius}) = ${k}\\pi$. Thus, $k = ${k}$.`
    };
  }
};
