import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1363
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 40-60, b: √80-√120, c: 50-70]
 * - Difficulty factors: [Complementary angles, cofunction identity]
 * - Constraints: [cos(RSW) = sin(WST) because angles sum to 90°]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with right angle at S]
 */

export const generator_1363 = {
  metadata: {
    id: "1363",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Generate Pythagorean triples with a radical side
    const a = getRandomInt(40, 60);
    const bSquared = getRandomElement([80, 96, 105, 120]);
    const b = Math.sqrt(bSquared);
    const c = Math.sqrt(a * a + bSquared);

    const _svg_0 = Math.round(c);
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-_svg_0,xmax=5;
      const ymin=-2,ymax=15;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-(Math.round(c)),xmax=5;
      const ymin=-2,ymax=15;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<circle cx="'+mx(0)+'" cy="'+my(0)+'" r="4" fill="currentColor"/>';
    })()}${(() => {
      const xmin=-(Math.round(c)),xmax=5;
      const ymin=-2,ymax=15;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<circle cx="'+mx(0)+'" cy="'+my((b))+'" r="4" fill="currentColor"/>';
    })()}</svg></div>`;

    return {
      questionText: `In triangle RST above, point W (not shown) lies on RT. What is the value of $\\cos (\\angle RSW) - \\sin (\\angle WST)$?`,
      figureCode: mafsCode,
      options: [],
      correctAnswer: "0",
      explanation: `The correct answer is 0. Note that no matter where point W is on $RT$, the sum of the measures of $\\angle RSW$ and $\\angle WST$ is equal to the measure of $\\angle RST$, which is $90^{\circ}$. Thus, $\\angle RSW$ and $\\angle WST$ are complementary angles. Since the cosine of an angle is equal to the sine of its complement, $\\cos(\\angle RSW) = \\sin(\\angle WST)$, so their difference is 0.`
    };
  }
};
