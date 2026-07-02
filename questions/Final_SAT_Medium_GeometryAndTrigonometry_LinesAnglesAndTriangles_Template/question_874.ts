import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 874
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2-5, angle: 45-65 degrees]
 * - Difficulty factors: [Similar triangles, corresponding angles equal]
 * - Distractor patterns: [A: multiplied angle by scale, B: added values, D: used scale as angle]
 * - Constraints: [Corresponding angles in similar triangles are congruent]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Nested similar triangles sharing vertex C]
 */

export const generator_874 = {
  metadata: {
    id: "874",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const scaleFactor = getRandomInt(2, 5);
    const angleCBD = getRandomInt(45, 65);
    
    // STEP 2: Build Mafs code with calculated positions
    const largeTriPoints = [[0, 0], [5, 0], [2, 4]];
    const innerPointX = 2.5;
    const innerPointY = 2;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=6;
      const ymin=-1,ymax=5;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-1,xmax=6;
      const ymin=-1,ymax=5;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((innerPointX))+'" y1="'+my(0)+'" x2="'+mx((innerPointX))+'" y2="'+my((innerPointY))+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=-1,xmax=6;
      const ymin=-1,ymax=5;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-0.3)+'" y="'+my(-0.3)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-1,xmax=6;
      const ymin=-1,ymax=5;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((innerPointX - 0.2))+'" y="'+my((innerPointY + 0.2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-1,xmax=6;
      const ymin=-1,ymax=5;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((innerPointX - 0.4))+'" y="'+my((innerPointY - 0.2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${angleCBD^°</text>';
    })()}</svg></div>`;

    // STEP 3: Create options
    const optionsData = [
      { text: `(${scaleFactor} \\\\cdot ${angleCBD})^\\\\circ`, isCorrect: false, reason: "incorrectly multiplies the scale factor by the angle measure" },
      { text: `(${scaleFactor}+${angleCBD})^\\\\circ`, isCorrect: false, reason: "incorrectly adds the scale factor to the angle measure" },
      { text: `${angleCBD}^\\\\circ`, isCorrect: true },
      { text: `${scaleFactor}^\\\\circ`, isCorrect: false, reason: "confuses the scale factor with the angle measure" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `In the figure shown, triangle $CAE$ is similar to triangle $CBD$. The measure of angle $CBD$ is $${angleCBD}^{\\\\circ}$, and $AE=${scaleFactor}(BD)$. What is the measure of angle $CAE$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${angleCBD}^\\\\circ`,
      explanation: `Choice ${correctOption.letter} is correct. Since $\\\\triangle CAE \\\\sim \\\\triangle CBD$, corresponding angles must have equal measures. Angle $CBD$ corresponds to angle $CAE$. Given $m\\\\angle CBD = ${angleCBD}^{\\\\circ}$, it follows that $m\\\\angle CAE = ${angleCBD}^{\\\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
