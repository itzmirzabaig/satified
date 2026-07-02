import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1333
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [MR=6, LR=7, RP=11, answer: 119/6]
 * - Difficulty factors: [Similar triangles, proportionality, segment addition]
 * - Distractor patterns: [A: 119/11, B: 77/6, C: 113/6]
 * - Constraints: [LM || PQ creates similar triangles LMR and PQR]
 * - Question type: [Figure→Multiple Choice]
 */

export const generator_1333 = {
  metadata: {
    id: "1333",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate lengths that create clean fractions
    const MR = getRandomInt(4, 8);
    const LR = getRandomInt(5, 10);
    const RP = getRandomInt(8, 14);
    
    // STEP 2: Calculate RQ using similarity ratio
    const RQ_num = LR * RP;
    const RQ_den = MR;
    
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const g1 = gcd(RQ_num, RQ_den);
    const RQ_simplified = `${RQ_num / g1}/${RQ_den / g1}`;
    const RQ_decimal = RQ_num / RQ_den;
    
    // LQ = LR + RQ
    const LQ_num = LR * RQ_den + RQ_num;
    const LQ_den = RQ_den;
    const g2 = gcd(LQ_num, LQ_den);
    const LQ = `${LQ_num / g2}/${LQ_den / g2}`;
    
    // STEP 3: Create distractors
    const distractor1 = `${RQ_num}/${RP}`;
    const distractor2 = `${LR * MR}/${RP}`;
    const distractor3 = `${RQ_num + LR * 2}/${MR}`;
    
    const optionsData = [
      { text: distractor1, isCorrect: false },
      { text: distractor2, isCorrect: false },
      { text: distractor3, isCorrect: false },
      { text: LQ, isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 5: Build Mafs code with randomized coordinates
    const lX = -getRandomInt(2, 5);
    const lY = getRandomInt(4, 8);
    const mX = lX - getRandomInt(1, 3);
    const mY = -getRandomInt(2, 5);
    const rX = getRandomInt(5, 10);
    const rY = getRandomInt(0, 3);
    const qX = rX + getRandomInt(2, 5);
    const qY = lY + getRandomInt(2, 5);
    const pX = qX + getRandomInt(1, 3);
    const pY = mY - getRandomInt(1, 3);
    
    const _svg_0 = pY - 2; const _svg_1 = qY + 2; const _svg_2 = mX - 2; const _svg_3 = pX + 2;
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
      const xmin=(mX - 2),xmax=(pX + 2);
      const ymin=(pY - 2),ymax=(qY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((lX))+'" y1="'+my((lY))+'" x2="'+mx((pX))+'" y2="'+my((pY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(mX - 2),xmax=(pX + 2);
      const ymin=(pY - 2),ymax=(qY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((mX))+'" y1="'+my((mY))+'" x2="'+mx((qX))+'" y2="'+my((qY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(mX - 2),xmax=(pX + 2);
      const ymin=(pY - 2),ymax=(qY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((rX))+'" y1="'+my((rY))+'" x2="'+mx((mX))+'" y2="'+my((mY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(mX - 2),xmax=(pX + 2);
      const ymin=(pY - 2),ymax=(qY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((qX))+'" y1="'+my((qY))+'" x2="'+mx((pX))+'" y2="'+my((pY))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(mX - 2),xmax=(pX + 2);
      const ymin=(pY - 2),ymax=(qY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((lX - 0.5))+'" y="'+my((lY))+'" text-anchor="middle" font-size="13" fill="currentColor">L</text>';
    })()}${(() => {
      const xmin=(mX - 2),xmax=(pX + 2);
      const ymin=(pY - 2),ymax=(qY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((mX - 0.5))+'" y="'+my((mY))+'" text-anchor="middle" font-size="13" fill="currentColor">M</text>';
    })()}${(() => {
      const xmin=(mX - 2),xmax=(pX + 2);
      const ymin=(pY - 2),ymax=(qY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((rX))+'" y="'+my((rY + 1.5))+'" text-anchor="middle" font-size="13" fill="currentColor">R</text>';
    })()}${(() => {
      const xmin=(mX - 2),xmax=(pX + 2);
      const ymin=(pY - 2),ymax=(qY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((qX + 0.5))+'" y="'+my((qY))+'" text-anchor="middle" font-size="13" fill="currentColor">Q</text>';
    })()}${(() => {
      const xmin=(mX - 2),xmax=(pX + 2);
      const ymin=(pY - 2),ymax=(qY + 2);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((pX))+'" y="'+my((pY - 0.5))+'" text-anchor="middle" font-size="13" fill="currentColor">P</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `In the figure, $\\\\overline{LQ}$ intersects $\\\\overline{MP}$ at point $R$, and $\\\\overline{LM}$ is parallel to $\\\\overline{PQ}$. The lengths of $\\\\overline{MR}$, $\\\\overline{LR}$, and $\\\\overline{RP}$ are $${MR}$, $${LR}$, and $${RP}$, respectively. What is the length of $\\\\overline{LQ}$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Triangles $LMR$ and $PQR$ are similar by AA. Proportionality: $\\\\frac{RQ}{LR} = \\\\frac{RP}{MR}$. Thus $\\\\frac{RQ}{${LR}} = \\\\frac{${RP}}{${MR}} \\\\implies RQ = ${RQ_simplified}$. Total length $LQ = LR + RQ = ${LR} + ${RQ_simplified} = ${LQ}$.`
    };
  }
};
