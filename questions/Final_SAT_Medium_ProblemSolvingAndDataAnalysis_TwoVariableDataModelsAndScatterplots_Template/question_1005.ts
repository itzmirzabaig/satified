import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1005
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1-8, y: 2-26, slope: ~3.14, intercept: ~0.8]
 * - Difficulty factors: [Identifying line equation from nearly perfect linear data]
 * - Distractor patterns: [A (correct: 3x+0.8), B (swapped), C (wrong sign slope), D (wrong sign slope)]
 * - Constraints: [Strong positive linear trend, y-intercept near 0.8]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with strong positive linear trend]
 */

export const generator_1005 = {
  metadata: {
    id: "1005",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const slope = getRandomInt(28, 35) / 10; // 2.8 to 3.5
    const intercept = getRandomInt(5, 12) / 10; // 0.5 to 1.2
    
    // STEP 2: Generate nearly linear points
    const points = [];
    for (let x = 1; x <= 8; x++) {
      const noise = getRandomInt(-2, 3);
      const y = Math.round(slope * x + intercept + noise);
      points.push({ x, y });
    }
    
    // Ensure last point shows the trend
    points[7].y = Math.round(slope * 8 + intercept + getRandomInt(1, 4));
    
    // Calculate viewBox bounds
    const xMin = 0;
    const xMax = 9;
    const yMin = 0;
    const yMax = 30;
    
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
    const correctEquation = `y = ${Math.round(slope)}x + ${intercept.toFixed(1)}`;
    const swappedEquation = `y = ${intercept.toFixed(1)}x + ${Math.round(slope)}`;
    const negativeSlope1 = `y = -${intercept.toFixed(1)}x + ${Math.round(slope)}`;
    const negativeSlope2 = `y = -${Math.round(slope)}x + ${intercept.toFixed(1)}`;
    
    const optionsData = [
      { text: correctEquation, isCorrect: true },
      { text: swappedEquation, isCorrect: false },
      { text: negativeSlope1, isCorrect: false },
      { text: negativeSlope2, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const approxSlope = ((points[7].y - points[0].y) / 7).toFixed(2);
    
    return {
      questionText: "Which of the following could be the equation for a line of best fit for the data shown in the scatterplot above?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctLetter} is correct. The slope is positive and approximately $(${points[7].y} - ${points[0].y}) / (${points[7].x} - ${points[0].x}) = ${points[7].y - points[0].y} / 7 ≈ ${approxSlope}$. The $y$-intercept is close to ${intercept.toFixed(1)}. Choice ${correctLetter} is the best fit. Choice ${incorrectOptions[0].letter} is incorrect; it swaps the slope and intercept. Choices ${incorrectOptions[1].letter} and ${incorrectOptions[2].letter} are incorrect; the slope is positive, not negative.`
    };
  }
};
