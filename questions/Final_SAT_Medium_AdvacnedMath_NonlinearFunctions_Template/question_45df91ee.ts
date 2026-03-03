import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 45df91ee
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function y-intercept
 * - Number ranges: Coefficient 11, base 1/12
 * - Difficulty: Medium - finding y-intercept of exponential
 * - Distractor patterns: Confusing base with y-intercept, calculation errors
 */

export const generator_45df91ee = {
  metadata: {
    // id: "45df91ee",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const coefficient = getRandomInt(5, 20);
    const baseNumerator = 1;
    const baseDenominator = getRandomInt(5, 15);
    
    const questionText = `If the given function $g(x)=${coefficient}\\left(\\frac{${baseNumerator}}{${baseDenominator}}\\right)^{x}$ is graphed in the $xy$-plane, where $y=g(x)$, what is the $y$-intercept of the graph?`;
    
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

/**
 * Question ID: 7f87deff
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Cubic equation x-intercepts (multi-answer)
 * - Number ranges: Roots from -14 to 14
 * - Difficulty: Medium - factoring cubic and finding all roots
 * - Multi-accept: Any of the three roots is acceptable
 */