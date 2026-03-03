import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 85939da5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [study size: 799, heavy texters estimate: 30%, margin of error: 3%]
 * - Difficulty factors: [Margin of error interpretation, confidence intervals, statistical inference]
 * - Distractor patterns: [A: misinterprets margin of error as error rate, B: absolute impossibility claim, C: takes upper bound as certain value]
 * - Constraints: [Margin of error creates interval 27%-33%, must find statement about population parameter]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML table with randomized cell values preserving row/column totals]
 */

export const generator_85939da5 = {
  metadata: {
    // id: "85939da5",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate study parameters
    // Use realistic double-digit and triple-digit ranges matching original difficulty
    const totalSampleSize = getRandomInt(700, 900);
    const heavyTexterPercent = getRandomInt(25, 35); // Percent estimate
    const marginOfError = getRandomInt(2, 5); // Typical MOE range
    
    // STEP 2: Calculate derived values for table
    // Light, Medium, Heavy breakdown needs to sum to totalSampleSize
    // Heavy texters should be approximately heavyTexterPercent% of total
    const heavyTextersTotal = Math.round(totalSampleSize * heavyTexterPercent / 100);
    
    // Distribute heavy texters between daily talkers and non-daily talkers
    const heavyDailyTalkers = getRandomInt(Math.floor(heavyTextersTotal * 0.55), Math.floor(heavyTextersTotal * 0.75));
    const heavyNotDaily = heavyTextersTotal - heavyDailyTalkers;
    
    // Remaining for Light and Medium
    const remaining = totalSampleSize - heavyTextersTotal;
    const lightTextersTotal = getRandomInt(Math.floor(remaining * 0.30), Math.floor(remaining * 0.40));
    const mediumTextersTotal = remaining - lightTextersTotal;
    
    // Distribute Light and Medium across daily talk categories
    const lightDailyTalkers = getRandomInt(Math.floor(lightTextersTotal * 0.35), Math.floor(lightTextersTotal * 0.50));
    const lightNotDaily = lightTextersTotal - lightDailyTalkers;
    
    const mediumDailyTalkers = getRandomInt(Math.floor(mediumTextersTotal * 0.40), Math.floor(mediumTextersTotal * 0.55));
    const mediumNotDaily = mediumTextersTotal - mediumDailyTalkers;
    
    // Calculate totals
    const totalDailyTalkers = lightDailyTalkers + mediumDailyTalkers + heavyDailyTalkers;
    const totalNotDaily = lightNotDaily + mediumNotDaily + heavyNotDaily;
    
    // STEP 3: Calculate confidence interval bounds
    const lowerBound = heavyTexterPercent - marginOfError;
    const upperBound = heavyTexterPercent + marginOfError;
    
    // STEP 4: Generate answer choices with clear reasoning
    // D: Claims value outside interval is "doubtful" - CORRECT interpretation
    const outsideValue = upperBound + getRandomInt(2, 4); // Value outside upper bound
    
    const optionsData = [
      { 
        text: `Approximately ${marginOfError}% of the teens in the study who are classified as heavy texters are not really heavy texters.`, 
        isCorrect: false,
        reason: "the margin of error doesn't provide information about misclassification in the study"
      },
      { 
        text: `It is not possible that the percent of all US teens who are heavy texters is less than ${lowerBound}%.`, 
        isCorrect: false,
        reason: "values within the margin of error interval are possible, not impossible"
      },
      { 
        text: `The percent of all US teens who are heavy texters is ${upperBound}%.`, 
        isCorrect: false,
        reason: "while ${upperBound}% is within the confidence interval, any value in the interval is equally likely"
      },
      { 
        text: `It is doubtful that the percent of all US teens who are heavy texters is ${outsideValue}%.`, 
        isCorrect: true,
        reason: `${outsideValue}% is outside the confidence interval of ${lowerBound}% to ${upperBound}%`
      }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr style="border-bottom: 2px solid #333;">
          <th style="border: 1px solid currentColor; padding: 8px;">Texting behavior</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Talks on cell phone daily</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Does not talk on cell phone daily</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px;">Light</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${lightDailyTalkers}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${lightNotDaily}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${lightTextersTotal}</td>
        </tr>
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px;">Medium</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${mediumDailyTalkers}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${mediumNotDaily}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${mediumTextersTotal}</td>
        </tr>
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px;">Heavy</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${heavyDailyTalkers}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${heavyNotDaily}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${heavyTextersTotal}</td>
        </tr>
        <tr style="border-top: 2px solid #333; font-weight: bold;">
          <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${totalDailyTalkers}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${totalNotDaily}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${totalSampleSize}</td>
        </tr>
      </tbody>
    </table>`;
    
    // STEP 7: Build explanation
    const explanation = `Choice ${correctLetter} is correct. The given margin of error of ${marginOfError}% indicates that the actual percent of all US teens who are heavy texters is likely within ${marginOfError}% of the estimate of ${heavyTexterPercent}%, or between ${lowerBound}% and ${upperBound}%. Therefore, it is unlikely, or doubtful, that the percent of all US teens who are heavy texters would be ${outsideValue}%. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `In a study of cell phone use, ${totalSampleSize} randomly selected US teens were asked how often they talked on a cell phone and about their texting behavior. The data are summarized in the table above. Based on the data from the study, an estimate of the percent of US teens who are heavy texters is ${heavyTexterPercent}% and the associated margin of error is ${marginOfError}%. Which of the following is a correct statement based on the given margin of error?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `It is doubtful that the percent of all US teens who are heavy texters is ${outsideValue}%.`,
      explanation: explanation
    };
  }
};

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

// File: generators/inference-from-sample-statistics-and-margin-of-error/308084c5.ts