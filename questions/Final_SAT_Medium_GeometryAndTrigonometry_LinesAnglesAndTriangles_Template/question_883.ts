import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 883
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height1: 8-15, shadow1: 4-8, shadow2: 2-4]
 * - Difficulty factors: [Similar triangles, proportion setup, shadow word problem]
 * - Distractor patterns: [A: subtracted instead of proportion, C: multiplied instead, D: reversed ratio]
 * - Constraints: [height1/shadow1 = height2/shadow2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two similar right triangles representing trees and shadows]
 */

export const generator_883 = {
  metadata: {
    id: "883",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values ensuring clean integer answer
    const ratio = getRandomInt(2, 3); // height/shadow ratio (2:1 or 3:1)
    const shadow1 = getRandomInt(4, 8);
    const height1 = ratio * shadow1;
    const shadow2 = getRandomInt(2, 4);
    const height2 = ratio * shadow2;
    
    // STEP 2: Build Mafs code with calculated positions
    const spacing = shadow1 + 2;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=12;
      const ymin=-1,ymax=11;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-1,xmax=12;
      const ymin=-1,ymax=11;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0)+'" y1="'+my(0)+'" x2="'+mx((shadow1 + 1))+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=-1,xmax=12;
      const ymin=-1,ymax=11;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0.5)+'" y="'+my((height1 / 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${height1</text>';
    })()}${(() => {
      const xmin=-1,xmax=12;
      const ymin=-1,ymax=11;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((shadow1 / 2))+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${shadow1</text>';
    })()}${(() => {
      const xmin=-1,xmax=12;
      const ymin=-1,ymax=11;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((spacing + shadow2 / 2))+'" y="'+my((height2 / 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">h</text>';
    })()}${(() => {
      const xmin=-1,xmax=12;
      const ymin=-1,ymax=11;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((spacing + shadow2 / 2))+'" y="'+my(-0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${shadow2</text>';
    })()}</svg></div>`;

    // STEP 3: Create options
    const correctText = height2.toString();
    const distractorA = (height1 - shadow1 + shadow2).toString();
    const distractorC = Math.round(height1 * shadow2 / 2).toString();
    const distractorD = Math.round(height1 * shadow1 / shadow2).toString();
    
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from adding and subtracting values instead of using proportion" },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false, reason: "results from incorrect multiplication" },
      { text: distractorD, isCorrect: false, reason: "results from reversing the proportion" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Two nearby trees are perpendicular to the ground, which is flat. One of these trees is $${height1}$ feet tall and has a shadow that is $${shadow1}$ feet long. At the same time, the shadow of the other tree is $${shadow2}$ feet long. How tall, in feet, is the other tree?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The two trees and their shadows form similar triangles because the sun's rays strike the ground at the same angle. The ratio of height to shadow length is constant: $\\\\frac{${height1}}{${shadow1}} = \\\\frac{h}{${shadow2}}$. Solving for $h$ yields $h = ${height2}$ feet. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
