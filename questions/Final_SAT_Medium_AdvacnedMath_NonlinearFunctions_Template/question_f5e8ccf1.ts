import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: f5e8ccf1
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Cubic function x-intercepts identification
 * - Number ranges: Roots at -4, 1, and 3/2
 * - Difficulty: Medium - factoring cubic and identifying non-root
 */

export const generator_f5e8ccf1 = {
  metadata: {
    // id: "f5e8ccf1",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const root1 = getRandomInt(-6, -2);
    const root2 = getRandomInt(1, 3);
    const root3Num = getRandomInt(3, 7);
    const root3Den = 2;
    const root3 = root3Num / root3Den; // Fraction like 3/2
    
    // Format the factors
    const factor1 = `(x + ${Math.abs(root1)})`;
    const factor2 = `(x - ${root2})`;
    const factor3 = `(2x - ${root3Num})`; // Creates root at 3/2 when = 0
    
    const questionText = `If the given function $f(x)=${factor1}${factor2}${factor3}$ is graphed in the $xy$-plane, where $y=f(x)$, which of the following is NOT an $x$-intercept of the graph?`;
    
    const correctAnswer = `\\left(-\\frac{${root2}}{${Math.abs(root1)}}, 0\\right)`;
    
    const optionsData = [
      { text: `(${root1}, 0)`, isCorrect: false, reason: "is an x-intercept" },
      { text: `\\left(-\\frac{${root2}}{${Math.abs(root1)}}, 0\\right)`, isCorrect: true },
      { text: `(${root2}, 0)`, isCorrect: false, reason: "is an x-intercept" },
      { text: `\\left(\\frac{${root3Num}}{${root3Den}}, 0\\right)`, isCorrect: false, reason: "is an x-intercept" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The x-intercepts occur when $f(x)=0$: ${factor1}=0 gives $x=${root1}$; ${factor2}=0 gives $x=${root2}$; ${factor3}=0 gives $x=\\frac{${root3Num}}{${root3Den}}$. The point $\\left(-\\frac{${root2}}{${Math.abs(root1)}}, 0\\right)$ is not among these. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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
 * Question ID: aa95fb33
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Rational function vertical shift (figure-based)
 * - Number ranges: Function 8/x shifted up 5
 * - Difficulty: Medium - visual transformation recognition
 * - Figure: Mafs graph of rational function with vertical shift
 */