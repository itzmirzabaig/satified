import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 683
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: num/den, y-intercept: yInt]
 * - Difficulty factors: [Parallel lines have equal slopes]
 * - Distractor patterns: [A: reciprocal den/num, B: correct num/den, C: y-intercept, D: numerator only]
 * - Constraints: [Simple non-integer fraction slope, all four options distinct]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_683 = {
  metadata: {
    id: "683",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Line k: y = (num/den)x + yInt. Line j is parallel, so slope of j = num/den.
    // Options: num/den (correct), den/num (reciprocal), yInt (y-intercept),
    // num (numerator only).
    //
    // Guarantee all four options are numerically distinct for every draw:
    //   - num % den !== 0 && den % num !== 0  -> both num/den and den/num are
    //     NON-integers, so neither can equal the integer options (yInt, num),
    //     and (since num != den) they differ from each other.
    //   - num !== den                          -> num/den != den/num.
    //   - yInt !== num                          -> the two integer options differ.
    let num = getRandomInt(5, 25);
    let den = getRandomInt(2, 10);
    let yInt = getRandomInt(1, 9);
    let tries = 0;
    while (
      (num % den === 0 || den % num === 0 || num === den || yInt === num) &&
      tries++ < 50
    ) {
      num = getRandomInt(5, 25);
      den = getRandomInt(2, 10);
      yInt = getRandomInt(1, 9);
    }
    // Deterministic fallback (5/3 is a non-integer both ways; 3/5 too; 1 != 5).
    if (num % den === 0 || den % num === 0 || num === den || yInt === num) {
      num = 5; den = 3; yInt = 1;
    }

    const optionsData = [
      { text: `$\\frac{${den}}{${num}}$`, isCorrect: false, reason: `This is the reciprocal of the slope. It would be the slope of a line perpendicular to line $k$, not parallel to it.` },
      { text: `$\\frac{${num}}{${den}}$`, isCorrect: true, reason: '' },
      { text: `$${yInt}$`, isCorrect: false, reason: `This is the $y$-intercept of line $k$, not its slope.` },
      { text: `$${num}$`, isCorrect: false, reason: `This is just the numerator of the slope, not the full fraction.` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Line $k$ is defined by $y = \\frac{${num}}{${den}}x + ${yInt}$. Line $j$ is parallel to line $k$ in the $xy$-plane. What is the slope of line $j$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The equation of line $k$ is in slope-intercept form $y = mx + b$, where $m$ is the slope. Comparing $y = \\frac{${num}}{${den}}x + ${yInt}$ to that form shows the slope of line $k$ is $\\frac{${num}}{${den}}$. Parallel lines in the $xy$-plane have equal slopes, so the slope of line $j$ is also $\\frac{${num}}{${den}}$. ${incorrectOptions.map(opt => `Choice ${opt.letter} is incorrect; ${opt.reason}`).join(' ')}`
    };
  }
};
