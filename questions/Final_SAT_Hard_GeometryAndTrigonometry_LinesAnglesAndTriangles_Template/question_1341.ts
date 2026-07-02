import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1341
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 106°, 23° (specific values), answer: 97°]
 * - Difficulty factors: [Exterior angle theorem, supplementary angles]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [Three intersecting lines forming triangles]
 * - Question type: [Figure→Fill in the blank]
 */

export const generator_1341 = {
  metadata: {
    id: "1341",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate angles
    const exteriorAngle = getRandomInt(95, 115);
    const smallAngle = getRandomInt(20, 30);
    
    // STEP 2: Calculate
    const interiorAngle = 180 - exteriorAngle;
    const x = smallAngle + interiorAngle;
    
    // STEP 3: Build Mafs code with randomized coordinates
    const baseY = 0;
    const leftX = -getRandomInt(3, 5);
    const rightX = getRandomInt(3, 5);
    const topX = -getRandomInt(2, 4);
    const topY = getRandomInt(3, 5);
    const intersectX = -getRandomInt(1, 3);
    const intersectY = getRandomInt(1, 3);
    
    const _svg_0 = baseY - 1; const _svg_1 = topY + 1; const _svg_2 = leftX - 1; const _svg_3 = rightX + 1;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_2,xmax=_svg_3;
      const ymin=_svg_0,ymax=_svg_1;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((_svg_3-(_svg_2))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.max(1,Math.ceil((_svg_1-(_svg_0))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=(leftX - 1),xmax=(rightX + 1);
      const ymin=(baseY - 1),ymax=(topY + 1);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((leftX))+'" y1="'+my((baseY))+'" x2="'+mx((rightX))+'" y2="'+my((baseY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(leftX - 1),xmax=(rightX + 1);
      const ymin=(baseY - 1),ymax=(topY + 1);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0)+'" y1="'+my((baseY))+'" x2="'+mx((topX))+'" y2="'+my((topY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(leftX - 1),xmax=(rightX + 1);
      const ymin=(baseY - 1),ymax=(topY + 1);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((intersectX))+'" y1="'+my((baseY - 1))+'" x2="'+mx((intersectX))+'" y2="'+my((topY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(leftX - 1),xmax=(rightX + 1);
      const ymin=(baseY - 1),ymax=(topY + 1);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((rightX - 1))+'" y="'+my((baseY + 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">$exteriorAngle^circ</text>';
    })()}${(() => {
      const xmin=(leftX - 1),xmax=(rightX + 1);
      const ymin=(baseY - 1),ymax=(topY + 1);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((intersectX + 0.5))+'" y="'+my((baseY + 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">$smallAngle^circ</text>';
    })()}${(() => {
      const xmin=(leftX - 1),xmax=(rightX + 1);
      const ymin=(baseY - 1),ymax=(topY + 1);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((topX - 0.5))+'" y="'+my((topY / 2))+'" text-anchor="middle" font-size="13" fill="currentColor">x^circ</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `Intersecting lines r, s, and t are shown. The measure of one angle is $${exteriorAngle}^\\\\circ$ and the measure of another angle is $${smallAngle}^\\\\circ$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: x.toString(),
      explanation: `The exterior angle is $${exteriorAngle}^\\\\circ$, so the adjacent interior angle is $180 - ${exteriorAngle} = ${interiorAngle}^\\\\circ$. The value of $x$, being the exterior angle of the non-adjacent interior angles, is $${smallAngle} + ${interiorAngle} = ${x}$.`
    };
  }
};
