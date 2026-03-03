import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 6e4a60dd
 * FIXED:
 * - Increased distractors from 2 to 3 to prevent array index crash in explanation.
 * - Fixed `options` output to be string[] instead of object[].
 * - Updated bill range to realistic restaurant amounts.
 */

export const generator_6e4a60dd = {
  metadata: {
    id: "6e4a60dd",
    assessment: "SAT",
    domain: "Problem Solving and Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },
  generate: (): QuestionData => {
    // 1. Setup reasonable numbers (e.g. Bill $25-$65)
    const bill = getRandomInt(25, 65);
    const tipPercent = getRandomInt(15, 25);
    const tipAmount = (bill * tipPercent) / 100;

    // 2. Create Distractors
    // We need 3 incorrect percentages to form 4 total options.
    const potentialDistractors = [10, 12, 15, 18, 20, 22, 25, 28, 30];
    // Filter out the correct answer and pick 3 random distractors
    const incorrectPercents = shuffle(
      potentialDistractors.filter(p => p !== tipPercent)
    ).slice(0, 3);

    // 3. Build Options Objects
    const optionsData = [
      { 
        text: `$${tipAmount.toFixed(2)}`, 
        isCorrect: true,
        percent: tipPercent 
      },
      ...incorrectPercents.map(p => ({
        text: `$${((bill * p) / 100).toFixed(2)}`,
        isCorrect: false,
        percent: p
      }))
    ];

    // 4. Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // 5. Return Data
    return {
      questionText: `Rita's total bill at a restaurant was $${bill.toFixed(2)}, including tax. If she left a tip of ${tipPercent}% of the total bill, what was the amount of the tip?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the amount of the tip, calculate ${tipPercent}% of $${bill.toFixed(2)}: $${bill.toFixed(2)} \\times \\frac{${tipPercent}}{100} = $${tipAmount.toFixed(2)}. Choice ${incorrectOptions[0].letter} is incorrect because it represents a tip of ${incorrectOptions[0].percent}%. Choice ${incorrectOptions[1].letter} is incorrect because it represents a tip of ${incorrectOptions[1].percent}%. Choice ${incorrectOptions[2].letter} is incorrect because it represents a tip of ${incorrectOptions[2].percent}%.`
    };
  }
};