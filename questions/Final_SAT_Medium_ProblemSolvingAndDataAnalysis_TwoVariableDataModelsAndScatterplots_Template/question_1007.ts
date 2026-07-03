import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1007
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1-9, y: 2.5-8.2, slope: ~0.867, intercept: ~1.07]
 * - Difficulty factors: [Counting points below line of best fit]
 * - Distractor patterns: [Fill-in-the-blank, answer is 6]
 * - Constraints: [Must have exactly 6 points below the line]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Scatterplot with positive trend line]
 */

export const generator_1007 = {
  metadata: {
    id: "1007",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate line parameters
    const slope = getRandomInt(7, 10) / 10; // 0.7 to 1.0
    const intercept = getRandomInt(1, 2);
    
    // STEP 2: Generate points - 6 below the line, 5 on or above
    const points = [
      { x: 1.0, y: 3.0 }, // Above
      { x: 1.8, y: 2.9 }, // Below
      { x: 2.5, y: 2.5 }, // Below
      { x: 3.5, y: 3.3 }, // Below
      { x: 4.2, y: 3.8 }, // Below
      { x: 5.1, y: 4.8 }, // Above
      { x: 6.0, y: 6.6 }, // Above
      { x: 6.8, y: 6.8 }, // Above
      { x: 7.5, y: 6.5 }, // Below
      { x: 8.3, y: 8.2 }, // Above
      { x: 9.0, y: 7.5 }  // Below
    ];
    
    // Add variation but maintain count
    points.forEach(p => {
      const predicted = slope * p.x + intercept;
      const isBelow = p.y < predicted;
      if (!isBelow && Math.random() > 0.5) {
        // Move below
        p.y = Math.round((predicted - 0.5 - Math.random()) * 10) / 10;
      }
    });
    
    // Count below
    let belowCount = 0;
    points.forEach(p => {
      if (p.y < slope * p.x + intercept) belowCount++;
    });
    
    // Adjust to get exactly 6
    while (belowCount < 6) {
      const idx = getRandomInt(0, 10);
      const predicted = slope * points[idx].x + intercept;
      if (points[idx].y >= predicted) {
        points[idx].y = Math.round((predicted - 0.3) * 10) / 10;
        belowCount++;
      }
    }
    while (belowCount > 6) {
      const idx = getRandomInt(0, 10);
      const predicted = slope * points[idx].x + intercept;
      if (points[idx].y < predicted) {
        points[idx].y = Math.round((predicted + 0.3) * 10) / 10;
        belowCount--;
      }
    }
    
    // Calculate viewBox bounds
    const xMin = 0;
    const xMax = 10;
    const yMin = 2;
    const yMax = 9;
    
    // STEP 3: Build Mafs code
    const pointElements = points.map(p => `<Point x={${p.x}} y={${p.y}} />`).join('\n      ');
    
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
        const y = (slope.toFixed(3));
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    return {
      questionText: "The scatterplot shows the relationship between two variables, $x$ and $y$. A line of best fit is also shown. For how many of the data points does the line of best fit predict a greater $y$-value than the actual $y$-value?",
      figureCode: mafsCode,
      options: [],
      correctAnswer: "6",
      explanation: `The line of best fit predicts a greater $y$-value for points located below it. Counting points below the line, there are 6 such data points.`
    };
  }
};
