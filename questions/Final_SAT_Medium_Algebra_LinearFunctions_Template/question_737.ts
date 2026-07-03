import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 737
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope m: 4-12, point x: 2-4, intercept b: 1-5, y = m*x + b]
 * - Difficulty factors: [Finding equation from rate of change and a point]
 * - Distractor patterns: [uses coordinates directly as slope/intercept; swaps
 *   x with slope; wrong slope and intercept]
 * - Constraints: [all four option strings must be pairwise distinct — guarded]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_737 = {
  metadata: {
    id: "737",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values, guarding so the four option strings are
    // all distinct. The only possible collision is distB vs the correct
    // equation (when the point's x equals the slope and the slope equals the
    // intercept, e.g. m=4, x=4, b=4). A bounded retry keeps every draw valid.
    let m = 0, x = 0, b = 0, y = 0;
    let correctEq = '', distA = '', distB = '', distD = '';
    let tries = 0;
    do {
      m = getRandomInt(4, 12);   // slope (rate of change)
      x = getRandomInt(2, 4);    // x-coordinate of the given point
      b = getRandomInt(1, 5);    // y-intercept
      y = m * x + b;             // y-coordinate of the given point

      correctEq = `y = ${m}x + ${b}`;
      distA = `y = ${x}x + ${y}`;      // uses the coordinates as slope & intercept
      distB = `y = ${x}x + ${m}`;      // swaps x-coordinate in for the slope
      distD = `y = ${m + 5}x + ${b + 10}`; // wrong slope and wrong intercept
      tries++;
    } while (
      tries < 50 &&
      new Set([correctEq, distA, distB, distD]).size !== 4
    );

    // STEP 2: Build options with reasons that match how each is (mis)formed.
    const optionsData = [
      { text: distA, isCorrect: false, reason: `uses the point's coordinates directly as the slope and $y$-intercept` },
      { text: distB, isCorrect: false, reason: `uses the $x$-coordinate as the slope and the true slope as the $y$-intercept` },
      { text: correctEq, isCorrect: true },
      { text: distD, isCorrect: false, reason: `uses an incorrect slope and an incorrect $y$-intercept` }
    ];

    // STEP 3: Shuffle and assign letters (letters only known after shuffling).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 4: Return question data. Numbers in prose stay as plain text; only
    // the variables x and y sit in math mode, so there is no bare "$<digit>".
    return {
      questionText: `The relationship between two variables, $x$ and $y$, is linear. For every increase in the value of $x$ by 1, the value of $y$ increases by ${m}. When the value of $x$ is ${x}, the value of $y$ is ${y}. Which equation represents this relationship?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The rate of change gives the slope, $m = ${m}$. Substituting the point $(${x}, ${y})$ into $y = ${m}x + b$ gives $b = ${y} - ${m}\\cdot${x} = ${b}$. Thus $y = ${m}x + ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
