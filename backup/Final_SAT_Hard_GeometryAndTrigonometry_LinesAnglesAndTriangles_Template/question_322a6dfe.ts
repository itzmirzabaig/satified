import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_322a6dfe = {
  metadata: {
    // id: "322a6dfe",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate angle and side lengths (sides are extraneous)
    const angleS = getRandomInt(100, 150);
    const PS = getRandomInt(30, 60);
    const WZ = Math.round(PS / getRandomInt(3, 6));
    
    // STEP 2: Create options
    const scaleFactor = PS / WZ;
    const optionsData = [
      { 
        text: `$${(angleS / scaleFactor).toFixed(0)}^\\\\circ$`, 
        isCorrect: false,
        reason: "results from confusing side length ratios with angle measures"
      },
      { 
        text: `$${(angleS / scaleFactor * 2).toFixed(0)}^\\\\circ$`, 
        isCorrect: false,
        reason: "is incorrect as angles in similar figures are congruent, not scaled"
      },
      { 
        text: `$${(180 - angleS).toFixed(0)}^\\\\circ$`, 
        isCorrect: false,
        reason: "is incorrect"
      },
      { 
        text: `$${angleS}^\\\\circ$`, 
        isCorrect: true,
        reason: "corresponding angles in similar polygons are equal"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build Mafs code with randomized coordinates
    const pX = 0;
    const pY = 0;
    const qX = getRandomInt(15, 25);
    const qY = 0;
    const rX = qX + getRandomInt(3, 6);
    const rY = getRandomInt(15, 25);
    const sX = getRandomInt(3, 8);
    const sY = rY + getRandomInt(3, 6);
    
    const wX = qX + getRandomInt(8, 12);
    const wY = 0;
    const xX = wX + getRandomInt(3, 5);
    const xY = 0;
    const yX = xX + 1;
    const yY = getRandomInt(3, 6);
    const zX = wX + 1;
    const zY = yY + 1;
    
    const _svg_0 = Math.max(sY;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;; const _svg_1 = Math.max(rX;
      const ymin=${-1; const _svg_2 = -1;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_2,xmax=_svg_1,ymax=_svg_})()}</svg></div>`;
    
    return {
      questionText: `Quadrilaterals $PQRS$ and $WXYZ$ are similar, where $P, Q$, and $R$ correspond to $W, X$, and $Y$, respectively. The measure of $\\\\angle S$ is $${angleS}^\\\\circ$, $PS=${PS}$, and $WZ=${WZ}$. What is the measure of $\\\\angle Z$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Since quadrilaterals $PQRS$ and $WXYZ$ are similar, their corresponding angles are congruent. The problem states that vertices $P, Q$, and $R$ correspond to $W, X$, and $Y$, respectively, implying $S$ corresponds to $Z$. Therefore, ${correctOption.reason}, and the measure of $\\\\angle Z$ is $${angleS}^\\\\circ$. The side lengths ($PS=${PS}$ and $WZ=${WZ}$) are extraneous information. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: eeb4143c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area range: 48-60, height values create fractions]
 * - Difficulty factors: [Similar triangles, area bounds, integer constraint on y]
 * - Distractor patterns: [N/A - multiple correct answers possible]
 * - Constraints: [Similar triangles give ratio x/y = 5/12, area = 6y]
 * - Question type: [Figure→Fill in the blank, multi-accept]
 */

// File: generators/lines-angles-and-triangles/eeb4143c.ts