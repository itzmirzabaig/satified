import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4c774b00
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ages: 18-30, frequencies: 1-6]
 * - Difficulty factors: [Comparing mean, median, mode from frequency table]
 * - Distractor patterns: [Wrong ordering of measures]
 * - Constraints: [Must create clear distinction between mode < median < mean]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_4c774b00 = {
  metadata: {
    // id: "4c774b00",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate age distribution with mode < median < mean pattern
    const baseAge = getRandomInt(18, 22);
    const ages = [baseAge, baseAge + 1, baseAge + 2, baseAge + 3, baseAge + 4, baseAge + 5, baseAge + getRandomInt(10, 15)];
    
    // Frequencies: highest for lowest age (mode), decreasing, outlier at end
    const frequencies = [
      getRandomInt(5, 8),  // Mode (highest frequency)
      getRandomInt(4, 6),
      getRandomInt(3, 5),
      getRandomInt(2, 4),
      getRandomInt(1, 3),
      1,
      1                    // Outlier
    ];
    
    const totalStudents = frequencies.reduce((a, b) => a + b, 0);
    
    // STEP 2: Calculate mode (age with highest frequency)
    const mode = ages[0];
    
    // STEP 3: Calculate median (average of middle two values for even count, or middle for odd)
    let cumulative = 0;
    let median = 0;
    const medianPos1 = Math.floor((totalStudents + 1) / 2);
    const medianPos2 = Math.ceil((totalStudents + 1) / 2);
    
    for (let i = 0; i < ages.length; i++) {
      cumulative += frequencies[i];
      if (cumulative >= medianPos1 && median === 0) {
        if (medianPos1 === medianPos2) {
          median = ages[i];
        } else {
          // Need to find if we span two different ages
          const prevCumulative = cumulative - frequencies[i];
          if (prevCumulative < medianPos1 && cumulative >= medianPos2) {
            median = ages[i];
          } else if (cumulative >= medianPos1 && cumulative < medianPos2) {
            // Spanning across this age and next
            median = (ages[i] + ages[i + 1]) / 2;
          } else {
            median = ages[i];
          }
        }
        break;
      }
    }
    
    // STEP 4: Calculate mean
    let sum = 0;
    for (let i = 0; i < ages.length; i++) {
      sum += ages[i] * frequencies[i];
    }
    const mean = Math.round(sum / totalStudents);
    
    // STEP 5: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
      <thead>
        <tr>
          <th style="border: 1px solid currentColor; padding: 8px;">Age</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Frequency</th>
        </tr>
      </thead>
      <tbody>
        ${ages.map((age, i) => `
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${age}</td>
          <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${frequencies[i]}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;
    
    // STEP 6: Create options with different orderings
    const optionsData = [
      { text: `mode < median < mean`, isCorrect: true },
      { text: `mode < mean < median`, isCorrect: false },
      { text: `median < mode < mean`, isCorrect: false },
      { text: `mean < mode < median`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The table above shows the distribution of ages of the ${totalStudents} students enrolled in a college class. Which of the following gives the correct order of the mean, median, and mode of the ages?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The mode is ${mode} (frequency ${frequencies[0]}). The median is ${median}. The mean is approximately ${mean}. Thus, ${mode} < ${median} < ${mean}, or mode < median < mean. Choice ${incorrectOptions[0].letter} is incorrect because the mean (${mean}) is greater than the median (${median}), not less. Choice ${incorrectOptions[1].letter} is incorrect because the mode (${mode}) is less than the median (${median}), not greater. Choice ${incorrectOptions[2].letter} is incorrect because the mean is the largest value, not the smallest.`
    };
  }
};

/**
 * Question ID: a456cfd2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: 6-14, frequencies: 0-11]
 * - Difficulty factors: [Identifying maximum from frequency table]
 * - Distractor patterns: [Value with highest frequency, value before gap]
 * - Constraints: [Must have gap with 0 frequency, then reappear]
 * - Question type: [Table→Fill in the blank]
 * - Figure generation: [HTML Table]
 */