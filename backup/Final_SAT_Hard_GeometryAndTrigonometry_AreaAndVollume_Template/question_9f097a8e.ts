import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9f097a8e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume ratio: 392, need factors that give 392 when squared×linear]
 * - Difficulty factors: [Cylinder volume scaling, factor pairs]
 * - Distractor patterns: [Various combinations of sqrt(392) factors]
 * - Constraints: [R²H = 392r²h, need integer or clean solutions]
 * - Question type: [Multiple choice text]
 * - Figure generation: [Cylinder diagram with Mafs]
 */

export const generator_9f097a8e = {
  metadata: {
    // id: "9f097a8e",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate the volume ratio by choosing radius and height scale factors
    // We need: (radiusScale)² × heightScale = volumeRatio
    // Original used 392 = 7² × 8
    const baseRadius = getRandomInt(2, 9);
    const baseHeight = getRandomInt(2, 12);
    const volumeRatio = baseRadius * baseRadius * baseHeight; // r² × h
    
    // STEP 2: Calculate correct answer
    const R = baseRadius; // radius scale factor
    const H = baseHeight; // height scale factor
    
    // STEP 3: Create distractors - wrong combinations
    // Swap R and H, or use R² instead of R, etc.
    const distractor1R = baseHeight; // swapped
    const distractor1H = baseRadius * baseRadius; // wrong relationship
    
    const distractor2R = baseRadius * baseRadius; // R² instead of R
    const distractor2H = baseHeight;
    
    const distractor3R = baseRadius;
    const distractor3H = baseHeight * baseHeight; // H² instead of H
    
    // STEP 4: Create options
    const correctText = `$R=${R}r$ and $H=${H}h$`;
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$R=${distractor1R}r$ and $H=${distractor1H}h$`, isCorrect: false },
      { text: `$R=${distractor2R}r$ and $H=${distractor2H}h$`, isCorrect: false },
      { text: `$R=${distractor3R}r$ and $H=${distractor3H}h$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Build Mafs figure for cylinder
    const r = 2; // example radius for visualization
    const h = 4; // example height for visualization
    
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-3,xmax=3;
      const ymin=-1,ymax=5;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
      const xstep=Math.max(1,Math.ceil((3-(-3))/8));
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0)continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      const ystep=Math.max(1,Math.ceil((5-(-1))/6));
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        if(y===0)continue;
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-3,xmax=3;
      const ymin=-1,ymax=5;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(-${r})+'" y1="'+my(0)+'" x2="'+mx(-${r})+'" y2="'+my(${h})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-3,xmax=3;
      const ymin=-1,ymax=5;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(${r})+'" y1="'+my(0)+'" x2="'+mx(${r})+'" y2="'+my(${h})+'" stroke="currentColor" stroke-width="2.5"/>';
    })()}${(() => {
      const xmin=-3,xmax=3;
      const ymin=-1,ymax=5;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-0.8)+'" text-anchor="middle" font-size="13" fill="currentColor">r</text>';
    })()}${(() => {
      const xmin=-3,xmax=3;
      const ymin=-1,ymax=5;
      const W=400,H=320,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${r + 0.3})+'" y="'+my(${h/2})+'" text-anchor="middle" font-size="13" fill="currentColor">h</text>';
    })()}</svg></div>`;
    
    return {
      questionText: `A second right circular cylinder (not shown) has a volume that is $${volumeRatio}$ times as large as the volume of the cylinder shown. Which of the following could represent the radius $R$, in terms of $r$, and the height $H$, in terms of $h$, of the second cylinder?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The volume of a cylinder is $V = \\pi r^2 h$. For the second cylinder: $V_{new} = \\pi R^2 H = ${volumeRatio} \\pi r^2 h$. If $R = ${R}r$ and $H = ${H}h$, then $R^2 H = (${R})^2 \\times ${H} = ${R*R} \\times ${H} = ${volumeRatio}$, which satisfies the equation $R^2 H = ${volumeRatio}r^2 h$. Choice ${incorrectOptions[0].letter} is incorrect because it swaps the radius and height scale factors. Choice ${incorrectOptions[1].letter} is incorrect because it uses $R^2$ instead of $R$. Choice ${incorrectOptions[2].letter} is incorrect because it uses $H^2$ instead of $H$.`
    };
  }
};

/**
 * Question ID: 167aff9e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [surface areas: 58 and 1450, volume Y: 1250]
 * - Difficulty factors: [Similar solids, surface area ratio → linear scale → volume scale]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Surface area ratio must be perfect square for clean scale factor]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */