import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 797a81fb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 6/7, intercepts: 18/7 and -18/7]
 * - Difficulty factors: [Visual identification of parallel lines from graph]
 * - Distractor patterns: [One solution (intersecting), two solutions (impossible), infinite (same line)]
 * - Constraints: [Lines must be parallel and distinct]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two parallel lines with same slope, different intercepts]
 */

export const generator_797a81fb = {
  metadata: {
    // id: "797a81fb",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const num = getRandomInt(2, 8);
    const den = getRandomInt(3, 9);
    
    const b1 = getRandomInt(1, 5);
    const b2 = b1 + getRandomInt(1, 4);
    
    // Calculate viewBox
    const xMin = -10;
    const xMax = 10;
    const yMin = Math.min(-10, -b2 - 2);
    const yMax = Math.max(10, b1 + 2);
    
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
        const y = (${num;
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
        const y = (${num;
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    const optionsData = [
      { text: "Exactly one", isCorrect: false, reason: "would require the lines to intersect at one point" },
      { text: "Exactly two", isCorrect: false, reason: "is impossible for a system of linear equations" },
      { text: "Infinitely many", isCorrect: false, reason: "would require the lines to be identical" },
      { text: "Zero", isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: "How many solutions does the given system of equations have?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Zero",
      explanation: `Choice ${correctLetter} is correct. The lines are parallel and distinct because they share the same slope ($\\frac{${num}}{${den}}$) but have different y-intercepts (${b1} and $-${b2}$). Thus, they never intersect, resulting in zero solutions. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: b5f62071
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 3/7, intercepts: -3/14 and -1/224, r value: -28]
 * - Difficulty factors: [No solution condition, solving for parameter r]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Slopes equal when r = -28]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two parallel lines, need to show they don't intersect]
 */