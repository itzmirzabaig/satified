import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1286
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (-3,4), (5,3), (4,-3)]
 * - Difficulty factors: [Triangle area from coordinates using shoelace or box method]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Points must form valid triangle with clean area]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [Triangle with coordinates Mafs]
 */

export const generator_1286 = {
  metadata: {
    id: "1286",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate triangle points with clean area
    // Use box method: area = bounding box - 3 right triangles
    // For clean calculation, use integer coordinates
    
    let x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, area: number;
    let attempts = 0;
    const maxAttempts = 100;
    
    // Use while loop instead of recursion to find valid values
    do {
      x1 = getRandomInt(-6, -2);
      y1 = getRandomInt(2, 6);
      x2 = getRandomInt(4, 8);
      y2 = getRandomInt(2, 6);
      x3 = getRandomInt(3, 7);
      y3 = getRandomInt(-5, -1);
      
      // STEP 2: Calculate area using shoelace formula
      // Area = 1/2|x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|
      area = 0.5 * Math.abs(
        x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)
      );
      
      attempts++;
    } while (area !== Math.floor(area) && area !== Math.floor(area) + 0.5 && attempts < maxAttempts);
    
    // If we couldn't find a clean area, force one by adjusting
    if (attempts >= maxAttempts) {
      // Use simple values that guarantee clean area
      x1 = -3; y1 = 4; x2 = 5; y2 = 3; x3 = 4; y3 = -3;
      area = 0.5 * Math.abs(
        x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)
      );
    }
    
    // STEP 3: Build Mafs code
    const minX = Math.min(x1, x2, x3) - 1;
    const maxX = Math.max(x1, x2, x3) + 1;
    const minY = Math.min(y1, y2, y3) - 1;
    const maxY = Math.max(y1, y2, y3) + 1;
    
    const _svg_0 = maxY; const _svg_1 = minY; const _svg_2 = maxX; const _svg_3 = minX;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_3,xmax=_svg_2;
      const ymin=_svg_1,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=(minX),xmax=(maxX);
      const ymin=(minY),ymax=(maxY);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((x1))+'" y="'+my((y1 + 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">(${x1, ${y1)</text>';
    })()}${(() => {
      const xmin=(minX),xmax=(maxX);
      const ymin=(minY),ymax=(maxY);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((x2 + 0.5))+'" y="'+my((y2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">(${x2, ${y2)</text>';
    })()}${(() => {
      const xmin=(minX),xmax=(maxX);
      const ymin=(minY),ymax=(maxY);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((x3 + 0.5))+'" y="'+my((y3))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">(${x3, ${y3)</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `What is the area, in square units, of the triangle formed by connecting the three points shown?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: area.toString(),
      explanation: `Using the shoelace formula: Area = $\\frac{1}{2}|${x1}(${y2}-${y3}) + ${x2}(${y3}-${y1}) + ${x3}(${y1}-${y2})| = \\frac{1}{2}|${x1*(y2-y3)} + ${x2*(y3-y1)} + ${x3*(y1-y2)}| = \\frac{1}{2}|${2*area}| = ${area}$.`
    };
  }
};
