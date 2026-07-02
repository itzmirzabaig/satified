import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1336
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 48°, 86°, 85°, 162° (specific values)]
 * - Difficulty factors: [Multiple triangle angle sums, supplementary angles, vertical angles, exterior angles]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [Points collinear on PV, lines intersect at W]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Complex intersecting lines diagram]
 */

export const generator_1336 = {
  metadata: {
    id: "1336",
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
      
      // STEP 1: Generate angles ensuring triangle angle sums work
      const angleSQX = getRandomInt(40, 60);
      const angleSXQ = getRandomInt(70, 90);
      const angleQSX = 180 - angleSQX - angleSXQ;
      
      const angleSWU = getRandomInt(75, 95);
      const angleSWR = 180 - angleSWU;
      
      const angleVTU = getRandomInt(150, 170);
      const angleSTU = 180 - angleVTU;
      
      // STEP 2: Calculate derived angles
      const angleWRS = 180 - angleQSX - angleSWR;
      const angleTUR = 180 - angleWRS - angleSTU;
      
      if (angleTUR > 0 && angleTUR < 180 && Number.isInteger(angleTUR)) {
        // STEP 3: Build Mafs code with randomized coordinates
        const qX = getRandomInt(2, 5);
        const sX = qX + getRandomInt(3, 5);
        const tX = sX + getRandomInt(3, 5);
        const uX = tX + getRandomInt(2, 4);
        const xX = (qX + sX) / 2 + getRandomInt(2, 4);
        const xY = getRandomInt(6, 10);
        const wX = (sX + xX) / 2;
        const wY = xY / 2;
        
        const _svg_0 = xY + 2; const _svg_1 = qX - 2; const _svg_2 = uX + 2;
        const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_1,xmax=_svg_2;
      const ymin=-2,ymax=_svg_0;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((_svg_2-(_svg_1))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.max(1,Math.ceil((_svg_0-(-2))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((qX))+'" y1="'+my(0)+'" x2="'+mx((uX))+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((qX))+'" y1="'+my(0)+'" x2="'+mx((xX))+'" y2="'+my((xY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((sX))+'" y1="'+my(0)+'" x2="'+mx((uX))+'" y2="'+my((xY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((uX))+'" y1="'+my((xY))+'" x2="'+mx((tX))+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((qX))+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">Q</text>';
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((sX))+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">R</text>';
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((tX))+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">S</text>';
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((uX))+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">T</text>';
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((xX))+'" y="'+my((xY + 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">X</text>';
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((uX))+'" y="'+my((xY + 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">U</text>';
    })()}${(() => {
      const xmin=(qX - 2),xmax=(uX + 2);
      const ymin=-2,ymax=(xY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((wX))+'" y="'+my((wY + 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">W</text>';
    })()}</svg></div>`;
        
        return {
          questionText: `In the figure shown, points $Q, R, S$, and $T$ lie on line segment $PV$, and line segment $RU$ intersects line segment $SX$ at point $W$. The measure of $\\\\angle SQX$ is $${angleSQX}^\\\\circ$, the measure of $\\\\angle SXQ$ is $${angleSXQ}^\\\\circ$, the measure of $\\\\angle SWU$ is $${angleSWU}^\\\\circ$, and the measure of $\\\\angle VTU$ is $${angleVTU}^\\\\circ$. What is the measure, in degrees, of $\\\\angle TUR$?`,
          figureCode: mafsCode,
          options: null,
          correctAnswer: Math.round(angleTUR).toString(),
          explanation: `In $\\\\triangle QSX$, $\\\\angle QSX = 180 - ${angleSQX} - ${angleSXQ} = ${angleQSX}^\\\\circ$. Since $\\\\angle SWU = ${angleSWU}^\\\\circ$, its supplement $\\\\angle SWR = ${angleSWR}^\\\\circ$. In $\\\\triangle RSW$, $\\\\angle WRS = 180 - ${angleQSX} - ${angleSWR} = ${angleWRS}^\\\\circ$. Given $\\\\angle VTU = ${angleVTU}^\\\\circ$, its supplement $\\\\angle STU = ${angleSTU}^\\\\circ$. In $\\\\triangle RTU$, $\\\\angle TUR = 180 - ${angleWRS} - ${angleSTU} = ${Math.round(angleTUR)}^\\\\circ$.`
        };
      }
    }
    
    // Fallback
    const angleSQX = 48;
    const angleSXQ = 86;
    const angleQSX = 46;
    const angleSWU = 85;
    const angleSWR = 95;
    const angleVTU = 162;
    const angleSTU = 18;
    const angleWRS = 41;
    const angleTUR = 121;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((18-(-2))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.max(1,Math.ceil((10-(-2))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0)+'" y1="'+my(0)+'" x2="'+mx(16)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(4)+'" y1="'+my(0)+'" x2="'+mx(12)+'" y2="'+my(8)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(8)+'" y1="'+my(0)+'" x2="'+mx(14)+'" y2="'+my(8)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(14)+'" y1="'+my(8)+'" x2="'+mx(16)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(4)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">Q</text>';
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(8)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">R</text>';
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(12)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">S</text>';
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(16)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">T</text>';
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(10)+'" y="'+my(8.5)+'" text-anchor="middle" font-size="13" fill="currentColor">X</text>';
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(14)+'" y="'+my(8.5)+'" text-anchor="middle" font-size="13" fill="currentColor">U</text>';
    })()}${(() => {
      const xmin=-2,xmax=18;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(11)+'" y="'+my(4)+'" text-anchor="middle" font-size="13" fill="currentColor">W</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `In the figure shown, points $Q, R, S$, and $T$ lie on line segment $PV$, and line segment $RU$ intersects line segment $SX$ at point $W$. The measure of $\\\\angle SQX$ is $${angleSQX}^\\\\circ$, the measure of $\\\\angle SXQ$ is $${angleSXQ}^\\\\circ$, the measure of $\\\\angle SWU$ is $${angleSWU}^\\\\circ$, and the measure of $\\\\angle VTU$ is $${angleVTU}^\\\\circ$. What is the measure, in degrees, of $\\\\angle TUR$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: angleTUR.toString(),
      explanation: `In $\\\\triangle QSX$, $\\\\angle QSX = 180 - ${angleSQX} - ${angleSXQ} = ${angleQSX}^\\\\circ$. Since $\\\\angle SWU = ${angleSWU}^\\\\circ$, its supplement $\\\\angle SWR = ${angleSWR}^\\\\circ$. In $\\\\triangle RSW$, $\\\\angle WRS = 180 - ${angleQSX} - ${angleSWR} = ${angleWRS}^\\\\circ$. Given $\\\\angle VTU = ${angleVTU}^\\\\circ$, its supplement $\\\\angle STU = ${angleSTU}^\\\\circ$. In $\\\\triangle RTU$, $\\\\angle TUR = 180 - ${angleWRS} - ${angleSTU} = ${angleTUR}^\\\\circ$.`
    };
  }
};
