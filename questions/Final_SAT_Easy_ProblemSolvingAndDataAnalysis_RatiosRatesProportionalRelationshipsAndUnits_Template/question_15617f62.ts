import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 15617f62
*
* ORIGINAL ANALYSIS:
* - Number ranges: [density: 290 (triple-digit), population: 92800 (5-digit), answer: 320 (triple-digit)]
* - Difficulty factors: [Formula rearrangement, large number division]
* - Distractor patterns: [A: 102400 (random), B: 93090 (pop + density), C: 320 (correct), D: 32 (place value error)]
* - Constraints: [population must be divisible by density for integer area]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_15617f62 = {
  metadata: {
    // id: "15617f62",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const area = getRandomInt(200, 400);
    const density = getRandomInt(200, 400);
    const population = area * density;
    const correctArea = population / density;

    const distractorAdd = population + density;
    const distractorPlaceValue = area / 10;
    const distractorRandom = Math.round(population / 1000) * 10;

    const optionsData = [
      { text: distractorRandom.toString(), isCorrect: false, reason: "Incorrect. This number likely results from adding the population and density or some other miscalculation unrelated to the correct formula." },
      { text: distractorAdd.toString(), isCorrect: false, reason: "Incorrect. This is the result of adding the population and the population density." },
      { text: correctArea.toString(), isCorrect: true, reason: null },
      { text: distractorPlaceValue.toString(), isCorrect: false, reason: "Incorrect. This is likely a place value error, resulting from dividing incorrectly (e.g., missing a zero in the calculation)." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `The problem asks for the area of Worthington in square miles given the population and population density.\\n\\n1. **Understand the relationship between Population Density, Population, and Area.**\\n The formula for population density is:\\n $$ \\text{Population Density} = \\frac{\\text{Population}}{\\text{Area}} $$\\n\\n2. **Identify the known values from the problem.**\\n * Population Density = $${density}$ people per square mile\\n * Population = $${population.toLocaleString()}$ people\\n\\n3. **Set up the equation.**\\n $$ ${density} = \\frac{${population}}{\\text{Area}} $$\\n\\n4. **Solve for Area.**\\n To isolate \"Area\", multiply both sides by \"Area\" and then divide by $${density}$.\\n $$ \\text{Area} \\times ${density} = ${population} $$\\n $$ \\text{Area} = \\frac{${population}}{${density}} $$\\n\\n5. **Calculate the value.**\\n $$ \\frac{${population}}{${density}} = ${correctArea} $$\\n\\n So, the area is $${correctArea}$ square miles.\\n\\n**Analysis of Options:**\\n* **Choice ${incorrectOptions[0].letter} ($${incorrectOptions[0].text}$):** ${incorrectOptions[0].reason}\\n* **Choice ${incorrectOptions[1].letter} ($${incorrectOptions[1].text}$):** ${incorrectOptions[1].reason}\\n* **Choice ${incorrectOptions[2].letter} ($${incorrectOptions[2].text}$):** ${incorrectOptions[2].reason}`;

    return {
      questionText: `The population density of Worthington is $${density}$ people per square mile. Worthington has a population of $${population.toLocaleString()}$ people. What is the area, in square miles, of Worthington?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctArea.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: be35c117
*
* ORIGINAL ANALYSIS:
* - Number ranges: [revolutions: 900 (triple-digit), minutes: 50 (double-digit), answer: 18 (double-digit)]
* - Difficulty factors: [Rate calculation, division]
* - Distractor patterns: [A: 18 (correct), B: 850 (900-50, subtraction), C: 950 (900+50, addition), D: 1400 (random)]
* - Constraints: [revolutions divisible by minutes for integer rate]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
