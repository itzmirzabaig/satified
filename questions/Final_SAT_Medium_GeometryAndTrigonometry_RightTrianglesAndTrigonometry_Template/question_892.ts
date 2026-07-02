import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 892
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Triangle coordinates: [0,0], [3,0], [0,3] roughly - simple single-digit]
 * - Difficulty factors: [Right triangle trigonometry, cofunction identity, visual recognition]
 * - Distractor patterns: [tan X (wrong ratio), tan Y (wrong angle), cos X (wrong cofunction)]
 * - Constraints: [Must show right triangle with right angle at Z, X and Y are acute angles]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Static right triangle with labeled vertices]
 */

export const generator_892 = {
  metadata: {
    id: "892",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate right triangle dimensions
    // Simple right triangle with legs of different lengths
    const legX = getRandomInt(2, 5); // Horizontal leg
    const legY = getRandomInt(2, 5); // Vertical leg
    const hypotenuse = Math.sqrt(legX * legX + legY * legY);
    
    // Position vertices: Z at origin (right angle), X on y-axis, Y on x-axis
    const vertexZ = [0, 0];
    const vertexY = [legX, 0];
    const vertexX = [0, legY];
    
    // Calculate viewBox bounds
    const xMin = -1;
    const xMax = legX + 1;
    const yMin = -1;
    const yMax = legY + 1;
    
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
      return '<line x1="'+mx(0)+'" y1="'+my(0.3)+'" x2="'+mx(0.3)+'" y2="'+my(0.3)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0.3)+'" y1="'+my(0.3)+'" x2="'+mx(0.3)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-0.3)+'" y="'+my((legY + 0.2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">X</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((legX + 0.2))+'" y="'+my(-0.2)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Y</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-0.3)+'" y="'+my(-0.3)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Z</text>';
    })()}</svg></div>`;
    
    // STEP 3: The answer is cos(Y) due to cofunction identity: sin(X) = cos(Y)
    const correctText = "\\cos Y";
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: "\\tan X", isCorrect: false, reason: "uses tangent instead of sine/cosine relationship" },
      { text: "\\tan Y", isCorrect: false, reason: "uses wrong angle and wrong ratio" },
      { text: "\\cos X", isCorrect: false, reason: "uses same angle instead of complementary angle" },
      { text: "\\cos Y", isCorrect: true, reason: "" }
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
    const explanation = `Choice ${correctLetter} is correct. In a right triangle, $\\sin(X) = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{${legX}}{${hypotenuse.toFixed(2)}}$ and $\\cos(Y) = \\frac{\\text{adjacent to Y}}{\\text{hypotenuse}} = \\frac{${legX}}{${hypotenuse.toFixed(2)}}$. Since angles $X$ and $Y$ are complementary (add to $90^{\\circ}$), $\\sin(X) = \\cos(Y)$ by the cofunction identity. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: "Triangle $XYZ$ shown is a right triangle. Which of the following has the same value as $\\sin X$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
