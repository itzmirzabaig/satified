import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 466
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [white, orange, brown buttons; total = sum]
 * - Difficulty factors: [Basic probability from text description]
 * - Distractor patterns: [P(orange), P(brown), P(not white)]
 * - Constraints: [Three colors, calculate P(white)]
 * - Question type: [No figure -> Text options]
 * - Figure generation: [None]
 */

export const generator_466 = {
  metadata: {
    id: "466",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // The four displayed options are P(white), P(orange), P(brown) and
    // P(not white). They all share the denominator `total`, so two options are
    // numerically equal exactly when their numerators are equal. Redraw (bounded)
    // until the four numerators {white, orange, brown, orange+brown} are pairwise
    // distinct, which also guarantees the correct answer is unique.
    let whiteCount = 0, orangeCount = 0, brownCount = 0, totalCount = 0;
    let tries = 0;
    do {
      whiteCount = getRandomInt(5, 12);
      orangeCount = getRandomInt(1, 4);
      brownCount = getRandomInt(6, 15);
      totalCount = whiteCount + orangeCount + brownCount;
      tries++;
    } while (
      tries < 50 &&
      (whiteCount === orangeCount ||
        whiteCount === brownCount ||
        whiteCount === orangeCount + brownCount ||
        orangeCount === brownCount)
    );

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(whiteCount, totalCount);
    const simplifiedNum = whiteCount / divisor;
    const simplifiedDen = totalCount / divisor;
    const isReduced = divisor === 1;
    const correctText = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;

    const optionsData = [
      { text: `\\frac{${orangeCount}}{${totalCount}}`, isCorrect: false, reason: "the probability of selecting an orange button, not a white one" },
      { text: correctText, isCorrect: true },
      { text: `\\frac{${brownCount}}{${totalCount}}`, isCorrect: false, reason: "the probability of selecting a brown button, not a white one" },
      { text: `\\frac{${orangeCount + brownCount}}{${totalCount}}`, isCorrect: false, reason: "the probability of selecting a button that is not white" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Counts are kept in plain text (not math) so the explanation never mixes a
    // "$<digit>" span with a "$\frac" span (avoids the currency-collision heuristic).
    const fractionText = isReduced
      ? `\\frac{${whiteCount}}{${totalCount}}`
      : `\\frac{${whiteCount}}{${totalCount}} = \\frac{${simplifiedNum}}{${simplifiedDen}}`;

    const explanation = `Choice ${correctOption.letter} is correct. There are ${whiteCount} white buttons out of ${totalCount} total buttons, so the probability of selecting a white button is $${fractionText}$. Choice ${incorrectOptions[0].letter} is incorrect; it is ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it is ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it is ${incorrectOptions[2].reason}.`;

    return {
      questionText: `There are $${totalCount}$ buttons in a bag: $${whiteCount}$ white buttons, $${orangeCount}$ orange buttons, and $${brownCount}$ brown buttons. If one of these buttons is selected at random, what is the probability of selecting a white button?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
