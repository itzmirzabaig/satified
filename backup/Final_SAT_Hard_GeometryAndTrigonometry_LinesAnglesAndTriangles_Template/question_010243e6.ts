import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 010243e6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates create isosceles right triangles, k is positive constant]
 * - Difficulty factors: [Coordinate geometry, isosceles right triangles, angle measures]
 * - Distractor patterns: [A: 90-(t-k), B: 90-(t+k), D: 90+k (incorrect operations)]
 * - Constraints: [Both triangles are 45-45-90 regardless of k]
 * - Question type: [Figure→Multiple Choice]
 */

export const generator_010243e6 = {
  metadata: {
    // id: "010243e6",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base coordinates and constant k
    const baseX = getRandomInt(2, 6);
    const baseY = getRandomInt(3, 7);
    const legLength = getRandomInt(2, 4);
    const k = getRandomInt(1, 5);
    
    // Both triangles are isosceles right triangles, so all non-right angles are 45°
    const t = 45;
    
    // STEP 2: Create options - only C is correct (90-t = 45)
    const optionsData = [
      { 
        text: `$(90-(t-${k}))^\\\\circ$`, 
        isCorrect: false,
        reason: "incorrectly subtracts k from t before subtracting from 90"
      },
      { 
        text: `$(90-(t+${k}))^\\\\circ$`, 
        isCorrect: false,
        reason: "incorrectly adds k to t before subtracting from 90"
      },
      { 
        text: `$(90-t)^\\\\circ$`, 
        isCorrect: true,
        reason: "both triangles are isosceles right triangles with 45° angles, so angle N = 45° = 90° - t°"
      },
      { 
        text: `$(90+${k})^\\\\circ$`, 
        isCorrect: false,
        reason: "incorrectly adds k to 90"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build Mafs code with proper viewBox
    const minX = baseX - 2;
    const maxX = baseX + legLength + k + 2;
    const minY = baseY - 2;
    const maxY = baseY + legLength + k + 2;
    
    const _svg_0 = maxY; const _svg_1 = minY; const _svg_2 = maxX; const _svg_3 = minX;
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
      const xmin=${minX},xmax=${maxX};
      const ymin=${minY},ymax=${maxY};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${baseX})+'" y="'+my(${baseY - 0.5})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">P, L</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `Triangles $PQR$ and $LMN$ are graphed in the $xy$-plane. Triangle $PQR$ has vertices $P, Q$, and $R$ at $(${baseX}, ${baseY})$, $(${baseX}, ${baseY + legLength})$, and $(${baseX + legLength}, ${baseY})$, respectively. Triangle $LMN$ has vertices $L, M$, and $N$ at $(${baseX}, ${baseY})$, $(${baseX}, ${baseY + legLength + k})$, and $(${baseX + legLength + k}, ${baseY})$, respectively, where $k$ is a positive constant. If the measure of $\\\\angle Q$ is $t^\\\\circ$, what is the measure of $\\\\angle N$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Both triangles are right isosceles triangles with legs of equal length (${legLength} for $PQR$, and ${legLength + k} for $LMN$). Thus all non-right angles are $45^\\\\circ$. Since $t = 45$, $\\\\angle N = 45^\\\\circ$, which is $90 - t$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 5b4757df
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [RT=72, LK=24, area=792, answer: 44/3]
 * - Difficulty factors: [Similar triangles, area formula, proportional reasoning, multi-step]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [LK || RT creates similar triangles, area gives ST]
 * - Question type: [Text→Fill in the blank]
 */

// File: generators/lines-angles-and-triangles/5b4757df.ts