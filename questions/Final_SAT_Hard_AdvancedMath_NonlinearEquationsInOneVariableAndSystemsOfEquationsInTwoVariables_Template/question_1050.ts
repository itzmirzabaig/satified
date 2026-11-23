import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1050
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Equations (System of Equations)
 * - Visual: Text-only (System of two equations displayed)
 * - Fixes: Uses \begin{cases} environment to ensure both equations are visible on separate lines.
 */

export const generator_1050 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Parabola: y = -a(x - h)^2 + k (opens downward, vertex at (h, k)).
    // Line: y = L. Setting them equal gives (x - h)^2 = (k - L)/a.
    //
    // Before: the answer was always "Zero", the wrong choices had no reasons,
    // and the explanation was HTML with bold text and bullets. Now the case
    // is randomized, L = k + a*d^2, k, or k - a*d^2 keeps (x - h)^2 an exact
    // integer, and each wrong choice names a real slip.
    const kind = getRandomElement(['zero', 'one', 'two'] as const);
    const h = getRandomInt(2, 12);
    const a = getRandomInt(2, 5);
    const d = getRandomInt(1, 4);
    let k = 0, L = 0;
    do {
      k = getRandomInt(5, 15);
      L = kind === 'zero' ? k + a * d * d : kind === 'one' ? k : k - a * d * d;
    } while (L === 0);
    const R = kind === 'zero' ? -d * d : kind === 'one' ? 0 : d * d;
    const para = `-${a}(x - ${h})^2 + ${k}`;
    const sq = `(x - ${h})^2`;

    const equations = `$$
    \\begin{cases}
    y = ${para} \\\\
    y = ${L}
    \\end{cases}
    $$`;

    const infReason = `infinitely many would require the two graphs to be the same, but one is a parabola and the other is a horizontal line`;
    let zeroReason = '', oneReason = '', twoReason = '', conclusion = '';
    if (kind === 'zero') {
      conclusion = `The square of a real number cannot be negative, so no value of $x$ works and the graphs do not intersect.`;
      oneReason = `exactly one would require the line to pass through the vertex $(${h}, ${k})$, but the line $y = ${L}$ is above the vertex`;
      twoReason = `exactly two results from dropping the negative sign and writing $${sq} = ${d * d}$, but the correct equation is $${sq} = ${R}$`;
    } else if (kind === 'one') {
      conclusion = `The only solution is $x = ${h}$, so the graphs intersect at exactly one point, the vertex $(${h}, ${k})$.`;
      zeroReason = `zero results from reading $${sq} = 0$ as having no solution, but $x = ${h}$ makes it true`;
      twoReason = `exactly two counts the repeated solution of $${sq} = 0$ twice, but $x = ${h}$ is a single value`;
    } else {
      conclusion = `Taking square roots gives $x - ${h} = ${d}$ or $x - ${h} = -${d}$, so $x = ${h + d}$ or $x = ${h - d}$. The graphs intersect at exactly two points.`;
      zeroReason = `zero results from ignoring the negative sign in front of ${a} and treating the vertex as a minimum, which would keep the graph above the line $y = ${L}$, but the parabola opens downward`;
      oneReason = `exactly one results from taking only the positive square root, $x - ${h} = ${d}$, and missing the solution $x = ${h - d}$`;
    }

    const optionsData = [
      { text: "Zero", isCorrect: kind === 'zero', reason: zeroReason },
      { text: "Exactly one", isCorrect: kind === 'one', reason: oneReason },
      { text: "Exactly two", isCorrect: kind === 'two', reason: twoReason },
      { text: "Infinitely many", isCorrect: false, reason: infReason }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The graphs intersect where the two expressions for $y$ are equal: $${para} = ${L}$. Subtracting ${k} from both sides gives $-${a}${sq} = ${L - k}$. Dividing both sides by $-${a}$ gives $${sq} = ${R}$. ${conclusion} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The system of equations is given by:\n${equations}\nIf the given equations are graphed in the $xy$-plane, at how many points do the graphs of the equations intersect?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
