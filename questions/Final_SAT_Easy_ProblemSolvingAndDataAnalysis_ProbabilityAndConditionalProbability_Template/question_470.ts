import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 470
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1000 total, values 200-300 range]
 * - Difficulty factors: [Two-way table completion, missing value calculation]
 * - Distractor patterns: [A: 109 (wrong calculation), C: 468 (adds instead of subtracts), D: 688 (double adds)]
 * - Constraints: [Must sum to total, realistic gender split]
 * - Question type: [Incomplete Two-way Table → HTML Table]
 * - Figure generation: [Generate complete consistent table, ask for missing value]
 */

export const generator_470 = {
  metadata: {
    id: "470",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    const totalStudents = getRandomInt(800, 1200);
    const malesPlay = getRandomInt(250, 350);
    const femalesPlay = getRandomInt(180, 280);
    const femalesNoPlay = getRandomInt(180, 280);

    const malesNoPlay = totalStudents - malesPlay - femalesPlay - femalesNoPlay;

    if (malesNoPlay <= 50 || malesNoPlay >= 400) {
      return this.generate();
    }

    const totalPlay = malesPlay + femalesPlay;

    const correctValue = malesNoPlay;
    const correctText = correctValue.toString();

    // Wrong choices: everyone who does not play, the total minus only the
    // males who play, and everyone who plays. They used to include the
    // answer minus 50 and a sum "of incompatible values."
    const distractor1 = totalStudents - malesPlay;
    const distractor2 = totalStudents - totalPlay;
    const distractor3 = totalPlay;
    const fmt = (n: number) => n.toLocaleString('en-US');
    const mfmt = (n: number) => fmt(n).replace(/,/g, '{,}');

    const optionValues = [correctValue, distractor1, distractor2, distractor3];
    if (new Set(optionValues).size !== 4) {
      return this.generate();
    }

    const tableCode = `<table><thead><tr><th></th><th>Males</th><th>Females</th></tr></thead><tbody><tr><td>Play a school sport</td><td>${malesPlay}</td><td>${femalesPlay}</td></tr><tr><td>Do not play a school sport</td><td>?</td><td>${femalesNoPlay}</td></tr></tbody></table>`;

    const optionsData = [
      { text: fmt(distractor1), isCorrect: false, reason: `${fmt(distractor1)} is the result of subtracting only the ${malesPlay} males who play a school sport from the ${fmt(totalStudents)} students surveyed; the females must be subtracted too` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: fmt(distractor2), isCorrect: false, reason: `${fmt(distractor2)} is the number of students, both male and female, who do not play a school sport` },
      { text: fmt(distractor3), isCorrect: false, reason: `${fmt(distractor3)} is the number of students, both male and female, who play a school sport` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. All ${fmt(totalStudents)} students surveyed are in one of the four cells of the table. Let $x$ be the number of males who do not play a school sport. Then $${malesPlay} + ${femalesPlay} + x + ${femalesNoPlay} = ${mfmt(totalStudents)}$, so $x = ${correctValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A survey taken by ${fmt(totalStudents)} students at a school asked whether they played school sports. The table summarizes all ${fmt(totalStudents)} responses from the students surveyed. How many of the males surveyed responded that they do not play a school sport?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
