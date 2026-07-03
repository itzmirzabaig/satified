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
    const a = getRandomInt(2, 5);        // cost per small box
    const b = getRandomInt(2, 6);        // cost per large box
    const aVal = getRandomInt(2, 5);     // number of small boxes (given)
    const correctB = getRandomInt(2, 6); // number of large boxes (the answer)
    const c = a * aVal + b * correctB;   // total cost

    // Build distractors, guarding so none equals the correct answer or each
    // other. Reasons describe the specific error each represents.
    const used = new Set<number>([correctB]);
    const distractors: { value: number; reason: string }[] = [];
    const addDistractor = (value: number, reason: string) => {
      if (Number.isInteger(value) && value > 0 && !used.has(value)) {
        used.add(value);
        distractors.push({ value, reason });
      }
    };

    // Common wrong answers for this problem type.
    addDistractor(correctB + 1, "results from an arithmetic slip when solving for b");
    addDistractor(correctB - 1, "results from an arithmetic slip when solving for b");
    addDistractor(Math.round(c / b), "divides the total by b without removing the small-box cost first");
    addDistractor(aVal, "reports the number of small boxes instead of large boxes");
    addDistractor(correctB + 2, "results from adding instead of subtracting the small-box cost");
    addDistractor(a, "uses a coefficient as the count");

    // Fill to exactly 3 distractors with safe nearby integers if guards rejected some.
    let filler = correctB + 3;
    while (distractors.length < 3) {
      addDistractor(filler, "does not satisfy the equation");
      filler++;
    }

    const optionsData = [
      { text: correctB.toString(), isCorrect: true },
      ...distractors.slice(0, 3).map(d => ({ text: d.value.toString(), isCorrect: false, reason: d.reason }))
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A shipping company uses the equation $${a}x + ${b}y = ${c}$ to model a shipment, where x is the number of small boxes and y is the number of large boxes. If ${aVal} small boxes were shipped, how many large boxes were shipped?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctB.toString(),
      explanation: `Choice ${correctLetter} is correct. Substituting ${aVal} for the number of small boxes gives $${a} \\times ${aVal} + ${b}y = ${c}$, which simplifies to $${a * aVal} + ${b}y = ${c}$. Subtracting ${a * aVal} from both sides gives $${b}y = ${c - a * aVal}$, so $${b}y \\div ${b} = ${correctB}$ large boxes.`
    };
  }
};
