import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1365
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hypotenuse: 26, sin ratio: 5/13 (Pythagorean triple 5-12-13 scaled)]
 * - Difficulty factors: [Trigonometric ratio application, Pythagorean theorem, finding non-hypotenuse side]
 * - Constraints: [Must use scaled 5-12-13 triangle, hypotenuse is 26 = 2×13]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with hypotenuse labeled]
 */

export const generator_1365 = {
  metadata: {
    id: "1365",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: sin(B) = 5/13, hypotenuse AB = 26
    // This is a 5-12-13 triangle scaled by 2
    // sin(B) = AC/AB = AC/26 = 5/13 → AC = 10
    // Then BC = sqrt(26² - 10²) = sqrt(676 - 100) = sqrt(576) = 24
    
    // Generate primitive triple and scale
    const primitiveTriples = [
      [3, 4, 5],
      [5, 12, 13],
      [8, 15, 17],
      [7, 24, 25]
    ];
    
    const triple = getRandomElement(primitiveTriples) as [number, number, number];
    const scaleFactor = getRandomInt(2, 5);
    
    const shorterLeg = triple[0] * scaleFactor;
    const longerLeg = triple[1] * scaleFactor;
    const hypotenuse = triple[2] * scaleFactor;
    
    // Use shorter leg as opposite side in sin ratio
    const numerator = triple[0];
    const denominator = triple[2];
    
    const _svg_0 = longerLeg + 5; const _svg_1 = hypotenuse + 5;
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
      const xmin=-2,xmax=(hypotenuse + 5);
      const ymin=-2,ymax=(longerLeg + 5);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-2,xmax=(hypotenuse + 5);
      const ymin=-2,ymax=(longerLeg + 5);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((longerLeg))+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-2,xmax=(hypotenuse + 5);
      const ymin=-2,ymax=(longerLeg + 5);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((longerLeg))+'" y="'+my((shorterLeg + 1))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=-2,xmax=(hypotenuse + 5);
      const ymin=-2,ymax=(longerLeg + 5);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((longerLeg / 2))+'" y="'+my((shorterLeg + 1))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${hypotenuse</text>';
    })()}</svg></div>`;

    return {
      questionText: `Triangle $ABC$ above is a right triangle, and $\\sin(B) = \\frac{${numerator}}{${denominator}}$. What is the length of side $\\overline{BC}$?`,
      figureCode: mafsCode,
      options: null, // Fill in the blank
      correctAnswer: longerLeg.toString(),
      explanation: `The sine of angle $B$ is the ratio of the opposite side ($AC$) to the hypotenuse ($AB$). Given $\\sin(B) = \\frac{${numerator}}{${denominator}}$ and $AB = ${hypotenuse}$, then $\\frac{AC}{${hypotenuse}} = \\frac{${numerator}}{${denominator}} \\implies AC = ${shorterLeg}$. By the Pythagorean theorem, $BC = \\sqrt{${hypotenuse}^2 - ${shorterLeg}^2} = \\sqrt{${hypotenuse * hypotenuse} - ${shorterLeg * shorterLeg}} = \\sqrt{${longerLeg * longerLeg}} = ${longerLeg}$.`
    };
  }
};
