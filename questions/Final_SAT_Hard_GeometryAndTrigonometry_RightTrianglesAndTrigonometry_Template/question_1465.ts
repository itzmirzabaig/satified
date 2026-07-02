import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1465
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

export const generator_1465 = {
  metadata: {
    id: "1465",
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
