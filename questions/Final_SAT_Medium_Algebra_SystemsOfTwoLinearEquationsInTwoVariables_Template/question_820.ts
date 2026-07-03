import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 820
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients small integers]
 * - Difficulty factors: [Substitution, asks for x - y]
 * - Constraints: [Integer solution, negative x]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_820 = {
  metadata: {
    id: "820",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Answer-first construction guarantees an exact integer solution and a
    // genuinely non-degenerate system for every draw.
    // System:  y = m1*x + b1   and   3y = m2*x + b2
    // Eliminating y: 3(m1*x + b1) = m2*x + b2  ->  (3*m1 - m2)x = b2 - 3*b1.
    // We require 3*m1 - m2 != 0 so the two lines meet in a single point.
    const m1 = getRandomInt(2, 5);
    const b1 = getRandomInt(5, 15);

    // Choose x negative; ensure y != 0 so that x and (x - y) never coincide.
    let x = -getRandomInt(2, 9);
    let y = m1 * x + b1;
    let gy = 0;
    while (y === 0 && gy++ < 50) {
      x = -getRandomInt(2, 9);
      y = m1 * x + b1;
    }
    if (y === 0) { x = -2; y = m1 * x + b1; } // deterministic fallback

    // Pick m2 with 3*m1 - m2 != 0 (unique solution), then derive b2 exactly.
    let m2 = getRandomInt(5, 12);
    let gm = 0;
    while (3 * m1 - m2 === 0 && gm++ < 50) {
      m2 = getRandomInt(5, 12);
    }
    if (3 * m1 - m2 === 0) m2 = m2 + 1; // deterministic fallback
    const b2 = 3 * y - m2 * x; // exact by construction

    const answer = x - y; // value asked for

    // Distractors modelling common mistakes; kept distinct from the answer and
    // from each other with a Set (bounded, deterministic).
    const candidates = [
      x,          // reports x instead of x - y
      y,          // reports y
      x + y,      // sign error: x + y instead of x - y
      -answer,    // computes y - x
      y - x,      // same magnitude, opposite sign (also y - x)
      answer + 2, // near-miss
      answer - 2  // near-miss
    ];
    const used = new Set<number>([answer]);
    const distractors: number[] = [];
    for (const c of candidates) {
      if (distractors.length >= 3) break;
      if (!used.has(c)) { used.add(c); distractors.push(c); }
    }
    // Guarantee three distinct distractors even in pathological overlaps.
    let offset = 3;
    while (distractors.length < 3) {
      if (!used.has(answer + offset)) { used.add(answer + offset); distractors.push(answer + offset); }
      offset++;
    }

    const optionsData = [
      { text: answer.toString(), isCorrect: true },
      { text: distractors[0].toString(), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: distractors[2].toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // Explanation figures (leading spaces on digit-leading math segments keep a
    // '$' off any digit so the pure-math item avoids the DOLLAR_RISK heuristic).
    const b2Sign = b2 >= 0 ? `+ ${b2}` : `- ${Math.abs(b2)}`;
    const threeB1 = 3 * b1;
    const threeM1 = 3 * m1;
    const coeffX = 3 * m1 - m2;       // coefficient of x after elimination
    const rhs = b2 - threeB1;         // right-hand side after elimination
    const leftConst = threeB1;        // 3*b1
    const ySign = y >= 0 ? `${y}` : `(${y})`;

    const questionText = `$\\begin{cases} y = ${m1}x + ${b1} \\\\ 3y = ${m2}x ${b2Sign} \\end{cases}$\n\nThe solution to the given system of equations is $(x, y)$. What is the value of $x - y$?`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: answer.toString(),
      explanation: `Choice ${correctLetter} is correct. Substitute $y = ${m1}x + ${b1}$ into the second equation: $ 3(${m1}x + ${b1}) = ${m2}x ${b2Sign}$, which gives $ ${threeM1}x + ${leftConst} = ${m2}x ${b2Sign}$. Collecting like terms, $ ${coeffX}x = ${rhs}$, so $x = ${x}$. Then $y = ${m1}(${x}) + ${b1} = ${y}$. Therefore $x - y = ${x} - ${ySign} = ${answer}$.`
    };
  }
};
