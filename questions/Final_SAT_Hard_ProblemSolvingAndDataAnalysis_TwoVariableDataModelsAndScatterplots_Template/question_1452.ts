import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1452
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Account A: $500, 6%, Account B: $1000, $25/year]
 * - Difficulty factors: [Comparing exponential vs linear growth, compound interest calculation]
 * - Distractor patterns: [A always more, A always less, A more-then-less, A less-then-more]
 * - Constraints: [A's yearly interest is amountA*(1+r)^(n-1)*r, strictly increasing;
 *                 B's yearly gain is the constant flatB]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 *
 * FIXED:
 * - Escaped all currency in the explanation as \$ (previously bare $ gave an
 *   odd $ count — TEX_UNBALANCED).
 * - Re-derived the correct answer: A's yearly earnings strictly increase from
 *   firstYearA, so it is "always more" when firstYearA > flatB, otherwise
 *   "less at first but eventually more". "Always less" and "more-then-less"
 *   are therefore never correct. Removed the ad-hoc correctCount patching.
 * - Corrected \times escaping and added per-distractor reasoning.
 */

export const generator_1452 = {
  metadata: {
    id: "1452",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values. firstYearA in [16, 64], flatB in [15, 35],
    // so both regimes (always-more / eventually-more) occur across draws.
    const amountA = getRandomInt(400, 800);
    const rateA = getRandomInt(4, 8); // percent, compounded annually
    const amountB = getRandomInt(800, 1500);
    const flatB = getRandomInt(15, 35); // flat dollars per year

    const rateDecimal = rateA / 100;
    const firstYearA = amountA * rateDecimal; // A's earnings in year 1

    // STEP 2: Build the table (currency shown literally in HTML).
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Account</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Amount invested</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Balance increase</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Account A</td>
      <td style="border: 1px solid currentColor; padding: 8px;">$${amountA}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">${rateA}% annual interest</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px;">Account B</td>
      <td style="border: 1px solid currentColor; padding: 8px;">$${amountB}</td>
      <td style="border: 1px solid currentColor; padding: 8px;">$${flatB} per year</td>
    </tr>
  </tbody>
</table>`;

    // STEP 3: Determine the correct statement.
    // A's yearly interest strictly increases from firstYearA; B is constant flatB.
    const aAlwaysMore = firstYearA > flatB;

    const optionsData = [
      {
        text: "Account A always earns more money per year than Account B.",
        isCorrect: aAlwaysMore,
        reason: `is false unless Account A's first-year earnings already exceed Account B's, which is not the case here`
      },
      {
        text: "Account A always earns less money per year than Account B.",
        isCorrect: false,
        reason: `is false because Account A's yearly interest grows without bound, so it cannot stay below Account B forever`
      },
      {
        text: "Account A earns more money per year than Account B at first but eventually earns less money per year.",
        isCorrect: false,
        reason: `is false because Account A's yearly interest only increases over time, while Account B's stays constant`
      },
      {
        text: "Account A earns less money per year than Account B at first but eventually earns more money per year.",
        isCorrect: !aAlwaysMore,
        reason: `is false when Account A already earns more in the first year, so it never starts out behind`
      }
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 5: Build the explanation. All currency escaped as \$.
    const firstYearStr = firstYearA.toFixed(2);
    const growthClause = aAlwaysMore
      ? `it already earns more than Account B in the first year and, because its interest compounds, its yearly earnings only grow, so Account A always earns more`
      : `it earns less than Account B in the first year, but because its interest compounds its yearly earnings grow without bound and eventually exceed Account B's constant \\$${flatB}`;

    const explanation = `Choice ${correctLetter} is correct. In the first year Account A earns $${amountA} \\times ${rateDecimal} = \\$${firstYearStr}$, compared with Account B's constant \\$${flatB} per year. Because Account A's interest is compounded, the amount it earns each year keeps increasing, while Account B earns the same amount every year. Therefore ${growthClause}. Choice ${incorrectOptions[0].letter} ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} ${incorrectOptions[2].reason}.`;

    // STEP 6: Return question data.
    return {
      questionText: `Two investments were made as shown in the table above. The interest in Account A is compounded once per year. Which of the following is true about the amounts the two accounts earn each year?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation
    };
  }
};
