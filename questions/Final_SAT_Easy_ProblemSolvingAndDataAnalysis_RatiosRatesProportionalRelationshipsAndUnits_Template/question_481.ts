import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 481
*
* ORIGINAL ANALYSIS:
* - Number ranges: [density: 290 (triple-digit), population: 92800 (5-digit), answer: 320 (triple-digit)]
* - Difficulty factors: [Formula rearrangement, large number division]
* - Distractor patterns: [A: 102400 (random), B: 93090 (pop + density), C: 320 (correct), D: 32 (place value error)]
* - Constraints: [population must be divisible by density for integer area]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_481 = {
  metadata: {
    id: "481",
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

    const fmt = (n: number) => n.toLocaleString('en-US');
    const m = (n: number) => fmt(n).replace(/,/g, '{,}');

    // Wrong choices are real slips: density divided by population, the
    // density subtracted from the population, and the two multiplied. They
    // used to include a rounded number explained as "some other
    // miscalculation." The old explanation also printed literal "\n" text
    // and raw markdown.
    const inverse = String(+(density / population).toFixed(4));
    const optionsData = [
      { text: `${correctArea}`, isCorrect: true, reason: '' },
      { text: inverse, isCorrect: false, reason: `${inverse} is about the population density divided by the population, $\\frac{${density}}{${m(population)}}$; the population must be divided by the population density` },
      { text: fmt(population - density), isCorrect: false, reason: `${fmt(population - density)} results from subtracting the population density from the population instead of dividing` },
      { text: fmt(population * density), isCorrect: false, reason: `${fmt(population * density)} results from multiplying the population by the population density instead of dividing` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Population density is the population divided by the area: $\\text{population density} = \\frac{\\text{population}}{\\text{area}}$. So the area is the population divided by the population density: $\\frac{${m(population)}}{${density}} = ${correctArea}$. Worthington's area is ${correctArea} square miles. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The population density of Worthington is ${density} people per square mile. Worthington has a population of ${fmt(population)} people. What is the area, in square miles, of Worthington?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: `${correctArea}`,
      explanation: explanation
    };
  }
};
