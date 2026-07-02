import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 401
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [55 students (total population), 20% (percentage, multiples of 10)]
 * - Difficulty factors: [Percentage calculation, applying sample proportion to population]
 * - Distractor patterns: A is Correct (11 = 55 × 0.20), B confuses percentage value (20) with calculated result, C calculates non-supporters (80% of 55 = 44), D uses total population (55)
 * - Constraints: [Percentage must yield integer result for clean answer, total should be divisible by 5]
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
    const totalStudents = getRandomInt(8, 16) * 5;
    const samplePercentage = getRandomInt(2, 4) * 10;
    const clubTypes = ["Spanish club", "French club", "German club", "Latin club", "Math club", "Science club"];
    const club = getRandomElement(clubTypes);
    const programTypes = ["study program", "exchange program", "summer program", "tutoring program"];
    const program = getRandomElement(programTypes);

    const correctAnswer = Math.round(totalStudents * (samplePercentage / 100));
    const distractorB = samplePercentage;
    const distractorC = Math.round(totalStudents * ((100 - samplePercentage) / 100));
    const distractorD = totalStudents;

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

    const explanation = `Choice ${correctLetter} is correct. To find the best estimate of the total number of ${club} students who intend to enroll in the ${program}, multiply the total number of students by the percentage from the sample: ${totalStudents} × ${samplePercentage}% = ${totalStudents} × 0.${samplePercentage} = ${correctAnswer}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `There are $${totalStudents}$ students in ${club}. A sample of the ${club} students was selected at random and asked whether they intend to enroll in a new ${program}. Of those surveyed, $${samplePercentage}% responded that they intend to enroll in the ${program}. Based on this survey, which of the following is the best estimate of the total number of ${club} students who intend to enroll in the ${program}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
