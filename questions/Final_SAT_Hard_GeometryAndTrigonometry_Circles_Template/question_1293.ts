import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1293
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius²: 7, shift: 96 units]
 * - Difficulty factors: [Translation doesn't change radius]
 * - Distractor patterns: [Thinking radius changes with translation]
 * - Constraints: [Radius constant under translation]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two circles, original and translated - requires Mafs]
 */

export const generator_1293 = {
  metadata: {
    id: "1293",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate circle parameters
    const centerY = getRandomInt(4, 8);
    const rSquared = getRandomElement([5, 7, 10, 11, 13]);
    const radius = Math.sqrt(rSquared);
    
    // STEP 2: Translation
    const shift = getRandomInt(50, 120);
    
    // STEP 3: Build Mafs figure
    // Show both circles: original and translated
    const _svg_0 = shift + 15; const _svg_1 = centerY + radius + 3;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-10,xmax=_svg_0;
      const ymin=-2,ymax=_svg_1;
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      const xstep=Math.ceil((_svg_0-(-10))/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0) continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-10,xmax=(shift + 15);
      const ymin=-2,ymax=(centerY + radius + 3);
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const r=((centerY))*(400-2*40)/((shift + 15)-(-10));
      return '<circle cx="'+mx(0)+'" cy="'+my((centerY))+'" r="'+r+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;

    const answer = 4 * rSquared;
    
    return {
      questionText: `Circle A shown is defined by the equation $x^{2}+(y-${centerY})^{2}=${rSquared}$. Circle B (not shown) has the same radius but is translated ${shift} units to the right. If the equation of circle B is $(x-h)^{2}+(y-k)^{2}=a$, where $h, k$, and $a$ are constants, what is the value of $4a$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: answer.toString(),
      explanation: `Circle A has radius $\\\\sqrt{${rSquared}}$. Since Circle B has the same radius, $a = ${rSquared}$. Therefore, $4a = 4(${rSquared}) = ${answer}$. Note that the translation affects the center coordinates $(h, k)$ but not the value of $a$.`
    };
  }
};
