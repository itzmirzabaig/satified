import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1358
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [diagonal: 3√17, shorter side: 3]
 * - Difficulty factors: [Pythagorean theorem with radicals, solving for unknown side]
 * - Constraints: [Longer side = √(153-9) = √144 = 12]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Rectangle with diagonal]
 */

export const generator_1358 = {
  metadata: {
    id: "1358",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: Diagonal = 3√17, shorter side = 3
    // Longer side = √((3√17)² - 3²) = √(153 - 9) = √144 = 12
    
    // Generate pattern: diagonal = m√(k), shorter side = m, longer side = m√(k-1)
    // Need k-1 to be perfect square
    const squares = [4, 9, 16, 25, 36, 49, 64];
    const perfectSquare = getRandomElement(squares);
    const k = perfectSquare + 1;
    const m = getRandomInt(2, 5);
    
    const shorterSide = m;
    const diagonalCoef = m;
    const longerSide = m * Math.sqrt(perfectSquare);
    
    const _svg_0 = shorterSide + 2; const _svg_1 = longerSide + 2;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=_svg_1;
      const ymin=-2,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-2,xmax=(longerSide + 2);
      const ymin=-2,ymax=(shorterSide + 2);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(0)+'" y1="'+my(0)+'" x2="'+mx((longerSide))+'" y2="'+my((shorterSide))+'" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;

    return {
      questionText: `The length of a rectangle's diagonal is $${diagonalCoef}\\\\sqrt{${k}}$, and the length of the rectangle's shorter side is ${shorterSide}. What is the length of the rectangle's longer side?`,
      figureCode: mafsCode,
      options: null, // Fill in the blank
      correctAnswer: longerSide.toString(),
      explanation: `By Pythagoras: $${shorterSide}^2 + x^2 = (${diagonalCoef}\\\\sqrt{${k}})^2 \\\\implies ${shorterSide * shorterSide} + x^2 = ${diagonalCoef * diagonalCoef * k} \\\\implies x^2 = ${diagonalCoef * diagonalCoef * k - shorterSide * shorterSide} \\\\implies x = ${longerSide}$.`
    };
  }
};
