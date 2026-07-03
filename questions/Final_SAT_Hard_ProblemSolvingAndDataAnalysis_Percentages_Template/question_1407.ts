import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1407
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [37%, 37%, 42%]
 * - Difficulty factors: [Sequential conditional probabilities, complement calculation]
 * - Distractor patterns: [Stopping early, wrong complement, multiplying all wrong]
 * - Constraints: [Final = 0.37 * 0.37 * 0.42 = 0.057498, complement = 94.25%]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - probability/percentage problem]
 */

export const generator_1407 = {
  metadata: {
    id: "1407",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate three percentages
    const pct1 = getRandomInt(25, 45); // First characteristic
    const pct2 = getRandomInt(25, 45); // Of the first, this % also has the second
    const pct3 = getRandomInt(30, 50); // Of first+second, this % also has the third

    // STEP 2: Compute the ARE-all-three percentage, then derive the complement
    // FROM the displayed (2-decimal) ARE value so the subtraction shown in the
    // explanation is exact (100 - arePct = complement to the cent).
    const intersection = (pct1 / 100) * (pct2 / 100) * (pct3 / 100); // as a fraction
    const arePct = Math.round(intersection * 10000) / 100;           // percentage, 2 dp
    const complement = Math.round((100 - arePct) * 100) / 100;       // percentage, 2 dp

    // STEP 3: Distractors (verified distinct from the answer and each other for
    // every draw across the declared ranges):
    const justThird = Math.round((100 - pct3) * 100) / 100;                       // only the last step's complement
    const earlyStop = Math.round((1 - (pct1 / 100) * (pct2 / 100)) * 10000) / 100; // stops after two steps
    const multiplyWrong = Math.round((pct1 * pct2 * pct3) / 10000) / 100;          // multiplies percents without converting

    const optionsData = [
      { text: multiplyWrong.toFixed(2) + "%", isCorrect: false, reason: "results from multiplying the percentages together without converting them to decimals" },
      { text: earlyStop.toFixed(2) + "%", isCorrect: false, reason: "stops after only the first two characteristics instead of all three" },
      { text: complement.toFixed(2) + "%", isCorrect: true, reason: "" },
      { text: justThird.toFixed(2) + "%", isCorrect: false, reason: "uses only the complement of the last percentage" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'C';
    const correctText = correctOption?.text ?? complement.toFixed(2) + "%";
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In a box, ${pct1}% of the items are green. Of the green items, ${pct2}% are also rectangular. Of the green rectangular items, ${pct3}% are also metal. Which of the following is closest to the percentage of the items in the box that are NOT green rectangular metal items?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. An item is green, rectangular, and metal only if it passes all three steps, so the fraction that are all three is $\\frac{${pct1}}{100} \\times \\frac{${pct2}}{100} \\times \\frac{${pct3}}{100} \\approx ${arePct.toFixed(2)}\\%$. The percentage that are NOT all three is the complement: $\\left(100 - ${arePct.toFixed(2)}\\right)\\% = ${complement.toFixed(2)}\\%$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
