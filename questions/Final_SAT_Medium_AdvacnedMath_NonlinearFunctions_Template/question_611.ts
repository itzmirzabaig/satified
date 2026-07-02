import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 611
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Graph interpretation - ratio of values
 * - Number ranges: Quadratic growth from (0,6) to (1,9)
 * - Difficulty: Medium - reading graph points and calculating ratio
 * - Figure: Mafs graph with points (0,6) and (1,9)
 * - Distractor patterns: Wrong point selection, ratio inversion
 */

export const generator_611 = {
  metadata: {
    id: "611",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // Generate quadratic parameters: y = ax² + bx + c
    // At x=0, y=c; we want c and a+b+c to have nice ratio
    const c = getRandomInt(4, 8); // y-intercept
    const growthFactor = getRandomInt(14, 18) / 10; // 1.4 to 1.8
    const yAt1 = Math.round(c * growthFactor); // y when x=1
    
    // Ensure clean numbers
    const a = yAt1 - c; // since at x=1: a(1)² + b(1) + c = yAt1, and b=0 for simplicity
    // Actually let's use y = a*x² + c form for cleaner generation
    // At x=0: y=c, at x=1: y=a+c, at x=2: y=4a+c
    
    const _svg_0 = yAt1 + 6;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=3;
      const ymin=-1,ymax=_svg_0;
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
      const xmin=-1,xmax=3;
      const ymin=-1,ymax=(yAt1 + 6);
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(0),cy=my((c));
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}${(() => {
      const xmin=-1,xmax=3;
      const ymin=-1,ymax=(yAt1 + 6);
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(1),cy=my((yAt1));
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}</svg></div>`;
    
    const ratio = (yAt1 / c).toFixed(1);
    const ratioHalf = (yAt1 / c / 2).toFixed(1);
    const ratioDouble = ((yAt1 / c) * 2).toFixed(1);
    const ratioPlusOne = ((yAt1 / c) + 1).toFixed(1);
    
    const questionText = `The graph gives the estimated population $y$, in thousands, of a town $x$ years since 2003, where $0 \\leq x \\leq 5$. Which of the following best describes the increase in the estimated population from $x = 0$ to $x = 1$?`;
    
    const correctAnswer = `The estimated population at $x=1$ is ${ratio} times the estimated population at $x=0$.`;
    
    const optionsData = [
      { text: `The estimated population at $x=1$ is ${ratioHalf} times the estimated population at $x=0$.`, isCorrect: false, reason: "underestimates the ratio" },
      { text: `The estimated population at $x=1$ is ${ratio} times the estimated population at $x=0$.`, isCorrect: true },
      { text: `The estimated population at $x=1$ is ${ratioPlusOne} times the estimated population at $x=0$.`, isCorrect: false, reason: "adds 1 to the ratio instead of calculating correctly" },
      { text: `The estimated population at $x=1$ is ${ratioDouble} times the estimated population at $x=0$.`, isCorrect: false, reason: "doubles the correct ratio" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. From the graph, at $x=0$, $y=${c}$ and at $x=1$, $y=${yAt1}$. The ratio is $${yAt1}/${c}=${ratio}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};
