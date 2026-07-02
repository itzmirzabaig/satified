import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 92eb236a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan = √3/3]
 * - Difficulty factors: [Complementary angles in right triangle, reciprocal relationship of tangents]
 * - Constraints: [tan(A) × tan(90°-A) = 1, tan(30°) = 1/√3 = √3/3]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with acute angles labeled]
 */

export const generator_92eb236a = {
  metadata: {
    // id: "92eb236a",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: tan(one angle) = √3/3 = 1/√3 = tan(30°)
    // Other angle is 60°, tan(60°) = √3 = 3/√3
    
    // The tangent of complementary angles are reciprocals
    // If tan(A) = √3/3, then tan(90°-A) = 3/√3 = √3
    
    const base = getRandomInt(1, 5);
    const shorterLeg = base;
    const longerLeg = base * Math.sqrt(3);
    
    const _svg_0 = shorterLeg + 2; const _svg_1 = longerLeg + 2;
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
      const xmin=-2,xmax=${longerLeg + 2};
      const ymin=-2,ymax=${shorterLeg + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(1)+'" y="'+my(0.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">30^{°</text>';
    })()}${(() => {
      const xmin=-2,xmax=${longerLeg + 2};
      const ymin=-2,ymax=${shorterLeg + 2};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${longerLeg - 1})+'" y="'+my(${shorterLeg - 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">60^{°</text>';
    })()}</svg></div>`;

    const optionsData = [
      { text: `-\\\\frac{\\\\sqrt{3}}{3}`, isCorrect: false, reason: "incorrectly adds negative sign" },
      { text: `-\\\\frac{3}{\\\\sqrt{3}}`, isCorrect: false, reason: "incorrectly adds negative sign" },
      { text: `\\\\frac{\\\\sqrt{3}}{3}`, isCorrect: false, reason: "gives the original tangent, not the complementary angle" },
      { text: `\\\\frac{3}{\\\\sqrt{3}}`, isCorrect: true, reason: "correct: reciprocal of √3/3, rationalized" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Tangents of complementary acute angles are reciprocals. Reciprocal of $\\\\frac{\\\\sqrt{3}}{3}$ is $\\\\frac{3}{\\\\sqrt{3}} = \\\\sqrt{3}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `In a right triangle, the tangent of one of the two acute angles is $\\\\frac{\\\\sqrt{3}}{3}$. What is the tangent of the other acute angle?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `\\\\frac{3}{\\\\sqrt{3}}`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: a67b9f88
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [RS = √105, ST = 52, RT = 53 (Pythagorean triple)]
 * - Difficulty factors: [Complementary angles, cofunction identity]
 * - Constraints: [cos(RSW) = sin(WST) because angles sum to 90°]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with right angle at S]
 */