import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



export const generator_95d1c344 = {
  metadata: {
    // id: "95d1c344",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const h = getRandomInt(2, 5);
    const k = getRandomInt(2, 5);
    const a = 0.2;
    const yIntercept = a * h * h + k;
    const maxY = Math.max(yIntercept, k) + 2;
    
    const _svg_0 = maxY;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=7;
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
      const xmin=-1,xmax=7;
      const ymin=-1,ymax=${maxY};
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(0),cy=my(${yIntercept);
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}</svg></div>`;
    
    const questionText = `The graph models the number of active projects a company was working on $x$ months after the end of November 2012, where $0 \\\\leq x \\\\leq 6$. According to the model, what is the predicted number of active projects the company was working on at the end of November 2012?`;
    
    const optionsData = [
      { text: `$0$`, isCorrect: false, reason: "this is the value of $x$, not the number of projects" },
      { text: `$${yIntercept}$`, isCorrect: true },
      { text: `$${Math.floor(k + yIntercept)}$`, isCorrect: false, reason: "this appears to be a distractor value not clearly related to the graph" },
      { text: `$${Math.floor(yIntercept + 4)}$`, isCorrect: false, reason: "this appears to be the y-coordinate of the vertex plus an arbitrary value" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${yIntercept}`;
    
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The graph models the number of active projects $x$ months after the end of November 2012. Therefore, the value of $x$ that corresponds to the end of November 2012 is 0. The point at which $x=0$ is the y-intercept of the graph. It follows that the y-intercept of the graph shown is the point $(0,${yIntercept})$. Therefore, the predicted number of active projects at the end of November 2012 was ${yIntercept}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};