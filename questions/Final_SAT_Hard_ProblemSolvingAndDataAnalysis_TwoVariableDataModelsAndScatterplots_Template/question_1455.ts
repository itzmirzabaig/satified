import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1455
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic coefficient: -1.674, linear: 19.76, constant: 745.73]
 * - Difficulty factors: [Recognizing parabola opens downward, identifying correct signs]
 * - Distractor patterns: [Wrong sign on quadratic, wrong sign on linear, wrong sign on constant, combinations]
 * - Constraints: [Negative quadratic coefficient = opens down, positive constant = positive y-intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parabola opening downward]
 */

export const generator_1455 = {
  metadata: {
    id: "1455",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Generate a downward opening parabola: y = -ax² + bx + c
    const a = getRandomInt(1, 3);
    const aDecimal = getRandomInt(1, 9);
    const aCoeff = -1 * parseFloat(`${a}.${aDecimal}`); // negative for downward
    
    const b = getRandomInt(10, 30);
    const bDecimal = getRandomInt(1, 9);
    const bCoeff = parseFloat(`${b}.${bDecimal}`); // positive linear
    
    const c = getRandomInt(600, 900);
    const cDecimal = getRandomInt(1, 99);
    const cConst = parseFloat(`${c}.${cDecimal}`); // positive constant
    
    // STEP 2: Calculate viewBox bounds
    // Vertex is at x = -b/(2a), but since a is negative, parabola opens down
    const vertexX = -bCoeff / (2 * aCoeff);
    const vertexY = aCoeff * vertexX * vertexX + bCoeff * vertexX + cConst;
    const xMin = -2;
    const xMax = 12;
    const yMin = vertexY - 50;
    const yMax = cConst + 50;
    
    // STEP 3: Build Mafs code
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
        const y = (aCoeff);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 4: Create options
    // All combinations of signs
    const absACoeff = Math.abs(aCoeff);
    
    const optionsData = [
      { text: `y=${absACoeff}x^2+${bCoeff}x-${cConst}`, isCorrect: false, reason: "has a positive quadratic coefficient, which would make the parabola open upward" },
      { text: `y=${aCoeff}x^2-${bCoeff}x-${cConst}`, isCorrect: false, reason: "has negative linear coefficient and negative constant" },
      { text: `y=${absACoeff}x^2+${bCoeff}x+${cConst}`, isCorrect: false, reason: "has a positive quadratic coefficient, which would make the parabola open upward" },
      { text: `y=${aCoeff}x^2+${bCoeff}x+${cConst}`, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Return question data
    return {
      questionText: `The scatterplot below shows the amount of electric energy generated, in millions of megawatt-hours, by nuclear sources over a 10‑year period. Of the following equations, which best models the data in the scatterplot?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `y=${aCoeff}x^2+${bCoeff}x+${cConst}`,
      explanation: `Choice ${correctLetter} is correct. The scatterplot shows a downward-opening parabola (negative $x^2$ coefficient) with a positive y-intercept around ${Math.round(cConst)}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
