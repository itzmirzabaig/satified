import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7fd284ac
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 1400-6100, y-values: 74-92, slope: ~0.0017, intercept: ~78.95]
 * - Difficulty factors: [Reading scatterplot with scaled axes, finding highest point, calculating residual]
 * - Distractor patterns: [10%, 7% (correct), 4%, 1%]
 * - Constraints: [Must have point at approximately (3700, 92) as highest]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with positive trend, specific axis labels]
 */

export const generator_7fd284ac = {
  metadata: {
    // id: "7fd284ac",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate line parameters
    const slope = getRandomInt(15, 20) / 10000; // ~0.0017
    const intercept = getRandomInt(76, 80);
    
    // STEP 2: Generate data points (charity data)
    // Highest point should be around x=3700, y=92
    const highestX = getRandomInt(3500, 3900);
    const highestY = getRandomInt(90, 94);
    
    const points = [
      { x: 1400, y: Math.round(intercept + slope * 1400 + getRandomInt(-3, 3)) },
      { x: 1700, y: Math.round(intercept + slope * 1700 + getRandomInt(-3, 5)) },
      { x: 1750, y: Math.round(intercept + slope * 1750 + getRandomInt(-2, 3)) },
      { x: 3300, y: Math.round(intercept + slope * 3300 + getRandomInt(-3, 3)) },
      { x: highestX, y: highestY }, // The highest point
      { x: 4200, y: Math.round(intercept + slope * 4200 + getRandomInt(-3, 3)) },
      { x: 4600, y: Math.round(intercept + slope * 4600 + getRandomInt(-5, 2)) },
      { x: 4700, y: Math.round(intercept + slope * 4700 + getRandomInt(-3, 3)) },
      { x: 6100, y: Math.round(intercept + slope * 6100 + getRandomInt(-3, 3)) }
    ];
    
    // Add an extra point at 1700 with different y
    points.splice(2, 0, { x: 1700, y: Math.round(intercept + slope * 1700 + getRandomInt(2, 5)) });
    
    // STEP 3: Calculate predicted and actual at highest point
    const predictedY = slope * highestX + intercept;
    const difference = highestY - predictedY;
    const percentDiff = Math.round(difference);
    
    // Calculate viewBox bounds
    const xMin = 1000;
    const xMax = 6500;
    const yMin = 70;
    const yMax = 95;
    
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
        const y = ${slope.toFixed(4);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 5: Create options
    const optionsData = [
      { text: "10%", isCorrect: false },
      { text: `${percentDiff}%`, isCorrect: true },
      { text: "4%", isCorrect: false },
      { text: "1%", isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: "The scatterplot above shows data for ten charities along with the line of best fit. For the charity with the greatest percent of total expenses spent on programs, which of the following is closest to the difference of the actual percent and the percent predicted by the line of best fit?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${percentDiff}%`,
      explanation: `Choice ${correctLetter} is correct. The highest point is at $(${highestX}, ${highestY})$. The predicted value at $${highestX}$ is approximately $${predictedY.toFixed(1)}$. The difference is $${highestY} - ${predictedY.toFixed(1)} = ${difference.toFixed(1)}$, which is closest to $${percentDiff}%. Choice ${incorrectOptions[0].letter} is incorrect; it overestimates the difference. Choice ${incorrectOptions[1].letter} is incorrect; it underestimates the difference. Choice ${incorrectOptions[2].letter} is incorrect; it significantly underestimates the difference.`
    };
  }
};

/**
 * Question ID: e17babed
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 0.5-9.3, y-values: 0.9-10, line: y=x]
 * - Difficulty factors: [Counting points above line of best fit]
 * - Distractor patterns: [3, 4, 6 (correct), 7]
 * - Constraints: [Line y=x, count points where actual y > predicted y]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with y=x line]
 */