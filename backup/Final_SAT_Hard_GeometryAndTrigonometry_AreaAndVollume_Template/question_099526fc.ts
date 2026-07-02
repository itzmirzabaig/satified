import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 099526fc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (-6,4) to (3,10), area: 36√13]
 * - Difficulty factors: [Distance formula, right triangle area with one leg given]
 * - Distractor patterns: [A: 12, B: 24 (correct), C: 3√13, D: 18√13]
 * - Constraints: [Must work out to clean answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [Line segment Mafs]
 */

export const generator_099526fc = {
  metadata: {
    // id: "099526fc",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate points and calculate distance
    // Original: (-6,4) to (3,10), distance = √(81+36) = √117 = 3√13
    // Area = 36√13, so other leg = 2×36√13 / 3√13 = 72/3 = 24
    
    // Generate similar structure
    const x1 = getRandomInt(-8, -4);
    const y1 = getRandomInt(2, 6);
    const x2 = getRandomInt(2, 6);
    const y2 = getRandomInt(7, 12);
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distanceSquared = dx*dx + dy*dy;
    
    // Ensure distance has clean radical form
    const distance = Math.sqrt(distanceSquared);
    
    // STEP 2: Generate area that gives clean answer
    // Area = (1/2) × leg1 × leg2, so leg2 = 2×Area/leg1
    // We want leg2 to be integer
    const leg1 = distance;
    const leg2 = getRandomInt(12, 36) * 2; // Even number for clean calculation
    const area = 0.5 * leg1 * leg2;
    
    // Format area with radical if needed
    // Simplify distance radical
    const simplifyRadical = (n: number): [number, number] => {
      let coeff = 1;
      let remaining = n;
      for (let i = 2; i * i <= remaining; i++) {
        while (remaining % (i * i) === 0) {
          coeff *= i;
          remaining /= i * i;
        }
      }
      return [coeff, remaining];
    };
    
    const [distCoeff, distRemain] = simplifyRadical(distanceSquared);
    const areaCoeff = leg2 / 2; // Since Area = (1/2) × leg1 × leg2 = (1/2) × √d × leg2
    
    // STEP 3: Create distractors
    const distractorA = (leg2 / 2).toString(); // Forgot to multiply by 2 in area formula
    const distractorC = distCoeff === 1 && distRemain === 1 ? "1" : 
                        distCoeff === 1 ? `\\sqrt{${distRemain}}` : 
                        distRemain === 1 ? distCoeff.toString() : 
                        `${distCoeff}\\sqrt{${distRemain}}`; // Just the leg length
    const distractorD = `${areaCoeff * 3}\\sqrt{${distRemain}}`; // Wrong multiple
    
    const correctText = leg2.toString();
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // Format area string
    const areaString = distRemain === 1 
      ? (areaCoeff * distCoeff).toString()
      : `${areaCoeff * distCoeff}\\sqrt{${distRemain}}`;
    
    // STEP 4: Build Mafs code
    const _svg_0 = y1-2; const _svg_1 = y2+1; const _svg_2 = x1-1; const _svg_3 = x2+1;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_2,xmax=_svg_3;
      const ymin=_svg_0,ymax=_svg_1;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((_svg_3-(_svg_2))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.max(1,Math.ceil((_svg_1-(_svg_0))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=${x1-1},xmax=${x2+1};
      const ymin=${y1-2},ymax=${y2+1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${x1})+'" y1="'+my(${y1})+'" x2="'+mx(${x2})+'" y2="'+my(${y2})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=${x1-1},xmax=${x2+1};
      const ymin=${y1-2},ymax=${y2+1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${x1})+'" y="'+my(${y1 - 0.8})+'" text-anchor="middle" font-size="13" fill="currentColor">($x1, $y1)</text>';
    })()}${(() => {
      const xmin=${x1-1},xmax=${x2+1};
      const ymin=${y1-2},ymax=${y2+1};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${x2 + 0.3})+'" y="'+my(${y2})+'" text-anchor="middle" font-size="13" fill="currentColor">($x2, $y2)</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `The line segment shown in the $xy$-plane represents one of the legs of a right triangle. The area of this triangle is $${areaString}$ square units. What is the length, in units, of the other leg of this triangle?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The given leg has length $\\sqrt{(${x2}-${x1})^2 + (${y2}-${y1})^2} = \\sqrt{${dx*dx} + ${dy*dy}} = \\sqrt{${distanceSquared}} = ${distCoeff === 1 && distRemain === 1 ? "1" : distCoeff === 1 ? `\\sqrt{${distRemain}}` : distRemain === 1 ? distCoeff.toString() : `${distCoeff}\\sqrt{${distRemain}}`}$. Using $A = \\frac{1}{2}bh$: $${areaString} = \\frac{1}{2}(${distCoeff === 1 && distRemain === 1 ? "1" : distCoeff === 1 ? `\\sqrt{${distRemain}}` : distRemain === 1 ? distCoeff.toString() : `${distCoeff}\\sqrt{${distRemain}}`})x$. Solving: $x = ${leg2}$. Choice ${incorrectOptions[0].letter} is incorrect because it forgets to multiply by 2 in the area formula. Choice ${incorrectOptions[1].letter} is incorrect because it gives the length of the given leg instead of the other leg. Choice ${incorrectOptions[2].letter} is incorrect due to calculation error.`
    };
  }
};