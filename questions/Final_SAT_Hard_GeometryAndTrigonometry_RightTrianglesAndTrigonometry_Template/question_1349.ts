import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1349
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan(A) = 50/7]
 * - Difficulty factors: [Similar triangles, complementary angles, reciprocal tangent]
 * - Constraints: [tan(E) = 1/tan(D) = 1/tan(A) since D and E are complementary]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with labeled vertices]
 */

export const generator_1349 = {
  metadata: {
    id: "1349",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: tan(A) = 50/7, so tan(D) = 50/7
    // In right triangle, D and E are complementary
    // tan(E) = 1/tan(D) = 7/50
    
    const numerator = getRandomInt(20, 60);
    const denominator = getRandomInt(5, 15);
    
    const gcd = getGCD(numerator, denominator);
    const reducedNum = numerator / gcd;
    const reducedDen = denominator / gcd;
    
    const height = numerator;
    const base = denominator;
    
    const _svg_0 = height + 5; const _svg_1 = base + 2;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=_svg_1;
      const ymin=-5,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-2,xmax=(base + 2);
      const ymin=-5,ymax=(height + 5);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-3)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">D</text>';
    })()}${(() => {
      const xmin=-2,xmax=(base + 2);
      const ymin=-5,ymax=(height + 5);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((base / 2))+'" y="'+my(-3)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">F</text>';
    })()}${(() => {
      const xmin=-2,xmax=(base + 2);
      const ymin=-5,ymax=(height + 5);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((base))+'" y="'+my((height + 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">E</text>';
    })()}</svg></div>`;

    return {
      questionText: `Triangle $ABC$ is similar to triangle $DEF$, where angle $A$ corresponds to angle $D$ and angle $C$ corresponds to angle $F$. Angles $C$ and $F$ are right angles. If $\\\\tan (A) = \\\\frac{${numerator}}{${denominator}}$, what is the value of $\\\\tan (E)$?`,
      figureCode: mafsCode,
      options: null, // Fill in the blank
      correctAnswer: `\\\\frac{${reducedDen}}{${reducedNum}}`,
      explanation: `$\\\\tan D = \\\\tan A = \\\\frac{${numerator}}{${denominator}}$. In right triangle $DEF$, $D$ and $E$ are complementary. $\\\\tan E = \\\\frac{1}{\\\\tan D} = \\\\frac{${reducedDen}}{${reducedNum}}$.`
    };
  }
};
