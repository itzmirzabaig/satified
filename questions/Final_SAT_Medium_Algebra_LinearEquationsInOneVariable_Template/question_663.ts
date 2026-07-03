import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 663
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients differ by 1, constant d]
 * - Difficulty factors: [Solving for expression (x+c) rather than x]
 * - Distractor patterns: [A is -c, B is x value (d-c), D is d+c]
 * - Constraints: [Let u = x+c, solve hi*u = lo*u + d with hi = lo+1, so u = d]
 * - Question type: [Multiple Choice Text]
 */

export const generator_663 = {
  metadata: {
    id: "663",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Build equation of form hi*(x+c) = lo*(x+c) + d with hi = lo + 1.
    // Then (hi - lo)*(x+c) = d  =>  x+c = d  (always an exact integer).
    const lo = getRandomInt(3, 6);
    const hi = lo + 1;
    const c = getRandomInt(2, 8);
    const d = getRandomInt(15, 40);

    // u = x + c is the requested value; it equals d exactly.
    const uValue = d;          // value of (x + c)
    const xValue = d - c;      // the underlying x value (a natural distractor)

    // Distractors: -c (sign trap), x itself (solved for x not x+c), d+c (added c).
    const distractorNegC = -c;
    const distractorX = xValue;
    const distractorPlus = d + c;

    const correctText = `${uValue}`;
    const optionsData = [
      { text: `${distractorNegC}`, isCorrect: false },
      { text: `${distractorX}`, isCorrect: false },
      { text: `${uValue}`, isCorrect: true },
      { text: `${distractorPlus}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    const letterOf = (predicate: (t: string) => boolean) =>
      shuffledOptions.find(o => predicate(o.text))!.letter;
    const letterNegC = letterOf(t => t === `${distractorNegC}`);
    const letterX = letterOf(t => t === `${distractorX}`);
    const letterPlus = letterOf(t => t === `${distractorPlus}`);

    return {
      questionText: `If \\(${hi}(x+${c})=${lo}(x+${c})+${d}\\), what is the value of \\(x+${c}\\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Let \\(u = x+${c}\\). The given equation becomes \\(${hi}u = ${lo}u + ${d}\\). Subtracting \\(${lo}u\\) from both sides yields \\(u = ${d}\\). Since \\(u = x+${c}\\), the value of \\(x+${c}\\) is \\(${uValue}\\). Choice ${letterX} is incorrect; it is the value of \\(x\\) itself (\\(x = ${d} - ${c} = ${xValue}\\)), not \\(x+${c}\\). Choice ${letterNegC} is incorrect; \\(-${c}\\) results from mishandling the constant term. Choice ${letterPlus} is incorrect; it adds \\(${c}\\) to the correct value instead of recognizing that \\(x+${c}=${uValue}\\).`
    };
  }
};
