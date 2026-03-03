import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2a08d878
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [n nonfiction, 12 fiction]
 * - Difficulty factors: [Algebraic probability with variable n]
 * - Distractor patterns: [A: n/12 (ratio), C: 12/n (flipped ratio), D: 12/(n+12) (fiction prob)]
 * - Constraints: [Variable n in answer choices]
 * - Question type: [No figure → Algebraic options]
 * - Figure generation: [None]
 */

export const generator_2a08d878 = {
  metadata: {
    // id: "2a08d878",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const fictionCount = getRandomInt(8, 20);

    const correctText = `\\frac{n}{n+${fictionCount}}`;

    const optionsData = [
      { text: `\\frac{n}{${fictionCount}}`, isCorrect: false, reason: "represents the ratio of nonfiction to fiction books, not the probability" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{${fictionCount}}{n}`, isCorrect: false, reason: "represents the ratio of fiction to nonfiction books" },
      { text: `\\frac{${fictionCount}}{n+${fictionCount}}`, isCorrect: false, reason: "represents the probability of selecting a fiction book" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. With $n$ nonfiction books and $${fictionCount}$ fiction books, the total is $n + ${fictionCount}$. The probability of selecting nonfiction is $\\frac{n}{n + ${fictionCount}}$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`;

    return {
      questionText: `There are $n$ nonfiction books and $${fictionCount}$ fiction books on a bookshelf. If one of these books is selected at random, what is the probability of selecting a nonfiction book, in terms of $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: a478f9f5
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [119, 3, 35, total 157]
 * - Difficulty factors: [Frequency table, probability of rare category]
 * - Distractor patterns: [B: P(color Z), C: P(color X), D: P(not color Y)]
 * - Constraints: [One category much larger than others]
 * - Question type: [Frequency Table → HTML Table]
 * - Figure generation: [Generate gemstone color distribution]
 */