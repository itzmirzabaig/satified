import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c9931030
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [RS = 20, ST = 48, TR = 52 (5-12-13 scaled by 4)]
 * - Difficulty factors: [Similar triangles, tangent ratio, identifying corresponding angles]
 * - Constraints: [tan T = 20/48 = 5/12]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with vertices labeled]
 */

export const generator_c9931030 = {
  metadata: {
    // id: "c9931030",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: 5-12-13 triangle scaled by 4
    // RS = 20 (5×4), ST = 48 (12×4), TR = 52 (13×4)
    // tan T = RS/ST = 20/48 = 5/12
    
    const triple = getRandomElement([
      [5, 12, 13],
      [8, 15, 17],
      [7, 24, 25],
      [20, 21, 29]
    ]) as [number, number, number];
    
    const scale = getRandomInt(2, 5);
    const opposite = triple[0] * scale;
    const adjacent = triple[1] * scale;
    const hypotenuse = triple[2] * scale;
    
    const _svg_0 = opposite + 10; const _svg_1 = adjacent + 10;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-10,xmax=_svg_1;
      const ymin=-10,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-10,xmax=${adjacent + 10};
      const ymin=-10,ymax=${opposite + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">T</text>';
    })()}${(() => {
      const xmin=-10,xmax=${adjacent + 10};
      const ymin=-10,ymax=${opposite + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${adjacent})+'" y="'+my(-5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">S</text>';
    })()}${(() => {
      const xmin=-10,xmax=${adjacent + 10};
      const ymin=-10,ymax=${opposite + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${adjacent})+'" y="'+my(${opposite + 3})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">R</text>';
    })()}</svg></div>`;

    // Reduce fraction
    const gcd = getGCD(triple[0], triple[1]);
    const reducedNum = triple[0] / gcd;
    const reducedDen = triple[1] / gcd;

    const optionsData = [
      { text: `\\\\frac{${reducedNum}}{${triple[2]}}`, isCorrect: false, reason: "uses hypotenuse instead of adjacent leg" },
      { text: `\\\\frac{${reducedNum}}{${reducedDen}}`, isCorrect: true, reason: "correct: tan T = opposite/adjacent" },
      { text: `\\\\frac{${reducedDen}}{${triple[2]}}`, isCorrect: false, reason: "uses wrong sides" },
      { text: `\\\\frac{${reducedDen}}{${reducedNum}}`, isCorrect: false, reason: "inverts the ratio" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Longest side $TR = ${hypotenuse}$ is hypotenuse, so $S$ is right angle. $\\\\tan T = \\\\frac{RS}{ST} = \\\\frac{${opposite}}{${adjacent}} = \\\\frac{${reducedNum}}{${reducedDen}}$. Since $T$ corresponds to $W$, $\\\\tan W = \\\\frac{${reducedNum}}{${reducedDen}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The side lengths of right triangle $RST$ are given as $RS = ${opposite}$, $ST = ${adjacent}$, and $TR = ${hypotenuse}$. Triangle $RST$ is similar to triangle $UVW$, where $S$ corresponds to $V$ and $T$ corresponds to $W$. What is the value of $\\\\tan W$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `\\\\frac{${reducedNum}}{${reducedDen}}`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 6933b3d9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Triangle RST with right angle at S]
 * - Difficulty factors: [Complementary angles, cofunction identity: cos(A) = sin(90°-A)]
 * - Constraints: [cos(RSW) - sin(WST) = 0 because angles are complementary]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with point W on hypotenuse]
 */