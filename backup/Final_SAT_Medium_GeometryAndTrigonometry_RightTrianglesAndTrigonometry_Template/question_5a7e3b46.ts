import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 5a7e3b46
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [BC=136, cos A=3/5, AB=102 (3-4-5 triangle scaled by 34)]
 * - Difficulty factors: [3-4-5 triangle ratios, solving for side using cosine, multi-step]
 * - Distractor patterns: [34 (scale factor), 136 (given side), 170 (hypotenuse)]
 * - Constraints: [Must be 3-4-5 triangle relationship, BC is leg opposite A]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with right angle at B]
 */

export const generator_5a7e3b46 = {
  metadata: {
    // id: "5a7e3b46",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate 3-4-5 triangle with medium scale
    // Original: scale=34, sides 102-136-170, cos A=3/5
    const scale = getRandomInt(20, 50); // Medium scale for medium difficulty
    
    // Use 3-4-5 ratio: if cos A = 3/5, then adjacent=3k, hypotenuse=5k, opposite=4k
    const ratioAdjacent = 3;
    const ratioOpposite = 4;
    const ratioHypotenuse = 5;
    
    const AB = ratioAdjacent * scale; // Side adjacent to angle A
    const BC = ratioOpposite * scale; // Side opposite to angle A (given)
    const AC = ratioHypotenuse * scale; // Hypotenuse
    
    // STEP 2: Build Mafs code
    const viewBoxX = AC + 20;
    const viewBoxY = BC + 20;
    
    const _svg_0 = viewBoxY; const _svg_1 = viewBoxX;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-20,xmax=_svg_1;
      const ymin=-20,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-20,xmax=${viewBoxX};
      const ymin=-20,ymax=${viewBoxY};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-5)+'" y="'+my(${BC})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=-20,xmax=${viewBoxX};
      const ymin=-20,ymax=${viewBoxY};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-5)+'" y="'+my(-5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-20,xmax=${viewBoxX};
      const ymin=-20,ymax=${viewBoxY};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${AB + 5})+'" y="'+my(-5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-20,xmax=${viewBoxX};
      const ymin=-20,ymax=${viewBoxY};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${AB / 2})+'" y="'+my(-10)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${BC</text>';
    })()}${(() => {
      const xmin=-20,xmax=${viewBoxX};
      const ymin=-20,ymax=${viewBoxY};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-15)+'" y="'+my(${BC / 2})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">x</text>';
    })()}</svg></div>`;
    
    // STEP 3: Calculate answer
    const answer = AB;
    
    // STEP 4: Create options with tracking
    const correctText = answer.toString();
    const optionsData = [
      { text: scale.toString(), isCorrect: false, reason: "is just the scale factor, not the side length" },
      { text: answer.toString(), isCorrect: true, reason: "" },
      { text: BC.toString(), isCorrect: false, reason: "is the length of the given side BC, not AB" },
      { text: AC.toString(), isCorrect: false, reason: "is the hypotenuse length, not AB" }
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
    const explanation = `Choice ${correctLetter} is correct. In right triangle $ABC$, $\\cos A = \\frac{AB}{AC} = \\frac{${ratioAdjacent}}{${ratioHypotenuse}}$. This means the sides are in ratio $AB:BC:AC = ${ratioAdjacent}:${ratioOpposite}:${ratioHypotenuse}$. Given $BC = ${BC} = ${ratioOpposite} \\times ${scale}$, the scale factor is ${scale}. Therefore, $AB = ${ratioAdjacent} \\times ${scale} = ${answer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: `In $\\triangle ABC$, $\\angle B$ is a right angle and the length of $\\overline{BC}$ is ${BC} millimeters. If $\\cos A = \\frac{${ratioAdjacent}}{${ratioHypotenuse}}$, what is the length, in millimeters, of $\\overline{AB}$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: de550be0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Leg=6, Hypotenuse=21 (double-digit, not clean Pythagorean triple)]
 * - Difficulty factors: [Pythagorean theorem, solving for unknown leg, algebraic expression]
 * - Distractor patterns: [Correct radical form, squared form, simple subtraction, no square root]
 * - Constraints: [Must satisfy a² + b² = c², leg < hypotenuse]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with unknown side labeled 'a']
 */

// File: generators/RightTrianglesAndTrigonometry/de550be0.ts