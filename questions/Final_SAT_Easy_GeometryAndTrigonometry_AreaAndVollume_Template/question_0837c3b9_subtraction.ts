import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 0837c3b9
*
* ORIGINAL ANALYSIS:
* - Number ranges: [areaP: 60-100, removed: 15-30]
* - Difficulty factors: [Subtraction of areas]
* - Distractor patterns: [adds areas, calculation error]
* - Constraints: [Result = P - removed]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_0837c3b9_subtraction = {
  metadata: {
    // id: "0837c3b9",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const areaP = getRandomInt(60, 100);
    const removedArea = getRandomInt(15, 30);
    const result = areaP - removedArea;

    const optionsData = [
      { text: (areaP + removedArea).toString(), isCorrect: false, reason: "adds the areas instead of subtracting" },
      { text: (result + 32).toString(), isCorrect: false, reason: "calculation error" },
      { text: (areaP + 8).toString(), isCorrect: false, reason: "adds 8 to original area" },
      { text: result.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Rectangle P has an area of $${areaP}$ square inches. If a rectangle with an area of $${removedArea}$ square inches is removed from rectangle P, what is the area, in square inches, of the resulting figure?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The area of the resulting figure is $${areaP} - ${removedArea} = ${result}$ square inches. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 0837c3b9
*
* ORIGINAL ANALYSIS:
* - Number ranges: [perimeter: 15-30, scale factor: 2-4]
* - Difficulty factors: [Similar triangles, scale factor from sides applied to perimeter]
* - Distractor patterns: [divides by scale factor, squares scale factor]
* - Constraints: [DEF perimeter = ABC perimeter × scale factor]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/