import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 51f26ce8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ST: 10-18, QP: 12-20, PR: 15-25, QR: 20-30]
 * - Difficulty factors: [Similar triangles, corresponding sides, setting up proportion]
 * - Distractor patterns: [B: wrong correspondence, C: wrong sides used, D: wrong ratio direction]
 * - Constraints: [Triangle QPR ~ Triangle STR, maintain similarity ratio]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two similar triangles sharing angle at R]
 */

export const generator_51f26ce8 = {
  metadata: {
    // id: "51f26ce8",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values for similar triangles
    const scaleFactor = getRandomInt(2, 4);
    const ST = getRandomInt(10, 18); // Corresponds to QP
    const QP = ST * scaleFactor;
    const PR = getRandomInt(15, 25);
    const QR = getRandomInt(20, 30);
    
    // SR corresponds to QR, using proportion: QP/ST = QR/SR
    // SR = (ST * QR) / QP = QR / scaleFactor
    const SR_numerator = ST * QR;
    
    // STEP 2: Build Mafs code with calculated positions
    const px = 0;
    const py = 0;
    const rx = 20;
    const ry = 0;
    const qx = 0;
    const qy = 15;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=22;
      const ymin=-2,ymax=17;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-2,xmax=22;
      const ymin=-2,ymax=17;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${qx - 0.5})+'" y="'+my(${qy + 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Q</text>';
    })()}${(() => {
      const xmin=-2,xmax=22;
      const ymin=-2,ymax=17;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${px - 0.5})+'" y="'+my(${py - 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">P</text>';
    })()}${(() => {
      const xmin=-2,xmax=22;
      const ymin=-2,ymax=17;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${rx + 0.3})+'" y="'+my(${py - 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">R</text>';
    })()}${(() => {
      const xmin=-2,xmax=22;
      const ymin=-2,ymax=17;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${qx + 1.5})+'" y="'+my(${qy - 1})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">S</text>';
    })()}${(() => {
      const xmin=-2,xmax=22;
      const ymin=-2,ymax=17;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${rx - 2})+'" y="'+my(${ry + 5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">T</text>';
    })()}${(() => {
      const xmin=-2,xmax=22;
      const ymin=-2,ymax=17;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${qx + 1})+'" y="'+my(${qy / 2})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${QP</text>';
    })()}${(() => {
      const xmin=-2,xmax=22;
      const ymin=-2,ymax=17;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${(px + rx) / 2})+'" y="'+my(${py - 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${PR</text>';
    })()}${(() => {
      const xmin=-2,xmax=22;
      const ymin=-2,ymax=17;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${(qx + rx) / 2})+'" y="'+my(${(qy + ry) / 2 + 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${QR</text>';
    })()}${(() => {
      const xmin=-2,xmax=22;
      const ymin=-2,ymax=17;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${qx + 3})+'" y="'+my(${qy - 3})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${ST</text>';
    })()}</svg></div>`;

    // STEP 3: Create options
    const correctText = `\\\\frac{${SR_numerator}}{${QP}}`;
    const distractorB = `\\\\frac{${ST * QR}}{${PR}}`;
    const distractorC = `\\\\frac{${QP * ST}}{${PR}}`;
    const distractorD = `\\\\frac{${QP * QR}}{${SR_numerator}}`;
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "uses PR instead of QP in the denominator" },
      { text: distractorC, isCorrect: false, reason: "uses incorrect combination of sides" },
      { text: distractorD, isCorrect: false, reason: "inverts the proportion" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `$\\\\triangle QPR$ is similar to $\\\\triangle STR$. The lengths represented by $\\\\overline{ST}$, $\\\\overline{QP}$, $\\\\overline{PR}$, and $\\\\overline{QR}$ in the figure are ${ST}, ${QP}, ${PR}, and ${QR}, respectively. What is the length of $\\\\overline{SR}$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Since $\\\\triangle QPR \\\\sim \\\\triangle STR$, corresponding sides are proportional: $\\\\frac{QP}{ST} = \\\\frac{QR}{SR}$. Substituting the given values: $\\\\frac{${QP}}{${ST}} = \\\\frac{${QR}}{SR}$. Cross-multiplying gives $${QP} \\\\cdot SR = ${SR_numerator}$, so $SR = \\\\frac{${SR_numerator}}{${QP}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 933fee1a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 25-45 degrees for acute angles in right triangles]
 * - Difficulty factors: [Similar right triangles, complementary angles, trigonometric ratios]
 * - Distractor patterns: [A: swapped ratio, C: wrong angle pair, D: wrong angle pair]
 * - Constraints: [Triangles are similar via AA, angles sum to 90]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two right triangles with labeled acute angles]
 */
