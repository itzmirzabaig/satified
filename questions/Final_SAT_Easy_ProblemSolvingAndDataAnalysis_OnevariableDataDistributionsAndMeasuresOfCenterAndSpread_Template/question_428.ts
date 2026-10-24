import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 428
 * Fixed: logic error in explanation generation (accessing property on array instead of element)
 */

export const generator_428 = {
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

    // Each wrong choice names what extra information it would need; they all
    // used to say only "This requires individual student data points."
    const optionsData = [
      { text: "The average number of boxes sold per student", isCorrect: true, reason: '' },
      { text: "The median number of boxes sold per student", isCorrect: false, reason: `the median is the middle value when the numbers of boxes sold by the ${numStudents} students are listed in order, and those individual numbers are not given` },
      { text: "The greatest number of boxes sold by one student", isCorrect: false, reason: `the total of ${totalBoxes} boxes could be split among the students in many ways, so the number sold by the top seller is not known` },
      { text: "The least number of boxes sold by one student", isCorrect: false, reason: `the total of ${totalBoxes} boxes could be split among the students in many ways, so the number sold by the student who sold the fewest boxes is not known` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `For a school fundraiser, ${numStudents} students sold a total of ${totalBoxes} boxes of cookies. Which of the following can be calculated from this information?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The average number of boxes sold per student is the total number of boxes divided by the number of students, $\\frac{${totalBoxes}}{${numStudents}} = ${avgPerStudent}$. Both of these numbers are given. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};