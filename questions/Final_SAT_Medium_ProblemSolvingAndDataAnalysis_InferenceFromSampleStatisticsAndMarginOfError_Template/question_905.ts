import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 905
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 80 (double-digit), sample count: 20 (clean fraction), total: 1,500 (triple-digit)]
 * - Difficulty factors: [Sample proportion scaling, avoiding "exact" claims with estimates]
 * - Distractor patterns: [A=75 (calculation error: 20/80 * 300), B=exact claim with wrong calc, C=estimate but wrong calc]
 * - Constraints: [Must calculate: (sample count/sample size) * total population]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_905 = {
  metadata: {
    id: "905",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES).
    // Constraints enforced by construction / bounded retry so EVERY draw is
    // valid: (a) sampleCount = sampleSize/denominator must be a whole number
    // (you can't observe a fractional receipt); (b) estimatedTotal must be a
    // whole number (denominators all divide any multiple of 100 — no float
    // artifact); (c) the three displayed numbers (correct estimate, wrongExact,
    // wrongFraction) must be pairwise distinct so no two distractors collide.
    // Sample size: easily divisible values.
    const sampleSizes = [40, 50, 80, 100, 125, 200];
    // Clean fractions (1/2, 1/4, 1/5, 1/10). 8 is intentionally excluded: it
    // does not divide every multiple of 100, which would make estimatedTotal
    // fractional (e.g. 1100/8 = 137.5 customers).
    const denominators = [2, 4, 5, 10];

    let totalPopulation = 0;
    let sampleSize = 0;
    let denominator = 0;
    let sampleCount = 0;
    let estimatedTotal = 0;
    let wrongExact = 0;
    let wrongFraction = 0;
    let tries = 0;
    do {
      totalPopulation = getRandomInt(10, 30) * 100; // 1,000 to 3,000
      sampleSize = getRandomElement(sampleSizes);
      denominator = getRandomElement(denominators);
      sampleCount = sampleSize / denominator;
      estimatedTotal = (sampleCount / sampleSize) * totalPopulation; // = totalPopulation / denominator
      // Exact-claim distractor: correct value shifted by 50 (a plausible slip).
      wrongExact = Math.round(estimatedTotal) - 50;
      // Wrong-fraction distractor: student halved the fraction.
      wrongFraction = Math.round((sampleCount / (sampleSize * 2)) * totalPopulation); // = estimatedTotal / 2
    } while (
      (!Number.isInteger(sampleCount) ||
        !Number.isInteger(estimatedTotal) ||
        wrongExact <= 0 ||
        wrongFraction <= 0 ||
        wrongExact === wrongFraction ||
        wrongExact === estimatedTotal ||
        wrongFraction === estimatedTotal) &&
      tries++ < 50
    );

    // Context
    const contexts = [
      { action: "purchased fruit", item: "receipts", place: "last Thursday" },
      { action: "bought organic products", item: "transactions", place: "yesterday" },
      { action: "used a coupon", item: "sales records", place: "last weekend" },
      { action: "purchased a gift card", item: "receipts", place: "last month" }
    ];
    const context = getRandomElement(contexts);

    // STEP 2: Create options with tracking.
    // Each incorrect option carries its OWN rebuttal so the explanation stays
    // correct no matter where the shuffle places it (reason is emitted per
    // shuffled option, never by positional index).
    const correctText = `The best estimate for the number of customers who ${context.action} ${context.place} is ${estimatedTotal.toLocaleString()}.`;

    const optionsData = [
      {
        text: `Exactly ${wrongExact.toLocaleString()} customers must have ${context.action} ${context.place}.`,
        isCorrect: false,
        reason: `A random sample can only be used to estimate the number of customers who ${context.action}, not determine it exactly, so the word "exactly" is not appropriate. This value also does not match the estimate ${estimatedTotal.toLocaleString()} obtained from the sample proportion.`
      },
      {
        text: `Exactly ${estimatedTotal.toLocaleString()} customers must have ${context.action} ${context.place}.`,
        isCorrect: false,
        reason: `Although ${estimatedTotal.toLocaleString()} is the correct estimate, a random sample can only be used to estimate this number, not determine it exactly, so the word "exactly" makes this conclusion inappropriate.`
      },
      {
        text: `The best estimate for the number of customers who ${context.action} ${context.place} is ${wrongFraction.toLocaleString()}.`,
        isCorrect: false,
        reason: `This value results from a calculation error. The correct estimate is (1/${denominator})(${totalPopulation.toLocaleString()}) = ${estimatedTotal.toLocaleString()}, not ${wrongFraction.toLocaleString()}.`
      },
      {
        text: correctText,
        isCorrect: true,
        reason: "correctly scales the sample proportion to the total population using estimation"
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
      questionText: `A store manager reviewed the ${context.item} from ${sampleSize} customers who were selected at random from all the customers who made purchases ${context.place}. Of those selected, ${sampleCount} ${context.item} showed that the customer had ${context.action}. If ${totalPopulation.toLocaleString()} customers made purchases ${context.place}, which of the following is the most appropriate conclusion?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. It's given that the manager took a random selection of the ${context.item} of ${sampleSize} customers from a total of ${totalPopulation.toLocaleString()}. It's also given that of those ${sampleSize} ${context.item}, ${sampleCount} showed that the customer had ${context.action}. This means that an appropriate estimate of the fraction of customers who ${context.action} is ${sampleCount}/${sampleSize}, or 1/${denominator}. Multiplying this fraction by the total number of customers yields (1/${denominator})(${totalPopulation.toLocaleString()}) = ${estimatedTotal.toLocaleString()}. Therefore, the best estimate for the number of customers who ${context.action} is ${estimatedTotal.toLocaleString()}.\n\nChoice ${incorrectOptions[0].letter} is incorrect. ${incorrectOptions[0].reason}\n\nChoice ${incorrectOptions[1].letter} is incorrect. ${incorrectOptions[1].reason}\n\nChoice ${incorrectOptions[2].letter} is incorrect. ${incorrectOptions[2].reason}`
    };
  }
};
