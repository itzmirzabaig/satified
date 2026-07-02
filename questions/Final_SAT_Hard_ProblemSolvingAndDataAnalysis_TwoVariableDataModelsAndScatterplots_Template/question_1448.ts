import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1448
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 100, intercept: 100]
 * - Difficulty factors: [Estimating slope from graph, estimating y-intercept]
 * - Distractor patterns: [Slope 200 (too steep), slope 50 (too flat), intercept 0 (misses offset)]
 * - Constraints: [Line passes through approximately (1, 200) and (2.5, 350)]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Line of best fit for house size vs price]
 */

export const generator_1448 = {
  metadata: {
    id: "1448",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: slope = 100, intercept = 100
    const slope = getRandomInt(50, 150); // double-digit to low triple-digit
    const intercept = getRandomInt(50, 150); // reasonable y-intercept
    
    // STEP 2: Calculate viewBox bounds
    const xMin = -0.5;
    const xMax = 4;
    const yMin = intercept - 50;
    const yMax = slope * 3 + intercept + 50;
    
    // STEP 3: Build Mafs code
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
        const y = (slope);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 4: Create options
    // Distractors: slope*2, slope/2, intercept 0
    const wrongSlope1 = slope * 2;
    const wrongSlope2 = Math.floor(slope / 2);
    
    const optionsData = [
      { text: `y=${wrongSlope1}x+${intercept}`, isCorrect: false, reason: "uses a slope that is too steep" },
      { text: `y=${slope}x+${intercept}`, isCorrect: true },
      { text: `y=${wrongSlope2}x+${intercept}`, isCorrect: false, reason: "uses a slope that is too flat" },
      { text: `y=${slope}x`, isCorrect: false, reason: "ignores the y-intercept" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Return question data
    return {
      questionText: `The scatterplot above shows the size $x$ and the sale price $y$ of $25$ houses for sale in Town H. Which of the following could be an equation for a line of best fit for the data?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `y=${slope}x+${intercept}`,
      explanation: `Choice ${correctLetter} is correct. The line of best fit passes through approximately $(1, ${slope + intercept})$ and $(2.5, ${Math.round(slope * 2.5 + intercept)})$, giving a slope of $\\\\frac{${Math.round(slope * 2.5 + intercept)}-${slope + intercept}}{2.5-1} = ${slope}$. With a y-intercept around ${intercept}, $y = ${slope}x + ${intercept}$ is the best fit. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
