import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6933b3d9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Triangle RST with right angle at S]
 * - Difficulty factors: [Complementary angles, cofunction identity: cos(A) = sin(90°-A)]
 * - Constraints: [cos(RSW) - sin(WST) = 0 because angles are complementary]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with point W on hypotenuse]
 */

export const generator_6933b3d9 = {
  metadata: {
    // id: "6933b3d9",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // This is a conceptual question about complementary angles
    // cos(RSW) = sin(90° - RSW) = sin(WST) since RSW + WST = 90°
    // So cos(RSW) - sin(WST) = 0
    
    // Generate right triangle dimensions
    const base = getRandomInt(5, 15);
    const height = getRandomInt(5, 15);
    
    const _svg_0 = height + 2; const _svg_1 = base + 2;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=_svg_1;
      const ymin=-2,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-2,xmax=${base + 2};
      const ymin=-2,ymax=${height + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${base})+'" y1="'+my(0)+'" x2="'+mx(${base * 0.7})+'" y2="'+my(${height * 0.7})+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=-2,xmax=${base + 2};
      const ymin=-2,ymax=${height + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${base})+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">S</text>';
    })()}${(() => {
      const xmin=-2,xmax=${base + 2};
      const ymin=-2,ymax=${height + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-1)+'" y="'+my(0)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">T</text>';
    })()}${(() => {
      const xmin=-2,xmax=${base + 2};
      const ymin=-2,ymax=${height + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${base})+'" y="'+my(${height + 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">R</text>';
    })()}</svg></div>`;

    return {
      questionText: `In triangle RST above, point W (not shown) lies on RT. What is the value of $\\\\cos (\\\\angle RSW) - \\\\sin (\\\\angle WST)$?`,
      figureCode: mafsCode,
      options: null, // Fill in the blank
      correctAnswer: "0",
      explanation: `Angle $RSW$ and $WST$ sum to $90^{\\\\circ}$ (angle $RST$). Complementary angles have $\\\\cos A = \\\\sin B$ when $A + B = 90^{\\\\circ}$. Thus, $\\\\cos(RSW) - \\\\sin(WST) = 0$ because $\\\\sin(WST) = \\\\sin(90^{\\\\circ} - RSW) = \\\\cos(RSW)$.`
    };
  }
};

/**
 * Question ID: 6ab30ce3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan(A) = √3, DF = 125]
 * - Difficulty factors: [tan value implies angle, 30-60-90 triangle properties, cosine relationship]
 * - Constraints: [tan(A) = √3 means A = 60°, cos(60°) = 1/2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with angle labels]
 */