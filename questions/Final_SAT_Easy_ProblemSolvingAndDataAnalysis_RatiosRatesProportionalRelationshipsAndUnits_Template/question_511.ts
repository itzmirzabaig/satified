import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 511
*
* ORIGINAL ANALYSIS:
* - Number ranges: [area: 131 sq miles (triple-digit), population: 2358 (4-digit), answer: 18 (double-digit)]
* - Difficulty factors: [Population density formula, division]
* - Distractor patterns: [A: 18 (correct), B: 131 (just the area), C: 149 (random), D: 2376 (pop + 18)]
* - Constraints: [population divisible by area for integer density]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_511 = {
  metadata: {
    id: "511",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const density = getRandomInt(15, 30);
    const area = getRandomInt(100, 150);
    const population = density * area;
    const calculatedDensity = population / area;

    const distractorArea = area;
    const distractorRandom = area + getRandomInt(10, 25);
    const distractorAdd = population + calculatedDensity;

    const optionsData = [
      { text: calculatedDensity.toString(), isCorrect: true, reason: null },
      { text: distractorArea.toString(), isCorrect: false, reason: "This is just the area, not the density." },
      { text: distractorRandom.toString(), isCorrect: false, reason: "This is not the correct quotient; it looks like a random distractor or miscalculation." },
      { text: distractorAdd.toString(), isCorrect: false, reason: "This is close to the total population plus the density, which is an incorrect operation. It could also just be a number near the total population." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To find the population density, you divide the total population by the area.\\n$$\\text{Population Density} = \\frac{\\text{Number of Raccoons}}{\\text{Area in Square Miles}}$$\\n$$\\text{Population Density} = \\frac{${population}}{${area}}$$\\n$$\\text{Population Density} = ${calculatedDensity}$$\\n\\nTherefore, the estimated population density is $${calculatedDensity}$ raccoons per square mile.\\n\\nWhy other options are incorrect:\\nChoice ${incorrectOptions[0].letter}: ${incorrectOptions[0].reason}\\nChoice ${incorrectOptions[1].letter}: ${incorrectOptions[1].reason}\\nChoice ${incorrectOptions[2].letter}: ${incorrectOptions[2].reason}`;

    return {
      questionText: `The number of raccoons in a $${area}$-square-mile area is estimated to be $${population.toLocaleString()}$. What is the estimated population density, in raccoons per square mile, of this area?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: calculatedDensity.toString(),
      explanation: explanation
    };
  }
};
