import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4bb25495
 * FIXED:
 * - Removed hardcoded values.
 * - Randomly selects countries and assigns random areas with realistic variance.
 * - dynamic HTML table with "currentColor" styling for theme adaptability.
 * - Dynamic distractor generation based on the new random values.
 */

export const generator_4bb25495 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Dynamic Data Generation
    
    // Pool of names to choose from
    const countryNames = [
      "Monaco", "Nauru", "San Marino", "Tuvalu", 
      "Liechtenstein", "Marshall Islands", "Saint Kitts", "Maldives", 
      "Palau", "Grenada"
    ];
    
    // Shuffle and pick 5 distinct countries
    const selectedNames = shuffle(countryNames).slice(0, 5);
    
    // Generate random areas (sq km) 
    // We create a skewed distribution to make Mean vs Median interesting
    // 1 very small value (float), 4 larger integer values
    const smallArea = Math.round((Math.random() * 2 + 0.5) * 100) / 100; // 0.50 to 2.50
    const mediumAreas = [
      getRandomInt(20, 35),
      getRandomInt(50, 80),
      getRandomInt(90, 120),
      getRandomInt(150, 300)
    ];

    const areas = [smallArea, ...mediumAreas];
    
    // Combine into objects and shuffle row order for the table
    const tableData = shuffle(selectedNames.map((name, i) => ({
      name,
      area: areas[i]
    })));

    // 2. Calculations
    const sum = tableData.reduce((acc, curr) => acc + curr.area, 0);
    const count = tableData.length;
    const mean = sum / count;
    const roundedMean = Math.round(mean);

    // Calculate statistics for distractors
    const sortedAreas = [...tableData].map(d => d.area).sort((a, b) => a - b);
    const median = sortedAreas[2]; // Middle of 5 is index 2
    const roundedMedian = Math.round(median);
    const maxVal = Math.round(sortedAreas[4]);
    const roundedSum = Math.round(sum);

    // 3. Generate HTML Table
    // Using inline styles with currentColor to ensure visibility in dark/light mode
    const tableCode = `
      <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 14px; margin-top: 10px; margin-bottom: 10px;">
        <thead>
          <tr>
            <th style="border: 1px solid currentColor; padding: 8px; text-align: left; background-color: rgba(127, 127, 127, 0.1);">Country</th>
            <th style="border: 1px solid currentColor; padding: 8px; text-align: left; background-color: rgba(127, 127, 127, 0.1);">Area (sq km)</th>
          </tr>
        </thead>
        <tbody>
          ${tableData.map(row => `
            <tr>
              <td style="border: 1px solid currentColor; padding: 8px;">${row.name}</td>
              <td style="border: 1px solid currentColor; padding: 8px;">${row.area}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // 4. Generate Options
    // We need unique options. Sometimes Mean ≈ Median, so we handle collisions.
    const uniqueOptions = new Map<string, { text: string, isCorrect: boolean }>();
    
    // Correct Answer
    uniqueOptions.set(roundedMean.toString(), { text: roundedMean.toString(), isCorrect: true });

    // Distractor 1: Median
    if (!uniqueOptions.has(roundedMedian.toString())) {
      uniqueOptions.set(roundedMedian.toString(), { text: roundedMedian.toString(), isCorrect: false });
    }

    // Distractor 2: Max Value
    if (!uniqueOptions.has(maxVal.toString())) {
      uniqueOptions.set(maxVal.toString(), { text: maxVal.toString(), isCorrect: false });
    }

    // Distractor 3: The Sum (Forgot to divide)
    if (!uniqueOptions.has(roundedSum.toString())) {
      uniqueOptions.set(roundedSum.toString(), { text: roundedSum.toString(), isCorrect: false });
    }

    // Fill remaining spots with plausible offsets if we had collisions
    while (uniqueOptions.size < 4) {
      const offset = getRandomInt(-10, 10);
      const fake = roundedMean + offset;
      if (fake > 0 && !uniqueOptions.has(fake.toString())) {
        uniqueOptions.set(fake.toString(), { text: fake.toString(), isCorrect: false });
      }
    }

    const shuffledOptions = shuffle(Array.from(uniqueOptions.values())).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The table above lists the land areas, in square kilometers, of ${count} countries. What is the mean land area of these countries, to the nearest square kilometer?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: roundedMean.toString(),
      explanation: `Choice ${correctOption.letter} is correct. To find the mean land area, sum the areas of the ${count} countries and divide by ${count}.
      <br/><br/>
      Sum = ${tableData.map(d => d.area).join(' + ')} = ${parseFloat(sum.toFixed(2))}
      <br/>
      Mean = ${parseFloat(sum.toFixed(2))} / ${count} ≈ ${mean.toFixed(2)}
      <br/><br/>
      Rounding ${mean.toFixed(2)} to the nearest square kilometer gives ${roundedMean}.`
    };
  }
};