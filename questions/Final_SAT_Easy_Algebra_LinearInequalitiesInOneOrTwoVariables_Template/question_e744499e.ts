import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e744499e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min items: 20, max cost: $80, workbook: $3, flashcards: $4]
 * - Difficulty factors: [System of inequalities, two constraints]
 * - Distractor patterns: [A=correct with >=20 and <=80, B=wrong cost sign, C=swapped constraints, D=both reversed]
 * - Constraints: [Must have quantity >= and cost <=]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_e744499e = {
  metadata: {
    // id: "e744499e",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const minItems = getRandomInt(15, 30);
    const maxCost = getRandomInt(60, 120);
    const workbookCost = getRandomInt(2, 5);
    const flashcardCost = getRandomInt(3, 6);

    const optionsData = [
      { text: `$\\begin{aligned} x+y &\\ge ${minItems} \\\\ ${workbookCost}x+${flashcardCost}y &\\le ${maxCost} \\end{aligned}$`, isCorrect: true },
      { text: `$\\begin{aligned} x+y &\\ge ${minItems} \\\\ ${workbookCost}x+${flashcardCost}y &\\ge ${maxCost} \\end{aligned}$`, isCorrect: false, reason: "uses 'at least' for cost instead of 'at most'" },
      { text: `$\\begin{aligned} ${workbookCost}x+${flashcardCost}y &\\le ${minItems} \\\\ x+y &\\ge ${maxCost} \\end{aligned}$`, isCorrect: false, reason: "swaps the constraints" },
      { text: `$\\begin{aligned} x+y &\\le ${minItems} \\\\ ${workbookCost}x+${flashcardCost}y &\\ge ${maxCost} \\end{aligned}$`, isCorrect: false, reason: "reverses both inequality directions" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The teacher orders at least ${minItems} items ($x+y \\ge ${minItems}$) and spends at most $${maxCost} ($${workbookCost}x+${flashcardCost}y \\le ${maxCost}$). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `An elementary school teacher is ordering $x$ workbooks and $y$ sets of flash cards for a math class. The teacher must order at least ${minItems} items, but the total cost of the order must not be over ${maxCost}. If the workbooks cost ${workbookCost} each and the flash cards cost ${flashcardCost} per set, which of the following systems of inequalities models this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: f01ef454
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min volume: 12.7, max volume: 15.7, density: 165]
 * - Difficulty factors: [Range multiplication, weight calculation]
 * - Distractor patterns: [A=subtraction, B=addition, C=correct multiplication, D=division]
 * - Constraints: [Must multiply density by volume range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */