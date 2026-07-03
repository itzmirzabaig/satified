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
    const earthWeight = 100;
    const denominator = 10;
    // earthWeight / denominator is exactly 10, so all weights are integers.
    // Multiply by the integer factor (not the fraction) to avoid float artifacts.
    const factor = earthWeight / denominator; // 10

    const venusNum = getRandomInt(8, 12);
    const jupiterNum = getRandomInt(venusNum + 5, venusNum + 15);

    const venusWeight = venusNum * factor;       // 80..120
    const jupiterWeight = jupiterNum * factor;    // 130..270
    const weightDifference = (jupiterNum - venusNum) * factor; // 50..150

    // Distractors, all provably distinct from the answer and from each other:
    //  - venusWeight: picked Venus's weight instead of the difference. Collides
    //    with the difference only when jupiterNum === 2*venusNum, so it is
    //    guarded below with a bounded near-miss fallback.
    //  - jupiterWeight: picked Jupiter's weight. jupiterWeight === difference
    //    would need venusNum === 0 (impossible), so it never collides.
    //  - venusWeight + jupiterWeight: added the two weights instead of
    //    subtracting. Equals venusWeight/jupiterWeight/difference only if a
    //    weight is 0 (impossible), so it never collides.
    const distractor3 = jupiterWeight;
    const sumTrap = venusWeight + jupiterWeight;

    let d1 = venusWeight;
    let d1tries = 0;
    while ((d1 === weightDifference || d1 === distractor3 || d1 === sumTrap) && d1tries++ < 50) {
      d1 = venusWeight - getRandomInt(1, 9); // stays >= 71 since venusWeight >= 80
    }

    const optionsData = [
      { text: d1.toString(), isCorrect: false, reason: d1 === venusWeight ? "This is the weight of the object on Venus, not the difference between the two planets." : "This results from a calculation error and is not the difference between the two weights." },
      { text: sumTrap.toString(), isCorrect: false, reason: "This adds the two weights together instead of subtracting to find the difference." },
      { text: weightDifference.toString(), isCorrect: true, reason: null },
      { text: distractor3.toString(), isCorrect: false, reason: "This is the weight of the object on Jupiter, not the difference between the two planets." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `First, find the weight of the object on Venus. The object weighs ${earthWeight} pounds on Earth, so its weight on Venus is $${venusNum}/${denominator} \\times ${earthWeight} = ${venusWeight}$ pounds. Next, find the weight on Jupiter: $${jupiterNum}/${denominator} \\times ${earthWeight} = ${jupiterWeight}$ pounds. Finally, subtract the weight on Venus from the weight on Jupiter: $${jupiterWeight} - ${venusWeight} = ${weightDifference}$ pounds. Therefore, the object weighs ${weightDifference} pounds more on Jupiter than on Venus. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}`;

    return {
      questionText: `The weight of an object on Venus is approximately $${venusNum}/${denominator}$ of its weight on Earth. The weight of an object on Jupiter is approximately $${jupiterNum}/${denominator}$ of its weight on Earth. If an object weighs ${earthWeight} pounds on Earth, approximately how many more pounds does it weigh on Jupiter than it weighs on Venus?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: weightDifference.toString(),
      explanation: explanation
    };
  }
};
