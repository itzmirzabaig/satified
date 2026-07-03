import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1038
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [literal equation with square root, solve for w]
 * - Difficulty factors: [Multiple algebraic steps, isolate variable, simplify fraction]
 * - Distractor patterns: [sqrt instead of squaring; sign error isolating w; kept radical coefficient when squaring]
 * - Constraints: [Two variables in equation, must isolate w through multiple steps]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1038 = {
  metadata: {
    id: "1038",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: 28x/(14y) = 2√(w+19), solve for w
    // Pattern: (c·b·x)/(b·y) = c·√(w+d) — dividing both sides by c leaves
    // x/y = √(w+d), so w = (x/y)² - d for every draw.

    const b = getRandomInt(5, 15);  // Shared factor in the displayed fraction
    const c = getRandomInt(2, 3);   // Coefficient of the radical
    const d = getRandomInt(15, 25); // Constant inside the radical
    const lhsNum = c * b;           // Displayed numerator coefficient (= c·b)

    const correctAnswer = `w=\\left(\\frac{x}{y}\\right)^2-${d}`;

    // Distractors encode distinct algebraic mistakes; none can equal the
    // correct expression (or each other) for any draw.
    const distractorA = `w=\\sqrt{\\frac{x}{y}}-${d}`;                    // sqrt instead of squaring
    const distractorB = `w=\\left(\\frac{x}{y}\\right)^2+${d}`;           // sign error isolating w
    const distractorD = `w=\\left(\\frac{${c}x}{y}\\right)^2-${d}`;       // kept the factor of c when squaring

    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: `takes the square root of $\\frac{x}{y}$ instead of squaring both sides to eliminate the radical` },
      { text: `$${distractorB}$`, isCorrect: false, reason: `adds ${d} to both sides instead of subtracting ${d} when isolating $w$` },
      { text: `$${correctAnswer}$`, isCorrect: true },
      { text: `$${distractorD}$`, isCorrect: false, reason: `results from squaring without first dividing both sides of the equation by ${c}, leaving an extra factor of ${c}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Dividing both sides of the equation by ${c} gives $\\frac{${lhsNum}x}{${lhsNum}y}=\\sqrt{w+${d}}$, which simplifies to $\\frac{x}{y}=\\sqrt{w+${d}}$. Squaring both sides gives $\\left(\\frac{x}{y}\\right)^2=w+${d}$. Subtracting ${d} from both sides gives $w=\\left(\\frac{x}{y}\\right)^2-${d}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `$\\frac{${lhsNum}x}{${b}y} = ${c}\\sqrt{w+${d}}$\n\nThe given equation relates the distinct positive real numbers $w$, $x$, and $y$. Which equation correctly expresses $w$ in terms of $x$ and $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
