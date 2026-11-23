import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1066
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [u-3=6/(t-2), solve for t]
 * - Difficulty factors: [Rational equation, multiply by denominator, isolate variable]
 * - Distractor patterns: [inverted fraction (u+a(c^2-1))/(ca), c written as cu/(u-a), forgot to add c, correct cu/(u-a)]
 * - Constraints: [b = c*a so the answer simplifies to cu/(u-a); multiple algebraic steps, combine fractions]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1066 = {
  metadata: {
    id: "1066",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: u - a = b/(t - c), solve for t.
    // Choosing b = c*a makes the answer simplify cleanly:
    //   (t-c)(u-a) = ca  =>  t - c = ca/(u-a)
    //   t = c + ca/(u-a) = (c(u-a) + ca)/(u-a) = cu/(u-a)

    const a = getRandomInt(2, 5);
    const c = getRandomInt(2, 5);
    const finalB = c * a; // numerator of the fraction; nonzero for every draw

    const correctAnswer = `\\frac{${c}u}{u-${a}}`;

    // STEP 2: Distractors, each a real slip.
    // Fix: before, one choice was 1/u with the reason "incorrectly inverting the
    // relationship", which no step of the solution produces, and the reasons
    // were printed on separate lines. Now:
    //  - inverted fraction: t-c = (u-a)/(ca), so t = (u + a(c^2-1))/(ca)
    //  - c written as cu/(u-a) instead of c(u-a)/(u-a): (cu+ca)/(u-a)
    //  - forgot to add c: ca/(u-a), which is t-c
    // These are distinct for every draw: only the first has a constant
    // denominator, and finalB = ca >= 4 separates the other three numerators.
    const invK = a * (c * c - 1);
    const distractorA = `\\frac{u+${invK}}{${finalB}}`;
    const distractorB = `\\frac{${c}u+${finalB}}{u-${a}}`;
    const distractorC = `\\frac{${finalB}}{u-${a}}`;

    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: `$${distractorA}$ results from inverting the fraction when solving for $t-${c}$, writing $t-${c}=\\frac{u-${a}}{${finalB}}$ instead of $t-${c}=\\frac{${finalB}}{u-${a}}$` },
      { text: `$${distractorB}$`, isCorrect: false, reason: `$${distractorB}$ results from rewriting ${c} as $\\frac{${c}u}{u-${a}}$ instead of $\\frac{${c}(u-${a})}{u-${a}}$ when adding it over the common denominator` },
      { text: `$${distractorC}$`, isCorrect: false, reason: `$${distractorC}$ is the value of $t-${c}$, not $t$; it results from not adding ${c} to both sides` },
      { text: `$${correctAnswer}$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Multiplying both sides of the equation by $(t-${c})$ gives $(t-${c})(u-${a})=${finalB}$. Dividing both sides by $(u-${a})$ gives $t-${c}=\\frac{${finalB}}{u-${a}}$. Adding ${c} to both sides gives $t=\\frac{${finalB}}{u-${a}}+${c}$. Writing ${c} as $\\frac{${c}(u-${a})}{u-${a}}$ gives $t=\\frac{${finalB}+${c}u-${finalB}}{u-${a}}=\\frac{${c}u}{u-${a}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `If $u-${a}=\\frac{${finalB}}{t-${c}}$, what is $t$ in terms of $u$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
