import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 24ad9dcb
*
* ORIGINAL ANALYSIS:
* - Number ranges: [Venus: 9/10, Jupiter: 23/10, Earth: 100 lbs, answer: 140 lbs]
* - Difficulty factors: [Fraction multiplication, subtraction of weights]
* - Distractor patterns: [A: 90 (Venus weight), B: 111 (random), C: 140 (correct), D: 230 (Jupiter weight)]
* - Constraints: [Fractions must multiply cleanly with 100]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_24ad9dcb = {
  metadata: {
    // id: "24ad9dcb",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const earthWeight = 100;
    const venusNum = getRandomInt(8, 12);
    const jupiterNum = getRandomInt(venusNum + 5, venusNum + 15);
    const denominator = 10;
    const venusWeight = (venusNum / denominator) * earthWeight;
    const jupiterWeight = (jupiterNum / denominator) * earthWeight;
    const weightDifference = jupiterWeight - venusWeight;

    const distractor1 = venusWeight;
    const distractor2 = venusWeight + getRandomInt(15, 25);
    const distractor3 = jupiterWeight;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "This is the weight of the object on Venus, not the difference." },
      { text: distractor2.toString(), isCorrect: false, reason: "This answer is incorrect and likely results from a calculation error." },
      { text: weightDifference.toString(), isCorrect: true, reason: null },
      { text: distractor3.toString(), isCorrect: false, reason: "This is the weight of the object on Jupiter, not the difference." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Fixed: Removed \\text{} and \\frac, using plain text with $ for math only
    const explanation = `First, let's find the weight of the object on Venus. We are told the object weighs ${earthWeight} pounds on Earth. Weight on Venus = $${venusNum}/${denominator} \\times ${earthWeight} = ${venusWeight}$ pounds. Next, let's find the weight of the object on Jupiter. Weight on Jupiter = $${jupiterNum}/${denominator} \\times ${earthWeight} = ${jupiterWeight}$ pounds. Finally, we subtract the weight on Venus from the weight on Jupiter. Difference = $${jupiterWeight} - ${venusWeight} = ${weightDifference}$ pounds. Therefore, the object weighs ${weightDifference} pounds more on Jupiter than on Venus. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}`;

    return {
      // Fixed: Removed \\frac, using simple $...$ for math expressions
      questionText: `The weight of an object on Venus is approximately $${venusNum}/${denominator}$ of its weight on Earth. The weight of an object on Jupiter is approximately $${jupiterNum}/${denominator}$ of its weight on Earth. If an object weighs ${earthWeight} pounds on Earth, approximately how many more pounds does it weigh on Jupiter than it weighs on Venus?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: weightDifference.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: d0d9ede4
*
* ORIGINAL ANALYSIS:
* - Number ranges: [34 yards (double-digit), conversion: 3 feet/yard, answer: 102]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [None - fill in blank, common errors: 37 (added), 31 (subtracted), 1020 (extra 0), 102 (correct)]
* - Constraints: [Simple multiplication]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/