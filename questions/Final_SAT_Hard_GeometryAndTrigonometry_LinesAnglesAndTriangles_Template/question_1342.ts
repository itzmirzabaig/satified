import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1342
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle expression (7x-250)°]
 * - Difficulty factors: [Parallel lines, transversals, angle sums, algebraic manipulation]
 * - Distractor patterns: [A: -14x+1540, B: 14x-320, C: -28x+1720, D: 360]
 * - Constraints: [Acute/obtuse angle relationships with parallel lines]
 * - Question type: [Figure→Multiple Choice]
 */

export const generator_1342 = {
  metadata: {
    id: "1342",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate coefficient and constant for angle expression
    const a = getRandomInt(6, 10);
    const b = getRandomInt(200, 300);
    
    // STEP 2: Determine what expressions COULD be valid
    const mult = getRandomInt(2, 4);
    
    const optionsData = [
      { 
        text: `$${-2 * a}x + ${2 * b + getRandomInt(1400, 1600)}$`, 
        isCorrect: true,
        reason: "does not correspond to any valid sum of four angles"
      },
      { 
        text: `$${2 * a}x - ${getRandomInt(300, 350)}$`, 
        isCorrect: false,
        reason: "could represent sum of four acute angles"
      },
      { 
        text: `$${-4 * a}x + ${4 * b + 720}$`, 
        isCorrect: false,
        reason: "could represent sum of four obtuse angles"
      },
      { 
        text: `$360$`, 
        isCorrect: false,
        reason: "could represent sum of two acute and two obtuse angles"
      }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 5: Build Mafs code with randomized coordinates
    const y1 = getRandomInt(1, 4);
    const y2 = -getRandomInt(1, 4);
    const leftX = -getRandomInt(3, 6);
    const rightX = getRandomInt(3, 6);
    
    const _svg_0 = y2 - 1; const _svg_1 = y1 + 1; const _svg_2 = leftX - 1; const _svg_3 = rightX + 1;
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
      const xmin=(leftX - 1),xmax=(rightX + 1);
      const ymin=(y2 - 1),ymax=(y1 + 1);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((leftX))+'" y1="'+my((y1))+'" x2="'+mx((rightX))+'" y2="'+my((y1))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(leftX - 1),xmax=(rightX + 1);
      const ymin=(y2 - 1),ymax=(y1 + 1);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((leftX))+'" y1="'+my((y2))+'" x2="'+mx((rightX))+'" y2="'+my((y2))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=(leftX - 1),xmax=(rightX + 1);
      const ymin=(y2 - 1),ymax=(y1 + 1);
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((leftX + 2))+'" y1="'+my((y2 - 2))+'" x2="'+mx((rightX - 2))+'" y2="'+my((y1 + 2))+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}</svg></div>`;
    
    return {
      questionText: `A line intersects two parallel lines, forming four acute angles and four obtuse angles. The measure of one of these eight angles is $(${a}x - ${b})^\\\\circ$. The sum of the measures of four of the eight angles is $k^\\\\circ$. Which of the following could NOT be equivalent to $k$, for all values of $x$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The possible sums for 4 angles in this configuration are: four acute angles ($4(${a}x - ${b}) = ${4*a}x - ${4*b}$), four obtuse angles ($4(180 - (${a}x - ${b})) = ${-4*a}x + ${4*b + 720}$), or two acute and two obtuse ($2(${a}x - ${b}) + 2(180 - (${a}x - ${b})) = 360$). Choice ${correctLetter} ${correctOption.reason}.`
    };
  }
};
