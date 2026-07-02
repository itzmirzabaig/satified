import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: bd7f6e30
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle given: 114°, answer: 64°]
 * - Difficulty factors: [Isosceles triangles, exterior angle theorem]
 * - Distractor patterns: [A: 72, B: 66, D: 58]
 * - Constraints: [RT = TU creates isosceles triangle RTU]
 * - Question type: [Figure→Multiple Choice]
 */

export const generator_bd7f6e30 = {
  metadata: {
    // id: "bd7f6e30",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate vertex angle of isosceles triangle
    const angleRTU = getRandomInt(100, 130);
    
    // STEP 2: Calculate base angles and x
    const baseAngle = (180 - angleRTU) / 2;
    const exteriorComponent = getRandomInt(25, 40);
    const x = exteriorComponent + baseAngle;
    
    if (!Number.isInteger(x)) {
      // Adjust to make integer
      const adjustedX = Math.round(x);
      const adjustedBase = Math.round(baseAngle);
      const adjustedExterior = adjustedX - adjustedBase;
      
      // STEP 3: Create distractors
      const distractors = [
        adjustedX + 8,
        adjustedX + 2,
        adjustedX - 6
      ];
      
      const optionsData = [
        { text: distractors[0].toString(), isCorrect: false },
        { text: distractors[1].toString(), isCorrect: false },
        { text: adjustedX.toString(), isCorrect: true },
        { text: distractors[2].toString(), isCorrect: false }
      ];
      
      // STEP 4: Shuffle and assign letters
      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));
      
      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;
      
      // STEP 5: Build Mafs code with randomized coordinates
      const rX = 0;
      const rY = 0;
      const tX = getRandomInt(5, 8);
      const tY = getRandomInt(6, 10);
      const uX = tX + getRandomInt(4, 8);
      const uY = 0;
      const vX = tX - getRandomInt(2, 4);
      const vY = tY + getRandomInt(1, 3);
      
      const _svg_0 = rY - 2; const _svg_1 = vY + 2; const _svg_2 = rX - 2; const _svg_3 = uX + 2;
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
      const xmin=${rX - 2},xmax=${uX + 2};
      const ymin=${rY - 2},ymax=${vY + 2};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${tX})+'" y1="'+my(${tY})+'" x2="'+mx(${vX})+'" y2="'+my(${vY})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=${rX - 2},xmax=${uX + 2};
      const ymin=${rY - 2},ymax=${vY + 2};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${rX})+'" y="'+my(${rY - 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">R</text>';
    })()}${(() => {
      const xmin=${rX - 2},xmax=${uX + 2};
      const ymin=${rY - 2},ymax=${vY + 2};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${tX})+'" y="'+my(${tY + 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">T</text>';
    })()}${(() => {
      const xmin=${rX - 2},xmax=${uX + 2};
      const ymin=${rY - 2},ymax=${vY + 2};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${uX})+'" y="'+my(${uY - 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">U</text>';
    })()}${(() => {
      const xmin=${rX - 2},xmax=${uX + 2};
      const ymin=${rY - 2},ymax=${vY + 2};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${vX + 1})+'" y="'+my(${vY - 1})+'" text-anchor="middle" font-size="13" fill="currentColor">V</text>';
    })()}${(() => {
      const xmin=${rX - 2},xmax=${uX + 2};
      const ymin=${rY - 2},ymax=${vY + 2};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${(tX + vX) / 2})+'" y="'+my(${(tY + vY) / 2 - 0.5})+'" text-anchor="middle" font-size="13" fill="currentColor">$angleRTU^circ</text>';
    })()}${(() => {
      const xmin=${rX - 2},xmax=${uX + 2};
      const ymin=${rY - 2},ymax=${vY + 2};
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${rX + 1})+'" y="'+my(${(rY + tY) / 2})+'" text-anchor="middle" font-size="13" fill="currentColor">x^circ</text>';
    })()}</svg></div>`;
      
      return {
        questionText: `In the figure above, $RT = TU$. What is the value of $x$?`,
        figureCode: mafsCode,
        options: shuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: correctOption.text,
        explanation: `Choice ${correctLetter} is correct. Triangle $RTU$ is isosceles with $RT = TU$, so base angles are $\\\\frac{180 - ${angleRTU}}{2} = ${adjustedBase}^\\\\circ$. Angle $TUR = \\\\angle SUV = ${adjustedBase}^\\\\circ$. By the exterior angle theorem, $x = ${adjustedExterior} + ${adjustedBase} = ${adjustedX}$.`
      };
    }
    
    // If x was already integer
    const distractors = [
      Math.round(x + 8),
      Math.round(x + 2),
      Math.round(x - 6)
    ];
    
    const optionsData = [
      { text: distractors[0].toString(), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: Math.round(x).toString(), isCorrect: true },
      { text: distractors[2].toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((14-(-2))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.max(1,Math.ceil((10-(-2))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(6)+'" y1="'+my(8)+'" x2="'+mx(3)+'" y2="'+my(9)+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">R</text>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(6)+'" y="'+my(8.5)+'" text-anchor="middle" font-size="13" fill="currentColor">T</text>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(12)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" fill="currentColor">U</text>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(9)+'" y="'+my(5)+'" text-anchor="middle" font-size="13" fill="currentColor">V</text>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(3)+'" y="'+my(6)+'" text-anchor="middle" font-size="13" fill="currentColor">$angleRTU^circ</text>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(4)+'" text-anchor="middle" font-size="13" fill="currentColor">x^circ</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `In the figure above, $RT = TU$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Triangle $RTU$ is isosceles with $RT = TU$, so base angles are $\\\\frac{180 - ${angleRTU}}{2} = ${Math.round(baseAngle)}^\\\\circ$. Angle $TUR = \\\\angle SUV = ${Math.round(baseAngle)}^\\\\circ$. By the exterior angle theorem, $x = ${exteriorComponent} + ${Math.round(baseAngle)} = ${Math.round(x)}$.`
    };
  }
};

/**
 * Question ID: 322a6dfe
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle: 60°, sides: LN=10, RT=30 (specific values)]
 * - Difficulty factors: [Similar polygons, corresponding angles, extraneous information]
 * - Distractor patterns: [A: 5° (side ratio), B: 27° (scaled), C: 45° (different angle)]
 * - Constraints: [Corresponding angles in similar quadrilaterals are congruent]
 * - Question type: [Figure→Multiple Choice]
 */

// File: generators/lines-angles-and-triangles/322a6dfe.ts