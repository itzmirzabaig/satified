import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1adb39f0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 0-4, y-values: 7-12.2, slope: approximately -1.1, intercept: 12.2]
 * - Difficulty factors: [Reading scatterplot data, calculating predicted values from line of best fit, finding differences]
 * - Distractor patterns: [1 (correct difference), 2 (larger difference), 5 (much larger), 12 (raw y-value)]
 * - Constraints: [Must have scatterplot with line of best fit, need point at x=1 with y≈12]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Generate scatter points and line with negative slope]
 */

export const generator_1adb39f0 = {
  metadata: {
    // id: "1adb39f0",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate line of best fit parameters
    // Original uses slope around -1.1 and intercept around 12.2
    const slope = -(getRandomInt(8, 13) / 10); // -0.8 to -1.3
    const intercept = getRandomInt(11, 14);
    
    // STEP 2: Generate scatterplot data points
    // Original has points around the line with some variation
    const points = [
      { x: 0, y: intercept + getRandomInt(-2, 3) },
      { x: 0.8, y: intercept + slope * 0.8 + getRandomInt(-2, 2) },
      { x: 1.0, y: 12 }, // The specific point at x=1
      { x: 1.6, y: intercept + slope * 1.6 + getRandomInt(-2, 2) },
      { x: 1.9, y: intercept + slope * 1.9 + getRandomInt(-2, 2) },
      { x: 2.2, y: intercept + slope * 2.2 + getRandomInt(-3, 2) },
      { x: 3.0, y: intercept + slope * 3 + getRandomInt(-2, 2) },
      { x: 3.6, y: intercept + slope * 3.6 + getRandomInt(-2, 2) },
      { x: 3.8, y: intercept + slope * 3.8 + getRandomInt(-2, 2) },
      { x: 4.0, y: intercept + slope * 4 + getRandomInt(-3, 2) }
    ];
    
    // Ensure the point at x=1 has a reasonable y-value (around 12)
    points[2].y = Math.round(intercept + slope * 1 + getRandomInt(0, 2));
    
    // STEP 3: Calculate the answer
    const actualY = points[2].y;
    const predictedY = slope * 1 + intercept;
    const difference = Math.abs(actualY - predictedY);
    const roundedDifference = Math.round(difference);
    
    // Calculate viewBox bounds
    const xMin = -0.5;
    const xMax = 6;
    const yMin = 1;
    const yMax = 14;
    
    // STEP 4: Build Mafs code
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
      const xmin = ${xMin};
      const xmax = ${xMax};
      const ymin = ${yMin};
      const ymax = ${yMax};
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = ${slope.toFixed(3);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 5: Create options
    const correctText = roundedDifference.toString();
    const optionsData = [
      { text: "1", isCorrect: correctText === "1" },
      { text: "2", isCorrect: correctText === "2" },
      { text: "5", isCorrect: false },
      { text: "12", isCorrect: false }
    ];
    
    // Ensure correct answer is included
    if (!optionsData.find(o => o.isCorrect)) {
      optionsData[0] = { text: correctText, isCorrect: true };
    }
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption?.letter || 'A';
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: "The scatterplot shows the relationship between two variables, $x$ and $y$. A line of best fit for the data is also shown. Which of the following is closest to the difference between the $y$-coordinate of the data point with $x=1$ and the $y$-value predicted by the line of best fit at $x=1$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The data point with $x=1$ has a $y$-coordinate of ${actualY}. The $y$-value predicted by the line of best fit at $x=1$ is approximately ${predictedY.toFixed(1)} (${slope.toFixed(3)}(1) + ${intercept} ≈ ${predictedY.toFixed(1)}). The difference is $|${actualY} - ${predictedY.toFixed(1)}| ≈ ${difference.toFixed(1)}$, which is closest to ${correctText}. Choice ${incorrectOptions[0].letter} is incorrect because it overestimates the vertical distance. Choice ${incorrectOptions[1].letter} is incorrect as it is much larger than the actual difference. Choice ${incorrectOptions[2].letter} is incorrect because it represents approximately the raw $y$-coordinate value rather than the difference.`
    };
  }
};

/**
 * Question ID: 9bb4107c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 0-8, y-values: 3-9, time interval: 2 to 6]
 * - Difficulty factors: [Reading piecewise graph, calculating average rate of change]
 * - Distractor patterns: [Fill-in-the-blank, exact answer 0.5 or 1/2]
 * - Constraints: [Must have specific points at x=2 and x=6 readable from graph]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Polyline graph with momentum over time]
 */