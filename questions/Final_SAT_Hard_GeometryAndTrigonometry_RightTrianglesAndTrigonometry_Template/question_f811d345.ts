import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f811d345
 * 
 * FIXES:
 * - Replaced broken code with a proper SVG of a right triangle.
 * - Logic: Generate legs such that Hypotenuse = k * sqrt(d).
 *   Legs a, b. a^2 + b^2 = k^2 * d.
 *   Let a = k * x, b = k * y.
 *   Hypotenuse = k * sqrt(x^2 + y^2).
 *   So d = x^2 + y^2.
 *   We choose x, y such that x^2 + y^2 is not a perfect square (so d remains inside sqrt).
 */

export const generator_f811d345 = {
  metadata: {
    id: "f811d345",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Logic
    // We need Hypotenuse = 3 * sqrt(d) (or m * sqrt(d))
    // Let multiplier m = 3 (fixed per original question style) or random small int.
    const m = 3; 
    
    // Choose base legs x, y such that x^2 + y^2 = d (where d is not a perfect square)
    // Common non-square sums of squares:
    // 7^2 + 8^2 = 49 + 64 = 113
    // 5^2 + 8^2 = 25 + 64 = 89
    // 4^2 + 7^2 = 16 + 49 = 65
    // 2^2 + 7^2 = 4 + 49 = 53
    
    const basePairs = [
      [7, 8], // d=113
      [5, 8], // d=89
      [4, 7], // d=65
      [2, 7]  // d=53
    ];
    
    const pair = getRandomElement(basePairs) as [number, number];
    const x = pair[0];
    const y = pair[1];
    
    const d = x * x + y * y;
    
    // Actual legs
    const leg1 = m * x;
    const leg2 = m * y;
    
    // 2. SVG Generation
    const width = 300;
    const height = 250;
    const pad = 40;
    
    // Scale drawing to fit
    // Max dimension is roughly max(leg1, leg2)
    // We just draw a generic right triangle and label it.
    
    const pCorner = { x: pad, y: height - pad }; // Right Angle (Bottom-Left)
    const pTop = { x: pad, y: pad }; // Top
    const pRight = { x: width - pad, y: height - pad }; // Right
    
    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle -->
        <polygon points="${pCorner.x},${pCorner.y} ${pRight.x},${pRight.y} ${pTop.x},${pTop.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
          
        <!-- Right Angle Marker -->
        <polyline points="${pCorner.x},${pCorner.y - 20} ${pCorner.x + 20},${pCorner.y - 20} ${pCorner.x + 20},${pCorner.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
          
        <!-- Labels for Legs -->
        <text x="${pCorner.x - 10}" y="${(pCorner.y + pTop.y) / 2}" 
          font-size="16" fill="currentColor" text-anchor="end" dominant-baseline="middle">${leg1}</text>
          
        <text x="${(pCorner.x + pRight.x) / 2}" y="${pCorner.y + 25}" 
          font-size="16" fill="currentColor" text-anchor="middle">${leg2}</text>
      </svg>
    `;

    return {
      questionText: `A right triangle has legs with lengths of ${leg1} centimeters and ${leg2} centimeters. If the length of this triangle's hypotenuse, in centimeters, can be written in the form $${m}\\sqrt{d}$, where $d$ is an integer, what is the value of $d$?`,
      figureCode: svgCode,
      options: null, // Fill in the blank
      correctAnswer: d.toString(),
      explanation: `
1. **Use Pythagorean Theorem:**
   $a^2 + b^2 = c^2$
   $(${leg1})^2 + (${leg2})^2 = c^2$
   $${leg1 * leg1} + ${leg2 * leg2} = c^2$
   $${leg1 * leg1 + leg2 * leg2} = c^2$

2. **Simplify the Radical:**
   $c = \\sqrt{${leg1 * leg1 + leg2 * leg2}}$
   
   Factor out the perfect square. We know the legs were $${m} \\times ${x}$ and $${m} \\times ${y}$.
   So sum is $${m}^2(${x}^2 + ${y}^2) = ${m * m}(${d})$.
   $c = \\sqrt{${m * m} \\cdot ${d}} = ${m}\\sqrt{${d}}$.

3. **Identify d:**
   Comparing to the form $${m}\\sqrt{d}$, we see that $d = ${d}$.`
    };
  }
};

/**
 * Question ID: c9931030
 * 
 * ANALYSIS:
 * - Context: Right Triangle Similarity & Trigonometry.
 * - Given: Triangle RST (Right angle at S). Side lengths.
 * - Find: tan(T).
 * - Logic: tan(T) = Opp/Adj.
 * - Note: Question mentions "Similar triangles" usually to confuse, or asks about a similar triangle UVW.
 * - Let's stick to the prompt analysis: "Similar triangles, tangent ratio".
 * - Likely: "Triangle UVW is similar to RST... what is tan(W)?" (where W corresponds to T).
 */

export const generator_c9931030 = {
  metadata: {
    id: "c9931030",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // Use 5-12-13 triple scaled
    const scale = getRandomInt(2, 5); // e.g. 4 -> 20-48-52
    const baseSides = [5, 12, 13];
    const [a, b, c] = baseSides.map(x => x * scale);
    
    // Triangle RST. Right angle at S.
    // RS = 20 (a), ST = 48 (b), TR = 52 (c).
    // tan(T) = Opp / Adj.
    // Angle T is between ST (Adj) and TR (Hyp).
    // Opposite to T is RS (a).
    // tan(T) = RS / ST = a / b = 5 / 12.
    
    // Simplified fraction
    const num = baseSides[0]; // 5
    const den = baseSides[1]; // 12
    const correctVal = `${num}/${den}`;

    // 2. SVG Configuration
    const width = 300;
    const height = 220;
    const pad = 40;
    
    // Draw Triangle RST
    // Right Angle S at bottom-left
    // T at bottom-right (so ST is horizontal adjacent)
    // R at top-left (so RS is vertical opposite)
    
    const pS = { x: pad, y: height - pad };
    const pT = { x: width - pad, y: height - pad };
    const pR = { x: pad, y: pad };
    
    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle -->
        <polygon points="${pS.x},${pS.y} ${pT.x},${pT.y} ${pR.x},${pR.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
          
        <!-- Right Angle Marker -->
        <polyline points="${pS.x},${pS.y - 20} ${pS.x + 20},${pS.y - 20} ${pS.x + 20},${pS.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
          
        <!-- Labels -->
        <text x="${pS.x - 15}" y="${pS.y + 10}" font-weight="bold" fill="currentColor">S</text>
        <text x="${pT.x + 10}" y="${pT.y + 10}" font-weight="bold" fill="currentColor">T</text>
        <text x="${pR.x - 15}" y="${pR.y}" font-weight="bold" fill="currentColor">R</text>
        
        <!-- Side Lengths -->
        <text x="${(pS.x + pT.x) / 2}" y="${pS.y + 25}" text-anchor="middle" fill="currentColor">${b}</text>
        <text x="${pS.x - 25}" y="${(pS.y + pR.y) / 2}" dominant-baseline="middle" fill="currentColor">${a}</text>
        <text x="${(pR.x + pT.x) / 2 + 10}" y="${(pR.y + pT.y) / 2 - 10}" fill="currentColor">${c}</text>
      </svg>
    `;
    
    // 3. Options
    // Correct: 5/12
    // Wrong 1: 12/5 (cot)
    // Wrong 2: 5/13 (sin)
    // Wrong 3: 12/13 (cos)
    
    const optionsData = [
      { text: correctVal, isCorrect: true },
      { text: `${den}/${num}`, isCorrect: false },
      { text: `${num}/${baseSides[2]}`, isCorrect: false },
      { text: `${den}/${baseSides[2]}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `In the right triangle $RST$ shown above, $RS=${a}$, $ST=${b}$, and $TR=${c}$. Triangle $UVW$ (not shown) is similar to triangle $RST$, where vertex $U$ corresponds to vertex $R$, vertex $V$ corresponds to vertex $S$, and vertex $W$ corresponds to vertex $T$. What is the value of $\\tan W$?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1. **Identify Corresponding Angles:**
   Triangle $UVW$ is similar to triangle $RST$. Vertex $W$ corresponds to vertex $T$.
   Therefore, $\\tan W = \\tan T$.

2. **Calculate $\\tan T$:**
   In right triangle $RST$ (right angle at $S$):
   - Opposite side to $T$ is $RS = ${a}$.
   - Adjacent side to $T$ is $ST = ${b}$.
   
   $\\tan T = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{RS}{ST} = \\frac{${a}}{${b}}$.

3. **Simplify:**
   Dividing numerator and denominator by the common factor ${scale}:
   $\\frac{${a}}{${b}} = \\frac{${num}}{${den}}$.`
    };
  }
};