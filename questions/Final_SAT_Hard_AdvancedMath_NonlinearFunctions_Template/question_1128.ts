import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1128
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 10, max: 1034, time to max: 8, find h(10)]
 * - Difficulty factors: [Projectile height model, vertex form evaluation]
 * - Distractor patterns: [A: 234, B: 778, C: 970, D: 1014]
 * - Constraints: [Must compute h(10) using vertex form]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1128 = {
  metadata: {
    id: "1128",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Build an integer-consistent downward parabola in vertex form:
    //   h(t) = a(t - timeToMax)^2 + maxH,  a < 0 (so maxH is the true maximum).
    // Pick a, timeToMax, initial first, then DERIVE maxH so that h(0) = initial
    // exactly. This keeps every displayed number an integer and self-consistent.
    let a: number, timeToMax: number, initial: number, maxH: number;
    let dt: number, evalTime: number, h_eval: number;
    let d1: number, d2: number, d3: number;
    let tries = 0;
    do {
      a = -getRandomInt(4, 16);              // downward opening, |a| in [4,16]
      timeToMax = getRandomInt(5, 12);        // seconds to reach the maximum
      initial = getRandomInt(5, 40);          // height at t = 0
      maxH = initial - a * timeToMax * timeToMax; // = initial + |a|*timeToMax^2 (> initial)
      dt = getRandomInt(2, 5);                // seconds past the maximum
      evalTime = timeToMax + dt;
      h_eval = a * dt * dt + maxH;            // integer; < maxH since a < 0

      // Distractors (all integers, each a plausible mistake):
      d1 = maxH;                              // stops at the maximum, forgets to evaluate
      d2 = maxH - a * dt * dt;                // sign error: adds |a|*dt^2 instead of subtracting
      d3 = initial;                           // reports the initial height
      tries++;
    } while (
      tries < 50 && (
        h_eval <= 0 ||                        // keep heights positive
        // all four displayed values must be pairwise distinct
        new Set([h_eval, d1, d2, d3]).size !== 4
      )
    );

    // Before: values of 1,000 or more had no comma, the explanation never showed how a
    // was found, and the wrong choices were not given as "Choice X is incorrect" reasons.
    const fmt = (n: number) => n.toLocaleString('en-US').replace(/,/g, '{,}');
    const drop = a * dt * dt;                 // negative change from the maximum

    const optionsData = [
      { text: `$${fmt(h_eval)}$`, isCorrect: true, reason: '' },
      { text: `$${fmt(d1)}$`, isCorrect: false, reason: `$${fmt(d1)}$ is the maximum height, which is the height at $t=${timeToMax}$ rather than at $t=${evalTime}$` },
      { text: `$${fmt(d2)}$`, isCorrect: false, reason: `$${fmt(d2)}$ results from adding $${fmt(-drop)}$ to the maximum height instead of subtracting it` },
      { text: `$${fmt(d3)}$`, isCorrect: false, reason: `$${fmt(d3)}$ is the initial height, which is the height at $t=0$ rather than at $t=${evalTime}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The height above the ground, in feet, of a launched object is modeled by a quadratic function of the time $t$, in seconds, after it is launched. The object's initial height is $${initial}$ feet, and it reaches its maximum height of $${fmt(maxH)}$ feet at $t=${timeToMax}$ seconds. What is the object's height, in feet, at $t=${evalTime}$ seconds?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.text,
      explanation: `Choice ${correct.letter} is correct. Because the maximum occurs at $t=${timeToMax}$, the model can be written in vertex form as $h(t)=a(t-${timeToMax})^2+${fmt(maxH)}$ for some constant $a$. The initial height means $h(0)=${initial}$, so $a(-${timeToMax})^2+${fmt(maxH)}=${initial}$. Then $${timeToMax * timeToMax}a=${fmt(initial - maxH)}$, so $a=${a}$. At $t=${evalTime}$, $h(${evalTime})=${a}(${evalTime}-${timeToMax})^2+${fmt(maxH)}=${a}(${dt})^2+${fmt(maxH)}=${fmt(drop)}+${fmt(maxH)}=${fmt(h_eval)}$ feet. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
