import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1310
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (-2, 0), radius: 3, shift: down 6, scale: 2]
 * - Difficulty factors: [Translation AND dilation combined]
 * - Distractor patterns: [Forgetting to scale radius, wrong direction]
 * - Constraints: [Both transformations apply]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two circles, different sizes - requires Mafs]
 */

export const generator_1310 = {
  metadata: {
    id: "1310",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate circle A
    const h = -getRandomInt(2, 5);
    const k = 0; // Keep at origin level for visual
    const rA = getRandomInt(2, 5);
    
    // STEP 2: Generate transformations
    const shift = getRandomInt(4, 8);
    const scale = getRandomInt(2, 3);
    
    // STEP 3: Calculate circle B parameters
    const newH = h;
    const newK = k - shift;
    const rB = rA * scale;
    
    // STEP 4: Build Mafs figure
    const _svg_0 = Math.abs(h) + rA + 2; const _svg_1 = rA + 3; const _svg_2 = shift + rB + 3;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-_svg_0,xmax=_svg_0;
      const ymin=-_svg_2,ymax=_svg_1;
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      const xstep=Math.ceil((_svg_0-(-_svg_0))/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0) continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-(Math.abs(h) + rA + 2),xmax=(Math.abs(h) + rA + 2);
      const ymin=-(shift + rB + 3),ymax=(rA + 3);
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const r=((k))*(400-2*40)/((Math.abs(h) + rA + 2)-(-(Math.abs(h) + rA + 2)));
      return '<circle cx="'+mx((h))+'" cy="'+my((k))+'" r="'+r+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;

    // STEP 5: Generate options
    const correctText = `(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+(y${newK >= 0 ? '-' : '+'}${Math.abs(newK)})^{2}=(${scale}\\\\cdot${rA})^{2}`;
    
    const distractorB = `2(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+2(y${newK >= 0 ? '-' : '+'}${Math.abs(newK)})^{2}=${rA*rA}`; // Wrong format
    const distractorC = `(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+(y-${Math.abs(newK)})^{2}=(${scale}\\\\cdot${rA})^{2}`; // Wrong sign
    const distractorD = `2(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+2(y-${Math.abs(newK)})^{2}=${rA*rA}`; // Wrong format and sign
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Circle A (shown) is defined by the equation $(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+y^{2}=${rA*rA}$. Circle B (not shown) is the result of shifting circle A down ${shift} units and increasing the radius so that the radius of circle B is ${scale} times the radius of circle A. Which equation defines circle B?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Circle A has center $(${h}, ${k})$ and radius $${rA}$. Shifting down ${shift} units gives center $(${h}, ${newK})$. The new radius is $${scale} \\\\times ${rA} = ${rB}$, so $r^{2} = ${rB*rB} = (${scale}\\\\cdot${rA})^{2}$. Choice ${incorrectOptions[0].letter} is incorrect; coefficients should not multiply the squared terms. Choice ${incorrectOptions[1].letter} is incorrect; wrong sign on y-term. Choice ${incorrectOptions[2].letter} is incorrect; wrong format and wrong sign.`
    };
  }
};
