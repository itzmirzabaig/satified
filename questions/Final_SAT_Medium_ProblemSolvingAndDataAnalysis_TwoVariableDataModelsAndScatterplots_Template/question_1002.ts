import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1002
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 0.5-6.5, y: 2-13, slope: ~1.93]
 * - Difficulty factors: [Estimating slope from steep positive trend]
 * - Distractor patterns: [0, 1/2, 1, 2 (correct)]
 * - Constraints: [Slope approximately 2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with steep positive line]
 */

export const generator_1002 = {
  metadata: {
    id: "1002",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters (slope around 2)
    const slope = getRandomInt(17, 22) / 10; // 1.7 to 2.2
    const intercept = getRandomInt(0, 2);
    
    // STEP 2: Generate points
    const points = [
      { x: 0.5, y: Math.round(slope * 0.5 + intercept + getRandomInt(-1, 2)) },
      { x: 1.5, y: Math.round(slope * 1.5 + intercept + getRandomInt(-1, 2)) },
      { x: 2.5, y: Math.round(slope * 2.5 + intercept + getRandomInt(-2, 2)) },
      { x: 2.5, y: Math.round(slope * 2.5 + intercept + getRandomInt(0, 3)) },
      { x: 3.5, y: Math.round(slope * 3.5 + intercept + getRandomInt(-2, 2)) },
      { x: 3.5, y: Math.round(slope * 3.5 + intercept + getRandomInt(1, 4)) },
      { x: 4.5, y: Math.round(slope * 4.5 + intercept + getRandomInt(-1, 2)) },
      { x: 4.5, y: Math.round(slope * 4.5 + intercept + getRandomInt(2, 4)) },
      { x: 5.5, y: Math.round(slope * 5.5 + intercept + getRandomInt(0, 3)) },
      { x: 6.5, y: Math.round(slope * 6.5 + intercept + getRandomInt(-1, 2)) }
    ];
    
    // Calculate viewBox bounds
    const xMin = 0;
    const xMax = 7.5;
    const yMin = 0;
    const yMax = 16;
    
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
    const optionsData = [
      { text: "0", isCorrect: false },
      { text: "1/2", isCorrect: false },
      { text: "1", isCorrect: false },
      { text: "2", isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const y1 = (slope * 1 + intercept).toFixed(1);
    const y7 = (slope * 7 + intercept).toFixed(1);
    
    return {
      questionText: "In the given scatterplot, a line of best fit for the data is shown. Which of the following is closest to the slope of the line of best fit shown?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "2",
      explanation: `Choice ${correctLetter} is correct. The line passes through approximately $(1, ${y1})$ and $(7, ${y7})$. Slope $= (${y7} - ${y1}) / (7 - 1) = ${(slope * 6).toFixed(1)} / 6 ≈ ${slope.toFixed(2)}$, which is closest to 2. Choice ${incorrectOptions[0].letter} is incorrect; the line clearly has a positive slope. Choice ${incorrectOptions[1].letter} is incorrect; the slope is much steeper than 0.5. Choice ${incorrectOptions[2].letter} is incorrect; the slope is closer to 2 than to 1.`
    };
  }
};
