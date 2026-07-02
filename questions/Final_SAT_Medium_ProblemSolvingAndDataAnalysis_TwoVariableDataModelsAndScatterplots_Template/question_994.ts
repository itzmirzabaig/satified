import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 994
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 3-8, y: 4.4-10.4, slope: ~-1.07, intercept: ~14]
 * - Difficulty factors: [Estimating negative slope from limited x-range data]
 * - Distractor patterns: [-3.3 (too steep), -1.1 (correct), 1.1 (wrong sign), 3.3 (wrong sign and magnitude)]
 * - Constraints: [Slope around -1.1]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative trend]
 */

export const generator_994 = {
  metadata: {
    id: "994",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const slope = -1 * getRandomInt(9, 12) / 10; // -0.9 to -1.2
    const intercept = getRandomInt(13, 15);
    
    // STEP 2: Generate points
    const points = [
      { x: 3, y: Math.round(intercept + slope * 3 + getRandomInt(-1, 3)) },
      { x: 5, y: Math.round(intercept + slope * 5 + getRandomInt(-2, 3)) },
      { x: 6, y: Math.round(intercept + slope * 6 + getRandomInt(-3, 2)) },
      { x: 7, y: Math.round(intercept + slope * 7 + getRandomInt(-2, 3)) },
      { x: 8, y: Math.round(intercept + slope * 8 + getRandomInt(-3, 2)) }
    ];
    
    // Calculate viewBox bounds
    const xMin = 2;
    const xMax = 10;
    const yMin = 3;
    const yMax = 11;
    
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
        const y = (slope.toFixed(2));
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 4: Create options
    const slopeVal = parseFloat(slope.toFixed(1));
    const steepSlope = (slopeVal * 3).toFixed(1);
    const positiveSlope = (0 - slopeVal).toFixed(1);
    const wrongSlope = (slopeVal * -3).toFixed(1);
    
    const optionsData = [
      { text: steepSlope, isCorrect: false },
      { text: slopeVal.toFixed(1), isCorrect: true },
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
    
    const y0 = intercept;
    const y13 = intercept + slope * 13;
    
    return {
      questionText: "The scatterplot shows the relationship between two variables, $x$ and $y$. A line of best fit is also shown. Which of the following is closest to the slope of this line of best fit?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: slopeVal.toFixed(1),
      explanation: `Choice ${correctLetter} is correct. The line passes through approximately $(0, ${y0})$ and $(13, ${y13.toFixed(0)})$. Slope $= (${y13.toFixed(0)} - ${y0}) / 13 = ${(y13 - y0).toFixed(0)} / 13 ≈ ${slope.toFixed(3)}$, closest to ${slopeVal.toFixed(1)}. Choice ${incorrectOptions[0].letter} is incorrect; it is too steep. Choice ${incorrectOptions[1].letter} is incorrect; it has the wrong sign. Choice ${incorrectOptions[2].letter} is incorrect; it has both the wrong sign and magnitude.`
    };
  }
};
