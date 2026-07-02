import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 898
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Leg=6, Hypotenuse=21 (double-digit, not clean Pythagorean triple)]
 * - Difficulty factors: [Pythagorean theorem, solving for unknown leg, algebraic expression]
 * - Distractor patterns: [Correct radical form, squared form, simple subtraction, no square root]
 * - Constraints: [Must satisfy a² + b² = c², leg < hypotenuse]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Right triangle with unknown side labeled 'a']
 */

export const generator_898 = {
  metadata: {
    id: "898",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate right triangle with Pythagorean triple or clean values
    // Original: leg=6, hypotenuse=21
    // Generate values where hypotenuse² - leg² is not a perfect square (requires radical)
    const b = getRandomInt(5, 12); // Known leg
    let c = getRandomInt(15, 25); // Hypotenuse
    
    // Ensure c > b and result is not perfect square
    let aSquared = c * c - b * b;
    let a = Math.sqrt(aSquared);
    let isPerfectSquare = Number.isInteger(a);
    
    // If perfect square, adjust to make it non-perfect (more challenging)
    if (isPerfectSquare) {
      c = c + 1; // Adjust to make non-perfect
      aSquared = c * c - b * b;
      a = Math.sqrt(aSquared);
    }
    
    // Position: right angle at origin, leg b on x-axis, leg a vertical
    const viewBoxY = c + 5;
    
    // Calculate viewBox bounds
    const xMin = -2;
    const xMax = b + 2;
    const yMin = -2;
    const yMax = a + 2;
    
    // STEP 2: Build Mafs code
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_3,xmax=_svg_2;
      const ymin=_svg_1,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(-1.5)+'" y="'+my((a / 2))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">a</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((b / 2))+'" y="'+my(-1.5)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${b</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=(yMin),ymax=(yMax);
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(1)+'" y="'+my((a / 2 + 1))+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">${c</text>';
    })()}</svg></div>`;
    
    // STEP 3: Create expressions
    const correctExpr = `\\sqrt{${c}^2 - ${b}^2}`;
    
    // STEP 4: Create options with tracking
    const correctText = correctExpr;
    const optionsData = [
      { text: correctExpr, isCorrect: true, reason: "" },
      { text: `${c}^2 - ${b}^2`, isCorrect: false, reason: "gives the squared value without taking the square root" },
      { text: `\\sqrt{${c} - ${b}}`, isCorrect: false, reason: "incorrectly subtracts before squaring" },
      { text: `${c} - ${b}`, isCorrect: false, reason: "simply subtracts the values without using the Pythagorean theorem" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctLetter} is correct. Using the Pythagorean theorem: $a^2 + ${b}^2 = ${c}^2$. Solving for $a$ gives $a^2 = ${c}^2 - ${b}^2$, so $a = \\sqrt{${c}^2 - ${b}^2}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: "For the triangle shown, which expression represents the value of $a$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
