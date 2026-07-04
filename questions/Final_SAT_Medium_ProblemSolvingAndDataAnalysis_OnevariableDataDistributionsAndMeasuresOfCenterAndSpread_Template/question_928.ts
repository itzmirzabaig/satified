import { getRandomInt, shuffle, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 928
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [various patterns: constant, linear, exponential, clustered]
 * - Difficulty factors: [Comparing mean and median across different distributions]
 * - Distractor patterns: [Symmetric distributions where mean=median]
 * - Constraints: [Must identify right-skewed distribution for mean > median]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_928 = {
  metadata: {
    id: "928",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate distribution types. EXACTLY ONE (the exponential /
    // right-skewed set C) may have mean > median; every distractor must have
    // mean = median (constant or symmetric) so the answer is unique.

    // A: Constant (mean = median, both equal the constant value)
    const constVal = getRandomInt(3, 8);
    const setA = Array(9).fill(constVal);

    // B: Arithmetic / symmetric (mean = median = middle term)
    const startB = getRandomInt(0, 3) * 10;
    const setB = Array.from({ length: 9 }, (_, i) => startB + i * 10);

    // C: Exponential / right-skewed (mean > median) — THE CORRECT ONE.
    const baseC = getRandomInt(2, 4);
    const setC = Array.from({ length: 9 }, (_, i) => Math.pow(baseC, i + 1));

    // D: Symmetric about a center with mirrored offsets, so the offsets sum to
    // zero and mean = median exactly (a genuine distractor, NOT right-skewed).
    // Shape is distinct from the uniform-gap arithmetic set B.
    const centerD = getRandomInt(20, 40) * 10; // 200..400
    const offsetsD = [-55, -35, -20, -5, 0, 5, 20, 35, 55]; // symmetric, sum 0
    const setD = offsetsD.map((o) => centerD + o);

    // Median of the sorted exponential set (already increasing) and its mean.
    const sumC = setC.reduce((a, b) => a + b, 0);
    const medianC = setC[4]; // 5th of 9 sorted values
    const meanC = round(sumC / 9, 2);

    // Attach the incorrect-reason to each option so the explanation stays
    // correct no matter how the options shuffle.
    const optionsData = [
      { text: setA.join(', '), isCorrect: false, reason: 'the values are all equal, so its mean and median are the same' },
      { text: setB.join(', '), isCorrect: false, reason: 'it is evenly spaced and symmetric, so its mean equals its median' },
      { text: setC.join(', '), isCorrect: true, reason: '' },
      { text: setD.join(', '), isCorrect: false, reason: 'it is symmetric about its center, so its mean equals its median' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find((o) => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter((o) => !o.isCorrect);
    const distractorSentences = incorrectOptions
      .map((o) => `Choice ${o.letter} is incorrect because ${o.reason}.`)
      .join(' ');

    return {
      questionText: `For which of the following data sets is the mean greater than the median?`,
      figureCode: null,
      options: shuffledOptions.map((o) => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. It contains the data set ${setC.join(', ')}. Because the values are already in increasing order, the median is the 5th value, ${medianC}. The mean is $\\frac{${setC.join('+')}}{9} \\approx ${meanC}$. Since ${meanC} > ${medianC}, the mean is greater than the median. This distribution is right-skewed: the rapid exponential growth creates large values on the right that pull the mean above the median. ${distractorSentences}`
    };
  }
};
