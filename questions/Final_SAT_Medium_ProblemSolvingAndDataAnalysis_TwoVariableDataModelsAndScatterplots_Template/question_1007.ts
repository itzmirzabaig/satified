import { getRandomInt, shuffle } from '../../utils/math';
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
    // STEP 1: Generate line parameters for the best-fit line y = slope*x + intercept
    const slope = getRandomInt(7, 10) / 10; // 0.7 to 1.0
    const intercept = getRandomInt(1, 2);

    // STEP 2: Place points at fixed x-positions. Randomly choose how many sit BELOW
    // the line; each point is set a clear margin above or below so the count is
    // unambiguous and visibly matches the figure.
    const xs = [1, 2, 3, 4, 5, 6, 7, 8]; // 8 evenly spaced points
    const n = xs.length;

    // Choose the target number of points below the line (the live answer).
    const belowTarget = getRandomInt(3, 5); // 3, 4, or 5 of the 8 points

    // Randomly pick which indices are below.
    const belowFlags = new Array(n).fill(false);
    const indices = shuffle(xs.map((_, i) => i));
    for (let k = 0; k < belowTarget; k++) belowFlags[indices[k]] = true;

    // Build points with a margin so they clearly sit above/below the line.
    const points = xs.map((x, i) => {
      const predicted = slope * x + intercept;
      const margin = getRandomInt(6, 12) / 10; // 0.6 to 1.2 clear separation
      const y = belowFlags[i]
        ? Math.round((predicted - margin) * 10) / 10
        : Math.round((predicted + margin) * 10) / 10;
      return { x, y };
    });

    // Live count of points strictly below the line = the answer.
    const belowCount = points.filter(p => p.y < slope * p.x + intercept).length;

    // Determine y-range from the actual data so everything stays on-screen.
    const ys = points.map(p => p.y);
    const yLo = Math.min(...ys, intercept + slope);
    const yHi = Math.max(...ys);
    const yMin = Math.max(0, Math.floor(yLo) - 1);
    const yMax = Math.ceil(yHi) + 1;
    const xMin = 0;
    const xMax = 9;

    // STEP 3: Build the SVG scatterplot with data points AND the best-fit line.
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="transparent"/>${(() => {
      const xmin=_svg_3, xmax=_svg_2;
      const ymin=_svg_1, ymax=_svg_0;
      const W=400, H=300, P=40;
      const mx=(x)=>Math.round((P+(x-xmin)/(xmax-xmin)*(W-2*P))*100)/100;
      const my=(y)=>Math.round((H-P-(y-ymin)/(ymax-ymin)*(H-2*P))*100)/100;
      let s='';
      // X-axis (drawn at the bottom of the plot) and Y-axis (at the left).
      s+='<line x1="'+P+'" y1="'+(H-P)+'" x2="'+(W-P)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+P+'" y1="'+P+'" x2="'+P+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      // Vertical grid lines + x labels along the bottom axis.
      for(let x=Math.ceil(xmin); x<=Math.floor(xmax); x++) {
        if(x===0) continue;
        s+='<line x1="'+mx(x)+'" y1="'+P+'" x2="'+mx(x)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+mx(x)+'" y="'+(H-P+16)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      // Horizontal grid lines + y labels along the left axis.
      for(let y=Math.ceil(ymin); y<=Math.floor(ymax); y++) {
        if(y===0) continue;
        s+='<line x1="'+P+'" y1="'+my(y)+'" x2="'+(W-P)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+(P-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${
    (() => {
      // Best-fit line y = slope*x + intercept drawn across the visible x-range.
      const xmin = (xMin);
      const xmax = (xMax);
      const ymin = (yMin);
      const ymax = (yMax);
      const W = 400, H = 300, P = 40;
      const mx = (x) => Math.round((P + (x-xmin)/(xmax-xmin)*(W-2*P))*100)/100;
      const my = (y) => Math.round((H-P - (y-ymin)/(ymax-ymin)*(H-2*P))*100)/100;
      const x1 = xmin, x2 = xmax;
      const y1 = slope * x1 + intercept;
      const y2 = slope * x2 + intercept;
      return '<line x1="'+mx(x1)+'" y1="'+my(y1)+'" x2="'+mx(x2)+'" y2="'+my(y2)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${
    (() => {
      // Data points as blue markers.
      const xmin = (xMin);
      const xmax = (xMax);
      const ymin = (yMin);
      const ymax = (yMax);
      const W = 400, H = 300, P = 40;
      const mx = (x) => Math.round((P + (x-xmin)/(xmax-xmin)*(W-2*P))*100)/100;
      const my = (y) => Math.round((H-P - (y-ymin)/(ymax-ymin)*(H-2*P))*100)/100;
      return points.map(p => '<circle cx="'+mx(p.x)+'" cy="'+my(p.y)+'" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5"/>').join('');
    })()}</svg></div>`;

    return {
      questionText: "The scatterplot shows the relationship between two variables, $x$ and $y$. A line of best fit is also shown. For how many of the data points does the line of best fit predict a greater $y$-value than the actual $y$-value?",
      figureCode: mafsCode,
      options: [],
      correctAnswer: String(belowCount),
      explanation: `The line of best fit predicts a greater $y$-value than the actual value for any data point that lies below the line. Counting the points that fall below the line of best fit gives ${belowCount} such data points.`
    };
  }
};
