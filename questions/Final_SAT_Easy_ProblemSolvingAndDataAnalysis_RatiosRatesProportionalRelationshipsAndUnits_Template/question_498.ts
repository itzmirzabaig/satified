import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 498
*
* ORIGINAL ANALYSIS:
* - Number ranges: [5104 yards (4-digit), conversion: 1760 yards/mile, answer: 2.9 miles]
* - Difficulty factors: [Large number division, decimal result]
* - Distractor patterns: [A: 0.3 (inverted), B: 2.9 (correct), C: 3344 (subtracted), D: 6864 (added)]
* - Constraints: [yards divisible by 1760 for clean decimal]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_498 = {
  metadata: {
    id: "498",
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

    // Before: reasons were capitalized "This might be..." sentences, the
    // explanation used a nonstandard "Why other options are incorrect" format,
    // and 4 digit numbers had no commas (in math or in the choices).
    const fmt = (n: number) => n.toLocaleString('en-US');
    const mfmt = (n: number) => fmt(n).replace(/,/g, '{,}');
    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: `${distractor1} is $${mfmt(yardsPerMile)} \\div ${mfmt(yards)}$ rounded to the nearest tenth, which divides in the reverse order` },
      { text: correctMiles.toString(), isCorrect: true, reason: '' },
      { text: fmt(distractor2), isCorrect: false, reason: `${fmt(distractor2)} is the result of subtracting ${fmt(yardsPerMile)} from ${fmt(yards)} instead of dividing` },
      { text: fmt(distractor3), isCorrect: false, reason: `${fmt(distractor3)} is the result of adding ${fmt(yards)} and ${fmt(yardsPerMile)} instead of dividing` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Since 1 mile is ${fmt(yardsPerMile)} yards, divide the number of yards by ${fmt(yardsPerMile)} to convert to miles: $${mfmt(yards)} \\div ${mfmt(yardsPerMile)} = ${correctMiles}$. So the fish swam ${correctMiles} miles. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      // Fixed: Simplified math notation
      questionText: `A fish swam a distance of ${yards.toLocaleString('en-US')} yards. How far did the fish swim, in miles? (1 mile = ${yardsPerMile.toLocaleString('en-US')} yards)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctMiles.toString(),
      explanation: explanation
    };
  }
};
