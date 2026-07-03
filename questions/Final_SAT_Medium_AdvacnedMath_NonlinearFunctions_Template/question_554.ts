import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 554
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function y-intercept
 * - Number ranges: Coefficient 11, base 1/12
 * - Difficulty: Medium - finding y-intercept of exponential
 * - Distractor patterns: Confusing base with y-intercept, calculation errors
 */

export const generator_554 = {
  metadata: {
    id: "554",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const coefficient = getRandomInt(5, 20);
    const baseNumerator = 1;
    let baseDenominator = getRandomInt(5, 15);
    // Guard: the distractor (0, baseDenominator) must never equal the correct
    // answer (0, coefficient), so force baseDenominator !== coefficient.
    if (baseDenominator === coefficient) {
      baseDenominator = baseDenominator === 15 ? 14 : baseDenominator + 1;
    }

    const questionText = `The function $g$ is defined by $g(x)=${coefficient}\\left(\\frac{${baseNumerator}}{${baseDenominator}}\\right)^{x}$. What is the $y$-intercept of the graph of $y=g(x)$ in the $xy$-plane?`;
    
    const correctAnswer = `(0, ${coefficient})`;
    
    const optionsData = [
      { text: `(0, ${coefficient})`, isCorrect: true },
      { text: `(0, ${coefficient * baseDenominator})`, isCorrect: false, reason: "incorrectly multiplies coefficient by denominator" },
      { text: `(0, 1)`, isCorrect: false, reason: "forgets the coefficient and only evaluates the base to power 0" },
      { text: `(0, ${baseDenominator})`, isCorrect: false, reason: "confuses the denominator of the base with the y-intercept" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The y-intercept occurs when $x=0$. Substituting: $g(0)=${coefficient}\\left(\\frac{${baseNumerator}}{${baseDenominator}}\\right)^{0}=${coefficient}(1)=${coefficient}$. So the y-intercept is $(0, ${coefficient})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};
