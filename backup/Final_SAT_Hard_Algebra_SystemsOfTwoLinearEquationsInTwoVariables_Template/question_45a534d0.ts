import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 45a534d0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 8/17, intercepts: -4/17 and -1/204, r=-34]
 * - Difficulty factors: [No solution with parameter, complex fractions]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [r must make slopes equal]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two parallel lines]
 */

export const generator_45a534d0 = {
  metadata: {
    // id: "45a534d0",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const num = getRandomInt(3, 10);
    const den = getRandomInt(5, 12);
    
    const b1_num = getRandomInt(1, 5);
    const c2 = getRandomInt(1, 5);
    
    const r_answer = -2 * den;
    
    // Calculate viewBox
    const xMin = -5;
    const xMax = 5;
    const yMin = -5;
    const yMax = 5;
    
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="transparent"/>${(() => {
      const xmin=_svg_3, xmax=_svg_2;
      const ymin=_svg_1, ymax=_svg_0;
      const W=400, H=300, P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      if(ymin<=0&&ymax>=0) s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      if(xmin<=0&&xmax>=0) s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      // Grid lines
      for(let x=Math.ceil(xmin); x<=Math.floor(xmax); x++) {
        if(x===0) continue;
        s+='<line x1="'+mx(x)+'" y1="'+P+'" x2="'+mx(x)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      for(let y=Math.ceil(ymin); y<=Math.floor(ymax); y++) {
        if(y===0) continue;
        s+='<line x1="'+P+'" y1="'+my(y)+'" x2="'+(W-P)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${
    (() => {
      const pts = [];
      const xmin = ${xMin};
      const xmax = ${xMax};
      const ymin = ${yMin};
      const ymax = ${yMax};
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = (${num;
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}${
    (() => {
      const pts = [];
      const xmin = ${xMin};
      const xmax = ${xMax};
      const ymin = ${yMin};
      const ymax = ${yMax};
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = (${num;
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    const eq1 = `${2 * num}x - ${2 * den}y = ${b1_num * 2}`;
    const eq2 = `-${4 * num}x + ry = ${c2}`;
    
    return {
      questionText: `In the given system of equations, $r$ is a constant. If the system has no solution, what is the value of $r$? $$${eq1}$$ $$${eq2}$$`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: r_answer.toString(),
      explanation: `The slopes must be equal for no solution. The first equation simplifies to $y = \\frac{${num}}{${den}}x - \\frac{${b1_num}}{${den}}$. The second equation gives $y = \\frac{${4 * num}}{r}x + \\frac{${c2}}{r}$. Setting $\\frac{${num}}{${den}} = \\frac{${4 * num}}{r}$ yields $r = ${r_answer}$.`
    };
  }
};

/**
 * Question ID: adb0c96c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 24, 1, 6, 1, constants: 48, 72]
 * - Difficulty factors: [Large coefficients, subtraction elimination]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Solution must be clean integer]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two lines intersecting, point marked]
 */