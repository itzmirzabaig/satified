import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 48fb6483
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle XZY = 63°, answer: 153°]
 * - Difficulty factors: [Parallel lines, similar triangles, supplementary angles]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [PQ || XY creates similar triangles, angle chasing]
 * - Question type: [Figure→Fill in the blank]
 */

export const generator_48fb6483 = {
  metadata: {
    // id: "48fb6483",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base angle
    const angleXZY = getRandomInt(55, 70);
    
    // STEP 2: Calculate
    const angleZPQ = 180 - 90 - angleXZY;
    const angleXPQ = 180 - angleZPQ;
    
    // STEP 3: Build Mafs code with randomized coordinates
    const yX = 0;
    const yY = 0;
    const zX = getRandomInt(6, 10);
    const zY = 0;
    const xX = 0;
    const xY = getRandomInt(4, 8);
    const pX = getRandomInt(2, 5);
    const pY = (pX / zX) * xY;
    const qX = pX;
    const qY = 0;
    
    const _svg_0 = xY + 2; const _svg_1 = qY - 2; const _svg_2 = zX + 2; const _svg_3 = yX - 2;
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
      const xmin=${yX - 2},xmax=${zX + 2};
      const ymin=${qY - 2},ymax=${xY + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${pX})+'" y1="'+my(${pY.toFixed(2)})+'" x2="'+mx(${qX})+'" y2="'+my(${qY})+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=${yX - 2},xmax=${zX + 2};
      const ymin=${qY - 2},ymax=${xY + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${yX})+'" y="'+my(${yY - 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Y</text>';
    })()}${(() => {
      const xmin=${yX - 2},xmax=${zX + 2};
      const ymin=${qY - 2},ymax=${xY + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${zX})+'" y="'+my(${zY - 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Z</text>';
    })()}${(() => {
      const xmin=${yX - 2},xmax=${zX + 2};
      const ymin=${qY - 2},ymax=${xY + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${xX - 0.5})+'" y="'+my(${xY})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">X</text>';
    })()}${(() => {
      const xmin=${yX - 2},xmax=${zX + 2};
      const ymin=${qY - 2},ymax=${xY + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${pX + 0.5})+'" y="'+my(${(pY / 2).toFixed(2)})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">P</text>';
    })()}${(() => {
      const xmin=${yX - 2},xmax=${zX + 2};
      const ymin=${qY - 2},ymax=${xY + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${qX + 0.5})+'" y="'+my(${qY - 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Q</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `In triangle $XYZ$, angle $Y$ is a right angle, point $P$ lies on $\\\\overline{XZ}$, and point $Q$ lies on $\\\\overline{YZ}$ such that $\\\\overline{PQ}$ is parallel to $\\\\overline{XY}$. If the measure of angle $XZY$ is $${angleXZY}^\\\\circ$, what is the measure, in degrees, of angle $XPQ$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: angleXPQ.toString(),
      explanation: `In $\\\\triangle ZQP$, $\\\\angle ZPQ = 180 - 90 - ${angleXZY} = ${angleZPQ}^\\\\circ$. Angle $XPQ$ is supplementary to $\\\\angle ZPQ$, so $180 - ${angleZPQ} = ${angleXPQ}$.`
    };
  }
};

/**
 * Question ID: 010243e6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates create isosceles right triangles, k is positive constant]
 * - Difficulty factors: [Coordinate geometry, isosceles right triangles, angle measures]
 * - Distractor patterns: [A: 90-(t-k), B: 90-(t+k), D: 90+k (incorrect operations)]
 * - Constraints: [Both triangles are 45-45-90 regardless of k]
 * - Question type: [Figure→Multiple Choice]
 */

// File: generators/lines-angles-and-triangles/010243e6.ts