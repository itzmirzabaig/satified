import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 821
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [group size: double-digit, prices: ~50-90, revenue: 4-digit]
 * - Difficulty factors: [Word problem, system setup, substitution method]
 * - Distractor patterns: [plausible child counts]
 * - Constraints: [Ensure integer solutions, valid counts]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_821 = {
  metadata: {
    id: "821",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Answer-first: choose counts and prices, then build the revenue so the
    // system has a unique, exact integer solution for every draw.
    const groupSize = getRandomInt(15, 35);              // total people
    const adultPrice = getRandomInt(50, 90);             // dollars per adult
    const childPrice = adultPrice - getRandomInt(10, 30); // strictly less; >= 20

    const numChildren = getRandomInt(3, Math.floor(groupSize / 2));
    const numAdults = groupSize - numChildren;
    const revenue = adultPrice * numAdults + childPrice * numChildren;

    const questionText = `A company that provides whale-watching tours takes groups of $${groupSize}$ people at a time. The company charges \\$${adultPrice} per adult and \\$${childPrice} per child. If the company's revenue for one group of adults and children was \\$${revenue}, how many people in the group were children?`;

    // Distractors: plausible child counts, all distinct from the answer and each
    // other, and each a valid count in the range 1..(groupSize - 1).
    const correct = numChildren;
    const candidates = [
      numAdults,          // swapped answer (adults instead of children)
      numChildren + 2,    // near-miss high
      numChildren - 2,    // near-miss low
      numChildren + 1,
      numChildren - 1,
      Math.floor(groupSize / 2), // "about half"
      numChildren + 3
    ];
    const used = new Set<number>([correct]);
    const distractors: number[] = [];
    for (const c of candidates) {
      if (distractors.length >= 3) break;
      if (c >= 1 && c <= groupSize - 1 && !used.has(c)) {
        used.add(c);
        distractors.push(c);
      }
    }
    // Deterministic top-up guarantees exactly three distinct valid distractors.
    let step = 1;
    while (distractors.length < 3) {
      const c = correct + step;
      if (c >= 1 && c <= groupSize - 1 && !used.has(c)) {
        used.add(c);
        distractors.push(c);
      } else {
        const c2 = correct - step;
        if (c2 >= 1 && c2 <= groupSize - 1 && !used.has(c2)) {
          used.add(c2);
          distractors.push(c2);
        }
      }
      step++;
    }

    const correctText = correct.toString();
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractors[0].toString(), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: distractors[2].toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // Reduce the revenue equation for a cleaner elimination in the explanation.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(adultPrice, childPrice);
    const ap = adultPrice / g;   // reduced adult coefficient
    const cp = childPrice / g;   // reduced child coefficient
    const rv = revenue / g;      // reduced revenue
    const priceDiff = ap - cp;   // coefficient of c after substitution (> 0)
    const apGroup = ap * groupSize;
    const rhsForC = apGroup - rv; // priceDiff * c

    // Only mention the divide-through step when it actually simplifies (g > 1).
    const reduceStep = g > 1
      ? ` Dividing that equation by ${g} gives $ ${ap}a + ${cp}c = ${rv}$.`
      : '';

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Let $a$ be the number of adults and $c$ be the number of children. The group has ${groupSize} people, so $a + c = ${groupSize}$. The revenue equation is $ ${adultPrice}a + ${childPrice}c = ${revenue}$.${reduceStep} From $a = ${groupSize} - c$, substitute: $ ${ap}(${groupSize} - c) + ${cp}c = ${rv}$, so $ ${apGroup} - ${priceDiff}c = ${rv}$, which gives $ ${priceDiff}c = ${rhsForC}$ and $c = ${numChildren}$. Checking, $a = ${groupSize} - ${numChildren} = ${numAdults}$ and the revenue is $ ${numAdults} \\times ${adultPrice} + ${numChildren} \\times ${childPrice} = ${revenue}$. So there were ${numChildren} children.`
    };
  }
};
