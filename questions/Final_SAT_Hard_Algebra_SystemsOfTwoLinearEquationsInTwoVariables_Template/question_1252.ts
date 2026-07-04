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

    // Viewing window: show the given line y = slope*x + b1 so both its
    // y-intercept (b1) and its slope are readable. Keep y=0 on-screen and
    // place the intercept comfortably inside the window.
    const xMin = -5;
    const xMax = 5;
    const yMin = 0;
    const yMax = Math.ceil((b1 + 3 * slope) / 5) * 5;

    // Round grid spacing so labels stay legible.
    const yStep = yMax <= 30 ? 5 : 10;

    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="transparent"/>${(() => {
      const xmin=xMin, xmax=xMax;
      const ymin=yMin, ymax=yMax;
      const W=400, H=300, P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const baseY = my(0);            // x-axis position (y = 0 is on-screen)
      let s='';
      // Vertical grid lines + x tick labels (labels sit just below the x-axis)
      for(let x=Math.ceil(xmin); x<=Math.floor(xmax); x++) {
        if(x!==0) s+='<line x1="'+mx(x)+'" y1="'+P+'" x2="'+mx(x)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+mx(x)+'" y="'+(baseY+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      // Horizontal grid lines + y tick labels
      for(let y=0; y<=ymax; y+=yStep) {
        if(y!==0) s+='<line x1="'+P+'" y1="'+my(y)+'" x2="'+(W-P)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      // Axes drawn last so they sit above the grid
      s+='<line x1="'+P+'" y1="'+baseY+'" x2="'+(W-P)+'" y2="'+baseY+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      return s;
    })()}${
    (() => {
      // The given line: y = slope*x + b1, clipped to the viewing window.
      const xmin = xMin, xmax = xMax;
      const ymin = yMin, ymax = yMax;
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      const pts = [];
      for(let i=0; i<=200; i++) {
        const x = xmin + (xmax-xmin)*i/200;
        const y = slope*x + b1;
        if(y>=ymin && y<=ymax) pts.push(mx(x)+','+my(y));
      }
      let out = '<polyline points="'+pts.join(' ')+'" fill="none" stroke="#3b82f6" stroke-width="2.5"/>';
      // Mark and label the y-intercept (0, b1) when it is inside the window.
      if(b1>=ymin && b1<=ymax){
        out += '<circle cx="'+mx(0)+'" cy="'+my(b1)+'" r="3.5" fill="#3b82f6"/>';
        out += '<text x="'+(mx(0)+8)+'" y="'+(my(b1)-4)+'" font-size="10" fill="#3b82f6">(0, '+b1+')</text>';
      }
      return out;
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
