import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 480
*
* ORIGINAL ANALYSIS:
* - Number ranges: [77 rods (double-digit), conversion: 5.5 yards/rod, answer: 423.5 or 847/2]
* - Difficulty factors: [Decimal conversion factor, multiplication with decimal]
* - Distractor patterns: [None - fill in blank, common errors: 14 (divided), 82.5 (added), 4235 (decimal error), 423.5 (correct)]
* - Constraints: [ rods × 5.5 must give clean decimal or fraction]
* - Question type: [Fill-in-the-blank with multiple acceptable formats]
* - Figure generation: [None]
*/

export const generator_480 = {
  metadata: {
    id: "480",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rods = getRandomInt(60, 90);
    const yardsPerRod = 5.5;
    const yards = rods * yardsPerRod; // integer or x.5, always <= 1 decimal place
    const fractionNumerator = rods * 11;
    const fractionForm = `${fractionNumerator}/2`; // equivalent fraction, e.g. 671/2

    const questionText = `How many yards are equivalent to ${rods} rods? (${yardsPerRod} yards = 1 rod) Enter your answer as a decimal or fraction.`;
    const explanation = `It's given that ${yardsPerRod} yards = 1 rod. Therefore, ${rods} rods is equivalent to (${rods} rods)(${yardsPerRod} yards per rod), or ${yards} yards. So the correct answer is ${yards}. This can also be entered as the equivalent fraction ${fractionForm}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: yards.toString(),
      explanation: explanation
    };
  }
};
