import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1419
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [230%, 60% (medium percentages)]
 * - Difficulty factors: [Chained percentage relationships, algebraic manipulation]
 * - Distractor patterns: [Multiplying percentages directly, wrong variable relationship]
 * - Constraints: [Must chain a→b→c relationships correctly]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1419 = {
  metadata: {
    id: "1419",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // a = (P1/100)*b  and  a = (P2/100)*c
    // => c = (P1/P2)*b, so c is (P1/P2)*100 percent of b.
    let P1 = getRandomInt(180, 280);
    let P2 = getRandomInt(50, 80);

    // correct answer, as a percent of b (question asks "closest to")
    let roundedResult = Math.round((P1 / P2) * 100);
    // Distractors (each derived from a specific misconception)
    let multipliedPcts = Math.round((P1 / 100) * (P2 / 100) * 100); // multiply decimals: ~P1*P2/100
    let wrongOrder = Math.round((P2 / P1) * 100);                   // inverted ratio
    let sumPcts = P1 + P2;                                          // simple addition

    // Guarantee all four values are distinct across the full range. The only
    // realistic collision (verified over the whole grid) is roundedResult ==
    // sumPcts; a bounded resample keeps the distractors clean without changing
    // intent.
    let tries = 0;
    while (
      tries++ < 50 &&
      new Set([roundedResult, multipliedPcts, wrongOrder, sumPcts]).size < 4
    ) {
      P1 = getRandomInt(180, 280);
      P2 = getRandomInt(50, 80);
      roundedResult = Math.round((P1 / P2) * 100);
      multipliedPcts = Math.round((P1 / 100) * (P2 / 100) * 100);
      wrongOrder = Math.round((P2 / P1) * 100);
      sumPcts = P1 + P2;
    }

    const optionsData = [
      { text: multipliedPcts.toString(), isCorrect: false, reason: "results from multiplying the percentage decimals together" },
      { text: wrongOrder.toString(), isCorrect: false, reason: "results from inverting the ratio" },
      { text: roundedResult.toString(), isCorrect: true, reason: "" },
      { text: sumPcts.toString(), isCorrect: false, reason: "results from adding the two percentages" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'C';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The positive number $a$ is ${P1}% of the number $b$, and $a$ is ${P2}% of the number $c$. If $c$ is $p$% of $b$, which of the following is closest to the value of $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: roundedResult.toString(),
      explanation: `Choice ${correctLetter} is correct. From the given information, $a = \\frac{${P1}}{100}\\,b$ and $a = \\frac{${P2}}{100}\\,c$. Setting these equal gives $\\frac{${P1}}{100}\\,b = \\frac{${P2}}{100}\\,c$, so $c = \\frac{${P1}}{${P2}}\\,b$. Writing $c$ as a percent of $b$: $\\frac{${P1}}{${P2}} \\times 100 \\approx ${roundedResult}$, so $p \\approx ${roundedResult}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
