import { shuffle } from '../../utils/math';
import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1435
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [object R: 4x inches in y seconds, object S: 24x inches, speed R = 0.5 × speed S]
 * - Difficulty factors: [Abstract variables, ratio reasoning, relative speed]
 * - Distractor patterns: [4x correct: R twice as fast, 2x correct: time for R not S, wrong distance]
 * - Constraints: [Must track which object is faster, algebraic manipulation with x and y]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_1435 = {
  metadata: {
    id: "1435",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate coefficients (4 and 24 in original, ratio is 6)
    const distR = getRandomInt(2, 6); // coefficient for R distance
    const timeR = getRandomInt(2, 5); // coefficient for R time
    const distS = distR * getRandomInt(4, 8); // S travels 4-8 times farther
    // Speed ratio: R is half of S, so S is twice as fast

    // STEP 2: Calculate the correct time coefficient.
    // Speed R = (distR × x) / (timeR × y)
    // Speed S = 2 × Speed R = (2 × distR × x) / (timeR × y)
    // Time for S to travel distS × x = distS × x / Speed S
    //   = (distS × x) × (timeR × y) / (2 × distR × x) = (distS × timeR) / (2 × distR) × y
    // Because distS = distR × k (k = 4..8), this is (k × timeR / 2) y — a clean half-integer.
    const timeSCoefficient = (distS * timeR) / (2 * distR);

    // STEP 3: Distractors — each tied to a specific, distinct misconception.
    // Because distS = distR × k, the four coefficients below are k·timeR/2, 2k·timeR,
    // k·timeR, and timeR/2 respectively — provably distinct for every draw in range,
    // and each a clean half-integer.
    // A) Treats R as twice as fast as S (inverts the "half" relationship): 4× the answer.
    const coeffTwiceAsFast = (distS * timeR * 2) / distR;
    // B) Computes the time for object R (uses R's speed, not S's): 2× the answer.
    const coeffTimeForR = (distS * timeR) / distR;
    // C) Uses the given distance (distR·x) instead of the required distS·x: timeR/2.
    const coeffWrongDistance = timeR / 2;

    // STEP 4: Build options, carrying each distractor's reason with its value so the
    // justification always matches the number the student would actually compute.
    const optionsData = [
      { text: timeSCoefficient + "y", isCorrect: true },
      {
        text: coeffTwiceAsFast + "y",
        isCorrect: false,
        reason: "results from assuming object R is twice as fast as object S, rather than half as fast"
      },
      {
        text: coeffTimeForR + "y",
        isCorrect: false,
        reason: "results from calculating the time for object R, not object S, to travel the distance"
      },
      {
        text: coeffWrongDistance + "y",
        isCorrect: false,
        reason: `results from using the given distance of $${distR}x$ inches instead of the required $${distS}x$ inches`
      }
    ];

    // Safety guard (house style): the four coefficients are constructed to be distinct
    // for every draw, but if any string collision ever appeared, replace the offending
    // distractor with a bounded, clearly-larger filler rather than emit a duplicate.
    const seen = new Set<string>([optionsData[0].text]);
    for (let i = 1; i < optionsData.length; i++) {
      let tries = 0;
      while (seen.has(optionsData[i].text) && tries++ < 50) {
        optionsData[i] = {
          ...optionsData[i],
          text: (timeSCoefficient + coeffTwiceAsFast + tries) + "y"
        };
      }
      seen.add(optionsData[i].text);
    }

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Speed of R = $\\frac{${distR}x}{${timeR}y}$. Since R is half as fast as S, speed of S = $\\frac{${2 * distR}x}{${timeR}y}$. Time for S to travel $${distS}x$ inches = $\\frac{${distS}x}{\\frac{${2 * distR}x}{${timeR}y}} = ${timeSCoefficient}y$ seconds. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Objects R and S each travel at a constant speed. The speed of object R is half the speed of object S. Object R travels a distance of $${distR}x$ inches in $${timeR}y$ seconds. Which expression represents the time, in seconds, it takes object S to travel a distance of $${distS}x$ inches?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
