import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2e74e403
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 0-10, y-values: 1-8, slope: approximately -0.7]
 * - Difficulty factors: [Estimating slope from scatterplot with line of best fit]
 * - Distractor patterns: [7 (ignoring sign/decimal), 0.7 (wrong sign), -7 (wrong magnitude)]
 * - Constraints: [Line must show negative slope around -0.7]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with downward trend line]
 */

export const generator_2e74e403 = {
  metadata: {
    // id: "2e74e403",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate line parameters
    // Slope around -0.7, intercept around 8
    const slope = -1 * getRandomInt(5, 9) / 10; // -0.5 to -0.9
    const intercept = getRandomInt(7, 9);
    
    // STEP 2: Generate scatter points around the line
    const points = [
      { x: 0, y: Math.round(intercept + getRandomInt(-1, 1)) },
      { x: 1.5, y: Math.round(intercept + slope * 1.5 + getRandomInt(-1, 2)) },
      { x: 2.5, y: Math.round(intercept + slope * 2.5 + getRandomInt(0, 2)) },
      { x: 3, y: Math.round(intercept + slope * 3 + getRandomInt(-2, 1)) },
      { x: 4.5, y: Math.round(intercept + slope * 4.5 + getRandomInt(-1, 2)) },
      { x: 5.5, y: Math.round(intercept + slope * 5.5 + getRandomInt(-1, 3)) },
      { x: 6.5, y: Math.round(intercept + slope * 6.5 + getRandomInt(-1, 2)) },
      { x: 7.5, y: Math.round(intercept + slope * 7.5 + getRandomInt(0, 2)) },
      { x: 9, y: Math.round(intercept + slope * 9 + getRandomInt(-1, 2)) },
      { x: 10, y: Math.round(intercept + slope * 10 + getRandomInt(-1, 1)) }
    ];
    
    // Calculate viewBox bounds
    const xMin = -0.5;
    const xMax = 11;
    const yMin = 0;
    const yMax = 10;
    
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
      const xmin = ${xMin};
      const xmax = ${xMax};
      const ymin = ${yMin};
      const ymax = ${yMax};
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = ${slope.toFixed(1);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 4: Create options
    const slopeDisplay = slope.toFixed(1);
    const wrongSign = (0 - slope).toFixed(1);
    const wrongMagnitude = (slope * 10).toFixed(0);
    const wrongSignMagnitude = (0 - slope * 10).toFixed(0);
    
    const optionsData = [
      { text: wrongSignMagnitude, isCorrect: false }, // 7
      { text: wrongSign, isCorrect: false }, // 0.7
      { text: slopeDisplay, isCorrect: true }, // -0.7
      { text: wrongMagnitude, isCorrect: false } // -7
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const yAt0 = intercept;
    const yAt10 = intercept + slope * 10;
    
    return {
      questionText: "In the given scatterplot, a line of best fit for the data is shown. Which of the following is closest to the slope of this line of best fit?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: slopeDisplay,
      explanation: `Choice ${correctLetter} is correct. The line of best fit passes through approximately $(0, ${yAt0})$ and $(10, ${yAt10.toFixed(0)})$. Slope $= (${yAt10.toFixed(0)} - ${yAt0}) / (10 - 0) = ${(yAt10 - yAt0).toFixed(0)}/10 = ${slopeDisplay}$. Choice ${incorrectOptions[0].letter} is incorrect; it may result from ignoring the decimal place. Choice ${incorrectOptions[1].letter} is incorrect; it has the wrong sign. Choice ${incorrectOptions[2].letter} is incorrect; it has the wrong magnitude.`
    };
  }
};

/**
 * Question ID: 9a144a01
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Comparison of exponential vs linear functions]
 * - Difficulty factors: [Understanding behavior of exponential vs linear functions, finding intersection points]
 * - Distractor patterns: [A (always less), B (always greater), D (reversed relationship)]
 * - Constraints: [Exponential 2^x and linear 2x+2 intersect at x=3]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [null - conceptual question, no figure]
 */