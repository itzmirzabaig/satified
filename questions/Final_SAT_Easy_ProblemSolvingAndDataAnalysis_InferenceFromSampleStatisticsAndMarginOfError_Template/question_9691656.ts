import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9691656
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [20 sample, 400 total, 16 successes (clean ratio 4/5)]
 * - Difficulty factors: [Proportion calculation with clean fraction]
 * - Distractor patterns: A is 4 (sample difference), B is Correct (400 × 4/5), C is 380 (total minus sample), D is 384 (total minus successes)
 * - Constraints: [Ratio should simplify to clean fraction for easy mental math]
 * - Question type: [Proportion→Multiple Choice Text]
 * - Figure generation: [None - calculation-based question]
 */

export const generator_9691656 = {
  metadata: {
    // id: "9691656",
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

    const selectorTypes = ["Scott", "Alex", "Jordan", "Taylor"];
    const selector = getRandomElement(selectorTypes);
    const groupTypes = ["employees", "workers", "staff members", "team members"];
    const group = getRandomElement(groupTypes);
    const orgTypes = ["company", "firm", "organization", "business"];
    const org = getRandomElement(orgTypes);
    const activityTypes = [
      { activity: "enrolled in exactly three professional development courses", descriptor: "enrolled" },
      { activity: "completed at least two training modules", descriptor: "completed" },
      { activity: "participating in the mentorship program", descriptor: "participating" }
    ];
    const activity = getRandomElement(activityTypes);

    const distractorA = sampleSize - successesInSample;
    const distractorC = totalPopulation - sampleSize;
    const distractorD = totalPopulation - successesInSample;

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "is just the difference between the sample size and the number found" },
      { text: `${correctAnswer}`, isCorrect: true },
      { text: `${distractorC}`, isCorrect: false, reason: "subtracts the sample size from the total, which is unrelated" },
      { text: `${distractorD}`, isCorrect: false, reason: "subtracts the number found from the total, which uses incorrect logic" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The sample proportion is $\\frac{${successesInSample}}{${sampleSize}}$. Multiply by the total: $${totalPopulation} \\times \\frac{${successesInSample}}{${sampleSize}} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `${selector} selected $${sampleSize}$ ${group} at random from all $${totalPopulation}$ ${group} at a ${org}. ${selector} found that $${successesInSample}$ of the ${group} in this sample are ${activity.activity} this year. Based on ${selector}'s findings, which of the following is the best estimate of the number of ${group} at the ${org} who are ${activity.activity} this year?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 6a305cd0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [37 mean (double-digit), 3 margin (single-digit)]
 * - Difficulty factors: [Margin of error creates interval, directional interpretation]
 * - Distractor patterns: A is Less than 37, B is Greater than 37, C is Between 34 and 40 (correct), D is Outside interval
 * - Constraints: [Margin should be small enough that interval is tight, clean integer bounds]
 * - Question type: [Margin of error→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */