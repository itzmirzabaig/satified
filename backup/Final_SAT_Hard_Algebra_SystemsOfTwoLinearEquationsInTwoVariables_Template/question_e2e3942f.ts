import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: e2e3942f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2, intercepts: 1 and -8, answer: 2]
 * - Difficulty factors: [No solution from graph, identifying parameter]
 * - Distractor patterns: [Sign errors, wrong slope identification]
 * - Constraints: [a must equal slope]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two parallel lines]
 */

export const generator_e2e3942f = {
  metadata: {
    // id: "e2e3942f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);
    const b1 = getRandomInt(1, 5);
    const b2 = b1 - getRandomInt(5, 10); // Different intercept
    
    // Calculate viewBox
    const xMin = -5;
    const xMax = 5;
    const yMin = -10;
    const yMax = 5;
    
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
        const y = ${slope;
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
        const y = ${slope;
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    const correctAnswer = slope;
    const distractors = [
      -1/slope,
      0,
      slope - 1
    ];
    
    const optionsData = [
      { text: distractors[0].toFixed(2), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: distractors[2].toString(), isCorrect: false },
      { text: correctAnswer.toString(), isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `In the system of equations above, $a$ is a constant. If the system of equations has no solution, what is the value of $a$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer.toString(),
      explanation: `Choice ${correctLetter} is correct. For no solution, the lines must be parallel. Both lines have slope ${slope}, so $a = ${slope}$.`
    };
  }
};

/**
 * Question ID: f03465dc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 8, 7, 24, 21, constants: 9, 27]
 * - Difficulty factors: [Equivalent equations, parametric solution form]
 * - Distractor patterns: [Swapped coordinates, wrong slope]
 * - Constraints: [Equations must be equivalent (second = first * 3)]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: null
 */