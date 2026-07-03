import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 798
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 6, 7, 2, 2, results: 28, 10]
 * - Difficulty factors: [Substitution after simplification, solve for y]
 * - Distractor patterns: [-2, 7, 14, 18]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_798 = {
  metadata: {
    id: "798",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Answer-first construction so the solution is an exact integer pair.
    // Pick x, y first, then build coefficients; right-hand sides follow.
    const xValue = getRandomInt(3, 8);
    const yValue = -1 * getRandomInt(1, 4); // negative y, e.g. -1..-4

    // Coefficients (all positive integers). Equation 2 is the "simpler" one.
    // Guard: lines must not be parallel/dependent, i.e. a1*b2 !== a2*b1, so the
    // system has a unique solution and elimination gives a nonzero y-coeff.
    let a1 = getRandomInt(4, 8);
    let b1 = getRandomInt(5, 9);
    let a2 = getRandomInt(2, 3);
    let b2 = getRandomInt(1, 3);
    let guard = 0;
    while (a1 * b2 === a2 * b1 && guard++ < 50) {
      a1 = getRandomInt(4, 8);
      b1 = getRandomInt(5, 9);
      a2 = getRandomInt(2, 3);
      b2 = getRandomInt(1, 3);
    }

    const right1 = a1 * xValue + b1 * yValue;
    const right2 = a2 * xValue + b2 * yValue;

    // STEP 2: Build question text
    const questionText = `$$\\begin{cases} ${a1}x + ${b1}y = ${right1} \\\\ ${a2}x + ${b2}y = ${right2} \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $y$?`;

    // STEP 3: Create options. Build three distinct distractors that can never
    // collide with the correct answer or each other for any draw.
    const distractorPool = [
      xValue,          // the x-value (common trap)
      -yValue,         // sign error on y
      yValue + 1,      // off-by-one
      yValue - 1,      // off-by-one
      yValue * 2,      // scaling error
    ];
    const distractors: number[] = [];
    for (const cand of distractorPool) {
      if (cand === yValue) continue;
      if (distractors.includes(cand)) continue;
      distractors.push(cand);
      if (distractors.length === 3) break;
    }
    // Safety: pad with fresh values if the pool ran short (guarded, bounded).
    let pad = 5;
    while (distractors.length < 3 && pad < 60) {
      if (pad !== yValue && !distractors.includes(pad)) distractors.push(pad);
      pad++;
    }

    const optionsData = [
      { text: yValue.toString(), isCorrect: true },
      { text: distractors[0].toString(), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: distractors[2].toString(), isCorrect: false }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 5: Build explanation via elimination (integer arithmetic only).
    // Multiply eq2 by a1 and eq1 by a2 so the x-coefficients match (a1*a2),
    // then subtract to eliminate x and solve for y.
    const yCoeffEq1 = a2 * b1;   // coefficient of y after scaling eq1 by a2
    const yCoeffEq2 = a1 * b2;   // coefficient of y after scaling eq2 by a1
    const rhsEq1 = a2 * right1;
    const rhsEq2 = a1 * right2;
    const yCoeffDiff = yCoeffEq1 - yCoeffEq2; // (a2*b1 - a1*b2)
    const rhsDiff = rhsEq1 - rhsEq2;

    const explanation = `Use elimination to remove $x$. Multiply the first equation by ${a2} and the second by ${a1} so both have ${a1 * a2}x:\n\n$$\\begin{cases} ${a1 * a2}x + ${yCoeffEq1}y = ${rhsEq1} \\\\ ${a1 * a2}x + ${yCoeffEq2}y = ${rhsEq2} \\end{cases}$$\n\nSubtract the second from the first: $(${yCoeffEq1} - ${yCoeffEq2})y = ${rhsEq1} - ${rhsEq2}$, so $${yCoeffDiff}y = ${rhsDiff}$ and $y = ${yValue}$.\n\nThus the correct choice is $${correctLetter}$: $y = ${yValue}$.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: yValue.toString(),
      explanation: explanation
    };
  }
};
