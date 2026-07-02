import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1300
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 14, -6, constant: 109]
 * - Difficulty factors: [Completing square with rearrangement]
 * - Distractor patterns: [Wrong constant after moving terms, calculation errors]
 * - Constraints: [Must move all terms correctly before completing square]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Circle - requires Mafs]
 */

export const generator_1300 = {
  metadata: {
    id: "1300",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center coordinates
    const h = -getRandomInt(4, 10);
    const k = getRandomInt(2, 6);
    
    // STEP 2: Generate radius
    const r = getRandomInt(8, 15);
    
    // STEP 3: Build equation in general form: x² + Bx + y² + Cy = D
    // Expanded: (x-h)² + (y-k)² = r² gives
    // x² - 2hx + h² + y² - 2ky + k² = r²
    // x² + (-2h)x + y² + (-2k)y = r² - h² - k²
    
    const B = -2 * h;
    const C = -2 * k;
    const rightSide = r * r - h * h - k * k;
    
    // Actually we want: x² + Bx + y² = Cy + constant
    // Let's use the format from original: x² + 14x + y² = 6y + 109
    // So: x² + 14x + y² - 6y = 109
    
    const finalC = 2 * k; // Coefficient of y on right (positive)
    const finalRight = r * r - h * h - k * k + 2 * k * k; // Adjusted
    
    // Actually, let's be cleaner: start from desired form
    // x² + Bx + y² = Ey + D
    // Rearranging: x² + Bx + y² - Ey = D
    // Complete square: (x + B/2)² + (y - E/2)² = D + (B/2)² + (E/2)²
    
    const Bcoeff = -2 * h;
    const Ecoeff = 2 * k; // This becomes -2k when moved left
    
    // Right side: r² - h² - k² + k² (since we move -Ey to left as +Ey... messy)
    
    // Let's just compute directly:
    // We want form: x² + Bx + y² = Ey + D
    // Standard: (x-h)² + (y-k)² = r²
    // Expand: x² - 2hx + h² + y² - 2ky + k² = r²
    // Rearrange: x² - 2hx + y² = 2ky + (r² - h² - k²)
    
    const rightCoeff = 2 * k; // Coefficient of y on right side
    const constant = r * r - h * h - k * k;
    
    // STEP 4: Calculate correct radius for options
    const correctRadius = r;
    
    // Generate distractors
    const distractorA = Math.floor(Math.sqrt(constant)); // Just using raw constant
    const distractorB = Math.floor(Math.sqrt(constant + h * h + k * k)); // Wrong combination
    const distractorC = correctRadius; // Actually correct, will be shuffled
    
    // Build Mafs figure
    const _svg_0 = Math.abs(h) + r + 3; const _svg_1 = -h + r + 3; const _svg_2 = k + r + 3; const _svg_3 = r + 3;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-_svg_0,xmax=_svg_1;
      const ymin=-_svg_3,ymax=_svg_2;
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      const xstep=Math.ceil((_svg_1-(-_svg_0))/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0) continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-(Math.abs(h) + r + 3),xmax=(-h + r + 3);
      const ymin=-(r + 3),ymax=(k + r + 3);
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const r=((k))*(400-2*40)/((-h + r + 3)-(-(Math.abs(h) + r + 3)));
      return '<circle cx="'+mx((h))+'" cy="'+my((k))+'" r="'+r+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;

    const correctText = `\\\\sqrt{${r*r}}`; // Or just r if simplified
    
    const optionsData = [
      { text: `\\\\sqrt{${constant > 0 ? constant : 100}}`, isCorrect: false },
      { text: `\\\\sqrt{${constant + h * h + k * k}}`, isCorrect: false },
      { text: `\\\\sqrt{${r*r}}`, isCorrect: true },
      { text: `\\\\sqrt{${2 * r*r}}`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `In the $xy$-plane, the graph of the given equation is a circle. What is the length of the circle's radius? $$x^2 ${Bcoeff >= 0 ? '+' : '-'}${Math.abs(Bcoeff)}x + y^2 = ${rightCoeff}y ${constant >= 0 ? '+' : '-'}${Math.abs(constant)}$$`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Rearrange: $x^{2}${Bcoeff >= 0 ? '+' : '-'}${Math.abs(Bcoeff)}x + y^{2} - ${rightCoeff}y = ${constant}$. Complete the square: $(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2} + (y-${k})^{2} = ${constant} + ${h*h} + ${k*k} = ${r*r}$. Thus $r = \\\\sqrt{${r*r}} = ${r}$. Choice ${incorrectOptions[0].letter} is incorrect; this uses the raw constant. Choice ${incorrectOptions[1].letter} is incorrect; this uses an incorrect combination. Choice ${incorrectOptions[2].letter} is incorrect; this doubles the radius.`
    };
  }
};
