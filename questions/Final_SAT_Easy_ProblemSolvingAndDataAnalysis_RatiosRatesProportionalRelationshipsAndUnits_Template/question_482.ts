import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 482
*
* ORIGINAL ANALYSIS:
* - Number ranges: [Venus: 9/10, Jupiter: 23/10, Earth: 100 lbs, answer: 140 lbs]
* - Difficulty factors: [Fraction multiplication, subtraction of weights]
* - Distractor patterns: [A: 90 (Venus weight), B: 111 (random), C: 140 (correct), D: 230 (Jupiter weight)]
* - Constraints: [Fractions must multiply cleanly with 100]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_482 = {
  metadata: {
    id: "482",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Real surface gravity, to the nearest tenth of Earth's (Jupiter uses the
    // official question's 23/10). The fractions used to be random, so the
    // question could claim an object weighs 12/10 as much on Venus.
    const heavy = [
      { name: 'Jupiter', num: 23 },
      { name: 'Saturn', num: 11 },
      { name: 'Neptune', num: 11 }
    ];
    const light = [
      { name: 'Venus', num: 9 },
      { name: 'Mars', num: 4 },
      { name: 'Mercury', num: 4 }
    ];
    const denominator = 10;
    let h = heavy[0], l = light[0], earthWeight = 100;
    let lightWeight = 0, heavyWeight = 0, weightDifference = 0;
    do {
      h = heavy[getRandomInt(0, 2)];
      l = light[getRandomInt(0, 2)];
      // A multiple of 10, so every weight is a whole number.
      earthWeight = 10 * getRandomInt(5, 20);
      lightWeight = (l.num * earthWeight) / denominator;
      heavyWeight = (h.num * earthWeight) / denominator;
      weightDifference = heavyWeight - lightWeight;
    } while (new Set([weightDifference, lightWeight, heavyWeight, lightWeight + heavyWeight]).size < 4);

    // Wrong choices: the weight on each planet and the sum of the two. The
    // first used to be nudged by a random amount when it collided, with the
    // reason "a calculation error."
    const optionsData = [
      { text: `${weightDifference}`, isCorrect: true, reason: '' },
      { text: `${lightWeight}`, isCorrect: false, reason: `${lightWeight} pounds is the object's weight on ${l.name}, not how much more it weighs on ${h.name}` },
      { text: `${heavyWeight}`, isCorrect: false, reason: `${heavyWeight} pounds is the object's weight on ${h.name}, not how much more it weighs there than on ${l.name}` },
      { text: `${lightWeight + heavyWeight}`, isCorrect: false, reason: `${lightWeight + heavyWeight} results from adding the two weights instead of subtracting` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The object weighs ${earthWeight} pounds on Earth, so its weight on ${l.name} is approximately $\\frac{${l.num}}{${denominator}} \\times ${earthWeight} = ${lightWeight}$ pounds, and its weight on ${h.name} is approximately $\\frac{${h.num}}{${denominator}} \\times ${earthWeight} = ${heavyWeight}$ pounds. The difference is $${heavyWeight} - ${lightWeight} = ${weightDifference}$, so the object weighs approximately ${weightDifference} more pounds on ${h.name} than on ${l.name}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The weight of an object on ${l.name} is approximately $\\frac{${l.num}}{${denominator}}$ of its weight on Earth. The weight of an object on ${h.name} is approximately $\\frac{${h.num}}{${denominator}}$ of its weight on Earth. If an object weighs ${earthWeight} pounds on Earth, approximately how many more pounds does it weigh on ${h.name} than it weighs on ${l.name}?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: `${weightDifference}`,
      explanation: explanation
    };
  }
};
