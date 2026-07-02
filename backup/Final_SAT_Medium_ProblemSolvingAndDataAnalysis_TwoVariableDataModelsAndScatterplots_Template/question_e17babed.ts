import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_e17babed = {
  metadata: {
    // id: "e17babed",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate points such that 6 are above y=x line
    // Points above: (0.5, 0.9), (1.2, 1.5), (2.1, 2.6), (4.3, 4.8), (6.3, 6.5), (9.3, 10.0)
    const abovePoints = [
      { x: 0.5, y: 0.9 },
      { x: 1.2, y: 1.5 },
      { x: 2.1, y: 2.6 },
      { x: 4.3, y: 4.8 },
      { x: 6.3, y: 6.5 },
      { x: 9.3, y: 10.0 }
    ];
    
    // Points on or below: (3.1, 1.5), (4.0, 3.3), (5.1, 4.1), (7.5, 6.9)
    const belowPoints = [
      { x: 3.1, y: 1.5 },
      { x: 4.0, y: 3.3 },
      { x: 5.1, y: 4.1 },
      { x: 7.5, y: 6.9 }
    ];
    
    // Add some variation
    const allPoints = [
      { x: 0.5, y: abovePoints[0].y + getRandomInt(-1, 1) * 0.1 },
      { x: 1.2, y: abovePoints[1].y + getRandomInt(-1, 1) * 0.1 },
      { x: 2.1, y: abovePoints[2].y + getRandomInt(-1, 1) * 0.1 },
      { x: 3.1, y: belowPoints[0].y },
      { x: 4.0, y: belowPoints[1].y },
      { x: 4.3, y: abovePoints[3].y },
      { x: 5.1, y: belowPoints[2].y },
      { x: 6.3, y: abovePoints[4].y },
      { x: 7.5, y: belowPoints[3].y },
      { x: 9.3, y: abovePoints[5].y }
    ];
    
    // Ensure 6 points are above y=x
    let aboveCount = 0;
    allPoints.forEach(p => {
      if (p.y > p.x) aboveCount++;
    });
    
    // Adjust if needed
    while (aboveCount < 6) {
      const idx = getRandomInt(0, 9);
      if (allPoints[idx].y <= allPoints[idx].x) {
        allPoints[idx].y = allPoints[idx].x + 0.5;
        aboveCount++;
      }
    }
    
    // Calculate viewBox bounds
    const xMin = 0;
    const xMax = 10;
    const yMin = 0;
    const yMax = 11;
    
    // STEP 2: Build Mafs code
    const pointElements = allPoints.map(p => `<Point x={${p.x}} y={${p.y}} />`).join('\n      ');
    
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
        const y = x;
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="#2563eb" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: false },
      { text: "6", isCorrect: true },
      { text: "7", isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: "For how many of the 10 data points is the actual $y$-value greater than the $y$-value predicted by the line of best fit?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "6",
      explanation: `Choice ${correctLetter} is correct. Counting points above the line ($y=x$): there are 6 data points where the actual $y$-value is greater than the predicted value. Choice ${incorrectOptions[0].letter} is incorrect; it undercounts the points above the line. Choice ${incorrectOptions[1].letter} is incorrect; it is close but undercounts by 2. Choice ${incorrectOptions[2].letter} is incorrect; it overcounts by 1.`
    };
  }
};

/**
 * Question ID: 3d985614
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1-5 feet, y: 2-17 feet, slope: ~3.3, intercept: ~0.82]
 * - Difficulty factors: [Identifying line of best fit equation from scatterplot]
 * - Distractor patterns: [A (swapped m and b), B (wrong sign on intercept), C (correct), D (swapped and wrong)]
 * - Constraints: [Positive slope ~3.3, positive intercept ~0.8]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with positive trend]
 */