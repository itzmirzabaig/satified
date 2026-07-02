import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question 1245
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 0.5, intercepts: 8 and 10, answer: 1/2]
 * - Difficulty factors: [No solution from graph, identifying c from graph]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [c must equal slope]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two parallel lines with different intercepts]
 */

export const generator_1245 = {
  metadata: {
    id: "1245",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const slope_num = getRandomInt(1, 4);
    const slope_den = getRandomInt(2, 5);
    
    const b1 = getRandomInt(5, 12);
    const b2 = b1 + getRandomInt(2, 5);
    
    // Calculate viewBox
    const xMin = -5;
    const xMax = 5;
    const yMin = Math.min(b1, b2) - 3;
    const yMax = Math.max(b1, b2) + 3;
    
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
      const xmin = (xMin);
      const xmax = (xMax);
      const ymin = (yMin);
      const ymax = (yMax);
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = ((slope_num);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}${
    (() => {
      const pts = [];
      const xmin = (xMin);
      const xmax = (xMax);
      const ymin = (yMin);
      const ymax = (yMax);
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = ((slope_num);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    const eq1 = `y = ${slope_num === 1 && slope_den === 2 ? '' : slope_num + '/'}${slope_den === 2 ? '' : slope_den}x + ${b1}`;
    const eq2 = `y = cx + ${b2}`;
    
    return {
      questionText: `In the system of equations above, $c$ is a constant. If the system has no solution, what is the value of $c$? $$${eq1}$$ $$${eq2}$$`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: `${slope_num}/${slope_den}`,
      explanation: `For no solution, the lines must be parallel (same slope) but distinct. The first line has slope $\\frac{${slope_num}}{${slope_den}}$, so $c = \\frac{${slope_num}}{${slope_den}}$.`
    };
  }
};

/**
 * Question 1245
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 7, 6, 5, 6, constants: 25, 23, target: 17x+18y]
 * - Difficulty factors: [Clever combination without solving, 17=7+10, 18=6+12]
 * - Distractor patterns: [Individual solving, wrong combination]
 * - Constraints: [Combination must give integer answer]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: null (table only)
 */