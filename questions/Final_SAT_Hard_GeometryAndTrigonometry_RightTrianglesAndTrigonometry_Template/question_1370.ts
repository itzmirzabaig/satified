import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1370
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hypotenuse: 58, isosceles right triangle]
 * - Difficulty factors: [Isosceles right triangle properties, perimeter calculation with radicals]
 * - Constraints: [Leg = hypotenuse/√2 = hypotenuse×√2/2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Isosceles right triangle with hypotenuse labeled]
 */

export const generator_1370 = {
  metadata: {
    id: "1370",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: Hypotenuse = 58
    // Leg = 58/√2 = 58√2/2 = 29√2
    // Perimeter = 2(29√2) + 58 = 58√2 + 58 = 58 + 58√2
    
    // Generate hypotenuse as 2×prime for clean leg = prime×√2
    const primes = [23, 29, 31, 37, 41, 43, 47, 53, 59];
    const prime = getRandomElement(primes);
    const hypotenuse = 2 * prime;
    
    // Isosceles right triangle: right angle at bottom-left vertex, two equal legs
    // (horizontal + vertical), hypotenuse across the top-right. Hypotenuse labeled
    // with its length. Plain SVG, pixel space (legs equal so it renders as 45-45-90).
    const W = 450, H = 300;
    const rx = 90,  ry = 240;          // right-angle vertex (bottom-left)
    const leg = 160;                   // equal legs in px (figure is schematic)
    const px_ = rx + leg, py_ = ry;    // bottom-right vertex
    const qx = rx,        qy = ry - leg; // top-left vertex
    const rm = 14;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">`
      + `<polygon points="${rx},${ry} ${px_},${py_} ${qx},${qy}" fill="#3b82f6" fill-opacity="0.08" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round"/>`
      + `<path d="M ${rx + rm},${ry} L ${rx + rm},${ry - rm} L ${rx},${ry - rm}" fill="none" stroke="currentColor" stroke-width="1.2"/>`
      + `<path d="M ${rx + leg / 2 - 6},${ry - 6} l 12,0 M ${rx + leg / 2 - 6},${ry - 10} l 12,0" stroke="currentColor" stroke-width="1.2"/>`
      + `<path d="M ${rx - 6},${ry - leg / 2 - 6} l 0,12 M ${rx - 10},${ry - leg / 2 - 6} l 0,12" stroke="currentColor" stroke-width="1.2"/>`
      + `<text x="${(px_ + qx) / 2 + 10}" y="${(py_ + qy) / 2 - 6}" text-anchor="middle" font-size="14" fill="currentColor">${hypotenuse}</text>`
      + `</svg></div>`;

    const optionsData = [
      { text: `$${prime}\\sqrt{2}$`, isCorrect: false, reason: "gives one leg's length, not the perimeter" },
      { text: `$${hypotenuse}\\sqrt{2}$`, isCorrect: false, reason: "omits the hypotenuse and doubles the radical incorrectly" },
      { text: `$${hypotenuse} + ${hypotenuse}\\sqrt{2}$`, isCorrect: true, reason: "adds two legs and the hypotenuse" },
      { text: `$${hypotenuse} + ${2 * hypotenuse}\\sqrt{2}$`, isCorrect: false, reason: "doubles the leg length before adding" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. In a 45-45-90 triangle each leg equals the hypotenuse divided by $\\sqrt{2}$, so the leg length is $\\frac{${hypotenuse}}{\\sqrt{2}} = ${prime}\\sqrt{2}$. The perimeter is the two equal legs plus the hypotenuse: $2(${prime}\\sqrt{2}) + ${hypotenuse} = ${hypotenuse} + ${hypotenuse}\\sqrt{2}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `An isosceles right triangle has a hypotenuse of length ${hypotenuse} inches. What is the perimeter, in inches, of this triangle?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${hypotenuse} + ${hypotenuse}\\sqrt{2}$`,
      explanation: explanation
    };
  }
};
