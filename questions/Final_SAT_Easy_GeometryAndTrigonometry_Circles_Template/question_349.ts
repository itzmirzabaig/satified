import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 349
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center coordinates: 6, 3 (single-digit), radius squared: 81 (perfect square, 9²)]
 * - Difficulty factors: [Circle equation standard form, identifying radius from r², avoiding confusion with center coordinates]
 * - Distractor patterns: [A: center y-coordinate, B: center x-coordinate, C: correct (√r²), D: r² value (forgot square root)]
 * - Constraints: [r² must be perfect square for clean answer, center coordinates must be distinct from radius to test attention]
 * - Question type: [Conceptual (no figure)→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_349 = {
  metadata: {
    id: "349",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate circle parameters.
    // Pick the radius first (answer-first construction), then choose the center
    // coordinates so that every option value (h, k, r, r^2) is distinct.
    const radius = getRandomInt(3, 12);
    const rSquared = radius * radius;

    let h = 0;
    let k = 0;
    let tries = 0;
    // Center coords are single-digit; guard so no distractor equals the radius,
    // the other coordinate, or r^2 (r^2 is only <=9 when radius===3).
    do {
      h = getRandomInt(1, 9);
      k = getRandomInt(1, 9);
      tries++;
    } while (
      tries < 50 &&
      (h === k || h === radius || k === radius || h === rSquared || k === rSquared)
    );

    // STEP 2: Determine correct answer and distractors.
    const correctAnswer = radius.toString();
    const lowCoord = Math.min(h, k);
    const highCoord = Math.max(h, k);

    // STEP 3: Create options with tracking. Each distractor is a distinct value
    // by construction (guarded above), so no option can collide.
    const optionsData = [
      { text: lowCoord.toString(), isCorrect: false, reason: "confuses a center coordinate with the radius" },
      { text: highCoord.toString(), isCorrect: false, reason: "confuses a center coordinate with the radius" },
      { text: correctAnswer, isCorrect: true },
      { text: rSquared.toString(), isCorrect: false, reason: "reports $r^2$ instead of taking its square root" }
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 5: Build explanation with dynamic letters computed from live values.
    const explanation = `Choice ${correctLetter} is correct. The standard equation of a circle with center $(h, k)$ and radius $r$ is $(x-h)^2+(y-k)^2=r^2$. Comparing $(x-${h})^2+(y-${k})^2=${rSquared}$ to standard form, the value ${rSquared} corresponds to $r^2$, so $r=\\sqrt{${rSquared}}=${radius}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 6: Return question data.
    return {
      questionText: `$(x-${h})^2+(y-${k})^2=${rSquared}$ The graph of the given equation in the $xy$-plane is a circle. What is the length of the radius of this circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
