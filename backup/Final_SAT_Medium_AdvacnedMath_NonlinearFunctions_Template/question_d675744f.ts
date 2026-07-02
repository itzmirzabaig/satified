import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: d675744f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y = 4(2^x), y-intercept (0,4), points (1,8), (2,16), (3,32), (4,64)]
 * - Difficulty factors: [Graph matching for exponential, key points verification]
 * - Distractor patterns: [A/B: decreasing functions, C: wrong base or scale]
 * - Constraints: [Must pass through (0,4) and double each x increment]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs Graph]
 */

export const generator_d675744f = {
  metadata: {
    // id: "d675744f",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y = 4(2^x)
    // Randomize: coefficient (2-6), base (2 or 3)
    const coeff = getRandomInt(2, 6); // 2 to 6
    const base = getRandomInt(2, 3); // 2 or 3
    
    // STEP 2: Calculate key points
    const y0 = coeff;
    const y1 = coeff * base;
    const y2 = coeff * base * base;
    const y3 = coeff * Math.pow(base, 3);
    const y4 = coeff * Math.pow(base, 4);
    const maxY = y4 * 1.1;
    
    // STEP 3: Build Mafs code
    const _svg_0 = maxY;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=5;
      const ymin=-5,ymax=_svg_0;
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
      const xmin=-1,xmax=5;
      const ymin=-5,ymax=${maxY};
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(0),cy=my(${y0);
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}${(() => {
      const xmin=-1,xmax=5;
      const ymin=-5,ymax=${maxY};
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(1),cy=my(${y1);
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}${(() => {
      const xmin=-1,xmax=5;
      const ymin=-5,ymax=${maxY};
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(2),cy=my(${y2);
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}${(() => {
      const xmin=-1,xmax=5;
      const ymin=-5,ymax=${maxY};
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(3),cy=my(${y3);
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}${(() => {
      const xmin=-1,xmax=5;
      const ymin=-5,ymax=${maxY};
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(4),cy=my(${y4);
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}</svg></div>`;
    
    // STEP 4: Build question text
    const questionText = `Which of the following is the graph in the xy-plane of the given equation? $$y = ${coeff}(${base}^x)$$`;
    
    // STEP 5: Create options with tracking
    const optionsData = [
      { text: `Graph of a decreasing exponential function.`, isCorrect: false, reason: "the given equation shows growth, not decay" },
      { text: `Graph of a decreasing exponential function with a different base.`, isCorrect: false, reason: "the given equation shows growth, not decay" },
      { text: `Graph of an exponential function with a growth factor greater than ${base}.`, isCorrect: false, reason: `the growth factor is exactly ${base}, not greater` },
      { text: `Graph of an exponential function with a y-intercept at (0, ${y0}) and points (1, ${y1}), (2, ${y2}), (3, ${y3}), and (4, ${y4}).`, isCorrect: true }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `Graph of an exponential function with a y-intercept at (0, ${y0}) and points (1, ${y1}), (2, ${y2}), (3, ${y3}), and (4, ${y4}).`;
    
    // STEP 7: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The y-intercept is $(0,${y0})$ because $y=${coeff}(${base}^0)=${coeff}$. For each increase of 1 in $x$, $y$ is multiplied by ${base}. Thus, the graph passes through $(1, ${y1})$, $(2, ${y2})$, $(3, ${y3})$, and $(4, ${y4})$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    // STEP 8: Return question data
    return {
      questionText: questionText,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: f880f910
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 270, base = height + 12, solution: height = 18]
 * - Difficulty factors: [Triangle area formula, setting up quadratic, solving]
 * - Distractor patterns: [A/C/D: various calculation errors]
 * - Constraints: [Area = 0.5 * base * height, base = h + 12]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */