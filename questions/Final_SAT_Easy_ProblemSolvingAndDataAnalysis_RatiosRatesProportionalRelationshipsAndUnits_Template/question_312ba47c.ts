import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 312ba47c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio black:red = 8:1 (single-digit), black pens: 40 (double-digit), answer: 5]
* - Difficulty factors: [Ratio setup, cross-multiplication, solving proportion]
* - Distractor patterns: [A: 5 (correct), B: 8 (ratio part, not quantity), C: 40 (given black pens), D: 320 (40×8, reversed ratio)]
* - Constraints: [black count must be divisible by ratio part for integer answer]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_312ba47c = {
  metadata: {
    // id: "312ba47c",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratioBlack = getRandomInt(3, 9);
    const ratioRed = getRandomInt(1, 3);
    const multiplier = getRandomInt(3, 8);
    const blackPens = ratioBlack * multiplier;
    const redPens = ratioRed * multiplier;

    const distractor1 = ratioBlack;
    const distractor2 = blackPens;
    const distractor3 = blackPens * ratioBlack;

    const optionsData = [
      { text: redPens.toString(), isCorrect: true, reason: null },
      { text: distractor1.toString(), isCorrect: false, reason: "This is the part of the ratio representing black pens, not the quantity of red pens." },
      { text: distractor2.toString(), isCorrect: false, reason: "This is the number of black pens given in the problem, not the red pens." },
      { text: distractor3.toString(), isCorrect: false, reason: "This would be the result if you multiplied the number of black pens by ${ratioBlack}, which implies you reversed the ratio or misunderstood the relationship." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `The problem states that the ratio of black pens to red pens is ${ratioBlack}:${ratioRed}. This can be written as the fraction:\\n\\(\\frac{\\text{black pens}}{\\text{red pens}} = \\frac{${ratioBlack}}{${ratioRed}}\\)\\n\\nWe are given that there are ${blackPens} black pens. Let \\(x\\) represent the number of red pens. We can set up a proportion:\\n\\(\\frac{${blackPens}}{x} = \\frac{${ratioBlack}}{${ratioRed}}\\)\\n\\nTo solve for \\(x\\), we can cross-multiply:\\n\\(${blackPens} \\times ${ratioRed} = ${ratioBlack} \\times x\\)\\n\\(${blackPens * ratioRed} = ${ratioBlack}x\\)\\n\\nNow, divide both sides by ${ratioBlack} to isolate \\(x\\):\\n\\(x = \\frac{${blackPens * ratioRed}}{${ratioBlack}}\\)\\n\\(x = ${redPens}\\)\\n\\nSo, there are ${redPens} red pens in the box.\\n\\nLet's check why the other options are incorrect:\\n- **Choice ${incorrectOptions[0].letter}:** ${incorrectOptions[0].reason}\\n- **Choice ${incorrectOptions[1].letter}:** ${incorrectOptions[1].reason}\\n- **Choice ${incorrectOptions[2].letter}:** ${incorrectOptions[2].reason}`;

    return {
      questionText: `In a box of pens, the ratio of black pens to red pens is ${ratioBlack} to ${ratioRed}. There are ${blackPens} black pens in the box. How many red pens are in the box?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: redPens.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 15617f62
*
* ORIGINAL ANALYSIS:
* - Number ranges: [density: 290 (triple-digit), population: 92800 (5-digit), answer: 320 (triple-digit)]
* - Difficulty factors: [Formula rearrangement, large number division]
* - Distractor patterns: [A: 102400 (random), B: 93090 (pop + density), C: 320 (correct), D: 32 (place value error)]
* - Constraints: [population must be divisible by density for integer area]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
