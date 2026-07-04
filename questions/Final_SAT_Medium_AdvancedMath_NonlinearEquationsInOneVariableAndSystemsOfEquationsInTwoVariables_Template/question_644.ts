import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 644
* 
* ORIGINAL ANALYSIS:
* - Number ranges: [quadratic coefficient: 1, linear slope: 1, intercept: 2, viewBox: x[-3,4], y[-2,10]]
* - Difficulty factors: [System of equations, counting intersections, graph interpretation]
* - Distractor patterns: [A: 0 (thinks no intersection), B: 1 (finds only one), D: 3 (impossible for quadratic+linear)]
* - Constraints: [Discriminant > 0 for 2 real solutions, intersections must be visible in viewBox]
* - Question type: [Figure → Multiple Choice Text]
* - Figure generation: [Mafs: Quadratic + Linear with 2 intersection points]
*/

export const generator_644 = {
 metadata: {
   id: "644",
   assessment: "SAT",
   domain: "Advanced Math",
   skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
   difficulty: "Medium"
 },
 
 generate: (): QuestionData => {
   // STEP 1: Generate equation parameters ensuring 2 intersections
   // Quadratic: y = ax², Linear: y = mx + b
   // Intersections when ax² = mx + b => ax² - mx - b = 0
   // Discriminant = m² + 4ab > 0
   const a = getRandomInt(1, 2); // Keep simple like original (1)
   const m = getRandomInt(1, 3); // Slope
   const b = getRandomInt(1, 4); // Intercept
   
   // STEP 2: Calculate intersection points
   // x = (m ± sqrt(m² + 4ab)) / (2a)
   const discriminant = m * m + 4 * a * b;
   const sqrtDisc = Math.sqrt(discriminant);
   const x1 = (m - sqrtDisc) / (2 * a);
   const x2 = (m + sqrtDisc) / (2 * a);
   const y1 = a * x1 * x1;
   const y2 = a * x2 * x2;
   
   // Determine viewBox based on intersections (similar to original [-3,4] x [-2,10])
   const minX = Math.floor(Math.min(x1, x2, -1)) - 1;
   const maxX = Math.ceil(Math.max(x1, x2, 2)) + 1;
   const minY = Math.floor(Math.min(y1, y2, 0)) - 1;
   const maxY = Math.ceil(Math.max(y1, y2, 5)) + 1;
   
// STEP 3: Build Mafs code string with variables (Strictly mimicking original figure [3])
const _svg_0 = maxY; const _svg_1 = minY; const _svg_2 = maxX; const _svg_3 = minX;
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
      const xmin = (minX);
      const xmax = (maxX);
      const ymin = (minY);
      const ymax = (maxY);
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = (a * x * x);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="#3b82f6" stroke-width="2"/>';
    })()}${
    (() => {
      const pts = [];
      const xmin = (minX);
      const xmax = (maxX);
      const ymin = (minY);
      const ymax = (maxY);
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax; x+=(xmax-xmin)/100) {
        const y = (m * x + b);
        if(y>=ymin-1 && y<=ymax+1) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="#ef4444" stroke-width="2"/>';
    })()}</svg></div>`;
   
   // STEP 4: Create options (0, 1, 2, 3)
   const optionsData = [
     { text: "0", isCorrect: false },
     { text: "1", isCorrect: false },
     { text: "2", isCorrect: true },
     { text: "3", isCorrect: false }
   ];
   
   const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
     ...opt,
     letter: String.fromCharCode(65 + index)
   }));
   
   const correctLetter = shuffledOptions.find(o => o.isCorrect).letter;
   const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
   
   // STEP 5: Build explanation
   const explanation = `Choice ${correctLetter} is correct. The solutions to a system of two equations correspond to points where the graphs of the equations intersect. The given graphs ($y=${a === 1 ? '' : a}x^2$ and $y=${m}x+${b}$) intersect at 2 points: ($${x1.toFixed(1)}, ${y1.toFixed(1)}$) and ($${x2.toFixed(1)}, ${y2.toFixed(1)}$); therefore, the system has 2 solutions. Choice ${incorrectOptions[0].letter} is incorrect because the graphs intersect. Choice ${incorrectOptions[1].letter} is incorrect because the graphs intersect more than once. Choice ${incorrectOptions[2].letter} is incorrect; a quadratic and a linear equation cannot intersect more than twice.`;
   
   return {
    questionText: `A system of equations consists of a quadratic equation and a linear equation. The equations in this system are graphed in the $xy$-plane above. How many solutions does this system have?`,
    figureCode: mafsCode,
    options: shuffledOptions.map(o => ({ text: o.text })),
    correctAnswer: "2",
    explanation: explanation
    };
 }
};
