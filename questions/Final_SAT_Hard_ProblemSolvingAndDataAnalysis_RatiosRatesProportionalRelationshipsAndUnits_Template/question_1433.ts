import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1433
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [88x ounces in 5y minutes, find for 9y minutes]
 * - Difficulty factors: [Proportion with abstract variables, cross-multiplication]
 * - Distractor patterns: [9x/440: inverted/wrong, 440x/9: wrong operation, 5x/792: wrong]
 * - Constraints: [Rate = 88x/5y, new amount = rate × 9y = (88x/5y) × 9y = 792x/5]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_1433 = {
  metadata: {
    id: "1433",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate coefficients.
    // time2 must be strictly greater than time1 so the question asks about a
    // DIFFERENT (longer) window than the one given — otherwise the problem is
    // degenerate (the answer would just be the stated expression). Keeping the
    // two windows distinct also guarantees the four option strings below never
    // collide, so no random filler distractor is ever needed.
    const rateNum = getRandomInt(60, 100); // 88 in original
    const time1 = getRandomInt(3, 7); // 5 in original
    const time2 = time1 + getRandomInt(1, 5); // 9 in original; always > time1

    // STEP 2: Calculate answer
    // Rate = rateNum × x / (time1 × y)
    // Amount in time2 × y = Rate × time2 × y = (rateNum × x / (time1 × y)) × time2 × y = rateNum × time2 × x / time1
    const numerator = rateNum * time2;
    const correctExpression = `\\frac{${numerator}x}{${time1}}`;

    // STEP 3: Distractors (each is a genuine wrong setup, never a random fill).
    // A: (rateNum × time1)/time2 — swaps the two time values in the answer.
    const distractorSwap = `\\frac{${rateNum * time1}x}{${time2}}`;
    // B: time1/(rateNum × time2) — reciprocal of the correct rate (inverted).
    const distractorInvert = `\\frac{${time1}x}{${rateNum * time2}}`;
    // C: time2/(rateNum × time1) — reciprocal of the swapped setup.
    const distractorRecipSwap = `\\frac{${time2}x}{${rateNum * time1}}`;

    // STEP 4: Create and shuffle options. Because time2 > time1 and
    // rateNum ≥ 60, these four fraction strings are always pairwise distinct
    // (verified exhaustively across the full range), so no dedup/filler is used.
    const optionsData = [
      { text: distractorSwap, isCorrect: false, reason: "results from swapping the time values in the calculation" },
      { text: distractorInvert, isCorrect: false, reason: "results from inverting the rate relationship" },
      { text: distractorRecipSwap, isCorrect: false, reason: "results from setting up the proportion incorrectly" },
      { text: correctExpression, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The rate is $\\frac{${rateNum}x}{${time1}y}$ ounces per minute. In ${time2}y minutes: $\\frac{${rateNum}x}{${time1}y} \\times ${time2}y = ${correctExpression}$ ounces. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `A landscaper uses a hose that puts $${rateNum}x$ ounces of water in a bucket in $${time1}y$ minutes. Which expression represents the number of ounces of water the hose puts in the bucket in $${time2}y$ minutes at this rate?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctExpression,
      explanation: explanation
    };
  }
};
