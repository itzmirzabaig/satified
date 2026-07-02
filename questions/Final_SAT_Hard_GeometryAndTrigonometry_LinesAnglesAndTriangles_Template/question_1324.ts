import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question 1324
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [lengths: YQ=63, WQ=70, WX=60, XQ=120 (specific values), answer: 54]
 * - Difficulty factors: [Similar triangles, proportional reasoning, AA similarity]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [Similar triangles WQX and YQZ with vertical angles at Q]
 * - Question type: [Figure→Fill in the blank]
 */

export const generator_1324 = {
  metadata: {
    id: "1324",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
      attempts++;
      
      const ratioNum = getRandomInt(3, 9);
      const ratioDen = getRandomInt(ratioNum + 1, 12);
      
      const WX = getRandomInt(40, 80);
      const YZ = (WX * ratioNum) / ratioDen;
      
      if ((Number.isInteger(YZ) || (YZ * 10) % 1 === 0) && YZ > 0) {
        const WQ = getRandomInt(50, 90);
        const YQ = (WQ * ratioNum) / ratioDen;
        const XQ = getRandomInt(WX + 20, WX + 80);
        
        // STEP 2: Build Mafs code with randomized coordinates
        const wX = 0;
        const wY = getRandomInt(4, 8);
        const xX = getRandomInt(2, 4);
        const xY = 0;
        const qX = (wX + xX) / 2 + getRandomInt(0, 2);
        const qY = (wY + xY) / 2;
        const zX = qX + (qX - wX) * (ratioDen / ratioNum);
        const zY = qY + (qY - wY) * (ratioDen / ratioNum);
        const yX = zX + (xX - wX);
        const yY = zY + (xY - wY);
        
        const _svg_0 = Math.max(wY-((-2); const _svg_1 = Math.min(wX))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';; const _svg_2 = Math.max(wY;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((yX) - 2; const _svg_3 = -2; const _svg_4 = Math.min(wX,xmax=yX) - 2;
        const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_4;
      const ymin=_svg_3,ymax=_svg_2-(_svg_1
      const ystep=Math.max(1,Math.ceil((_svg_0))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=(Math.min(wX,xmax=yX) - 2);
      const ymin=(-2),ymax=(Math.max(wY;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((wX))+'" y1="'+my((wY))+'" x2="'+mx((yX))+'" y2="'+my((yY))+'" stroke="currentColor" stroke-width="2.5"/>';
    ))()}((() => {
      const xmin=(Math.min(wX,xmax=yX) - 2);
      const ymin=(-2),ymax=(Math.max(wY;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((xX))+'" y1="'+my((xY))+'" x2="'+mx((qX))+'" y2="'+my((qY))+'" stroke="currentColor" stroke-width="2.5"/>';
    ))()}((() => {
      const xmin=(Math.min(wX,xmax=yX) - 2);
      const ymin=(-2),ymax=(Math.max(wY;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((zX))+'" y1="'+my((zY))+'" x2="'+mx((xX))+'" y2="'+my((xY))+'" stroke="currentColor" stroke-width="2.5"/>';
    ))()}((() => {
      const xmin=(Math.min(wX,xmax=yX) - 2);
      const ymin=(-2),ymax=(Math.max(wY;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((qX))+'" y1="'+my((qY))+'" x2="'+mx((zX))+'" y2="'+my((zY))+'" stroke="currentColor" stroke-width="2.5"/>';
    ))()}((() => {
      const xmin=(Math.min(wX,xmax=yX) - 2);
      const ymin=(-2),ymax=(Math.max(wY;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((wX - 0.5))+'" y="'+my((wY))+'" text-anchor="middle" font-size="13" fill="currentColor">W</text>';
    ))()}((() => {
      const xmin=(Math.min(wX,xmax=yX) - 2);
      const ymin=(-2),ymax=(Math.max(wY;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((xX))+'" y="'+my((xY - 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">X</text>';
    ))()}((() => {
      const xmin=(Math.min(wX,xmax=yX) - 2);
      const ymin=(-2),ymax=(Math.max(wY;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((qX))+'" y="'+my((qY + 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">Q</text>';
    ))()}((() => {
      const xmin=(Math.min(wX,xmax=yX) - 2);
      const ymin=(-2),ymax=(Math.max(wY;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((zX))+'" y="'+my((zY + 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">Z</text>';
    ))()}((() => {
      const xmin=(Math.min(wX,xmax=yX) - 2);
      const ymin=(-2),ymax=(Math.max(wY;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((yX))+'" y="'+my((yY - 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">Y</text>';
    ))()}))))))))}</svg></div>`;
        
        return {
          questionText: `In the figure shown, $\\\\overline{WZ}$ and $\\\\overline{XY}$ intersect at point $Q$. $YQ = ${Math.round(YQ)}$, $WQ = ${WQ}$, $WX = ${WX}$, and $XQ = ${XQ}$. What is the length of $\\\\overline{YZ}$?`,
          figureCode: mafsCode,
          options: null,
          correctAnswer: Number.isInteger(YZ) ? YZ.toString() : YZ.toFixed(1),
          explanation: `Triangles $WQX$ and $YQZ$ are similar by AA similarity (vertical angles at $Q$ and given congruent angles at $W$ and $Y$). The ratio of corresponding sides is $\\\\frac{YZ}{WX} = \\\\frac{YQ}{WQ}$. Substituting values: $\\\\frac{YZ}{${WX}} = \\\\frac{${Math.round(YQ)}}{${WQ}}$, which yields $YZ = ${Number.isInteger(YZ) ? YZ : YZ.toFixed(1)}$.`
        };
      }
    }
    
    // Fallback
    const WX = 60;
    const YQ = 63;
    const WQ = 70;
    const XQ = 120;
    const YZ = 54;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=10;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((10-(-2))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.max(1,Math.ceil((8-(-2))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-2,xmax=10;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0)+'" y1="'+my(6)+'" x2="'+mx(8)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=10;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0)+'" y1="'+my(0)+'" x2="'+mx(3)+'" y2="'+my(6)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=10;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(3)+'" y1="'+my(0)+'" x2="'+mx(0)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=10;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(3)+'" y1="'+my(6)+'" x2="'+mx(8)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=10;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-0.5)+'" y="'+my(6)+'" text-anchor="middle" font-size="13" fill="currentColor">W</text>';
    })()}${(() => {
      const xmin=-2,xmax=10;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-0.5)+'" y="'+my(0)+'" text-anchor="middle" font-size="13" fill="currentColor">X</text>';
    })()}${(() => {
      const xmin=-2,xmax=10;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(3.5)+'" y="'+my(3.5)+'" text-anchor="middle" font-size="13" fill="currentColor">Q</text>';
    })()}${(() => {
      const xmin=-2,xmax=10;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(8.5)+'" y="'+my(6)+'" text-anchor="middle" font-size="13" fill="currentColor">Z</text>';
    })()}${(() => {
      const xmin=-2,xmax=10;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(8.5)+'" y="'+my(0)+'" text-anchor="middle" font-size="13" fill="currentColor">Y</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `In the figure shown, $\\\\overline{WZ}$ and $\\\\overline{XY}$ intersect at point $Q$. $YQ = ${YQ}$, $WQ = ${WQ}$, $WX = ${WX}$, and $XQ = ${XQ}$. What is the length of $\\\\overline{YZ}$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: YZ.toString(),
      explanation: `Triangles $WQX$ and $YQZ$ are similar by AA similarity (vertical angles at $Q$ and given congruent angles at $W$ and $Y$). The ratio of corresponding sides is $\\\\frac{YZ}{WX} = \\\\frac{YQ}{WQ}$. Substituting values: $\\\\frac{YZ}{${WX}} = \\\\frac{${YQ}}{${WQ}}$, which yields $YZ = ${YZ}$.`
    };
  }
};

/**
 * Question 1324
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 27°, 41° (specific values)]
 * - Difficulty factors: [Triangle congruence theorems, ASA postulate]
 * - Distractor patterns: [A: AAA similarity confusion, B: Wrong side information, D: Overlooking need for side length]
 * - Constraints: [Two pairs of congruent angles given, need included side for ASA]
 * - Question type: [Text→Multiple Choice]
 */

// File: generators/lines-angles-and-triangles/901c3215.ts