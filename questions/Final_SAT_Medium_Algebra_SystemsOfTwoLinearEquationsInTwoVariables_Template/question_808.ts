import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question 808
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, 5, 2, -1 (single digit), intercepts vary]
 * - Difficulty factors: [Graph identification from intercepts]
 * - Distractor patterns: [Graph A, B, C, D]
 * - Constraints: [Mafs graph showing correct intercepts]
 * - Question type: [Multiple Choice with Figure]
 * - Figure generation: [Mafs - two lines with specific intercepts]
 */

export const generator_808 = {
  metadata: {
    id: "808",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation parameters
    const a1 = getRandomInt(1, 3);
    const b1 = getRandomInt(3, 7);
    const c1 = a1 * getRandomInt(1, 3); // Ensure clean intercepts
    
    const a2 = getRandomInt(1, 3);
    const c2 = getRandomInt(3, 6);
    
    // Calculate intercepts for line 1: a1*x + b1*y = c1
    const interceptX1 = c1 / a1;
    const interceptY1 = c1 / b1;
    
    // Calculate intercepts for line 2: a2*x - y = c2 (y = a2*x - c2)
    const interceptX2 = c2 / a2;
    const interceptY2 = -c2; // When x=0, y=-c2
    
    // Calculate viewBox bounds
    const allX = [0, interceptX1, interceptX2];
    const allY = [0, interceptY1, interceptY2];
    const xMin = Math.floor(Math.min(...allX)) - 2;
    const xMax = Math.ceil(Math.max(...allX)) + 2;
    const yMin = Math.floor(Math.min(...allY)) - 2;
    const yMax = Math.ceil(Math.max(...allY)) + 2;
    
    // STEP 2: Build Mafs code with complete viewBox
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
        const y = ((c1);
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
        const y = (a2);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 3: Build question text
    const questionText = `$$\\begin{cases} ${a1}x+${b1}y=${c1} \\\\ ${a2}x-y=${-c2} \\end{cases}$$ \n\nWhich of the following graphs in the xy-plane could be used to solve the system of equations above?`;
    
    // STEP 4: Create options (graphs - simplified as text for this example)
    const optionsData = [
      { text: "Graph A", isCorrect: false },
      { text: "Graph B", isCorrect: false },
      { text: "Graph C", isCorrect: true },
      { text: "Graph D", isCorrect: false }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 6: Return question data
    return {
      questionText: questionText,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption!.text,
      explanation: `Choice ${correctLetter} is correct. The line $${a1}x+${b1}y=${c1}$ has intercepts $(${interceptX1.toFixed(1)},0)$ and $(0,${interceptY1.toFixed(1)})$. The line $${a2}x-y=${-c2}$ has intercepts $(${interceptX2.toFixed(1)},0)$ and $(0,${interceptY2.toFixed(1)})$. Graph C is the only one showing lines passing through these sets of points.`
    };
  }
};

/**
 * Question 808
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 1/9, 1/2 (simple fractions)]
 * - Difficulty factors: [Fractional coefficients, setting equal to solve]
 * - Distractor patterns: [-9, -7, 0, 2]
 * - Constraints: [Clean fraction arithmetic, x=0 solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */