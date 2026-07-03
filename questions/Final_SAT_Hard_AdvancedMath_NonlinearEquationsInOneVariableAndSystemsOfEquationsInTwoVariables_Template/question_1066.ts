import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1066
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [u-3=6/(t-2), solve for t]
 * - Difficulty factors: [Rational equation, multiply by denominator, isolate variable]
 * - Distractor patterns: [A: 1/u, B: unsimplified numerator, C: forgot to add constant back, D: cu/(u-a)/correct]
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

    // STEP 2: Create distractors — each is structurally distinct from the
    // correct answer for every draw (finalB = c*a >= 4, so cu+finalB != cu,
    // and finalB/(u-a) has no u in the numerator).
    const distractorA = `\\frac{1}{u}`;
    const distractorB = `\\frac{${c}u+${finalB}}{u-${a}}`;
    const distractorC = `\\frac{${finalB}}{u-${a}}`;

    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: `results from incorrectly inverting the relationship between $t$ and $u$` },
      { text: `$${distractorB}$`, isCorrect: false, reason: `results from failing to distribute the ${c} across $(u-${a})$ when combining the terms over a common denominator` },
      { text: `$${distractorC}$`, isCorrect: false, reason: `equals $t-${c}$, not $t$; it results from forgetting to add ${c} to both sides after dividing by $(u-${a})$` },
      { text: `$${correctAnswer}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Multiplying both sides of the equation by $(t-${c})$ gives $(t-${c})(u-${a})=${finalB}$. Dividing both sides by $(u-${a})$ gives $t-${c}=\\frac{${finalB}}{u-${a}}$. Adding ${c} to both sides gives $t=\\frac{${finalB}}{u-${a}}+${c}=\\frac{${finalB}+${c}(u-${a})}{u-${a}}=\\frac{${c}u}{u-${a}}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `If $u-${a}=\\frac{${finalB}}{t-${c}}$, what is $t$ in terms of $u$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
