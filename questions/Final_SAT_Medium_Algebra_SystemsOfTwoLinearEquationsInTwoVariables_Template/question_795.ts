import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 795
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: 12.45, 19.42 (decimal currency), quantities: 1-4]
 * - Difficulty factors: [Word problem with decimals, system setup]
 * - Distractor patterns: [3.77, 3.88, 4.15, 4.34 - close price values]
 * - Constraints: [Decimal arithmetic, realistic prices]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_795 = {
  metadata: {
    id: "795",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Work in integer cents so all money values are exact (no float
    // artifacts) and options can be compared for collisions precisely.
    // System (b = bread cost, e = eggs cost per dozen):
    //   1*b + 2*e = total1  ;  4*b + 1*e = total2
    // Solving gives e = (4*total1 - total2) / 7 = eggCents exactly.
    const eggCents = getRandomInt(300, 500);   // $3.00 .. $5.00 (dozen eggs)

    // Distractor offsets (in cents) applied to the egg price. eggCents >= 300
    // keeps eggCents-46 and eggCents-19 comfortably positive.
    const off2 = 46;
    const off3 = 19;

    // Bread price is a separate value used as a "solved the wrong variable"
    // distractor. Retry (bounded) until it is distinct from the egg price and
    // from the two offset distractors so no two options ever collide.
    const forbidden = new Set<number>([eggCents, eggCents - off2, eggCents - off3]);
    let breadCents = getRandomInt(200, 500);
    let tries = 0;
    while (forbidden.has(breadCents) && tries++ < 50) {
      breadCents = getRandomInt(200, 500);
    }
    if (forbidden.has(breadCents)) breadCents = eggCents + 37; // guaranteed-distinct fallback

    const bread1 = 1, eggs1 = 2;
    const bread2 = 4, eggs2 = 1;
    const total1Cents = bread1 * breadCents + eggs1 * eggCents;
    const total2Cents = bread2 * breadCents + eggs2 * eggCents;

    // Money formatting helper (escaped currency, exact 2 decimals).
    const money = (cents: number) => `\\$${(cents / 100).toFixed(2)}`;
    const eggPriceStr = (eggCents / 100).toFixed(2);   // fill-in-style plain number for options
    const breadPriceStr = (breadCents / 100).toFixed(2);

    // STEP 2: Build question text. Currency is written with escaped \$ so
    // MathJax never pairs the dollar signs; quantities stay as plain numbers.
    const questionText = `Two customers bought the same kind of bread and eggs at a store. The first customer paid ${money(total1Cents)} for 1 loaf of bread and 2 dozen eggs. The second customer paid ${money(total2Cents)} for 4 loaves of bread and 1 dozen eggs. What is the cost, in dollars, of 1 dozen eggs?`;

    // STEP 3: Options (plain dollar amounts, distinct by construction above).
    const correctText = eggPriceStr;
    const optionsData = [
      { text: breadPriceStr, isCorrect: false },
      { text: ((eggCents - off2) / 100).toFixed(2), isCorrect: false },
      { text: ((eggCents - off3) / 100).toFixed(2), isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const breadLetter = shuffledOptions.find(o => o.text === breadPriceStr)!.letter;

    // STEP 5: Explanation, computed from the same live variables. All money is
    // written with escaped \$ to stay clear of MathJax math delimiters.
    const T1 = money(total1Cents);
    const T2 = money(total2Cents);
    const fourT1 = money(4 * total1Cents);
    const numer = money(4 * total1Cents - total2Cents); // = 7 * eggCents

    const explanation = `Choice ${correctLetter} is correct. Let $b$ be the cost of one loaf of bread and $e$ be the cost of one dozen eggs. The two purchases give the system $(b + 2e = ${(total1Cents / 100).toFixed(2)})$ and $(4b + e = ${(total2Cents / 100).toFixed(2)})$. Solve by elimination: multiply the first equation by $(4)$ to get $(4b + 8e = ${(4 * total1Cents / 100).toFixed(2)})$, then subtract the second equation to remove $b$: $(7e = ${(4 * total1Cents / 100).toFixed(2)} - ${(total2Cents / 100).toFixed(2)} = ${((4 * total1Cents - total2Cents) / 100).toFixed(2)})$. Dividing by $(7)$ gives $(e = ${eggPriceStr})$, so one dozen eggs costs ${money(eggCents)}. (Back-substituting, $(b = ${breadPriceStr})$, and both original totals check out.)\n\nChoice ${breadLetter} is incorrect: ${money(breadCents)} is the cost of one loaf of bread, found by solving for the wrong variable. The other two choices are the egg price reduced by a small amount and come from arithmetic slips during elimination.`;

    // STEP 6: Return question data.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
