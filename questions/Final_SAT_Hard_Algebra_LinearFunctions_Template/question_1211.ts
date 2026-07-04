import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1211
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first 25: $21, additional: $14, n >= 25]
 * - Difficulty factors: [Piecewise pricing, function simplification]
 * - Distractor patterns: [B: added without subtracting, C: wrong structure, D: wrong base]
 * - Constraints: [f(n) = 21*25 + 14(n-25) = 14n + 175]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1211 = {
  metadata: {
    id: "1211",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES).
    // Tiered pricing is only realistic when the per-person rate for the first
    // block is HIGHER than the rate for additional people (as in the original
    // $21 / $14 example). Enforcing additionalRate < firstRate also guarantees a
    // strictly positive intercept, so the simplified form never renders "+ -k".
    // A bounded retry then guarantees all four options are distinct (the only
    // collision is distractor D == correct when intercept == firstRate, i.e.
    // threshold*(firstRate - additionalRate) == firstRate).
    let threshold = 0;
    let firstRate = 0;
    let additionalRate = 0;
    let baseCost = 0;
    let slope = 0;
    let intercept = 0;
    let distractorB = '';
    let distractorC = '';
    let distractorD = '';
    let correctBody = '';

    let tries = 0;
    do {
      threshold = getRandomInt(15, 35); // group-size threshold (the first "25")
      firstRate = getRandomInt(16, 30); // $/person for the first block (higher tier)
      additionalRate = getRandomInt(10, firstRate - 1); // $/additional person (< firstRate)

      baseCost = firstRate * threshold;

      // STEP 2: Calculate simplified form
      // f(n) = baseCost + additionalRate(n - threshold)
      //      = additionalRate*n + (baseCost - additionalRate*threshold)
      slope = additionalRate;
      intercept = baseCost - additionalRate * threshold; // > 0 since firstRate > additionalRate

      // STEP 3: Create distractors
      distractorB = `${additionalRate}n + ${baseCost}`;
      distractorC = `${firstRate + additionalRate}n - ${additionalRate * threshold}`;
      distractorD = `${additionalRate}n + ${firstRate}`;
      correctBody = `${slope}n + ${intercept}`;

      // Guard: every option must be a distinct string as MATH (no distractor may
      // equal the correct answer or another distractor for this draw).
    } while (
      new Set([correctBody, distractorB, distractorC, distractorD]).size !== 4 &&
      tries++ < 50
    );

    const correctText = `$f(n) = ${correctBody}$`;
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$f(n) = ${distractorB}$`, isCorrect: false, reason: `incorrectly adds the base cost without subtracting the cost for the first ${threshold} people from the variable part` },
      { text: `$f(n) = ${distractorC}$`, isCorrect: false, reason: `doesn't follow the structure of the problem's pricing model` },
      { text: `$f(n) = ${distractorD}$`, isCorrect: false, reason: `suggests a base fee of \\$${firstRate} plus \\$${additionalRate} per person, ignoring the higher rate for the first ${threshold} people` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      // Fixed: Escape currency dollar signs with \$
      questionText: `For groups of ${threshold} or more people, a museum charges \\$${firstRate} per person for the first ${threshold} people and \\$${additionalRate} for each additional person. Which function $f$ gives the total charge, in dollars, for a tour group with $n$ people, where $n \\ge ${threshold}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The cost for the first ${threshold} people is $${threshold} \\times ${firstRate} = ${baseCost}$. The additional people cost \\$${additionalRate}$(n - ${threshold})$. Total: $f(n) = ${baseCost} + ${additionalRate}(n - ${threshold}) = ${baseCost} + ${additionalRate}n - ${additionalRate * threshold} = ${additionalRate}n + ${intercept}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};