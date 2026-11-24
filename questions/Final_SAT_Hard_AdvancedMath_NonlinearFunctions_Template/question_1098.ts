import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1098
 *
 * ORIGINAL ANALYSIS:
 * - Difficulty factors: [Quadratic modeling, vertex of parabola, word problem to equation]
 * - Distractor patterns: [basePrice (forgot to optimize), 2*vertexX, capacity/decreaseRate
 *   (zero-sales point), and the correct vertex x]
 * - Constraints: [Quadratic revenue model, find vertex x-coordinate]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIX: Answer-first construction. We pick a clean integer vertex x* first, then
 * derive the capacity as decreaseRate*(2*x* + basePrice) so the maximum lands on
 * an integer (the old code divided arbitrary values and produced float artifacts
 * such as 11.699115...). A bounded retry guarantees the four options are all
 * distinct integers. Currency is escaped as \$ so MathJax never pairs a bare $.
 */

export const generator_1098 = {
  metadata: {
    id: "1098",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Revenue R = (price)(quantity), price = basePrice + x, quantity = capacity - decreaseRate*x.
    // R = -decreaseRate*x^2 + (capacity - basePrice*decreaseRate)*x + basePrice*capacity.
    // Vertex x* = (capacity - basePrice*decreaseRate)/(2*decreaseRate).
    // Choosing capacity = decreaseRate*(2*x* + basePrice) makes x* exactly integer.
    let basePrice = 4;
    let decreaseRate = 50;
    let vertexX = 8;
    let capacity = 1000;
    let distractors: number[] = [];

    let tries = 0;
    while (tries++ < 50) {
      basePrice = getRandomInt(3, 8);
      decreaseRate = getRandomElement([25, 50, 100]);
      vertexX = getRandomInt(4, 12);
      capacity = decreaseRate * (2 * vertexX + basePrice);

      // Keep the scenario clean and realistic.
      if (capacity % 100 !== 0) continue;
      if (capacity < 1000 || capacity > 3000) continue;
      // Tickets sold at the optimal price must stay positive.
      if (capacity - decreaseRate * vertexX <= 0) continue;

      const d1 = basePrice;                          // forgot to optimize; reported current increase 0? -> base
      const d2 = 2 * vertexX;                         // doubled the vertex
      const d3 = Math.floor(capacity / decreaseRate); // x where quantity hits 0
      const values = [vertexX, d1, d2, d3];
      if (new Set(values).size === 4) {
        distractors = [d1, d2, d3];
        break;
      }
    }

    const bCoeff = capacity - basePrice * decreaseRate; // = 2 * decreaseRate * vertexX
    const constTerm = basePrice * capacity;
    // Values of 1,000+ need commas (were bare, e.g. 2400).
    const plain = (n: number) => n.toLocaleString('en-US');
    const math = (n: number) => plain(n).replace(/,/g, '{,}');

    const optionsData = [
      { value: vertexX, isCorrect: true, reason: '' },
      { value: distractors[0], isCorrect: false, reason: `${distractors[0]} is the current ticket price in dollars, not the increase that maximizes revenue` },
      { value: distractors[1], isCorrect: false, reason: `${distractors[1]} is twice the correct increase, the second value of $x$ at which the revenue equals the current revenue` },
      { value: distractors[2], isCorrect: false, reason: `${distractors[2]} is the increase at which no tickets are sold, since $${math(capacity)}-${decreaseRate}(${distractors[2]})=0$, so the revenue there is $0$` },
    ].map(o => ({ text: `$${o.value}$`, isCorrect: o.isCorrect, reason: o.reason }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index),
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correct.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      // "All of the seats are sold" added: the model needs current sales to equal capacity.
      questionText: `An auditorium has seats for ${plain(capacity)} people. Tickets to attend a show at the auditorium currently cost \\$${basePrice}.00, and at this price all of the seats are sold. For each \\$1.00 increase to the ticket price, ${decreaseRate} fewer tickets will be sold. This situation can be modeled by a quadratic equation where $x$ represents the increase in ticket price, in dollars, and $y$ represents the revenue, in dollars. If this equation is graphed in the $xy$-plane, at what value of $x$ is the maximum of the graph?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correct.text,
      explanation: `Choice ${correctLetter} is correct. The revenue is the product of the ticket price and the number of tickets sold, so $y=(${basePrice}+x)(${math(capacity)}-${decreaseRate}x)=-${decreaseRate}x^2+${math(bCoeff)}x+${math(constTerm)}$. This parabola opens downward, so its maximum is at the vertex, where $x=\\frac{-${math(bCoeff)}}{2(-${decreaseRate})}=${vertexX}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`,
    };
  }
};
