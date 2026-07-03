import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 361
*
* ORIGINAL ANALYSIS:
* - Number ranges: [acute angle: 40-55]
* - Difficulty factors: [Right triangle, complementary acute angles]
* - Distractor patterns: [Subtraction error, choose given angle, subtract from 100 error]
* - Constraints: [Acute angles sum to 90]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*
* Intent: the two acute angles of a right triangle are complementary, so the
* other acute angle is 90 - givenAngle.
*/

export const generator_361 = {
  metadata: {
    id: "361",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(40, 55);
    const otherAngle = 90 - givenAngle; // correct: 35-50
    const correctAnswer = otherAngle.toString();

    // Candidate distractors with pedagogical reasons. Dedupe against the
    // correct answer and each other, and require positive angle measures, so
    // no collision (e.g. givenAngle == 45 or givenAngle == 50) can occur.
    const candidates: { val: number; reason: string }[] = [
      { val: givenAngle, reason: "chooses the given angle instead of its complement" },
      { val: 100 - givenAngle, reason: "subtracts from 100 instead of from 90" },
      { val: 180 - givenAngle, reason: "subtracts from 180 (as if a straight angle) instead of from 90" },
      { val: otherAngle + 10, reason: "results from a subtraction error" },
      { val: otherAngle - 5, reason: "results from a subtraction error" }
    ];

    const usedVals = new Set<number>([otherAngle]);
    const distractors: { text: string; isCorrect: boolean; reason: string }[] = [];
    for (const c of candidates) {
      if (distractors.length === 3) break;
      if (c.val > 0 && !usedVals.has(c.val)) {
        usedVals.add(c.val);
        distractors.push({ text: c.val.toString(), isCorrect: false, reason: c.reason });
      }
    }

    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: "" },
      ...distractors
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In a right triangle, the measure of one of the acute angles is $${givenAngle}^{\\circ}$. What is the measure, in degrees, of the other acute angle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. In a right triangle, the two acute angles are complementary (their measures sum to $90^{\\circ}$). Therefore, the other acute angle is $90^{\\circ} - ${givenAngle}^{\\circ} = ${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
