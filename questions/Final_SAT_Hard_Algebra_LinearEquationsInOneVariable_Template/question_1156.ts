import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1156
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [~20,000-30,000 initial bushels, rate in hundreds, single-digit hours]
 * - Difficulty factors: [Rate calculation, total vs additional time distinction]
 * - Distractor patterns: [additional hours (not total), off-by-k miscalculation, halving error]
 * - Constraints: [Rate constant, all quantities positive, integer hours]
 * - Question type: [Word Problem -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH: A bin starts at `initialAmount` bushels; an auger removes at a constant
 * `rate` bushels/hour. After `hoursPassed` hours, `remainingAfter` remain, which
 * pins rate = (initialAmount - remainingAfter)/hoursPassed. The TOTAL running
 * time when `targetRemaining` remain is
 *   totalHours = (initialAmount - targetRemaining)/rate.
 * We construct targetRemaining = initialAmount - rate*targetHours, so totalHours
 * == targetHours exactly (an integer by construction). No float artifacts.
 */

export const generator_1156 = {
  metadata: {
    id: "1156",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Draw a self-consistent scenario with integer hours throughout.
    const initialAmount = getRandomInt(20, 30) * 1000;   // e.g. 24000
    const rate = getRandomInt(5, 15) * 100;              // bushels per hour
    const hoursPassed = getRandomInt(3, 6);              // elapsed hours so far
    const remainingAfter = initialAmount - rate * hoursPassed; // > 0 (max removed 9000 < 20000)

    // targetHours is the TOTAL running time; keep it strictly greater than
    // hoursPassed and keep targetRemaining strictly positive and below remainingAfter.
    let totalHours = 0, targetRemaining = 0;
    let t = hoursPassed + 2;
    // Largest total time that still leaves corn in the bin.
    const maxByBin = Math.floor((initialAmount - 1) / rate);
    const maxTotal = Math.min(hoursPassed + 10, maxByBin);
    // Pick totalHours in [hoursPassed+2, maxTotal]; guaranteed non-empty because
    // hoursPassed<=6, rate<=1500 => rate*(hoursPassed+2)<=12000 < initialAmount.
    totalHours = getRandomInt(hoursPassed + 2, Math.max(hoursPassed + 2, maxTotal));
    targetRemaining = initialAmount - rate * totalHours; // > 0 by construction

    const additionalHours = totalHours - hoursPassed;    // >= 2

    // STEP 2: Build three DISTINCT positive distractors, none equal to totalHours.
    const used = new Set<number>([totalHours]);
    const distractors: number[] = [];

    // D1: the "additional hours only" trap (a classic total-vs-additional error).
    if (!used.has(additionalHours) && additionalHours > 0) {
      used.add(additionalHours);
      distractors.push(additionalHours);
    }
    // D2: halving error.
    const half = Math.floor(totalHours / 2);
    if (!used.has(half) && half > 0) {
      used.add(half);
      distractors.push(half);
    }
    // Fill remaining slots with small off-by-k perturbations of totalHours.
    let k = 1, guard = 0;
    while (distractors.length < 3 && guard++ < 50) {
      const candidate = k % 2 === 1 ? totalHours + Math.ceil(k / 2) : totalHours - Math.ceil(k / 2);
      k++;
      if (candidate > 0 && !used.has(candidate)) {
        used.add(candidate);
        distractors.push(candidate);
      }
    }
    // Absolute fallback (keeps four distinct options even in pathological draws).
    let filler = totalHours + 10;
    while (distractors.length < 3) {
      if (!used.has(filler) && filler > 0) { used.add(filler); distractors.push(filler); }
      filler++;
    }

    // STEP 3: Attach reasons tied to how each wrong value arises.
    const reasonFor = (v: number): string => {
      if (v === additionalHours) return `this is the number of ADDITIONAL hours needed after the first ${hoursPassed} hours, not the total running time`;
      if (v === half) return `this halves the correct total time, which does not match the constant removal rate`;
      return `this comes from a miscount of the total time at the given rate`;
    };

    const correctText = totalHours.toString();
    const optionsData = [
      { text: distractors[0].toString(), isCorrect: false, reason: reasonFor(distractors[0]) },
      { text: distractors[1].toString(), isCorrect: false, reason: reasonFor(distractors[1]) },
      { text: distractors[2].toString(), isCorrect: false, reason: reasonFor(distractors[2]) },
      { text: correctText, isCorrect: true }
    ];

    // STEP 4: Shuffle and assign letters (letters known only post-shuffle).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const removedFirst = initialAmount - remainingAfter;      // = rate * hoursPassed
    const totalRemoved = initialAmount - targetRemaining;     // = rate * totalHours

    // STEP 5: Explanation computed entirely from the live variables.
    const explanation = `Set up the problem with the constant removal rate, then use that rate to find the total running time.

1. Amount removed during the first $${hoursPassed}$ hours:
$$${initialAmount.toLocaleString()} - ${remainingAfter.toLocaleString()} = ${removedFirst.toLocaleString()} \\text{ bushels}$$

2. Removal rate:
$$\\text{rate} = \\frac{${removedFirst.toLocaleString()} \\text{ bushels}}{${hoursPassed} \\text{ hours}} = ${rate.toLocaleString()} \\text{ bushels per hour}$$

3. Total amount that must be removed to leave $${targetRemaining.toLocaleString()}$ bushels:
$$${initialAmount.toLocaleString()} - ${targetRemaining.toLocaleString()} = ${totalRemoved.toLocaleString()} \\text{ bushels}$$

4. Total running time at that rate:
$$\\text{time} = \\frac{${totalRemoved.toLocaleString()}}{${rate.toLocaleString()}} = ${totalHours} \\text{ hours}$$

Choice ${correctLetter} ($${correctText}$) is correct: reducing the corn from $${initialAmount.toLocaleString()}$ to $${targetRemaining.toLocaleString()}$ bushels at $${rate.toLocaleString()}$ bushels per hour takes $${totalHours}$ hours in total.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A worker used a tool called an auger to remove corn from a storage bin at a constant rate. The bin contained $${initialAmount.toLocaleString()}$ bushels of corn when the worker began using the auger. After $${hoursPassed}$ hours of using the auger, $${remainingAfter.toLocaleString()}$ bushels of corn remained in the bin. If the auger continues to remove corn at this rate, what is the total number of hours the worker will have been using the auger when $${targetRemaining.toLocaleString()}$ bushels of corn remain in the bin?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
