import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a4c0547f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [YZ side: 24 (specific value), tan ratio: 12/35 (specific Pythagorean triple: 12-35-37)]
 * - Difficulty factors: [Trigonometric ratio application, Pythagorean triple recognition, perimeter calculation]
 * - Distractor patterns: [188: incorrect sum, 84: partial sum of sides, 71: miscalculation]
 * - Constraints: [Must use Pythagorean triple that matches 12/35 ratio]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with labeled sides and vertices]
 */

export const generator_a4c0547f = {
  metadata: {
    // id: "a4c0547f",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original uses tan X = 12/35 with YZ = 24
    // YZ is opposite angle X, XZ is adjacent
    // So YZ/XZ = 12/35 means 24/XZ = 12/35 → XZ = 70
    // Then hypotenuse XY = sqrt(24² + 70²) = sqrt(576 + 4900) = sqrt(5476) = 74
    // This is a scaled 12-35-37 triangle (scale factor 2)
    
    // Generate Pythagorean triple: a-b-c where tan uses a/b or b/a
    // Use primitive triples and scale them
    const triple = getRandomElement([
      [3, 4, 5],
      [5, 12, 13],
      [8, 15, 17],
      [7, 24, 25],
      [20, 21, 29],
      [12, 35, 37]
    ]) as [number, number, number];
    
    // Randomly decide which leg corresponds to numerator in tan
    const useFirstAsOpposite = Math.random() > 0.5;
    const oppositeLeg = useFirstAsOpposite ? triple[0] : triple[1];
    const adjacentLeg = useFirstAsOpposite ? triple[1] : triple[0];
    const hypotenuse = triple[2];
    
    // Choose scale factor to make calculations clean (keeping double-digit feel of original)
    const scaleFactor = getRandomInt(2, 6);
    const yz = oppositeLeg * scaleFactor; // Side opposite angle X (opposite)
    const xz = adjacentLeg * scaleFactor; // Side adjacent to angle X (adjacent)
    const xy = hypotenuse * scaleFactor; // Hypotenuse
    
    const perimeter = yz + xz + xy;
    
    // Mafs code for right triangle
    const _svg_0 = yz + 10; const _svg_1 = xz + 10;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-5,xmax=_svg_1;
      const ymin=-5,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-5,xmax=${xz + 10};
      const ymin=-5,ymax=${yz + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(0)+'" y="'+my(-2)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">X</text>';
    })()}${(() => {
      const xmin=-5,xmax=${xz + 10};
      const ymin=-5,ymax=${yz + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${xz})+'" y="'+my(-2)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Z</text>';
    })()}${(() => {
      const xmin=-5,xmax=${xz + 10};
      const ymin=-5,ymax=${yz + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${xz})+'" y="'+my(${yz + 1})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Y</text>';
    })()}${(() => {
      const xmin=-5,xmax=${xz + 10};
      const ymin=-5,ymax=${yz + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${xz + 1})+'" y="'+my(${yz / 2})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${yz</text>';
    })()}${(() => {
      const xmin=-5,xmax=${xz + 10};
      const ymin=-5,ymax=${yz + 10};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${xz / 2})+'" y="'+my(-2)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">XZ</text>';
    })()}</svg></div>`;

    const correctText = perimeter.toString();
    
    // Create distractors based on SAT error patterns
    const optionsData = [
      { text: (perimeter + 20).toString(), isCorrect: false, reason: "overestimates a side" },
      { text: correctText, isCorrect: true, reason: "correct answer" },
      { text: Math.floor(perimeter / 2).toString(), isCorrect: false, reason: "sums only two sides or makes arithmetic error" },
      { text: (xy + xz).toString(), isCorrect: false, reason: "forgets one side of triangle" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. In right triangle $XYZ$ with right angle $Z$, $\\tan X = \\frac{YZ}{XZ}$. Given $\\tan X = \\frac{${oppositeLeg}}{${adjacentLeg}}$ and $YZ = ${yz}$, we have $\\frac{${oppositeLeg}}{${adjacentLeg}} = \\frac{${yz}}{XZ}$, yielding $XZ = ${xz}$. Using the Pythagorean theorem, $XY = \\sqrt{${yz}^2 + ${xz}^2} = ${xy}$. The perimeter is ${yz} + ${xz} + ${xy} = ${perimeter}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `In triangle $XYZ$, angle $Z$ is a right angle and the length of $\\overline{YZ}$ is ${yz} units. If $\\tan X = \\frac{${oppositeLeg}}{${adjacentLeg}}$, what is the perimeter, in units, of triangle $XYZ$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: bd87bc09
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hypotenuse: 26, sin ratio: 5/13 (Pythagorean triple 5-12-13 scaled)]
 * - Difficulty factors: [Trigonometric ratio application, Pythagorean theorem, finding non-hypotenuse side]
 * - Constraints: [Must use scaled 5-12-13 triangle, hypotenuse is 26 = 2×13]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with hypotenuse labeled]
 */