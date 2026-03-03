import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ecbdbe84
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [employee ranges 2-31, frequencies 2-7, total 17 restaurants]
 * - Difficulty factors: [Finding median in grouped data, understanding median position in frequency distribution]
 * - Distractor patterns: [Student may pick middle of overall range or calculate mean instead]
 * - Constraints: [Median is 9th value when sorted, must determine which range contains it]
 * - Question type: [Table→Multiple Choice Text]
 */

export const generator_ecbdbe84 = {
  metadata: {
    // id: "ecbdbe84",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate range intervals and frequencies
    const start = getRandomInt(1, 5);
    const intervalSize = getRandomInt(5, 8);
    
    const ranges = [
      `${start} to ${start + intervalSize - 1}`,
      `${start + intervalSize} to ${start + 2 * intervalSize - 1}`,
      `${start + 2 * intervalSize} to ${start + 3 * intervalSize - 1}`,
      `${start + 3 * intervalSize} to ${start + 4 * intervalSize - 1}`,
      `${start + 4 * intervalSize} to ${start + 5 * intervalSize - 1}`
    ];
    
    // Frequencies that put median in one of the middle ranges
    const freq1 = getRandomInt(1, 3);
    const freq2 = getRandomInt(2, 5);
    const freq3 = getRandomInt(1, 3);
    const freq4 = getRandomInt(5, 9); // Median likely here
    const freq5 = getRandomInt(1, 4);
    
    const frequencies = [freq1, freq2, freq3, freq4, freq5];
    const totalRestaurants = frequencies.reduce((a, b) => a + b, 0);
    const medianPosition = Math.floor(totalRestaurants / 2) + 1;
    
    // STEP 2: Determine which range contains the median
    let cumulative = 0;
    let medianRangeIndex = 0;
    for (let i = 0; i < frequencies.length; i++) {
      cumulative += frequencies[i];
      if (cumulative >= medianPosition) {
        medianRangeIndex = i;
        break;
      }
    }
    
    const medianRange = ranges[medianRangeIndex];
    const [rangeMin, rangeMax] = medianRange.split(' to ').map(Number);
    
    // STEP 3: Build table HTML
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Number of employees</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Number of restaurants</th>
    </tr>
  </thead>
  <tbody>
    ${ranges.map((r, i) => `
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${r}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${frequencies[i]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;
    
    // STEP 4: Generate answer options - one must be in the median range
    const wrongOption1 = start; // Too low
    const wrongOption2 = start + intervalSize + 1; // In second range (likely before median)
    const wrongOption3 = start + 2 * intervalSize + 1; // In third range
    
    // Correct answer is a value within the median range
    const correctAnswer = rangeMin + Math.floor((rangeMax - rangeMin) / 2);
    
    const optionsData = [
      { text: wrongOption1.toString(), isCorrect: false },
      { text: wrongOption2.toString(), isCorrect: false },
      { text: wrongOption3.toString(), isCorrect: false },
      { text: correctAnswer.toString(), isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 6: Return question data
    return {
      questionText: "The table shown summarizes the number of employees at each of the restaurants in a town. Which of the following could be the median number of employees for the restaurants in this town?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer.toString(),
      explanation: `Choice ${correctLetter} is correct. With ${totalRestaurants} restaurants, the median is the ${medianPosition}th value. Counting frequencies: ${frequencies.slice(0, medianRangeIndex).join(' + ')} = ${frequencies.slice(0, medianRangeIndex).reduce((a,b)=>a+b,0)} restaurants are below ${rangeMin}; the ${medianPosition}th falls in the ${medianRange} range. ${correctAnswer} is the only choice in that range.`
    };
  }
};

/**
 * Question ID: f8a322d9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Set A intervals 3-19, Set B intervals 8-17, 23 integers each]
 * - Difficulty factors: [Finding min/max possible means, optimization problem with constraints]
 * - Distractor patterns: [Student may calculate difference of midpoints or assume means can be equal]
 * - Constraints: [Min mean of A uses lowest values in each interval, max mean of B uses highest values in each interval]
 * - Question type: [Figure→Multiple Choice Text]
 */

// File: generators/onevariable-data-distributions/f8a322d9.ts