import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 52cb8ea4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 7/5, -4/5, 4/8=1/2, -9/8]
 * - Difficulty factors: [Clever elimination without solving individually, 3x+3y directly]
 * - Distractor patterns: [Sign errors, solving individually then adding]
 * - Constraints: [Subtracting equations must give clean 3x+3y value]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two intersecting lines]
 */

export const generator_52cb8ea4 = {
  metadata: {
    // id: "52cb8ea4",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const target = getRandomInt(-10, 10, [0]);
    
    const a1 = getRandomInt(5, 9);
    const a2 = a1 - 3;
    const b1 = getRandomInt(3, 8);
    const b2 = b1 + 3;
    
    const c1 = getRandomInt(1, 10);
    const c2 = c1 - target;
    
    // Calculate viewBox
    const xMin = -2;
    const xMax = 2;
    const yMin = -2;
    const yMax = 2;
    
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
      const xmin = ${xMin};
      const xmax = ${xMax};
      const ymin = ${yMin};
      const ymax = ${yMax};
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = (${a1;
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}${
    (() => {
      const pts = [];
      const xmin = ${xMin};
      const xmax = ${xMax};
      const ymin = ${yMin};
      const ymax = ${yMax};
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = (${a2;
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    const correctAnswer = target;
    
    const dist1 = -target;
    const dist2 = target + getRandomInt(5, 10);
    const dist3 = -target - getRandomInt(2, 5);
    
    const optionsData = [
      { text: dist1.toString(), isCorrect: false },
      { text: dist2.toString(), isCorrect: false },
      { text: correctAnswer.toString(), isCorrect: true },
      { text: dist3.toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `If $(x, y)$ is the solution to the system of equations above, what is the value of $3x + 3y$? $$${a1}x - ${b1}y = ${c1}$$ $$${a2}x - ${b2}y = ${c2}$$`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer.toString(),
      explanation: `Choice ${correctLetter} is correct. Subtracting the second equation from the first gives $(${a1}x - ${b1}y) - (${a2}x - ${b2}y) = ${c1} - ${c2}$, which simplifies to $3x + 3y = ${correctAnswer}$.`
    };
  }
};

/**
 * Question ID: 2162540
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [mass: 50g, percentages: 30%, 80%, 50%, final answer: 16g]
 * - Difficulty factors: [Word problem, mixture problem, system of equations]
 * - Distractor patterns: [Wrong piece mass, total silicon instead of piece silicon]
 * - Constraints: [System must have clean integer solution]
 * - Question type: [Figure+Table→Multiple Choice Text]
 * - Figure generation: [Graph showing the two lines intersecting]
 */