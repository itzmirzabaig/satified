import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b2528e6b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates: (6,2), (6,10), (2,6)]
 * - Difficulty factors: [Finding circle from 3 points, circumcenter = intersection of perpendicular bisectors]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Points must form valid circle, center is equidistant from all 3]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [Circle with 3 points Mafs]
 */

export const generator_b2528e6b = {
  metadata: {
    // id: "b2528e6b",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate circle center and radius
    // Original had center at (6,6) with points at (6,2), (6,10), (2,6)
    // Structure: vertical chord and horizontal point, forming right angle pattern
    const centerX = getRandomInt(2, 8);
    const centerY = getRandomInt(3, 8);
    const radius = getRandomInt(2, 5);
    
    // STEP 2: Calculate 3 points on the circle
    // Point 1: directly below center (vertical)
    const p1x = centerX;
    const p1y = centerY - radius;
    
    // Point 2: directly above center (vertical diameter)
    const p2x = centerX;
    const p2y = centerY + radius;
    
    // Point 3: to the left (horizontal)
    const p3x = centerX - radius;
    const p3y = centerY;
    
    // STEP 3: Calculate circumference factor k
    const circumference = 2 * Math.PI * radius;
    const k = 2 * radius; // C = kπ, so k = 2r
    
    // STEP 4: Build Mafs code
    const viewMinX = Math.min(p1x, p2x, p3x) - 2;
    const viewMaxX = Math.max(p1x, p2x, p3x) + 2;
    const viewMinY = Math.min(p1y, p2y, p3y) - 2;
    const viewMaxY = Math.max(p1y, p2y, p3y) + 2;
    
    const _svg_0 = viewMinX; const _svg_1 = viewMaxX; const _svg_2 = viewMaxY; const _svg_3 = viewMinY;
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
      const xmin=${viewMinX},xmax=${viewMaxX};
      const ymin=${viewMinY},ymax=${viewMaxY};
      const W=400,H=350,P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const r=(${centerY})*(400-2*40)/(${viewMaxX}-(${viewMinX}));
      return '<circle cx="'+mx(${centerX})+'" cy="'+my(${centerY})+'" r="'+r+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}</svg></div>`;
    
    return {
      questionText: `The three points shown define a circle. The circumference of this circle is $k\\pi$, where $k$ is a constant. What is the value of $k$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: k.toString(),
      explanation: `The center of the circle must be equidistant from all three points. The point $(${centerX}, ${centerY})$ is equidistant (distance ${radius}) from $(${p1x}, ${p1y})$, $(${p2x}, ${p2y})$, and $(${p3x}, ${p3y})$, making it the center with radius $${radius}$. The circumference is $2\\pi r = 2\\pi(${radius}) = ${k}\\pi$. Thus, $k = ${k}$.`
    };
  }
};

/**
 * Question ID: 9fec9d49
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [actual area: 600, scale: 1/10]
 * - Difficulty factors: [Area scaling with linear scale factor, common misconception of linear area scaling]
 * - Distractor patterns: [A: 6 (correct), B: random, C: 60 (linear scaling error), D: 150 (600/4)]
 * - Constraints: [Scale factor squared for area]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */