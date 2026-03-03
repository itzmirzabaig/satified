import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6ce95fc8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation 2x²-5=2x+3, which becomes 2x²-2x-8=0]
 * - Difficulty factors: [Quadratic equation, standard form, quadratic formula, simplifying with radical]
 * - Distractor patterns: [2 = integer solution check, wrong radical, wrong fraction]
 * - Constraints: [Must rearrange to standard form, use quadratic formula, simplify radical]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_6ce95fc8 = {
  metadata: {
    // id: "6ce95fc8",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: 2x² - 5 = 2x + 3 → 2x² - 2x - 8 = 0 → x² - x - 4 = 0
    // Solutions: (1 ± √17)/2, correct was (1+√11)/2... wait that's not right
    
    // Let me recalculate: 2x² - 2x - 8 = 0 → x = (2 ± √(4+64))/4 = (2 ± √68)/4 = (2 ± 2√17)/4 = (1 ± √17)/2
    
    // Actually the original says correct is D: (1+√11)/2
    // That suggests equation was 2x² - 2x - 5 = 0 or similar
    
    // Let me check: if solution is (1+√11)/2, then from quadratic formula with a=2, b=-2:
    // (2 + √11)/2... no wait that gives (2+√11)/2 not (1+√11)/2
    
    // If a=1, then (1+√11)/2 means discriminant = 11 and -b=1, so b=-1
    // Equation: x² - x - something = 0 where 1 + 4*something = 11, so something = 2.5
    
    // Actually I think the original had different coefficients. Let me just generate valid questions.
    
    // Pattern: ax² + c1 = bx + c2 → ax² - bx + (c1-c2) = 0
    // Want discriminant = b² - 4a(c1-c2) to be non-square and give nice form
    
    const a = 2;
    const b = 2; // coefficient in linear term (will be -b in standard form)
    const cDiff = getRandomInt(4, 8); // c1 - c2, negative so -4a(cDiff) is positive
    
    // Standard form: 2x² - 2x - cDiff = 0... actually need positive c for -4ac to add to b²
    
    // Let's do: 2x² - 5 = 2x + 3 → 2x² - 2x - 8 = 0
    const constantLeft = getRandomInt(3, 7);
    const constantRight = getRandomInt(1, 5);
    const finalCDiff = constantLeft - constantRight; // This will be negative of c in standard form
    
    // Standard: ax² - bx + (constantLeft - constantRight - wait)
    // 2x² - 5 = 2x + 3
    // 2x² - 2x - 5 - 3 = 0
    // 2x² - 2x - 8 = 0
    
    const c = -(constantLeft + constantRight);
    
    // Discriminant: b² - 4ac = 4 - 4(2)(-8) = 4 + 64 = 68 = 4*17
    
    // Actually let me verify with smaller numbers
    // 2x² - 2x - 3 = 0: D = 4 + 24 = 28 = 4*7
    // x = (2 ± √28)/4 = (2 ± 2√7)/4 = (1 ± √7)/2
    
    // Choose c so D = 4*(non-perfect square)
    // D = 4 - 4(2)c = 4 - 8c = 4(1-2c)
    // We want 1-2c = k where k is not perfect square
    
    const k = getRandomInt(7, 15);
    const finalC = (1 - k) / 2;
    
    // This needs to be integer, so 1-k must be even, so k must be odd
    
    let finalK = k % 2 === 0 ? k + 1 : k; // Make sure it's odd
    const finalFinalC = (1 - finalK) / 2;
    
    // Verify discriminant: 4 - 4(2)(finalFinalC) = 4 - 8((1-finalK)/2) = 4 - 4(1-finalK) = 4 - 4 + 4*finalK = 4*finalK ✓
    
    // Solutions: (2 ± √(4*finalK))/4 = (2 ± 2√finalK)/4 = (1 ± √finalK)/2
    
    // STEP 2: Create options
    const correctAnswer = `\\frac{1+\\sqrt{${finalK}}}{2}`;
    
    // Distractor A: 2 (just an integer)
    const distractorA = "2";
    // Distractor B: 1-√finalK (missing denominator)
    const distractorB = `1-\\sqrt{${finalK}}`;
    // Distractor C: wrong format with half coefficient
    const distractorC = `\\frac{1}{2}+\\sqrt{${finalK}}`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "is incorrect; 2 is not a solution to the equation" },
      { text: `$${distractorB}$`, isCorrect: false, reason: "is incorrect; this is missing the denominator of 2" },
      { text: `$${distractorC}$`, isCorrect: false, reason: "is incorrect; this misapplies the fraction to only part of the expression" },
      { text: `$${correctAnswer}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Rearranging $${a}x^2-${constantLeft}=${b}x+${constantRight}$ gives $${a}x^2-${b}x-${constantLeft+constantRight}=0$. Using the quadratic formula: $x=\\frac{${b}\\pm\\sqrt{${b*b}+${4*a*(constantLeft+constantRight)}}}{${2*a}}=\\frac{${b}\\pm\\sqrt{${4*finalK}}}{${2*a}}=\\frac{${b}\\pm 2\\sqrt{${finalK}}}{${2*a}}=\\frac{1\\pm\\sqrt{${finalK}}}{2}$. Of these, $\\frac{1+\\sqrt{${finalK}}}{2}$ is choice ${correctLetter}.
Choice ${incorrectOptions[0].letter} ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$${a}x^2 - ${constantLeft} = ${b}x + ${constantRight}$\n\nWhich of the following is a solution to the equation above?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: f5aa5040
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [line: 2y=c, parabola: y=-2x²+9x, discriminant for one intersection]
 * - Difficulty factors: [Horizontal line, parabola intersection, discriminant = 0 condition]
 * - Distractor patterns: [N/A - fill in blank, accepts fraction or decimal]
 * - Constraints: [Line is horizontal, parabola opens down, find c for single intersection]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/f5aa5040.ts