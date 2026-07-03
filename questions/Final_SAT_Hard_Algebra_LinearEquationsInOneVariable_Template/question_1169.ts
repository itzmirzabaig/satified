import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1169
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [10, 9, 7 (single-digit sizes), 4 (multiplier), 10 (constant), 100 (total)]
 * - Difficulty factors: [Setting up equation from word problem, distinguishing count vs size]
 * - Distractor patterns: [A: multiplies by sizes (perimeter confusion), B: assumes n of each type, C: forgets the n for 9-inch pans]
 * - Constraints: [Must sum to total pans]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1169 = {
  metadata: {
    id: "1169",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values — answer-first construction so the
    // total is an exact integer and no unbounded retry is needed.
    // Three DISTINCT pan sizes drawn from disjoint ranges (large > medium > small),
    // so the three sizes can never collide for any draw.
    const size1 = getRandomInt(8, 12);  // Large size
    const size2 = getRandomInt(5, 7);   // Medium size (the variable n refers to this)
    const size3 = getRandomInt(3, 4);   // Small size

    const multiplier = getRandomInt(3, 6);       // large pans = multiplier * n
    const nCoeff = multiplier + 1;               // coefficient after combining n + multiplier*n
    const n = getRandomInt(10, 18);              // number of medium (n-inch) pans
    const constantCount = getRandomInt(5, 15);   // number of small pans (a plain count)

    // total is derived, so (multiplier+1)*n + constantCount = totalPans exactly
    const totalPans = nCoeff * n + constantCount;

    // STEP 2: Build the correct equation: multiplier*n + n + constantCount = totalPans
    const correctEquation = `${nCoeff}n + ${constantCount} = ${totalPans}`;

    // STEP 3: Distractors (all structurally distinct from the correct equation
    // and from each other for every draw — see note).
    // A: multiplies counts by sizes (length, not count)
    const distractorA = `${size1}(${multiplier}n) + ${size2}n + ${size3}(${constantCount}) = ${totalPans}`;
    // B: assumes n pans of each size, then multiplies by size
    const distractorB = `${size1}n + ${size2}n + ${size3}n = ${totalPans}`;
    // C: forgets the n medium pans themselves (drops the +n term)
    const distractorC = `${multiplier}n + ${constantCount} = ${totalPans}`;

    // STEP 4: Create options (wrapped as math; each option string leads with a
    // digit and contains no "$<letter>", so no dollar/MathJax pairing risk).
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: `this multiplies the number of pans by their sizes, which gives a total length rather than a total count` },
      { text: `$${distractorB}$`, isCorrect: false, reason: `this assumes there are n pans of each size and then multiplies by the sizes, which is not what the situation describes` },
      { text: `$${distractorC}$`, isCorrect: false, reason: `this forgets to count the n ${size2}-inch pans themselves, including only the ${size1}-inch pans (${multiplier}n) and the ${size3}-inch pans (${constantCount})` },
      { text: `$${correctEquation}$`, isCorrect: true, reason: null }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Explanation: every inline "$...$" leads with the variable $n$ or a "(",
    // never with a digit, so there is no "$<digit>" that could pair with a
    // currency "$". Coefficient arithmetic and the final restated equation are
    // written as plain text to keep that invariant.
    const explanation = `Let $n$ represent the number of ${size2}-inch frying pans made.

- The number of ${size1}-inch pans is ${multiplier} times n, so there are ${multiplier}n of them.
- The number of ${size3}-inch pans is ${constantCount}.
- The total number of pans is ${totalPans}.

The total is the sum of the three counts:
$n + ${multiplier}n + ${constantCount} = ${totalPans}$

Combine the like terms: $n + ${multiplier}n = (${multiplier} + 1)n$, so the equation becomes
$(${multiplier} + 1)n + ${constantCount} = ${totalPans}$

Since ${multiplier} + 1 = ${nCoeff}, this is ${correctEquation}, which is Choice ${correctLetter}.

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A manufacturing plant makes ${size1}-inch, ${size2}-inch, and ${size3}-inch frying pans. During a certain day, the number of ${size1}-inch frying pans that the plant makes is ${multiplier} times the number $n$ of ${size2}-inch frying pans it makes, and the number of ${size3}-inch frying pans it makes is ${constantCount}. During this day, the plant makes ${totalPans} frying pans in total. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctEquation}$`,
      explanation: explanation
    };
  }
};
