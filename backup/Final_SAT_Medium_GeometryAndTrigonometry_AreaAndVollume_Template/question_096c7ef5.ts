import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 096c7ef5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates specific, radius: 3]
 * - Difficulty factors: [Geometric figure analysis, finding center/radius from points, circumference formula]
 * - Distractor patterns: [A: r, C: diameter+1, D: r²]
 * - Constraints: [Points must define a valid circle]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs: Circle with 3 points, center marked]
 */

export const generator_096c7ef5 = {
  metadata: {
    // id: "096c7ef5",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate figure parameters
    // Original: center (7,8), radius 3, points at (7,5), (7,11), (4,8)
    // Generate new center and radius
    const centerX = getRandomInt(3, 10);
    const centerY = getRandomInt(5, 12);
    const radius = getRandomInt(2, 5);
    
    // STEP 2: Calculate point coordinates
    // Points at vertical extremes and left horizontal
    const point1X = centerX;
    const point1Y = centerY - radius; // bottom
    const point2X = centerX;
    const point2Y = centerY + radius; // top
    const point3X = centerX - radius;
    const point3Y = centerY; // left
    
    // STEP 3: Calculate circumference constant k
    const circumferenceK = 2 * radius; // C = 2πr = kπ, so k = 2r
    
    // STEP 4: Build Mafs code
    const _svg_0 = centerX - radius - 2; const _svg_1 = centerX + radius + 2; const _svg_2 = centerY + radius + 2; const _svg_3 = centerY - radius - 2;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_0,xmax=_svg_1;
      const ymin=_svg_3,ymax=_svg_2;
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      const xstep=Math.ceil((_svg_1-(_svg_0))/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        if(x===0) continue;
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=${centerX - radius - 2},xmax=${centerX + radius + 2};
      const ymin=${centerY - radius - 2},ymax=${centerY + radius + 2};
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const r=(${centerY})*(400-2*40)/(${centerX + radius + 2}-(${centerX - radius - 2}));
      return '<circle cx="'+mx(${centerX})+'" cy="'+my(${centerY})+'" r="'+r+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    // STEP 5: Create options with tracking
    const correctText = circumferenceK.toString();
    
    // Distractors
    const distractorA = radius.toString(); // Just radius
    const distractorC = (2 * radius + 1).toString(); // Diameter + 1
    const distractorD = (radius * radius).toString(); // r²
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 7: Build explanation
    const explanation = `Choice ${correctLetter} is correct. The center O at (${centerX}, ${centerY}) is equidistant from all three points. The distance from O to (${point1X}, ${point1Y}) is ${radius}, so the radius is ${radius}. The circumference is $2\\\\pi r = 2\\\\pi(${radius}) = ${circumferenceK}\\\\pi$, so $k = ${circumferenceK}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the radius, not the coefficient of $\\\\pi$ in the circumference. Choice ${incorrectOptions[1].letter} is incorrect; this appears to add 1 to the diameter without geometric basis. Choice ${incorrectOptions[2].letter} is incorrect; this is $r^2$ rather than $2r$.`;
    
    return {
      questionText: `The three points shown define a circle. The circumference of this circle is $k\\\\pi$, where $k$ is a constant. What is the value of $k$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: ec5d4823
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length: 4, width: 9, height: 10 (single-digit)]
 * - Difficulty factors: [Rectangular prism volume, simple multiplication]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [All dimensions single-digit for medium difficulty]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */