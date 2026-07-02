import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 9acd101f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (0, 1), radius: 7, shift: down 2]
 * - Difficulty factors: [Vertical translation, negative direction]
 * - Distractor patterns: [Wrong sign on shift, shifting wrong direction]
 * - Constraints: [Downward shift decreases y-coordinate]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two circles stacked vertically - requires Mafs]
 */

export const generator_9acd101f = {
  metadata: {
    // id: "9acd101f",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const h = 0; // Keep centered for visual clarity
    const k = getRandomInt(2, 6);
    const r = getRandomInt(5, 10);
    const shift = getRandomInt(2, 5);
    
    // STEP 2: Calculate new center
    const newK = k - shift;
    
    // STEP 3: Build Mafs figure
    const _svg_0 = r + 3; const _svg_1 = k + r + 2;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-_svg_0,xmax=_svg_0;
      const ymin=-_svg_0,ymax=_svg_1;
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      const xstep=Math.ceil((_svg_0-(-_svg_0))/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0) continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-${r + 3},xmax=${r + 3};
      const ymin=-${r + 3},ymax=${k + r + 2};
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const r=(${k})*(400-2*40)/(${r + 3}-(-${r + 3}));
      return '<circle cx="'+mx(${h})+'" cy="'+my(${k})+'" r="'+r+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=-${r + 3},xmax=${r + 3};
      const ymin=-${r + 3},ymax=${k + r + 2};
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const r=(${newK})*(400-2*40)/(${r + 3}-(-${r + 3}));
      return '<circle cx="'+mx(${h})+'" cy="'+my(${newK})+'" r="'+r+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;

    // STEP 4: Generate options
    const correctText = `x^{2}+(y${newK >= 0 ? '-' : '+'}${Math.abs(newK)})^{2}=${r*r}`;
    
    const distractorA = `(x-${shift})^{2}+(y-${k})^{2}=${r*r}`; // Shifted x
    const distractorB = `x^{2}+(y-${k + shift})^{2}=${r*r}`; // Shifted up instead of down
    const distractorC = `(x+${shift})^{2}+(y-${k})^{2}=${r*r}`; // Shifted left
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The equation $x^{2}+(y-${k})^{2}=${r*r}$ represents circle A. Circle B is obtained by shifting circle A down ${shift} units in the $xy$-plane. Which of the following equations represents circle B?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Circle A has center $(${h}, ${k})$ and radius $${r}$. Shifting down ${shift} units changes the y-coordinate: $${k}-${shift}=${newK}$. The equation becomes $x^{2}+(y${newK >= 0 ? '-' : '+'}${Math.abs(newK)})^{2}=${r*r}$. Choice ${incorrectOptions[0].letter} is incorrect; this shifts horizontally. Choice ${incorrectOptions[1].letter} is incorrect; this shifts up instead of down. Choice ${incorrectOptions[2].letter} is incorrect; this also shifts horizontally.`
    };
  }
};

/**
 * Question ID: 244ff6c4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle: 92π/3, large angle reduction]
 * - Difficulty factors: [Coterminal angles, tangent periodicity (π)]
 * - Distractor patterns: [Wrong period, wrong quadrant]
 * - Constraints: [tan has period π, not 2π]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */