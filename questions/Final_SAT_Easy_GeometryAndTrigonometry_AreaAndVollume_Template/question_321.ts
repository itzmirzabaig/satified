import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 321
*
* ORIGINAL ANALYSIS:
* - Number ranges: [perimeter: 15-30, scale factor: 2-4]
* - Difficulty factors: [Similar triangles, scale factor from sides applied to perimeter]
* - Distractor patterns: [keeps perimeter unchanged, adds scale factor, squares scale factor (area ratio)]
* - Constraints: [DEF perimeter = ABC perimeter × scale factor]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_321 = {
  metadata: {
    id: "321",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const perimeterABC = getRandomInt(15, 30);
    const scaleFactor = getRandomInt(2, 4);
    const perimeterDEF = perimeterABC * scaleFactor;

    // Distractors are all-integer and provably distinct from the correct
    // answer and from one another across the full ranges (perimeter 15-30,
    // scaleFactor 2-4):
    //  - perimeterABC:            forgets to scale (equals correct only if s=1)
    //  - perimeterABC+scaleFactor: adds instead of multiplies (p+s = p*s needs p=s/(s-1) < 2)
    //  - perimeterABC*scaleFactor^2: area-ratio confusion (equals correct only if s=1)
    const optionsData = [
      { text: perimeterABC.toString(), isCorrect: false, reason: "keeps the perimeter unchanged instead of scaling it" },
      { text: perimeterDEF.toString(), isCorrect: true },
      { text: (perimeterABC + scaleFactor).toString(), isCorrect: false, reason: "adds the scale factor instead of multiplying by it" },
      { text: (perimeterABC * scaleFactor * scaleFactor).toString(), isCorrect: false, reason: "squares the scale factor, which is the ratio of areas, not perimeters" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Triangle $ABC$ and triangle $DEF$ are similar triangles, where $\\overline{AB}$ and $\\overline{DE}$ are corresponding sides. If $DE = ${scaleFactor}\\,AB$ and the perimeter of triangle $ABC$ is ${perimeterABC} units, what is the perimeter of triangle $DEF$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: perimeterDEF.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Because $DE = ${scaleFactor}\\,AB$, the scale factor from triangle $ABC$ to triangle $DEF$ is ${scaleFactor}. In similar figures the perimeter scales by the same factor as the sides, so the perimeter of triangle $DEF$ is $P_{DEF} = ${perimeterABC} \\times ${scaleFactor} = ${perimeterDEF}$ units. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
