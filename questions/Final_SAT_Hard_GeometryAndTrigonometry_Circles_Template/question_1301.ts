import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1301
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle: 30°, radius: 18]
 * - Difficulty factors: [Isosceles triangle, central angle calculation, arc length]
 * - Distractor patterns: [Using wrong angle, forgetting to convert to arc length]
 * - Constraints: [Triangle with two radii]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Circle with triangle, arc - requires Mafs]
 */

export const generator_1301 = {
  metadata: {
    id: "1301",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base angle (30° in original)
    const baseAngle = getRandomElement([25, 30, 35, 40, 45]);
    
    // STEP 2: Generate radius (larger number for difficulty)
    const r = getRandomInt(10, 25);
    
    // STEP 3: Calculate central angle
    // Triangle OAB is isosceles with OA = OB = r
    // Base angles are equal, so central angle = 180 - 2*baseAngle
    const centralAngle = 180 - 2 * baseAngle;
    
    // STEP 4: Calculate arc length
    // Arc length = 2πr × (centralAngle/360)
    const arcLengthNum = centralAngle * r;
    
    // Simplify: arcLength = (centralAngle/360) × 2πr = (centralAngle × r / 180) × π
    const arcMultiplier = (centralAngle * r) / 180;
    
    // Should be integer or simple fraction
    let arcLengthText: string;
    if (Number.isInteger(arcMultiplier)) {
      arcLengthText = `${arcMultiplier}\\\\pi`;
    } else {
      // Reduce fraction
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const g = gcd(centralAngle * r, 180);
      const num = (centralAngle * r) / g;
      const den = 180 / g;
      arcLengthText = den === 1 ? `${num}\\\\pi` : `\\\\frac{${num}\\\\pi}{${den}}`;
    }
    
    // STEP 5: Generate distractors
    // Distractor A: Using base angle instead of central angle
    const distractorAMult = (baseAngle * r) / 180;
    
    // Distractor C: Using wrong angle sum
    const distractorCMult = ((180 - baseAngle) * r) / 180;
    
    // Distractor D: Using full circle minus arc
    const distractorDMult = ((360 - centralAngle) * r) / 180;
    
    // STEP 6: Build Mafs figure
    const angleRad = centralAngle * Math.PI / 180;
    const _svg_0 = r + 4;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-_svg_0,xmax=_svg_0;
      const ymin=-_svg_0,ymax=_svg_0;
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
      const xmin=-(r + 4),xmax=(r + 4);
      const ymin=-(r + 4),ymax=(r + 4);
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const r=(0)*(400-2*40)/((r + 4)-(-(r + 4)));
      return '<circle cx="'+mx(0)+'" cy="'+my(0)+'" r="'+r+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;

    const correctText = arcLengthText;
    
    const optionsData = [
      { text: `${Math.round(distractorAMult)}\\\\pi`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `${Math.round(distractorCMult)}\\\\pi`, isCorrect: false },
      { text: `${Math.round(distractorDMult)}\\\\pi`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Point $O$ is the center of the circle above, and the measure of $\\\\angle OAB$ is ${baseAngle}^{\\\\circ}$. If the length of $\\\\overline{OC}$ is ${r}, what is the length of arc $\\\\overset{\\\\frown}{AB}$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Since $\\\\overline{OA}$ and $\\\\overline{OB}$ are radii, triangle $OAB$ is isosceles with base angles of ${baseAngle}^{\\\\circ}$. The central angle $m\\\\angle AOB = 180^{\\\\circ} - 2(${baseAngle}^{\\\\circ}) = ${centralAngle}^{\\\\circ}$. The arc length is $2\\\\pi(${r}) \\\\times \\\\frac{${centralAngle}}{360} = ${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; this uses the base angle instead of the central angle. Choice ${incorrectOptions[1].letter} is incorrect; this uses the wrong angle measure. Choice ${incorrectOptions[2].letter} is incorrect; this calculates the major arc instead of the minor arc.`
    };
  }
};
