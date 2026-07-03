import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1420
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [99, 12.50%]
 * - Difficulty factors: [Reverse percentage problem, careful setup]
 * - Distractor patterns: [Using percentage as absolute, wrong base]
 * - Constraints: [99 = 1.125 * original, so original = 88]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_1420 = {
  metadata: {
    id: "1420",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Answer-first construction so EVERY value is an exact integer:
    //   final = original * (1 + pct/100).
    // Pick pct from a "nice" set and make `original` a multiple of
    // 100/gcd(pct,100) so the increase (original*pct/100) is a whole number;
    // then final is a whole number and x = final*100/(100+pct) = original.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

    const pctChoices = [5, 8, 10, 12, 15, 20, 24, 25];
    let increasePct = 0, originalCount = 0, finalCount = 0;
    let wrongSubtractFinal = 0, wrongPctAsCount = 0, wrongPctAbsolute = 0;
    let tries = 0;

    do {
      increasePct = getRandomElement(pctChoices);
      const step = 100 / gcd(increasePct, 100);           // required multiple
      // Keep original in a sensible range and final <= ~150.
      const kMax = Math.floor(150 / (step * (1 + increasePct / 100)));
      const kMin = Math.max(1, Math.ceil(40 / step));
      const k = getRandomInt(Math.min(kMin, kMax), Math.max(kMin, kMax));
      originalCount = step * k;
      finalCount = originalCount + (originalCount * increasePct) / 100; // exact integer

      // Distractors (each a distinct, whole-number mis-step):
      // (1) subtracts the percent OF THE FINAL count instead of solving
      wrongSubtractFinal = finalCount - Math.round((finalCount * increasePct) / 100);
      // (2) uses the percent itself as the count
      wrongPctAsCount = increasePct;
      // (3) subtracts the percent value as a raw number from the final count
      wrongPctAbsolute = finalCount - increasePct;
    } while (
      new Set([originalCount, wrongSubtractFinal, wrongPctAsCount, wrongPctAbsolute]).size < 4 &&
      ++tries < 50
    );

    // Deterministic all-distinct fallback (matches the original exemplar 99/88).
    if (new Set([originalCount, wrongSubtractFinal, wrongPctAsCount, wrongPctAbsolute]).size < 4) {
      increasePct = 12; originalCount = 75; finalCount = 84;
      wrongSubtractFinal = finalCount - Math.round((finalCount * increasePct) / 100); // 74
      wrongPctAsCount = increasePct;                                                   // 12
      wrongPctAbsolute = finalCount - increasePct;                                     // 72
    }

    const optionsData = [
      { text: originalCount.toString(), isCorrect: true, reason: "" },
      { text: wrongSubtractFinal.toString(), isCorrect: false, reason: `subtracts ${increasePct}% of the February 15 count instead of reversing the increase on the January 1 count` },
      { text: wrongPctAsCount.toString(), isCorrect: false, reason: "uses the percent as if it were an actual number of dragonflies" },
      { text: wrongPctAbsolute.toString(), isCorrect: false, reason: `subtracts ${increasePct} as a raw count from the February 15 total rather than a percentage` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'A';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A researcher studying the life cycle of dragonflies counted the number of dragonflies in a certain habitat each day over a 46-day period. On February 15, there were ${finalCount} dragonflies in the habitat. The percent increase in the number of dragonflies in the habitat from January 1 to February 15 was ${increasePct}%. How many dragonflies were in the habitat on January 1?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: originalCount.toString(),
      explanation: `Choice ${correctLetter} is correct. Let $x$ be the number of dragonflies on January 1. A ${increasePct}% increase means $x + \\frac{${increasePct}}{100}x = ${finalCount}$, so $\\frac{${100 + increasePct}}{100}x = ${finalCount}$. Solving gives $x = ${finalCount} \\cdot \\frac{100}{${100 + increasePct}} = ${originalCount}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
