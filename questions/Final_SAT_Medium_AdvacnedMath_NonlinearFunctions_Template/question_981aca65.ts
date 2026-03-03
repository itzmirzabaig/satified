import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 981aca65
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Rational function transformation
 * - Number ranges: Translation 3 down, 4 right
 * - Difficulty: Medium - horizontal and vertical shifts
 */

export const generator_981aca65 = {
  metadata: {
    // id: "981aca65",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(15, 25); // constant in numerator
    const verticalShift = getRandomInt(2, 5);
    const horizontalShift = getRandomInt(3, 6);
    
    const c = 19; // from original
    const k = 5;  // from original
    
    const questionText = `In the given function $f$, $a$ is a constant. The graph of function $f$ in the $xy$-plane, where $y = f(x)$, is translated $${verticalShift}$ units down and $${horizontalShift}$ units to the right to produce the graph of $y = g(x)$. Which equation defines function $g$?`;
    
    const correctFormula = `g(x) = \\frac{a-${c}}{x-${horizontalShift}} + ${k - verticalShift}`;
    
    const optionsData = [
      { text: `g(x) = \\frac{a-${c}}{x+${horizontalShift}} + ${k - verticalShift}`, isCorrect: false, reason: "shifts left instead of right" },
      { text: `g(x) = \\frac{a-${c}}{x-${horizontalShift}} + ${k - verticalShift}`, isCorrect: true },
      { text: `g(x) = \\frac{a-${c + verticalShift}}{x+${horizontalShift}} + ${k}`, isCorrect: false, reason: "shifts left and incorrectly modifies numerator" },
      { text: `g(x) = \\frac{a-${c + verticalShift}}{x-${horizontalShift}} + ${k}`, isCorrect: false, reason: "incorrectly modifies numerator instead of subtracting from constant term" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Translating right by ${horizontalShift} replaces $x$ with $(x-${horizontalShift})$. Translating down by ${verticalShift} subtracts ${verticalShift} from the function. Starting from $f(x)=\\frac{a-${c}}{x}+${k}$, we get $g(x)=\\frac{a-${c}}{(x-${horizontalShift})}+${k}-${verticalShift}=\\frac{a-${c}}{x-${horizontalShift}}+${k-verticalShift}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctFormula,
      explanation
    };
  }
};

/**
 * Question ID: 290132
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth model creation
 * - Number ranges: Initial 2000, growth 3%, years 1998-2010
 * - Difficulty: Medium - building exponential growth equation
 */