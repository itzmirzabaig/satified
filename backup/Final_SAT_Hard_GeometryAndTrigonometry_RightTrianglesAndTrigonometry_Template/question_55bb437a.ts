import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 55bb437a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan B = 3/4, BC = 15, DA = 4]
 * - Difficulty factors: [Similar triangles, 3-4-5 triangle ratios, segment subtraction]
 * - Constraints: [Similar triangles with scale factor relationship]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Nested similar right triangles]
 */

export const generator_55bb437a = {
  metadata: {
    // id: "55bb437a",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: tan B = 3/4, so triangles are 3-4-5
    // BC = 15 = 3×5, so AB = 4×5 = 20 (adjacent side)
    // DA = 4, so DB = AB - DA = 20 - 4 = 16... wait, this doesn't match original logic
    // Original says: BC=15, tan B = 3/4 means AC/BC = 3/4 → AC = 45/4 = 11.25? No...
    
    // Re-analyzing: tan B = 3/4 means opposite/adjacent = 3/4
    // In triangle ABC with right angle at C (from figure context):
    // tan B = AC/BC = 3/4, so if BC = 15, AC = 45/4 = 11.25... not integer
    
    // Actually looking at solution: Both triangles are similar to 3-4-5
    // For triangle ABC: BC = 15 (hypotenuse), so scale factor is 3
    // AB = 12 (adjacent to B), AC = 9 (opposite to B)
    // tan B = 9/12 = 3/4 ✓
    // DA = 4, so DB = AB - DA = 12 - 4 = 8
    // Triangle DBE is similar with DB = 8 (scale factor 2 from 4)
    // DE = 3 × 2 = 6
    
    // Generate 3-4-5 triangle family
    const baseScale = getRandomInt(3, 6);
    const hypotenuseBC = 5 * baseScale; // Hypotenuse of larger triangle
    const adjacentAB = 4 * baseScale;   // Adjacent leg to angle B
    const oppositeAC = 3 * baseScale;   // Opposite leg to angle B
    
    // DA is subtracted from AB to get DB
    const daFactor = getRandomInt(1, baseScale - 1);
    const da = 4 * daFactor;
    const db = adjacentAB - da;
    
    // Scale factor for smaller triangle
    const smallScale = db / 4;
    const de = 3 * smallScale; // Opposite side in smaller triangle (what we're solving for)
    
    const heightAC = oppositeAC;
    const heightDE = de;
    
    const _svg_0 = Math.max(heightAC;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;; const _svg_1 = adjacentAB + 5;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=_svg_1;
      const ymin=-2,ymax=_svg_})()}${(() => {
      const xmin=-2,xmax=${adjacentAB + 5};
      const ymin=-2,ymax=${Math.max(heightAC;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx(db)+'" y1="'+my(0)+'" x2="'+mx(db)+'" y2="'+my(${heightDE})+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=-2,xmax=${adjacentAB + 5};
      const ymin=-2,ymax=${Math.max(heightAC;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">B</text>';
    })()}${(() => {
      const xmin=-2,xmax=${adjacentAB + 5};
      const ymin=-2,ymax=${Math.max(heightAC;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${adjacentAB - 1})+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">A</text>';
    })()}${(() => {
      const xmin=-2,xmax=${adjacentAB + 5};
      const ymin=-2,ymax=${Math.max(heightAC;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${adjacentAB})+'" y="'+my(${heightAC + 1})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">C</text>';
    })()}${(() => {
      const xmin=-2,xmax=${adjacentAB + 5};
      const ymin=-2,ymax=${Math.max(heightAC;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${db / 2})+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">D</text>';
    })()}${(() => {
      const xmin=-2,xmax=${adjacentAB + 5};
      const ymin=-2,ymax=${Math.max(heightAC;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${db})+'" y="'+my(${heightDE + 1})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">E</text>';
    })()}</svg></div>`;

    return {
      questionText: `In the figure above, $\\tan B = \\\\frac{3}{4}$. If $BC = ${hypotenuseBC}$ and $DA = ${da}$, what is the length of $\\overline{DE}$?`,
      figureCode: mafsCode,
      options: null, // Fill in the blank
      correctAnswer: de.toString(),
      explanation: `Since $\\tan B = 3/4$, $\\triangle ABC$ and $\\triangle DBE$ are similar to 3-4-5 triangles. For $\\triangle ABC$, hypotenuse $BC = ${hypotenuseBC}$ (scale factor ${baseScale}), so $AB = ${adjacentAB}$. Given $DA = ${da}$, $DB = AB - DA = ${adjacentAB} - ${da} = ${db}$. For $\\triangle DBE$ (scale factor ${smallScale}), the side opposite $B$ is $DE = 3 \\\\times ${smallScale} = ${de}$.`
    };
  }
};

/**
 * Question ID: ffe862a3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hypotenuse: 58, isosceles right triangle]
 * - Difficulty factors: [Isosceles right triangle properties, perimeter calculation with radicals]
 * - Constraints: [Leg = hypotenuse/√2 = hypotenuse×√2/2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Isosceles right triangle with hypotenuse labeled]
 */