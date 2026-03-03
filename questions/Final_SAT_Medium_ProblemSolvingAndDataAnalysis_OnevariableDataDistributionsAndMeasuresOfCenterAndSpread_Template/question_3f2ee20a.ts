import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3f2ee20a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: ~2500, mean: ~186, std dev: 12-20]
 * - Difficulty factors: [Understanding standard deviation as measure of spread]
 * - Distractor patterns: [Confusing mean with spread, thinking identical data]
 * - Constraints: [Same mean, different std dev]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_3f2ee20a = {
  metadata: {
    // id: "3f2ee20a",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate survey parameters
    const sampleSize = getRandomInt(2000, 3000);
    const mean = getRandomInt(170, 200);
    const stdDevA = getRandomInt(10, 14);
    const stdDevB = stdDevA + getRandomInt(5, 10);
    
    // STEP 2: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
      <thead>
        <tr>
          <th style="border: 1px solid currentColor; padding: 8px;">Group</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Sample size</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Mean (cm)</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Standard deviation (cm)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">A</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${sampleSize.toLocaleString()}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${mean}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${stdDevA.toFixed(1)}</td>
        </tr>
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">B</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${sampleSize.toLocaleString()}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${mean}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${stdDevB.toFixed(1)}</td>
        </tr>
      </tbody>
    </table>`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: `The Group A data set was identical to the Group B data set.`, isCorrect: false },
      { text: `Group B contained the tallest participant.`, isCorrect: false },
      { text: `The heights of the men in Group B had a larger spread than the heights of the men in Group A.`, isCorrect: true },
      { text: `The median height of Group B is larger than the median height of Group A.`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The results of two independent surveys are shown in the table below. Which statement is true based on the table?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Standard deviation is a measure of spread. Since Group B has a higher standard deviation (${stdDevB.toFixed(1)} cm) than Group A (${stdDevA.toFixed(1)} cm), Group B's data is more spread out. Choice ${incorrectOptions[0].letter} is incorrect because identical data sets would have identical standard deviations. Choice ${incorrectOptions[1].letter} is incorrect because standard deviation does not indicate the presence of extreme values. Choice ${incorrectOptions[2].letter} is incorrect because the table provides no information about medians.`
    };
  }
};

/**
 * Question ID: 07f2829b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tourist numbers: 20-85 million, 9 countries]
 * - Difficulty factors: [Finding median of two different years, calculating difference]
 * - Distractor patterns: [Mean instead of median, wrong year comparison]
 * - Constraints: [Must have 9 values, median is 5th value]
 * - Question type: [Table→Fill in the blank]
 * - Figure generation: [HTML Table]
 */