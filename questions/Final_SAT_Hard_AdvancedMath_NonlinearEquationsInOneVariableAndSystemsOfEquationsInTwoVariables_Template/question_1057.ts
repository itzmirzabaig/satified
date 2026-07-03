import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1057
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [four quadratics, checking discriminants]
 * - Difficulty factors: [Discriminant analysis for all options, identifying negative discriminant]
 * - Distractor patterns: [A: discriminant>0, B: discriminant=0, C: discriminant>0, D: discriminant<0]
 * - Constraints: [Only one option has negative discriminant]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1057 = {
  metadata: {
    id: "1057",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate four quadratics where exactly one has discriminant < 0.

    // Distractor 1: x^2 + b1 x + c1 with c1 < 0, so disc = b1^2 - 4c1 > 0 (two solutions)
    const a1 = 1;
    const b1 = getRandomInt(10, 20);
    const c1 = -1 * getRandomInt(40, 60);
    const disc1 = b1 * b1 - 4 * a1 * c1; // >= 100 + 160 > 0 for every draw

    // Distractor 2: perfect square, disc = 0 (exactly one solution)
    const a2 = 1;
    const b2 = getRandomInt(10, 20) * 2; // even, so c2 below is an integer
    const c2 = (b2 * b2) / 4;            // makes the discriminant exactly 0

    // Distractor 3: 5x^2 + b3 x + c3 with c3 < 0, so disc = b3^2 - 20c3 > 0 (two solutions)
    const a3 = 5;
    const b3 = -1 * getRandomInt(10, 20);
    const c3 = -1 * getRandomInt(40, 60);
    const disc3 = b3 * b3 - 4 * a3 * c3; // >= 100 + 800 > 0 for every draw

    // Correct: 5x^2 + b4 x + c4 with b4^2 <= 400 and 20c4 >= 800, so disc <= -400 < 0
    const a4 = 5;
    const b4 = -1 * getRandomInt(10, 20);
    const c4 = getRandomInt(40, 60);
    const discD = b4 * b4 - 4 * a4 * c4; // negative for every draw

    // STEP 2: Create options (all texts are distinct for every draw: the two
    // x^2 options differ in the sign of the constant term, as do the two 5x^2 options).
    const optionsData = [
      { text: `$x^2+${b1}x${c1}=0$`, isCorrect: false, reason: `has a discriminant of $b^2-4ac=${disc1}>0$, so it has two real solutions` },
      { text: `$x^2+${b2}x+${c2}=0$`, isCorrect: false, reason: `has a discriminant of $b^2-4ac=${b2 * b2 - 4 * a2 * c2}$, so it has exactly one real solution` },
      { text: `$${a3}x^2${b3}x${c3}=0$`, isCorrect: false, reason: `has a discriminant of $b^2-4ac=${disc3}>0$, so it has two real solutions` },
      { text: `$${a4}x^2${b4}x+${c4}=0$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. A quadratic equation has no real solutions exactly when its discriminant $b^2-4ac$ is negative. For $ ${a4}x^2${b4}x+${c4}=0$, the discriminant is $(${b4})^2-4(${a4})(${c4})=${b4 * b4}-${4 * a4 * c4}=${discD}<0$, so the equation has no real solutions.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Which of the following quadratic equations has no real solutions?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
