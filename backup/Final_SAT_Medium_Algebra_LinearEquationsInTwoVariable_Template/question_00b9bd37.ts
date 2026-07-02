import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 00b9bd37
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercepts: (0,35), (90,0), slope: -7/18]
 * - Difficulty factors: [Finding equation from intercepts]
 * - Distractor patterns: [A/C: slope-intercept wrong values, B: correct, D: swapped coefficients]
 * - Constraints: [Clean integer coefficients in standard form]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs line plot with intercepts]
 */

export const generator_00b9bd37 = {
  metadata: {
    // id: "00b9bd37",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters for standard form Ax + By = C
    const A = getRandomInt(5, 20);
    const B = getRandomInt(5, 20);
    const C = A * B * getRandomInt(3, 6);
    
    const yInt = C / B;
    const xInt = C / A;
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
      { text: `$y = ${Math.round(slope)}x + ${A}$`, isCorrect: false },
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
      questionText: `The graph models the relationship between the number of T-shirts, $x$, and the number of sweatshirts, $y$, that Kira can purchase for a school fundraiser. Which equation could represent this relationship?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The intercepts are $(0, ${yInt})$ and $(${xInt}, 0)$. In $${A}x + ${B}y = ${C}$, when $x=0$, $${B}y=${C}$ so $y=${yInt}$. When $y=0$, $${A}x=${C}$ so $x=${xInt}$. This matches the graph.`
    };
  }
};