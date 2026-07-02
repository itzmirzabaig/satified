import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1bf809b5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [adjacent leg: 11, hypotenuse: 28, cos(x°) = 11/28]
 * - Difficulty factors: [Basic cosine ratio, identifying adjacent side and hypotenuse]
 * - Constraints: [cos = adjacent/hypotenuse]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with sides labeled]
 */

export const generator_1bf809b5 = {
  metadata: {
    // id: "1bf809b5",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: adjacent = 11, hypotenuse = 28, so cos(x°) = 11/28
    // The opposite side would be √(28² - 11²) = √(784 - 121) = √663
    
    const hypotenuse = getRandomInt(15, 30);
    const adjacent = getRandomInt(5, hypotenuse - 5);
    const opposite = Math.sqrt(hypotenuse * hypotenuse - adjacent * adjacent);
    
    const _svg_0 = adjacent + 2; const _svg_1 = opposite + 2;
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
      const xmin=-2,xmax=${opposite + 2};
      const ymin=-2,ymax=${adjacent + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<circle cx="'+mx(0)+'" cy="'+my(0)+'" r="4" fill="currentColor"/>';
    })()}${(() => {
      const xmin=-2,xmax=${opposite + 2};
      const ymin=-2,ymax=${adjacent + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<circle cx="'+mx(0)+'" cy="'+my(${adjacent)+'" r="4" fill="currentColor"/>';
    })()}</svg></div>`;

    // Reduce fraction if possible
    const gcd = getGCD(adjacent, hypotenuse);
    const reducedNum = adjacent / gcd;
    const reducedDen = hypotenuse / gcd;

    return {
      questionText: `In the triangle shown, what is the value of $\\cos x^{\\\\circ}$?`,
      figureCode: mafsCode,
      options: null, // Fill in the blank
      correctAnswer: `\\\\frac{${reducedNum}}{${reducedDen}}`,
      explanation: `The cosine of an acute angle in a right triangle is defined as the ratio of the length of the leg adjacent to the angle to the length of the hypotenuse. In the triangle shown, the length of the leg adjacent to the angle with measure $x^{\\\\circ}$ is ${adjacent} units and the length of the hypotenuse is ${hypotenuse} units. Therefore, the value of $\\\\cos x^{\\\\circ}$ is $\\\\frac{${reducedNum}}{${reducedDen}}$.`
    };
  }
};

/**
 * Question ID: 14e7c1f4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Q = x+61, R = 4x+4]
 * - Difficulty factors: [Cofunction identity, complementary angles, solving linear equation]
 * - Constraints: [cos(Q) = sin(R) implies Q + R = 90°]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: null
 */