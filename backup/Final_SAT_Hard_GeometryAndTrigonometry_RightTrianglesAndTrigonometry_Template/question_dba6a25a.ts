import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: dba6a25a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AE = 18, CB = 8, BD = 6]
 * - Difficulty factors: [Similar triangles, 3-4-5 triangle, scale factor]
 * - Constraints: [Scale factor = AE/BD = 18/6 = 3, CD = 10, CE = 30]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Nested similar right triangles]
 */

export const generator_dba6a25a = {
  metadata: {
    // id: "dba6a25a",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: AE = 18, CB = 8, BD = 6
    // Triangle CBD is 6-8-10 (3-4-5 scaled by 2)
    // Triangle CAE is similar with scale factor 18/6 = 3
    // CE = 3 × 10 = 30
    
    // Generate similar triangles based on 3-4-5
    const baseScale = getRandomInt(3, 6); // For smaller triangle
    const smallA = 3 * baseScale;
    const smallB = 4 * baseScale;
    const smallHypotenuse = 5 * baseScale;
    
    const scaleFactor = getRandomInt(2, 4);
    const largeA = smallA * scaleFactor;
    const largeHypotenuse = smallHypotenuse * scaleFactor;
    
    // Setup: BD = smallA (vertical), CB = smallB (horizontal)
    // AE = largeA (vertical)
    
    const _svg_0 = largeA + 3; const _svg_1 = smallB + 5;
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
      const xmin=-2,xmax=${smallB + 5};
      const ymin=-2,ymax=${largeA + 3};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${smallB})+'" y1="'+my(0)+'" x2="'+mx(${smallB - (smallB * smallA / largeA)})+'" y2="'+my(${smallA})+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=-2,xmax=${smallB + 5};
      const ymin=-2,ymax=${largeA + 3};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-2,xmax=${smallB + 5};
      const ymin=-2,ymax=${largeA + 3};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${smallB + 1})+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=-2,xmax=${smallB + 5};
      const ymin=-2,ymax=${largeA + 3};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${smallB})+'" y="'+my(${largeA + 1})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">E</text>';
    })()}${(() => {
      const xmin=-2,xmax=${smallB + 5};
      const ymin=-2,ymax=${largeA + 3};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${smallB - (smallB * smallA / largeA) / 2})+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-2,xmax=${smallB + 5};
      const ymin=-2,ymax=${largeA + 3};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${smallB - (smallB * smallA / largeA) / 2})+'" y="'+my(${smallA + 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">D</text>';
    })()}</svg></div>`;

    return {
      questionText: `In the figure, right triangle CAE has a right angle at A. AE is vertical, AC is horizontal, and CE is the hypotenuse. $AE = ${largeA}$, $CB = ${smallB}$, $BD = ${smallA}$ and $BD \\\\parallel AE$. What is the length of CE?`,
      figureCode: mafsCode,
      options: null, // Fill in the blank
      correctAnswer: largeHypotenuse.toString(),
      explanation: `$\\\\triangle CBD \\\\sim \\\\triangle CAE$. In $\\\\triangle CBD$, $CD = \\\\sqrt{${smallA}^2 + ${smallB}^2} = ${smallHypotenuse}$. Ratio $AE/BD = ${largeA}/${smallA} = ${scaleFactor}$. Thus $CE = ${scaleFactor} \\\\times CD = ${largeHypotenuse}$.`
    };
  }
};

/**
 * Question ID: 8027db3f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cos(K) = 24/51 = 8/17]
 * - Difficulty factors: [Cosine ratio, Pythagorean theorem, complementary angle cosine]
 * - Constraints: [cos(L) = sin(K) = √(1 - (8/17)²) = 15/17]
 * - Question type: [No Figure→Fill in the blank]
 * - Figure generation: null
 */