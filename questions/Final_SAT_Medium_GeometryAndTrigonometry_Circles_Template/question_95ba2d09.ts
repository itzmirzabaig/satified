import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 95ba2d09
 * 
 * ANALYSIS:
 * - Skill: Circle Geometry (Angles, Radians)
 * - Issue Fixed: 
 *   1. Invisible circle (radius was 0). 
 *   2. Graph didn't show points P, Q, R, T.
 * - Logic: 
 *   - Points T, O, P lie on x-axis (straight line).
 *   - Angles POQ and ROT are given (symmetric).
 *   - Angle QOR = 180 - (POQ + ROT).
 *   - Convert to radians.
 */

// Helper to simplify fractions
const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const generator_95ba2d09 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Angles
    // We want QOR to be a clean angle for radian conversion (e.g., 120, 135, 150)
    // Common radian denominators: 3, 4, 6
    // Possible QOR angles:
    // 120 deg (2pi/3) -> remaining 60 -> POQ=30, ROT=30
    // 90 deg (pi/2)   -> remaining 90 -> POQ=45, ROT=45
    // 150 deg (5pi/6) -> remaining 30 -> POQ=15, ROT=15
    
    const possibleScenarios = [
        { qor: 120, side: 30 },
        { qor: 90, side: 45 },
        { qor: 150, side: 15 },
        { qor: 60, side: 60 }
    ];
    
    const scenario = possibleScenarios[getRandomInt(0, possibleScenarios.length - 1)];
    const angleSide = scenario.side; // POQ and ROT
    const angleMid = scenario.qor;   // QOR
    
    // STEP 2: Convert Answer to Radians
    const div = gcd(angleMid, 180);
    const num = angleMid / div;
    const den = 180 / div;
    
    const radianAnswer = num === 1 
        ? `\\frac{\\pi}{${den}}` 
        : `\\frac{${num}\\pi}{${den}}`;
    
    // STEP 3: Generate Distractors
    // Distractor A: The side angle in radians (POQ)
    const divA = gcd(angleSide, 180);
    const numA = angleSide / divA;
    const denA = 180 / divA;
    const distA = numA === 1 ? `\\frac{\\pi}{${denA}}` : `\\frac{${numA}\\pi}{${denA}}`;
    
    // Distractor B: Sum of two angles (POQ + ROT)
    const sumSide = angleSide * 2;
    const divB = gcd(sumSide, 180);
    const numB = sumSide / divB;
    const denB = 180 / divB;
    const distB = numB === 1 ? `\\frac{\\pi}{${denB}}` : `\\frac{${numB}\\pi}{${denB}}`;

    // Distractor C: Complementary or supplementary mistake (e.g. 180 - angleMid without conversion)
    // Let's just pick a common radian not used yet
    const commonRadians = [`\\frac{\\pi}{3}`, `\\frac{\\pi}{4}`, `\\frac{\\pi}{6}`, `\\pi`];
    const distC = commonRadians.find(r => r !== radianAnswer && r !== distA && r !== distB) || `\\pi`;

    const optionsData = [
        { text: `$${radianAnswer}$`, isCorrect: true },
        { text: `$${distA}$`, isCorrect: false },
        { text: `$${distB}$`, isCorrect: false },
        { text: `$${distC}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // STEP 4: Generate SVG
    const width = 300;
    const height = 300;
    const cx = 150;
    const cy = 150;
    const r = 100;

    // Angles for points
    // P is typically at 0 degrees (Right)
    // Q is at angleSide degrees
    // R is at angleSide + angleMid degrees
    // T is at 180 degrees (Left)
    
    const degToRad = (d: number) => d * Math.PI / 180;
    const getX = (d: number) => cx + r * Math.cos(degToRad(d));
    const getY = (d: number) => cy - r * Math.sin(degToRad(d)); // Inverted Y

    const px = getX(0), py = getY(0);
    const qx = getX(angleSide), qy = getY(angleSide);
    const rx = getX(angleSide + angleMid), ry = getY(angleSide + angleMid);
    const tx = getX(180), ty = getY(180);

    const svgContent = `
<div style="width: 100%; max-width: 300px; margin: 0 auto;">
  <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit; font-family: sans-serif;">
    <!-- Circle -->
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="2"/>
    
    <!-- Axis Line T-O-P -->
    <line x1="${tx}" y1="${ty}" x2="${px}" y2="${py}" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4,4"/>
    
    <!-- Radii OQ, OR -->
    <line x1="${cx}" y1="${cy}" x2="${qx}" y2="${qy}" stroke="currentColor" stroke-width="2"/>
    <line x1="${cx}" y1="${cy}" x2="${rx}" y2="${ry}" stroke="currentColor" stroke-width="2"/>
    <line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="currentColor" stroke-width="2"/>
    <line x1="${cx}" y1="${cy}" x2="${tx}" y2="${ty}" stroke="currentColor" stroke-width="2"/>

    <!-- Points -->
    <circle cx="${px}" cy="${py}" r="4" fill="currentColor"/>
    <circle cx="${qx}" cy="${qy}" r="4" fill="currentColor"/>
    <circle cx="${rx}" cy="${ry}" r="4" fill="currentColor"/>
    <circle cx="${tx}" cy="${ty}" r="4" fill="currentColor"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="currentColor"/>

    <!-- Labels -->
    <text x="${px + 15}" y="${py + 5}" text-anchor="middle" font-size="16" fill="currentColor">P</text>
    <text x="${qx + 10}" y="${qy - 10}" text-anchor="middle" font-size="16" fill="currentColor">Q</text>
    <text x="${rx - 10}" y="${ry - 10}" text-anchor="middle" font-size="16" fill="currentColor">R</text>
    <text x="${tx - 15}" y="${ty + 5}" text-anchor="middle" font-size="16" fill="currentColor">T</text>
    <text x="${cx}" y="${cy + 20}" text-anchor="middle" font-size="16" fill="currentColor">O</text>
  </svg>
</div>
`;

    // STEP 5: Explanation
    const explanation = `
      Choice ${correctOption.letter} is correct.
      
      1. Points $P$, $O$, and $T$ lie on the x-axis, forming a straight line. The angle of a straight line is $180^\\circ$.
      2. The angles $\\angle POQ$, $\\angle QOR$, and $\\angle ROT$ add up to this $180^\\circ$.
      
      $$m\\angle POQ + m\\angle QOR + m\\angle ROT = 180^\\circ$$
      
      We are given that $m\\angle POQ = ${angleSide}^\\circ$ and $m\\angle ROT = ${angleSide}^\\circ$.
      
      $$${angleSide} + m\\angle QOR + ${angleSide} = 180$$
      $$m\\angle QOR = 180 - ${angleSide * 2}$$
      $$m\\angle QOR = ${angleMid}^\\circ$$
      
      3. Convert degrees to radians by multiplying by $\\frac{\\pi}{180}$:
      
      $$${angleMid} \\times \\frac{\\pi}{180} = \\frac{${angleMid}\\pi}{180}$$
      
      Simplifying the fraction $\\frac{${angleMid}}{180}$ by dividing by ${div}:
      
      $$= ${radianAnswer}$$
    `.trim();

    return {
      questionText: `In the xy-plane above, points $P$, $Q$, $R$, and $T$ lie on the circle with center $O$. The degree measures of angles $\\angle POQ$ and $\\angle ROT$ are each $${angleSide}^\\circ$. What is the radian measure of angle $\\angle QOR$?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};