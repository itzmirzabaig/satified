import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 882
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 25-45 degrees for acute angles in right triangles]
 * - Difficulty factors: [Similar right triangles, complementary angles, trigonometric ratios]
 * - Distractor patterns: [A: swapped ratio, C: wrong angle pair, D: wrong angle pair]
 * - Constraints: [Triangles are similar via AA, angles sum to 90]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two right triangles with labeled acute angles]
 */

export const generator_882 = {
  metadata: {
    id: "882",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const angleA = getRandomInt(25, 45);
    const angleB = 90 - angleA;
    const angleD = angleB; // Corresponding to angle B
    const angleE = 90 - angleD; // Corresponding to angle A
    
    // STEP 2: Build Mafs code with calculated positions
    const tri1Width = 6;
    const tri1Height = 3;
    const tri2Width = 6;
    const tri2Height = 3;
    const spacing = 7;
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=14;
      const ymin=-1,ymax=7;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-1,xmax=14;
      const ymin=-1,ymax=7;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-0.3)+'" y="'+my(-0.3)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-1,xmax=14;
      const ymin=-1,ymax=7;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((tri1Width + 0.3))+'" y="'+my(-0.3)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-1,xmax=14;
      const ymin=-1,ymax=7;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-0.3)+'" y="'+my((tri1Height + 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A(${angleA^°)</text>';
    })()}${(() => {
      const xmin=-1,xmax=14;
      const ymin=-1,ymax=7;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((spacing + tri2Width + 0.3))+'" y="'+my(-0.3)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">F</text>';
    })()}${(() => {
      const xmin=-1,xmax=14;
      const ymin=-1,ymax=7;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((spacing - 0.3))+'" y="'+my((tri2Height + 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">D(${angleD^°)</text>';
    })()}${(() => {
      const xmin=-1,xmax=14;
      const ymin=-1,ymax=7;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((spacing + tri2Width + 0.3))+'" y="'+my((tri2Height + 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">E</text>';
    })()}</svg></div>`;

    // STEP 3: Create options
    const optionsData = [
      { text: "\\\\frac{DE}{DF}", isCorrect: false, reason: "represents the ratio for a different angle" },
      { text: "\\\\frac{DF}{DE}", isCorrect: true },
      { text: "\\\\frac{DF}{EF}", isCorrect: false, reason: "represents the cosine of angle D instead of sine" },
      { text: "\\\\frac{EF}{DE}", isCorrect: false, reason: "represents the cosine of angle E" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Triangles $ABC$ and $DEF$ are shown above. Which of the following is equal to the ratio $\\\\frac{BC}{AB}$ ?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "\\\\frac{DF}{DE}",
      explanation: `Choice ${correctOption.letter} is correct. In right triangle $ABC$, $m\\\\angle B = 90 - ${angleA} = ${angleB}^{\\\\circ}$. Since $m\\\\angle D = ${angleD}^{\\\\circ}$ in $\\\\triangle DEF$, the triangles are similar ($\\\\triangle ABC \\\\sim \\\\triangle EFD$). The ratio $\\\\frac{BC}{AB}$ is the sine of $\\\\angle A$ (${angleA}^{\\\\circ}$). In $\\\\triangle DEF$, $\\\\angle E = 90 - ${angleD} = ${angleE}^{\\\\circ}$, and $\\\\sin(${angleA}^{\\\\circ}) = \\\\frac{DF}{DE}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
