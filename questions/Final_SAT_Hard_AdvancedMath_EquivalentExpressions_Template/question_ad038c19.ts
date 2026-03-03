import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ad038c19
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [binomial expansion with fraction]
 * - Difficulty factors: [(a + b/2)² expansion, careful with middle term and fraction squared]
 * - Distractor patterns: [Missing middle term, wrong fraction square, wrong middle term coefficient]
 * - Constraints: [None]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_ad038c19 = {
  metadata: {
    // id: "ad038c19",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const n = getRandomInt(2, 4);
    
    // STEP 2: Create options
    const correctAnswer = `$a^{2}+\\frac{2ab}{${n}}+\\frac{b^{2}}{${n*n}}$`;
    const simplifiedCorrect = n === 2 ? `$a^{2}+ab+\\frac{b^{2}}{4}$` : correctAnswer;
    
    const optionsData = [
      { text: `$a^{2}+\\frac{b^{2}}{${n}}$`, isCorrect: false, reason: "incorrectly squares each term individually and fails to square the denominator properly" },
      { text: `$a^{2}+\\frac{b^{2}}{${n*n}}$`, isCorrect: false, reason: "forgets the middle term $2 \\cdot a \\cdot \\frac{b}{${n}} = \\frac{2ab}{${n}}$" },
      { text: `$a^{2}+\\frac{ab}{${n}}+\\frac{b^{2}}{${n*n}}$`, isCorrect: false, reason: "incorrectly calculates the middle term as $\\frac{ab}{${n}}$ instead of $\\frac{2ab}{${n}}$" },
      { text: simplifiedCorrect, isCorrect: true }
    ];
    
    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Question text
    const questionText = `Which of the following is equivalent to $\\left(a+\\frac{b}{${n}}\\right)^{2}$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. Use the formula $(x+y)^{2} = x^{2} + 2xy + y^{2}$ with $x = a$ and $y = \\frac{b}{${n}}$.

$$\\left(a+\\frac{b}{${n}}\\right)^{2} = a^{2} + 2 \\cdot a \\cdot \\frac{b}{${n}} + \\left(\\frac{b}{${n}}\\right)^{2}$$

Simplify each term:
- First term: $a^{2}$
- Middle term: $\\frac{2ab}{${n}}$${n === 2 ? ' = ab' : ''}
- Last term: $\\frac{b^{2}}{${n*n}}$

So the result is $${n === 2 ? 'a^{2} + ab + \\frac{b^{2}}{4}' : 'a^{2} + \\frac{2ab}{' + n + '} + \\frac{b^{2}}{' + n*n + '}'}$.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: simplifiedCorrect,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 20291f47
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [complex rational expressions with factoring]
 * - Difficulty factors: [Factoring denominator, finding common denominator, distributing carefully]
 * - Distractor patterns: [Wrong factoring, wrong common denominator, distribution errors]
 * - Constraints: [Must factor xy from second denominator]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */