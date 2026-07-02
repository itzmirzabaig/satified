import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1337
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area range: 48-60, height values create fractions]
 * - Difficulty factors: [Similar triangles, area bounds, integer constraint on y]
 * - Distractor patterns: [N/A - multiple correct answers possible]
 * - Constraints: [Similar triangles give ratio x/y = 5/12, area = 6y]
 * - Question type: [Figure→Fill in the blank, multi-accept]
 */

export const generator_1337 = {
  metadata: {
    id: "1337",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
      attempts++;
      
      // STEP 1: Generate area bounds and dimensions
      const minArea = getRandomInt(40, 60);
      const maxArea = minArea + getRandomInt(10, 20);
      const baseRatio = getRandomInt(4, 7);
      const heightRatio = getRandomInt(10, 15);
      
      // STEP 2: Calculate valid y values (integers)
      const k = Math.floor((minArea + maxArea) / 30);
      const yMin = Math.ceil(minArea / k);
      const yMax = Math.floor(maxArea / k);
      
      const validY = [];
      for (let y = yMin; y <= yMax; y++) {
        const x = (y * baseRatio) / heightRatio;
        if ((x * 100) % 1 === 0) {
          validY.push({ y, x });
        }
      }
      
      if (validY.length > 0) {
        // STEP 3: Format answers
        const answers = validY.map(v => {
          const num = v.y * baseRatio;
          const den = heightRatio;
          const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
          const g = gcd(num, den);
          return `${num / g}/${den / g}`;
        });
        
        const uniqueAnswers = [...new Set(answers)].slice(0, 3);
        
        // STEP 4: Build Mafs code with randomized coordinates
        const aX = 0;
        const aY = 0;
        const cX = getRandomInt(10, 15);
        const cY = 0;
        const bX = cX;
        const bY = getRandomInt(6, 10);
        const splitX = getRandomInt(4, 8);
        const splitY = (splitX / cX) * bY;
        
        const _svg_0 = bY + 2; const _svg_1 = aY - 2; const _svg_2 = cX + 2; const _svg_3 = aX - 2;
        const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_3,xmax=_svg_2;
      const ymin=_svg_1,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=(aX - 2),xmax=(cX + 2);
      const ymin=(aY - 2),ymax=(bY + 2);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((splitX))+'" y1="'+my((aY))+'" x2="'+mx((splitX))+'" y2="'+my((splitY.toFixed(2)))+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(cX + 2);
      const ymin=(aY - 2),ymax=(bY + 2);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((aX))+'" y="'+my((aY - 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(cX + 2);
      const ymin=(aY - 2),ymax=(bY + 2);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((cX))+'" y="'+my((cY - 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(cX + 2);
      const ymin=(aY - 2),ymax=(bY + 2);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((bX))+'" y="'+my((bY + 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(cX + 2);
      const ymin=(aY - 2),ymax=(bY + 2);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((splitX + 0.5))+'" y="'+my((splitY / 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">x</text>';
    })()}${(() => {
      const xmin=(aX - 2),xmax=(cX + 2);
      const ymin=(aY - 2),ymax=(bY + 2);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((cX + 0.5))+'" y="'+my((bY / 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">y</text>';
    })()}</svg></div>`;
        
        return {
          questionText: `The area of triangle $ABC$ above is at least ${minArea} but no more than ${maxArea}. If $y$ is an integer, what is one possible value of $x$?`,
          figureCode: mafsCode,
          options: null,
          correctAnswer: uniqueAnswers.join(", "),
          explanation: `The area relationship and similarity ratio $\\\\frac{x}{y} = \\\\frac{${baseRatio}}{${heightRatio}}$ yields possible values of $x$ as ${uniqueAnswers.join(", ")} for valid integer values of $y$ in the range.`
        };
      }
    }
    
    // Fallback
    const minArea = 48;
    const maxArea = 60;
    const baseRatio = 5;
    const heightRatio = 12;
    const uniqueAnswers = ["5/12", "5/6", "5/4"];
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(5)+'" y1="'+my(0)+'" x2="'+mx(5)+'" y2="'+my(((10/3).toFixed(2)))+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(12)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(12)+'" y="'+my(8.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(5.5)+'" y="'+my(2)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">x</text>';
    })()}${(() => {
      const xmin=-2,xmax=14;
      const ymin=-2,ymax=10;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(12.5)+'" y="'+my(4)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">y</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `The area of triangle $ABC$ above is at least ${minArea} but no more than ${maxArea}. If $y$ is an integer, what is one possible value of $x$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: uniqueAnswers.join(", "),
      explanation: `The area relationship and similarity ratio $\\\\frac{x}{y} = \\\\frac{${baseRatio}}{${heightRatio}}$ yields possible values of $x$ as ${uniqueAnswers.join(", ")} for valid integer values of $y$ in the range.`
    };
  }
};
