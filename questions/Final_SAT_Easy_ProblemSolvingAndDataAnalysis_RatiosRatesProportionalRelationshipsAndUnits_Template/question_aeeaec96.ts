import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: aeeaec96
*
* ORIGINAL ANALYSIS:
* - Number ranges: [612 inches (triple-digit), conversion: 36 inches/yard, answer: 17]
* - Difficulty factors: [Unit conversion, division with larger numbers]
* - Distractor patterns: [A: 0.059 (inverted 36/612), B: 17 (correct), C: 576 (612-36), D: 22032 (612×36)]
* - Constraints: [inches must be divisible by 36 for integer yards]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_aeeaec96 = {
  metadata: {
    // id: "aeeaec96",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yards = getRandomInt(10, 30);
    const inchesPerYard = 36;
    const inches = yards * inchesPerYard;
    const correctYards = inches / inchesPerYard;

    const distractorInverted = parseFloat((inchesPerYard / inches).toFixed(3));
    const distractorSubtract = inches - inchesPerYard;
    const distractorMultiply = inches * inchesPerYard;

    const optionsData = [
      { text: distractorInverted.toString(), isCorrect: false, reason: "This is the result if you divide $${inchesPerYard}$ by $${inches}$. This is the inverse of the correct operation." },
      { text: correctYards.toString(), isCorrect: true, reason: null },
      { text: distractorSubtract.toString(), isCorrect: false, reason: "This is the result of subtraction ($${inches} - ${inchesPerYard} = ${distractorSubtract}$), which is not the correct operation for unit conversion." },
      { text: distractorMultiply.toString(), isCorrect: false, reason: "This is the result of multiplication ($${inches} \\times ${inchesPerYard} = ${distractorMultiply}$). You would multiply if you were converting yards to inches (larger unit to smaller unit), but here we are doing the reverse." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To convert from a smaller unit (inches) to a larger unit (yards), you need to divide. The conversion factor is given: $1 \\text{ yard} = ${inchesPerYard} \\text{ inches}$. Set up the division: $${inches} \\text{ inches} \\div ${inchesPerYard} \\text{ inches/yard} = ${correctYards} \\text{ yards}$. Let's check the other options to see why they are incorrect: Choice ${incorrectOptions[0].letter}: ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter}: ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter}: ${incorrectOptions[2].reason}`;

    return {
      questionText: `How many yards are equivalent to $${inches}$ inches? ($1 \\text{ yard} = ${inchesPerYard} \\text{ inches}$)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctYards.toString(),
      explanation: explanation
    };
  }
};

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
