import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_20291f47 = {
  metadata: {
    // id: "20291f47",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const c = getRandomInt(8, 15);
    const a = getRandomInt(5, 10);
    
    const linearCoeff = c + 1;
    
    // STEP 2: Create options
    const correctNumerator = `xy^{2}+${linearCoeff}xy-${a}y`;
    const correctDenominator = `x^{2}y-${a}xy`;
    const correctAnswer = `$\\frac{${correctNumerator}}{${correctDenominator}}$`;
    
    // Wrong denominator (cubed)
    const wrongDen1 = `x^{3}y-${2*a}x^{2}y+${a*a}xy`;
    
    // Wrong numerator
    const wrongNum = `xy+${Math.floor(linearCoeff/2)}y+${c}`;
    const wrongDen2 = `x^{2}y-${a}xy+x-${a}`;
    
    const optionsData = [
      { text: `$\\frac{${wrongNum}}{${wrongDen1}}$`, isCorrect: false, reason: "results from conceptual or calculation errors in handling the complex denominators" },
      { text: `$\\frac{${wrongNum}}{${wrongDen2}}$`, isCorrect: false, reason: "results from conceptual or calculation errors in finding common denominators" },
      { text: correctAnswer, isCorrect: true },
      { text: `$\\frac{${correctNumerator}}{${wrongDen1}}$`, isCorrect: false, reason: "results from conceptual or calculation errors in determining the final denominator" }
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
    const questionText = `Which expression is equivalent to $\\frac{y+${c}}{x-${a}}+\\frac{y(x-${a})}{x^{2}y-${a}xy}$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. First, factor the denominator in the second term:
$$x^{2}y-${a}xy = xy(x-${a})$$

Rewrite with common denominator $xy(x-${a})$:
- First term: $\\frac{y+${c}}{x-${a}} \\cdot \\frac{xy}{xy} = \\frac{xy(y+${c})}{xy(x-${a})}$
- Second term stays: $\\frac{y(x-${a})}{xy(x-${a})}$

Add the numerators:
$$xy(y+${c}) + y(x-${a}) = xy^{2} + ${c}xy + xy - ${a}y = xy^{2} + ${linearCoeff}xy - ${a}y$$

Result: $\\frac{xy^{2} + ${linearCoeff}xy - ${a}y}{xy(x-${a})} = \\frac{xy^{2} + ${linearCoeff}xy - ${a}y}{x^{2}y - ${a}xy}$

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
 * Question ID: 42f8e4b4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cubic polynomial with GCF, factoring quadratic]
 * - Difficulty factors: [Factoring out GCF, factoring quadratic, finding factors of form x+b]
 * - Distractor patterns: [Not finding smallest b, missing GCF]
 * - Constraints: [b must be positive, find smallest possible b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */