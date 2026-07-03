import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 890
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: √15, denominator: 4 (simple radical form)]
 * - Difficulty factors: [Complementary angles, cofunction identity sin(θ) = cos(90°-θ)]
 * - Distractor patterns: [Rationalized-form variant, reciprocal, value > 1 (impossible)]
 * - Constraints: [Must use valid trigonometric identity, answer must be ≤ 1]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

export const generator_890 = {
  metadata: {
    id: "890",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Pick a denominator and a non-perfect-square radicand so that
    // sin(R) = sqrt(radicand)/denominator is a valid ratio strictly between 0
    // and 1. Requiring radicand < denominator^2 keeps the value < 1, and
    // requiring radicand !== denominator guarantees the distractors below can
    // never coincide with the correct answer as strings.
    const radicandOptions = [2, 3, 5, 6, 7, 10, 11, 13, 15];
    const denominator = getRandomInt(2, 5); // 2..5
    const validRadicands = radicandOptions.filter(
      r => r < denominator * denominator && r !== denominator
    );
    const radicand = getRandomElement(validRadicands);

    // STEP 2: By the cofunction identity, cos(S) = sin(R) since R and S are
    // complementary. The correct value is exactly the given sin(R).
    const correctText = `\\frac{\\sqrt{${radicand}}}{${denominator}}`;

    // STEP 3: Build three distractors, each a distinct plausible error.
    //  - reciprocal:  d / sqrt(r)  (value > 1, "flips" the ratio)
    //  - wrong denom: sqrt(r) / r  (= 1/sqrt(r); a mis-rationalization)
    //  - bare radical: sqrt(r)     (value > 1, impossible for sine/cosine)
    // With r < d^2 and r != d, all four strings/values are pairwise distinct.
    const optionsData = [
      { text: `\\frac{${denominator}}{\\sqrt{${radicand}}}`, isCorrect: false, reason: "inverts the ratio, giving a value greater than 1" },
      { text: correctText, isCorrect: true, reason: "" },
      { text: `\\frac{\\sqrt{${radicand}}}{${radicand}}`, isCorrect: false, reason: "puts the radicand in the denominator instead of the given denominator" },
      { text: `\\sqrt{${radicand}}`, isCorrect: false, reason: "is greater than 1, which is impossible for the cosine of an acute angle" }
    ];

    // STEP 4: Shuffle and assign letters (letters are meaningful only now).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 5: Build explanation from the shuffled letters and live values.
    const explanation = `Choice ${correctLetter} is correct. In a right triangle the two acute angles $R$ and $S$ are complementary, so their measures add to 90 degrees. By the cofunction identity, $\\sin(R) = \\cos(90^{\\circ} - R) = \\cos(S)$. Since $\\sin(R) = \\frac{\\sqrt{${radicand}}}{${denominator}}$, it follows that $\\cos(S) = \\frac{\\sqrt{${radicand}}}{${denominator}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 6: Return question data.
    return {
      questionText: `In right triangle $RST$, angle $T$ is the right angle, so the acute angles $R$ and $S$ have measures that add to 90 degrees. If $\\sin(R) = \\frac{\\sqrt{${radicand}}}{${denominator}}$, what is the value of $\\cos(S)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation
    };
  }
};
