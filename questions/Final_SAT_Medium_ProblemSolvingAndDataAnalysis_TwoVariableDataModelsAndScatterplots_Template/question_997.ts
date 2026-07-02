import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 997
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1-5 feet, y: 2-17 feet, slope: ~3.3, intercept: ~0.82]
 * - Difficulty factors: [Identifying line of best fit equation from scatterplot]
 * - Distractor patterns: [A (swapped m and b), B (wrong sign on intercept), C (correct), D (swapped and wrong)]
 * - Constraints: [Positive slope ~3.3, positive intercept ~0.8]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with positive trend]
 */

export const generator_997 = {
  metadata: {
    id: "997",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate line parameters
    const slope = getRandomInt(28, 38) / 10; // 2.8 to 3.8
    const intercept = getRandomInt(5, 12) / 10; // 0.5 to 1.2
    
    // STEP 2: Generate 20 data points
    const points = [];
    for (let i = 0; i < 20; i++) {
      const x = getRandomInt(10, 50) / 10; // 1.0 to 5.0
      const noise = getRandomInt(-3, 4);
      const y = Math.max(2, Math.round(slope * x + intercept + noise));
      points.push({ x, y });
    }
    
    // Sort by x for consistency
    points.sort((a, b) => a.x - b.x);
    
    // Calculate viewBox bounds
    const xMin = 0;
    const xMax = 6;
    const yMin = 0;
    const yMax = 20;
    
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
    const correctEquation = `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`;
    const swappedEquation = `y = ${intercept.toFixed(2)}x + ${slope.toFixed(2)}`;
    const wrongSignIntercept = `y = ${slope.toFixed(2)}x - ${intercept.toFixed(2)}`;
    const wrongSlopeSign = `y = ${slope.toFixed(2)}x - ${slope.toFixed(2)}`;
    
    const optionsData = [
      { text: swappedEquation, isCorrect: false },
      { text: wrongSignIntercept, isCorrect: false },
      { text: correctEquation, isCorrect: true },
      { text: wrongSlopeSign, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: "Each dot in the scatterplot above represents the height $x$, in feet, in the high jump, and the distance $y$, in feet, in the long jump, made by each student in a group of twenty students. The graph of which of the following equations is a line that most closely fits the data?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctLetter} is correct. The line of best fit has an approximate slope of ${Math.round(slope)} and a positive $y$-intercept. Only choice ${correctLetter} represents a line with a slope close to ${Math.round(slope)} and a $y$-intercept near ${intercept.toFixed(2)}. Choice ${incorrectOptions[0].letter} is incorrect; it swaps the slope and intercept values. Choice ${incorrectOptions[1].letter} is incorrect; it has the wrong sign on the intercept. Choice ${incorrectOptions[2].letter} is incorrect; it has an incorrect intercept value.`
    };
  }
};
