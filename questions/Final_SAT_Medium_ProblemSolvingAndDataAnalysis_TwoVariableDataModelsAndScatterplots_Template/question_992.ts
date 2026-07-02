import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 992
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 1-13, y-values: 2-14, slope: approximately -0.8]
 * - Difficulty factors: [Estimating slope from scattered data]
 * - Distractor patterns: [-2.4 (steeper), 0.8 (wrong sign), 2.4 (wrong sign and magnitude)]
 * - Constraints: [Negative slope, intercept around 13]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative trend line]
 */

export const generator_992 = {
  metadata: {
    id: "992",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate line parameters
    const slope = -1 * getRandomInt(7, 10) / 10; // -0.7 to -1.0
    const intercept = getRandomInt(12, 14);
    
    // STEP 2: Generate scatter points
    const points = [
      { x: 1, y: Math.round(intercept + slope * 1 + getRandomInt(0, 3)) },
      { x: 2.5, y: Math.round(intercept + slope * 2.5 + getRandomInt(-2, 2)) },
      { x: 3.5, y: Math.round(intercept + slope * 3.5 + getRandomInt(-2, 2)) },
      { x: 4, y: Math.round(intercept + slope * 4 + getRandomInt(-2, 2)) },
      { x: 6, y: Math.round(intercept + slope * 6 + getRandomInt(-1, 3)) },
      { x: 6.5, y: Math.round(intercept + slope * 6.5 + getRandomInt(-2, 2)) },
      { x: 7, y: Math.round(intercept + slope * 7 + getRandomInt(-2, 2)) },
      { x: 9, y: Math.round(intercept + slope * 9 + getRandomInt(-1, 2)) },
      { x: 11.5, y: Math.round(intercept + slope * 11.5 + getRandomInt(-1, 2)) },
      { x: 13, y: Math.round(intercept + slope * 13 + getRandomInt(-1, 2)) }
    ];
    
    // Calculate viewBox bounds
    const xMin = -0.5;
    const xMax = 14;
    const yMin = 0;
    const yMax = 15;
    
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
    
    // STEP 4: Create options
    const slopeValue = parseFloat(slope.toFixed(1));
    const steepSlope = (slopeValue * 3).toFixed(1);
    const positiveSlope = (0 - slopeValue).toFixed(1);
    const wrongSlope = (slopeValue * -3).toFixed(1);
    
    const optionsData = [
      { text: steepSlope, isCorrect: false },
      { text: slopeValue.toFixed(1), isCorrect: true },
      { text: positiveSlope, isCorrect: false },
      { text: wrongSlope, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const y1 = Math.round(intercept + slope * 1);
    const y11 = Math.round(intercept + slope * 11);
    
    return {
      questionText: "The scatterplot shows the relationship between two variables, $x$ and $y$. A line of best fit is also shown. Which of the following is closest to the slope of the line of best fit shown?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: slopeValue.toFixed(1),
      explanation: `Choice ${correctLetter} is correct. The line passes through approximately $(1, ${y1})$ and $(11, ${y11})$. Slope $= (${y11} - ${y1}) / (11 - 1) = ${y11 - y1} / 10 = ${((y11 - y1) / 10).toFixed(1)}$, which is closest to ${slopeValue.toFixed(1)}. Choice ${incorrectOptions[0].letter} is incorrect; it is too steep. Choice ${incorrectOptions[1].letter} is incorrect; it has the wrong sign. Choice ${incorrectOptions[2].letter} is incorrect; it has both the wrong sign and magnitude.`
    };
  }
};
