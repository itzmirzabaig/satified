import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 06a152cd
*
* ORIGINAL ANALYSIS:
* - Number ranges: [2.5 oz/muffin, 48 muffins, conversion: 16 oz/pound, answer: 7.5 pounds]
* - Difficulty factors: [Multi-step conversion, division by 16, decimal handling]
* - Distractor patterns: [A: 7.5 (correct), B: 10 (estimation), C: 50.5 (added), D: 120 (ounces, not converted)]
* - Constraints: [Total ounces must be divisible by 16 for clean decimal pounds]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_06a152cd = {
  metadata: {
    // id: "06a152cd",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ozPerMuffinOptions = [2.0, 2.5, 3.0, 3.5];
    const ozPerMuffin = ozPerMuffinOptions[getRandomInt(0, ozPerMuffinOptions.length - 1)];
    const poundsNeeded = getRandomInt(5, 10) + 0.5;
    const totalOz = poundsNeeded * 16;
    const numMuffins = Math.round(totalOz / ozPerMuffin);
    const actualTotalOz = ozPerMuffin * numMuffins;
    const correctPounds = actualTotalOz / 16;

    const distractor1 = Math.round(correctPounds) + 2;
    const distractor2 = ozPerMuffin + numMuffins;
    const distractor3 = actualTotalOz;

    const optionsData = [
      { text: correctPounds.toString(), isCorrect: true, reason: null },
      { text: distractor1.toString(), isCorrect: false, reason: "This might result from an estimation error or incorrect division." },
      { text: distractor2.toString(), isCorrect: false, reason: "This is likely the result of simply adding the numbers in the problem." },
      { text: distractor3.toString(), isCorrect: false, reason: "This is the total amount in *ounces*, not pounds." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To find the total amount of chocolate needed in pounds, we need to follow these steps:\\n\\n1. **Calculate the total ounces needed:** $${ozPerMuffin}$ ounces/muffin \\( \\times \\) $${numMuffins}$ muffins = $${actualTotalOz}$ ounces\\n\\n2. **Convert ounces to pounds:** $${actualTotalOz}$ ounces \\( \\div \\) $16$ ounces/pound = $${correctPounds}$ pounds\\n\\nTherefore, $${correctPounds}$ pounds of chocolate are needed. **Analysis of other options:** Choice ${incorrectOptions[0].letter} is incorrect and ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} is incorrect and ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} is incorrect and ${incorrectOptions[2].reason}`;

    return {
      questionText: `To make a bakery's signature chocolate muffins, a baker needs $${ozPerMuffin}$ ounces of chocolate for each muffin. How many pounds of chocolate are needed to make $${numMuffins}$ signature chocolate muffins? ($1$ pound = $16$ ounces)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctPounds.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 85b33aa8
*
* ORIGINAL ANALYSIS:
* - Number ranges: [5104 yards (4-digit), conversion: 1760 yards/mile, answer: 2.9 miles]
* - Difficulty factors: [Large number division, decimal result]
* - Distractor patterns: [A: 0.3 (inverted), B: 2.9 (correct), C: 3344 (subtracted), D: 6864 (added)]
* - Constraints: [yards divisible by 1760 for clean decimal]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
