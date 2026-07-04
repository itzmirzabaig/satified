import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 958
 *
 * FIXES:
 * - Changed \\\\frac to \\frac
 * - Updated table styling
 * - Fixed issue where plain text was being latexed in the explanation
 */

export const generator_958 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate table values, retrying (bounded) until exactly ONE type
    // is closest to 1/3 of the total female population. Without this guard the
    // chinstrap (55-65) and gentoo (50-60) ranges overlap on 55-60, so two
    // types can be exactly equidistant from the target, making two option
    // NAMES equally correct while only the sort winner is marked right.
    let chinstrapM = 0, chinstrapF = 0, emperorM = 0, emperorF = 0;
    let gentooM = 0, gentooF = 0, macaroniM = 0, macaroniF = 0;
    let totalFemale = 0, targetValue = 0;
    let types: { name: string; female: number; diff: number }[] = [];

    let tries = 0;
    do {
      chinstrapM = getRandomInt(35, 48);
      chinstrapF = getRandomInt(55, 65);
      emperorM = getRandomInt(6, 12);
      emperorF = getRandomInt(24, 30);
      gentooM = getRandomInt(45, 55);
      gentooF = getRandomInt(50, 60);
      macaroniM = getRandomInt(35, 48);
      macaroniF = getRandomInt(35, 48);

      totalFemale = chinstrapF + emperorF + gentooF + macaroniF;
      targetValue = totalFemale / 3;

      // Find which is closest to 1/3
      types = [
        { name: "Chinstrap", female: chinstrapF, diff: Math.abs(chinstrapF - targetValue) },
        { name: "Emperor", female: emperorF, diff: Math.abs(emperorF - targetValue) },
        { name: "Gentoo", female: gentooF, diff: Math.abs(gentooF - targetValue) },
        { name: "Macaroni", female: macaroniF, diff: Math.abs(macaroniF - targetValue) }
      ];
      types.sort((a, b) => a.diff - b.diff);
    } while (types[0].diff === types[1].diff && tries++ < 50);

    const chinstrapTotal = chinstrapM + chinstrapF;
    const emperorTotal = emperorM + emperorF;
    const gentooTotal = gentooM + gentooF;
    const macaroniTotal = macaroniM + macaroniF;

    const correctType = types[0].name;
    const correctTypeFemale = types[0].female;

    // STEP 2: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; width: 100%; max-width: 450px;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Type of penguin</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Male</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Female</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Chinstrap</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${chinstrapM}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${chinstrapF}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${chinstrapTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Emperor</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${emperorM}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${emperorF}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${emperorTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Gentoo</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${gentooM}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${gentooF}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${gentooTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Macaroni</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${macaroniM}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${macaroniF}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${macaroniTotal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${chinstrapM + emperorM + gentooM + macaroniM}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${totalFemale}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${chinstrapTotal + emperorTotal + gentooTotal + macaroniTotal}</td>
    </tr>
  </tbody>
</table>`;

    // STEP 3: Create options
    const optionsData = [
      { text: "Chinstrap", isCorrect: correctType === "Chinstrap" },
      { text: "Emperor", isCorrect: correctType === "Emperor" },
      { text: "Gentoo", isCorrect: correctType === "Gentoo" },
      { text: "Macaroni", isCorrect: correctType === "Macaroni" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const targetInt = Math.round(targetValue);

    return {
      questionText: "The number of penguins in a zoo exhibit, sorted by gender and type of penguin, is shown in the table above. Which type of penguin has a female population that is the closest to being $\\frac{1}{3}$ of the total female penguin population in the exhibit?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctType,
      explanation: `Choice ${correctLetter} is correct. There are ${totalFemale} female penguins total; $\\frac{1}{3}$ of ${totalFemale} is approximately ${targetInt}. ${correctType} has ${correctTypeFemale} females, which is closest to ${targetInt}.`
    };
  }
};