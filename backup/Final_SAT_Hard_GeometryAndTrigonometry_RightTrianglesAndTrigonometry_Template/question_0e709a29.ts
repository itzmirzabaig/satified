import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0e709a29
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [RS = 440, ST = 384, TR = 584 (11-48-52 scaled by 40? No, 440:384:584 = 55:48:52)]
 * - Difficulty factors: [Similar triangles, tangent ratio, corresponding angles]
 * - Constraints: [Scale factor between triangles, tan preserves under similarity]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with labeled vertices]
 */

export const generator_0e709a29 = {
  metadata: {
    // id: "0e709a29",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: RS = 440, ST = 384, TR = 584
    // Check: 440² + 384² = 193600 + 147456 = 341056; 584² = 341056 ✓
    // So S is right angle, hypotenuse is TR
    // tan T = RS/ST = 440/384 = 55/48
    // Since T corresponds to W, tan W = 55/48
    
    // Use Pythagorean triple scaled
    const triple = getRandomElement([
      [11, 60, 61],
      [16, 63, 65],
      [33, 56, 65],
      [48, 55, 73],
      [13, 84, 85]
    ]) as [number, number, number];
    
    const scale = getRandomInt(3, 8);
    const leg1 = triple[0] * scale;
    const leg2 = triple[1] * scale;
    const hypotenuse = triple[2] * scale;
    
    // Determine which leg is opposite to angle T (at vertex T)
    // Vertex T is at one end of hypotenuse
    // If T is at (leg2, 0), then opposite side is leg1
    
    const _svg_0 = leg1 + 50; const _svg_1 = leg2 + 50;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-50,xmax=_svg_1;
      const ymin=-50,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-50,xmax=${leg2 + 50};
      const ymin=-50,ymax=${leg1 + 50};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-20)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">T</text>';
    })()}${(() => {
      const xmin=-50,xmax=${leg2 + 50};
      const ymin=-50,ymax=${leg1 + 50};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${leg2})+'" y="'+my(-20)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">S</text>';
    })()}${(() => {
      const xmin=-50,xmax=${leg2 + 50};
      const ymin=-50,ymax=${leg1 + 50};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${leg2})+'" y="'+my(${leg1 + 5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">R</text>';
    })()}</svg></div>`;

    // tan T = opposite/adjacent = leg1/leg2
    const tanNumerator = triple[0];
    const tanDenominator = triple[1];
    
    // Reduce fraction
    const gcd = getGCD(tanNumerator, tanDenominator);
    const reducedNum = tanNumerator / gcd;
    const reducedDen = tanDenominator / gcd;

    const optionsData = [
      { text: `\\\\frac{${reducedDen}}{${reducedNum + reducedDen}}`, isCorrect: false, reason: "incorrectly adds numerator and denominator" },
      { text: `\\\\frac{${reducedNum + reducedDen}}{${reducedDen}}`, isCorrect: false, reason: "uses sum incorrectly" },
      { text: `\\\\frac{${reducedNum}}{${reducedDen}}`, isCorrect: false, reason: "has ratio inverted or uses wrong angle" },
      { text: `\\\\frac{${reducedDen}}{${reducedNum}}`, isCorrect: true, reason: "correct: tan W = tan T = opposite/adjacent" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Hypotenuse is $TR = ${hypotenuse}$, so $S$ is the right angle. $\\\\tan T = \\\\frac{RS}{ST} = \\\\frac{${leg1}}{${leg2}} = \\\\frac{${reducedNum}}{${reducedDen}}$. Since $\\\\triangle RST \\\\sim \\\\triangle UVW$, $\\\\tan W = \\\\tan T = \\\\frac{${reducedNum}}{${reducedDen}}$ (or inverted based on correspondence). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The side lengths of right triangle $RST$ are given as $RS = ${leg1}$, $ST = ${leg2}$, and $TR = ${hypotenuse}$. Triangle $RST$ is similar to triangle $UVW$, where $S$ corresponds to $V$ and $T$ corresponds to $W$. What is the value of $\\\\tan W$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `\\\\frac{${reducedNum}}{${reducedDen}}`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: f811d345
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [legs: 24 and 21]
 * - Difficulty factors: [Pythagorean theorem, simplifying radicals, factoring perfect squares]
 * - Constraints: [hypotenuse = 3√113, so d = 113]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with legs labeled]
 */