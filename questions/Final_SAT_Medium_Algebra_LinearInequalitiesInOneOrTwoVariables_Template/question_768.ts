import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 768
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4, y-intercept: -4, test point: (6, -2)]
 * - Difficulty factors: [Graph interpretation, point-in-region testing]
 * - Distractor patterns: [Points not in shaded region or on wrong side of boundary]
 * - Constraints: [Must satisfy y ≤ 4x - 4]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs inequality graph]
 */

export const generator_768 = {
  metadata: {
    id: "768",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y ≤ 4x - 4 with point (6, -2)
    // Generate similar linear inequality with specific point
    const slope = getRandomInt(2, 6); // Moderate positive slope
    const yIntercept = getRandomInt(-6, -2); // Negative y-intercept
    const inequalityType = getRandomInt(0, 1) === 0 ? '<=' : '>='; // ≤ or ≥
    
    // Generate a point that satisfies the inequality
    // For y ≤ mx + b, we need y ≤ m*x + b
    const testX = getRandomInt(3, 8);
    const boundaryY = slope * testX + yIntercept;
    const testY = inequalityType === '<=' 
      ? boundaryY - getRandomInt(1, 5)  // Below line for ≤
      : boundaryY + getRandomInt(1, 5); // Above line for ≥
    
    // STEP 2: Create distractor points (that don't satisfy the inequality)
    // Distractor 1: Point way outside region
    const dist1X = -getRandomInt(3, 6);
    const dist1Y = -getRandomInt(4, 8);
    
    // Distractor 2: Point on wrong side
    const dist2X = -getRandomInt(1, 3);
    const dist2Y = getRandomInt(2, 6);
    
    // Distractor 3: Close but outside
    const dist3X = getRandomInt(1, 3);
    const dist3Y = inequalityType === '<='
      ? boundaryY + getRandomInt(1, 3) // Just above for ≤
      : boundaryY - getRandomInt(1, 3); // Just below for ≥
    
    // Calculate viewBox to fit all points with padding
    const allX = [testX, dist1X, dist2X, dist3X, 0]; // Include origin for y-intercept
    const allY = [testY, dist1Y, dist2Y, dist3Y, yIntercept];
    const xMin = Math.min(...allX) - 2;
    const xMax = Math.max(...allX) + 2;
    const yMin = Math.min(...allY) - 2;
    const yMax = Math.max(...allY) + 2;
    
    // STEP 3: Build Mafs code for the figure
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_3,xmax=_svg_2;
      const ymin=_svg_1,ymax=_svg_0;
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      const y0=Math.max(ymin,Math.min(ymax,0));
      const x0=Math.max(xmin,Math.min(xmax,0));
      s+='<line x1="'+P+'" y1="'+my(y0)+'" x2="'+(W-P)+'" y2="'+my(y0)+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+mx(x0)+'" y1="'+P+'" x2="'+mx(x0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      const xstep=Math.ceil((xmax-xmin)/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        s+='<text x="'+mx(x)+'" y="'+(my(y0)+15)+'" text-anchor="middle" font-size="10" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.ceil((ymax-ymin)/6);
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        s+='<text x="'+(mx(x0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="10" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      // Shade region
      const steps=80;
      let pts=[];
      for(let i=0;i<=steps;i++){
        const x=xmin+i*(xmax-xmin)/steps;
        const y=0;
        pts.push(mx(x)+','+my(ymax));
      }
      for(let i=steps;i>=0;i--){
        const x=xmin+i*(xmax-xmin)/steps;
        const y=0;
        pts.push(mx(x)+','+my(y));
      }
      let lpts=[];
      for(let i=0;i<=steps;i++){
        const x=xmin+i*(xmax-xmin)/steps;
        const y=0;
        lpts.push(mx(x)+','+my(y));
      }
      return '<polygon points="'+pts.join(' ')+'" fill="#22c55e" fill-opacity="0.15"/>'+
             '<polyline points="'+lpts.join(' ')+'" fill="none" stroke="#16a34a" stroke-width="2" stroke-dasharray="6,3"/>';
    })()}</svg></div>`;
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `$(${dist1X}, ${dist1Y})$`, isCorrect: false },
      { text: `$(${dist2X}, ${dist2Y})$`, isCorrect: false },
      { text: `$(${dist3X}, ${dist3Y})$`, isCorrect: false },
      { text: `$(${testX}, ${testY})$`, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // STEP 6: Build explanation
    const sign = inequalityType === '<=' ? '\\le' : '\\ge';
    const explanation = `Choice ${correctOption.letter} is correct. Since the shaded region shown represents the solutions to an inequality, an ordered pair $(x, y)$ is a solution if it falls within the shaded region. Testing $(${testX}, ${testY})$ in the boundary $y ${sign} ${slope}x ${yIntercept >= 0 ? '+' : '-'} ${Math.abs(yIntercept)}$: $${testY} ${sign} ${slope}(${testX}) ${yIntercept >= 0 ? '+' : '-'} ${Math.abs(yIntercept)} \\implies ${testY} ${sign} ${boundaryY}$, which is true. Of the choices, only $(${testX}, ${testY})$ is in the shaded region.`;
    
    // STEP 7: Return question data
    return {
      questionText: `The shaded region shown represents the solutions to an inequality. Which ordered pair $(x, y)$ is a solution to this inequality?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `(${testX}, ${testY})`,
      explanation: explanation
    };
  }
};
