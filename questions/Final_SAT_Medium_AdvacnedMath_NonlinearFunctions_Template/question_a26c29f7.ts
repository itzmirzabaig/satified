import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: a26c29f7
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Function transformation (vertical shift)
 * - Number ranges: Simple integer coefficients (1-10 range)
 * - Difficulty: Medium - requires understanding vertical shifts
 * - Distractor patterns: Confusing shift direction, wrong operation type
 */

export const generator_a26c29f7 = {
  metadata: {
    // id: "a26c29f7",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // Generate random coefficient and shift
    const coefficient = getRandomInt(2, 9);
    const shift = getRandomInt(1, 5);
    
    const questionText = `The function $f$ is defined by $f(x) = ${coefficient}x^3$. In the $xy$-plane, the graph of $y = g(x)$ is the result of shifting the graph of $y = f(x)$ down ${shift} units. Which equation defines function $g$?`;
    
    const correctAnswer = `g(x) = ${coefficient}x^3 - ${shift}`;
    
    const optionsData = [
      { text: `g(x) = \\frac{${coefficient}}{${shift}}x^3`, isCorrect: false, reason: "incorrectly divides coefficient by shift amount" },
      { text: `g(x) = ${coefficient}x^{\\frac{3}{${shift}}}`, isCorrect: false, reason: "incorrectly changes exponent instead of shifting" },
      { text: `g(x) = ${coefficient}x^3 + ${shift}`, isCorrect: false, reason: "shifts up instead of down" },
      { text: `g(x) = ${coefficient}x^3 - ${shift}`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Shifting a graph down by ${shift} units means subtracting ${shift} from the function. Since $f(x) = ${coefficient}x^3$, the transformed function is $g(x) = ${coefficient}x^3 - ${shift}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: 99269e03
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function table evaluation
 * - Number ranges: Small integers (1-3 for x, resulting y values 11-35)
 * - Difficulty: Medium - requires evaluating exponential function
 * - Distractor patterns: Calculation errors, wrong exponent operations
 */