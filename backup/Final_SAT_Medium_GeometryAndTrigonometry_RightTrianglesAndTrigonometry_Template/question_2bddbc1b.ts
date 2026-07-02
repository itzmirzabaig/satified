import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2bddbc1b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Adjacent: 41, Hypotenuse: 42 (double-digit, close values)]
 * - Difficulty factors: [Cosine ratio, identifying adjacent side vs hypotenuse]
 * - Distractor patterns: [Reciprocal (42/41), adjacent/hypotenuse reversed, 1/adjacent, 1/hypotenuse]
 * - Constraints: [Must satisfy triangle inequality, hypotenuse must be longest side]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with angle A at origin]
 */

export const generator_2bddbc1b = {
  metadata: {
    // id: "2bddbc1b",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate right triangle with adjacent and hypotenuse close in value
    // This creates a "steep" triangle where the angle is small
    // Original: adjacent=41, hypotenuse=42
    const adjacent = getRandomInt(30, 60);
    // Hypotenuse must be slightly larger to create valid triangle
    const hypotenuse = adjacent + getRandomInt(1, 5);
    // Calculate opposite using Pythagorean theorem
    const opposite = Math.sqrt(hypotenuse * hypotenuse - adjacent * adjacent);
    
    // Position: A at origin, C on x-axis, B up
    const vertexA = [0, 0];
    const vertexC = [adjacent, 0];
    const vertexB = [adjacent, opposite];
    
    // Calculate viewBox bounds
    const xMin = -5;
    const xMax = adjacent + 5;
    const yMin = -5;
    const yMax = opposite + 5;
    
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
      return '<text x="'+mx(-1)+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${adjacent + 2})+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${adjacent + 1})+'" y="'+my(${opposite + 1})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${adjacent / 2})+'" y="'+my(-3)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${adjacent</text>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=${yMin},ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${adjacent + 3})+'" y="'+my(${opposite / 2})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${hypotenuse</text>';
    })()}</svg></div>`;
    
    // STEP 3: Calculate cosine
    const cosA = `${adjacent}/${hypotenuse}`;
    
    // STEP 4: Create options with tracking
    const correctText = cosA;
    const optionsData = [
      { text: `${hypotenuse}/${adjacent}`, isCorrect: false, reason: "reverses the ratio (secant)" },
      { text: cosA, isCorrect: true, reason: "" },
      { text: `1/${adjacent}`, isCorrect: false, reason: "uses reciprocal of adjacent only" },
      { text: `1/${hypotenuse}`, isCorrect: false, reason: "uses reciprocal of hypotenuse only" }
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
    const explanation = `Choice ${correctLetter} is correct. The cosine of an angle is defined as the ratio of the length of the leg adjacent to the angle to the length of the hypotenuse. For angle $A$, the adjacent side is ${adjacent} and the hypotenuse is ${hypotenuse}, so $\\cos A = \\frac{${adjacent}}{${hypotenuse}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: "What is the value of $\\cos A$ in the triangle shown?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

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

// File: generators/RightTrianglesAndTrigonometry/5a7e3b46.ts