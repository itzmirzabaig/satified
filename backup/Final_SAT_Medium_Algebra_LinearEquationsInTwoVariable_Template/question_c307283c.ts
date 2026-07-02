import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c307283c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1, intercept: -8, points: (0,-8), (-8,0)]
 * - Difficulty factors: [Identifying slope and intercept from graph]
 * - Distractor patterns: [A: wrong slope, B: wrong sign, C: correct, D: wrong slope]
 * - Constraints: [Line passes through clear integer points]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs line plot with intercept points]
 */

export const generator_c307283c = {
  metadata: {
    // id: "c307283c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const slope = getRandomElement([-2, -1, 1, 2]);
    const intercept = getRandomInt(-10, -3);
    const xInt = -intercept / slope;
    
    // Ensure xInt is clean integer - use while loop instead of recursion
    let attempts = 0;
    let validSlope = slope;
    let validIntercept = intercept;
    let validXInt = xInt;
    
    while ((!Number.isInteger(validXInt) || validXInt === 0) && attempts < 100) {
      validSlope = getRandomElement([-2, -1, 1, 2]);
      validIntercept = getRandomInt(-10, -3);
      validXInt = -validIntercept / validSlope;
      attempts++;
    }
    
    // If still not valid, force valid values
    if (!Number.isInteger(validXInt) || validXInt === 0) {
      validSlope = -1;
      validIntercept = -8;
      validXInt = 8;
    }
    
    // STEP 2: Build Mafs code
    const minX = Math.min(0, validXInt) - 2;
    const maxX = Math.max(0, validXInt) + 2;
    const minY = Math.min(0, validIntercept) - 2;
    const maxY = Math.max(0, validIntercept) + 2;
    
    const _svg_0 = maxY; const _svg_1 = minY; const _svg_2 = maxX; const _svg_3 = minX;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_3,xmax=_svg_2;
      const ymin=_svg_1,ymax=_svg_0;
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Border
      s+='<rect x="'+P+'" y="'+P+'" width="'+(W-2*P)+'" height="'+(H-2*P)+'" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>';
      // X axis
      const y0=Math.max(ymin,Math.min(ymax,0));
      s+='<line x1="'+P+'" y1="'+my(y0)+'" x2="'+(W-P)+'" y2="'+my(y0)+'" stroke="currentColor" stroke-width="1.5"/>';
      // Y axis
      const x0=Math.max(xmin,Math.min(xmax,0));
      s+='<line x1="'+mx(x0)+'" y1="'+P+'" x2="'+mx(x0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      // X tick labels
      const xstep=Math.ceil((xmax-xmin)/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        s+='<line x1="'+mx(x)+'" y1="'+my(y0)+'" x2="'+mx(x)+'" y2="'+(my(y0)+4)+'" stroke="currentColor" stroke-width="1"/>';
        s+='<text x="'+mx(x)+'" y="'+(my(y0)+15)+'" text-anchor="middle" font-size="10" fill="currentColor">'+x+'</text>';
      }
      // Y tick labels
      const ystep=Math.ceil((ymax-ymin)/6);
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        s+='<line x1="'+(mx(x0)-4)+'" y1="'+my(y)+'" x2="'+mx(x0)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="1"/>';
        s+='<text x="'+(mx(x0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="10" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=${minX},xmax=${maxX};
      const ymin=${minY},ymax=${maxY};
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(0),cy=my(${validIntercept);
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}</svg></div>`;
    
    // STEP 3: Create options
    const wrongSlope1 = validSlope * 2;
    const wrongSlope2 = validSlope === -1 ? 1 : -1;
    
    const optionsData = [
      { text: `$y = ${wrongSlope1}x ${validIntercept < 0 ? '-' : '+'} ${Math.abs(validIntercept)}$`, isCorrect: false },
      { text: `$y = ${Math.abs(validSlope)}x ${validIntercept < 0 ? '-' : '+'} ${Math.abs(validIntercept)}$`, isCorrect: false },
      { text: `$y = ${validSlope}x ${validIntercept < 0 ? '-' : '+'} ${Math.abs(validIntercept)}$`, isCorrect: true },
      { text: `$y = ${wrongSlope2}x ${validIntercept < 0 ? '-' : '+'} ${Math.abs(validIntercept)}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `What is an equation of the graph shown?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The line passes through $(0, ${validIntercept})$ and $(${validXInt}, 0)$. The slope is $m = \\frac{0 - (${validIntercept})}{${validXInt} - 0} = \\frac{${-validIntercept}}{${validXInt}} = ${validSlope}$. The y-intercept is ${validIntercept}. Thus, $y = ${validSlope}x ${validIntercept < 0 ? '-' : '+'} ${Math.abs(validIntercept)}$.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-2e0290c3.ts
/**
 * Question ID: 2e0290c3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-intercept: 60, y-intercept: 40, slope: -2/3]
 * - Difficulty factors: [Finding equation from intercepts]
 * - Distractor patterns: [A/C: slope-intercept wrong values, B: correct, D: swapped coefficients]
 * - Constraints: [Clean integer intercepts]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs line plot with intercept points]
 */
