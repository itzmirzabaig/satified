import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1352
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [30-60-90 triangle with hypotenuse 54]
 * - Difficulty factors: [Special right triangle ratios, tangent calculation, angle identification]
 * - Constraints: [Must use 30-60-90 triangle ratios: 1 : √3 : 2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [30-60-90 triangle with angles labeled]
 */

export const generator_1352 = {
  metadata: {
    id: "1352",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: 30-60-90 triangle, hypotenuse = 54
    // Short leg (opposite 30°) = 27, long leg (opposite 60°) = 27√3
    // Angle A = 60°, tan(A) = opposite/adjacent = 27√3/27 = √3
    
    // Generate hypotenuse as multiple of 2 for clean numbers
    const base = getRandomInt(2, 8);
    const hypotenuse = base * 6; // Makes short leg = base × 3, clean for display
    const shortLeg = hypotenuse / 2;
    const longLeg = shortLeg * Math.sqrt(3);
    
    // Angle labels: B = 30°, C = 90°, A = 60°
    // Triangle positioned with right angle at C, short leg along x-axis
    
    const _svg_0 = shortLeg + 10; const _svg_1 = longLeg + 10;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-5,xmax=_svg_1;
      const ymin=-5,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-5,xmax=(longLeg + 10);
      const ymin=-5,ymax=(shortLeg + 10);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-2)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B (30^{°)</text>';
    })()}${(() => {
      const xmin=-5,xmax=(longLeg + 10);
      const ymin=-5,ymax=(shortLeg + 10);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((longLeg))+'" y="'+my(-2)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C (90^{°)</text>';
    })()}${(() => {
      const xmin=-5,xmax=(longLeg + 10);
      const ymin=-5,ymax=(shortLeg + 10);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((longLeg))+'" y="'+my((shortLeg + 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A (60^{°)</text>';
    })()}${(() => {
      const xmin=-5,xmax=(longLeg + 10);
      const ymin=-5,ymax=(shortLeg + 10);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((longLeg / 2))+'" y="'+my((shortLeg + 3))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${hypotenuse</text>';
    })()}</svg></div>`;

    const optionsData = [
      { text: `\\\\frac{\\\\sqrt{3}}{${hypotenuse}}`, isCorrect: false, reason: "incorrectly places hypotenuse in denominator" },
      { text: `\\\\frac{1}{\\\\sqrt{3}}`, isCorrect: false, reason: "uses reciprocal or wrong angle" },
      { text: `\\\\sqrt{3}`, isCorrect: true, reason: "correct: tan(60°) = √3" },
      { text: `${shortLeg}\\\\sqrt{3}`, isCorrect: false, reason: "confuses tangent with side length" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Angle $B = 30^{\\\\circ}$ and $C = 90^{\\\\circ}$, so angle $A = 60^{\\\\circ}$. In a 30-60-90 triangle with hypotenuse ${hypotenuse}, the leg opposite $30^{\\\\circ}$ ($AC$) is ${shortLeg}, and the leg opposite $60^{\\\\circ}$ ($BC$) is ${shortLeg}\\\\sqrt{3}$. $\\\\tan A = \\\\tan 60^{\\\\circ} = \\\\frac{\\\\text{opp}}{\\\\text{adj}} = \\\\frac{${shortLeg}\\\\sqrt{3}}{${shortLeg}} = \\\\sqrt{3}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Right triangle $ABC$ is shown. What is the value of $\\\\tan A$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "\\sqrt{3}",
      explanation: explanation
    };
  }
};
