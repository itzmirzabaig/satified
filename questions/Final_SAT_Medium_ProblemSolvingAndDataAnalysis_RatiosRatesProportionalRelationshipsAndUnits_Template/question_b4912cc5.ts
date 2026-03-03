import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b4912cc5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 2.5 to 3.3, area: 100,250 (large fixed number)]
 * - Difficulty factors: [Population density calculation, difference calculation]
 * - Distractor patterns: [A: total population 2014, B: miscalculation, C: miscalculation]
 * - Constraints: [Area remains constant]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_b4912cc5 = {
  metadata: {
    // id: "b4912cc5",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Density values: single decimal, 1.0 to 9.0 range
    const density1Tenths = getRandomInt(12, 45); // 1.2 to 4.5
    const density1 = density1Tenths / 10;
    const densityIncrease = getRandomInt(4, 15); // 0.4 to 1.5 increase
    const density2 = density1 + (densityIncrease / 10);
    
    // Area: large number similar to 100,250
    const areaBase = getRandomInt(50, 150); // 50-150 thousand
    const area = areaBase * 1000 + getRandomInt(0, 999);
    
    // STEP 2: Calculate derived values
    const pop1990 = density1 * area;
    const pop2014 = density2 * area;
    const increase = pop2014 - pop1990;
    
    // Alternative: calculate directly via density difference
    const densityDiff = density2 - density1;
    const increaseDirect = densityDiff * area;
    
    // STEP 3: Create distractors
    // A: Total population in 2014
    const distractorA = Math.round(pop2014);
    // B: Random miscalculation
    const distractorB = Math.round(increase * 1.65); // Arbitrary wrong calculation
    // C: Another miscalculation (possibly division error)
    const distractorC = Math.round(increase * 1.56);
    
    const correctText = Math.round(increase).toLocaleString();
    
    const optionsData = [
      { text: distractorA.toLocaleString(), isCorrect: false, reason: "is the total population in 2014, not the increase" },
      { text: distractorB.toLocaleString(), isCorrect: false, reason: "results from conceptual or calculation errors" },
      { text: distractorC.toLocaleString(), isCorrect: false, reason: "results from conceptual or calculation errors" },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The population density of Iceland, in people per square kilometer of land area, increased from $${density1}$ in $1990$ to $${density2}$ in $2014$. During this time period, the land area of Iceland was $${area.toLocaleString()}$ square kilometers. By how many people did Iceland's population increase from $1990$ to $2014$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Population = Density × Area. Population in 1990: $${density1} \\times ${area.toLocaleString()} = ${Math.round(pop1990).toLocaleString()}$. Population in 2014: $${density2} \\times ${area.toLocaleString()} = ${Math.round(pop2014).toLocaleString()}$. Increase: $${Math.round(pop2014).toLocaleString()} - ${Math.round(pop1990).toLocaleString()} = ${correctText}$. Alternatively: $(${density2} - ${density1}) \\times ${area.toLocaleString()} = ${correctText}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 825b7490
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first ratio term: 140, second ratio term: m, equivalent ratio 4:28]
 * - Difficulty factors: [Ratio equivalence, solving for unknown in proportion]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/825b7490.ts