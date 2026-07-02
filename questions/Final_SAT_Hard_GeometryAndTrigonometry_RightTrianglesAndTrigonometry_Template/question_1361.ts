import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1361
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter: 624, equilateral triangle circumscribed about circle]
 * - Difficulty factors: [Equilateral triangle height formula, solving for k in k√3]
 * - Constraints: [Height = (s/2)√3 where s is side length]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Equilateral triangle with height labeled k√3]
 */

export const generator_1361 = {
  metadata: {
    id: "1361",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: Perimeter = 624, side = 208, height = 104√3, so k = 104
    // Height of equilateral triangle = s√3/2 = (s/2)√3
    
    // Generate perimeter divisible by 6 for clean k value
    const k = getRandomInt(50, 150);
    const side = 2 * k;
    const perimeter = 3 * side;
    
    const height = k * Math.sqrt(3);
    
    const _svg_0 = height + 20; const _svg_1 = side + 20;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-10,xmax=_svg_1;
      const ymin=-10,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-10,xmax=(side + 20);
      const ymin=-10,ymax=(height + 20);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((side / 2))+'" y1="'+my(0)+'" x2="'+mx((side / 2))+'" y2="'+my((height))+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=-10,xmax=(side + 20);
      const ymin=-10,ymax=(height + 20);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((side / 2))+'" y="'+my((height + 5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">ksqrt{3</text>';
    })()}${(() => {
      const xmin=-10,xmax=(side + 20);
      const ymin=-10,ymax=(height + 20);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((side / 2))+'" y="'+my(-8)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${side</text>';
    })()}</svg></div>`;

    return {
      questionText: `The perimeter of an equilateral triangle is ${perimeter} centimeters. The height of this triangle is $k \\\\sqrt{3}$ centimeters, where $k$ is a constant. What is the value of $k$?`,
      figureCode: mafsCode,
      options: null, // Fill in the blank
      correctAnswer: k.toString(),
      explanation: `Perimeter is ${perimeter}, so each side is $${perimeter}/3 = ${side}$ cm. The height of an equilateral triangle is $\\\\frac{s}{2}\\\\sqrt{3}$. Here, height $= \\\\frac{${side}}{2}\\\\sqrt{3} = ${k}\\\\sqrt{3}$. Thus, $k = ${k}$.`
    };
  }
};
