import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a4ed5285
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 5, height: 3 (single-digit)]
 * - Difficulty factors: [Right triangle area, identifying base/height from figure]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Base and height must be clear from figure orientation]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Mafs: Right triangle with legs labeled]
 */

export const generator_a4ed5285 = {
  metadata: {
    // id: "a4ed5285",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate figure parameters
    const base = getRandomInt(4, 10);
    const height = getRandomInt(3, 8);
    
    // STEP 2: Calculate area
    const area = (base * height) / 2;
    
    // STEP 3: Build Mafs code for right triangle
    // Right triangle with right angle at origin, base along x-axis, height along y-axis
    const _svg_0 = height + 1; const _svg_1 = base + 1;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=_svg_1;
      const ymin=-1,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-1,xmax=${base + 1};
      const ymin=-1,ymax=${height + 1};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${base / 2})+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${base</text>';
    })()}${(() => {
      const xmin=-1,xmax=${base + 1};
      const ymin=-1,ymax=${height + 1};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${base + 0.5})+'" y="'+my(${height / 2})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${height</text>';
    })()}${(() => {
      const xmin=-1,xmax=${base + 1};
      const ymin=-1,ymax=${height + 1};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${base / 2})+'" y="'+my(${height + 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Note: Figure not drawn to scale.</text>';
    })()}</svg></div>`;
    
    // STEP 4: Return question data
    return {
      questionText: `The figure shows the lengths, in inches, of two sides of a right triangle. What is the area of the triangle, in square inches?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: area.toString(),
      explanation: `The area of a right triangle is $\\\\frac{1}{2} \\\\times \\\\text{base} \\\\times \\\\text{height}$. With a base of ${base} and a height of ${height}, the area is $\\\\frac{1}{2}(${base})(${height}) = ${area}$.`
    };
  }
};

/**
 * Question ID: e336a1d2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge: 41 (double-digit)]
 * - Difficulty factors: [Cube volume, cubing double-digit numbers]
 * - Distractor patterns: [A: 4×edge, B: edge², C: 6×edge² (surface area)]
 * - Constraints: [Edge length such that edge³ is manageable]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */