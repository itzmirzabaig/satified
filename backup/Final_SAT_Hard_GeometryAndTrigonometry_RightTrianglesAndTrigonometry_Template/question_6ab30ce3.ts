import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6ab30ce3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan(A) = √3, DF = 125]
 * - Difficulty factors: [tan value implies angle, 30-60-90 triangle properties, cosine relationship]
 * - Constraints: [tan(A) = √3 means A = 60°, cos(60°) = 1/2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with angle labels]
 */

export const generator_6ab30ce3 = {
  metadata: {
    // id: "6ab30ce3",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: tan(A) = √3 means A = 60°
    // Since A corresponds to D, angle D = 60°
    // DF is adjacent to D, DE is hypotenuse
    // cos(60°) = DF/DE = 1/2, so DE = 2×DF = 250
    
    // Generate angle where tan is nice
    const angles = [
      { angle: 30, tan: "\\\\frac{1}{\\\\sqrt{3}}", cos: "\\\\frac{\\\\sqrt{3}}{2}", multiplier: "\\\\frac{2}{\\\\sqrt{3}}" },
      { angle: 60, tan: "\\\\sqrt{3}", cos: "\\\\frac{1}{2}", multiplier: "2" }
    ];
    
    const angleData = getRandomElement(angles);
    const df = getRandomInt(50, 200);
    
    // Calculate DE based on angle
    let de: string;
    let deValue: number;
    
    if (angleData.angle === 60) {
      deValue = 2 * df;
      de = deValue.toString();
    } else {
      deValue = Math.round((2 * df) / Math.sqrt(3));
      de = `\\\\frac{${2 * df}}{\\\\sqrt{3}}`;
    }
    
    const height = df * Math.tan(angleData.angle * Math.PI / 180);
    
    const _svg_0 = height + 20; const _svg_1 = df + 20;
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
      const xmin=-20,xmax=${df + 20};
      const ymin=-20,ymax=${height + 20};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-10)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">D</text>';
    })()}${(() => {
      const xmin=-20,xmax=${df + 20};
      const ymin=-20,ymax=${height + 20};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${df})+'" y="'+my(-10)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">F</text>';
    })()}${(() => {
      const xmin=-20,xmax=${df + 20};
      const ymin=-20,ymax=${height + 20};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${df})+'" y="'+my(${height + 5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">E</text>';
    })()}</svg></div>`;

    const optionsData = [
      { text: `${df} \\\\frac{${angleData.angle === 60 ? '1' : '\\\\sqrt{3}}'}{${angleData.angle === 60 ? '2' : '3'}}`, isCorrect: false, reason: "uses sine instead of cosine or makes algebraic error" },
      { text: `${df} \\\\frac{${angleData.angle === 60 ? '\\\\sqrt{3}' : '1'}}{${angleData.angle === 60 ? '2' : '2'}}`, isCorrect: false, reason: "calculates wrong side or uses wrong trig function" },
      { text: `${df} \\\\sqrt{3}`, isCorrect: false, reason: "confuses with tangent or multiplies by √3 incorrectly" },
      { text: de, isCorrect: true, reason: `correct: cos(${angleData.angle}°) = adjacent/hypotenuse, so hypotenuse = adjacent/cos(${angleData.angle}°)` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. $\\\\tan A = ${angleData.tan} \\\\implies \\\\tan D = ${angleData.tan}$, so $D = ${angleData.angle}^{\\\\circ}$. In right triangle $DEF$, $DF = ${df}$ is adjacent to $D$. The hypotenuse $DE = DF / \\\\cos ${angleData.angle}^{\\\\circ} = ${df} / ${angleData.cos} = ${de}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Triangle $ABC$ is similar to triangle $DEF$, where $A$ corresponds to $D$ and $C$ corresponds to $F$. Angles $C$ and $F$ are right angles. If $\\\\tan(A) = ${angleData.tan}$ and $DF = ${df}$, what is the length of $\\overline{DE}$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: de,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 7c25b0dc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [diagonal: 3√17, shorter side: 3]
 * - Difficulty factors: [Pythagorean theorem with radicals, solving for unknown side]
 * - Constraints: [Longer side = √(153-9) = √144 = 12]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Rectangle with diagonal]
 */