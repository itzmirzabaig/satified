import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: bf8d843e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Equilateral triangle sides: 12, altitude creates 30-60-90 triangles]
 * - Difficulty factors: [Equilateral triangle properties, altitude bisects base, special right triangles]
 * - Distractor patterns: [Incorrect division, correct value, 45-45-90 confusion, 30-60-90 confusion]
 * - Constraints: [Must be equilateral, altitude must bisect base]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Equilateral triangle with altitude]
 */

export const generator_bf8d843e = {
  metadata: {
    // id: "bf8d843e",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equilateral triangle side length
    // Original: side = 12, AD = 6
    const side = getRandomInt(8, 20) * 2; // Even number so half is integer
    
    // Calculate altitude for display (though not needed for answer)
    const altitude = (side * Math.sqrt(3)) / 2;
    
    // Position: A at (-side/2, 0), C at (side/2, 0), B at (0, altitude)
    const halfSide = side / 2;
    
    // Calculate viewBox bounds
    const xMin = -halfSide - 2;
    const xMax = halfSide + 2;
    const yMin = -2;
    const yMax = altitude + 2;
    
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
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0)+'" y1="'+my(0)+'" x2="'+mx(0)+'" y2="'+my(${altitude})+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-${halfSide + 1})+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${halfSide + 1})+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(1)+'" y="'+my(${altitude + 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">D</text>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-${halfSide / 2})+'" y="'+my(${altitude / 2})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${side</text>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${halfSide / 2})+'" y="'+my(${altitude / 2})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${side</text>';
    })()}</svg></div>`;
    
    // STEP 3: Calculate answer (AD = side/2)
    const answer = halfSide;
    
    // STEP 4: Create options with tracking
    const correctText = answer.toString();
    const distractorC = Math.round(answer * Math.sqrt(2)); // 45-45-90 confusion
    const distractorD = Math.round(answer * Math.sqrt(3)); // 30-60-90 confusion
    
    const optionsData = [
      { text: (answer / 2).toString(), isCorrect: false, reason: "incorrectly divides by 2 again" },
      { text: answer.toString(), isCorrect: true, reason: "" },
      { text: `${distractorC}`, isCorrect: false, reason: "confuses with 45-45-90 triangle properties" },
      { text: `${distractorD}`, isCorrect: false, reason: "confuses with 30-60-90 triangle leg relationships" }
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
    const explanation = `Choice ${correctLetter} is correct. Triangle $ABC$ is equilateral with all sides equal to ${side}. The altitude $BD$ bisects side $AC$, so $AD = \\frac{${side}}{2} = ${answer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: "In $\\triangle ABC$ above, what is the length of $\\overline{AD}$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 13d9a1c3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Hypotenuse: 8, 30° angle, opposite side: 4 (half hypotenuse)]
 * - Difficulty factors: [30-60-90 triangle properties, side opposite 30° is half hypotenuse]
 * - Distractor patterns: [Fill-in-the-blank, no multiple choice]
 * - Constraints: [Must be 30-60-90 triangle, answer is half the hypotenuse]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [30-60-90 triangle with labeled angles]
 */

// File: generators/RightTrianglesAndTrigonometry/13d9a1c3.ts