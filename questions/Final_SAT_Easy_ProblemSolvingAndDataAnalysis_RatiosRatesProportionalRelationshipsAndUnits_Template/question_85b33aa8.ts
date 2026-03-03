import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_85b33aa8 = {
  metadata: {
    // id: "85b33aa8",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const milesInt = getRandomInt(2, 4);
    const milesDecimal = getRandomInt(0, 9);
    const miles = parseFloat(`${milesInt}.${milesDecimal}`);
    const yardsPerMile = 1760;
    const yards = Math.round(miles * yardsPerMile);
    const correctMiles = yards / yardsPerMile;

    const distractor1 = parseFloat((yardsPerMile / yards).toFixed(1));
    const distractor2 = yards - yardsPerMile;
    const distractor3 = yards + yardsPerMile;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: `This might be the result of dividing incorrectly or in reverse order (${yardsPerMile} / ${yards}).` },
      { text: correctMiles.toString(), isCorrect: true, reason: null },
      { text: distractor2.toString(), isCorrect: false, reason: `This is the result of subtracting ${yardsPerMile} from ${yards} (${yards} - ${yardsPerMile} = ${distractor2}).` },
      { text: distractor3.toString(), isCorrect: false, reason: `This is the result of adding the two numbers together (${yards} + ${yardsPerMile} = ${distractor3}).` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Fixed: Proper template literals and correct array access
    const explanation = `To convert yards to miles, you need to divide the number of yards by the number of yards in a mile. Calculation: $${yards}/${yardsPerMile} = ${correctMiles}$. So, the fish swam ${correctMiles} miles. Why other options are incorrect: Choice ${incorrectOptions[0].letter}: ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter}: ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter}: ${incorrectOptions[2].reason}`;

    return {
      // Fixed: Simplified math notation
      questionText: `A fish swam a distance of ${yards.toLocaleString()} yards. How far did the fish swim, in miles? (1 mile = ${yardsPerMile.toLocaleString()} yards)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctMiles.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 7270d642
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 16 m/s (double-digit), time: 4 seconds, answer: 64 meters]
* - Difficulty factors: [Distance = Speed × Time formula]
* - Distractor patterns: [A: 64 (correct), B: 20 (16+4), C: 16 (just speed), D: 12 (16-4)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/