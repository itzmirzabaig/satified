import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1362
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [YZ side: 24 (specific value), tan ratio: 12/35 (specific Pythagorean triple: 12-35-37)]
 * - Difficulty factors: [Trigonometric ratio application, Pythagorean triple recognition, perimeter calculation]
 * - Distractor patterns: [188: incorrect sum, 84: partial sum of sides, 71: miscalculation]
 * - Constraints: [Must use Pythagorean triple that matches 12/35 ratio]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with labeled sides and vertices]
 */

export const generator_1362 = {
  metadata: {
    id: "1362",
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

    // Right triangle XYZ: right angle at Z. Z at bottom-left, X at bottom-right
    // (along the horizontal adjacent side XZ), Y directly above Z (vertical side YZ).
    // Plain SVG in pixel space; values match the question every draw.
    const W = 450, H = 300;
    const ox = 70, oy = 240;           // pixel position of vertex Z (right-angle corner)
    const maxLeg = Math.max(xz, yz);
    const sc = 150 / maxLeg;           // scale so the longer leg spans ~150px
    const zx = ox,            zy = oy;             // Z (right angle)
    const xx = ox + xz * sc,  xy_ = oy;            // X (end of adjacent leg XZ)
    const yx = ox,            yy = oy - yz * sc;   // Y (end of opposite leg YZ)
    const rm = 14;                     // right-angle marker size (px)
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">`
      + `<polygon points="${zx},${zy} ${xx},${xy_} ${yx},${yy}" fill="#3b82f6" fill-opacity="0.08" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round"/>`
      + `<path d="M ${zx + rm},${zy} L ${zx + rm},${zy - rm} L ${zx},${zy - rm}" fill="none" stroke="currentColor" stroke-width="1.2"/>`
      + `<circle cx="${zx}" cy="${zy}" r="3" fill="currentColor"/>`
      + `<circle cx="${xx}" cy="${xy_}" r="3" fill="currentColor"/>`
      + `<circle cx="${yx}" cy="${yy}" r="3" fill="currentColor"/>`
      + `<text x="${zx - 12}" y="${zy + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">Z</text>`
      + `<text x="${xx + 12}" y="${xy_ + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">X</text>`
      + `<text x="${yx - 14}" y="${yy - 4}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">Y</text>`
      + `<text x="${zx - 20}" y="${(zy + yy) / 2 + 4}" text-anchor="middle" font-size="14" fill="currentColor">${yz}</text>`
      + `</svg></div>`;

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
