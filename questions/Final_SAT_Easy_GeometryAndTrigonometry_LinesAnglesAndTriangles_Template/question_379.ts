import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 379
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle Q: 15-35]
* - Difficulty factors: [Similar triangles, right triangles, corresponding angles, complementary angles]
* - Distractor patterns: [Wrong correspondence, forgets the right angle, supplementary error]
* - Constraints: [Must be right triangles, angle P + angle Q = 90]
* - Question type: [No figure, Multiple Choice Text]
*/

export const generator_379 = {
  metadata: {
    id: "379",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const angleQ = getRandomInt(15, 35);
    const angleP = 90 - angleQ;
    const correctAnswer = angleP.toString();

    // Each wrong choice is a real slip; the old third choice was the answer
    // plus 10. The values P (55 to 75), Q (15 to 35), 180 - P (105 to 125),
    // and 180 - Q (145 to 165) never collide.
    const optionsData = [
      { text: `${angleQ}^{\\circ}`, isCorrect: false, reason: `$${angleQ}^{\\circ}$ is the measure of angle $Q$, which corresponds to angle $T$, not angle $S$` },
      { text: `${correctAnswer}^{\\circ}`, isCorrect: true, reason: '' },
      { text: `${180 - angleQ}^{\\circ}`, isCorrect: false, reason: `it results from subtracting the measure of angle $Q$ from $180^{\\circ}$ without also subtracting the $90^{\\circ}$ right angle` },
      { text: `${180 - angleP}^{\\circ}`, isCorrect: false, reason: `it is the measure of an angle supplementary to angle $P$; corresponding angles of similar triangles are congruent, not supplementary` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Right triangles $PQR$ and $STU$ are similar, where angles $P$, $Q$, and $R$ correspond to angles $S$, $T$, and $U$, respectively, and angle $R$ is a right angle. If the measure of angle $Q$ is $${angleQ}^{\\circ}$, what is the measure of angle $S$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${correctAnswer}^{\\circ}`,
      explanation: `Choice ${correctOption.letter} is correct. In right triangle $PQR$, angle $R$ is the right angle, so the measures of angles $P$ and $Q$ add to $90^{\\circ}$. The measure of angle $P$ is therefore $90^{\\circ} - ${angleQ}^{\\circ} = ${correctAnswer}^{\\circ}$. Corresponding angles of similar triangles are congruent, and angle $S$ corresponds to angle $P$, so the measure of angle $S$ is also $${correctAnswer}^{\\circ}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
