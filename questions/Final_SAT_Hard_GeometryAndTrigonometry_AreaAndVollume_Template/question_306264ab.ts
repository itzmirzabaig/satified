import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 306264ab
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sides: 2√2, 6√2, √80]
 * - Difficulty factors: [Identifying right triangle from sides, simplifying radicals, area calculation]
 * - Distractor patterns: [A: 8√2+√80 (perimeter-like), B: 12 (correct), C: 24√80 (wrong), D: 24 (forgot 1/2)]
 * - Constraints: [Must satisfy Pythagorean theorem]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_306264ab = {
  metadata: {
    // id: "306264ab",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate legs with radical form
    // Pattern: a√b and c√b gives clean multiplication
    const base = getRandomInt(2, 3); // √2 or √3
    const coeff1 = getRandomInt(2, 4);
    const coeff2 = getRandomInt(3, 6);
    
    const leg1 = `${coeff1}\\sqrt{${base}}`;
    const leg2 = `${coeff2}\\sqrt{${base}}`;
    
    // Hypotenuse squared = (coeff1² + coeff2²) × base
    const hypCoeffSq = coeff1*coeff1 + coeff2*coeff2;
    // Simplify hypotenuse radical
    const simplify = (n: number, b: number): [number, number] => {
      let coeff = 1;
      let remaining = n;
      for (let i = 2; i * i <= remaining; i++) {
        while (remaining % (i * i) === 0) {
          coeff *= i;
          remaining /= i * i;
        }
      }
      return [coeff, remaining * b];
    };
    const [hCoeff, hRemain] = simplify(1, hypCoeffSq * base);
    const hypotenuse = hRemain === 1 ? (hCoeff * Math.sqrt(hypCoeffSq * base)).toFixed(0) : 
                       hCoeff === 1 ? `\\sqrt{${hRemain}}` : `${hCoeff}\\sqrt{${hRemain}}`;
    
    // STEP 2: Calculate area = (1/2) × leg1 × leg2 = (1/2) × coeff1 × coeff2 × base
    const area = 0.5 * coeff1 * coeff2 * base;
    const areaDoubled = coeff1 * coeff2 * base; // Forgot 1/2 factor
    
    // STEP 3: Create distractors
    const distractorA = `${coeff1 + coeff2}\\sqrt{${base}} + ${hCoeff === 1 && hRemain !== 1 ? `\\sqrt{${hRemain}}` : hypotenuse}`; // Perimeter-like
    const distractorC = `${areaDoubled * 2}\\sqrt{${hRemain}}`; // Nonsense
    const distractorD = areaDoubled.toString(); // Forgot 1/2
    
    const correctText = area.toString();
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `A right triangle has sides of length $${leg1}$, $${leg2}$, and $${hypotenuse}$ units. What is the area of the triangle, in square units?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. First verify it's a right triangle: $(${leg1})^2 + (${leg2})^2 = ${coeff1*coeff1*base} + ${coeff2*coeff2*base} = ${(coeff1*coeff1 + coeff2*coeff2)*base} = (${hypotenuse})^2$. The legs are $${leg1}$ and $${leg2}$. Area = $\\frac{1}{2} \\times ${leg1} \\times ${leg2} = \\frac{1}{2} \\times ${coeff1 * coeff2 * base} = ${area}$. Choice ${incorrectOptions[0].letter} is incorrect because it calculates perimeter instead of area. Choice ${incorrectOptions[1].letter} is incorrect due to calculation error. Choice ${incorrectOptions[2].letter} is incorrect because it forgets the 1/2 factor in the area formula.`
    };
  }
};

/**
 * Question ID: 459dd6c5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 4, area ABC: 270]
 * - Difficulty factors: [Similar triangles, area ratio, finding smaller from larger]
 * - Distractor patterns: [N/A - fill in blank with multiple acceptable answers]
 * - Constraints: [Fractional answer acceptable]
 * - Question type: [Fill-in-the-blank, multi-accept]
 * - Figure generation: [None]
 */