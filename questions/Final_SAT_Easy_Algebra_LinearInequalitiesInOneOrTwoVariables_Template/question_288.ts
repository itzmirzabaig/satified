import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 288
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [required: 100, current: 86]
 * - Difficulty factors: [Simple subtraction, "at least" interpretation]
 * - Distractor patterns: [A=correct difference, B=subtraction error, C=current hours, D=sum of both]
 * - Constraints: [Result must be positive integer]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_288 = {
  metadata: {
    id: "288",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const required = getRandomInt(80, 150);
    let current = getRandomInt(40, required - 10);
    let needed = required - current;
    // Guard: the "already logged" distractor is `current`; it must differ from
    // the correct difference `needed` (they coincide only when required = 2*current).
    let tries = 0;
    while (needed === current && tries++ < 50) {
      current = getRandomInt(40, required - 10);
      needed = required - current;
    }
    if (needed === current) {
      current = current + 1; // required - current now differs from current
      needed = required - current;
    }

    // Build distractors that never collide with the answer or one another.
    const used = new Set<number>([needed]);
    const addUnique = (value: number): number => {
      let v = value;
      let guard = 0;
      while ((used.has(v) || v <= 0) && guard++ < 50) {
        v += 1;
      }
      used.add(v);
      return v;
    };

    // C = hours already logged; D = total requirement (forgets logged hours);
    // B = arithmetic slip a few hours off from the correct difference.
    const distractorCurrent = addUnique(current);
    const distractorRequired = addUnique(required);
    const slip = needed + (Math.random() < 0.5 ? -1 : 1) * getRandomInt(2, 6);
    const distractorSlip = addUnique(slip);

    const optionsData = [
      { text: `${needed}`, isCorrect: true },
      { text: `${distractorSlip}`, isCorrect: false, reason: "results from a subtraction slip near the correct difference" },
      { text: `${distractorCurrent}`, isCorrect: false, reason: "reports the hours already logged rather than the additional hours needed" },
      { text: `${distractorRequired}`, isCorrect: false, reason: "reports the total requirement, ignoring the hours already logged" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. A student pilot needs at least ${required} hours of flight time and has already logged ${current} hours, so the minimum number of additional hours needed is $${required} - ${current} = ${needed}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A student pilot needs at least ${required} hours of flight time to earn a private pilot certificate. If the student has already logged ${current} hours of flight time, what is the minimum number of additional hours of flight time the student needs to earn the certificate?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
