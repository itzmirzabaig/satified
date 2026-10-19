import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 305
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min items: 20, max cost: $80, workbook: $3, flashcards: $4]
 * - Difficulty factors: [System of inequalities, two constraints]
 * - Distractor patterns: [A=correct with >=20 and <=80, B=wrong cost sign, C=swapped constraints, D=both reversed]
 * - Constraints: [Must have quantity >= and cost <=]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_305 = {
  metadata: {
    id: "305",
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
      { text: `$\\begin{aligned} x+y &\\ge ${minItems} \\\\ ${workbookCost}x+${flashcardCost}y &\\ge ${maxCost} \\end{aligned}$`, isCorrect: false, reason: `its second inequality says the order costs at least \\$${maxCost}, but the cost must not be over \\$${maxCost}` },
      { text: `$\\begin{aligned} ${workbookCost}x+${flashcardCost}y &\\le ${minItems} \\\\ x+y &\\ge ${maxCost} \\end{aligned}$`, isCorrect: false, reason: `it compares the cost, in dollars, with the number of items, ${minItems}, and the number of items with the cost limit, ${maxCost}` },
      { text: `$\\begin{aligned} x+y &\\le ${minItems} \\\\ ${workbookCost}x+${flashcardCost}y &\\ge ${maxCost} \\end{aligned}$`, isCorrect: false, reason: `it says the teacher orders at most ${minItems} items and spends at least \\$${maxCost}, which reverses both conditions` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The teacher orders $x + y$ items, and this must be at least ${minItems}, so $x + y \\ge ${minItems}$. The order costs $${workbookCost}x + ${flashcardCost}y$ dollars, and this must not be over \\$${maxCost}, so $${workbookCost}x + ${flashcardCost}y \\le ${maxCost}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `An elementary school teacher is ordering $x$ workbooks and $y$ sets of flash cards for a math class. The teacher must order at least ${minItems} items, but the total cost of the order must not be over \\$${maxCost}. If the workbooks cost \\$${workbookCost} each and the flash cards cost \\$${flashcardCost} per set, which of the following systems of inequalities models this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
