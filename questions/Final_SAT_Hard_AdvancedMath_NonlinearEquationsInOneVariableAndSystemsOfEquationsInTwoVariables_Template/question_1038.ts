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

    // Reasons now start with the value (they used to start with "it").
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: `$${distractorA}$ takes the square root of $\\frac{x}{y}$ instead of squaring both sides to eliminate the radical` },
      { text: `$${distractorB}$`, isCorrect: false, reason: `$${distractorB}$ adds ${d} to both sides instead of subtracting ${d} when isolating $w$` },
      { text: `$${correctAnswer}$`, isCorrect: true, reason: '' },
      { text: `$${distractorD}$`, isCorrect: false, reason: `$${distractorD}$ comes from simplifying the fraction to $\\frac{${c}x}{y}$ but ignoring the factor of ${c} in front of the radical, so the ${c} is never divided out` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Before: the explanation claimed dividing by c turned the left side into
    // (cb x)/(cb y), which is wrong (the denominator is b y, not cb y), and it
    // was split over lines. Now the left side is simplified first.
    const explanation = `Choice ${correctOption.letter} is correct. Dividing the numerator and denominator of the fraction by ${b} gives $\\frac{${lhsNum}x}{${b}y}=\\frac{${c}x}{y}$, so the equation is $\\frac{${c}x}{y}=${c}\\sqrt{w+${d}}$. Dividing both sides by ${c} gives $\\frac{x}{y}=\\sqrt{w+${d}}$. Squaring both sides gives $\\left(\\frac{x}{y}\\right)^2=w+${d}$. Subtracting ${d} from both sides gives $w=\\left(\\frac{x}{y}\\right)^2-${d}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `$\\frac{${lhsNum}x}{${b}y} = ${c}\\sqrt{w+${d}}$\n\nThe given equation relates the distinct positive real numbers $w$, $x$, and $y$. Which equation correctly expresses $w$ in terms of $x$ and $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
