import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 484
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio black:red = 8:1 (single-digit), black pens: 40 (double-digit), answer: 5]
* - Difficulty factors: [Ratio setup, cross-multiplication, solving proportion]
* - Distractor patterns: [A: 5 (correct), B: 8 (ratio part, not quantity), C: 40 (given black pens), D: 320 (40×8, reversed ratio)]
* - Constraints: [black count must be divisible by ratio part for integer answer]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_484 = {
  metadata: {
    id: "484",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Draw a ratio black:red with black strictly larger, then scale by a
    // multiplier so both counts are whole numbers. Retry (bounded) until all
    // four answer choices are distinct.
    let ratioBlack = 0, ratioRed = 0, multiplier = 0;
    let blackPens = 0, redPens = 0, distractor1 = 0, distractor2 = 0, distractor3 = 0;
    let tries = 0;
    do {
      ratioRed = getRandomInt(1, 3);
      ratioBlack = getRandomInt(ratioRed + 2, 9); // black part strictly larger than red part
      multiplier = getRandomInt(3, 8);
      blackPens = ratioBlack * multiplier;
      redPens = ratioRed * multiplier;

      distractor1 = ratioBlack;              // the ratio part, not a count
      distractor2 = blackPens;               // the given black-pen count
      distractor3 = blackPens * ratioBlack;  // multiplied instead of divided
      tries++;
    } while (
      tries < 50 &&
      new Set([redPens, distractor1, distractor2, distractor3]).size !== 4
    );

    const optionsData = [
      { text: redPens.toString(), isCorrect: true, reason: null },
      { text: distractor1.toString(), isCorrect: false, reason: "This is the part of the ratio that represents black pens, not the quantity of red pens." },
      { text: distractor2.toString(), isCorrect: false, reason: "This is the number of black pens given in the problem, not the number of red pens." },
      { text: distractor3.toString(), isCorrect: false, reason: "This multiplies the number of black pens by the ratio part instead of dividing, reversing the relationship." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `The ratio of black pens to red pens is ${ratioBlack} to ${ratioRed}, which can be written as the fraction $\\frac{${ratioBlack}}{${ratioRed}}$. There are ${blackPens} black pens, so if $x$ is the number of red pens, the proportion is $\\frac{${blackPens}}{x} = \\frac{${ratioBlack}}{${ratioRed}}$. Cross-multiplying gives $(${blackPens})(${ratioRed}) = (${ratioBlack})(x)$, so $\\frac{${blackPens * ratioRed}}{${ratioBlack}} = x$. This gives $x = ${redPens}$, so there are ${redPens} red pens in the box. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}`;

    return {
      questionText: `In a box of pens, the ratio of black pens to red pens is ${ratioBlack} to ${ratioRed}. There are ${blackPens} black pens in the box. How many red pens are in the box?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: redPens.toString(),
      explanation: explanation
    };
  }
};
