import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 503
*
* ORIGINAL ANALYSIS:
* - Number ranges: [inches = 36 * yards, yards in 10..30, conversion: 36 inches/yard]
* - Difficulty factors: [Unit conversion, division with larger numbers]
* - Distractor patterns: [inverted 36/inches; correct yards; inches-36 (subtraction); inches*36 (multiplication)]
* - Constraints: [inches must be divisible by 36 for integer yards]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_503 = {
  metadata: {
    id: "503",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yards = getRandomInt(10, 30);
    const inchesPerYard = 36;
    const inches = yards * inchesPerYard;
    const correctYards = inches / inchesPerYard;         // = yards (clean integer)

    const distractorInverted = parseFloat((inchesPerYard / inches).toFixed(3)); // < 1, never collides
    const distractorSubtract = inches - inchesPerYard;   // = 36*(yards-1), far from yards
    const distractorMultiply = inches * inchesPerYard;   // huge, far from yards

    const optionsData = [
      {
        text: distractorInverted.toString(),
        isCorrect: false,
        reason: `this divides the conversion factor by the number of inches ($${inchesPerYard} \\div ${inches}$), which is the inverse of the correct operation`,
      },
      {
        text: correctYards.toString(),
        isCorrect: true,
        reason: null,
      },
      {
        text: distractorSubtract.toString(),
        isCorrect: false,
        reason: `this subtracts instead of dividing ($${inches} - ${inchesPerYard} = ${distractorSubtract}$), which is not how unit conversion works`,
      },
      {
        text: distractorMultiply.toString(),
        isCorrect: false,
        reason: `this multiplies ($${inches} \\times ${inchesPerYard} = ${distractorMultiply}$); you would multiply to convert yards to inches, but here the conversion goes the other way`,
      },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To convert from a smaller unit (inches) to a larger unit (yards), divide by the number of inches in one yard. The conversion factor is $1 \\text{ yard} = ${inchesPerYard} \\text{ inches}$, so $${inches} \\div ${inchesPerYard} = ${correctYards}$ yards. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`;

    return {
      questionText: `How many yards are equivalent to $${inches}$ inches? (Use the conversion $1 \\text{ yard} = ${inchesPerYard} \\text{ inches}$.)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctYards.toString(),
      explanation: explanation
    };
  }
};
