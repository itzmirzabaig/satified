import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



export const generator_545 = {
  metadata: {
    id: "545",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const r1 = -1 * getRandomInt(3, 8);
    const r2 = 0;
    const r3 = getRandomInt(3, 7);
    const leadingCoeff = -1 * (getRandomInt(5, 20) / 100);
    
    // Calculate viewBox bounds
    const xMin = Math.min(r1, r2, r3) - 2;
    const xMax = Math.max(r1, r2, r3) + 2;
    const yMin = -15;
    const yMax = 35;
    
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
      const cx=mx(0),cy=my(0);
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}</svg></div>`;
    
    const questionText = `Which of the following could be the equation of the graph shown in the $xy$-plane?`;
    
    const optionsData = [
      { text: `$y=${leadingCoeff}x(x-${r3})(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)})$`, isCorrect: false, reason: `the graph touches but does not cross the x-axis at $x=${r1}$, so the factor $(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)})$ must have an even exponent` },
      { text: `$y=${leadingCoeff}x(x-${r3})(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)})^{2}$`, isCorrect: true },
      { text: `$y=${leadingCoeff}x(x${r3 >= 0 ? '-' : '+'}${Math.abs(r3)})(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)})$`, isCorrect: false, reason: `the root at $x=${r3}$ should be $x=${r3}$, not $x=${-r3}` },
      { text: `$y=${leadingCoeff}x(x${r3 >= 0 ? '-' : '+'}${Math.abs(r3)})^{2}(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)})$`, isCorrect: false, reason: `the root at $x=${r3}$ crosses the axis (single), while the root at $x=${r1}$ touches (double), so the exponents are swapped` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$y=${leadingCoeff}x(x-${r3})(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)})^{2}$`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The graph shown has x-intercepts at $x=${r2}$, $x=${r3}$, and $x=${r1}$. Therefore, the equation must have factors of $x$, $(x-${r3})$, and $(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)})$. Since the graph touches but does not cross the x-axis at $x=${r1}$, the factor $(x${r1 >= 0 ? '-' : '+'}${Math.abs(r1)})$ must have an even exponent. Only Choice ${correctLetter} fits these criteria. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};