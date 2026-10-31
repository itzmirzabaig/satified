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
      // Red part 2 or 4, so the upside down ratio (black * black / red) ends
      // in at most two decimal places, and a lowest terms ratio.
      ratioRed = [2, 4][getRandomInt(0, 1)];
      ratioBlack = getRandomInt(ratioRed + 1, 9);
      multiplier = getRandomInt(3, 8);
      blackPens = ratioBlack * multiplier;
      redPens = ratioRed * multiplier;

      // Wrong choices: the red part of the ratio, the ratio used upside down,
      // and the total number of pens. They used to be the black part of the
      // ratio, the given black count, and black count times the black part.
      distractor1 = ratioRed;
      distractor2 = (blackPens * ratioBlack) / ratioRed;
      distractor3 = blackPens + redPens;
      tries++;
    } while (
      tries < 50 &&
      (new Set([redPens, distractor1, distractor2, distractor3]).size !== 4 || ratioBlack % 2 === 0)
    );

    const optionsData = [
      { text: redPens.toString(), isCorrect: true, reason: '' },
      { text: `${distractor1}`, isCorrect: false, reason: `${distractor1} is the red pens' part of the ratio, not the number of red pens` },
      { text: `${distractor2}`, isCorrect: false, reason: `${distractor2} results from using the ratio upside down, as if there were ${ratioBlack} red pens for every ${ratioRed} black pens` },
      { text: `${distractor3}`, isCorrect: false, reason: `${distractor3} is the total number of black and red pens in the box` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The ratio of black pens to red pens is ${ratioBlack} to ${ratioRed}, which can be written as the fraction $\\frac{${ratioBlack}}{${ratioRed}}$. There are ${blackPens} black pens, so if $x$ is the number of red pens, the proportion is $\\frac{${blackPens}}{x} = \\frac{${ratioBlack}}{${ratioRed}}$. Multiplying both sides by $${ratioRed}x$ gives $(${blackPens})(${ratioRed}) = (${ratioBlack})(x)$, so $\\frac{${blackPens * ratioRed}}{${ratioBlack}} = x$. This gives $x = ${redPens}$, so there are ${redPens} red pens in the box. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `In a box of pens, the ratio of black pens to red pens is ${ratioBlack} to ${ratioRed}. There are ${blackPens} black pens in the box. How many red pens are in the box?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: redPens.toString(),
      explanation: explanation
    };
  }
};
