import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c88e0663
 * Fixed: logic error in explanation generation (accessing property on array instead of element)
 */

export const generator_c88e0663 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numStudents = getRandomInt(8, 15);
    const avgPerStudent = getRandomInt(7, 12);
    const totalBoxes = numStudents * avgPerStudent;

    const optionsData = [
      {
        text: "The average number of boxes sold per student",
        isCorrect: true,
        reason: `This can be calculated by dividing the total boxes (${totalBoxes}) by the number of students (${numStudents}).`
      },
      {
        text: "The median number of boxes sold per student",
        isCorrect: false,
        reason: "This requires individual student data points."
      },
      {
        text: "The greatest number of boxes sold by one student",
        isCorrect: false,
        reason: "This requires individual student data points."
      },
      {
        text: "The least number of boxes sold by one student",
        isCorrect: false,
        reason: "This requires individual student data points."
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `For a school fund-raiser, ${numStudents} students sold a total of ${totalBoxes} boxes of cookies. Which of the following can be calculated from this information?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      // Fixed: Access [0], [1], [2] indices and removed "it" to match grammar with "this requires..."
      explanation: `Choice ${correctOption.letter} is correct. ${correctOption.reason} Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason.toLowerCase()} Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason.toLowerCase()} Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason.toLowerCase()}`
    };
  }
};