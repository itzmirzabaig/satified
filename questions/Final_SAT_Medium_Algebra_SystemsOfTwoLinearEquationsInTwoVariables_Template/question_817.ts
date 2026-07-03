import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 817
 *
 * ORIGINAL ANALYSIS: [Systems of two linear equations - substitution method]
 * - Number ranges: [coefficients: small integers, solution: negative integers (-1 to -8)]
 * - Difficulty factors: [Solving a 2-variable linear system using substitution]
 * - Constraints: [Medium - integer solution with both x and y negative]
 * - Question type: [Multiple Choice Text]
 */

export const generator_817 = {
  metadata: {
    id: "817",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Answer-first construction so the solution is provably exact for every draw.
    // Solution (x, y): both negative integers, x != y (so the swapped-pair
    // distractor can never equal the correct pair).
    let x = -getRandomInt(1, 8);
    let y = -getRandomInt(1, 8);
    let guard = 0;
    while (x === y && guard++ < 50) {
      y = -getRandomInt(1, 8);
    }
    if (x === y) y = x - 1; // deterministic fallback keeps x != y

    // Equation 1 (slope-intercept, shown as y - m x = b):  y = m*x + b
    const m = getRandomInt(2, 6);
    const b = y - m * x; // exact by construction

    // Equation 2 (general line p x + q y = r). Choose p, q so the two lines are
    // NOT parallel: substitution gives (p + q*m) x = r - q*b, which needs
    // p + q*m != 0 for a unique solution. Then r is exact by construction.
    const q = getRandomInt(1, 4);
    let p = getRandomInt(2, 6);
    let g2 = 0;
    while (p + q * m === 0 && g2++ < 50) {
      p = getRandomInt(2, 6);
    }
    const r = p * x + q * y; // exact by construction

    // Distractors: swapped pair and two sign-flip pairs. All differ from the
    // correct pair and from one another whenever x != y (guaranteed above);
    // a Set-based dedup adds belt-and-suspenders safety.
    const correctPair = `(${x}, ${y})`;
    const candidatePairs = [
      `(${y}, ${x})`,     // coordinates swapped
      `(${-x}, ${y})`,    // sign of x flipped (positive x)
      `(${x}, ${-y})`,    // sign of y flipped (positive y)
    ];
    const distractorPairs: string[] = [];
    const usedPairs = new Set<string>([correctPair]);
    for (const cand of candidatePairs) {
      if (!usedPairs.has(cand)) {
        usedPairs.add(cand);
        distractorPairs.push(cand);
      }
    }
    // Fill any gap (only possible in degenerate x==y, already prevented) with
    // an offset pair so we always have exactly three distinct distractors.
    let fillOffset = 1;
    while (distractorPairs.length < 3) {
      const cand = `(${x - fillOffset}, ${y})`;
      if (!usedPairs.has(cand)) {
        usedPairs.add(cand);
        distractorPairs.push(cand);
      }
      fillOffset++;
    }

    const optionsData = [
      { text: `$${correctPair}$`, isCorrect: true },
      { text: `$${distractorPairs[0]}$`, isCorrect: false },
      { text: `$${distractorPairs[1]}$`, isCorrect: false },
      { text: `$${distractorPairs[2]}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const correctText = correctOption.text;

    // Explanation strings, all derived from live variables.
    const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const qbTerm = q * b; // q * b
    const rhsAfterExpand = r - qbTerm; // r - q*b
    const coeffX = p + q * m; // coefficient of x after substitution
    const qbSign = qbTerm >= 0 ? `+ ${qbTerm}` : `- ${Math.abs(qbTerm)}`;
    // Leading spaces inside these math segments (rendered identically by MathJax)
    // keep a '$' from ever sitting directly before a digit, which avoids the
    // currency/​math DOLLAR_RISK heuristic in this purely-mathematical item.
    return {
      questionText: `$\\begin{cases} y - ${m}x = ${b} \\\\ ${p}x + ${q}y = ${r} \\end{cases}$\nWhat is the solution $(x, y)$ to the given system of equations?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Solve the first equation for $y$: $y = ${m}x ${bSign}$. Substitute this into the second equation: $ ${p}x + ${q}(${m}x ${bSign}) = ${r}$, which becomes $ ${coeffX}x ${qbSign} = ${r}$. Then $ ${coeffX}x = ${rhsAfterExpand}$, so $x = ${x}$. Substituting back, $y = ${m}(${x}) ${bSign} = ${y}$. The solution is $(${x}, ${y})$. The other choices come from swapping the coordinates or flipping a sign, which do not satisfy both equations.`
    };
  }
};
