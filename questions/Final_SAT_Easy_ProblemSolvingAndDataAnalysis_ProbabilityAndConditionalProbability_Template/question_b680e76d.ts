import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b680e76d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1000 total, values 200-300 range]
 * - Difficulty factors: [Two-way table completion, missing value calculation]
 * - Distractor patterns: [A: 109 (wrong calculation), C: 468 (adds instead of subtracts), D: 688 (double adds)]
 * - Constraints: [Must sum to total, realistic gender split]
 * - Question type: [Incomplete Two-way Table → HTML Table]
 * - Figure generation: [Generate complete consistent table, ask for missing value]
 */

export const generator_b680e76d = {
  metadata: {
    // id: "b680e76d",
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

    const tableCode = `<table><thead><tr><th></th><th>Males</th><th>Females</th></tr></thead><tbody><tr><td>Play a school sport</td><td>${malesPlay}</td><td>${femalesPlay}</td></tr><tr><td>Do not play a school sport</td><td>?</td><td>${femalesNoPlay}</td></tr></tbody></table>`;

    const correctValue = malesNoPlay;
    const correctText = correctValue.toString();

    const distractor1 = Math.abs(totalStudents - malesPlay - femalesPlay - femalesNoPlay - 50);
    const distractor2 = totalStudents - totalPlay;
    const distractor3 = malesPlay + femalesNoPlay;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "would result in an incorrect total count" },
      { text: correctText, isCorrect: true },
      { text: distractor2.toString(), isCorrect: false, reason: "represents the total number of students who do not play sports (both genders), not just males" },
      { text: distractor3.toString(), isCorrect: false, reason: "results from adding incompatible values" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The total number of students surveyed is $${totalStudents}$. From the table, we have the following known values: Males who play a school sport: $${malesPlay}$, Females who play a school sport: $${femalesPlay}$, Females who do not play a school sport: $${femalesNoPlay}$. Let $x$ be the number of males who do not play a school sport. The sum of all entries in the table must equal the total number of students surveyed: $${malesPlay} + ${femalesPlay} + x + ${femalesNoPlay} = ${totalStudents}$. Solving for $x$ gives $x = ${correctValue}$. Therefore, the number of males who do not play a school sport is $${correctValue}$. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A survey taken by $${totalStudents}$ students at a school asked whether they played school sports. The table below summarizes all $${totalStudents}$ responses from the students surveyed. How many of the males surveyed responded that they do not play a school sport?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 47624288
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table values 2-9, totals 14-80]
 * - Difficulty factors: [Reading three-way table, marginal probability]
 * - Distractor patterns: [A: 1/9 (cell value), B: 1/5 (wrong total), D: 2/3 (wrong calculation)]
 * - Constraints: [4 mascots × 3 grades, all totals must be consistent]
 * - Question type: [Three-way Table → HTML Table]
 * - Figure generation: [Generate mascot voting data]
 */