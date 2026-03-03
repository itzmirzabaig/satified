import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1142af44
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values 1-5, frequencies in ratio 1:2:3:2:1 with parameter a]
 * - Difficulty factors: [Symmetry recognition, understanding that symmetric distributions have mean=median]
 * - Distractor patterns: [Student may try to calculate with 'a' instead of recognizing symmetry]
 * - Constraints: [Distribution is symmetric around value 3, so mean and median both equal 3]
 * - Question type: [Table→Multiple Choice Text]
 */

export const generator_1142af44 = {
  metadata: {
    // id: "1142af44",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate symmetric distribution around center
    const center = getRandomInt(3, 7);
    const spread = getRandomInt(1, 3);
    const values = [
      center - 2 * spread,
      center - spread,
      center,
      center + spread,
      center + 2 * spread
    ];
    
    // Symmetric frequencies: a, 2a, 3a, 2a, a
    const baseFreq = getRandomInt(2, 5);
    const frequencies = [baseFreq, 2 * baseFreq, 3 * baseFreq, 2 * baseFreq, baseFreq];
    
    // STEP 2: Calculate mean (should equal center due to symmetry)
    const totalCount = frequencies.reduce((a, b) => a + b, 0);
    const sum = values.reduce((acc, val, i) => acc + val * frequencies[i], 0);
    const mean = sum / totalCount;
    
    // Median is also center (middle value of symmetric distribution)
    const median = center;
    
    const difference = Math.abs(mean - median);
    
    // STEP 3: Build table HTML
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Value</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Frequency</th>
    </tr>
  </thead>
  <tbody>
    ${values.map((v, i) => `
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${v}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${frequencies[i]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;
    
    // STEP 4: Create options
    const optionsData = [
      { text: "0", isCorrect: true },
      { text: "1", isCorrect: false },
      { text: "2", isCorrect: false },
      { text: "3", isCorrect: false }
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
      questionText: "The frequency distribution above summarizes a set of data, where a is a positive integer. How much greater is the mean of the set of data than the median?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "0",
      explanation: `Choice ${correctLetter} is correct. The distribution is symmetric around the value ${center} (frequencies are ${frequencies.join(':')}, mirroring around the center). In symmetric distributions, mean and median are equal, resulting in a difference of 0. Specifically: mean = ${sum}/${totalCount} = ${mean}, and median = ${median}.`
    };
  }
};

/**
 * Question ID: 1e8ccffd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [8 players, mean 14.5, new mean 12 after removing highest]
 * - Difficulty factors: [Working backwards from means to find total, then finding individual value]
 * - Distractor patterns: [A: difference in means, B: wrong player count, D: wrong calculation]
 * - Constraints: [Total = mean × count, highest = original total - new total]
 * - Question type: [Text→Multiple Choice Text]
 */

// File: generators/onevariable-data-distributions/1e8ccffd.ts