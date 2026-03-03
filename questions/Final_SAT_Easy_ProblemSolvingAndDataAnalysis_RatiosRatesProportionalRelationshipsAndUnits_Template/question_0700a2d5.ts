import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 0700a2d5
*
* ORIGINAL ANALYSIS:
* - Number ranges: [77 rods (double-digit), conversion: 5.5 yards/rod, answer: 423.5 or 847/2]
* - Difficulty factors: [Decimal conversion factor, multiplication with decimal]
* - Distractor patterns: [None - fill in blank, common errors: 14 (divided), 82.5 (added), 4235 (decimal error), 423.5 (correct)]
* - Constraints: [ rods × 5.5 must give clean decimal or fraction]
* - Question type: [Fill-in-the-blank with multiple acceptable formats]
* - Figure generation: [None]
*/

export const generator_0700a2d5 = {
  metadata: {
    // id: "0700a2d5",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rods = getRandomInt(60, 90);
    const yardsPerRod = 5.5;
    const yards = rods * yardsPerRod;
    const fractionNumerator = rods * 11;
    const fractionForm = `${fractionNumerator}/2`;

    const questionText = `How many yards are equivalent to ${rods} rods? (${yardsPerRod} yards = 1 rod)`;
    const explanation = `The correct answer is ${yards}. It's given that ${yardsPerRod} yards = 1 rod. Therefore, ${rods} rods is equivalent to (${rods} rods) (${yardsPerRod} yards/1 rod), or ${yards} yards. Note that ${yards} and ${fractionForm} are examples of ways to enter a correct answer.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: `${yards}, ${fractionForm}`,
      explanation: explanation
    };
  }
};

/**
* Question ID: fe1ec415
*
* ORIGINAL ANALYSIS:
* - Number ranges: [12 pounds/3 min = 4 lb/min, target: 96 pounds, answer: 24 minutes]
* - Difficulty factors: [Rate calculation, proportion setup, solving for time]
* - Distractor patterns: [A: 8 (96/12, missing time factor), B: 15 (random), C: 24 (correct), D: 36 (random)]
* - Constraints: [Rate must divide evenly into target for clean answer]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
