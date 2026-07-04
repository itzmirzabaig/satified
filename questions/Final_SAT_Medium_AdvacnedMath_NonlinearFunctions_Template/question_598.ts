import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_598 = {
  metadata: {
    id: "598",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const r1 = -1 * getRandomInt(2, 4);
    const r2 = 0;
    const r3 = getRandomInt(2, 4);
    
    const b = -(r1 + r3);
    const c = r1 * r3;
    
    // Calculate viewBox bounds
    const xMin = Math.min(r1, r2, r3) - 2;
    const xMax = Math.max(r1, r2, r3) + 2;
    const yMin = -8;
    const yMax = 8;
    
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
      const rootA=(r1),rootB=(r2),rootC=(r3);
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      // Base cubic through the three roots
      const base=(x)=>(x-rootA)*(x-rootB)*(x-rootC);
      // Scale so the curve's peaks reach ~6 (stay inside ymin..ymax=+/-8)
      let peak=0;
      for(let x=xmin;x<=xmax;x+=0.05){const v=Math.abs(base(x));if(v>peak)peak=v;}
      const a=peak>0?6/peak:1;
      const f=(x)=>a*base(x);
      // Plot the cubic as a polyline, clipped to the visible y-range
      let pts='';
      for(let x=xmin;x<=xmax+1e-9;x+=0.1){
        const y=f(x);
        if(y<ymin-0.5||y>ymax+0.5)continue;
        pts+=mx(x).toFixed(2)+','+my(y).toFixed(2)+' ';
      }
      let g='<polyline points="'+pts.trim()+'" fill="none" stroke="#2563eb" stroke-width="2"/>';
      // Mark the three x-intercepts
      [rootA,rootB,rootC].forEach((rt)=>{
        g+='<circle cx="'+mx(rt).toFixed(2)+'" cy="'+my(0).toFixed(2)+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
      });
      return g;
    })()}</svg></div>`;
    
    const questionText = `The graph of $y = f(x)$ is shown, where the function $f$ is defined by $f(x) = ax^3 + bx^2 + cx + d$ and $a, b, c,$ and $d$ are constants. For how many values of $x$ does $f(x) = 0$?`;
    
    const optionsData = [
      { text: `One`, isCorrect: false, reason: "the graph clearly crosses the x-axis at three distinct points" },
      { text: `Two`, isCorrect: false, reason: "the graph crosses the x-axis at three distinct points, not two" },
      { text: `Three`, isCorrect: true },
      { text: `Four`, isCorrect: false, reason: "a cubic function can have at most three real roots" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `Three`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The equation $f(x) = 0$ corresponds to the points where the graph of the function intersects the x-axis. As seen in the figure, the graph crosses the x-axis at three distinct points: $(${r1}, 0)$, $(0, 0)$, and $(${r3}, 0)$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};