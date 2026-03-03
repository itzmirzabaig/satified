import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f04d40b2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [population: 50,000 (large), sample: 1,000 (moderate), percent: 35% (clean), margin: 3% (clean)]
 * - Difficulty factors: [Scaling sample proportion to population, large number multiplication]
 * - Distractor patterns: [A=35% of sample, B=65% of sample (complement), D=wrong calculation]
 * - Constraints: [Must calculate population proportion: (percent/100) * total_population]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_f04d40b2 = {
  metadata: {
    // id: "f04d40b2",
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
    // Estimated percentage: 25-55% range (clean multiples of 5)
    const estimatedPercent = getRandomInt(5, 11) * 5;
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
    const percentOfSample = Math.round((estimatedPercent / 100) * sampleSize);
    const complementPercent = 100 - estimatedPercent;
    const complementCount = Math.round((complementPercent / 100) * populationSize);
    const wrongHighCount = Math.round(((estimatedPercent + 20) / 100) * populationSize);
    
    // Generate one plausible value within range
    const plausibleValue = getRandomInt(lowerCount + 100, upperCount - 100);
    
    // STEP 2: Create options with tracking
    const correctText = plausibleValue.toLocaleString();
    
    const optionsData = [
      { 
        text: percentOfSample.toLocaleString(), 
        isCorrect: false,
        reason: "calculates percentage of the sample size instead of the total population"
      },
      { 
        text: complementCount.toLocaleString(), 
        isCorrect: false,
        reason: "calculates the complement percentage of the population"
      },
      { 
        text: correctText, 
        isCorrect: true,
        reason: "falls within the calculated confidence interval for the population"
      },
      { 
        text: wrongHighCount.toLocaleString(), 
        isCorrect: false,
        reason: "falls well outside the plausible range"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `From a population of ${populationSize.toLocaleString()} people, ${sampleSize.toLocaleString()} were chosen at random and surveyed about a ${topic.issue}. Based on the survey, it is estimated that ${estimatedPercent}% of people in the population ${topic.support}, with an associated margin of error of ${marginOfError}%. Based on these results, which of the following is a plausible value for the total number of people in the population who ${topic.support}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Based on the survey results, the estimated percentage of people in the population who ${topic.support} is ${estimatedPercent}%, with a margin of error of ${marginOfError}%. This means the true percentage of supporters in the population is likely between ${estimatedPercent}% - ${marginOfError}% = ${lowerPercent}% and ${estimatedPercent}% + ${marginOfError}% = ${upperPercent}%.\n\nTo find the plausible range for the total number of people who ${topic.support}, we calculate these percentages of the total population (${populationSize.toLocaleString()}):\n\nLower bound: ${lowerPercent}% of ${populationSize.toLocaleString()} = 0.${lowerPercent} × ${populationSize.toLocaleString()} = ${lowerCount.toLocaleString()}\nUpper bound: ${upperPercent}% of ${populationSize.toLocaleString()} = 0.${upperPercent} × ${populationSize.toLocaleString()} = ${upperCount.toLocaleString()}\n\nTherefore, a plausible value for the total number of people who ${topic.support} is between ${lowerCount.toLocaleString()} and ${upperCount.toLocaleString()}.\n\nChoice ${incorrectOptions[0].letter} (${percentOfSample.toLocaleString()}): This is far below the range. It looks like ${estimatedPercent}% of the sample size (${sampleSize.toLocaleString()}), but the question asks about the total population.\n\nChoice ${incorrectOptions[1].letter} (${complementCount.toLocaleString()}): This is far below the range and represents those who do NOT ${topic.support}.\n\nChoice ${correctLetter} (${correctText}): This value falls within the calculated range of ${lowerCount.toLocaleString()} to ${upperCount.toLocaleString()}.\n\nChoice ${incorrectOptions[2].letter} (${wrongHighCount.toLocaleString()}): This is far above the range.`
    };
  }
};

/**
 * Question ID: 4096a482
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [estimated mean: 20.5 (decimal), margin: 1 (whole number)]
 * - Difficulty factors: [Basic confidence interval interpretation, understanding "plausible" vs "possible" vs "exact"]
 * - Distractor patterns: [B=confuse plausible with impossible outside range, C=apply to individual values not mean, D=claim exact value known]
 * - Constraints: [Simple arithmetic: mean ± 1]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

// File: generators/inference-from-sample-statistics-and-margin-of-error/4096a482.ts