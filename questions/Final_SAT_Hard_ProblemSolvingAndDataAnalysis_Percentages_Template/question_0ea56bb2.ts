import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 0ea56bb2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [subscriptions: 5600, 5880 (mid-range numbers)]
 * - Difficulty factors: [Percent increase calculation, compound relationship between years]
 * - Distractor patterns: [Additive percentage error, wrong base year calculation]
 * - Constraints: [First increase must be exactly double second increase, numbers must work out cleanly]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [HTML Table - years and subscription counts]
 */

export const generator_0ea56bb2 = {
  metadata: {
    // id: "0ea56bb2",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base subscriptions for year 1
    // Use multiples of 100 for clean numbers
    const baseSubs = getRandomInt(40, 80) * 100; // 4000-8000 range
    
    // STEP 2: Generate first year increase percentage (2-8%)
    const firstIncreasePct = getRandomInt(2, 8); 
    
    // STEP 3: Calculate year 2 subscriptions
    const year2Subs = Math.round(baseSubs * (1 + firstIncreasePct / 100));
    
    // STEP 4: Second year increase is half of first (per original logic)
    const secondIncreasePct = firstIncreasePct / 2;
    
    // STEP 5: Calculate year 3 expected subscriptions
    const year3Subs = Math.round(year2Subs * (1 + secondIncreasePct / 100));
    
    // STEP 6: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Year</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Subscriptions sold</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2012</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${baseSubs.toLocaleString()}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2013</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year2Subs.toLocaleString()}</td>
    </tr>
  </tbody>
</table>`;
    
    // STEP 7: Create distractors
    const wrongAdditive = Math.round(year2Subs * (1 + (firstIncreasePct - 16) / 100)); // Wrong: additive error
    const wrongBase = Math.round(baseSubs * (1 + secondIncreasePct / 100)); // Wrong: using wrong base
    const simpleIncrease = year2Subs + 100; // Wrong: arbitrary increase
    
    const optionsData = [
      { text: simpleIncrease.toLocaleString(), isCorrect: false, reason: "uses arbitrary increase" },
      { text: year3Subs.toLocaleString(), isCorrect: true, reason: "" },
      { text: wrongBase.toLocaleString(), isCorrect: false, reason: "uses wrong base year for calculation" },
      { text: wrongAdditive.toLocaleString(), isCorrect: false, reason: "incorrectly subtracts percentages additively" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'B';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The manager of an online news service received the report above on the number of subscriptions sold by the service. The manager estimated that the percent increase from 2012 to 2013 would be double the percent increase from 2013 to 2014. How many subscriptions did the manager expect would be sold in 2014?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: year3Subs.toString(),
      explanation: `Choice ${correctLetter} is correct. The percent increase from 2012 to 2013 is: (${year2Subs} - ${baseSubs}) / ${baseSubs} = ${firstIncreasePct}%. Since this is double the increase from 2013 to 2014, the second increase is ${secondIncreasePct}%. Therefore, 2014 subscriptions = ${year2Subs} × (1 + ${secondIncreasePct/100}) = ${year3Subs}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 0231050d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [snowfall: 40, 10, various points 2003-2015]
 * - Difficulty factors: [Reading line graph, percent decrease calculation]
 * - Distractor patterns: [Wrong year selection, arithmetic order errors]
 * - Constraints: [Points must show clear decreasing trend from 2003 to 2007, Mafs coordinates]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [Mafs line graph with points]
 */