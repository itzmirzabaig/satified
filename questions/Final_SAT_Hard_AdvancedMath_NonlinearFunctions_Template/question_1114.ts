import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1114
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x-r1)(x+|r2|), r1 in [8,15], r2 in [-20,-10], find minimum]
 * - Difficulty factors: [Factored form, vertex x-coordinate = midpoint of roots]
 * - Distractor patterns: [const c=r1*r2, a root r2, sign-error midpoint (r1-r2)/2, correct (r1+r2)/2]
 * - Constraints: [Minimum at x = (r1 + r2)/2]
 * - Question type: [Text->Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1114 = {
  metadata: {
    id: "1114",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const r1 = getRandomInt(8, 15);   // positive root, 8..15
    const r2 = -getRandomInt(10, 20); // negative root, -20..-10

    // Vertex x-coordinate is the midpoint of the two roots.
    const nv = r1 + r2;   // vertex numerator over 2
    const ns = r1 - r2;   // sign-error distractor numerator over 2 (always positive)
    const c = r1 * r2;    // constant term (y-intercept), a common wrong pick

    // Render a value of the form n/2 as a reduced integer when even,
    // otherwise as a proper half-integer fraction. Keeps display clean and
    // makes the correct option an exact string (no float artifacts).
    // Negative halves lead with the sign (was \frac{-7}{2} in the choices).
    const halfStr = (n: number): string =>
      (n % 2 === 0) ? `${n / 2}` : n < 0 ? `-\\frac{${-n}}{2}` : `\\frac{${n}}{2}`;

    const vertexStr = halfStr(nv); // correct answer
    const signStr = halfStr(ns);   // sign-error midpoint

    // Distractors are collision-free across the entire declared range
    // (verified by enumeration): the only coincidence r2 == (r1+r2-20)/2 from
    // the old design is gone; root/const/sign/vertex never coincide here.
    // Each choice now carries its own reason (the explanation had none per choice).
    const optionsData = [
      { text: `$${c}$`, isCorrect: false, reason: `$${c}$ is the constant term of the expanded function, which is the $y$-coordinate of the $y$-intercept rather than the $x$-value of the vertex` },
      { text: `$${r2}$`, isCorrect: false, reason: `$${r2}$ is one of the two $x$-intercepts, where $f(x)=0$, rather than the midpoint of the intercepts` },
      { text: `$${signStr}$`, isCorrect: false, reason: `$${signStr}$ comes from subtracting the intercept $${r2}$ instead of adding it, which gives half the distance between the intercepts rather than their midpoint` },
      { text: `$${vertexStr}$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correct.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const factor2 = `(x+${Math.abs(r2)})`; // r2 is always negative here

    // Show the simplified value unless the fraction is already in final form.
    const reduceTail = (nv % 2 === 0 || nv < 0) ? `=${vertexStr}` : ``;

    return {
      // Stem used to say "The function is defined by" without naming f.
      questionText: `The function $f$ is defined by $f(x)=(x-${r1})${factor2}$. For what value of $x$ does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.text,
      explanation: `Choice ${correctLetter} is correct. Because the parabola opens upward, its minimum is at the vertex, whose $x$-coordinate is the midpoint of the two $x$-intercepts. The intercepts are $x=${r1}$ and $x=${r2}$, so $x=\\frac{${r1}+(${r2})}{2}=\\frac{${nv}}{2}${reduceTail}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
