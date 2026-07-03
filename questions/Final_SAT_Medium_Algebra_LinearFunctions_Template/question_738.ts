import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 738
 *
 * ORIGINAL ANALYSIS:
 * - Intent: h(x) = m x + b. Graph has x-intercept (a, 0) and y-intercept
 *   (0, b). Find a + b, where a = -b/m and b is the constant term.
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXES (this pass):
 * - Clean-integer construction: choose the x-intercept a as a negative integer
 *   and set b = -m*a, so a = -b/m is an exact integer for EVERY draw. That
 *   removes all fraction/decimal artifacts; every option is a plain integer.
 * - Distractors constructed to be pairwise distinct for all draws (proved in
 *   ranges below) — no retry needed.
 * - Rebuilt explanation: balanced $...$, every math span leads with a letter
 *   (no bare "$<digit>"), values from the same live variables.
 */
export const generator_738 = {
  metadata: {
    id: "738",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Answer-first construction for clean integers.
    //    m in [2,6]; |a| in [3,12]; a = -|a| (x-intercept), b = m*|a| (y-int).
    //    Then a = -b/m exactly (integer), b in [6, 72].
    const m = getRandomInt(2, 6);
    const aAbs = getRandomInt(3, 12);
    const a = -aAbs;          // x-intercept: (a, 0)
    const b = m * aAbs;       // y-intercept constant: (0, b)
    const answer = a + b;     // = aAbs*(m-1), a positive integer (m-1 >= 1)

    // 2. Distractors (all integers; pairwise distinct for every draw):
    //    correct  = aAbs*(m-1)  (positive)
    //    d_yInt   = b = aAbs*m           -> forgets the x-intercept term
    //    d_absSum = aAbs + b = aAbs*(m+1) -> adds |a| instead of a
    //    d_xInt   = a = -aAbs (negative) -> reports only the x-intercept
    //    Gaps: correct vs d_yInt differ by aAbs>0; d_yInt vs d_absSum by aAbs;
    //    correct is positive while d_xInt is negative; so all four differ.
    const dYInt = b;
    const dAbsSum = aAbs + b;
    const dXInt = a;

    const optionsData = [
      { text: answer.toString(), isCorrect: true },
      { text: dYInt.toString(), isCorrect: false, reason: `is only the $y$-intercept $b$; it omits the $x$-intercept $a$` },
      { text: dAbsSum.toString(), isCorrect: false, reason: `adds $\\lvert a \\rvert$ instead of the negative value $a$` },
      { text: dXInt.toString(), isCorrect: false, reason: `is only the $x$-intercept $a$; it omits the $y$-intercept $b$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $h$ is defined by $h(x) = ${m}x + ${b}$. The graph of $y = h(x)$ in the $xy$-plane has an $x$-intercept at $(a, 0)$ and a $y$-intercept at $(0, b)$, where $a$ and $b$ are constants. What is the value of $a + b$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The $x$-intercept is where $h(x) = ${m}x + ${b} = 0$, so $x = -\\frac{${b}}{${m}} = ${a}$; thus $a = ${a}$. The $y$-intercept is the constant term, so $b = ${b}$. Therefore $a + b = ${a} + ${b} = ${answer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
