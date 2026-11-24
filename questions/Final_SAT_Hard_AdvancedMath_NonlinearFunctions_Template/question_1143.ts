import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1143
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(t) = 55t - 2t², g(t) = f(t) + 3]
 * - Difficulty factors: [Vertex of transformed quadratic, maximum value expression]
 * - Distractor patterns: [Various forms with 55/2, 55/4]
 * - Constraints: [Maximum at t = -b/(2a) = 55/4]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED: wrong choices had no reasons, and the explanation jumped from the
 * substituted expression to the answer. It now shows why b(T) - kT^2 = kT^2.
 */

export const generator_1143 = {
  metadata: {
    id: "1143",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(1, 4);
    const b = getRandomInt(40, 80);
    const c = getRandomInt(1, 5);

    const k = 2 * a; // f(t) = bt - kt^2
    const den = 4 * a; // the vertex is at t = b/(2k) = b/(4a)
    const T = `\\frac{${b}}{${den}}`;
    const TP = `\\left(${T}\\right)`;
    const halfP = `\\left(\\frac{${b}}{2}\\right)`;
    const correctText = `$${c}+${k}${TP}^2$`;

    const optionsData = [
      { text: `$${c}+${halfP}^2$`, isCorrect: false, reason: `this expression completes the square as if the coefficient of $t^2$ were $-1$ instead of $-${k}$` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: `$${c}-${k}${TP}^2$`, isCorrect: false, reason: `this expression leaves out the term $${b}t$ when substituting $t=${T}$ into $g(t)$` },
      { text: `$${c}-${halfP}^2$`, isCorrect: false, reason: `this expression treats the coefficient of $t^2$ as $-1$ and also subtracts the squared term instead of adding it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(t)=${b}t-${k}t^2$. The function $g$ is defined by $g(t)=f(t)+${c}$. Which expression represents the maximum value of $g(t)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Since $g(t)=-${k}t^2+${b}t+${c}$ has a negative coefficient on $t^2$, its graph opens downward and its maximum occurs at the vertex, where $t=-\\frac{${b}}{2(-${k})}=${T}$. Substituting gives $g\\left(${T}\\right)=${b}${TP}-${k}${TP}^2+${c}$. Because $${b}=${den}${TP}$, the first term equals $${den}${TP}^2$, so the maximum value is $${den}${TP}^2-${k}${TP}^2+${c}=${c}+${k}${TP}^2$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
