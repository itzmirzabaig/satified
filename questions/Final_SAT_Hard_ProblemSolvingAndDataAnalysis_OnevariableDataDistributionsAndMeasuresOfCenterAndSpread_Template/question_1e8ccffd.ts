import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_1e8ccffd = {
  metadata: {
    // id: "1e8ccffd",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    let valid = false;
    let originalCount = 0;
    let originalMean = 0;
    let newMean = 0;
    let highestScore = 0;
    let attempts = 0;
    
    while (!valid && attempts < 100) {
      originalCount = getRandomInt(6, 10);
      originalMean = getRandomInt(10, 20) + (getRandomInt(0, 1) * 0.5); // Allow .5 decimals
      newMean = getRandomInt(8, 15);
      
      // STEP 2: Calculate totals
      const originalTotal = originalMean * originalCount;
      const newTotal = newMean * (originalCount - 1);
      highestScore = originalTotal - newTotal;
      
      // Ensure highest score is reasonable (positive and highest)
      if (highestScore > newMean && highestScore <= 50) {
        valid = true;
      }
      attempts++;
    }
    
    // Fallback
    if (!valid) {
      originalCount = 8;
      originalMean = 14.5;
      newMean = 12;
      highestScore = 38;
    }
    
    // STEP 3: Create options with SAT-style distractors
    const distractor1 = (originalMean - newMean).toFixed(0); // Difference in means
    const distractor2 = (newMean - (originalMean - newMean)).toFixed(0); // Miscalculation
    const distractor3 = (originalMean * originalCount - newMean).toFixed(0); // Wrong count
    
    const optionsData = [
      { text: distractor1, isCorrect: false, reason: "this is just the difference in means, not the highest score" },
      { text: distractor2, isCorrect: false, reason: "this appears to be a miscalculation" },
      { text: highestScore.toFixed(0), isCorrect: true },
      { text: distractor3, isCorrect: false, reason: "this uses the wrong number of players in the calculation" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `The mean score of ${originalCount} players in a basketball game was ${originalMean} points. If the highest individual score is removed, the mean score of the remaining ${originalCount - 1} players becomes ${newMean} points. What was the highest score?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: highestScore.toFixed(0),
      explanation: `Choice ${correctLetter} is correct. The total points scored by all ${originalCount} players is ${originalMean} × ${originalCount} = ${(originalMean * originalCount).toFixed(1)}. After removing the highest score, the remaining ${originalCount - 1} players scored ${newMean} × ${originalCount - 1} = ${(newMean * (originalCount - 1)).toFixed(1)} points total. Therefore, the highest score was ${(originalMean * originalCount).toFixed(1)} - ${(newMean * (originalCount - 1)).toFixed(1)} = ${highestScore.toFixed(0)} points. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: e7d48c8a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values 1-5 for bursts, adding outlier at 11]
 * - Difficulty factors: [Effect of outlier on median vs mean, calculating both statistics]
 * - Distractor patterns: [Student may think both change or median changes more]
 * - Constraints: [11 is much higher than original range (1-5), mean increases significantly, median may stay same]
 * - Question type: [Figure→Multiple Choice Text]
 */

// File: generators/onevariable-data-distributions/e7d48c8a.ts