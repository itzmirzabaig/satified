import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: e9841407
*
* ORIGINAL ANALYSIS:
* - Number ranges: [red: 7 cards, blue: 28 cards, ratio: 1:4]
* - Difficulty factors: [Simplifying ratios, order matters (red to blue)]
* - Distractor patterns: [A: 1 to 4 (correct), B: 4 to 1 (blue to red, reversed), C: 1 to 7 (random), D: 7 to 1 (unsimplified)]
* - Constraints: [Numbers must have GCD > 1 for simplification]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_e9841407 = {
  metadata: {
    // id: "e9841407",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const simplifiedRed = getRandomInt(1, 3);
    const simplifiedBlue = getRandomInt(simplifiedRed + 1, 6);
    const multiplier = getRandomInt(3, 7);
    const redCards = simplifiedRed * multiplier;
    const blueCards = simplifiedBlue * multiplier;

    const reversedRatio = `${simplifiedBlue} to ${simplifiedRed}`;
    const randomWithRed = `1 to ${redCards}`;
    const unsimplified = `${redCards} to 1`;
    const correctRatio = `${simplifiedRed} to ${simplifiedBlue}`;

    const optionsData = [
      { text: correctRatio, isCorrect: true, reason: null },
      { text: reversedRatio, isCorrect: false, reason: "This is the ratio of blue cards to red cards (${blueCards} to ${redCards}), simplified. The question asks for red to blue, so the order matters." },
      { text: randomWithRed, isCorrect: false, reason: "This is incorrect. It might come from comparing a unit ($1$) to the red cards (${redCards}) or some other miscalculation." },
      { text: unsimplified, isCorrect: false, reason: "This is incorrect. It would represent the unsimplified number of red cards to $1$, which doesn't make sense in this context." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To find the ratio of red cards to blue cards, we need to compare the quantity of red cards to the quantity of blue cards. 1. Identify the quantities: Red cards = $${redCards}$, Blue cards = $${blueCards}$. 2. Set up the ratio: The question asks for the ratio of "red cards to blue cards". Ratio = Red cards : Blue cards = $${redCards} : ${blueCards}$ or "$${redCards}$ to ${blueCards}$". 3. Simplify the ratio: Find the greatest common divisor (GCD) of $${redCards}$ and $${blueCards}$. Both numbers are divisible by $${multiplier}$. $${redCards} \\div ${multiplier} = ${simplifiedRed}$, $${blueCards} \\div ${multiplier} = ${simplifiedBlue}$. The simplified ratio is $${simplifiedRed}$ to ${simplifiedBlue}$. Analysis of Options: Choice ${correctLetter} (${correctRatio}): This is the correct answer. It represents the simplified ratio of $${redCards}$ red cards to $${blueCards}$ blue cards. Choice ${incorrectOptions[0].letter} (${incorrectOptions[0].text}): ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} (${incorrectOptions[1].text}): ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} (${incorrectOptions[2].text}): ${incorrectOptions[2].reason}`;

    return {
      questionText: `Shaquan has $${redCards}$ red cards and $${blueCards}$ blue cards. What is the ratio of red cards to blue cards that Shaquan has?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctRatio,
      explanation: explanation
    };
  }
};

/**
* Question ID: c81499e1
*
* ORIGINAL ANALYSIS:
* - Number ranges: [mass: 39 kg (double-digit), conversion: 1000 g/kg, answer: 39000 (5-digit)]
* - Difficulty factors: [Metric conversion, multiplication by 1000]
* - Distractor patterns: [None - fill in blank, common errors: 3900 (missing 0), 390000 (extra 0), 1039 (added), 39000 (correct)]
* - Constraints: [Simple multiplication by 1000]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
