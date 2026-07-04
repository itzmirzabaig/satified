import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1398
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [employee ranges 2-31, frequencies 2-7, total 17 restaurants]
 * - Difficulty factors: [Finding median in grouped data, understanding median position in frequency distribution]
 * - Distractor patterns: [Student may pick middle of overall range or calculate mean instead]
 * - Constraints: [Median is 9th value when sorted, must determine which range contains it]
 * - Question type: [Table→Multiple Choice Text]
 */

export const generator_1398 = {
  metadata: {
    id: "1398",
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

    // Interval midpoints. Because the intervals are disjoint, these five values
    // are pairwise distinct for every (start, intervalSize).
    const intervalMid = (i: number) => {
      const lo = start + i * intervalSize;
      const hi = start + (i + 1) * intervalSize - 1;
      return lo + Math.floor((hi - lo) / 2);
    };
    
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
    
    // STEP 4: Generate answer options.
    // The question asks which value COULD be the median. For grouped data we
    // only know the median lies somewhere in the median interval, so EVERY value
    // in [rangeMin, rangeMax] is a valid answer. The question is only well-posed
    // when exactly ONE option lies in that interval. We therefore take the
    // correct answer to be the midpoint of the median interval and each of the
    // three distractors to be the midpoint of a DIFFERENT (non-median) interval.
    // Because the five interval midpoints are pairwise distinct and each lies in
    // its own disjoint interval, no distractor can fall inside the median
    // interval or coincide with the correct answer, for any draw.
    const correctAnswer = intervalMid(medianRangeIndex);

    const otherIndices = shuffle([0, 1, 2, 3, 4].filter(i => i !== medianRangeIndex));
    const [d1, d2, d3] = otherIndices.slice(0, 3).map(intervalMid);

    const optionsData = [
      { text: d1.toString(), isCorrect: false },
      { text: d2.toString(), isCorrect: false },
      { text: d3.toString(), isCorrect: false },
      { text: correctAnswer.toString(), isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // Cumulative count of restaurants in the intervals BEFORE the median interval.
    const belowCount = frequencies.slice(0, medianRangeIndex).reduce((a, b) => a + b, 0);
    const belowPhrase = medianRangeIndex === 0
      ? `No restaurants fall below the ${medianRange} range`
      : `The first ${medianRangeIndex} interval${medianRangeIndex === 1 ? '' : 's'} account for ${frequencies.slice(0, medianRangeIndex).join(' + ')} = ${belowCount} restaurant${belowCount === 1 ? '' : 's'}`;

    // STEP 6: Return question data
    return {
      questionText: "The table shown summarizes the number of employees at each of the restaurants in a town. Which of the following could be the median number of employees for the restaurants in this town?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer.toString(),
      explanation: `Choice ${correctLetter} is correct. There are ${totalRestaurants} restaurants, so the median is the ${medianPosition}th value when the counts are ordered from least to greatest. ${belowPhrase}, so the ${medianPosition}th value lies in the ${medianRange} range. The median must be one of the values in that range, so any number from ${rangeMin} to ${rangeMax} could be the median; ${correctAnswer} is the only choice that lies in this range. Each other choice falls in a different interval, so none of them can be the median.`
    };
  }
};
