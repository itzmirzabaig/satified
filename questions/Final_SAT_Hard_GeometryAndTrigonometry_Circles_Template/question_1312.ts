import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1312
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (-3, 1), radius: 5]
 * - Difficulty factors: [Testing interior vs exterior, distance formula]
 * - Distractor patterns: [Choosing interior point instead of exterior]
 * - Constraints: [Point NOT in interior means distance >= radius]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Circle with marked point - requires Mafs]
 */

export const generator_1312 = {
  metadata: {
    id: "1312",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate circle parameters
    const h = -getRandomInt(2, 6);
    const k = getRandomInt(-2, 4);
    const r = getRandomInt(4, 8);
    
    // STEP 2: Generate points
    // One clearly outside (correct answer)
    const outsideX = h + r + getRandomInt(2, 5);
    const outsideY = k + getRandomInt(1, 3);
    
    // One clearly inside
    const insideX = h + getRandomInt(-2, 2);
    const insideY = k + getRandomInt(-2, 2);
    
    // Center itself
    const centerX = h;
    const centerY = k;
    
    // One on the edge/just inside
    const edgeX = h + r - 1;
    const edgeY = k;
    
    // STEP 3: Build Mafs figure (showing the outside point)
    const _svg_0 = Math.abs(h) + r + 3; const _svg_1 = outsideX + 2; const _svg_2 = Math.abs(k) + r + 2;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-_svg_0,xmax=_svg_1;
      const ymin=-_svg_2,ymax=_svg_2;
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      const xstep=Math.ceil((_svg_1-(-_svg_0))/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0) continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-(Math.abs(h) + r + 3),xmax=(outsideX + 2);
      const ymin=-(Math.abs(k) + r + 2),ymax=(Math.abs(k) + r + 2);
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const r=((k))*(400-2*40)/((outsideX + 2)-(-(Math.abs(h) + r + 3)));
      return '<circle cx="'+mx((h))+'" cy="'+my((k))+'" r="'+r+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;

    // STEP 4: Calculate distance for correct answer
    const dist = Math.sqrt((outsideX - h) ** 2 + (outsideY - k) ** 2);
    
    const correctText = `(${outsideX}, ${outsideY})`;
    
    const optionsData = [
      { text: `(${insideX}, ${insideY})`, isCorrect: false },
      { text: `(${centerX}, ${centerY})`, isCorrect: false },
      { text: `(${edgeX}, ${edgeY})`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `A circle in the $xy$-plane has equation $(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+(y-${k})^{2}=${r*r}$. Which of the following points does NOT lie in the interior of the circle?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. A point lies in the interior if its distance from the center is less than the radius $${r}$. The distance from $(${h}, ${k})$ to $(${outsideX}, ${outsideY})$ is $\\\\sqrt{(${outsideX}-${h})^{2}+(${outsideY}-${k})^{2}} = \\\\sqrt{${(outsideX-h)**2 + (outsideY-k)**2}} \\\\approx ${dist.toFixed(1)} > ${r}$. Choice ${incorrectOptions[0].letter} is incorrect; this point is inside. Choice ${incorrectOptions[1].letter} is incorrect; the center is inside. Choice ${incorrectOptions[2].letter} is incorrect; this point is inside or on the boundary.`
    };
  }
};
