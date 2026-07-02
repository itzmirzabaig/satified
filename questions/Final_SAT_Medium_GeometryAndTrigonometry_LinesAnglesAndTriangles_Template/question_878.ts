import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 878
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 55-65 and 60-70 degrees]
 * - Difficulty factors: [Parallel lines, triangle sum, corresponding angles]
 * - Distractor patterns: [A: took angle BDC directly, C: took angle ACE directly, D: sum of two angles]
 * - Constraints: [AE || BD, triangle ACE sum = 180]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Triangle with parallel line segment]
 */

export const generator_878 = {
  metadata: {
    id: "878",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random angles
    const angleBDC = getRandomInt(55, 65);
    const angleACE = getRandomInt(60, 70);
    const angleCAE = 180 - angleACE - angleBDC; // Since angle AEC = angle BDC (corresponding)
    
    // STEP 2: Build Mafs code with calculated positions
    const ax = 0;
    const ay = 0;
    const ex = 6;
    const ey = 0;
    const cx = 2;
    const cy = 4;
    const bdY = 2;
    const bx = 1.2;
    const dx = 4.8;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=7;
      const ymin=-1,ymax=6;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-1,xmax=7;
      const ymin=-1,ymax=6;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((bx))+'" y1="'+my((bdY))+'" x2="'+mx((dx))+'" y2="'+my((bdY))+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=-1,xmax=7;
      const ymin=-1,ymax=6;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((cx + 1))+'" y="'+my((cy + 1.3))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-1,xmax=7;
      const ymin=-1,ymax=6;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((bx - 0.2))+'" y="'+my((bdY - 0.2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-1,xmax=7;
      const ymin=-1,ymax=6;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((dx + 0.2))+'" y="'+my((bdY - 0.2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">D</text>';
    })()}${(() => {
      const xmin=-1,xmax=7;
      const ymin=-1,ymax=6;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((ax - 0.3))+'" y="'+my((ay - 0.3))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=-1,xmax=7;
      const ymin=-1,ymax=6;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((ex + 0.3))+'" y="'+my((ey - 0.3))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">E</text>';
    })()}${(() => {
      const xmin=-1,xmax=7;
      const ymin=-1,ymax=6;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((dx + 0.5))+'" y="'+my((bdY + 0.3))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${angleBDC^°</text>';
    })()}${(() => {
      const xmin=-1,xmax=7;
      const ymin=-1,ymax=6;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((cx + 0.5))+'" y="'+my((cy - 0.7))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${angleACE^°</text>';
    })()}</svg></div>`;

    // STEP 3: Create options
    const distractorA = angleBDC;
    const distractorC = angleACE;
    const distractorD = angleBDC + angleACE;
    
    const optionsData = [
      { text: `$${distractorA}^\\\\circ$`, isCorrect: false, reason: "incorrectly assumes angle CAE equals angle BDC" },
      { text: `$${angleCAE}^\\\\circ$`, isCorrect: true },
      { text: `$${distractorC}^\\\\circ$`, isCorrect: false, reason: "incorrectly uses angle ACE as the answer" },
      { text: `$${distractorD}^\\\\circ$`, isCorrect: false, reason: "incorrectly adds the two given angles" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `In the figure above, segments $AE$ and $BD$ are parallel. If angle $BDC$ measures $${angleBDC}^{\\\\circ}$ and angle $ACE$ measures $${angleACE}^{\\\\circ}$, what is the measure of angle $CAE$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${angleCAE}°`,
      explanation: `Choice ${correctOption.letter} is correct. Since $AE \\\\parallel BD$, corresponding angles are equal, so $m\\\\angle AEC = m\\\\angle BDC = ${angleBDC}^{\\\\circ}$. In $\\\\triangle ACE$, the sum of the angles is $180^{\\\\circ}$: $m\\\\angle CAE + m\\\\angle ACE + m\\\\angle AEC = 180^{\\\\circ}$. Substituting known values: $m\\\\angle CAE + ${angleACE} + ${angleBDC} = 180 \\\\implies m\\\\angle CAE + ${angleACE + angleBDC} = 180$, so $m\\\\angle CAE = ${angleCAE}^{\\\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
