import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 81b664bc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AB: single/double digit 5-15, BC: 15-25, FE: 5-12]
 * - Difficulty factors: [Parallel lines, proportional segments, solving proportion equation]
 * - Distractor patterns: [A: rounding error, C: swapped ratio, D: added instead of multiplied]
 * - Constraints: [AB/BC = FE/ED, all values positive]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Three parallel lines cut by two transversals]
 */

export const generator_81b664bc = {
  metadata: {
    // id: "81b664bc",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values ensuring clean division
    // AB must divide evenly into BC * FE for clean answer
    const AB = getRandomInt(5, 15);
    const BC = getRandomInt(15, 25);
    const FE = getRandomInt(5, 12);
    
    // Calculate ED using proportion: AB/BC = FE/ED
    // ED = (BC * FE) / AB
    // Ensure this divides evenly by choosing values carefully
    const numerator = BC * FE;
    let ED = numerator / AB;
    
    // If not clean, adjust AB to be a divisor of numerator
    if (!Number.isInteger(ED)) {
      // Find a divisor of numerator in range 5-15
      const divisors = [];
      for (let i = 5; i <= 15; i++) {
        if (numerator % i === 0) {
          divisors.push(i);
        }
      }
      if (divisors.length > 0) {
        const adjustedAB = divisors[getRandomInt(0, divisors.length - 1)];
        ED = numerator / adjustedAB;
      } else {
        // Fallback: force integer result
        ED = Math.round(ED);
      }
    }
    
    const ED_rounded = Math.round(ED * 10) / 10;
    
    // STEP 2: Build Mafs code with calculated positions
    const scale = 0.3;
    const ax = 0;
    const ay = 10;
    const bx = AB * scale;
    const by = 8.5;
    const cx = (AB + BC) * scale;
    const cy = 4.5;
    const fx = 0;
    const fy = 3.5;
    const ex = FE * scale;
    const ey = 1.5;
    const dx = (FE + ED_rounded) * scale;
    const dy = -2.5;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((10-(-1))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.max(1,Math.ceil((11-(-2))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${ax})+'" y1="'+my(${ay})+'" x2="'+mx(${fx})+'" y2="'+my(${fy})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${bx})+'" y1="'+my(${by})+'" x2="'+mx(${ex})+'" y2="'+my(${ey})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${cx})+'" y1="'+my(${cy})+'" x2="'+mx(${dx})+'" y2="'+my(${dy})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${ax})+'" y1="'+my(${ay})+'" x2="'+mx(${bx})+'" y2="'+my(${by})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${bx})+'" y1="'+my(${by})+'" x2="'+mx(${cx})+'" y2="'+my(${cy})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${ax - 0.5})+'" y="'+my(${ay + 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${bx + 0.2})+'" y="'+my(${by + 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${cx + 0.3})+'" y="'+my(${cy + 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${fx - 0.5})+'" y="'+my(${fy - 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">F</text>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${ex + 0.2})+'" y="'+my(${ey - 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">E</text>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${dx + 0.3})+'" y="'+my(${dy - 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">D</text>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${ax + (bx-ax)/2 - 0.5})+'" y="'+my(${ay + (by-ay)/2 + 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">$AB</text>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${bx + (cx-bx)/2})+'" y="'+my(${by + (cy-by)/2 + 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">$BC</text>';
    })()}${(() => {
      const xmin=-1,xmax=10;
      const ymin=-2,ymax=11;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${fx + (ex-fx)/2 - 0.5})+'" y="'+my(${fy + (ey-fy)/2 - 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">$FE</text>';
    })()}</svg></div>`;

    // STEP 3: Create options
    const correctText = ED_rounded.toFixed(1);
    const distractorA = (ED * 0.96).toFixed(1); // Rounding error
    const distractorC = ((AB * FE) / BC).toFixed(1); // Swapped ratio
    const distractorD = (FE + BC - AB).toFixed(1); // Nonsensical combination
    
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from rounding error in calculation" },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false, reason: "results from using the reciprocal proportion AB/BC = ED/FE" },
      { text: distractorD, isCorrect: false, reason: "results from incorrect arithmetic operations" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `In the figure above, $\\\\overline{AF}$, $\\\\overline{BE}$, and $\\\\overline{CD}$ are parallel. Points $B$ and $E$ lie on $\\\\overline{AC}$ and $\\\\overline{FD}$, respectively. If $AB = ${AB}$, $BC = ${BC}$, and $FE = ${FE}$, what is the length of $\\\\overline{ED}$, to the nearest tenth?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Since $\\\\overline{AF} \\\\parallel \\\\overline{BE} \\\\parallel \\\\overline{CD}$, the segments intercepted on the transversals $\\\\overline{AC}$ and $\\\\overline{FD}$ are proportional: $\\\\frac{AB}{BC} = \\\\frac{FE}{ED}$. Substituting the given values: $\\\\frac{${AB}}{${BC}} = \\\\frac{${FE}}{ED}$. Solving for $ED$: $${AB} \\\\cdot ED = ${BC * FE} \\\\implies ED = \\\\frac{${BC * FE}}{${AB}} \\\\approx ${(BC * FE / AB).toFixed(2)}$. Rounding to the nearest tenth gives ${correctText}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 94364a79
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height1: 8-15, shadow1: 4-8, shadow2: 2-4]
 * - Difficulty factors: [Similar triangles, proportion setup, shadow word problem]
 * - Distractor patterns: [A: subtracted instead of proportion, C: multiplied instead, D: reversed ratio]
 * - Constraints: [height1/shadow1 = height2/shadow2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two similar right triangles representing trees and shadows]
 */
