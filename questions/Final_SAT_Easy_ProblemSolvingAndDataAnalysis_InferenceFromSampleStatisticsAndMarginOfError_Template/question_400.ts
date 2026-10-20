import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 400
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [20 sample, 400 total, 16 successes (clean ratio 4/5)]
 * - Difficulty factors: [Proportion calculation with clean fraction]
 * - Distractor patterns: A is 4 (sample difference), B is Correct (400 × 4/5), C is 380 (total minus sample), D is 384 (total minus successes)
 * - Constraints: [Ratio should simplify to clean fraction for easy mental math]
 * - Question type: [Proportion→Multiple Choice Text]
 * - Figure generation: [None - calculation-based question]
 */

export const generator_400 = {
  metadata: {
    id: "400",
    assessment: "SAT",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratios = [
      { num: 3, den: 4 },
      { num: 4, den: 5 },
      { num: 2, den: 3 },
      { num: 3, den: 5 }
    ];
    const ratio = getRandomElement(ratios);
    const sampleSize = ratio.den * getRandomInt(4, 6);
    const successesInSample = ratio.num * (sampleSize / ratio.den);
    const scaleFactor = getRandomInt(15, 25);
    const totalPopulation = sampleSize * scaleFactor;
    const correctAnswer = (successesInSample / sampleSize) * totalPopulation;

    const groupTypes = ["employees", "workers", "staff members", "team members"];
    const group = getRandomElement(groupTypes);
    const orgTypes = ["company", "firm", "organization", "business"];
    const org = getRandomElement(orgTypes);
    // Full predicates; the old text read "are completed at least two
    // training modules".
    const activityTypes = [
      "are enrolled in exactly three professional development courses",
      "have completed at least two training modules",
      "are participating in the mentorship program"
    ];
    const activity = getRandomElement(activityTypes);

    const distractorA = sampleSize - successesInSample;
    const distractorC = totalPopulation - sampleSize;
    const distractorD = totalPopulation - successesInSample;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: `${distractorA} is the number of ${group} in the sample who do not fit the description, $${sampleSize} - ${successesInSample}$; it is not an estimate for the whole ${org}` },
      { text: `${correctAnswer}`, isCorrect: true, reason: '' },
      { text: `${distractorC}`, isCorrect: false, reason: `${distractorC} is the number of ${group} who were not in the sample, $${totalPopulation} - ${sampleSize}$, not an estimate based on the sample proportion` },
      { text: `${distractorD}`, isCorrect: false, reason: `it results from subtracting the ${successesInSample} ${group} in the sample from the total, $${totalPopulation} - ${successesInSample}$, instead of applying the sample proportion to the total` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Since the sample was selected at random, the proportion of ${group} in the sample who fit the description, $\\frac{${successesInSample}}{${sampleSize}}$, is a good estimate of the proportion for all ${group} at the ${org}. Multiplying this proportion by the total number of ${group} gives $\\frac{${successesInSample}}{${sampleSize}}(${totalPopulation}) = ${correctAnswer}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A manager selected $${sampleSize}$ ${group} at random from all $${totalPopulation}$ ${group} at ${/^[aeiou]/i.test(org) ? "an" : "a"} ${org}. They found that $${successesInSample}$ of the ${group} in this sample ${activity} this year. Based on these findings, which of the following is the best estimate of the number of ${group} at the ${org} who ${activity} this year?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
