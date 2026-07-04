import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 995
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 0-10, y-values: 1-8, slope: approximately -0.7]
 * - Difficulty factors: [Estimating slope from scatterplot with line of best fit]
 * - Distractor patterns: [7 (ignoring sign/decimal), 0.7 (wrong sign), -7 (wrong magnitude)]
 * - Constraints: [Line must show negative slope around -0.7]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with downward trend line]
 */

export const generator_995 = {
  metadata: {
    id: "995",
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
    
    // Calculate viewBox bounds so every data point AND the full best-fit
    // line (endpoints at x=0 and x=10) are always on-chart for any draw.
    const lineY0 = intercept;                 // best-fit y at x = 0
    const lineY10 = intercept + slope * 10;    // best-fit y at x = 10
    const allY = [...points.map(p => p.y), lineY0, lineY10];
    const dataYMin = Math.min(...allY);
    const dataYMax = Math.max(...allY);
    const xMin = 0;
    const xMax = 10;
    const yMin = Math.min(0, Math.floor(dataYMin) - 1);
    const yMax = Math.max(10, Math.ceil(dataYMax) + 1);

    // STEP 3: Build SVG scatterplot with data points and line of best fit
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const _pts = points; const _slope = slope; const _intercept = intercept;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="transparent"/>${(() => {
      const xmin=_svg_3, xmax=_svg_2;
      const ymin=_svg_1, ymax=_svg_0;
      const W=400, H=300, P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      // Grid lines + x labels
      for(let x=Math.ceil(xmin); x<=Math.floor(xmax); x++) {
        if(x===0) continue;
        s+='<line x1="'+mx(x)+'" y1="'+P+'" x2="'+mx(x)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      // Grid lines + y labels (step 2 from an even base to avoid clutter)
      const yStart = Math.ceil(ymin) % 2 === 0 ? Math.ceil(ymin) : Math.ceil(ymin) + 1;
      for(let y=yStart; y<=Math.floor(ymax); y+=2) {
        if(y===0) continue;
        s+='<line x1="'+P+'" y1="'+my(y)+'" x2="'+(W-P)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${
    (() => {
      const xmin = xMin, xmax = xMax, ymin = yMin, ymax = yMax;
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      // Line of best fit: y = slope*x + intercept, clipped to plot box
      const x1 = xmin, x2 = xmax;
      const y1 = _slope*x1 + _intercept;
      const y2 = _slope*x2 + _intercept;
      let s = '<line x1="'+mx(x1)+'" y1="'+my(y1)+'" x2="'+mx(x2)+'" y2="'+my(y2)+'" stroke="currentColor" stroke-width="2"/>';
      // Data points
      for(const p of _pts) {
        s += '<circle cx="'+mx(p.x)+'" cy="'+my(p.y)+'" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5"/>';
      }
      return s;
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
