import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: d5f349b7
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle Q: 15-35]
* - Difficulty factors: [Similar triangles, right triangles, corresponding angles, complementary angles]
* - Distractor patterns: [Wrong correspondence, calculation error, supplementary error]
* - Constraints: [Must be right triangles, angle P + angle Q = 90]
* - Question type: [Figure→Multiple Choice Text]
*/

export const generator_d5f349b7 = {
  metadata: {
    // id: "d5f349b7",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleQ = getRandomInt(15, 35);
    const angleP = 90 - angleQ;
    const mafsCode = `
      <Coordinates.Cartesian xAxis={{ labels: false, axis: false }} yAxis={{ labels: false, axis: false }} />
      <Polygon points={[,,]} />
      <Polygon points={[,, [11, 4.5]]} />
      <LaTeX at={[3.5, 0.5]} tex="18^{\\circ}" />
      <LaTeX at={[0.5, 0.5]} tex="Q" />
      <LaTeX at={[5.5, 0.5]} tex="S" />
    `;
    const correctAnswer = angleP.toString();
    const distractorA = angleQ;
    const distractorC = angleP + 10;
    const distractorD = 180 - angleP;

    const optionsData = [
      { text: `${distractorA}^{\\circ}`, isCorrect: false, reason: "confuses angle Q with angle S, incorrect correspondence" },
      { text: `${correctAnswer}^{\\circ}`, isCorrect: true },
      { text: `${distractorC}^{\\circ}`, isCorrect: false, reason: "calculation error" },
      { text: `${distractorD}^{\\circ}`, isCorrect: false, reason: "finds supplementary angle instead" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Right triangles $PQR$ and $STU$ are similar, where $P$ corresponds to $S$. If the measure of angle $Q$ is $${angleQ}^{\\circ}$, what is the measure of angle $S$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${correctAnswer}^{\\circ}`,
      explanation: `Choice ${correctOption.letter} is correct. In right triangle $PQR$, $\\angle P + \\angle Q = 90^{\\circ}$, so $\\angle P = 90^{\\circ} - ${angleQ}^{\\circ} = ${correctAnswer}^{\\circ}$. Since triangles $PQR$ and $STU$ are similar with $P$ corresponding to $S$, we have $\\angle S = \\angle P = ${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: a6dbad6b
*
* ORIGINAL ANALYSIS:
* - Number ranges: [y: 15-40, z: 40-70]
* - Difficulty factors: [Parallel lines, triangle angle sum, alternate interior angles]
* - Distractor patterns: [Incorrect supplementary calculation, right angle guess, supplement of x error]
* - Constraints: [y + z + x = 180]
* - Question type: [Figure→Multiple Choice Text]
*/