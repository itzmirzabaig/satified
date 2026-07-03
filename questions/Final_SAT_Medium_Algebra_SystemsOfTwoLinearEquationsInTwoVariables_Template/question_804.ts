import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 804
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [votes: 15,000 difference, ratio: 3:1]
 * - Difficulty factors: [Word problem, system from ratios]
 * - Distractor patterns: [7500, 15000, 22500, 45000]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * INTENT: A ballot proposal. "In favor" votes are `ratio` times the "against"
 * votes, and there are `diff` more in-favor votes than against. Solve the
 * system f = ratio*a, f = a + diff for a (votes against).
 *
 * Construction is answer-first: pick `against` as a clean integer, then
 * favor = ratio*against and diff = favor - against are automatically integers
 * (no modulo hack, no float artifacts). ratio in [3,5] guarantees the four
 * options {against, diff, favor, total} = {1, ratio-1, ratio, ratio+1} units
 * of `against` are pairwise distinct for every draw.
 */

export const generator_804 = {
  metadata: {
    id: "804",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first construction (all values exact integers).
    const ratio = getRandomInt(3, 5);          // "ratio times as many in favor as against"
    const against = getRandomInt(1500, 6000);  // votes against (the correct answer)
    const favor = ratio * against;             // votes in favor
    const diff = favor - against;              // (ratio - 1) * against, the reported difference
    const total = favor + against;             // (ratio + 1) * against, total votes cast

    // STEP 2: Build question text. Numbers are plain integers with thousands
    // separators (prose, not math), so no bare $ meets MathJax.
    const questionText = `A proposal for a new library was included on an election ballot. A radio show stated that ${ratio} times as many people voted in favor of the proposal as voted against it. A social media post reported that ${diff.toLocaleString()} more people voted in favor of the proposal than voted against it. Based on these data, how many people voted against the proposal?`;

    // STEP 3: Options — {against, diff, favor, total}, distinct by construction.
    const correctText = against.toLocaleString();
    const reasons: Record<string, string> = {
      [diff.toLocaleString()]: `is the reported difference between the in-favor and against counts, not the number who voted against.`,
      [favor.toLocaleString()]: `is the number of people who voted in favor of the proposal, not against it.`,
      [total.toLocaleString()]: `is the total number of people who voted, found by adding the in-favor and against counts.`,
    };

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: diff.toLocaleString(), isCorrect: false },
      { text: favor.toLocaleString(), isCorrect: false },
      { text: total.toLocaleString(), isCorrect: false }
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const wrongExplanations = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} is incorrect; ${o.text} ${reasons[o.text]}`)
      .join(' ');

    // STEP 5: Explanation, computed from the same live variables. Math uses
    // \( ... \) inline delimiters; raw integers inside math, separators in prose.
    const explanation = `Choice ${correctLetter} is correct. Let \\( f \\) be the number of people who voted in favor and \\( a \\) be the number who voted against. "\\( ${ratio} \\) times as many in favor as against" gives \\( f = ${ratio}a \\), and "\\( ${diff.toLocaleString()} \\) more in favor than against" gives \\( f = a + ${diff} \\). Substituting \\( ${ratio}a \\) for \\( f \\) yields \\( ${ratio}a = a + ${diff} \\). Subtracting \\( a \\) from both sides gives \\( ${ratio - 1}a = ${diff} \\), and dividing both sides by \\( ${ratio - 1} \\) gives \\( a = ${against} \\). So ${against.toLocaleString()} people voted against the proposal. (Check: \\( f = ${ratio}(${against}) = ${favor} \\), and \\( ${favor} - ${against} = ${diff} \\), as reported.) ${wrongExplanations}`;

    // STEP 6: Return question data.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
