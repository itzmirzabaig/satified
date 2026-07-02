import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 999
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 0-10, y: 1-10, slope: ~-0.9, intercept: ~9.4]
 * - Difficulty factors: [Identifying linear model from negative trend scatterplot]
 * - Distractor patterns: [A (swapped), B (swapped with negative), C (wrong sign on slope), D (correct)]
 * - Constraints: [Negative slope, positive intercept around 9]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative trend]
 */

export const generator_999 = {
  metadata: {
    id: "999",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const slope = -1 * getRandomInt(7, 11) / 10; // -0.7 to -1.1
    const intercept = getRandomInt(8, 11);
    
    // STEP 2: Generate points
    const points = [
      { x: 0, y: Math.round(intercept + getRandomInt(-1, 2)) },
      { x: 1, y: Math.round(intercept + slope * 1 + getRandomInt(-2, 2)) },
      { x: 2, y: Math.round(intercept + slope * 2 + getRandomInt(-2, 2)) },
      { x: 3, y: Math.round(intercept + slope * 3 + getRandomInt(-2, 3)) },
      { x: 5, y: Math.round(intercept + slope * 5 + getRandomInt(-2, 3)) },
      { x: 5.5, y: Math.round(intercept + slope * 5.5 + getRandomInt(-2, 2)) },
      { x: 6.5, y: Math.round(intercept + slope * 6.5 + getRandomInt(-2, 2)) },
      { x: 7.5, y: Math.round(intercept + slope * 7.5 + getRandomInt(-2, 2)) },
      { x: 9, y: Math.round(intercept + slope * 9 + getRandomInt(-1, 2)) },
      { x: 10, y: Math.round(intercept + slope * 10 + getRandomInt(-1, 2)) }
    ];
    
    // Calculate viewBox bounds
    const xMin = -1;
    const xMax = 11;
    const yMin = 0;
    const yMax = 12;
    
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
        const y = (slope.toFixed(1));
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 4: Create options
    const absSlope = Math.abs(slope).toFixed(1);
    const correctEquation = `y = ${intercept} - ${absSlope}x`;
    const swappedEquation = `y = ${absSlope} + ${intercept}x`;
    const swappedNegEquation = `y = ${absSlope} - ${intercept}x`;
    const wrongSignEquation = `y = ${intercept} + ${absSlope}x`;
    
    const optionsData = [
      { text: swappedEquation, isCorrect: false },
      { text: swappedNegEquation, isCorrect: false },
      { text: wrongSignEquation, isCorrect: false },
      { text: correctEquation, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: "The scatterplot shows the relationship between two variables, $x$ and $y$. Which of the following equations is the most appropriate linear model for the data shown?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctLetter} is correct. The trend is negative, requiring a negative slope. The $y$-intercept is above ${intercept - 1}. Only choice ${correctLetter} satisfies both conditions. Choice ${incorrectOptions[0].letter} is incorrect; it swaps the slope and intercept. Choice ${incorrectOptions[1].letter} is incorrect; it swaps the values and has the wrong sign. Choice ${incorrectOptions[2].letter} is incorrect; it has a positive slope.`
    };
  }
};
