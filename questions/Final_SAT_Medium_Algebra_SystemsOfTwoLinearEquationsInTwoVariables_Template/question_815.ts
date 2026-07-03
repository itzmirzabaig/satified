import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 815
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length: 106, parts: x, y (double-digit)]
 * - Difficulty factors: [Word problem, system setup, substitution]
 * - Distractor patterns: [25, 28, 56, 86]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * Intent: A wire of total length L is cut into parts x and y with
 *   x + y = L  and  x = m*y + offset.  Solve for x.
 * Answer-first construction: pick integer y, multiplier m, and offset, then
 * derive x = m*y + offset and L = x + y so every value is an exact integer.
 */

export const generator_815 = {
  metadata: {
    id: "815",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first integer construction (no division => no float artifacts)
    const yValue = getRandomInt(10, 25);        // shorter part, double-digit
    const multiplier = getRandomInt(3, 6);      // "m times the value of y"
    const offset = getRandomInt(2, 10);         // "offset more than"
    const xValue = multiplier * yValue + offset; // longer part
    const totalLength = xValue + yValue;         // total wire length

    // STEP 2: Build question text (numbers as plain text; only variables in math)
    const questionText = `A wire with a length of ${totalLength} inches is cut into two parts. One part has a length of $x$ inches, and the other part has a length of $y$ inches. The value of $x$ is ${offset} more than ${multiplier} times the value of $y$. What is the value of $x$?`;

    // STEP 3: Create distractors (integer, guaranteed distinct from answer/each other)
    // c0: reports y instead of x (solved for the wrong variable)
    // c1: computes m*y but forgets to add the offset
    // c2: subtracts the offset instead of adding it (x = m*y - offset)
    const distractorSet = new Set<number>([xValue]);
    const candidates: number[] = [
      yValue,                       // reports y instead of x
      multiplier * yValue,          // forgets the "+ offset"
      multiplier * yValue - offset  // subtracts the offset instead of adding
    ];
    const distractors: number[] = [];
    for (const c of candidates) {
      if (!distractorSet.has(c) && c > 0) {
        distractorSet.add(c);
        distractors.push(c);
      }
    }
    // Bounded top-up in case any candidate collided for this draw
    let tries = 0;
    while (distractors.length < 3 && tries++ < 50) {
      const c = xValue + getRandomInt(-9, 9);
      if (!distractorSet.has(c) && c > 0) {
        distractorSet.add(c);
        distractors.push(c);
      }
    }

    const optionsData = [
      { text: distractors[0].toString(), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: distractors[2].toString(), isCorrect: false },
      { text: xValue.toString(), isCorrect: true }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;

    // Letters for each distractor (from the SHUFFLED array, never hardcoded)
    const letterOf = (val: number) =>
      shuffledOptions.find(o => o.text === val.toString() && !o.isCorrect)!.letter;
    const d0 = distractors[0], d1 = distractors[1], d2 = distractors[2];

    // STEP 5: Return question data
    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: xValue.toString(),
      explanation: `Translate the two pieces of information into a system of two linear equations.

The two parts add up to the whole wire, so their lengths sum to ${totalLength}.
Equation 1: $x + y = ${totalLength}$

The value of $x$ is ${offset} more than ${multiplier} times $y$.
Equation 2: $x = ${multiplier}y + ${offset}$

Substitute Equation 2 into Equation 1:
$(${multiplier}y + ${offset}) + y = ${totalLength}$

Combine like terms:
$${multiplier + 1}y + ${offset} = ${totalLength}$

Subtract ${offset} from both sides:
$${multiplier + 1}y = ${totalLength - offset}$

Divide both sides by ${multiplier + 1}:
$y = ${yValue}$

Now use Equation 2 to find $x$:
$x = ${multiplier}(${yValue}) + ${offset} = ${multiplier * yValue} + ${offset} = ${xValue}$

Check with Equation 1: $x + y = ${xValue} + ${yValue} = ${totalLength}$, which is correct.

The value of $x$ is ${xValue}, which is choice ${correctLetter}.

Choice ${letterOf(d0)} (${d0}) is the value of $y$, the shorter part, not $x$.
Choice ${letterOf(d1)} (${d1}) comes from computing ${multiplier} times $y$ but forgetting to add ${offset}.
Choice ${letterOf(d2)} (${d2}) subtracts ${offset} instead of adding it, using $x = ${multiplier}y - ${offset}$.`
    };
  }
};
