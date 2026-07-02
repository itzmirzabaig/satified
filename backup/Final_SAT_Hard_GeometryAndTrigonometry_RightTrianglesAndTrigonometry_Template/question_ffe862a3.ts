import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_ffe862a3 = {
  metadata: {
    // id: "ffe862a3",
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
    
    const _svg_0 = hypotenuse + 5;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-5,xmax=_svg_0;
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
      const xmin=-5,xmax=${hypotenuse + 5};
      const ymin=-5,ymax=${hypotenuse + 5};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${hypotenuse / 2})+'" y="'+my(${hypotenuse / 2 + 2})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${hypotenuse</text>';
    })()}</svg></div>`;

    const optionsData = [
      { text: `${prime}\\\\sqrt{2}`, isCorrect: false, reason: "gives leg length, not perimeter" },
      { text: `${hypotenuse}\\\\sqrt{2}`, isCorrect: false, reason: "incorrectly doubles the radical term" },
      { text: `${hypotenuse} + ${hypotenuse}\\\\sqrt{2}`, isCorrect: true, reason: "correct perimeter: 2 legs + hypotenuse = 2×(prime√2) + 2×prime" },
      { text: `${hypotenuse} + ${2 * hypotenuse}\\\\sqrt{2}`, isCorrect: false, reason: "incorrectly calculates leg length" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Leg $x = \\\\frac{${hypotenuse}}{\\\\sqrt{2}} = ${prime}\\\\sqrt{2}$. Perimeter $= 2x + ${hypotenuse} = 2(${prime}\\\\sqrt{2}) + ${hypotenuse} = ${hypotenuse} + ${hypotenuse}\\\\sqrt{2}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `An isosceles right triangle has a hypotenuse of length ${hypotenuse} inches. What is the perimeter, in inches, of this triangle?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${hypotenuse} + ${hypotenuse}\\\\sqrt{2}`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 44b2b894
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [diagonal = 2×short side, area = 1089√3]
 * - Difficulty factors: [Rectangle in circle (diagonal = diameter), 30-60-90 triangle relationships, area equation]
 * - Constraints: [Diagonal = 2s, longer side = s√3, area = s²√3]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Rectangle inscribed in circle]
 */