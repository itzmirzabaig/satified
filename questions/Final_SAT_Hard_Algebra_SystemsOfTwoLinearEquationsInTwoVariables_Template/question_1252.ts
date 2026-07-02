import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1252
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 6, intercepts: 18 and 22]
 * - Difficulty factors: [No solution from graph, identify second equation]
 * - Distractor patterns: [Same intercept, wrong slope, wrong form]
 * - Constraints: [Correct option must have same slope, different intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two parallel lines]
 */

export const generator_1252 = {
  metadata: {
    id: "1252",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const slope = getRandomInt(3, 8);
    const b1 = getRandomInt(10, 25);
    const b2 = b1 + getRandomInt(3, 8);
    
    // Calculate viewBox
    const xMin = -5;
    const xMax = 5;
    const yMin = Math.floor(b1 / 10) * 10 - 5;
    const yMax = Math.ceil(b2 / 10) * 10 + 5;
    
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="transparent"/>${(() => {
      const xmin=_svg_3, xmax=_svg_2;
      const ymin=_svg_1, ymax=_svg_0;
      const W=400, H=300, P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      if(ymin<=0&&ymax>=0) s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      if(xmin<=0&&xmax>=0) s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      // Grid lines
      for(let x=Math.ceil(xmin); x<=Math.floor(xmax); x++) {
        if(x===0) continue;
        s+='<line x1="'+mx(x)+'" y1="'+P+'" x2="'+mx(x)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      for(let y=Math.ceil(ymin); y<=Math.floor(ymax); y++) {
        if(y===0) continue;
        s+='<line x1="'+P+'" y1="'+my(y)+'" x2="'+(W-P)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${
    (() => {
      const pts = [];
      const xmin = (xMin);
      const xmax = (xMax);
      const ymin = (yMin);
      const ymax = (yMax);
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = (slope);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}${
    (() => {
      const pts = [];
      const xmin = (xMin);
      const xmax = (xMax);
      const ymin = (yMin);
      const ymax = (yMax);
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = (slope);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    const optA = `-${slope}x + y = ${b1}`;
    const optB = `-${slope}x + y = ${b2}`;
    const optC = `-${2 * slope}x + y = ${2 * b1}`;
    const optD = `-${2 * slope}x + y = ${b1}`;
    
    const optionsData = [
      { text: optA, isCorrect: false, reason: "represents the same line, giving infinitely many solutions" },
      { text: optB, isCorrect: true },
      { text: optC, isCorrect: false, reason: "has a different slope, giving exactly one solution" },
      { text: optD, isCorrect: false, reason: "has a different slope, giving exactly one solution" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `One of the equations in a system of two linear equations is given. The system has no solution. Which equation could be the second equation in the system?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: optB,
      explanation: `Choice ${correctLetter} is correct. The given line can be written as $-${slope}x + y = ${b1}$. For no solution, the second equation must have the same slope but different y-intercept. Choice ${correctLetter} is $-${slope}x + y = ${b2}$, which satisfies this condition. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
