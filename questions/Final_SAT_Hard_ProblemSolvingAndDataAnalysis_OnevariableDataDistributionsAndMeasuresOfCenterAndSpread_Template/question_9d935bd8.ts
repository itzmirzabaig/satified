import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9d935bd8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [7 states with percentages 19.5-36.4, national median 26.95]
 * - Difficulty factors: [Finding median of small data set, subtracting from reference value]
 * - Distractor patterns: [Student may calculate mean instead of median, or wrong subtraction order]
 * - Constraints: [Must order 7 values to find 4th (median), then subtract 26.95]
 * - Question type: [Table→Multiple Choice Text]
 */

export const generator_9d935bd8 = {
  metadata: {
    // id: "9d935bd8",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate 7 percentages around a national median
    const nationalMedian = getRandomInt(20, 35) + getRandomInt(0, 9) / 10;
    
    // Generate 7 values scattered around the national median
    const percentages = [
      nationalMedian - getRandomInt(5, 8) - getRandomInt(0, 9) / 10,
      nationalMedian - getRandomInt(2, 4) - getRandomInt(0, 9) / 10,
      nationalMedian - getRandomInt(0, 2),
      nationalMedian + getRandomInt(0, 2),
      nationalMedian + getRandomInt(2, 5) + getRandomInt(0, 9) / 10,
      nationalMedian + getRandomInt(6, 10) + getRandomInt(0, 9) / 10,
      nationalMedian + getRandomInt(7, 12) + getRandomInt(0, 9) / 10
    ];
    
    // STEP 2: Find median of the 7 states (4th value when sorted)
    const sorted = [...percentages].sort((a, b) => a - b);
    const statesMedian = sorted[3]; // 0-indexed, so index 3 is the 4th value
    
    // STEP 3: Calculate difference
    const difference = Math.abs(statesMedian - nationalMedian);
    const roundedDiff = Math.round(difference * 100) / 100;
    
    // STEP 4: Generate state labels
    const states = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    
    // Build table HTML
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">State</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Percent of residents</th>
    </tr>
  </thead>
  <tbody>
    ${states.map((s, i) => `
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${s}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${percentages[i].toFixed(1)}%</td>
    </tr>`).join('')}
  </tbody>
</table>`;
    
    // STEP 5: Create options
    const optionsData = [
      { text: (roundedDiff - 0.9).toFixed(2) + "%", isCorrect: false },
      { text: roundedDiff.toFixed(2) + "%", isCorrect: true },
      { text: (roundedDiff + 0.27).toFixed(2) + "%", isCorrect: false },
      { text: (roundedDiff + 6.5).toFixed(2) + "%", isCorrect: false }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 7: Return question data
    return {
      questionText: `The results from 7 states asking if residents earned a bachelor's degree are shown. The median for all 50 states was ${nationalMedian}%. What is the difference between the median for these 7 states and the median for all 50 states?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: roundedDiff.toFixed(2) + "%",
      explanation: `Choice ${correctLetter} is correct. Ordering the 7 state percentages: ${sorted.map(p => p.toFixed(1) + "%").join(", ")}. The median is the 4th value: ${statesMedian.toFixed(1)}%. The difference between this median and the national median of ${nationalMedian}% is |${statesMedian.toFixed(2)} - ${nationalMedian}| = ${roundedDiff.toFixed(2)}%.`
    };
  }
};

/**
 * Question ID: 54d93874
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Andrew: 6 rocks, Maria: 6 rocks with unknown x, mean difference 0.1 kg]
 * - Difficulty factors: [Setting up equation from means, solving for unknown]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Maria's mean = Andrew's mean + 0.1, solve for x]
 * - Question type: [Table→Fill in the blank]
 */

// File: generators/onevariable-data-distributions/54d93874.ts