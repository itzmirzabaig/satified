import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c6dff223
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2.9, tan(A) = 21/20]
 * - Difficulty factors: [Similar triangles, tangent to sine conversion, Pythagorean triple]
 * - Constraints: [tan(A) = 21/20 implies 21-20-29 triangle]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with labeled sides]
 */

export const generator_c6dff223 = {
  metadata: {
    // id: "c6dff223",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: tan(A) = 21/20, so triangle is 21-20-29
    // sin(A) = 21/29
    // Since A corresponds to D, sin(D) = 21/29
    
    // Generate Pythagorean triple where legs are close in value
    const triples = [
      [20, 21, 29],
      [12, 35, 37],
      [11, 60, 61],
      [13, 84, 85]
    ];
    
    const triple = getRandomElement(triples) as [number, number, number];
    const opposite = triple[0];
    const adjacent = triple[1];
    const hypotenuse = triple[2];
    
    const _svg_0 = opposite + 5; const _svg_1 = adjacent + 5;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-5,xmax=_svg_1;
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
      const xmin=-5,xmax=${adjacent + 5};
      const ymin=-5,ymax=${opposite + 5};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-2)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">D</text>';
    })()}${(() => {
      const xmin=-5,xmax=${adjacent + 5};
      const ymin=-5,ymax=${opposite + 5};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${adjacent})+'" y="'+my(-2)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">F</text>';
    })()}${(() => {
      const xmin=-5,xmax=${adjacent + 5};
      const ymin=-5,ymax=${opposite + 5};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${adjacent})+'" y="'+my(${opposite + 2})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">E</text>';
    })()}</svg></div>`;

    // Reduce fraction
    const gcd = getGCD(opposite, hypotenuse);
    const reducedNum = opposite / gcd;
    const reducedDen = hypotenuse / gcd;

    return {
      questionText: `Triangle $ABC$ is similar to triangle $DEF$, where $A$ corresponds to $D$ and $C$ corresponds to $F$. Angles $C$ and $F$ are right angles. If $\\\\tan(A) = \\\\frac{${opposite}}{${adjacent}}$, what is the value of $\\\\sin D$?`,
      figureCode: mafsCode,
      options: null, // Fill in the blank
      correctAnswer: `\\\\frac{${reducedNum}}{${reducedDen}}`,
      explanation: `Since $\\\\triangle ABC \\\\sim \\\\triangle DEF$, $\\\\tan D = \\\\tan A = \\\\frac{${opposite}}{${adjacent}}$. In right triangle $DEF$, let opposite leg be ${opposite} and adjacent leg be ${adjacent}. Hypotenuse $= \\\\sqrt{${opposite}^2 + ${adjacent}^2} = ${hypotenuse}$. Then $\\\\sin D = \\\\frac{${opposite}}{${hypotenuse}} = \\\\frac{${reducedNum}}{${reducedDen}}$.`
    };
  }
};

/**
 * Question ID: 92eb236a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan = √3/3]
 * - Difficulty factors: [Complementary angles in right triangle, reciprocal relationship of tangents]
 * - Constraints: [tan(A) × tan(90°-A) = 1, tan(30°) = 1/√3 = √3/3]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with acute angles labeled]
 */