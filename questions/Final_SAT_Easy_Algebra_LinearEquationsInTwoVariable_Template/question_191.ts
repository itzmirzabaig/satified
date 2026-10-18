import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 191
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2-6, total: 25-100]
 * - Difficulty factors: [Substitution and solving linear equation]
 *
 * Intent: The equation a*x + b*y = c models the cost/weight of two box types.
 * Given the number of small boxes (x = aVal), solve the linear equation for the
 * number of large boxes (y = correctB). Answer-first construction keeps every
 * value an integer; distractors are guarded against collisions.
 */

export const generator_191 = {
  metadata: {
    id: "191",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Answer-first: pick coefficients, the given small-box count, and the
    // large-box count (the answer) directly, then derive the total. This makes
    // c divisible cleanly and guarantees an integer answer for every draw.
    // Redraw until the four choices differ: the answer, the number of small
    // boxes, the total number of boxes, and the large-box cost b * correctB.
    let a = 2, b = 2, aVal = 2, correctB = 3;
    do {
      a = getRandomInt(2, 5);          // cost per small box
      b = getRandomInt(2, 6);          // cost per large box
      aVal = getRandomInt(2, 5);       // number of small boxes (given)
      correctB = getRandomInt(2, 6);   // number of large boxes (the answer)
    } while (new Set([correctB, aVal, aVal + correctB, b * correctB]).size < 4);
    const c = a * aVal + b * correctB; // total cost

    const optionsData = [
      { text: correctB.toString(), isCorrect: true, reason: '' },
      { text: aVal.toString(), isCorrect: false, reason: `it is the number of small boxes shipped, not the number of large boxes` },
      { text: (aVal + correctB).toString(), isCorrect: false, reason: `it is the total number of small and large boxes shipped` },
      { text: (b * correctB).toString(), isCorrect: false, reason: `it is the value of $${b}y$, the cost, in dollars, of shipping the large boxes, not the number of large boxes` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The equation $${a}x + ${b}y = ${c}$ represents the total cost, in dollars, of a shipment, where $x$ is the number of small boxes and $y$ is the number of large boxes in the shipment. If ${aVal} small boxes were shipped, how many large boxes were shipped?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctB.toString(),
      explanation: `Choice ${correctLetter} is correct. Substituting ${aVal} for $x$ in the given equation yields $${a}(${aVal}) + ${b}y = ${c}$, or $${a * aVal} + ${b}y = ${c}$. Subtracting ${a * aVal} from both sides yields $${b}y = ${c - a * aVal}$, and dividing both sides by ${b} yields $y = ${correctB}$. So ${correctB} large boxes were shipped. ${shuffledOptions.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
