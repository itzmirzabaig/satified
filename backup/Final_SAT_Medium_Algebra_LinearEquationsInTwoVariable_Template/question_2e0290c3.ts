import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_2e0290c3 = {
  metadata: {
    // id: "2e0290c3",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    // Standard form: Ax + By = C where C is common multiple
    const A = getRandomInt(2, 15);
    const B = getRandomInt(2, 15);
    const C = A * B * getRandomInt(2, 4); // Ensures clean intercepts
    
    const xInt = C / A;
    const yInt = C / B;
    const slope = -A / B;
    
    // STEP 2: Build Mafs code
    const _svg_0 = yInt + 10; const _svg_1 = xInt + 10;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-10,xmax=_svg_1;
      const ymin=-10,ymax=_svg_0;
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
      const xmin=-10,xmax=${xInt + 10};
      const ymin=-10,ymax=${yInt + 10};
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(0),cy=my(${yInt);
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}</svg></div>`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: `$y = ${A}x + ${B}$`, isCorrect: false },
      { text: `$${A}x + ${B}y = ${C}$`, isCorrect: true },
      { text: `$y = ${B}x + ${A}$`, isCorrect: false },
      { text: `$${B}x + ${A}y = ${C}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `The graph shows the relationship between the number of shares of stock from Company A, $x$, and the number of shares of stock from Company B, $y$, that Simone can purchase. Which equation could represent this relationship?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The intercepts are $(0, ${yInt})$ and $(${xInt}, 0)$. In $${A}x + ${B}y = ${C}$, when $x=0$, $y=${yInt}$. When $y=0$, $x=${xInt}$.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-df78b361.ts
/**
 * Question ID: df78b361
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, 6, total: 36]
 * - Difficulty factors: [Interpreting term in context]
 * - Distractor patterns: [Confusing variable with term value]
 * - Constraints: [Clear interpretation of 6y]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
