import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: af142f8d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Account A: $500, 6%, Account B: $1000, $25/year]
 * - Difficulty factors: [Comparing exponential vs linear growth, compound interest calculation]
 * - Distractor patterns: [A always more (correct), A always less, A eventually less, A eventually more]
 * - Constraints: [Year 1: A = $30, B = $25; A starts higher and grows exponentially]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_af142f8d = {
  metadata: {
    // id: "af142f8d",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: A=$500 at 6%, B=$1000 at $25/year
    const amountA = getRandomInt(400, 800);
    const rateA = getRandomInt(4, 8); // percentage
    const amountB = getRandomInt(800, 1500);
    const flatB = getRandomInt(15, 35); // flat amount per year
    
    // STEP 2: Calculate first year earnings
    const firstYearA = amountA * (rateA / 100);
    
    // STEP 3: Build table HTML
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Account</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Amount invested</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Balance increase</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Account A</td>
      <td style="border: 1px solid currentColor; padding: 8px;">$${amountA}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${rateA}% annual interest</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Account B</td>
      <td style="border: 1px solid currentColor; padding: 8px;">$${amountB}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">$${flatB} per year</td>
    </tr>
  </tbody>
</table>`;
    
    // STEP 4: Determine correct answer based on calculated values
    // Account A earns more in first year if firstYearA > flatB
    const aAlwaysMore = firstYearA > flatB;
    
    const optionsData = [
      { text: "Account A always earns more money per year than Account B.", isCorrect: aAlwaysMore },
      { text: "Account A always earns less money per year than Account B.", isCorrect: !aAlwaysMore && firstYearA < flatB },
      { text: "Account A earns more money per year than Account B at first but eventually earns less money per year.", isCorrect: false },
      { text: "Account A earns less money per year than Account B at first but eventually earns more money per year.", isCorrect: !aAlwaysMore && firstYearA >= flatB }
    ];
    
    // Ensure exactly one is correct by adjusting if needed
    const correctCount = optionsData.filter(o => o.isCorrect).length;
    if (correctCount === 0) {
      // Default to first option if logic fails
      optionsData[0].isCorrect = true;
    } else if (correctCount > 1) {
      // Keep only the first correct one
      let foundCorrect = false;
      for (const opt of optionsData) {
        if (opt.isCorrect && !foundCorrect) {
          foundCorrect = true;
        } else if (opt.isCorrect) {
          opt.isCorrect = false;
        }
      }
    }
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 6: Return question data
    return {
      questionText: `Two investments were made as shown in the table above. The interest in Account A is compounded once per year. Which of the following is true about the investments?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption!.text,
      explanation: `Choice ${correctLetter} is correct. Account A earns $${amountA} \\\\times ${rateA / 100} = $${firstYearA.toFixed(2)} in the first year, which is ${firstYearA > flatB ? 'more' : 'less'} than Account B's constant $${flatB}. Since Account A's interest is compound (exponential), it will ${firstYearA > flatB ? 'continue to increase and always earn more' : 'eventually overtake Account B as the principal grows'}.`
    };
  }
};

/**
 * Question ID: 9d95e7ad
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1.5, points: (20,34) and (30,48)]
 * - Difficulty factors: [Estimating slope from scatter plot and line of best fit]
 * - Distractor patterns: [2.5 (too high), 2.0 (slightly high), 1.0 (too low), 1.5 (correct)]
 * - Constraints: [Slope = rise/run between two points on line]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatter plot with line of best fit for protein vs fat]
 */