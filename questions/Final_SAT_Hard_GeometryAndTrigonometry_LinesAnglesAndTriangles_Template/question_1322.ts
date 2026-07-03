import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1322
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a=43, b=122, answer: 50.5]
 * - Difficulty factors: [Parallel lines, triangle angles, supplementary angles]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [g || t, angles a and b given, find w]
 * - Question type: [Figure→Fill in the blank]
 */

export const generator_1322 = {
  metadata: {
    id: "1322",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate angles
    const a = getRandomInt(35, 55);
    const b = getRandomInt(110, 130);
    
    // STEP 2: Calculate
    const thirdAngle = b - a;
    const w = (180 - thirdAngle) / 2;
    
    if (Number.isInteger(w) || (w * 10) % 1 === 0) {
      // STEP 3: Build Mafs code with randomized coordinates
      const y1 = getRandomInt(8, 15);
      const y2 = 0;
      const leftX = -getRandomInt(2, 4);
      const rightX = getRandomInt(8, 12);
      const offset = getRandomInt(2, 5);
      
      const _svg_0 = y2 - 2; const _svg_1 = y1 + 2; const _svg_2 = leftX - 2; const _svg_3 = rightX + 2;
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
      const xmin=(leftX - 2),xmax=(rightX + 2);
      const ymin=(y2 - 2),ymax=(y1 + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((leftX))+'" y1="'+my((y1))+'" x2="'+mx((leftX + 4))+'" y2="'+my((y1 + 6))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(leftX - 2),xmax=(rightX + 2);
      const ymin=(y2 - 2),ymax=(y1 + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((leftX))+'" y1="'+my((y2))+'" x2="'+mx((rightX))+'" y2="'+my((y1 + 2))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(leftX - 2),xmax=(rightX + 2);
      const ymin=(y2 - 2),ymax=(y1 + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((leftX + offset))+'" y1="'+my((y2))+'" x2="'+mx((leftX + offset + 2))+'" y2="'+my((y1 + 6))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(leftX - 2),xmax=(rightX + 2);
      const ymin=(y2 - 2),ymax=(y1 + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((rightX + 2))+'" y1="'+my((y2))+'" x2="'+mx((rightX - 2))+'" y2="'+my((y1 + 6))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}</svg></div>`;
      
      return {
        questionText: `In the figure, parallel lines $g$ and $t$ are intersected by lines $r$ and $s$. If $a=${a}$ and $b=${b}$, what is the value of $w$?`,
        figureCode: mafsCode,
        options: [],
        correctAnswer: Number.isInteger(w) ? w.toString() : w.toFixed(1),
        explanation: `Angles in the triangle formed by intersections are $${a}$, $${180 - b}$, and $${thirdAngle}$. Angle $${thirdAngle}$ is supplementary to two angles of measure $w$ on the parallel line: $${thirdAngle} + 2w = 180$, which gives $w = ${Number.isInteger(w) ? w : w.toFixed(1)}$.`
      };
    }
    
    // Fallback
    const fallbackA = 43;
    const fallbackB = 122;
    const fallbackThirdAngle = 79;
    const fallbackW = 50.5;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-5,xmax=15;
      const ymin=-5,ymax=15;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((15-(-5))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.max(1,Math.ceil((15-(-5))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-5,xmax=15;
      const ymin=-5,ymax=15;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(-2)+'" y1="'+my(8)+'" x2="'+mx(2)+'" y2="'+my(14)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-5,xmax=15;
      const ymin=-5,ymax=15;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(-2)+'" y1="'+my(0)+'" x2="'+mx(10)+'" y2="'+my(14)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-5,xmax=15;
      const ymin=-5,ymax=15;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0)+'" y1="'+my(0)+'" x2="'+mx(2)+'" y2="'+my(14)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-5,xmax=15;
      const ymin=-5,ymax=15;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(14)+'" y1="'+my(0)+'" x2="'+mx(10)+'" y2="'+my(14)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}</svg></div>`;
    
    return {
      questionText: `In the figure, parallel lines $g$ and $t$ are intersected by lines $r$ and $s$. If $a=${fallbackA}$ and $b=${fallbackB}$, what is the value of $w$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: fallbackW.toString(),
      explanation: `Angles in the triangle formed by intersections are $${fallbackA}$, $${180 - fallbackB}$, and $${fallbackThirdAngle}$. Angle $${fallbackThirdAngle}$ is supplementary to two angles of measure $w$ on the parallel line: $${fallbackThirdAngle} + 2w = 180$, which gives $w = ${fallbackW}$.`
    };
  }
};
