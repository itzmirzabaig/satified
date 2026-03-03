import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: ba62b0b0
*
* ORIGINAL ANALYSIS:
* - Number ranges: [28 kg (double-digit), conversion: 1000 g/kg, answer: 28000]
* - Difficulty factors: [Metric conversion, multiplication by 1000]
* - Distractor patterns: [A: 28000 (correct), B: 1028 (added), C: 972 (subtracted), D: 784 (random)]
* - Constraints: [Simple multiplication by 1000]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_ba62b0b0 = {
  metadata: {
    // id: "ba62b0b0",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const massKg = getRandomInt(15, 40);
    const gramsPerKg = 1000;
    const massGrams = massKg * gramsPerKg;

    const distractor1 = gramsPerKg + massKg;
    const distractor2 = gramsPerKg - massKg;
    const distractor3 = massKg * massKg;

    // Fixed: Changed to template literals (backticks) for reason strings with ${}
    const optionsData = [
      { text: massGrams.toLocaleString(), isCorrect: true, reason: null },
      { text: distractor1.toString(), isCorrect: false, reason: `This answer is incorrect. It appears to result from adding ${massKg} to ${gramsPerKg} instead of multiplying.` },
      { text: distractor2.toString(), isCorrect: false, reason: `This answer is incorrect. It appears to result from subtracting ${massKg} from ${gramsPerKg}.` },
      { text: distractor3.toString(), isCorrect: false, reason: `This answer is incorrect. It is a seemingly random number unrelated to the correct conversion calculation.` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Fixed: Proper array access [0], [1], [2] and simplified text
    const explanation = `To convert kilograms to grams, you multiply the number of kilograms by ${gramsPerKg.toLocaleString()}. ${massKg} kilograms × ${gramsPerKg.toLocaleString()} grams/kilogram = ${massGrams.toLocaleString()} grams. Therefore, the correct answer is ${massGrams.toLocaleString()}. Why other options are incorrect: Choice ${incorrectOptions[0].letter}: ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter}: ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter}: ${incorrectOptions[2].reason}`;

    return {
      // Fixed: Plain text for units, no \\text{} needed
      questionText: `A kangaroo has a mass of ${massKg} kilograms. What is the kangaroo's mass, in grams? (1 kilogram = ${gramsPerKg.toLocaleString()} grams)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: massGrams.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 7cd1c6db
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 12 cm/s (double-digit), distance: 108 cm (triple-digit), answer: 9 seconds]
* - Difficulty factors: [Time = Distance / Speed formula]
* - Distractor patterns: [A: 9 (correct), B: 96 (108-12), C: 120 (108+12), D: 972 (108×12)]
* - Constraints: [distance divisible by speed for integer time]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/