import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 9912e19f
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle E: 30-80, angle F: 20-50]
* - Difficulty factors: [Congruent triangles, corresponding angles, vertex correspondence]
* - Distractor patterns: [Wrong correspondence, supplementary angle errors]
* - Constraints: [Angles must sum to less than 180]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*/

export const generator_9912e19f = {
  metadata: {
    // id: "9912e19f",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleE = getRandomInt(30, 80);
    const angleF = getRandomInt(20, 50);
    const angleG = 180 - angleE - angleF;
    const correctAngle = angleE;
    const distractorA = angleF;
    const distractorC = 180 - angleE;
    const distractorD = 180 - angleF;

    const optionsData = [
      { text: `${distractorA}^{\\circ}`, isCorrect: false, reason: "confuses angle F with angle E, incorrect correspondence" },
      { text: `${correctAngle}^{\\circ}`, isCorrect: true },
      { text: `${distractorC}^{\\circ}`, isCorrect: false, reason: "subtracts from 180° (supplementary angle error)" },
      { text: `${distractorD}^{\\circ}`, isCorrect: false, reason: "subtracts angle F from 180° (supplementary angle error)" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Triangles $EFG$ and $JKL$ are congruent, where $E, F$, and $G$ correspond to $J, K$, and $L$, respectively. The measure of angle $E$ is $${angleE}^{\\circ}$ and the measure of angle $F$ is $${angleF}^{\\circ}$. What is the measure of angle $J$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${correctAngle}^{\\circ}`,
      explanation: `Choice ${correctOption.letter} is correct. Since triangle $EFG$ is congruent to triangle $JKL$ with correspondence $E \\leftrightarrow J$, $F \\leftrightarrow K$, $G \\leftrightarrow L$, corresponding angles are equal. Therefore, $m\\angle J = m\\angle E = ${correctAngle}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 2289659
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle: 120-175]
* - Difficulty factors: [Parallel lines, corresponding angles, transversal properties]
* - Distractor patterns: [Division error, supplementary angle, random calculation error]
* - Constraints: [Obtuse angle, lines must be parallel]
* - Question type: [Figure→Multiple Choice Text]
*/