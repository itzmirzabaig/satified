import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 399
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total = sampleSize * scaleFactor, sampleSize 15-30, scaleFactor 2-4]
 * - Difficulty factors: [Proportion setup and solving, cross-multiplication]
 * - Distractor patterns: A is the sample supporter count, B is the scaled non-supporter
 *   count, C is Correct (supporters scaled to population), D uses the total population
 * - Constraints: [Sample divides evenly into population for a clean integer answer]
 * - Question type: [Proportion→Multiple Choice Text]
 * - Figure generation: [None - calculation-based question]
 */

export const generator_399 = {
  metadata: {
    id: "399",
    assessment: "SAT",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Answer-first, clean-integer construction. All four options are recomputed
    // until they are mutually distinct (bounded retry, no float artifacts).
    let sampleSize = 0;
    let scaleFactor = 0;
    let totalPopulation = 0;
    let supportersInSample = 0;
    let correctAnswer = 0;
    let distractorA = 0;
    let distractorB = 0;
    let distractorD = 0;

    let tries = 0;
    do {
      sampleSize = getRandomInt(15, 30);
      scaleFactor = getRandomInt(2, 4);
      totalPopulation = sampleSize * scaleFactor;
      const supporterRatio = getRandomInt(1, 3) / 5; // 0.2, 0.4, or 0.6
      supportersInSample = Math.round(sampleSize * supporterRatio);

      correctAnswer = supportersInSample * scaleFactor;          // supporters scaled to population
      distractorA = supportersInSample;                          // raw sample supporter count
      distractorB = (sampleSize - supportersInSample) * scaleFactor; // scaled NON-supporters
      distractorD = totalPopulation;                             // ignores the proportion
      tries++;
    } while (
      tries < 50 &&
      (supportersInSample < 1 ||
        new Set([correctAnswer, distractorA, distractorB, distractorD]).size !== 4)
    );

    const groupTypes = ["city council members", "state representatives", "school board members", "planning committee members"];
    const group = getRandomElement(groupTypes);
    const billTypes = ["specific bill", "new ordinance", "budget proposal", "zoning change"];
    const bill = getRandomElement(billTypes);
    const observerTypes = ["reporter", "analyst", "researcher", "pollster"];
    const observer = getRandomElement(observerTypes);

    const optionsData = [
      { text: `${distractorA}`, isCorrect: false, reason: "uses just the number of supporters in the sample without scaling up to the full population" },
      { text: `${distractorB}`, isCorrect: false, reason: "estimates the number who do not support the measure instead of those who do" },
      { text: `${correctAnswer}`, isCorrect: true },
      { text: `${distractorD}`, isCorrect: false, reason: "uses the total population instead of applying the sample proportion" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Set up a proportion using the sample rate: $\\frac{${supportersInSample}}{${sampleSize}} = \\frac{x}{${totalPopulation}}$. Solving gives $x = \\frac{${supportersInSample}}{${sampleSize}} \\times ${totalPopulation} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A city has $${totalPopulation}$ ${group}. A ${observer} polled a random sample of $${sampleSize}$ ${group} and found that $${supportersInSample}$ of those polled supported a ${bill}. Based on the sample, which of the following is the best estimate of the number of ${group} in the city who support the ${bill}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
