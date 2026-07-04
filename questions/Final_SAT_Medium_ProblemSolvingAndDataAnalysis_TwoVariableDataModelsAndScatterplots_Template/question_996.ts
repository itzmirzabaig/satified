import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 996
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 0-5, y: 16000-40000, slope: ~4680, intercept: ~16090]
 * - Difficulty factors: [Identifying equation from line with scaled y-axis]
 * - Distractor patterns: [A (correct), B (swapped coefficients), C (wrong slope), D (swapped and wrong)]
 * - Constraints: [y-intercept ~16000, slope ~4700]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Line with scaled y-axis labels]
 */

export const generator_996 = {
  metadata: {
    id: "996",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate line parameters
    const intercept = getRandomInt(15000, 17000);
    const slope = getRandomInt(4500, 4900);
    
    // Calculate viewBox bounds
    const xMin = -1;
    const xMax = 6;
    const yMin = 14000;
    const yMax = 42000;
    
    // STEP 2: Build Mafs code
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
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
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(0),cy=my((intercept));
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(5),cy=my((slope * 5 + intercept));
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}</svg></div>`;
    
    // STEP 3: Create options
    const correctEquation = `n = ${intercept.toLocaleString()} + ${slope.toLocaleString()} t`;
    const swappedEquation = `n = ${slope.toLocaleString()} + ${intercept.toLocaleString()} t`;
    const wrongSlopeEquation = `n = ${intercept.toLocaleString()} + ${(slope * 2).toLocaleString()} t`;
    const wrongEquation = `n = ${(slope * 2).toLocaleString()} + ${intercept.toLocaleString()} t`;
    
    const optionsData = [
      { text: correctEquation, isCorrect: true, role: 'correct' },
      { text: swappedEquation, isCorrect: false, role: 'swap' },
      { text: wrongSlopeEquation, isCorrect: false, role: 'doubleSlope' },
      { text: wrongEquation, isCorrect: false, role: 'doubleSlopeSwap' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    // Look up each distractor by its construction role so the reason always
    // matches the option it is attached to, regardless of shuffle order.
    const byRole = (r: string) => shuffledOptions.find(o => o.role === r)!;
    const swapLetter = byRole('swap').letter;
    const doubleSlopeLetter = byRole('doubleSlope').letter;
    const doubleSlopeSwapLetter = byRole('doubleSlopeSwap').letter;

    const yAt5 = slope * 5 + intercept;
    const interceptApprox = Math.round(intercept / 1000) * 1000;

    return {
      questionText: "Which of the following could be an equation of the line of best fit shown?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctLetter} is correct. The $y$-intercept is approximately ${interceptApprox.toLocaleString()}. Using the points $(0, ${intercept.toLocaleString()})$ and $(5, ${yAt5.toLocaleString()})$, the slope $≈ (${yAt5.toLocaleString()} - ${intercept.toLocaleString()}) / 5 = ${slope.toLocaleString()}$. Choice ${correctLetter} matches these estimates. Choice ${swapLetter} is incorrect; it swaps the slope and the $y$-intercept. Choice ${doubleSlopeLetter} is incorrect; it keeps the correct $y$-intercept but uses a slope that is twice too large. Choice ${doubleSlopeSwapLetter} is incorrect; it uses that doubled slope as the constant and puts the $y$-intercept on $t$, so both values are wrong.`
    };
  }
};
