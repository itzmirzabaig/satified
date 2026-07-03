import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 653
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 46, constant: 16, result: 30]
 * - Difficulty factors: [Solving for expression rather than variable, direct isolation]
 * - Distractor patterns: [A is the constant term, B is value of x, D is miscalculation]
 * - Constraints: [Equation asks for value of expression C(x - D), not x itself]
 * - Question type: [Multiple Choice Text]
 */

export const generator_653 = {
  metadata: {
    id: "653",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Equation of the form A = B + C(x - D); the question asks for the value
    // of the expression C(x - D). Construct with clean integers so that the
    // value of x is also an integer.
    // C(x - D) = A - B = targetValue. Pick C and (x - D) first so targetValue
    // is an exact multiple of C and x is a whole number.
    const C = getRandomInt(2, 5);
    const xMinusD = getRandomInt(3, 9);          // integer value of (x - D)
    const targetValue = C * xMinusD;             // value of C(x - D), = A - B
    const B = getRandomInt(10, 25);              // constant term added on the right
    const A = B + targetValue;                   // left-hand side total
    const D = getRandomInt(4, 12);
    const xValue = D + xMinusD;                  // actual value of x (integer)

    // Distractor pool with distinct pedagogical meanings:
    //  - the constant term B (student stops after subtracting nothing)
    //  - the value of x itself (solved for x instead of the expression)
    //  - a miscalculation: adds instead of subtracts the constant (A + B)... too large;
    //    use targetValue shifted by one "step" of C, and the raw division result.
    const candidates = [
      B,                       // reports the constant term
      xValue,                  // solved for x rather than C(x - D)
      targetValue + C,         // off-by-one on (x - D)
      A - B - C,               // off-by-one the other way
      A,                       // reports the total
    ];

    // Pick three distinct distractors that differ from the correct answer and
    // from each other. Bounded scan over the fixed pool (no unbounded loop).
    const distractors: number[] = [];
    for (const cand of candidates) {
      if (cand === targetValue) continue;
      if (distractors.includes(cand)) continue;
      distractors.push(cand);
      if (distractors.length === 3) break;
    }
    // Safety net (pool is large enough that this is essentially never hit):
    let filler = 1;
    while (distractors.length < 3 && filler < 50) {
      const cand = targetValue + filler;
      if (cand !== targetValue && !distractors.includes(cand)) distractors.push(cand);
      filler++;
    }

    const correctText = `${targetValue}`;
    const optionsData = [
      { text: `${distractors[0]}`, isCorrect: false },
      { text: `${distractors[1]}`, isCorrect: false },
      { text: `${targetValue}`, isCorrect: true },
      { text: `${distractors[2]}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    return {
      questionText: `If $${A} = ${B} + ${C}(x - ${D})$, what is the value of $${C}(x - ${D})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. To find the value of $${C}(x - ${D})$, subtract $${B}$ from both sides of the given equation: $${A} - ${B} = ${C}(x - ${D})$, which gives $${targetValue} = ${C}(x - ${D})$. Therefore, the value of $${C}(x - ${D})$ is $${targetValue}$.`
    };
  }
};
