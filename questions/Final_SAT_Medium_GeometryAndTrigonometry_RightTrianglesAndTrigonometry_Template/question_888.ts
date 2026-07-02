import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 888
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Hypotenuse: 8, 30° angle, opposite side: 4 (half hypotenuse)]
 * - Difficulty factors: [30-60-90 triangle properties, side opposite 30° is half hypotenuse]
 * - Distractor patterns: [Fill-in-the-blank, no multiple choice]
 * - Constraints: [Must be 30-60-90 triangle, answer is half the hypotenuse]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [30-60-90 triangle with labeled angles]
 */

export const generator_888 = {
  metadata: {
    id: "888",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate 30-60-90 triangle
    // Original: hypotenuse = 8, answer = 4
    // Use even hypotenuse so answer is integer
    const hypotenuse = getRandomInt(6, 20) * 2; // Even numbers 12-40
    
    // Calculate sides
    const shortLeg = hypotenuse / 2; // Opposite 30°
    const longLeg = (hypotenuse * Math.sqrt(3)) / 2; // Opposite 60°
    
    // Position: P at origin (30°), R at right angle, Q at top (60°)
    // Actually: standard position with right angle at R
    const pX = 0;
    const pY = 0;
    const rX = longLeg;
    const rY = 0;
    const qX = longLeg;
    const qY = shortLeg;
    
    // Calculate viewBox bounds
    const xMin = -1;
    const xMax = longLeg + 2;
    const yMin = -1;
    const yMax = shortLeg + 2;
    
    // STEP 2: Build Mafs code
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
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
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-0.5)+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">P(30^°)</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((longLeg + 0.4))+'" y="'+my((shortLeg + 0.2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Q(60^°)</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((longLeg + 0.4))+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">R(90^°)</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((longLeg / 2))+'" y="'+my((shortLeg / 2 + 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${hypotenuse</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((longLeg + 0.8))+'" y="'+my((shortLeg / 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">x</text>';
    })()}</svg></div>`;
    
    // STEP 3: Answer is half the hypotenuse
    const answer = shortLeg;
    
    // STEP 4: Return question data
    return {
      questionText: "In the right triangle shown above, what is the length of the side opposite the 30° angle?",
      figureCode: mafsCode,
      options: null, // Fill-in-the-blank
      correctAnswer: answer.toString(),
      explanation: `In a 30-60-90 triangle, the length of the side opposite the 30° angle is half the length of the hypotenuse. If the hypotenuse is ${hypotenuse}, the side opposite the 30° angle is ${answer}.`
    };
  }
};