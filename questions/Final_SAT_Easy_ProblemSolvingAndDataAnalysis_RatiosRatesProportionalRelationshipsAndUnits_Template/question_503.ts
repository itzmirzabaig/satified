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

    // Before: the inverted choice was 36 / inches rounded to 3 decimals but
    // shown as exact, reasons started with "this" instead of the value, the
    // product had no thousands commas, and the explanation format was
    // nonstandard. The wrong choices are now exact unit slips: dividing by 12
    // (gives feet), dividing by 3 (feet per yard), and multiplying by 36.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const mfmt = (n: number) => fmt(n).replace(/,/g, '{,}');
    const distractorFeet = inches / 12;
    const distractorByThree = inches / 3;
    const distractorMultiply = inches * inchesPerYard;

    const optionsData = [
      {
        text: fmt(distractorFeet),
        isCorrect: false,
        reason: `${fmt(distractorFeet)} is the result of dividing ${fmt(inches)} by 12, which gives the length in feet, not yards`,
      },
      {
        text: correctYards.toString(),
        isCorrect: true,
        reason: '',
      },
      {
        text: fmt(distractorByThree),
        isCorrect: false,
        reason: `${fmt(distractorByThree)} is the result of dividing ${fmt(inches)} by 3, the number of feet in a yard, instead of by ${inchesPerYard}, the number of inches in a yard`,
      },
      {
        text: fmt(distractorMultiply),
        isCorrect: false,
        reason: `${fmt(distractorMultiply)} is the result of multiplying ${fmt(inches)} by ${inchesPerYard} instead of dividing`,
      },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Since 1 yard is ${inchesPerYard} inches, divide the number of inches by ${inchesPerYard} to convert to yards: $${mfmt(inches)} \\div ${inchesPerYard} = ${correctYards}$. So ${fmt(inches)} inches is equivalent to ${correctYards} yards. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `How many yards are equivalent to ${fmt(inches)} inches? (1 yard = ${inchesPerYard} inches)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctYards.toString(),
      explanation: explanation
    };
  }
};
