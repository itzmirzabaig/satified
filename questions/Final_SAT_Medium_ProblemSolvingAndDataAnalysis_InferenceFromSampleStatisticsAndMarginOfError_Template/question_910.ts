import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 910
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [population: 50,000 (large), sample: 1,000 (moderate), percent: 35% (clean), margin: 3% (clean)]
 * - Difficulty factors: [Scaling sample proportion to population, large number multiplication]
 * - Distractor patterns: [A=35% of sample, B=65% of sample (complement), D=wrong calculation]
 * - Constraints: [Must calculate population proportion: (percent/100) * total_population]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_910 = {
  metadata: {
    id: "910",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Population size: large (30,000 to 80,000)
    const populationSize = getRandomInt(30, 80) * 1000;
    // Sample size: moderate (500 to 2,000)
    const sampleSize = getRandomInt(5, 20) * 100;
    // Estimated percentage: clean multiples of 5 in 25-55%.
    // Exclude 40 and 50: at 50% the complement (also 50%) is itself a plausible
    // value, and at 40% the complement (60%) equals the "+20 points" distractor
    // (60%). Both would make a distractor collide with the answer/another
    // distractor, so we draw only from percentages that keep all four distinct.
    const estimatedPercent = getRandomElement([25, 30, 35, 45, 55]);
    // Margin of error: 2-5%
    const marginOfError = getRandomInt(2, 5);
    // Topic
    const topics = [
      { issue: "proposed piece of legislation", support: "support the legislation" },
      { issue: "new school funding measure", support: "favor the measure" },
      { issue: "proposed park renovation", support: "approve the renovation" },
      { issue: "community center expansion", support: "support the expansion" }
    ];
    const topic = getRandomElement(topics);

    // Calculate confidence interval bounds
    const lowerPercent = estimatedPercent - marginOfError;
    const upperPercent = estimatedPercent + marginOfError;

    // Calculate plausible range for total supporters
    const lowerCount = Math.round((lowerPercent / 100) * populationSize);
    const upperCount = Math.round((upperPercent / 100) * populationSize);

    // Calculate distractor values
    // A: applies the percentage to the SAMPLE (much too small).
    const percentOfSample = Math.round((estimatedPercent / 100) * sampleSize);
    // B: the COMPLEMENT of the population (those who do NOT support). Because
    // estimatedPercent is never 50, this is always outside the plausible range.
    const complementPercent = 100 - estimatedPercent;
    const complementCount = Math.round((complementPercent / 100) * populationSize);
    // C: applies a percentage 20 points too high (well above the range).
    const wrongHighCount = Math.round(((estimatedPercent + 20) / 100) * populationSize);

    // Correct answer: a value strictly inside the plausible interval. Guard it
    // against every fixed distractor with a bounded retry so no two options can
    // ever match (bounded per HOUSE_STYLE rule 4).
    let plausibleValue = getRandomInt(lowerCount + 100, upperCount - 100);
    let tries = 0;
    while (
      (plausibleValue === percentOfSample ||
        plausibleValue === complementCount ||
        plausibleValue === wrongHighCount) &&
      tries++ < 50
    ) {
      plausibleValue = getRandomInt(lowerCount + 100, upperCount - 100);
    }

    // STEP 2: Create options with tracking
    const correctText = plausibleValue.toLocaleString();

    const optionsData = [
      {
        text: percentOfSample.toLocaleString(),
        isCorrect: false,
        kind: "sample" as const
      },
      {
        text: complementCount.toLocaleString(),
        isCorrect: false,
        kind: "complement" as const
      },
      {
        text: correctText,
        isCorrect: true,
        kind: "correct" as const
      },
      {
        text: wrongHighCount.toLocaleString(),
        isCorrect: false,
        kind: "high" as const
      }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    // Pull each distractor's letter by its KIND (not by position) so the
    // explanation always pairs the right letter with the right value.
    const sampleLetter = shuffledOptions.find(o => o.kind === "sample")!.letter;
    const complementLetter = shuffledOptions.find(o => o.kind === "complement")!.letter;
    const highLetter = shuffledOptions.find(o => o.kind === "high")!.letter;

    // STEP 4: Return question data
    return {
      questionText: `From a population of ${populationSize.toLocaleString()} people, ${sampleSize.toLocaleString()} were chosen at random and surveyed about a ${topic.issue}. Based on the survey, it is estimated that ${estimatedPercent}% of people in the population ${topic.support}, with an associated margin of error of ${marginOfError}%. Based on these results, which of the following is a plausible value for the total number of people in the population who ${topic.support}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Based on the survey results, the estimated percentage of people in the population who ${topic.support} is ${estimatedPercent}%, with a margin of error of ${marginOfError}%. This means the true percentage of supporters in the population is likely between ${estimatedPercent}% - ${marginOfError}% = ${lowerPercent}% and ${estimatedPercent}% + ${marginOfError}% = ${upperPercent}%.\n\nTo find the plausible range for the total number of people who ${topic.support}, we apply these percentages to the total population (${populationSize.toLocaleString()}):\n\nLower bound: ${lowerPercent}% of ${populationSize.toLocaleString()} = ${(lowerPercent / 100).toFixed(2)} × ${populationSize.toLocaleString()} = ${lowerCount.toLocaleString()}\nUpper bound: ${upperPercent}% of ${populationSize.toLocaleString()} = ${(upperPercent / 100).toFixed(2)} × ${populationSize.toLocaleString()} = ${upperCount.toLocaleString()}\n\nTherefore, any plausible value for the total number of people who ${topic.support} must be between ${lowerCount.toLocaleString()} and ${upperCount.toLocaleString()}, and Choice ${correctLetter} (${correctText}) falls within this range.\n\nChoice ${sampleLetter} (${percentOfSample.toLocaleString()}): This applies ${estimatedPercent}% to the sample size (${sampleSize.toLocaleString()}) instead of the total population, so it is far too small.\n\nChoice ${complementLetter} (${complementCount.toLocaleString()}): This is ${complementPercent}% of the population, the number who do NOT ${topic.support}, so it lies outside the range.\n\nChoice ${highLetter} (${wrongHighCount.toLocaleString()}): This applies ${estimatedPercent + 20}% of the population, which is well above the plausible range.`
    };
  }
};
