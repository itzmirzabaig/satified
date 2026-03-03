import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0815a5af
 * 
 * ANALYSIS:
 * - Skill: Circle Geometry (Arc Lengths, Vertical Angles)
 * - Issue Fixed: 
 *   1. Invisible circle in SVG (radius was calculated as 0).
 *   2. LaTeX rendering issues ("pi" and "overline" appearing as text).
 * - Logic: 
 *   - Circumference C = 6x (based on arc relationships).
 *   - Arc PQ = x, Arc PS = 2x.
 *   - Semicircle = 3x.
 *   - Arc QR (vertical to PS) = 2x.
 */

export const generator_0815a5af = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    // Circumference coeff (C) should be divisible by 6 to yield integer arc lengths * pi
    const multiplier = getRandomInt(20, 40); 
    const C_coeff = 6 * multiplier; // e.g., if m=20, C = 120pi
    
    // Target answer: Arc QR
    // Since Arc PS = 2 * Arc PQ, and they form a semicircle (x + 2x = 3x = C/2),
    // Arc PQ = C/6, Arc PS = C/3.
    // Arc QR is vertical to Arc PS, so Arc QR = C/3.
    const ans_coeff = (C_coeff / 3);
    
    // Distractors
    // A: Arc PQ (C/6)
    const distA = C_coeff / 6;
    // C: Half circumference (C/2)
    const distC = C_coeff / 2;
    // D: 2/3 Circumference (2C/3)
    const distD = (2 * C_coeff) / 3;

    // STEP 2: Generate SVG
    // Visual layout: P at 0 deg, Q at 60 deg, R at 180 deg, S at 240 deg.
    // This visually represents PQ = 60deg, PS = 120deg (ratio 1:2).
    const width = 300;
    const height = 300;
    const cx = 150;
    const cy = 150;
    const r = 100;
    
    // Helper for coords
    const degToRad = (deg: number) => (deg * Math.PI) / 180;
    const getX = (deg: number) => cx + r * Math.cos(degToRad(deg));
    const getY = (deg: number) => cy - r * Math.sin(degToRad(deg)); // Y axis inverted in SVG
    
    // Coordinates
    const px = getX(0), py = getY(0);     // P (Right)
    const qx = getX(60), qy = getY(60);   // Q (Top Right)
    const rx = getX(180), ry = getY(180); // R (Left)
    const sx = getX(240), sy = getY(240); // S (Bottom Left)

    const svgContent = `
<div style="width: 100%; max-width: 300px; margin: 0 auto;">
  <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit; font-family: sans-serif;">
    <!-- Circle -->
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="2"/>
    
    <!-- Diameter PR -->
    <line x1="${px}" y1="${py}" x2="${rx}" y2="${ry}" stroke="currentColor" stroke-width="2"/>
    
    <!-- Diameter QS -->
    <line x1="${qx}" y1="${qy}" x2="${sx}" y2="${sy}" stroke="currentColor" stroke-width="2"/>
    
    <!-- Points -->
    <circle cx="${px}" cy="${py}" r="4" fill="currentColor"/>
    <circle cx="${qx}" cy="${qy}" r="4" fill="currentColor"/>
    <circle cx="${rx}" cy="${ry}" r="4" fill="currentColor"/>
    <circle cx="${sx}" cy="${sy}" r="4" fill="currentColor"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="currentColor"/>
    
    <!-- Labels -->
    <text x="${px + 15}" y="${py + 5}" text-anchor="middle" font-size="16" fill="currentColor">P</text>
    <text x="${qx + 10}" y="${qy - 10}" text-anchor="middle" font-size="16" fill="currentColor">Q</text>
    <text x="${rx - 15}" y="${ry + 5}" text-anchor="middle" font-size="16" fill="currentColor">R</text>
    <text x="${sx - 10}" y="${sy + 20}" text-anchor="middle" font-size="16" fill="currentColor">S</text>
    <text x="${cx + 10}" y="${cy - 10}" text-anchor="middle" font-size="16" fill="currentColor">O</text>
  </svg>
</div>
`;

    // STEP 3: Options
    const optionsData = [
      { text: `$${distA}\\pi$`, isCorrect: false },
      { text: `$${ans_coeff}\\pi$`, isCorrect: true },
      { text: `$${distC}\\pi$`, isCorrect: false },
      { text: `$${distD}\\pi$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 4: Explanation
    const explanation = `
      Choice ${correctLetter} is correct.
      
      The circle has diameters $\\overline{PR}$ and $\\overline{QS}$, which intersect at the center $O$.
      
      1.  **Vertical Angles**: Angles $\\angle POS$ and $\\angle QOR$ are vertical angles, so they are equal. This means arc $PS$ and arc $QR$ have the same length. Similarly, arc $PQ$ and arc $SR$ have the same length.
      
      2.  **Semicircle Relationship**: Because $\\overline{PR}$ is a diameter, the arc extending from $P$ to $R$ (passing through $Q$) is a semicircle. Thus:
      $$\\text{Length of Arc } PQ + \\text{Length of Arc } QR = \\text{Half Circumference}$$
      
      Since Arc $QR$ = Arc $PS$, we can substitute:
      $$\\text{Length of Arc } PQ + \\text{Length of Arc } PS = \\text{Half Circumference}$$
      
      3.  **Solving**: 
      Let $x$ be the length of arc $PQ$. We are given that arc $PS$ is twice the length of arc $PQ$, so arc $PS = 2x$.
      $$x + 2x = \\frac{1}{2}(\\text{Circumference})$$
      $$3x = \\frac{1}{2}(${C_coeff}\\pi)$$
      $$3x = ${C_coeff / 2}\\pi$$
      $$x = ${C_coeff / 6}\\pi$$
      
      The question asks for the length of arc $QR$. Since arc $QR$ is congruent to arc $PS$:
      $$\\text{Arc } QR = 2x = 2(${C_coeff / 6}\\pi) = ${ans_coeff}\\pi$$
    `.trim();

    return {
      questionText: `The circle shown has center $O$, circumference $${C_coeff}\\pi$, and diameters $\\overline{PR}$ and $\\overline{QS}$. The length of arc $PS$ is twice the length of arc $PQ$. What is the length of arc $QR$?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};