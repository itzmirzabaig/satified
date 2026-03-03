import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 241f1db7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [weights 13-20 lbs, frequencies 5-13, adding outlier at 39]
 * - Difficulty factors: [Effect of outlier on mean vs median, calculating new median position]
 * - Distractor patterns: [Student may think both change, or median changes but mean doesn't]
 * - Constraints: [39 is much higher than all original values (13-20), mean increases, median may or may not change depending on position]
 * - Question type: [Table→Multiple Choice Text]
 */

export const generator_241f1db7 = {
  metadata: {
    // id: "241f1db7",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate original data (weights and frequencies)
    // Create distribution where median is stable when adding one high value
    let valid = false;
    let weights: number[] = [];
    let frequencies: number[] = [];
    let totalCount = 0;
    let originalMedian = 0;
    let outlier = 0;
    let newMedian: number = 0;
    let meanIncreases = false;
    let mediansEqual = false;
    let attempts = 0;
    
    while (!valid && attempts < 100) {
      const baseWeight = getRandomInt(10, 25);
      weights = Array.from({length: 8}, (_, i) => baseWeight + i);
      
      // Frequencies that make total count odd, so median is clear
      frequencies = weights.map(() => getRandomInt(5, 15));
      totalCount = frequencies.reduce((a, b) => a + b, 0);
      
      // Calculate original median
      const sortedValues: number[] = [];
      weights.forEach((w, i) => {
        for (let j = 0; j < frequencies[i]; j++) {
          sortedValues.push(w);
        }
      });
      originalMedian = sortedValues[Math.floor(totalCount / 2)];
      
      // Add outlier (much higher value)
      outlier = weights[weights.length - 1] + getRandomInt(15, 25);
      
      // Calculate new statistics
      const originalSum = sortedValues.reduce((a, b) => a + b, 0);
      const newSum = originalSum + outlier;
      const newMean = newSum / (totalCount + 1);
      const originalMean = originalSum / totalCount;
      
      // New median
      const newSortedValues = [...sortedValues, outlier].sort((a, b) => a - b);
      const newMedianIndex = Math.floor((totalCount + 1) / 2);
      if ((totalCount + 1) % 2 === 0) {
        newMedian = (newSortedValues[newMedianIndex - 1] + newSortedValues[newMedianIndex]) / 2;
      } else {
        newMedian = newSortedValues[newMedianIndex];
      }
      
      meanIncreases = newMean > originalMean;
      mediansEqual = originalMedian === newMedian || Math.abs(originalMedian - newMedian) < 0.1;
      
      // Ensure we have a valid configuration
      if (meanIncreases) {
        valid = true;
      }
      attempts++;
    }
    
    // Fallback
    if (!valid) {
      weights = [13, 14, 15, 16, 17, 18, 19, 20];
      frequencies = [5, 7, 9, 11, 13, 10, 8, 6];
      totalCount = 69;
      originalMedian = 16;
      outlier = 39;
      meanIncreases = true;
      mediansEqual = true;
      newMedian = 16;
    }
    
    // STEP 5: Build table HTML
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Weight (pounds)</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Frequency</th>
    </tr>
  </thead>
  <tbody>
    ${weights.map((w, i) => `
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${w}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${frequencies[i]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;
    
    // STEP 6: Create options based on calculation
    let correctText: string;
    if (meanIncreases && mediansEqual) {
      correctText = "The mean increases, and the medians are equal.";
    } else if (meanIncreases && !mediansEqual) {
      correctText = "The mean increases, and the median increases.";
    } else if (!meanIncreases && mediansEqual) {
      correctText = "The mean decreases, and the medians are equal.";
    } else {
      correctText = "The mean decreases, and the median decreases.";
    }
    
    const optionsData = [
      { text: "The mean and median both increase.", isCorrect: false },
      { text: "The mean increases, and the medians are equal.", isCorrect: correctText === "The mean increases, and the medians are equal." },
      { text: "The mean decreases, and the median decreases.", isCorrect: false },
      { text: "The mean decreases, and the medians are equal.", isCorrect: correctText === "The mean decreases, and the medians are equal." }
    ];
    
    // STEP 7: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 8: Return question data
    return {
      questionText: `The frequency table summarizes a data set of the weights, rounded to the nearest pound, of tortoises. A weight of ${outlier} pounds is added to the original data set, creating a new data set. Which statement best compares the mean and median?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Adding ${outlier} (higher than any original value) increases the mean. The original median (the ${Math.floor(totalCount/2) + 1}th value out of ${totalCount}) is ${originalMedian}; after adding one value, the new median is ${newMedian}, so the medians are ${mediansEqual ? 'equal' : 'different'}. Therefore, ${correctText.toLowerCase()}.`
    };
  }
};

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

// File: generators/onevariable-data-distributions/ecbdbe84.ts