import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7e6c745f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Egg: 6g protein, $0.36 | Milk: 8g protein, $0.24]
 * - Difficulty factors: [Cost per unit calculation, ratio of ratios]
 * - Distractor patterns: [A: 1:2, B: 2:3, C: 3:4 (various ratio miscalculations)]
 * - Constraints: [Must calculate cost per gram first]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_7e6c745f = {
  metadata: {
    // id: "7e6c745f",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: Egg 6g/$0.36, Milk 8g/$0.24, ratio 2:1
    // Strategy: ensure clean division for cost per gram
    
    const eggProtein = getRandomInt(4, 10);
    const milkProtein = getRandomInt(6, 12);
    
    // Costs that divide evenly
    const eggCostCents = eggProtein * getRandomInt(4, 10); // ensures clean cost per gram
    const milkCostCents = milkProtein * getRandomInt(2, 6);
    
    const eggCostPerGram = eggCostCents / eggProtein;
    const milkCostPerGram = milkCostCents / milkProtein;
    
    // Calculate ratio
    const ratioValue = eggCostPerGram / milkCostPerGram;
    const [num, den] = ratioValue === 2 ? [2, 1] : ratioValue === 1.5 ? [3, 2] : ratioValue === 3 ? [3, 1] : [Math.round(ratioValue), 1];
    
    // STEP 2: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; border: 1px solid currentColor;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Food</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Protein</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">1 large egg</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${eggProtein} grams</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${(eggCostCents / 100).toFixed(2)}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">1 cup of milk</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${milkProtein} grams</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">$${(milkCostCents / 100).toFixed(2)}</td>
    </tr>
  </tbody>
</table>`;
    
    // STEP 3: Create options
    const correctRatio = `${num}:${den}`;
    const distractorRatios = ["1:2", "2:3", "3:4"].filter(r => r !== correctRatio);
    
    const optionsData = [
      { text: distractorRatios[0], isCorrect: false, reason: "results from incorrect calculation of cost per gram or ratio" },
      { text: distractorRatios[1], isCorrect: false, reason: "results from incorrect calculation of cost per gram or ratio" },
      { text: distractorRatios[2], isCorrect: false, reason: "results from incorrect calculation of cost per gram or ratio" },
      { text: correctRatio, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The table above shows the amount of protein in two foods and the cost of each food. Based on the table, what is the ratio of the cost per gram of protein in a large egg to the cost per gram of protein in a cup of milk?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctRatio,
      explanation: `Choice ${correctLetter} is correct. The cost per gram of protein in 1 large egg is $${(eggCostCents / 100).toFixed(2)} \\div ${eggProtein} = \$${(eggCostPerGram / 100).toFixed(2)}$. The cost per gram of protein in 1 cup of milk is $${(milkCostCents / 100).toFixed(2)} \\div ${milkProtein} = \$${(milkCostPerGram / 100).toFixed(2)}$. It follows that the ratio of the cost per gram of protein in a large egg to the cost per gram of protein in a cup of milk is $${eggCostPerGram}:${milkCostPerGram}$, which can be rewritten as ${num}:${den}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 873d2838
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 230 people/mi², population: 85,100, find area]
 * - Difficulty factors: [Rearranging density formula, division of large numbers]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/873d2838.ts