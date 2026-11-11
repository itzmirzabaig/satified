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

    // Before: one choice was area + a random offset ("a random distractor"),
    // another was population + density, and the explanation was built with
    // literal "\n" text so it rendered as one italic math line. The stem also
    // said "131-square-mile" and wrote 2,358 inside math. Each wrong choice
    // is now a real slip: the area itself, or adding/subtracting the area
    // instead of dividing by it.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const fmtMath = (n: number) => fmt(n).replace(/,/g, '{,}');
    const distractorArea = area;
    const distractorSub = population - area;
    const distractorAdd = population + area;

    const optionsData = [
      { text: calculatedDensity.toString(), isCorrect: true, reason: '' },
      { text: distractorArea.toString(), isCorrect: false, reason: `${distractorArea} is the area in square miles, not the number of raccoons per square mile` },
      { text: fmt(distractorSub), isCorrect: false, reason: `${fmt(distractorSub)} results from subtracting the area from the number of raccoons instead of dividing by it` },
      { text: fmt(distractorAdd), isCorrect: false, reason: `${fmt(distractorAdd)} results from adding the area to the number of raccoons instead of dividing by it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Population density is the number of raccoons divided by the area in square miles. So the estimated population density is $\\frac{${fmtMath(population)}}{${area}} = ${calculatedDensity}$ raccoons per square mile. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The number of raccoons in an area of ${area} square miles is estimated to be ${fmt(population)}. What is the estimated population density, in raccoons per square mile, of this area?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: calculatedDensity.toString(),
      explanation: explanation
    };
  }
};
