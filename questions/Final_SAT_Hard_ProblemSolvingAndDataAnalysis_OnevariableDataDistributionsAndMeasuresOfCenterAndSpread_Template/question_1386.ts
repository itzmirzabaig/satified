import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1386
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Set F: 55 integers 170-290, adding value 10 to create set G]
 * - Difficulty factors: [Effect of extreme outlier on mean vs median, understanding both statistics change]
 * - Distractor patterns: [Student may think only mean changes, or that median doesn't change]
 * - Constraints: [10 is much less than all values in F (170-290), mean decreases significantly, median may decrease slightly or stay same]
 * - Question type: [Text→Multiple Choice Text]
 */

export const generator_1386 = {
  metadata: {
    id: "1386",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const countF = getRandomInt(45, 65);
    const minF = getRandomInt(150, 200);
    const maxF = minF + getRandomInt(80, 120);
    const outlier = getRandomInt(5, 20); // Much smaller than minF
    
    // STEP 2: Determine effects
    // Mean of G will be less than mean of F (adding a value much smaller than current mean)
    // Median of G will be less than or equal to median of F (adding a small value shifts median position)
    
    const meanFGreater = true; // Mean of F > Mean of G
    const medianFGreater = true; // Median of F >= Median of G
    
    // STEP 3: Determine correct answer
    // Since mean(F) > mean(G), mean is NOT less for F
    // Since median(F) >= median(G), median is NOT less for F
    // So answer is D (Neither)
    
    // STEP 4: Create options
    const optionsData = [
      { text: "I only", isCorrect: false },
      { text: "II only", isCorrect: false },
      { text: "I and II", isCorrect: false },
      { text: "Neither I nor II", isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // Parity-correct description of where the median sits in a sorted set of size n.
    const countG = countF + 1;
    const ordinal = (k: number): string => {
      const rem100 = k % 100;
      if (rem100 >= 11 && rem100 <= 13) return `${k}th`;
      switch (k % 10) {
        case 1: return `${k}st`;
        case 2: return `${k}nd`;
        case 3: return `${k}rd`;
        default: return `${k}th`;
      }
    };
    const medianDesc = (n: number): string => {
      if (n % 2 === 1) {
        return `the ${ordinal((n + 1) / 2)} value`;
      }
      return `the average of the ${ordinal(n / 2)} and ${ordinal(n / 2 + 1)} values`;
    };
    const medianF = medianDesc(countF);
    const medianG = medianDesc(countG);

    // STEP 6: Return question data
    return {
      questionText: `Data set F consists of ${countF} integers between ${minF} and ${maxF}. Data set G consists of all the integers in data set F as well as the integer ${outlier}. Which of the following must be less for data set F than for data set G?\n\nI. The mean\nII. The median`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Neither I nor II",
      explanation: `Choice ${correctLetter} is correct. Adding the value ${outlier}, which is much smaller than every value in set F (all between ${minF} and ${maxF}), lowers the mean, so the mean of F is greater than the mean of G. Statement I is therefore false. For the median, set F has ${countF} values, so its median is ${medianF} in order. Set G has ${countG} values, with ${outlier} added as a new minimum below every value of F, so its median is ${medianG} in order. Inserting a value below the entire data set shifts the middle of the ordered list toward the smaller end, so the median of G is less than or equal to the median of F; it is never greater. Thus the median of F is also not less than the median of G, and Statement II is false. Since neither statistic is less for F than for G, the answer is that neither I nor II holds.`
    };
  }
};
