import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 401
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total = multiple of 10 in 40-80, sample percentage 20/30/40]
 * - Difficulty factors: [Percentage calculation, applying sample proportion to population]
 * - Distractor patterns: A is Correct (total * p%), B confuses the percentage value
 *   with the count, C calculates the non-enrollers (100-p)% of total, D uses the total
 * - Constraints: [total is a multiple of 10 so p% of total is always a clean integer]
 * - Question type: [Calculation→Multiple Choice Text]
 * - Figure generation: [None - calculation-based question]
 */

export const generator_401 = {
  metadata: {
    id: "401",
    assessment: "SAT",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // total is a multiple of 10 and p in {20,30,40}, so total*p/100 and
    // total*(100-p)/100 are always exact integers (no float artifacts).
    let totalStudents = 0;
    let samplePercentage = 0;
    let correctAnswer = 0;
    let distractorB = 0;
    let distractorC = 0;
    let distractorD = 0;

    let tries = 0;
    do {
      totalStudents = getRandomInt(4, 8) * 10;      // 40, 50, 60, 70, 80
      samplePercentage = getRandomInt(2, 4) * 10;   // 20, 30, 40

      correctAnswer = (totalStudents * samplePercentage) / 100;            // enrollers
      distractorB = samplePercentage;                                      // percentage as a raw count
      distractorC = (totalStudents * (100 - samplePercentage)) / 100;      // non-enrollers
      distractorD = totalStudents;                                         // ignores the percentage
      tries++;
    } while (
      tries < 50 &&
      new Set([correctAnswer, distractorB, distractorC, distractorD]).size !== 4
    );

    const clubTypes = ["Spanish club", "French club", "German club", "Latin club", "Math club", "Science club"];
    const club = getRandomElement(clubTypes);
    const programTypes = ["study program", "exchange program", "summer program", "tutoring program"];
    const program = getRandomElement(programTypes);

    // Exact decimal form of the percentage for the explanation (0.2, 0.3, 0.4).
    const decimalForm = `${samplePercentage / 100}`;

    const optionsData = [
      { text: `${correctAnswer}`, isCorrect: true },
      { text: `${distractorB}`, isCorrect: false, reason: "confuses the percentage with the raw number of students" },
      { text: `${distractorC}`, isCorrect: false, reason: "calculates the number of students who do not intend to enroll" },
      { text: `${distractorD}`, isCorrect: false, reason: "uses the total number of students rather than applying the percentage" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. To estimate the total number of ${club} students who intend to enroll in the ${program}, multiply the total number of students by the sample percentage: $${totalStudents} \\times ${samplePercentage}\\% = ${totalStudents} \\times ${decimalForm} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `There are $${totalStudents}$ students in ${club}. A sample of the ${club} students was selected at random and asked whether they intend to enroll in a new ${program}. Of those surveyed, $${samplePercentage}\\%$ responded that they intend to enroll in the ${program}. Based on this survey, which of the following is the best estimate of the total number of ${club} students who intend to enroll in the ${program}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
