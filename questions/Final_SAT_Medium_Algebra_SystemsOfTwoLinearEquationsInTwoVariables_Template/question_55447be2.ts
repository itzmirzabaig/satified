import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 55447be2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1/3, intercepts: -14, 18]
 * - Difficulty factors: [Fractional slope, setting equal to solve]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Integer solution for x]
 * - Question type: [Fill in the blank with Mafs figure]
 * - Figure generation: [Mafs - two lines with intersection]
 */

export const generator_55447be2 = {
  metadata: {
    // id: "55447be2",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const b1 = -1 * getRandomInt(10, 20);
    const b2 = getRandomInt(10, 25);
    
    // Find intersection: (1/3)x + b1 = -x + b2
    // (4/3)x = b2 - b1
    // x = 3(b2 - b1)/4
    const xValue = 3 * (b2 - b1) / 4;
    const yValue = (1/3) * xValue + b1;
    
    // Calculate viewBox bounds
    const xMin = Math.floor(Math.min(0, xValue)) - 2;
    const xMax = Math.ceil(Math.max(10, xValue)) + 2;
    const yMin = Math.floor(Math.min(b1, yValue, 0)) - 2;
    const yMax = Math.ceil(Math.max(b2, yValue)) + 2;
    
    // STEP 2: Build Mafs code with complete viewBox
    const signStr1 = b1 >= 0 ? '+' : '';
    const absB1 = Math.abs(b1);
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_3,xmax=_svg_2;
      const ymin=_svg_1,ymax=_svg_0;
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Border
      s+='<rect x="'+P+'" y="'+P+'" width="'+(W-2*P)+'" height="'+(H-2*P)+'" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>';
      // X axis
      const y0=Math.max(ymin,Math.min(ymax,0));
      s+='<line x1="'+P+'" y1="'+my(y0)+'" x2="'+(W-P)+'" y2="'+my(y0)+'" stroke="currentColor" stroke-width="1.5"/>';
      // Y axis
      const x0=Math.max(xmin,Math.min(xmax,0));
      s+='<line x1="'+mx(x0)+'" y1="'+P+'" x2="'+mx(x0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      // X tick labels
      const xstep=Math.ceil((xmax-xmin)/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        s+='<line x1="'+mx(x)+'" y1="'+my(y0)+'" x2="'+mx(x)+'" y2="'+(my(y0)+4)+'" stroke="currentColor" stroke-width="1"/>';
        s+='<text x="'+mx(x)+'" y="'+(my(y0)+15)+'" text-anchor="middle" font-size="10" fill="currentColor">'+x+'</text>';
      }
      // Y tick labels
      const ystep=Math.ceil((ymax-ymin)/6);
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        s+='<line x1="'+(mx(x0)-4)+'" y1="'+my(y)+'" x2="'+mx(x0)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="1"/>';
        s+='<text x="'+(mx(x0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="10" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}</svg></div>`;
    
    // STEP 3: Build question text
    const questionText = `$$\\begin{cases} y = \\frac{1}{3}x ${signStr1}${b1} \\\\ y = -x + ${b2} \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $x$?`;
    
    // STEP 4: Return fill-in-the-blank with figure
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: xValue.toString(),
      explanation: `Set the expressions for $y$ equal: $\\frac{1}{3}x ${signStr1}${b1} = -x + ${b2}$. Multiplying by 3: $x ${signStr1}${3 * b1} = -3x + ${3 * b2} \\implies 4x = ${3 * b2 - 3 * b1} \\implies x = ${xValue}$.`
    };
  }
};

/**
 * Question ID: 2704399f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 3, -0.5, intercepts: -3, 0.5]
 * - Difficulty factors: [Graph reading, identify intersection]
 * - Distractor patterns: [Various coordinate pairs]
 * - Constraints: [Intersection at (1, 0)]
 * - Question type: [Multiple Choice with Figure]
 * - Figure generation: [Mafs - two lines]
 */