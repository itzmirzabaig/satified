import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 191d167b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 200 (triple-digit), percentage: 147% (over 100%)]
 * - Difficulty factors: [Percentage over 100%, multiplication with decimals]
 * - Distractor patterns: [247 = added 47, 347 = miscalculation, 394 = calculation error]
 * - Constraints: [Result must be clean integer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_191d167b = {
  metadata: {
    // id: "191d167b",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const baseStudents = getRandomInt(100, 300);
    const percentage = getRandomInt(110, 160);
    const result = Math.round((baseStudents * percentage) / 100);

    const distractorA = baseStudents + (percentage - 100);
    const distractorC = result + getRandomInt(40, 60);
    const distractorD = result + 100;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "likely comes from simply adding ${percentage - 100} to ${baseStudents}, misinterpreting the percentage as an addition" },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: "is incorrect and might result from a miscalculation or misinterpretation of the numbers" },
      { text: `${distractorD}`, isCorrect: false, reason: "is incorrect and might result from a calculation error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Last year, ${baseStudents} students enrolled in an interior design program. This year, the number of students enrolled is ${percentage}% of last year's number. How many students are enrolled in the interior design program this year?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. To find the number of students enrolled this year, calculate ${percentage}% of ${baseStudents}: $\\frac{${percentage}}{100} \\times ${baseStudents} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 93724cc6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [part: 21 (double-digit), percentage: 21% (same number as part)]
 * - Difficulty factors: [Finding the whole from part and percentage, algebra setup]
 * - Distractor patterns: [0 = zero, 1 = decimal error, 42 = doubled]
 * - Constraints: [Part equals percentage number for elegant solution]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */