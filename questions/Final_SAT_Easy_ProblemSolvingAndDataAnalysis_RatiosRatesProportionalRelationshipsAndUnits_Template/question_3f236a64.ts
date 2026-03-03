import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 3f236a64
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio y:x = 4:1 (from table), x values: 1,3,5,40, y values: 4,12,20,k, answer: 160]
* - Difficulty factors: [Finding constant ratio, proportional reasoning, extending pattern]
* - Distractor patterns: [A: 28 (y when x=7), B: 36 (40-4), C: 80 (wrong proportion), D: 160 (correct, 40×4)]
* - Constraints: [Ratio must be constant, x values must generate integer y values]
* - Question type: [Multiple Choice Text with TABLE]
* - Figure generation: [HTML Table - CRITICAL!]
*/

export const generator_3f236a64 = {
  metadata: {
    // id: "3f236a64",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratio = getRandomInt(3, 6);
    const x1 = 1;
    const x2 = getRandomInt(2, 4);
    const x3 = getRandomInt(5, 7);
    const x4 = getRandomInt(30, 50);
    const y1 = ratio * x1;
    const y2 = ratio * x2;
    const y3 = ratio * x3;
    const correctK = ratio * x4;

    const distractor1 = ratio * (x4 - x1);
    const distractor2 = x4 - ratio;
    const distractor3 = x4 * 2;

    const tableCode = `<table><tr><th>x</th><th>y</th></tr><tr><td>${x1}</td><td>${y1}</td></tr><tr><td>${x2}</td><td>${y2}</td></tr><tr><td>${x3}</td><td>${y3}</td></tr><tr><td>${x4}</td><td>k</td></tr></table>`;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "This is the value of y when the value of x is " + (x4 - x1) + ", not " + x4 + "." },
      { text: distractor2.toString(), isCorrect: false, reason: "This may result from subtracting " + ratio + " from " + x4 + " instead of multiplying " + x4 + " by " + ratio + "." },
      { text: distractor3.toString(), isCorrect: false, reason: "This may result from incorrectly setting up the proportion or using the wrong ratio." },
      { text: correctK.toString(), isCorrect: true, reason: null }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Since the ratio of $y$ to $x$ is constant for each ordered pair in the table, the first row can be used to determine that the ratio of $y$ to $x$ is $${ratio}$ to $1$. The proportion $\\frac{${ratio}}{1} = \\frac{k}{${x4}}$ can be used to solve for $k$. Multiplying each side of the equation by $${x4}$ yields $${correctK} = k$. Choice ${incorrectOptions[0].letter} is incorrect. ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} is incorrect and ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} is incorrect and ${incorrectOptions[2].reason}`;

    return {
      questionText: `In the table above, the ratio of $y$ to $x$ for each ordered pair is constant. What is the value of $k$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctK.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: da9ffcf6
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio XY:ZV = 6:1, XY = 102 inches, answer: 17]
* - Difficulty factors: [Ratio setup with geometric context, solving proportion]
* - Distractor patterns: [A: 17 (correct), B: 96 (102-6), C: 102 (same as XY), D: 612 (102×6, reversed)]
* - Constraints: [XY must be divisible by 6 for integer ZV]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None - conceptual geometry]
*/
