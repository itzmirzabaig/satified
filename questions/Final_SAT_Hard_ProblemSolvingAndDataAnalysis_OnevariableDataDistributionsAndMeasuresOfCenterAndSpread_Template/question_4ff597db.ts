import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4ff597db
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [20 employees, mean 6.7 years, new mean 6.25 with 19 employees]
 * - Difficulty factors: [Working backwards from means to find individual value, careful with employee count]
 * - Distractor patterns: [A: change in mean, B/C: wrong employee count assumption]
 * - Constraints: [Original total = 20 × 6.7, New total = 19 × 6.25, Difference is answer]
 * - Question type: [Text→Multiple Choice Text]
 */

export const generator_4ff597db = {
  metadata: {
    // id: "4ff597db",
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
    let yearsWorked = 0;
    let attempts = 0;
    
    while (!valid && attempts < 100) {
      originalCount = getRandomInt(15, 25);
      originalMean = getRandomInt(5, 10) + getRandomInt(0, 9) / 10; // One decimal place
      newMean = originalMean - getRandomInt(2, 5) / 10; // Slightly lower
      
      // STEP 2: Calculate totals
      const originalTotal = originalMean * originalCount;
      const newTotal = newMean * (originalCount - 1);
      yearsWorked = originalTotal - newTotal;
      
      // Ensure reasonable answer
      if (yearsWorked >= 0 && yearsWorked <= 30) {
        valid = true;
      }
      attempts++;
    }
    
    // Fallback
    if (!valid) {
      originalCount = 20;
      originalMean = 6.7;
      newMean = 6.25;
      yearsWorked = 15.25;
    }
    
    // STEP 3: Create distractors
    const distractorA = (originalMean - newMean).toFixed(2); // Change in mean
    const distractorB = (originalMean * originalCount - originalMean).toFixed(2); // Wrong calculation
    const distractorC = yearsWorked + getRandomInt(1, 5); // Slightly off
    
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "this is just the change in the mean, not the years worked by the employee who left" },
      { text: distractorB, isCorrect: false, reason: "this results from making the assumption that there were still the original number of employees after one left" },
      { text: distractorC.toFixed(2), isCorrect: false, reason: "this also results from using the wrong employee count" },
      { text: yearsWorked.toFixed(2), isCorrect: true }
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
      questionText: `The mean amount of time that the ${originalCount} employees of a construction company have worked for the company is ${originalMean} years. After one of the employees leaves the company, the mean amount of time that the remaining employees have worked for the company is reduced to ${newMean} years. How many years did the employee who left the company work for the company?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: yearsWorked.toFixed(2),
      explanation: `Choice ${correctLetter} is correct. The total years worked by all ${originalCount} employees is ${originalMean} × ${originalCount} = ${(originalMean * originalCount).toFixed(2)} years. After the employee left, the remaining ${originalCount - 1} employees have worked ${newMean} × ${originalCount - 1} = ${(newMean * (originalCount - 1)).toFixed(2)} years total. Therefore, the employee who left had worked ${(originalMean * originalCount).toFixed(2)} - ${(newMean * (originalCount - 1)).toFixed(2)} = ${yearsWorked.toFixed(2)} years. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 4626102e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values 22-26 for set A, adding constant 56 to create set B]
 * - Difficulty factors: [Understanding effect of adding constant on median vs range]
 * - Distractor patterns: [Student may think range changes or median stays same]
 * - Constraints: [Adding constant shifts median by that constant, range (max-min) unchanged]
 * - Question type: [Figure→Multiple Choice Text]
 */

// File: generators/onevariable-data-distributions/4626102e.ts