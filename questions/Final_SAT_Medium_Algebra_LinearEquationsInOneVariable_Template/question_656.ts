import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 656
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 20, rate: 1oz/4days, remaining: 9]
 * - Difficulty factors: [Rate problem, working backwards]
 * - Distractor patterns: [forgot rate, used remaining instead of lost, used initial]
 * - Constraints: [(Initial - Remaining) * DaysPerOunce = Time]
 * - Question type: [Multiple Choice Text]
 */

export const generator_656 = {
  metadata: {
    id: "656",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // A bowl loses 1 ounce of water every `rateDen` days. It starts with
    // `initial` ounces and `remaining` ounces are left. Ounces lost =
    // initial - remaining, and each lost ounce took `rateDen` days, so the
    // number of days uncovered = (initial - remaining) * rateDen.
    const initial = getRandomInt(15, 30);
    const rateNum = 1;
    const rateDen = getRandomInt(3, 6);           // days per ounce lost
    const remaining = getRandomInt(5, Math.floor(initial / 2));

    const evaporated = initial - remaining;       // ounces lost (>= 8)
    const days = evaporated * rateDen;            // correct answer (integer)

    // Distractor pool of plausible wrong day-counts. Each has a distinct
    // conceptual error; the first three are provably distinct from `days`
    // and from one another across all draws, the rest are safety fillers.
    const candidates = [
      evaporated,                 // forgot the rate (counted 1 day per ounce)
      initial * rateDen,          // used the starting amount instead of the amount lost
      evaporated * (rateDen - 1), // off-by-one on the days-per-ounce rate
      remaining * rateDen,        // used the remaining amount instead of the amount lost
      remaining,                  // reported ounces remaining instead of days
    ];

    const distractors: number[] = [];
    for (const cand of candidates) {
      if (cand === days) continue;
      if (distractors.includes(cand)) continue;
      distractors.push(cand);
      if (distractors.length === 3) break;
    }
    let filler = 1;
    while (distractors.length < 3 && filler < 50) {
      const cand = days + filler;
      if (cand !== days && !distractors.includes(cand)) distractors.push(cand);
      filler++;
    }

    const correctText = `$${days}$`;
    const optionsData = [
      { text: `$${distractors[0]}$`, isCorrect: false },
      { text: `$${distractors[1]}$`, isCorrect: false },
      { text: `$${distractors[2]}$`, isCorrect: false },
      { text: `$${days}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    return {
      questionText: `A bowl contains $${initial}$ ounces of water. When the bowl is uncovered, the amount of water in the bowl decreases by $${rateNum}$ ounce every $${rateDen}$ days. If $${remaining}$ ounces of water remain in this bowl, for how many days has it been uncovered?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The bowl started with $${initial}$ ounces and has $${remaining}$ ounces remaining, so $${initial} - ${remaining} = ${evaporated}$ ounces have evaporated. Since the water decreases by $${rateNum}$ ounce every $${rateDen}$ days, each ounce lost takes $${rateDen}$ days, so the number of days is $${evaporated} \\times ${rateDen} = ${days}$ days.`
    };
  }
};
