import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1462
 * 
 * ANALYSIS:
 * - Context: Right Triangle Trigonometry (Tangent Ratio).
 * - Given: Side lengths of triangle RST.
 * - Find: tan(R) or tan(T).
 * - Logic: Identify the right angle (opposite largest side). Calculate Opp/Adj.
 */

export const generator_1462 = {
  metadata: {
    id: "1462",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Pythagorean Triple
    const primitives = [
      [20, 21, 29],
      [12, 35, 37],
      [48, 55, 73],
      [11, 60, 61]
    ];
    const triple = getRandomElement(primitives) as [number, number, number];
    const scale = getRandomInt(1, 5);
    
    // Sort sides: a < b < c
    // c is hypotenuse. Right angle is opposite c.
    const [a, b, c] = triple.map(x => x * scale);
    
    // 2. Assign Vertices
    // Triangle RST. Let S be the right angle (opposite hypotenuse RT? No, hypotenuse is usually named by vertices).
    // Let's explicitly define lengths:
    // RS = a, ST = b, TR = c.
    // If TR is hypotenuse, angle S is 90 degrees.
    // We want tan(R).
    // Angle R is between RS (Adj) and TR (Hyp).
    // Opposite to R is ST (b).
    // Adjacent to R is RS (a).
    // tan(R) = ST / RS = b / a.
    
    const targetAngle = "R";
    const opp = b;
    const adj = a;
    
    // Simplify the fraction for the answer
    const gcdVal = (x: number, y: number): number => (!y ? x : gcdVal(y, x % y));
    const div = gcdVal(opp, adj);
    const num = opp / div;
    const den = adj / div;
    
    const correctVal = `${num}/${den}`;

    // 3. SVG Configuration
    const width = 300;
    const height = 250;
    const pad = 40;
    
    // Draw Triangle RST
    // S is right angle at bottom-left.
    // R is top-left? No, let's place standard:
    // S at (pad, height-pad).
    // R at (pad, pad) -> Side RS is vertical.
    // T at (width-pad, height-pad) -> Side ST is horizontal.
    
    // Note: aspect ratio might not match a/b perfectly, but labeling handles the math.
    // We'll draw a generic right triangle.
    
    const pS = { x: pad, y: height - pad }; // Right Angle
    const pR = { x: pad, y: pad + 20 }; // Top
    const pT = { x: width - pad, y: height - pad }; // Right
    
    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle -->
        <polygon points="${pS.x},${pS.y} ${pT.x},${pT.y} ${pR.x},${pR.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
          
        <!-- Right Angle Marker at S -->
        <polyline points="${pS.x},${pS.y - 20} ${pS.x + 20},${pS.y - 20} ${pS.x + 20},${pS.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
          
        <!-- Labels for Vertices -->
        <text x="${pS.x - 15}" y="${pS.y + 10}" font-weight="bold" fill="currentColor">S</text>
        <text x="${pR.x - 15}" y="${pR.y}" font-weight="bold" fill="currentColor">R</text>
        <text x="${pT.x + 10}" y="${pT.y + 10}" font-weight="bold" fill="currentColor">T</text>
        
        <!-- Side Lengths -->
        <!-- RS (vertical) = a -->
        <text x="${pS.x - 25}" y="${(pS.y + pR.y) / 2}" fill="currentColor" dominant-baseline="middle">${a}</text>
        <!-- ST (horizontal) = b -->
        <text x="${(pS.x + pT.x) / 2}" y="${pS.y + 25}" fill="currentColor" text-anchor="middle">${b}</text>
        <!-- TR (hypotenuse) = c -->
        <text x="${(pR.x + pT.x) / 2 + 10}" y="${(pR.y + pT.y) / 2 - 10}" fill="currentColor">${c}</text>
      </svg>
    `;
    
    // 4. Options
    // Correct: b/a
    // Wrong 1: a/b (cot)
    // Wrong 2: b/c (sin)
    // Wrong 3: a/c (cos)
    
    const optCorrect = correctVal;
    const optWrong1 = `${den}/${num}`;
    const optWrong2 = `${num}/${c/div}`;
    const optWrong3 = `${den}/${c/div}`;
    
    const optionsData = [
      { text: optCorrect, isCorrect: true },
      { text: optWrong1, isCorrect: false },
      { text: optWrong2, isCorrect: false },
      { text: optWrong3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `In the right triangle $RST$ shown above, $RS=${a}$, $ST=${b}$, and $TR=${c}$. What is the value of $\\tan R$?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The tangent of an acute angle in a right triangle is the ratio of the length of the opposite side to the length of the adjacent side ($\\\\tan x = \\\\frac{\\text{Opposite}}{\\text{Adjacent}}$).
      
For angle $R$:
- The opposite side is $ST = ${b}$.
- The adjacent side is $RS = ${a}$.

Therefore, $\\tan R = \\frac{${b}}{${a}} = ${correctVal}$.`
    };
  }
};
