import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
 * Question ID: d03e29f1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center coordinates: 6, 3 (single-digit), radius squared: 81 (perfect square, 9²)]
 * - Difficulty factors: [Circle equation standard form, identifying radius from r², avoiding confusion with center coordinates]
 * - Distractor patterns: [A: 3 (confused with center y-coordinate), B: 6 (center x-coordinate), C: 9 (correct, √81), D: 81 (r² value, forgot square root)]
 * - Constraints: [r² must be perfect square for clean answer, center coordinates must be distinct from radius to test attention]
 * - Question type: [Conceptual (no figure)→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_d03e29f1 = {
  metadata: {
    // id: "d03e29f1",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate circle parameters
    let h = getRandomInt(1, 9);
    let k = getRandomInt(1, 9);

    while (h === k) {
      k = getRandomInt(1, 9);
    }

    const base = getRandomInt(3, 12);
    const rSquared = base * base;
    const radius = base;

    // STEP 2: Determine correct answer and distractors
    const correctAnswer = radius.toString();
    const distractorValues = [
      Math.min(h, k).toString(),
      Math.max(h, k).toString(),
      rSquared.toString()
    ];

    // STEP 3: Create options with tracking
    const optionsData = [
      { text: distractorValues, isCorrect: false, reason: "confuses center coordinate with radius" },
      { text: distractorValues, isCorrect: false, reason: "confuses center coordinate with radius" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorValues, isCorrect: false, reason: "forgets to take square root of $r^2$" }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 5: Build explanation with dynamic letters
    const explanation = `Choice ${correctLetter} is correct. The standard equation of a circle with center $(h, k)$ and radius $r$ is $(x-h)^2+(y-k)^2=r^2$. Comparing $(x-${h})^2+(y-${k})^2=${rSquared}$ to standard form: $${rSquared}$ corresponds to $r^2$, so $r=\\sqrt{${rSquared}}=${radius}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 6: Return question data
    return {
      questionText: `$(x-${h})^2+(y-${k})^2=${rSquared}$ The graph of the given equation in the $xy$-plane is a circle. What is the length of the radius of this circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};