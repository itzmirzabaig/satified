import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1330
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [MP=3, NP=4 from 3-4-5 triangle, answer: 2.4]
 * - Difficulty factors: [Similar right triangles, geometric mean, altitude to hypotenuse]
 * - Distractor patterns: [A: 2.2, B: 2.3, D: 2.5 (close values)]
 * - Constraints: [Right triangle with altitude to hypotenuse creates similar triangles]
 * - Question type: [Figure→Multiple Choice]
 */

export const generator_1330 = {
  metadata: {
    id: "1330",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Pythagorean triple or simple right triangle
    const scale = getRandomInt(1, 3);
    const MN = 3 * scale;
    const NP = 4 * scale;
    const MP = 5 * scale;
    
    // STEP 2: Calculate NQ
    const NQ = (MN * NP) / MP;
    
    // STEP 3: Create distractors close to answer
    const distractorOffsets = [-0.2, -0.1, 0.1];
    const distractors = distractorOffsets.map(off => Math.round((NQ + off) * 10) / 10);
    
    const optionsData = [
      { text: distractors[0].toFixed(1), isCorrect: false },
      { text: distractors[1].toFixed(1), isCorrect: false },
      { text: NQ.toFixed(1), isCorrect: true },
      { text: distractors[2].toFixed(1), isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 5: Build Mafs code with randomized coordinates
    const nX = 0;
    const nY = 0;
    const pX = NP / scale;
    const pY = 0;
    const mX = 0;
    const mY = MN / scale;
    const qX = (NP / scale * NP / scale / MP * scale);
    const qY = (MN / scale * NP / scale / MP * scale);
    
    const _svg_0 = mY + 1; const _svg_1 = nY - 1; const _svg_2 = pX + 1; const _svg_3 = nX - 1;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_3,xmax=_svg_2;
      const ymin=_svg_1,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=(nX - 1),xmax=(pX + 1);
      const ymin=(nY - 1),ymax=(mY + 1);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((nX))+'" y1="'+my((nY))+'" x2="'+mx((qX.toFixed(2)))+'" y2="'+my((qY.toFixed(2)))+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(nX - 1),xmax=(pX + 1);
      const ymin=(nY - 1),ymax=(mY + 1);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((nX))+'" y="'+my((nY - 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">N</text>';
    })()}${(() => {
      const xmin=(nX - 1),xmax=(pX + 1);
      const ymin=(nY - 1),ymax=(mY + 1);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((pX))+'" y="'+my((pY - 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">P</text>';
    })()}${(() => {
      const xmin=(nX - 1),xmax=(pX + 1);
      const ymin=(nY - 1),ymax=(mY + 1);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((mX - 0.5))+'" y="'+my((mY))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">M</text>';
    })()}${(() => {
      const xmin=(nX - 1),xmax=(pX + 1);
      const ymin=(nY - 1),ymax=(mY + 1);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(((qX * 0.6).toFixed(2)))+'" y="'+my(((qY * 0.6).toFixed(2)))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Q</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `In the figure above, what is the length of $NQ$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. In right $\\\\triangle MNP$, $MP = \\\\sqrt{${MN}^2 + ${NP}^2} = ${MP}$. $\\\\triangle MNP$ is similar to $\\\\triangle NQP$. The ratio of corresponding sides is $\\\\frac{NQ}{MN} = \\\\frac{NP}{MP}$. Thus, $\\\\frac{NQ}{${MN}} = \\\\frac{${NP}}{${MP}}$, which results in $NQ = ${NQ.toFixed(1)}$.`
    };
  }
};
