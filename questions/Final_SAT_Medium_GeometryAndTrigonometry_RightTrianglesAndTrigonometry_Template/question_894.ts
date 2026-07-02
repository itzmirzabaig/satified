import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 894
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Sides: 20, 21, 29 (Pythagorean triple 20-21-29)]
 * - Difficulty factors: [Tangent ratio, identifying opposite/adjacent sides]
 * - Distractor patterns: [sin A (20/29), cos A (21/29), cot A (21/20)]
 * - Constraints: [Must be valid right triangle, 20-21-29 is primitive triple scaled by 1]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with labeled sides]
 */

export const generator_894 = {
  metadata: {
    id: "894",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Pythagorean triple
    // Original used 20-21-29. Generate similar double-digit triple.
    // Scale factor: 2-4 for medium difficulty
    const scale = getRandomInt(2, 4);
    const baseA = 20;
    const baseB = 21;
    const baseC = 29;
    const a = baseA * scale; // 40-80
    const b = baseB * scale; // 42-84
    const c = baseC * scale; // 58-116
    
    // Randomly decide which leg is opposite vs adjacent to angle A
    const isStandardConfig = Math.random() < 0.5;
    const oppositeLeg = isStandardConfig ? a : b;
    const adjacentLeg = isStandardConfig ? b : a;
    
    // Position: C at origin, A on x-axis, B up
    const vertexC = [0, 0];
    const vertexA = [adjacentLeg, 0];
    const vertexB = [adjacentLeg, oppositeLeg];
    
    // Calculate viewBox bounds
    const xMin = -5;
    const xMax = adjacentLeg + 5;
    const yMin = -5;
    const yMax = oppositeLeg + 5;
    
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
      return '<text x="'+mx(-1)+'" y="'+my((oppositeLeg))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((adjacentLeg + 2))+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-1)+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-3)+'" y="'+my((oppositeLeg / 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${oppositeLeg</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((adjacentLeg / 2))+'" y="'+my(-3)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${adjacentLeg</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((adjacentLeg / 2 + 1))+'" y="'+my((oppositeLeg / 2 + 1))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${c</text>';
    })()}</svg></div>`;
    
    // STEP 3: Calculate tangent
    const tanA = `${oppositeLeg}/${adjacentLeg}`;
    
    // STEP 4: Create options with tracking
    const correctText = tanA;
    const optionsData = [
      { text: `${oppositeLeg}/${c}`, isCorrect: false, reason: "gives sine (opposite/hypotenuse) instead of tangent" },
      { text: tanA, isCorrect: true, reason: "" },
      { text: `${adjacentLeg}/${c}`, isCorrect: false, reason: "gives cosine (adjacent/hypotenuse) instead of tangent" },
      { text: `${adjacentLeg}/${oppositeLeg}`, isCorrect: false, reason: "gives cotangent (reciprocal of tangent)" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctLetter} is correct. The tangent of an angle is defined as the ratio of the length of the side opposite the angle to the length of the side adjacent to the angle. For angle $A$, the opposite side is ${oppositeLeg} and the adjacent side is ${adjacentLeg}, so $\\tan(A) = \\frac{${oppositeLeg}}{${adjacentLeg}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: "In the figure above, what is the value of $\\tan(A)$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
