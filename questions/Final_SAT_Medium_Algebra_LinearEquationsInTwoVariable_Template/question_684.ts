import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 684
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cups ice cream, bananas, per-cup calcium, per-banana calcium]
 * - Difficulty factors: [Setting up a linear equation, solving for an unknown]
 * - Distractor patterns: [A: correct, B: total for all bananas (forgot to divide),
 *   C: added one cup's calcium, D: multiplied per-banana by cups]
 * - Constraints: [Clean integer answer built from the answer-first]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 *
 * Model: (cups)(calciumPerCup) + (bananas)(b) = totalCalcium, solve for b.
 * totalCalcium is constructed from the intended answer, so b is exactly an integer
 * for every draw.
 */

export const generator_684 = {
  metadata: {
    id: "684",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Parameters (answer-first so the solution is a clean integer).
    const cupsIceCream = getRandomInt(3, 6);
    const bananas = getRandomInt(2, 4);
    const calciumPerCup = getRandomInt(100, 400);
    const bananaCalcium = getRandomInt(3, 15); // the answer, in mg per banana
    const calciumFromIceCream = cupsIceCream * calciumPerCup;
    const totalCalcium = calciumFromIceCream + bananas * bananaCalcium;

    // STEP 2: Distractors from concrete error patterns, all forced distinct from
    // the correct answer and from one another via a bounded de-dup.
    const correct = bananaCalcium;
    const used = new Set<number>([correct]);
    const distractors: number[] = [];

    const addDistractor = (value: number): void => {
      let v = value;
      let tries = 0;
      while ((used.has(v) || v <= 0) && tries++ < 50) v += 1; // nudge off any collision
      used.add(v);
      distractors.push(v);
    };

    addDistractor(bananas * bananaCalcium);         // total calcium in ALL bananas (forgot to divide)
    addDistractor(bananaCalcium + calciumPerCup);   // added one cup's calcium to the answer
    addDistractor(bananaCalcium * cupsIceCream);     // multiplied per-banana by the number of cups

    const optionsData = [
      { text: `$${correct}$`, isCorrect: true, reason: "" },
      { text: `$${distractors[0]}$`, isCorrect: false, reason: `this is the calcium in all ${bananas} bananas combined, not in a single banana.` },
      { text: `$${distractors[1]}$`, isCorrect: false, reason: "this adds the calcium from one cup of ice cream to the per-banana amount." },
      { text: `$${distractors[2]}$`, isCorrect: false, reason: `this multiplies the per-banana amount by the number of cups of ice cream instead of using the ${bananas} bananas.` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A batch of banana milkshakes is made from ${cupsIceCream} cups of ice cream and ${bananas} bananas, and it contains ${totalCalcium} milligrams of calcium in total. Each cup of the ice cream used contains ${calciumPerCup} mg of calcium. How much calcium, in mg, is in 1 banana?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Let $b$ be the calcium, in mg, in one banana. The ${cupsIceCream} cups of ice cream provide $(${cupsIceCream})(${calciumPerCup}) = ${calciumFromIceCream}$ mg, so the total calcium gives the equation $(${cupsIceCream})(${calciumPerCup}) + (${bananas})(b) = ${totalCalcium}$. Substituting the ice cream calcium, $(${calciumFromIceCream}) + (${bananas})(b) = ${totalCalcium}$, so $(${bananas})(b) = ${totalCalcium - calciumFromIceCream}$ and $b = ${bananaCalcium}$ mg. ${incorrectOptions.map(opt => `Choice ${opt.letter} is incorrect because ${opt.reason}`).join(' ')}`
    };
  }
};
