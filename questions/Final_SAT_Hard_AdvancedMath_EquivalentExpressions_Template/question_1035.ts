import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1035
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic with integer constraints]
 * - Difficulty factors: [Factoring constraints, divisibility reasoning, systematic elimination]
 * - Distractor patterns: [Assuming divisibility without checking, calculation errors]
 * - Constraints: [h, k, j are integers, so kj = -C means k divides C; C must not be
 *   divisible by h, otherwise C/h would also always be an integer and the item
 *   would have two defensible answers]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1035 = {
  metadata: {
    id: "1035",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Pick the leading coefficient h and the constant term -absC.
    // b stays SYMBOLIC in the question ("where b is a constant"); the only
    // usable fact is kj = -absC, which forces k to be a factor of absC.
    // Guard: absC must NOT be divisible by h, or absC/h would also always be
    // an integer. For every h in [2,6] the filtered list below is non-empty
    // (h=2 leaves {45}), so no retry loop is needed.
    const cChoices = [30, 36, 40, 42, 45, 48, 50, 54, 60];
    const h = getRandomInt(2, 6);
    const validC = cChoices.filter(v => v % h !== 0);
    const absC = getRandomElement(validC);

    // STEP 2: Correct answer — absC/k = -j is always an integer.
    const correctAnswer = `$\\frac{${absC}}{k}$`;

    // Integer-only counterexample factorizations for the b-based distractors:
    // (k = 1, j = -absC)  gives b = hj + k = 1 - h*absC, and b/h = -absC + 1/h.
    const bEx1 = 1 - h * absC;
    // (k = absC, j = -1)  gives b = hj + k = absC - h, and b/k = (absC - h)/absC.
    const bEx2 = absC - h;

    // STEP 3: Create options
    // Reasons now start with the value and name the slip (before they opened
    // with generic clauses and the explanation used "is incorrect;").
    const optionsData = [
      { text: `$\\frac{b}{h}$`, isCorrect: false, reason: `$\\frac{b}{h}$ is not always an integer: the factorization only requires $kj = -${absC}$, so $k = 1$ and $j = -${absC}$ are allowed, which gives $b = hj + k = ${bEx1}$ and $\\frac{b}{h} = \\frac{${bEx1}}{${h}}$, not an integer` },
      { text: `$\\frac{b}{k}$`, isCorrect: false, reason: `$\\frac{b}{k}$ is not always an integer: $k = ${absC}$ and $j = -1$ are allowed, which gives $b = hj + k = ${bEx2}$ and $\\frac{b}{k} = \\frac{${bEx2}}{${absC}}$, not an integer` },
      { text: `$\\frac{${absC}}{h}$`, isCorrect: false, reason: `$\\frac{${absC}}{h}$ assumes $h$ divides the constant term, but matching leading coefficients gives $h = ${h}$, and $\\frac{${absC}}{${h}}$ is not an integer` },
      { text: correctAnswer, isCorrect: true, reason: '' }
    ];

    // STEP 4: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 5: Question text (b remains symbolic)
    const questionText = `The expression $\\,${h}x^{2} + bx - ${absC}$, where $b$ is a constant, can be rewritten as $(hx + k)(x + j)$, where $h$, $k$, and $j$ are integer constants. Which of the following must be an integer?`;

    // STEP 6: Explanation
    // Before: display math split over several lines. Now one paragraph in the
    // standard format.
    const explanation = `Choice ${correctOption.letter} is correct. Expanding the factored form gives $(hx + k)(x + j) = hx^{2} + (hj + k)x + kj$. Matching this to $${h}x^{2} + bx - ${absC}$ shows that $h = ${h}$, $b = hj + k$, and $kj = -${absC}$. Because $k$ and $j$ are integers with $kj = -${absC}$, dividing both sides by $k$ gives $j = -\\frac{${absC}}{k}$. So $\\frac{${absC}}{k} = -j$, which is an integer for every allowed pair of values of $k$ and $j$. Therefore $\\frac{${absC}}{k}$ must be an integer. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
