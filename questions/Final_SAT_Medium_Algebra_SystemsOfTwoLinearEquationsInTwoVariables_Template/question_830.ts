import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 830
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 1/9, 1/2 (simple fractions)]
 * - Difficulty factors: [Fractional coefficients, setting equal to solve]
 * - Distractor patterns: [-9, -7, 0, 2]
 * - Constraints: [Clean fraction arithmetic, x=0 solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_830 = {
  metadata: {
    id: "830",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values - two lines through the origin with
    // opposite-sign slopes, so the unique solution is x = 0 (and y = 0).
    const num1 = getRandomInt(1, 4);
    const den1 = getRandomInt(5, 10);
    const num2 = getRandomInt(1, 4);
    const den2 = getRandomInt(2, 5);

    // Opposite signs guarantee the slopes differ (both nonzero, one +, one -),
    // so the lines meet only at the origin.
    const sign1 = getRandomElement([-1, 1]);
    const sign2 = -sign1;

    // STEP 2: Build question text
    const frac1 = sign1 === 1 ? `\\frac{${num1}}{${den1}}` : `-\\frac{${num1}}{${den1}}`;
    const frac2 = sign2 === 1 ? `\\frac{${num2}}{${den2}}` : `-\\frac{${num2}}{${den2}}`;

    const questionText = `The solution to the given system of equations is $(x, y)$. What is the value of $x$?\n\n$$\\begin{cases} y = ${frac1}x \\\\ y = ${frac2}x \\end{cases}$$`;

    // STEP 3: Create options. Correct answer is 0. Build three distinct nonzero
    // distractors (a student who mishandles the fractions might land on a
    // denominator or a small integer). Guard against collisions with a bounded
    // retry so no two options are ever equal.
    const correctValue = 0;
    const distractors: number[] = [];
    let tries = 0;
    while (distractors.length < 3 && tries++ < 50) {
      const candidatePool = [
        -den1,
        -den2,
        den1,
        num1 * num2 * -1,
        getRandomInt(1, 5),
        -getRandomInt(1, 5)
      ];
      const candidate = getRandomElement(candidatePool);
      if (candidate !== correctValue && !distractors.includes(candidate)) {
        distractors.push(candidate);
      }
    }
    // Deterministic fallback in the unlikely event the retry pool underfills.
    let filler = 1;
    while (distractors.length < 3) {
      if (filler !== correctValue && !distractors.includes(filler)) {
        distractors.push(filler);
      }
      filler++;
    }

    const optionsData = [
      { text: distractors[0].toString(), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: correctValue.toString(), isCorrect: true },
      { text: distractors[2].toString(), isCorrect: false }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 5: Build explanation. Clear the fractions by multiplying through by
    // den1*den2; the combined coefficient is sign1*(num1*den2 + num2*den1),
    // which is always nonzero, so the only solution is x = 0.
    const lcm = den1 * den2;
    const coeffA = sign1 * num1 * den2; // coefficient after clearing on the left
    const coeffB = sign2 * num2 * den1; // coefficient after clearing on the right
    const combined = coeffA - coeffB;   // = sign1*(num1*den2 + num2*den1), nonzero

    const fmtSigned = (n: number) => (n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`);

    const choiceLines = shuffledOptions.map(o => {
      if (o.isCorrect) {
        return `${o.letter}. $${o.text}$: Correct. The two lines both pass through the origin, so substituting $x = 0$ into either equation gives $y = 0$. The intersection point is $(0, 0)$.`;
      }
      return `${o.letter}. $${o.text}$: Incorrect. Substituting $x = ${o.text}$ into the two equations gives two different values of $y$, so it is not a solution of the system.`;
    }).join('\n');

    const explanation = `To find the solution $(x, y)$ to the given system, set the two expressions for $y$ equal to each other, since each equals $y$:\n$$${frac1}x = ${frac2}x$$\n\nClear the fractions by multiplying every term by the least common multiple of the denominators, which is ${lcm}:\n$$${coeffA}x = ${coeffB}x$$\n\nGather the $x$-terms on one side:\n$$${coeffA}x ${fmtSigned(-coeffB)}x = 0$$\n$$${combined}x = 0$$\n\nSince ${combined} is not zero, divide both sides by ${combined}:\n$$x = 0$$\n\nTherefore, the value of $x$ is $0$, which is choice $${correctLetter}$.\n\n${choiceLines}`;

    // STEP 6: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctValue.toString(),
      explanation: explanation
    };
  }
};
