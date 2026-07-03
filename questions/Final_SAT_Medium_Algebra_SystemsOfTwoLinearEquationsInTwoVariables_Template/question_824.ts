import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 824
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: double-digit after scaling]
 * - Difficulty factors: [Infinitely many solutions = equivalent equations]
 * - Distractor patterns: [Various sign combinations that break proportionality]
 * - Constraints: [Correct answer must be a scalar multiple of the original]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * A system has infinitely many solutions iff the two equations are equivalent
 * (one is a nonzero scalar multiple of the other). The correct choice is
 * m*(a,b,c). Each distractor flips a sign so it is no longer proportional to
 * (a,b,c) and therefore does NOT give infinitely many solutions.
 */

// Render "Ax +/- |B|y = C" with sign-aware joining (never produces "+ -").
function fmtEq(A: number, B: number, C: number): string {
  const aTerm = `${A < 0 ? '-' : ''}${Math.abs(A)}x`;
  const bTerm = `${B < 0 ? '-' : '+'} ${Math.abs(B)}y`;
  return `${aTerm} ${bTerm} = ${C}`;
}

export const generator_824 = {
  metadata: {
    id: "824",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate the original equation ax + by = c (a, b may be negative).
    const a = getRandomInt(2, 6) * getRandomElement([-1, 1]);
    const b = getRandomInt(3, 8) * getRandomElement([-1, 1]);
    const c = getRandomInt(30, 80);          // positive constant
    const multiplier = getRandomInt(2, 5);   // scalar for the equivalent equation

    // STEP 2: Build question text (sign-aware so no "+ -" appears).
    const questionText = `One of the two equations in a system of linear equations is $${fmtEq(a, b, c)}$. The system has infinitely many solutions. Which of the following could be the second equation in the system?`;

    // STEP 3: Correct option = m*(a, b, c); distractors flip a sign so the
    // triple is no longer proportional to (a, b, c).
    const newA = a * multiplier;
    const newB = b * multiplier;
    const newC = c * multiplier;

    const correctText   = `$${fmtEq(newA, newB, newC)}$`;      // m*(a,b,c)  — equivalent
    const distA         = `$${fmtEq(-newA, newB, newC)}$`;     // x-coeff sign flipped
    const distB         = `$${fmtEq(newA, newB, -newC)}$`;     // constant sign flipped (parallel, no solutions)
    const distC         = `$${fmtEq(-newA, newB, -newC)}$`;    // x-coeff and constant flipped

    // The four triples are mutually distinct for every draw:
    //   a != 0 => newA != -newA;  c > 0 => newC != -newC.
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distA, isCorrect: false },
      { text: distB, isCorrect: false },
      { text: distC, isCorrect: false }
    ];

    // STEP 4: Shuffle and assign letters (letters known only after shuffle).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;

    // STEP 5: Return question data. correctAnswer is the option TEXT.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption!.text,
      explanation: `Choice ${correctLetter} is correct. A system has infinitely many solutions when the two equations are equivalent. Multiplying every term of $${fmtEq(a, b, c)}$ by ${multiplier} gives $${fmtEq(newA, newB, newC)}$, which has the same solutions. The other choices change the sign of a coefficient or the constant, so they are no longer proportional to the original equation and do not produce infinitely many solutions.`
    };
  }
};
