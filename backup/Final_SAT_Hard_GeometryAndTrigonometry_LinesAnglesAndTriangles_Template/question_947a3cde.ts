import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 947a3cde
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle given: 60° (specific), answer: 30°]
 * - Difficulty factors: [Isosceles triangles, vertical angles, supplementary angles]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [NP = QP and MP = PR create two isosceles triangles]
 * - Question type: [Figure→Fill in the blank]
 */

export const generator_947a3cde = {
  metadata: {
    // id: "947a3cde",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate vertex angle
    const angleQPR = getRandomInt(50, 70);
    const angleMPR = 180 - angleQPR;
    
    // STEP 2: Calculate
    const baseAngleMPR = (180 - angleMPR) / 2;
    
    // STEP 3: Build Mafs code with randomized coordinates
    const size = getRandomInt(3, 5);
    const offset = getRandomInt(1, 3);
    
    const _svg_0 = -size - 1; const _svg_1 = size + 1;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_0,xmax=_svg_1;
      const ymin=_svg_0,ymax=_svg_1;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((_svg_1-(_svg_0))/8));
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
      const xmin=${-size - 1},xmax=${size + 1};
      const ymin=${-size - 1},ymax=${size + 1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${-size})+'" y1="'+my(${size})+'" x2="'+mx(${size})+'" y2="'+my(${-size})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=${-size - 1},xmax=${size + 1};
      const ymin=${-size - 1},ymax=${size + 1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${-size})+'" y1="'+my(${-size})+'" x2="'+mx(${size})+'" y2="'+my(${size})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=${-size - 1},xmax=${size + 1};
      const ymin=${-size - 1},ymax=${size + 1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${-size})+'" y1="'+my(${size})+'" x2="'+mx(${-size})+'" y2="'+my(${-size})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=${-size - 1},xmax=${size + 1};
      const ymin=${-size - 1},ymax=${size + 1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${-size - 0.5})+'" y="'+my(${size})+'" text-anchor="middle" font-size="13" fill="currentColor">N</text>';
    })()}${(() => {
      const xmin=${-size - 1},xmax=${size + 1};
      const ymin=${-size - 1},ymax=${size + 1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${size + 0.5})+'" y="'+my(${size})+'" text-anchor="middle" font-size="13" fill="currentColor">M</text>';
    })()}${(() => {
      const xmin=${-size - 1},xmax=${size + 1};
      const ymin=${-size - 1},ymax=${size + 1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${size + 0.5})+'" y="'+my(${-size})+'" text-anchor="middle" font-size="13" fill="currentColor">R</text>';
    })()}${(() => {
      const xmin=${-size - 1},xmax=${size + 1};
      const ymin=${-size - 1},ymax=${size + 1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${-size - 0.5})+'" y="'+my(${-size})+'" text-anchor="middle" font-size="13" fill="currentColor">Q</text>';
    })()}${(() => {
      const xmin=${-size - 1},xmax=${size + 1};
      const ymin=${-size - 1},ymax=${size + 1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${offset})+'" y="'+my(${offset})+'" text-anchor="middle" font-size="13" fill="currentColor">P</text>';
    })()}${(() => {
      const xmin=${-size - 1},xmax=${size + 1};
      const ymin=${-size - 1},ymax=${size + 1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${offset})+'" y="'+my(${-offset})+'" text-anchor="middle" font-size="13" fill="currentColor">$angleQPR^circ</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `In the figure above, $MQ$ and $NR$ intersect at point $P$, $NP = QP$, and $MP = PR$. What is the measure, in degrees, of $\\\\angle QMR$? (Disregard the degree symbol when gridding your answer.)`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: Math.round(baseAngleMPR).toString(),
      explanation: `Since $\\\\angle QPR = ${angleQPR}^\\\\circ$, then $\\\\angle MPR = ${angleMPR}^\\\\circ$. Given $MP = PR$, triangle $MPR$ is isosceles. The base angles $\\\\angle QMR$ and $\\\\angle NRM$ sum to $180 - ${angleMPR} = ${180 - angleMPR}$. Thus, $\\\\angle QMR = ${Math.round(baseAngleMPR)}^\\\\circ$.`
    };
  }
};

/**
 * Question ID: 345cc36a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [lengths: YQ=63, WQ=70, WX=60, XQ=120 (specific values), answer: 54]
 * - Difficulty factors: [Similar triangles, proportional reasoning, AA similarity]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [Similar triangles WQX and YQZ with vertical angles at Q]
 * - Question type: [Figure→Fill in the blank]
 */

// File: generators/lines-angles-and-triangles/345cc36a.ts