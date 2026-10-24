import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 463
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [n nonfiction, 12 fiction]
 * - Difficulty factors: [Algebraic probability with variable n]
 * - Distractor patterns: [A: n/12 (ratio), C: 12/n (flipped ratio), D: 12/(n+12) (fiction prob)]
 * - Constraints: [Variable n in answer choices]
 * - Question type: [No figure → Algebraic options]
 * - Figure generation: [None]
 */

export const generator_463 = {
  metadata: {
    id: "463",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const fictionCount = getRandomInt(8, 20);
    // Ask about either kind of book (it always asked about nonfiction).
    const askFiction = getRandomInt(0, 1) === 1;
    const kind = askFiction ? 'fiction' : 'nonfiction';
    const other = askFiction ? 'nonfiction' : 'fiction';
    const top = askFiction ? `${fictionCount}` : 'n';
    const bottom = askFiction ? 'n' : `${fictionCount}`;

    const correctText = `\\frac{${top}}{n+${fictionCount}}`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: `\\frac{${top}}{${bottom}}`, isCorrect: false, reason: `$\\frac{${top}}{${bottom}}$ is the ratio of the number of ${kind} books to the number of ${other} books; the denominator must be the total number of books, $n + ${fictionCount}$` },
      { text: `\\frac{${bottom}}{${top}}`, isCorrect: false, reason: `$\\frac{${bottom}}{${top}}$ is the ratio of the number of ${other} books to the number of ${kind} books` },
      { text: `\\frac{${bottom}}{n+${fictionCount}}`, isCorrect: false, reason: `$\\frac{${bottom}}{n + ${fictionCount}}$ is the probability of selecting a ${other} book` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. With $n$ nonfiction books and ${fictionCount} fiction books, the total number of books is $n + ${fictionCount}$. There are ${askFiction ? fictionCount : '$n$'} ${kind} books, so the probability of selecting a ${kind} book is $\\frac{${top}}{n + ${fictionCount}}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `There are $n$ nonfiction books and ${fictionCount} fiction books on a bookshelf. If one of these books is selected at random, what is the probability of selecting a ${kind} book, in terms of $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
