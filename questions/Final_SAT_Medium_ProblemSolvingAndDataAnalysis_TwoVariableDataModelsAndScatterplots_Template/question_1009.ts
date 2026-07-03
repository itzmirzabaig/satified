import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1009
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 1-7, y-values: 4-24, interval: 5 to 7]
 * - Difficulty factors: [Reading scatterplot, calculating average rate of change]
 * - Distractor patterns: [Fill-in-the-blank, answer is 5]
 * - Constraints: [Must have readable points at x=5 (y=14) and x=7 (y=24)]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Scatterplot with trend]
 */

export const generator_1009 = {
  metadata: {
    id: "1009",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate points
    // Need points at x=5 (y=14) and x=7 (y=24) for rate of change = 5
    const y5 = getRandomInt(12, 16);
    const y7 = y5 + getRandomInt(8, 12); // Difference of 10 over 2 units = 5 rate
    
    const points = [
      { x: 1, y: getRandomInt(3, 6) },
      { x: 2, y: getRandomInt(5, 8) },
      { x: 3, y: getRandomInt(10, 14) },
      { x: 4, y: getRandomInt(8, 12) },
      { x: 5, y: y5 },
      { x: 6, y: Math.round((y5 + y7) / 2) },
      { x: 7, y: y7 }
    ];
    
    // STEP 2: Calculate rate of change
    const rate = (y7 - y5) / (7 - 5);
    
    // Calculate viewBox bounds
    const xMin = -1;
    const xMax = 8;
    const yMin = 0;
    const yMax = 25;
    
    // STEP 3: Build Mafs code
    const pointElements = points.map(p => `<Point x={${p.x}} y={${p.y}} />`).join('\n      ');
    
    const _svg_0 = yMin; const _svg_1 = yMax; const _svg_2 = xMin; const _svg_3 = xMax;
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
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((5))+'" y1="'+my((y5))+'" x2="'+mx((7))+'" y2="'+my((y7))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}</svg></div>`;
    
    return {
      questionText: "The scatterplot shows the recorded temperature $y$, in °C, of the air in the chamber $x$ minutes after the start of the study. What was the average rate of change, in °C per minute, of the recorded temperature from $x=5$ to $x=7$?",
      figureCode: mafsCode,
      options: [],
      correctAnswer: rate.toString(),
      explanation: `At $x=5, y=${y5}$. At $x=7, y=${y7}$. The average rate of change is $(${y7} - ${y5}) / (7 - 5) = ${y7 - y5} / 2 = ${rate}$.`
    };
  }
};
