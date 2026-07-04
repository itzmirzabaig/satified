import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1328
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AB=√34, AC=3, CE=21, answer: 480]
 * - Difficulty factors: [Similar triangles, Pythagorean theorem, area formula]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [Similar triangles ABC and ADE, BC is height]
 * - Question type: [Figure→Fill in the blank]
 */

export const generator_1328 = {
  metadata: {
    id: "1328",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values based on Pythagorean triple
    const scale = getRandomInt(1, 3);
    const AC = 3 * scale;
    const BC = 5 * scale;
    const AB_sq = AC * AC + BC * BC;
    
    // CE should make AE = AC + CE give nice ratio
    const CE = 21 * scale;
    
    // STEP 2: Calculate
    const AE = AC + CE;
    const ratio = AE / AC;
    const DE = BC * ratio;
    const area = 0.5 * AE * DE;
    
    if (Number.isInteger(area)) {
      // STEP 3: Build Mafs code with randomized coordinates
      const aX = 0;
      const aY = 0;
      const eX = AE + getRandomInt(1, 4);
      const eY = 0;
      const dX = eX;
      const dY = Math.round(DE) + getRandomInt(1, 4);
      const cX = AC;
      const cY = 0;
      const bX = cX;
      const bY = BC;
      
      const _svg_0 = aY - 2; const _svg_1 = dY + 2; const _svg_2 = aX - 2; const _svg_3 = eX + 2;
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
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(aY - 2),ymax=(dY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((aX))+'" y1="'+my((aY))+'" x2="'+mx((eX + 2))+'" y2="'+my((aY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(aY - 2),ymax=(dY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((aX))+'" y1="'+my((aY))+'" x2="'+mx((eX + 2))+'" y2="'+my((dY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(aY - 2),ymax=(dY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((eX))+'" y1="'+my((aY))+'" x2="'+mx((eX))+'" y2="'+my((dY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(aY - 2),ymax=(dY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((cX))+'" y1="'+my((aY))+'" x2="'+mx((cX))+'" y2="'+my((bY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(aY - 2),ymax=(dY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((aX))+'" y="'+my((aY - 1))+'" text-anchor="middle" font-size="13" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(aY - 2),ymax=(dY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((cX))+'" y="'+my((aY - 1))+'" text-anchor="middle" font-size="13" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(aY - 2),ymax=(dY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((eX))+'" y="'+my((aY - 1))+'" text-anchor="middle" font-size="13" fill="currentColor">E</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(aY - 2),ymax=(dY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((cX + 1))+'" y="'+my((bY / 2))+'" text-anchor="middle" font-size="13" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(aY - 2),ymax=(dY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((eX + 1))+'" y="'+my((Math.round(DE) / 2 + 1))+'" text-anchor="middle" font-size="13" fill="currentColor">D</text>';
    })()}</svg></div>`;
      
      return {
        questionText: `In the figure shown, $AB=\\sqrt{${AB_sq}}$, $AC=${AC}$, and $CE=${CE}$. What is the area, in square units, of triangle $ADE$?`,
        figureCode: mafsCode,
        options: [],
        correctAnswer: Math.round(area).toString(),
        explanation: `Triangles $ABC$ and $ADE$ are similar. $AE = AC + CE = ${AC} + ${CE} = ${AE}$. Similarity ratio $\\frac{AE}{AC} = \\frac{${AE}}{${AC}} = ${ratio}$. By Pythagorean theorem, $BC = \\sqrt{(${AB_sq}) - ${AC}^2} = ${BC}$. Height $DE = ${ratio} \\times ${BC} = ${DE}$. Area $= 0.5 \\times ${AE} \\times ${DE} = ${Math.round(area)}$.`
      };
    }
    
    // Fallback
    const fallbackScale = 1;
    const fallbackAC = 3;
    const fallbackBC = 5;
    const fallbackAB_sq = 34;
    const fallbackCE = 21;
    const fallbackAE = 24;
    const fallbackRatio = 8;
    const fallbackDE = 40;
    const fallbackArea = 480;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=26;
      const ymin=-2,ymax=22;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((26-(-2))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.max(1,Math.ceil((22-(-2))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-2,xmax=26;
      const ymin=-2,ymax=22;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0)+'" y1="'+my(0)+'" x2="'+mx(26)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=26;
      const ymin=-2,ymax=22;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0)+'" y1="'+my(0)+'" x2="'+mx(26)+'" y2="'+my(42)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=26;
      const ymin=-2,ymax=22;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(24)+'" y1="'+my(0)+'" x2="'+mx(24)+'" y2="'+my(42)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=26;
      const ymin=-2,ymax=22;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(3)+'" y1="'+my(0)+'" x2="'+mx(3)+'" y2="'+my(5)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=26;
      const ymin=-2,ymax=22;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=-2,xmax=26;
      const ymin=-2,ymax=22;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(3)+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-2,xmax=26;
      const ymin=-2,ymax=22;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(24)+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" fill="currentColor">E</text>';
    })()}${(() => {
      const xmin=-2,xmax=26;
      const ymin=-2,ymax=22;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(4)+'" y="'+my(2.5)+'" text-anchor="middle" font-size="13" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-2,xmax=26;
      const ymin=-2,ymax=22;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(25)+'" y="'+my(21)+'" text-anchor="middle" font-size="13" fill="currentColor">D</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `In the figure shown, $AB=\\sqrt{${fallbackAB_sq}}$, $AC=${fallbackAC}$, and $CE=${fallbackCE}$. What is the area, in square units, of triangle $ADE$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: fallbackArea.toString(),
      explanation: `Triangles $ABC$ and $ADE$ are similar. $AE = AC + CE = ${fallbackAC} + ${fallbackCE} = ${fallbackAE}$. Similarity ratio $\\frac{AE}{AC} = \\frac{${fallbackAE}}{${fallbackAC}} = ${fallbackRatio}$. By Pythagorean theorem, $BC = \\sqrt{(${fallbackAB_sq}) - ${fallbackAC}^2} = ${fallbackBC}$. Height $DE = ${fallbackRatio} \\times ${fallbackBC} = ${fallbackDE}$. Area $= 0.5 \\times ${fallbackAE} \\times ${fallbackDE} = ${fallbackArea}$.`
    };
  }
};
