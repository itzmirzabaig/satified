import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 108
*
* ORIGINAL ANALYSIS:
* - Number ranges: [daily: 50-100, days: 20-60, remaining days k: 8-18]
* - Difficulty factors: [Word problem, linear decrease]
* - Distractor patterns: [days the remaining supply lasts (k), days until the
*   supply runs out (days + k), adding the target instead of subtracting (days + 2k)]
* - Constraints: [target = daily * k and initial = daily * (days + k), so every
*   distractor is an integer and all four choices are distinct since k < days]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*
* FIX NOTES:
* The stem was written in shorthand ("Shop starts with 4010 cups. Uses 60 per
* day.") and the distractors were arbitrary offsets (days +/- 20, +40) with
* reasons like "way too many". Rewrote the stem in full sentences, formatted
* large numbers with commas, and built each distractor from a real error.
*/

export const generator_108 = {
  metadata: {
    id: "108",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const daily = getRandomInt(50, 100);
    const days = getRandomInt(20, 60);
    const k = getRandomInt(8, 18);
    const target = daily * k;
    const initial = daily * (days + k);
    const fmt = (n: number) => n.toLocaleString('en-US');

    const optionsData = [
      { text: days.toString(), isCorrect: true, reason: '' },
      { text: k.toString(), isCorrect: false, reason: `this is the number of days the remaining ${fmt(target)} cups would last, not the number of days until the supply is reduced to ${fmt(target)} cups` },
      { text: (days + k).toString(), isCorrect: false, reason: `this is the number of days until the shop uses all ${fmt(initial)} cups` },
      { text: (days + 2 * k).toString(), isCorrect: false, reason: `this may result from adding ${fmt(target)} to ${fmt(initial)} instead of subtracting it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A coffee shop has a supply of ${fmt(initial)} paper cups. The shop uses ${daily} cups from this supply each day, and no cups are added. After how many days will the supply be reduced to ${fmt(target)} cups?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: days.toString(),
      explanation: `Choice ${correctLetter} is correct. Let $d$ be the number of days. After $d$ days, the shop has used $${daily}d$ cups, so the number of cups remaining is $${fmt(initial)} - ${daily}d$. Setting this equal to ${fmt(target)} gives $${fmt(initial)} - ${daily}d = ${fmt(target)}$. Adding $${daily}d$ to both sides and subtracting ${fmt(target)} from both sides yields $${fmt(initial - target)} = ${daily}d$. Dividing both sides by ${daily} yields $d = ${days}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
