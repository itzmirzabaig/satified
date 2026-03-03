import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_0837c3b9_similar = {
  metadata: {
    // id: "0837c3b9",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const perimeterABC = getRandomInt(15, 30);
    const scaleFactor = getRandomInt(2, 4);
    const perimeterDEF = perimeterABC * scaleFactor;

    const optionsData = [
      { text: (perimeterABC / scaleFactor).toFixed(1), isCorrect: false, reason: "divides by scale factor instead of multiplying" },
      { text: perimeterDEF.toString(), isCorrect: true },
      { text: (perimeterABC * scaleFactor * scaleFactor).toString(), isCorrect: false, reason: "squares the scale factor (confusing with area ratio)" },
      { text: (perimeterABC * scaleFactor * 3).toString(), isCorrect: false, reason: "random calculation error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Triangle $ABC$ and triangle $DEF$ are similar triangles, where $\\overline{AB}$ and $\\overline{DE}$ are corresponding sides. If $DE = ${scaleFactor}AB$ and the perimeter of triangle $ABC$ is $${perimeterABC}$, what is the perimeter of triangle $DEF$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: perimeterDEF.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Since $DE = ${scaleFactor}AB$, the scale factor is ${scaleFactor}. The perimeter of triangle $DEF$ is $${perimeterABC} \\times ${scaleFactor} = ${perimeterDEF}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 575f1e12
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 25-40, width 20-35]
* - Difficulty factors: [Rectangle area, larger double-digit multiplication]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/