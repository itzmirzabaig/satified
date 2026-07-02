import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1329
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 45°, 104° (specific values), answer: 83°]
 * - Difficulty factors: [Isosceles triangle properties, exterior angles, supplementary angles, multi-step reasoning]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [AC = CD creates isosceles triangle, angle chasing required]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Geometric diagram with points A, B, C, D, E]
 */

export const generator_1329 = {
  metadata: {
    id: "1329",
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
      
      // STEP 1: Generate base angles ensuring valid geometry
      // angleACD is the vertex angle of isosceles triangle (must allow two equal base angles)
      // Base angles = (180 - vertex)/2 must be positive, so vertex < 180
      const angleACD = getRandomInt(100, 140);
      const angleEBC = getRandomInt(30, 60);
      
      // STEP 2: Calculate derived angles
      // Triangle ACD is isosceles with AC = CD
      const baseAngleACD = (180 - angleACD) / 2;
      
      // In triangle BDE: angle EBC = angleEBC, angle BDE = baseAngleACD (same angle)
      // angle DEB = 180 - angleEBC - baseAngleACD
      const angleDEB = 180 - angleEBC - baseAngleACD;
      
      // x is supplementary to angleDEB
      const x = 180 - angleDEB;
      
      // STEP 3: Verify x is a reasonable integer (SAT answers are usually integers)
      if (Number.isInteger(x) && x > 0 && x < 180) {
        // STEP 4: Build Mafs code for the figure with randomized coordinates
        const cX = getRandomInt(2, 4);
        const cY = getRandomInt(2, 4);
        const aX = cX - getRandomInt(2, 4);
        const dX = cX + getRandomInt(4, 8);
        const eX = dX + getRandomInt(2, 4);
        const bX = cX + getRandomInt(2, 5);
        const bY = cY - getRandomInt(1, 3);
        
        const _svg_0 = bY - 2; const _svg_1 = cY + 2; const _svg_2 = aX - 2; const _svg_3 = eX + 2;
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
      const ymin=(bY - 2),ymax=(cY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((cX))+'" y1="'+my((cY))+'" x2="'+mx((eX))+'" y2="'+my((bY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(bY - 2),ymax=(cY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((aX))+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(bY - 2),ymax=(cY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((cX))+'" y="'+my((cY + 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(bY - 2),ymax=(cY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((dX))+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">D</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(bY - 2),ymax=(cY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((eX))+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">E</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(bY - 2),ymax=(cY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((bX))+'" y="'+my((bY + 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(eX + 2);
      const ymin=(bY - 2),ymax=(cY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((eX - 1))+'" y="'+my((bY + 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">x^circ</text>';
    })()}</svg></div>`;
        
        // STEP 5: Return question data (fill in the blank)
        return {
          questionText: `In the figure, $AC = CD$. The measure of angle $EBC$ is $${angleEBC}^\\\\circ$, and the measure of angle $ACD$ is $${angleACD}^\\\\circ$. What is the value of $x$?`,
          figureCode: mafsCode,
          options: null,
          correctAnswer: Math.round(x).toString(),
          explanation: `Since $AC = CD$, triangle $ACD$ is isosceles with $\\\\angle CAD = \\\\angle CDA$. The sum of angles in $\\\\triangle ACD$ is $180^\\\\circ$, so $${angleACD} + 2(\\\\angle CDA) = 180$, yielding $\\\\angle CDA = ${baseAngleACD}^\\\\circ$. In $\\\\triangle BDE$, $\\\\angle EBC = ${angleEBC}^\\\\circ$ and $\\\\angle BDE = ${baseAngleACD}^\\\\circ$. Thus, $\\\\angle DEB = 180 - ${angleEBC} - ${baseAngleACD} = ${angleDEB}^\\\\circ$. Since $\\\\angle DEB$ and $x$ are supplementary, $x = 180 - ${angleDEB} = ${Math.round(x)}$.`
        };
      }
    }
    
    // Fallback with guaranteed valid values
    const angleACD = 104;
    const angleEBC = 45;
    const baseAngleACD = 38;
    const angleDEB = 97;
    const x = 83;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=12;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((12-(-2))/8));
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
      const xmin=-2,xmax=12;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(2)+'" y1="'+my(3)+'" x2="'+mx(10)+'" y2="'+my(2)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=12;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=-2,xmax=12;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(2)+'" y="'+my(3.5)+'" text-anchor="middle" font-size="13" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-2,xmax=12;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(8)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">D</text>';
    })()}${(() => {
      const xmin=-2,xmax=12;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(10)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">E</text>';
    })()}${(() => {
      const xmin=-2,xmax=12;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(6)+'" y="'+my(2.5)+'" text-anchor="middle" font-size="13" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-2,xmax=12;
      const ymin=-2,ymax=8;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(9)+'" y="'+my(1)+'" text-anchor="middle" font-size="13" fill="currentColor">x^circ</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `In the figure, $AC = CD$. The measure of angle $EBC$ is $${angleEBC}^\\\\circ$, and the measure of angle $ACD$ is $${angleACD}^\\\\circ$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: x.toString(),
      explanation: `Since $AC = CD$, triangle $ACD$ is isosceles with $\\\\angle CAD = \\\\angle CDA$. The sum of angles in $\\\\triangle ACD$ is $180^\\\\circ$, so $${angleACD} + 2(\\\\angle CDA) = 180$, yielding $\\\\angle CDA = ${baseAngleACD}^\\\\circ$. In $\\\\triangle BDE$, $\\\\angle EBC = ${angleEBC}^\\\\circ$ and $\\\\angle BDE = ${baseAngleACD}^\\\\circ$. Thus, $\\\\angle DEB = 180 - ${angleEBC} - ${baseAngleACD} = ${angleDEB}^\\\\circ$. Since $\\\\angle DEB$ and $x$ are supplementary, $x = 180 - ${angleDEB} = ${x}.`
    };
  }
};
