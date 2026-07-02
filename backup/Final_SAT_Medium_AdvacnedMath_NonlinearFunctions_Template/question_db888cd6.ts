import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_db888cd6 = {
  metadata: {
    // id: "db888cd6",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initial = getRandomInt(5, 15);
    const baseNum = getRandomInt(6, 8);
    const base = baseNum / 10;
    const maxY = initial + 2;
    
    const _svg_0 = maxY;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=11;
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
      const xmin=-1,xmax=11;
      const ymin=-1,ymax=${maxY};
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(0),cy=my(${initial);
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}</svg></div>`;
    
    const questionText = `The graph gives the estimated number of catalogs $y$, in thousands, a company sent to its customers at the end of each year, where $x$ represents the number of years since the end of 1992, where $0 \\\\leq x \\\\leq 10$. Which statement is the best interpretation of the y-intercept in this context?`;
    
    const totalApprox = Math.floor(initial * 10);
    
    const optionsData = [
      { text: `The estimated total number of catalogs the company sent to its customers during the first 10 years was ${totalApprox},000.`, isCorrect: false, reason: "the y-intercept represents a single point in time, not a cumulative total" },
      { text: `The estimated total number of catalogs the company sent to its customers from the end of 1992 to the end of 2002 was ${initial * 10}.`, isCorrect: false, reason: "this misinterprets the scale and meaning of the y-intercept" },
      { text: `The estimated number of catalogs the company sent to its customers at the end of ${initial * 100} was ${initial}.`, isCorrect: false, reason: "this confuses the x and y values" },
      { text: `The estimated number of catalogs the company sent to its customers at the end of 1992 was ${initial},000.`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `The estimated number of catalogs the company sent to its customers at the end of 1992 was ${initial},000.`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The y-intercept of the graph is $(0,${initial})$. Since $x$ represents years after 1992, $x=0$ is the end of 1992. Since $y$ is in thousands, $y=${initial}$ represents ${initial},000 catalogs. Therefore, the estimated number of catalogs sent at the end of 1992 was ${initial},000. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};