import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1355
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter: 18 + 18√2 (isosceles right triangle with legs 9√2)]
 * - Difficulty factors: [Isosceles right triangle properties, algebraic manipulation with radicals, solving for hypotenuse]
 * - Constraints: [Perimeter must be in form a + a√2 where hypotenuse = a]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Isosceles right triangle with leg labels]
 */

export const generator_1355 = {
  metadata: {
    id: "1355",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: Perimeter = 18 + 18√2
    // For isosceles right triangle: P = 2x + x√2 = x(2 + √2)
    // 18 + 18√2 = 18(1 + √2)
    // Need: x(2 + √2) = 18(1 + √2)
    // x = 18(1 + √2)/(2 + √2) = 18(1 + √2)(2 - √2)/((2+√2)(2-√2)) = 18(2 - √2 + 2√2 - 2)/(4-2) = 18(√2)/2 = 9√2
    // Hypotenuse = x√2 = 9√2 × √2 = 18
    
    // Generate base value
    const base = getRandomInt(5, 15);
    const leg = base * Math.sqrt(2);
    const hypotenuse = base * 2; // leg × √2 = base√2 × √2 = 2base
    
    const _svg_0 = base * 2 + 2;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-2,xmax=_svg_0;
      const ymin=-2,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=-2,xmax=(base * 2 + 2);
      const ymin=-2,ymax=(base * 2 + 2);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((base * Math.sqrt(2) / 2))+'" y="'+my(-1)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">x</text>';
    })()}${(() => {
      const xmin=-2,xmax=(base * 2 + 2);
      const ymin=-2,ymax=(base * 2 + 2);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-1)+'" y="'+my((base * Math.sqrt(2) / 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">x</text>';
    })()}${(() => {
      const xmin=-2,xmax=(base * 2 + 2);
      const ymin=-2,ymax=(base * 2 + 2);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((base * Math.sqrt(2) / 2 + 0.5))+'" y="'+my((base * Math.sqrt(2) / 2 + 0.5))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">xsqrt{2</text>';
    })()}</svg></div>`;

    // Options include the hypotenuse (2×base), leg (base√2), base, and base√2/2
    const optionsData = [
      { text: base.toString(), isCorrect: false, reason: "confuses base with hypotenuse" },
      { text: `${base}\\\\sqrt{2}`, isCorrect: false, reason: "gives leg length instead of hypotenuse" },
      { text: (base * 2).toString(), isCorrect: true, reason: "correct hypotenuse length" },
      { text: `${base * 2}\\\\sqrt{2}`, isCorrect: false, reason: "incorrectly multiplies by √2 again" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Let the legs be $x$. The hypotenuse is $x\\\\sqrt{2}$. Perimeter $P = 2x + x\\\\sqrt{2} = x(2 + \\\\sqrt{2})$. We are given $P = ${base} + ${base}\\\\sqrt{2} = ${base}(1 + \\\\sqrt{2})$. Solving $x(2 + \\\\sqrt{2}) = ${base}(1 + \\\\sqrt{2})$ gives $x = ${base}\\\\sqrt{2}/2 \\\\times 2 = ${base}\\\\sqrt{2}$. The hypotenuse is $x\\\\sqrt{2} = (${base}\\\\sqrt{2})(\\\\sqrt{2}) = ${base * 2}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The perimeter of an isosceles right triangle is $${base} + ${base}\\\\sqrt{2}$ inches. What is the length, in inches, of the hypotenuse of this triangle?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: (base * 2).toString(),
      explanation: explanation
    };
  }
};
