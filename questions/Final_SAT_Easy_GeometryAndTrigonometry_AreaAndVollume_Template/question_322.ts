import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 322
*
* ORIGINAL ANALYSIS:
* - Number ranges: [areaP: 61-100, removed: 15-30]
* - Difficulty factors: [Subtraction of areas]
* - Distractor patterns: [adds areas, forgets to subtract, reports removed area]
* - Constraints: [Result = areaP - removed]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_322 = {
  metadata: {
    id: "322",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // areaP starts at 61 so that areaP is always > 2*removedArea (max 60),
    // which keeps the "reports the removed area" distractor (= removedArea)
    // from ever equaling the correct answer (= areaP - removedArea).
    const areaP = getRandomInt(61, 100);
    const removedArea = getRandomInt(15, 30);
    const result = areaP - removedArea;

    // All four values are provably distinct across the ranges:
    //  - result           = areaP - removedArea            (correct)
    //  - areaP + removedArea: adds instead of subtracting  (differs from result by 2*removedArea >= 30)
    //  - areaP:             forgets to subtract             (differs from result by removedArea >= 15)
    //  - removedArea:       reports the removed piece       (< 31 <= result, since result >= 61-30 = 31)
    const optionsData = [
      { text: (areaP + removedArea).toString(), isCorrect: false, reason: "adds the two areas instead of subtracting" },
      { text: areaP.toString(), isCorrect: false, reason: "forgets to subtract the removed piece and keeps the original area" },
      { text: removedArea.toString(), isCorrect: false, reason: "gives the area that was removed instead of the area that remains" },
      { text: result.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Rectangle P has an area of $${areaP}$ square inches. A region with an area of $${removedArea}$ square inches is removed from rectangle P. What is the area, in square inches, of the resulting figure?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The area that remains is the original area minus the area that was removed: $${areaP} - ${removedArea} = ${result}$ square inches. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
