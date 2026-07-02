import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 785
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -4, intercept: 1]
 * - Difficulty factors: [Graph to inequality, dashed line, shading]
 * - Distractor patterns: [A/B=wrong inequality sign, C=wrong slope sign]
 * - Constraints: [y > -4x + 1]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs inequality graph]
 */

export const generator_785 = {
  metadata: {
    id: "785",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y > -4x + 1
    const slope = -getRandomInt(2, 6);
    const yIntercept = getRandomInt(1, 5);
    const absSlope = Math.abs(slope);
    
    // Calculate second point
    const x2 = 1;
    const y2 = slope * x2 + yIntercept;
    
    // Calculate viewBox
    const xMin = -5;
    const xMax = 5;
    const yMin = Math.min(yIntercept, y2, -5);
    const yMax = Math.max(yIntercept, y2, 5);
    
    // STEP 2: Build Mafs code
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_3,xmax=_svg_2;
      const ymin=_svg_1,ymax=_svg_0;
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      const y0=Math.max(ymin,Math.min(ymax,0));
      const x0=Math.max(xmin,Math.min(xmax,0));
      s+='<line x1="'+P+'" y1="'+my(y0)+'" x2="'+(W-P)+'" y2="'+my(y0)+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+mx(x0)+'" y1="'+P+'" x2="'+mx(x0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      const xstep=Math.ceil((xmax-xmin)/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        s+='<text x="'+mx(x)+'" y="'+(my(y0)+15)+'" text-anchor="middle" font-size="10" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.ceil((ymax-ymin)/6);
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        s+='<text x="'+(mx(x0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="10" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      // Shade region
      const steps=80;
      let pts=[];
      for(let i=0;i<=steps;i++){
        const x=xmin+i*(xmax-xmin)/steps;
        const y=0;
        pts.push(mx(x)+','+my(ymax));
      }
      for(let i=steps;i>=0;i--){
        const x=xmin+i*(xmax-xmin)/steps;
        const y=0;
        pts.push(mx(x)+','+my(y));
      }
      let lpts=[];
      for(let i=0;i<=steps;i++){
        const x=xmin+i*(xmax-xmin)/steps;
        const y=0;
        lpts.push(mx(x)+','+my(y));
      }
      return '<polygon points="'+pts.join(' ')+'" fill="#22c55e" fill-opacity="0.15"/>'+
             '<polyline points="'+lpts.join(' ')+'" fill="none" stroke="#16a34a" stroke-width="2" stroke-dasharray="6,3"/>';
    })()}</svg></div>`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: `$y < ${yIntercept} + ${absSlope}x$`, isCorrect: false },
      { text: `$y < ${yIntercept} - ${absSlope}x$`, isCorrect: false },
      { text: `$y > ${yIntercept} + ${absSlope}x$`, isCorrect: false },
      { text: `$y > ${yIntercept} - ${absSlope}x$`, isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. The boundary line passes through $(0, ${yIntercept})$ and $(${x2}, ${y2})$. The slope is $\\frac{${y2} - ${yIntercept}}{${x2} - 0} = ${slope}$. The y-intercept is ${yIntercept}, so the equation is $y = ${slope}x + ${yIntercept}$. Since the shaded region is above the dashed line, the inequality is $y > ${slope}x + ${yIntercept}$, or $y > ${yIntercept} - ${absSlope}x$.`;
    
    // STEP 6: Return question data
    return {
      questionText: `The shaded region shown represents the solutions to which inequality?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `y > ${yIntercept} - ${absSlope}x`,
      explanation: explanation
    };
  }
};