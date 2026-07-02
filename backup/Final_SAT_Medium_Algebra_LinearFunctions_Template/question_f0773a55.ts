import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f0773a55
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [graph: y = 20x + 50, slope interpretation]
 * - Difficulty factors: [Interpreting slope in cost context]
 * - Distractor patterns: [B = y-intercept, C = wrong values, D = total cost]
 * - Constraints: [Must have Mafs figure]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs graph]
 */

export const generator_f0773a55 = {
  metadata: {
    // id: "f0773a55",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Hourly rate: 15-40
    const hourlyRate = getRandomInt(15, 40);
    // One-time fee: 40-80
    const fee = getRandomInt(40, 80);
    // Show range
    const maxX = 4;
    
    // STEP 2: Build Mafs code
    const _svg_0 = hourlyRate * maxX + fee + 20; const _svg_1 = fee - 20; const _svg_2 = maxX + 1;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="transparent"/>${(() => {
      const xmin=-1, xmax=_svg_2;
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
      const xmin = -1;
      const xmax = ${maxX + 1};
      const ymin = ${fee - 20};
      const ymax = ${hourlyRate * maxX + fee + 20};
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = ${hourlyRate;
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: `The electrician's hourly rate`, isCorrect: true },
      { text: `The electrician's onetime fee`, isCorrect: false, reason: "describes the y-intercept, not the slope" },
      { text: `The maximum amount that the electrician charges`, isCorrect: false, reason: "incorrect interpretation" },
      { text: `The total amount that the electrician charges`, isCorrect: false, reason: "describes the total cost function, not specifically the slope" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `The graph represents the total charge, in dollars, by an electrician for $x$ hours of work. The electrician charges a onetime fee plus an hourly rate. What is the best interpretation of the slope of the graph?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `The electrician's hourly rate`,
      explanation: `Choice ${correctLetter} is correct. In a linear model $y = mx + b$, the slope $m$ represents the rate of change. Here, it represents the additional cost per hour, which is the hourly rate of $${hourlyRate}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 53487897
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 8, point: (2,18), y = 8x + 2]
 * - Difficulty factors: [Finding equation from slope and point]
 * - Distractor patterns: [A = swapped values, B = wrong intercept, D = wrong calculation]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */