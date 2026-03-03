import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 308084c5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Sample A percent: 52%, MOE: 4.2%, Sample B percent: 48%, MOE: 1.6%]
 * - Difficulty factors: [Understanding margin of error relationship to sample size, inverse relationship]
 * - Distractor patterns: [A: confuses recording errors with margin of error, B: thinks percent favorability affects MOE, C: reverses sample size relationship]
 * - Constraints: [Sample size is primary factor in MOE calculation, larger sample = smaller MOE]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML table with randomized percentages and margins of error showing inverse relationship]
 */

export const generator_308084c5 = {
  metadata: {
    // id: "308084c5",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate sample data with realistic margins of error
    // MOE is inversely related to square root of sample size
    // Sample A has larger MOE → smaller sample size
    
    const sampleAPercent = getRandomInt(48, 55); // Around 50-55%
    const sampleBPercent = 100 - sampleAPercent + getRandomInt(-4, 4); // Mirror around 50%
    
    // Ensure Sample A has significantly larger MOE (smaller sample)
    const marginA = (getRandomInt(35, 55) / 10); // 3.5% to 5.5%
    const marginB = (getRandomInt(12, 25) / 10); // 1.2% to 2.5%
    
    // STEP 2: Create option data with reasoning
    const optionsData = [
      { 
        text: "Sample A had a smaller number of votes that could not be recorded.", 
        isCorrect: false,
        reason: "the margin of error depends on the size of the sample of recorded votes, not unrecorded votes"
      },
      { 
        text: "Sample A had a higher percent of favorable responses.", 
        isCorrect: false,
        reason: "the percent in favor doesn't directly affect the margin of error calculation when both are similar distances from 50%"
      },
      { 
        text: "Sample A had a larger sample size.", 
        isCorrect: false,
        reason: "a larger sample size would decrease, not increase, the margin of error"
      },
      { 
        text: "Sample A had a smaller sample size.", 
        isCorrect: true,
        reason: "a smaller sample size increases the margin of error because the sample may be less representative of the population"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr style="border-bottom: 2px solid #333;">
          <th style="border: 1px solid currentColor; padding: 10px;">Sample</th>
          <th style="border: 1px solid currentColor; padding: 10px;">Percent in favor</th>
          <th style="border: 1px solid currentColor; padding: 10px;">Margin of error</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid currentColor; padding: 10px; font-weight: bold;">A</td>
          <td style="border: 1px solid currentColor; padding: 10px;">${sampleAPercent}%</td>
          <td style="border: 1px solid currentColor; padding: 10px;">${marginA.toFixed(1)}%</td>
        </tr>
        <tr>
          <td style="border: 1px solid currentColor; padding: 10px; font-weight: bold;">B</td>
          <td style="border: 1px solid currentColor; padding: 10px;">${sampleBPercent}%</td>
          <td style="border: 1px solid currentColor; padding: 10px;">${marginB.toFixed(1)}%</td>
        </tr>
      </tbody>
    </table>`;
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctLetter} is correct. Sample size is an appropriate reason for the margin of error to change. In general, a smaller sample size increases the margin of error because the sample may be less representative of the whole population. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: "The results of two random samples of votes for a proposition are shown above. The samples were selected from the same population, and the margins of error were calculated using the same method. Which of the following is the most appropriate reason that the margin of error for sample A is greater than the margin of error for sample B?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Sample A had a smaller sample size.",
      explanation: explanation
    };
  }
};

/**
 * Question ID: 5218763
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [class size: 26, percent with 2+ siblings: 34.6%, total classes: 1,800]
 * - Difficulty factors: [Multi-step estimation, complementary percentage, scaling to population]
 * - Distractor patterns: [A: calculates "at least 2 siblings" instead of "fewer than 2", B: uses half the population incorrectly, D: gives total population without adjustment]
 * - Constraints: [Must calculate 65.4% of total population, 34.6% of 26 ≈ 9 students, so 17 have fewer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null (no figure in original)
 */

// File: generators/inference-from-sample-statistics-and-margin-of-error/5218763.ts