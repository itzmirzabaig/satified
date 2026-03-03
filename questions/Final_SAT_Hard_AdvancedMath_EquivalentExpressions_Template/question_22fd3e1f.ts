import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 22fd3e1f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cubic and quadratic polynomials]
 * - Difficulty factors: [Factoring cubic, factoring quadratic, simplifying rational expressions, domain restriction]
 * - Distractor patterns: [Canceling wrong factors, forgetting x factor, wrong remainder]
 * - Constraints: [x > 3 so we can cancel (x-3)]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_22fd3e1f = {
  metadata: {
    // id: "22fd3e1f",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate polynomials
    const a = getRandomInt(2, 5);
    const b = getRandomInt(1, 4);
    
    // f(x) = x³ - a²x = x(x² - a²) = x(x-a)(x+a)
    // g(x) = x² - (a-b)x - ab = (x-a)(x+b)
    
    const gConst = -a * b;
    const gLinear = b - a;
    
    // STEP 2: Create options
    const correctAnswer = `$\\frac{x(x+${a})}{x+${b}}$`;
    
    const optionsData = [
      { text: `$\\frac{1}{x+${b}}$`, isCorrect: false, reason: "results from canceling too many factors, including the x term" },
      { text: `$\\frac{x+${a}}{x+${b}}$`, isCorrect: false, reason: "results from forgetting the x factor in the numerator" },
      { text: `$\\frac{x(x-${a})}{x+${b}}$`, isCorrect: false, reason: "results from canceling the wrong factor; $(x-${a})$ is the factor that should cancel, not remain" },
      { text: correctAnswer, isCorrect: true }
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
    const questionText = `$f(x) = x^{3} - ${a*a}x$ and $g(x) = x^{2} ${gLinear >= 0 ? '+' : ''}${gLinear}x ${gConst}$. Which of the following expressions is equivalent to $\\frac{f(x)}{g(x)}$, for $x > ${a}$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. Factor both polynomials:

$f(x) = x^{3} - ${a*a}x = x(x^{2} - ${a*a}) = x(x-${a})(x+${a})$ (difference of squares)

$g(x) = x^{2} ${gLinear >= 0 ? '+' : ''}${gLinear}x ${gConst} = (x-${a})(x+${b})$ (find two numbers that multiply to ${gConst} and add to ${gLinear})

Therefore:
$$\\frac{f(x)}{g(x)} = \\frac{x(x-${a})(x+${a})}{(x-${a})(x+${b})}$$

Since $x > ${a}$, we know $x \\neq ${a}$, so we can cancel $(x-${a})$:
$$\\frac{x(x+${a})}{x+${b}}$$

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: a0b4103e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractional coefficients, difference of squares pattern]
 * - Difficulty factors: [Recognizing difference of squares pattern, solving for k]
 * - Distractor patterns: [Square root of wrong term, forgetting to multiply by 3, arithmetic errors]
 * - Constraints: [k must be positive]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */