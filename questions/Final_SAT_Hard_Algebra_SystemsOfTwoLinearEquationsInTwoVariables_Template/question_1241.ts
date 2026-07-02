import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question 1241
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 10/7, p, -7, constants: -6/7, 11/7]
 * - Difficulty factors: [No solution, parameter identification]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [p must make lines parallel]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two parallel lines]
 */

export const generator_1241 = {
  metadata: {
    id: "1241",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const num = getRandomInt(8, 15);
    const den = getRandomInt(5, 9);
    
    const b1 = getRandomInt(2, 8);
    const c2 = getRandomInt(5, 15);
    
    const p_answer = num;
    
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
      const xmin = (xMin);
      const xmax = (xMax);
      const ymin = (yMin);
      const ymax = (yMax);
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = ((num);
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
        const y = ((num);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    const eq1 = `${p_answer}w - ${den}r = ${b1}`;
    const eq2 = `${num}w - ${den}r = ${c2}`;
    
    return {
      questionText: `In the given system of equations, $p$ is a constant. If the system has no solution, what is the value of $p$? $$${eq1}$$ $$${eq2}$$`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: p_answer.toString(),
      explanation: `For no solution, the lines must be parallel. In standard form, the coefficients must be proportional. The ratio of r-coefficients is $\\frac{-${den}}{-${den}} = 1$, so the ratio of w-coefficients must also be 1. Therefore $\\frac{p}{${num}} = 1$, which gives $p = ${p_answer}$.`
    };
  }
};

/**
 * Question 1241
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, 14, 10, 7, constants: 45, 27, answer: 9/5]
 * - Difficulty factors: [Finding xy product, not individual values]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Solution must give clean fraction for xy]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two lines intersecting]
 */