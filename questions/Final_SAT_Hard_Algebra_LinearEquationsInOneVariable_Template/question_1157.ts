import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1157
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [9, 7, 4 (single digit sizes), 5 (multiplier), 22 (constant), 100 (total)]
 * - Difficulty factors: [Setting up an equation from a word problem]
 * - Distractor patterns: [A: multiply by sizes, B: n of each with sizes, C: forgets the n for the middle size]
 * - Constraints: [Counts must sum to the total number of screws]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Previously two lengths could be equal (making the stem nonsense), the text
 * used hyphenated sizes like "9-inch", and the explanation had markdown, a 1n
 * term and quoted stem text. The total is now built from a whole number n.
 */

export const generator_1157 = {
  metadata: {
    id: "1157",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Three different lengths, and a multiplier that does not echo them.
    let size1 = 0, size2 = 0, size3 = 0, multiplier = 0;
    do {
      size1 = getRandomInt(8, 12); // longest screws
      size2 = getRandomInt(6, 9);  // middle length (n counts these)
      size3 = getRandomInt(3, 7);  // shortest screws
      multiplier = getRandomInt(4, 7);
    } while (
      size1 <= size2 || size2 <= size3 ||
      multiplier === size1 || multiplier === size2 || multiplier === size3
    );

    // STEP 2: Answer first, so n is always a positive whole number.
    const n = getRandomInt(8, 16);
    const constantCount = getRandomInt(15, 30);
    const nCoeff = multiplier + 1;
    const totalItems = nCoeff * n + constantCount;

    // STEP 3: Build equations
    const correctEquation = `${nCoeff}n + ${constantCount} = ${totalItems}`;
    const distractorA = `${size1}(${multiplier}n) + ${size2}n + ${size3}(${constantCount}) = ${totalItems}`;
    const distractorB = `${size1}n + ${size2}n + ${size3}n = ${totalItems}`;
    const distractorC = `${multiplier}n + ${constantCount} = ${totalItems}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `$${distractorA}$ multiplies each number of screws by its length in inches, which gives a total length rather than a total number of screws` },
      { text: distractorB, isCorrect: false, reason: `$${distractorB}$ uses the lengths $${size1}$, $${size2}$, and $${size3}$ as coefficients, as if each length had a multiple of $n$ screws determined by its size` },
      { text: distractorC, isCorrect: false, reason: `$${distractorC}$ leaves out the $n$ screws that are $${size2}$ inches long, counting only the $${multiplier}n$ screws that are $${size1}$ inches long and the $${constantCount}$ screws that are $${size3}$ inches long` },
      { text: correctEquation, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The number of screws that are $${size2}$ inches long is $n$. The number of screws that are $${size1}$ inches long is $${multiplier}$ times that number, or $${multiplier}n$, and the number of screws that are $${size3}$ inches long is $${constantCount}$. Since the factory makes $${totalItems}$ screws in total, these three amounts add up to $${totalItems}$, so $${multiplier}n + n + ${constantCount} = ${totalItems}$. Combining like terms gives $${correctEquation}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A factory makes concrete screws in three lengths: $${size1}$ inches, $${size2}$ inches, and $${size3}$ inches. During a certain day, the number of screws $${size1}$ inches long that the factory makes is $${multiplier}$ times the number $n$ of screws $${size2}$ inches long, and the number of screws $${size3}$ inches long is $${constantCount}$. During this day, the factory makes $${totalItems}$ concrete screws in total. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEquation,
      explanation: explanation
    };
  }
};
